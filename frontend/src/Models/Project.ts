export interface Project {
  id: number;
  title: string;
  tag: ProjectType;
  description: string;
  authorEmail: string;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  tag: ProjectType;
}

export interface UpdateProjectRequest {
  title: string;
  description: string;
  tag: ProjectType;
}

export type ProjectType = 'Frontend' | 'Backend' | 'Fullstack'