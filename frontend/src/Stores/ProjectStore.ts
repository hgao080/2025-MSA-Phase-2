import { create } from 'zustand';
import type { Project } from '../Models/Project';
import { getProjects } from '../Services/ProjectService';

interface ProjectStore {
  allProjects: Project[];
  isLoading: boolean;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  fetchAllProjects: () => Promise<void>;
  addProject: (project: Project) => void;
  removeProject: (projectId: number) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  allProjects: [],
  isLoading: false,
  selectedProject: null,

  setSelectedProject: (project: Project | null) => {
    set({ selectedProject: project });
  },

  fetchAllProjects: async () => {
    try {
      set({ isLoading: true });
      const fetchedProjects = await getProjects();
      set({ allProjects: fetchedProjects, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      set({ isLoading: false });
    }
  },

  addProject: (project: Project) => {
    set((state) => ({
      allProjects: [...(state.allProjects || []), project],
    }));
  },

  removeProject: (projectId: number) => {
    set((state) => ({
      allProjects: state.allProjects.filter(p => p.id !== projectId),
    }));
  }
}));