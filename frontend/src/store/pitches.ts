import { create } from "zustand";
import type { Pitch, Comment } from "../types";
import { api } from "../lib/api";
import { auth } from "../lib/firebase";

type Analytics = { totalPitches: number; totalVotes: number; totalComments: number; lastPosted: string | null };

type State = {
  trending: Pitch[];
  latest: Pitch[];
  myPitches: Pitch[];
  myAnalytics: Analytics | null;

  byId: Record<string, Pitch | undefined | null>;
  commentsByPitch: Record<string, Comment[]>;
  myVotes: Record<string, -1 | 0 | 1>;

  loadingTrending: boolean;
  loadingLatest: boolean;
  loadingPitch: boolean;
  loadingMy: boolean;

  fetchTrending: () => Promise<void>;
  fetchLatest: () => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  fetchComments: (id: string) => Promise<void>;

  fetchMyPitches: (sort: "created" | "votes") => Promise<void>;
  fetchMyAnalytics: () => Promise<void>;
  getMyVote: (id: string) => Promise<-1 | 0 | 1>;

  postPitch: (p: { title: string; body: string; tags: string[] }) => Promise<Pitch>;
  postComment: (id: string, text: string) => Promise<void>;
  vote: (id: string, delta: -1 | 0 | 1) => Promise<void>;
};

export const usePitches = create<State>((set, get) => ({
  trending: [],
  latest: [],
  myPitches: [],
  myAnalytics: null,

  byId: {},
  commentsByPitch: {},
  myVotes: {},

  loadingTrending: false,
  loadingLatest: false,
  loadingPitch: false,
  loadingMy: false,

  async fetchTrending() {
    set({ loadingTrending: true });
    try {
      const { data } = await api.get<Pitch[]>("/pitches/trending");
      console.log("fetchTrending returned:", data);
      set({ trending: data });
    } finally {
      set({ loadingTrending: false });
    }
  },

  async fetchLatest() {
    set({ loadingLatest: true });
    try {
      const { data } = await api.get<Pitch[]>("/pitches/latest");
      console.log("fetchLatest returned:", data);
      set({ latest: data });
    } finally {
      set({ loadingLatest: false });
    }
  },

  async fetchById(id) {
    set({ loadingPitch: true });
    try {
      const { data } = await api.get<Pitch>(`/pitches/${id}`);
      set((s) => ({ byId: { ...s.byId, [id]: data } }));
    } catch {
      set((s) => ({ byId: { ...s.byId, [id]: null } }));
    } finally {
      set({ loadingPitch: false });
    }
  },

  async fetchComments(id) {
  const { data } = await api.get<Comment[]>(`/pitches/${id}/comments`);
  set((s) => ({ commentsByPitch: { ...s.commentsByPitch, [id]: data } }));
  },

  async fetchMyPitches(sort) {
    if (!auth.currentUser) throw new Error("login-required");
    set({ loadingMy: true });
    try {
      const { data } = await api.get<Pitch[]>(`/users/me/pitches?sort=${sort === "votes" ? "votes" : "created"}`);
      set({ myPitches: data });
    } finally {
      set({ loadingMy: false });
    }
  },

  async fetchMyAnalytics() {
    if (!auth.currentUser) throw new Error("login-required");
    const a = await api<Analytics>("/users/me/analytics", { auth: true });
    set({ myAnalytics: a });
  },

  async getMyVote(id) {
  if (!auth.currentUser) return 0;
  // cache first
  const cached = get().myVotes[id];
  if (cached !== undefined) return cached;
  const { data: r } = await api.get<{ delta: -1 | 0 | 1 }>(`/pitches/${id}/vote`);
  set((s) => ({ myVotes: { ...s.myVotes, [id]: r.delta } }));
  return r.delta;
  },

  async postPitch(p) {
    if (!auth.currentUser) throw new Error("login-required");
    const { data: created } = await api.post<Pitch>("/pitches", p);
    set((s) => ({
      latest: Array.isArray(s.latest) ? [created, ...s.latest] : [created],
      myPitches: Array.isArray(s.myPitches) ? [created, ...s.myPitches] : [created]
    }));
    return created;
  },

  async postComment(id, text) {
    if (!auth.currentUser) throw new Error("login-required");
    const { data: c } = await api.post<Comment>(`/pitches/${id}/comments`, { body: text });
    set((s) => ({
      commentsByPitch: {
        ...s.commentsByPitch,
        [id]: [...(s.commentsByPitch[id] ?? []), c],
      },
    }));
    const pitch = get().byId[id];
    if (pitch && pitch !== null) {
      set((s) => ({ byId: { ...s.byId, [id]: { ...pitch, commentCount: pitch.commentCount + 1 } } }));
    }
  },

  async vote(id, delta) {
    if (!auth.currentUser) throw new Error("login-required");
    await api.post(`/pitches/${id}/vote`, { delta });
    set((s) => ({ myVotes: { ...s.myVotes, [id]: delta } }));
    // Optional: you can refresh the pitch or adjust votes optimistically where needed
  },
}));
