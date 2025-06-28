import { create } from 'zustand';
import type { Application, ApplyRequest } from '../Models/Application';
import { postApplication } from '../Services/ApplicationService';

interface UserApplicationStore {
  applications: Application[];
  applicants: Application[];
  isLoading: boolean;
  applyToProject: (application: ApplyRequest) => Promise<void>;
}

export const useUserApplicationStore = create<UserApplicationStore>((set) => ({
  applications: [],
  applicants: [],
  isLoading: false,

  applyToProject: async (application: ApplyRequest) => {
    try {
      set({ isLoading: true });
      const newApplication = await postApplication(application);
      set((state) => ({
        applications: [...state.applications, newApplication],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to apply to project:', error);
      set({ isLoading: false });
    }
  },
}));