export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  summary: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  websiteUrl: string | null;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  summary: string;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
}