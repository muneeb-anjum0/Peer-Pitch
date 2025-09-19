import { create } from "zustand";
import type { Pitch, Comment } from "../types";
import { api } from "../lib/api";
import { auth } from "../lib/firebase";
import { useAuth } from "./auth";

export type Analytics = { totalPitches: number; totalVotes: number; totalComments: number; lastPosted: string | null };

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

  fetchTrending: (hydrate?: Pitch[]) => Promise<void>;
  fetchLatest: (hydrate?: Pitch[]) => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  fetchComments: (id: string) => Promise<void>;

  fetchMyPitches: (hydrate?: Pitch[]) => Promise<void>;
  fetchMyAnalytics: (hydrate?: Analytics) => Promise<void>;
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

  async fetchTrending(hydrate?: Pitch[]) {
    if (hydrate && hydrate.length > 0) {
      set({ trending: hydrate });
      return;
    }
    if (get().trending.length > 0) return;
    set({ loadingTrending: true });
    try {
      const { data } = await api.get<Pitch[]>("/pitches/trending");
      set({ trending: data });
    } finally {
      set({ loadingTrending: false });
    }
  },

  async fetchLatest(hydrate?: Pitch[]) {
    if (hydrate && hydrate.length > 0) {
      set({ latest: hydrate });
      return;
    }
    if (get().latest.length > 0) return;
    set({ loadingLatest: true });
    try {
      const { data } = await api.get<Pitch[]>("/pitches/latest");
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

  async fetchMyPitches(sort, hydrate?: Pitch[]) {
    const user = useAuth.getState().user;
    if (!user) throw new Error("login-required");
    if (hydrate && hydrate.length > 0) {
      set({ myPitches: hydrate });
      return;
    }
    set({ loadingMy: true });
    try {
        const { data } = await api.get<Pitch[]>(`/users/me/pitches?sort=created`);
      set({ myPitches: data });
    } finally {
      set({ loadingMy: false });
    }
  },

  async fetchMyAnalytics(hydrate?: Analytics) {
    const user = useAuth.getState().user;
    if (!user) throw new Error("login-required");
    if (hydrate) {
      set({ myAnalytics: hydrate });
      return;
    }
    const { data: a } = await api.get<Analytics>("/users/me/analytics");
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
