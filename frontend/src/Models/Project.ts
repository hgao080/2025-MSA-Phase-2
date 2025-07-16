export interface ProjectRole {
  id: string;
  title: string;
  description: string;
  skillsRequired: string[];
  filled: boolean;
}

export interface Project {
  id: number;
  title: string;
  tag: ProjectType;
  description: string;
  authorName: string;
  authorEmail: string;
  rolesNeeded: ProjectRole[];
  teamSize: number;
  currentTeamSize: number;
  estimatedDuration?: number; // Duration in months
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  tag: ProjectType;
  rolesNeeded: Omit<ProjectRole, 'id' | 'filled'>[];
  teamSize: number;
  estimatedDuration?: number; // Duration in months
}

export interface UpdateProjectRequest {
  title: string;
  description: string;
  tag: ProjectType;
  rolesNeeded: ProjectRole[];
  teamSize: number;
  estimatedDuration?: number; // Duration in months
}

export type ProjectType = 'Frontend' | 'Backend' | 'Fullstack'