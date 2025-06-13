import { create } from 'zustand';
import type { CreateProjectRequest, Project } from '../Models/Project';
import { createProject, getMyProjects, getProjects } from '../Services/ProjectService';

interface ProjectStore {
  allProjects: Project[] | null;
  myProjects: Project[] | null;
  isLoading: boolean;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  fetchAllProjects: () => Promise<void>;
  fetchMyProjects: () => Promise<void>;
  createProject: (project: CreateProjectRequest) => Promise<void>;
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
  myProjects: null,
  isLoading: false,
  selectedProject: projects[0] || null,

  setSelectedProject: (project: Project | null) => {
    set({ selectedProject: project });
  },

  fetchAllProjects: async () => {
    try {
      set({ isLoading: true });
      const fetchedProjects = await getProjects();
      set({ allProjects: fetchedProjects, isLoading: false, selectedProject: fetchedProjects[0] || null });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      set({ isLoading: false });
    }
  },

  fetchMyProjects: async () => {
    try {
      set({ isLoading: true });
      const fetchedProjects = await getMyProjects();
      set({ myProjects: fetchedProjects, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch my projects:', error);
      set({ isLoading: false });
    }
  },

  createProject: async (project: CreateProjectRequest) => {
    try {
      set({ isLoading: true });
      const createdProject = await createProject(project);
      set((state) => ({
        allProjects: [...(state.allProjects || []), createdProject],
        myProjects: [...(state.myProjects || []), createdProject],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to create project:', error);
      set({ isLoading: false });
    }
  }
}));