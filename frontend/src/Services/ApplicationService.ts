import type { Application, ApplyRequest, UpdateApplicantStatusRequest } from "../Models/Application";
import { apiRequest } from "../Services/apiClient";

export const postApplication = async (req: ApplyRequest): Promise<Application> => {
  try {
    return await apiRequest<Application>('/Applications', 'POST', req);
  } catch (error: unknown) {
    console.error('Error posting application:', error);
    
    // Check if it's a 400 Bad Request with the "already applied" message
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as { response?: { status?: number; data?: string } };
      if (apiError.response?.status === 400) {
        const errorMessage = apiError.response?.data || '';
        if (typeof errorMessage === 'string' && errorMessage.includes('already applied')) {
          throw new Error('ALREADY_APPLIED');
        }
      }
    }
    
    // For other errors, preserve the original error message or provide a generic one
    let errorMessage = 'Failed to submit application';
    if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = (error as { message: string }).message;
    } else if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as { response?: { data?: string } };
      errorMessage = apiError.response?.data || errorMessage;
    }
    
    throw new Error(errorMessage);
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