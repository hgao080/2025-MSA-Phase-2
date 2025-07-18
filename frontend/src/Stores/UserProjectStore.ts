import { create } from 'zustand';
import type { CreateProjectRequest, Project, UpdateProjectRequest } from '../Models/Project';
import { createProject, deleteProject, getMyProjects, getJoinedProjects, updateProject } from '../Services/ProjectService';
import { useProjectStore } from './ProjectStore';

interface UserProjectStore {
  userProjects: Project[];
  joinedProjects: Project[];
  allUserProjects: Project[]; // Combined created + joined projects
  selectedProject: Project | null;
  isLoading: boolean;
  setSelectedProject: (project: Project | null) => void;
  fetchMyProjects: () => Promise<void>;
  fetchJoinedProjects: () => Promise<void>;
  fetchAllUserProjects: () => Promise<void>;
  createProject: (project: CreateProjectRequest) => Promise<void>;
  updateProject: (projectId: number, projectData: UpdateProjectRequest) => Promise<void>;
  deleteProject: (projectId: number) => Promise<void>;
}

export const useUserProjectStore = create<UserProjectStore>((set) => ({
  userProjects: [],
  joinedProjects: [],
  allUserProjects: [],
  isLoading: false,
  selectedProject: null,

  setSelectedProject: (project: Project | null) => {
    set({ selectedProject: project });
  },

  fetchMyProjects: async () => {
    try {
      set({ isLoading: true });
      const fetchedProjects = await getMyProjects();
      set((state) => ({ 
        userProjects: fetchedProjects, 
        allUserProjects: [...fetchedProjects, ...state.joinedProjects],
        isLoading: false 
      }));
    } catch (error) {
      console.error('Failed to fetch my projects:', error);
      set({ isLoading: false });
    }
  },

  fetchJoinedProjects: async () => {
    try {
      set({ isLoading: true });
      const fetchedJoinedProjects = await getJoinedProjects();
      set((state) => ({ 
        joinedProjects: fetchedJoinedProjects,
        allUserProjects: [...state.userProjects, ...fetchedJoinedProjects],
        isLoading: false 
      }));
    } catch (error) {
      console.error('Failed to fetch joined projects:', error);
      set({ isLoading: false });
    }
  },

  fetchAllUserProjects: async () => {
    try {
      set({ isLoading: true });
      const [createdProjects, joinedProjectsList] = await Promise.all([
        getMyProjects(),
        getJoinedProjects()
      ]);
      
      // Combine projects and remove duplicates (in case user created and joined same project)
      const allProjects = [...createdProjects];
      joinedProjectsList.forEach(joinedProject => {
        if (!allProjects.find(p => p.id === joinedProject.id)) {
          allProjects.push(joinedProject);
        }
      });
      
      set({ 
        userProjects: createdProjects,
        joinedProjects: joinedProjectsList,
        allUserProjects: allProjects,
        isLoading: false 
      });
    } catch (error) {
      console.error('Failed to fetch all user projects:', error);
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
        allUserProjects: [...(state.allUserProjects || []), createdProject],
        isLoading: false,
      }));
      
      // Also add to all projects store
      useProjectStore.getState().addProject(createdProject);
    } catch (error) {
      console.error('Failed to create project:', error);
      set({ isLoading: false });
    }
  },

  updateProject: async (projectId: number, projectData: UpdateProjectRequest) => {
    try {
      set({ isLoading: true });
      const updatedProject = await updateProject(projectId, projectData);
      
      // Update in user's projects and allUserProjects
      set((state) => ({
        userProjects: state.userProjects.map(p => p.id === projectId ? updatedProject : p),
        allUserProjects: state.allUserProjects.map(p => p.id === projectId ? updatedProject : p),
        isLoading: false,
        selectedProject: updatedProject, // Update selected project if it was the one being edited
      }));
    } catch (error) {
      console.error('Failed to update project:', error);
      set({ isLoading: false });
    }
  },

  deleteProject: async (projectId: number) => {
    try {
      set({ isLoading: true });
      await deleteProject(projectId);
      
      // Remove from user's projects and allUserProjects
      set((state) => ({
        userProjects: state.userProjects.filter(p => p.id !== projectId),
        allUserProjects: state.allUserProjects.filter(p => p.id !== projectId),
        isLoading: false,
        selectedProject: null,
      }));
      
      // Also remove from all projects store
      useProjectStore.getState().removeProject(projectId);
    } catch (error) {
      console.error('Failed to delete project:', error);
      set({ isLoading: false });
    }
  }
}));