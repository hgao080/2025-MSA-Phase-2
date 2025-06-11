import { create } from 'zustand';
import type { Project } from '../Models/Project';

interface ProjectStore {
  projects: Project[] | null;
  isLoading: boolean;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  fetchProjects: () => Promise<void>;
}

const projects = [{
  id: 1,
  title: "Project One",
  description: "This is the first project.",
}, {
  id: 2,
  title: "Project Two",
  description: "This is the second project.",
}, {
  id: 3,
  title: "Project Three",
  description: "This is the third project.",
}]

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: projects,
  isLoading: false,
  selectedProject: projects[0] || null,

  setSelectedProject: (project: Project | null) => {
    set({ selectedProject: project });
  },

  fetchProjects: async () => {
    try {
      set({ isLoading: true });
      // Simulate fetching projects from an API
      const fetchedProjects = await new Promise<Project[]>(resolve => {
        setTimeout(() => resolve(projects), 1000);
      });
      set({ projects: fetchedProjects, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      set({ isLoading: false });
    }
  },
}));