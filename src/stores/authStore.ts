import { create } from 'zustand';
import type { Profile } from '../types/database';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
  profile: Profile | null;

  setAuth: (userId: string, profile: Profile) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  updateProfile: (profile: Partial<Profile>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  userId: null,
  profile: null,

  setAuth: (userId, profile) =>
    set({
      isAuthenticated: true,
      isLoading: false,
      userId,
      profile,
    }),

  clearAuth: () =>
    set({
      isAuthenticated: false,
      isLoading: false,
      userId: null,
      profile: null,
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  updateProfile: (updates) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    })),
}));
