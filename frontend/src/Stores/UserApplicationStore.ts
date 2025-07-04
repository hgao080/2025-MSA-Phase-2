import { create } from 'zustand';
import type {
	Application,
	ApplyRequest,
	UpdateApplicantStatusRequest,
} from '../Models/Application';
import {
	getMyApplicants,
	getMyApplications,
	postApplication,
	updateApplicantStatus,
  withdrawApplication,
} from '../Services/ApplicationService';

interface UserApplicationStore {
	applications: Application[];
	applicants: Application[];
	isLoading: boolean;
	applyToProject: (application: ApplyRequest) => Promise<void>;
	fetchApplicationsPage: () => Promise<void>;
	withdrawApplication: (applicationId: number) => Promise<void>;
	updateApplicantStatus: (
		id: number,
		status: UpdateApplicantStatusRequest
	) => Promise<void>;
}

export const useUserApplicationStore = create<UserApplicationStore>((set) => ({
	applications: [],
	applicants: [],
	isLoading: false,

	applyToProject: async (application: ApplyRequest) => {
		try {
			set({ isLoading: true });
			const newApplication = await postApplication(application);
			set((state) => ({
				applications: [...state.applications, newApplication],
				isLoading: false,
			}));
		} catch (error) {
			console.error('Failed to apply to project:', error);
			set({ isLoading: false });
		}
	},

	fetchApplicationsPage: async () => {
		try {
			set({ isLoading: true });
			const applications = await getMyApplications();
			const applicants = await getMyApplicants();
			set({
				applications,
				applicants,
				isLoading: false,
			});
		} catch (error) {
			console.error('Failed to fetch applications:', error);
			set({ isLoading: false });
		}
	},

	withdrawApplication: async (applicationId: number) => {
		try {
			set({ isLoading: true });
			const application = await withdrawApplication(applicationId);

			// Update local state
			set((state) => ({
				applications: state.applications.map((app) =>
					app.id === application.id
						? { ...app, status: application.status }
						: app
				),
				isLoading: false,
			}));
		} catch (error) {
			console.error('Failed to withdraw application:', error);
			set({ isLoading: false });
		}
	},

	updateApplicantStatus: async (
		id: number,
		status: UpdateApplicantStatusRequest
	) => {
		try {
			set({ isLoading: true });
			const application = await updateApplicantStatus(id, status);

			// Update local state
			set((state) => ({
				applicants: state.applicants.map(
					(app) => app.id === application.id ? {...app, status: application.status} : app
				),
				isLoading: false,
			}));
		} catch (error) {
			console.error('Failed to approve application:', error);
			set({ isLoading: false });
		}
	},
}));
