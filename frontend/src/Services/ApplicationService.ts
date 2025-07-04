import type { Application, ApplyRequest, UpdateApplicantStatusRequest } from "../Models/Application";
import { apiRequest } from "../Services/apiClient";

export const postApplication = async (req: ApplyRequest): Promise<Application> => {
  try {
    return await apiRequest<Application>('/Applications', 'POST', req);
  } catch (error) {
    console.error('Error posting application:', error);
    throw new Error('Failed to post application');
  }
}

export const getMyApplications = async (): Promise<Application[]> => {
  try {
    return await apiRequest<Application[]>('/Applications/my-applications', 'GET');
  } catch (error) {
    console.error('Error fetching my applications:', error);
    throw new Error('Failed to fetch applications');
  }
}

export const getMyApplicants = async (): Promise<Application[]> => {
  try {
    return await apiRequest<Application[]>('/Applications/my-projects', 'GET');
  } catch (error) {
    console.error('Error fetching my applicants:', error);
    throw new Error('Failed to fetch applicants');
  }
}

export const updateApplicantStatus = async (id: number, req: UpdateApplicantStatusRequest) : Promise<Application> => {
  try {
    return await apiRequest<Application>(`/Applications/${id}/status`, 'PATCH', req);
  } catch (error) {
    console.error('Error updating applicant status:', error);
    throw new Error('Failed to update applicant status');
  }
}

export const withdrawApplication = async (id: number): Promise<Application> => {
  try {
    return await apiRequest<Application>(`/Applications/${id}/withdraw`, 'PATCH');
  } catch (error) {
    console.error('Error withdrawing applicaiton:', error);
    throw new Error('Failed to withdraw application');
  }
}