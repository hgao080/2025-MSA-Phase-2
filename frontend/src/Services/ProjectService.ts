import { type CreateProjectRequest, type Project, type UpdateProjectRequest } from '../Models/Project';
import { apiRequest } from './apiClient';

export const getProjects = async (): Promise<Project[]> => {
  // // Simulate API delay
  // await new Promise(resolve => setTimeout(resolve, 500));
  // return DUMMY_PROJECTS;
  
  try {
    return await apiRequest<Project[]>('/Projects', 'GET');
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};

export const getProject = async (id: number): Promise<Project> => {
  try {
    return await apiRequest<Project>(`/Projects/${id}`, 'GET');
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error('Failed to fetch project');
  }
};

export const createProject = async (req: CreateProjectRequest): Promise<Project> => {
  try {
    return await apiRequest<Project>('/Projects', 'POST', req);
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
};

export const updateProject = async (id: number, req: UpdateProjectRequest): Promise<Project> => {
  try {
    return await apiRequest<Project>(`/Projects/${id}`, 'PUT', req);
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
};

export const deleteProject = async (id: number): Promise<void> => {
  try {
    await apiRequest<void>(`/Projects/${id}`, 'DELETE');
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
};

export const getMyProjects = async (): Promise<Project[]> => {
  // // Simulate API delay
  // await new Promise(resolve => setTimeout(resolve, 300));
  
  // // Return a subset of dummy projects as "user's projects"
  // const myProjects = DUMMY_PROJECTS.slice(0, 3).map(project => ({
  //   ...project,
  //   id: project.id + 10, // Different IDs to avoid conflicts
  //   authorEmail: "current.user@university.edu" // Simulate current user's projects
  // }));
  
  // return myProjects;
  
  try {
    return await apiRequest<Project[]>('/Projects/my-projects', 'GET');
  } catch (error) {
    console.error('Error fetching my projects:', error);
    throw new Error('Failed to fetch my projects');
  }
};

export const getJoinedProjects = async (): Promise<Project[]> => {
  try {
    return await apiRequest<Project[]>('/Projects/joined-projects', 'GET');
  } catch (error) {
    console.error('Error fetching joined projects:', error);
    throw new Error('Failed to fetch joined projects');
  }
};