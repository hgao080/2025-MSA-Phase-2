export interface Project {
  id: number;
  title: string;
  description: string;
  authorEmail: string;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
}

export interface UpdateProjectRequest {
  title: string;
  description: string;
}