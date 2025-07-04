import { useAuthStore } from '../Stores/AuthStore';
import { useProjectStore } from '../Stores/ProjectStore';
import { UserIcon, TagIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
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

	const getTagColor = (tag: string) => {
		switch (tag) {
			case 'Frontend':
				return 'bg-blue-100 text-blue-800 border-blue-200';
			case 'Backend':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'Fullstack':
				return 'bg-purple-100 text-purple-800 border-purple-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	return (
		<div className="h-full">
			{project != null ? (
				<div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col'>
					{/* Header */}
					<div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
						<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
							<div className="flex-1">
								<h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
									{project.title}
								</h2>
								
								{/* Project Tag */}
								<span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getTagColor(project.tag)}`}>
									<TagIcon className="w-4 h-4 mr-1.5" />
									{project.tag}
								</span>
							</div>
							
							{/* Apply Button */}
							{user?.email !== project.authorEmail && (
								<button
									onClick={handleApply}
									className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									<PaperAirplaneIcon className="w-4 h-4 mr-2" />
									Apply to Join
								</button>
							)}
						</div>
					</div>

					{/* Content */}
					<div className="flex-1 px-6 py-5">
						{/* Description */}
						<div className="mb-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-3">About this project</h3>
							<p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
								{project.description}
							</p>
						</div>
						
						{/* Author Info */}
						<div className="border-t border-gray-100 pt-4">
							<h4 className="text-sm font-medium text-gray-900 mb-2">Project Creator</h4>
							<div className="flex items-center gap-2 text-gray-600">
								<div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
									<UserIcon className="w-4 h-4" />
								</div>
								<span className="text-sm">{project.authorEmail}</span>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='bg-white rounded-xl shadow-sm border border-gray-200 h-full flex items-center justify-center p-8'>
					<div className='text-center'>
						<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<TagIcon className="w-8 h-8 text-gray-400" />
						</div>
						<h3 className="text-lg font-medium text-gray-900 mb-2">No project selected</h3>
						<p className="text-gray-500 text-sm">
							Choose a project from the list to view its details and apply to join.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
