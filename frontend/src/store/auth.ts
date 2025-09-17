import { create } from "zustand";
import type { UserSafe } from "../types";

type AuthState = {
  user: UserSafe | null;
  setUser: (u: UserSafe | null) => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));
