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
  authorEmail: string;
  rolesNeeded: ProjectRole[];
  teamSize: number;
  currentTeamSize: number;
  estimatedDuration?: string;
  skillTags: string[];
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  tag: ProjectType;
  rolesNeeded: Omit<ProjectRole, 'id' | 'filled'>[];
  teamSize: number;
  estimatedDuration?: string;
  skillTags: string[];
}

export interface UpdateProjectRequest {
  title: string;
  description: string;
  tag: ProjectType;
  rolesNeeded: Omit<ProjectRole, 'id' | 'filled'>[];
  teamSize: number;
  estimatedDuration?: string;
  skillTags: string[];
}

export type ProjectType = 'Frontend' | 'Backend' | 'Fullstack'