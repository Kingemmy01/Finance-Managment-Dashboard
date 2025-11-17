import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: any | null;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  setUser: (user) =>
    set({
      user,
      isLoggedIn: !!user,
    }),

  logout: () =>
    set({
      user: null,
      isLoggedIn: false,
    }),
}));

