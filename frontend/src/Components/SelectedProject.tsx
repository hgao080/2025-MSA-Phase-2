import { useAuthStore } from '../Stores/AuthStore';
import { useProjectStore } from '../Stores/ProjectStore';
import { 
  UserIcon, 
  TagIcon, 
  PaperAirplaneIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useUserApplicationStore } from '../Stores/UserApplicationStore';
import toast from 'react-hot-toast';

export default function SelectedProject() {
	const navigate = useNavigate();

	const user = useAuthStore((state) => state.user);
	const project = useProjectStore((state) => state.selectedProject);
	const { applyToProject } = useUserApplicationStore();

	const handleApply = async () => {
		if (!user) {
			navigate('/login');
			return;
		}

		if (!project) {
			toast.error('No project selected');
			return;
		}

		const applyRequest = {
			projectId: project.id,
		}

		try {
			await applyToProject(applyRequest);
			toast.success(`Successfully applied to ${project.title}! 🎉`, {
				duration: 4000,
			});
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
			
			if (errorMessage === 'ALREADY_APPLIED') {
				toast.error('You have already applied to this project', {
					duration: 5000,
				});
			} else {
				toast.error(`Failed to apply: ${errorMessage}`, {
					duration: 5000,
				});
			}
		}
	};

	const getTagColor = (tag: string) => {
		switch (tag) {
			case 'Frontend':
				return 'from-blue-500 to-cyan-500';
			case 'Backend':
				return 'from-purple-500 to-pink-500';
			case 'Fullstack':
				return 'from-green-500 to-teal-500';
			default:
				return 'from-gray-500 to-gray-600';
		}
	};

	if (!project) {
		return (
			<div className='flex justify-center items-center bg-white dark:bg-gray-800 shadow-sm p-8 border border-gray-200 dark:border-gray-700 rounded-xl h-full'>
				<div className='text-center'>
					<div className="flex justify-center items-center bg-gradient-to-br from-gray-100 dark:from-gray-700 to-gray-200 dark:to-gray-600 mx-auto mb-4 rounded-full w-16 h-16">
						<TagIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
					</div>
					<h3 className="mb-2 font-medium text-gray-900 dark:text-gray-100 text-lg">No project selected</h3>
					<p className="text-gray-500 dark:text-gray-400 text-sm">
						Choose a project from the list to view its details and apply to join.
					</p>
				</div>
			</div>
		);
	}

	const openRoles = project.rolesNeeded.filter(role => !role.filled);
	const filledRoles = project.rolesNeeded.filter(role => role.filled);
	const teamProgress = (project.currentTeamSize / project.teamSize) * 100;

	return (
		<div className="h-full">
			<motion.div 
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='flex flex-col bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl h-full overflow-hidden'
			>
				{/* Header */}
				<div className="bg-gradient-to-r from-indigo-50/50 dark:from-gray-700/50 to-purple-50/50 dark:to-gray-600/50 px-6 py-6 border-gray-100 dark:border-gray-700 border-b">
					{/* Title and Metadata Row */}
					<div className="mb-4">
						<div className="flex items-center gap-3 mb-3">
							<span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${getTagColor(project.tag)} text-white`}>
								<TagIcon className="mr-1.5 w-4 h-4" />
								{project.tag}
							</span>
							{project.estimatedDuration && (
								<span className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-sm">
									<ClockIcon className="w-4 h-4" />
									{project.estimatedDuration} {project.estimatedDuration === 1 ? 'month' : 'months'}
								</span>
							)}
						</div>
						
						<h2 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-2xl leading-tight">
							{project.title}
						</h2>

						{/* Team Progress */}
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<UserGroupIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
								<span className="text-gray-600 dark:text-gray-400 text-sm">
									{project.currentTeamSize}/{project.teamSize} members
								</span>
							</div>
							<div className="flex-1 max-w-40">
								<div className="bg-gray-200 rounded-full w-full h-2">
									<motion.div 
										initial={{ width: 0 }}
										animate={{ width: `${teamProgress}%` }}
										transition={{ duration: 1, delay: 0.3 }}
										className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full h-full"
									/>
								</div>
							</div>
						</div>
					</div>
					
					{/* Apply Button Row */}
					{user?.email !== project.authorEmail && project.currentTeamSize !== project.teamSize && (
						<div className="flex justify-center">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleApply}
								className="inline-flex items-center bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl px-8 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-white text-sm transition-all duration-200 hover:cursor-pointer"
							>
								<PaperAirplaneIcon className="mr-2 w-4 h-4" />
								Apply to Join
							</motion.button>
						</div>
					)}
				</div>

				{/* Content */}
				<div className="flex-1 px-6 py-6 overflow-y-auto">
					{/* Description */}
					<motion.div 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mb-8"
					>
						<h3 className="flex items-center gap-2 mb-2 font-semibold text-gray-900 dark:text-gray-100 text-lg">
							<AcademicCapIcon className="w-5 h-5 text-indigo-600" />
							About this project
						</h3>
						<p className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
							{project.description}
						</p>
					</motion.div>

					{/* Roles Section */}
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="mb-8"
					>
						<h3 className="flex items-center gap-2 mb-2 font-semibold text-gray-900 dark:text-gray-100 text-lg">
							<UserGroupIcon className="w-5 h-5 text-indigo-600" />
							Team Roles
						</h3>

						{/* Open Roles */}
						{openRoles.length > 0 && (
							<div className="mb-6">
								<h4 className="flex items-center gap-2 mb-3 font-medium text-amber-800 dark:text-amber-400 text-md">
									<ExclamationCircleIcon className="w-4 h-4" />
									Open Positions ({openRoles.length})
								</h4>
								<div className="space-y-3">
									{openRoles.map((role, index) => (
										<motion.div 
											key={role.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: 0.1 * index }}
											className="bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100/50 dark:hover:bg-amber-900/30 p-4 border border-amber-200 dark:border-amber-700 rounded-lg transition-colors"
										>
											<div className="flex justify-between items-start mb-2">
												<h5 className="font-semibold text-amber-900 dark:text-amber-200">{role.title}</h5>
												<span className="bg-amber-200 dark:bg-amber-800 px-2 py-1 rounded-full font-medium text-amber-800 dark:text-amber-200 text-xs">
													Open
												</span>
											</div>
											<p className="mb-3 text-amber-800 dark:text-amber-300 text-sm">{role.description}</p>
											<div className="flex flex-wrap gap-2">
												{role.skillsRequired.map((skill) => (
													<span key={skill} className="inline-flex items-center bg-amber-100 dark:bg-amber-800/30 px-2.5 py-1 border border-amber-200 dark:border-amber-700 rounded-md font-medium text-amber-800 dark:text-amber-300 text-xs">
														{skill}
													</span>
												))}
											</div>
										</motion.div>
									))}
								</div>
							</div>
						)}

						{/* Filled Roles */}
						{filledRoles.length > 0 && (
							<div className="mb-6">
								<h4 className="flex items-center gap-2 mb-3 font-medium text-green-800 dark:text-green-400 text-md">
									<CheckCircleIcon className="w-4 h-4" />
									Filled Positions ({filledRoles.length})
								</h4>
								<div className="space-y-3">
									{filledRoles.map((role, index) => (
										<motion.div 
											key={role.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: 0.1 * index }}
											className="bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-700 rounded-lg"
										>
											<div className="flex justify-between items-start mb-2">
												<h5 className="font-semibold text-green-900 dark:text-green-200">{role.title}</h5>
												<span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded-full font-medium text-green-800 dark:text-green-200 text-xs">
													Filled
												</span>
											</div>
											<p className="mb-3 text-green-800 dark:text-green-300 text-sm">{role.description}</p>
											<div className="flex flex-wrap gap-2">
												{role.skillsRequired.map((skill) => (
													<span key={skill} className="inline-flex items-center bg-green-100 dark:bg-green-800/30 px-2.5 py-1 border border-green-200 dark:border-green-700 rounded-md font-medium text-green-800 dark:text-green-300 text-xs">
														{skill}
													</span>
												))}
											</div>
										</motion.div>
									))}
								</div>
							</div>
						)}
					</motion.div>
					
					{/* Author Info */}
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="pt-4 border-gray-100 dark:border-gray-700 border-t"
					>
						<h4 className="flex items-center gap-2 mb-3 font-semibold text-gray-900 dark:text-gray-100 text-md">
							<UserIcon className="w-4 h-4 text-indigo-600" />
							Project Creator
						</h4>
						<div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 p-3 border dark:border-gray-600 rounded-lg">
							<div className="flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full w-10 h-10 font-medium text-white">
								{project.authorEmail.charAt(0).toUpperCase()}
							</div>
							<div>
								<p className="font-medium text-gray-900 dark:text-gray-100">{project.authorName}</p>
								<p className="text-gray-600 dark:text-gray-400 text-sm">{project.authorEmail}</p>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
