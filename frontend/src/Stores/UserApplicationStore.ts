import { create } from 'zustand';
import type { Application, ApplyRequest } from '../Models/Application';
import { getMyApplicants, getMyApplications, postApplication } from '../Services/ApplicationService';

interface UserApplicationStore {
  applications: Application[];
  applicants: Application[];
  isLoading: boolean;
  applyToProject: (application: ApplyRequest) => Promise<void>;
  fetchApplicationsPage: () => Promise<void>;
  withdrawApplication: (applicationId: number) => Promise<void>;
  approveApplication: (applicationId: number) => Promise<void>;
  denyApplication: (applicationId: number) => Promise<void>;
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

  fetchApplicationsPage: async () => {
    try {
      set({ isLoading: true });
      const applications = await getMyApplications();
      const applicants = await getMyApplicants();
      set({
        applications,
        applicants,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      set({ isLoading: false });
    }
  },

  withdrawApplication: async (applicationId: number) => {
    try {
      set({ isLoading: true });
      // TODO: Implement API call to withdraw application
      console.log('Withdrawing application:', applicationId);
      
      // Update local state
      set((state) => ({
        applications: state.applications.map(app => 
          app.id === applicationId ? { ...app, status: 'Withdrawn' as const } : app
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to withdraw application:', error);
      set({ isLoading: false });
    }
  },

  approveApplication: async (applicationId: number) => {
    try {
      set({ isLoading: true });
      // TODO: Implement API call to approve application
      console.log('Approving application:', applicationId);
      
      // Update local state
      set((state) => ({
        applicants: state.applicants.map(app => 
          app.id === applicationId ? { ...app, status: 'Approved' as const } : app
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to approve application:', error);
      set({ isLoading: false });
    }
  },

  denyApplication: async (applicationId: number) => {
    try {
      set({ isLoading: true });
      // TODO: Implement API call to deny application
      console.log('Denying application:', applicationId);
      
      // Update local state
      set((state) => ({
        applicants: state.applicants.map(app => 
          app.id === applicationId ? { ...app, status: 'Denied' as const } : app
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to deny application:', error);
      set({ isLoading: false });
    }
  }
}));