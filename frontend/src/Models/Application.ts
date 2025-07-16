export interface Application {
  id: number;
  projectId: number;
  projectTitle: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  message: string;
  status: ApplicationStatus;
  appliedAt: string; // ISO date string
  reviewedAt?: string; // ISO date string, optional
}

export interface ApplyRequest {
  projectId: number;
}

export interface UpdateApplicantStatusRequest {
  status: ApplicationStatus;
}

// Use union type instead of enum for erasableSyntaxOnly compatibility
export type ApplicationStatus = 'Pending' | 'Approved' | 'Denied' | 'Withdrawn';