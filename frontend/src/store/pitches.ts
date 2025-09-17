import { create } from "zustand";
import type { Pitch, Paginated } from "../types";
import { api } from "../lib/api";

type PitchesState = {
  trending: Pitch[];
  latest: Pitch[];
  loadingTrending: boolean;
  loadingLatest: boolean;
  fetchTrending: () => Promise<void>;
  fetchLatest: (page?: number) => Promise<void>;
  vote: (id: string, dir: "up" | "down") => Promise<void>;
  createPitch: (payload: { title: string; body: string; tags: string[] }) => Promise<Pitch>;
  getPitch: (id: string) => Promise<Pitch>;
  postComment: (pitchId: string, body: string) => Promise<void>;
  getComments: (pitchId: string) => Promise<Paginated<any>>;
};

export const usePitches = create<PitchesState>((set, get) => ({
  trending: [],
  latest: [],
  loadingTrending: false,
  loadingLatest: false,

  fetchTrending: async () => {
    set({ loadingTrending: true });
    try {
      const { data } = await api.get<{ items: Pitch[] }>("/pitches/trending");
      set({ trending: data.items });
    } finally {
      set({ loadingTrending: false });
    }
  },

  fetchLatest: async (page = 1) => {
    set({ loadingLatest: true });
    try {
      const { data } = await api.get<Paginated<Pitch>>("/pitches", {
        params: { page, pageSize: 20 },
      });
      set({ latest: data.items });
    } finally {
      set({ loadingLatest: false });
    }
  },

  vote: async (id, dir) => {
    await api.post(`/pitches/${id}/vote`, { dir });
    // Optimistic local update
    const t = get().trending.map((p) =>
      p._id === id ? { ...p, votes: p.votes + (dir === "up" ? 1 : -1) } : p
    );
    const l = get().latest.map((p) =>
      p._id === id ? { ...p, votes: p.votes + (dir === "up" ? 1 : -1) } : p
    );
    set({ trending: t, latest: l });
  },

  createPitch: async (payload) => {
    const { data } = await api.post<Pitch>("/pitches", payload);
    // Prepend to latest
    set({ latest: [data, ...get().latest] });
    return data;
  },

  getPitch: async (id) => {
    const { data } = await api.get<Pitch>(`/pitches/${id}`);
    return data;
  },

  postComment: async (pitchId, body) => {
    await api.post(`/pitches/${pitchId}/comments`, { body });
  },

  getComments: async (pitchId) => {
    const { data } = await api.get<Paginated<any>>(`/pitches/${pitchId}/comments`, {
      params: { page: 1, pageSize: 50 },
    });
    return data;
  },
}));
