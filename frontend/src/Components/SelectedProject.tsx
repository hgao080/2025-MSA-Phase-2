import { useAuthStore } from '../Stores/AuthStore';
import { useProjectStore } from '../Stores/ProjectStore';

import { useNavigate } from 'react-router';
import { useUserApplicationStore } from '../Stores/UserApplicationStore';

export default function SelectedProject() {
	const navigate = useNavigate();

	const user = useAuthStore((state) => state.user);
	const project = useProjectStore((state) => state.selectedProject);
	const { applyToProject } = useUserApplicationStore();

	const handleApply = async () => {
		if (!user) {
			navigate('/login');
		}

		if (!project) {
			alert('No project selected');
			return;
		}

		const applyRequest = {
			projectId: project.id,
			message: '',
		}

		await applyToProject(applyRequest);
	};

	return (
		<>
			{project != null ? (
				<div className='flex flex-col shadow-xl rounded-3xl p-6'>
					<div className='flex justify-between items-center'>
						<h2>{project?.title}</h2>
						{user?.email != project.authorEmail ? <button
							className='hover:cursor-pointer'
							onClick={handleApply}>
							Apply
						</button> : null}
					</div>
					<p className=''>{project?.description}</p>
				</div>
			) : (
				<div className='text-center'>
					No project selected. Please select a project to view
					details.
				</div>
			)}
		</>
	);
}
