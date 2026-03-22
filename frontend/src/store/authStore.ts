import { create } from 'zustand';
import api from '../lib/axios';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  logoutLocal: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  setAccessToken: (token) => set({ accessToken: token, isAuthenticated: !!token }),
  setUser: (user) => set({ user }),
  logoutLocal: () => set({ user: null, accessToken: null, isAuthenticated: false }),
  logout: async () => {
    try { await api.post('/auth/logout'); } catch {}
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
  checkAuth: async () => {
    try {
      const { data } = await api.post('/auth/refresh');
      set({ accessToken: data.accessToken, user: data.user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ accessToken: null, isAuthenticated: false, isLoading: false });
    }
  }
}));
