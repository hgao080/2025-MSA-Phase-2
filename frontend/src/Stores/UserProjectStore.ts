import { create } from 'zustand';
import type { CreateProjectRequest, Project } from '../Models/Project';
import { createProject, getMyProjects } from '../Services/ProjectService';
import { useProjectStore } from './ProjectStore';

interface UserProjectStore {
  userProjects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  setSelectedProject: (project: Project | null) => void;
  fetchMyProjects: () => Promise<void>;
  createProject: (project: CreateProjectRequest) => Promise<void>;
}

export const useUserProjectStore = create<UserProjectStore>((set) => ({
  userProjects: [],
  isLoading: false,
  selectedProject: null,

  setSelectedProject: (project: Project | null) => {
    set({ selectedProject: project });
  },

  fetchMyProjects: async () => {
    try {
      set({ isLoading: true });
      const fetchedProjects = await getMyProjects();
      set({ userProjects: fetchedProjects, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch my projects:', error);
      set({ isLoading: false });
    }
  },

  createProject: async (project: CreateProjectRequest) => {
    try {
      set({ isLoading: true });
      const createdProject = await createProject(project);
      
      // Add to user's projects
      set((state) => ({
        userProjects: [...(state.userProjects || []), createdProject],
        isLoading: false,
      }));
      
      // Also add to all projects store
      useProjectStore.getState().addProject(createdProject);
    } catch (error) {
      console.error('Failed to create project:', error);
      set({ isLoading: false });
    }
  }
}));