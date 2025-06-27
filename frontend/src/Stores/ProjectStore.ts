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
}

const projects = [{
  id: 1,
  title: "Project One",
  description: "This is the first project.",
  authorEmail: "test@test.com",
}, {
  id: 2,
  title: "Project Two",
  description: "This is the second project.",
  authorEmail: "test@test.com",
}, {
  id: 3,
  title: "Project Three",
  description: "This is the third project.",
  authorEmail: "test@test.com",
}]

export const useProjectStore = create<ProjectStore>((set) => ({
  allProjects: projects,
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
  }
}));