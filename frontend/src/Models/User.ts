export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  summary: string;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  summary: string;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
}