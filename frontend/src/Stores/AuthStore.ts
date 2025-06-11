import { create } from 'zustand';
import { loginUser, logoutUser, getCurrentUser, registerUser } from '../Services/AuthService';
import { type User } from '../Models/User';
import { type RegisterRequest, type LoginRequest } from '../Models/Auth'

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (req: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  register: (req: RegisterRequest) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: true,

  checkAuthStatus: async () => {
    try {
      set({ isLoading: true });
      const user = await getCurrentUser();
      set({ user, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
      throw error
    }
  },

  login: async (req: LoginRequest) => {
    try {
      await loginUser(req);
      await get().checkAuthStatus();
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (req: RegisterRequest) => {
    try {
      set({ isLoading: true });
      await registerUser(req);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null, });
    }
  },
}));