import type { Application, ApplyRequest } from "../Models/Application";
import { apiRequest } from "../Services/apiClient";

export const postApplication = async (req: ApplyRequest): Promise<Application> => {
  try {
    return await apiRequest<Application>('/Applications', 'POST', req);
  } catch (error) {
    console.error('Error posting application:', error);
    throw new Error('Failed to post application');
  }
}