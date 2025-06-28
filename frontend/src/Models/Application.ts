export interface Application {
  id: number;
  projectId: number;
  projectTitle: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  message: string;
  status: number,
  appliedAt: Date;
  reviewedAt: Date;
}

export interface ApplyRequest {
  projectId: number;
  message: string;
}