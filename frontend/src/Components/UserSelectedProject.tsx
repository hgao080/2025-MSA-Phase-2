import { useState } from 'react';
import { useUserProjectStore } from '../Stores/UserProjectStore';
import type { ProjectType } from '../Models/Project';
import { 
  UserIcon, 
  TagIcon, 
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function UserSelectedProject() {
	const project = useUserProjectStore((state) => state.selectedProject);
	const updateProject = useUserProjectStore((state) => state.updateProject);
	const deleteProject = useUserProjectStore((state) => state.deleteProject);

	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState('');
	const [editedDescription, setEditedDescription] = useState('');
	const [editedTag, setEditedTag] = useState<ProjectType>('Frontend');

	const handleEdit = () => {
		if (project) {
			setEditedTitle(project.title);
			setEditedDescription(project.description);
			setEditedTag(project.tag);
			setIsEditing(true);
		}
	};

	const handleSave = async () => {
		if (!project) return;

		await updateProject(project.id, {
			title: editedTitle,
			description: editedDescription,
			tag: editedTag,
			rolesNeeded: project.rolesNeeded.map(role => ({
				title: role.title,
				description: role.description,
				skillsRequired: role.skillsRequired
			})),
			teamSize: project.teamSize,
			estimatedDuration: project.estimatedDuration
		});

		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedTitle('');
		setEditedDescription('');
		setEditedTag('Frontend');
	};

	const handleDelete = async () => {
		if (!project) {
			console.error('No project selected for deletion.');
			return;
		}

		if (window.confirm('Are you sure you want to delete this project?')) {
			await deleteProject(project.id);
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
			<div className='flex justify-center items-center bg-white shadow-sm p-8 border border-gray-200 rounded-xl h-full'>
				<div className='text-center'>
					<div className="flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 mx-auto mb-4 rounded-full w-16 h-16">
						<TagIcon className="w-8 h-8 text-gray-400" />
					</div>
					<h3 className="mb-2 font-medium text-gray-900 text-lg">No project selected</h3>
					<p className="text-gray-500 text-sm">
						Choose a project from the list to view and manage its details.
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
				className='flex flex-col bg-white shadow-sm border border-gray-200 rounded-xl h-full overflow-hidden'
			>
				{/* Header */}
				<div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 px-6 py-6 border-gray-100 border-b">
					{/* Title and Metadata Row */}
					<div className="mb-4">
						{isEditing ? (
							<div className="space-y-3">
								<input
									type='text'
									value={editedTitle}
									onChange={(e) => setEditedTitle(e.target.value)}
									className='bg-white px-3 py-2 border-2 border-gray-300 focus:border-indigo-500 rounded-lg outline-none w-full font-bold text-2xl'
									placeholder='Project title'
								/>
								<select
									value={editedTag}
									onChange={(e) => setEditedTag(e.target.value as ProjectType)}
									className='bg-white px-3 py-2 border-2 border-gray-300 focus:border-indigo-500 rounded-lg outline-none'
								>
									<option value='Frontend'>Frontend</option>
									<option value='Backend'>Backend</option>
									<option value='Fullstack'>Fullstack</option>
								</select>
							</div>
						) : (
							<>
								<div className="flex items-center gap-3 mb-3">
									<span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${getTagColor(project.tag)} text-white`}>
										<TagIcon className="mr-1.5 w-4 h-4" />
										{project.tag}
									</span>
									{project.estimatedDuration && (
										<span className="inline-flex items-center gap-1.5 text-gray-600 text-sm">
											<ClockIcon className="w-4 h-4" />
											{project.estimatedDuration} {project.estimatedDuration === 1 ? 'month' : 'months'}
										</span>
									)}
								</div>
								
								<h2 className="mb-3 font-bold text-gray-900 text-2xl leading-tight">
									{project.title}
								</h2>

								{/* Team Progress */}
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2">
										<UserGroupIcon className="w-5 h-5 text-gray-500" />
										<span className="text-gray-600 text-sm">
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
							</>
						)}
					</div>
					
					{/* Action Buttons Row */}
					<div className="flex justify-center gap-3">
						{isEditing ? (
							<>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='inline-flex items-center bg-gradient-to-r from-green-600 hover:from-green-700 to-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl px-6 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200'
									onClick={handleSave}
								>
									<CheckCircleIcon className="mr-2 w-4 h-4" />
									Save Changes
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='inline-flex items-center bg-gray-500 hover:bg-gray-600 shadow-lg hover:shadow-xl px-6 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200'
									onClick={handleCancel}
								>
									Cancel
								</motion.button>
							</>
						) : (
							<>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='inline-flex items-center bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl px-6 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200'
									onClick={handleEdit}
								>
									<PencilIcon className="mr-2 w-4 h-4" />
									Edit Project
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='inline-flex items-center bg-gradient-to-r from-red-600 hover:from-red-700 to-pink-600 hover:to-pink-700 shadow-lg hover:shadow-xl px-6 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200'
									onClick={handleDelete}
								>
									<TrashIcon className="mr-2 w-4 h-4" />
									Delete
								</motion.button>
							</>
						)}
					</div>
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
						<h3 className="flex items-center gap-2 mb-3 font-semibold text-gray-900 text-lg">
							<AcademicCapIcon className="w-5 h-5 text-indigo-600" />
							Project Description
						</h3>
						{isEditing ? (
							<textarea
								value={editedDescription}
								onChange={(e) => setEditedDescription(e.target.value)}
								className='bg-white p-4 border-2 border-gray-300 focus:border-indigo-500 rounded-lg outline-none w-full resize-none'
								rows={4}
								placeholder='Project description'
							/>
						) : (
							<p className="bg-gray-50 p-4 border rounded-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
								{project.description}
							</p>
						)}
					</motion.div>

					{/* Roles Section */}
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="mb-8"
					>
						<h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-900 text-lg">
							<UserGroupIcon className="w-5 h-5 text-indigo-600" />
							Team Roles
						</h3>

						{/* Open Roles */}
						{openRoles.length > 0 && (
							<div className="mb-6">
								<h4 className="flex items-center gap-2 mb-3 font-medium text-amber-800 text-md">
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
											className="bg-amber-50 hover:bg-amber-100/50 p-4 border border-amber-200 rounded-lg transition-colors"
										>
											<div className="flex justify-between items-start mb-2">
												<h5 className="font-semibold text-amber-900">{role.title}</h5>
												<span className="bg-amber-200 px-2 py-1 rounded-full font-medium text-amber-800 text-xs">
													Open
												</span>
											</div>
											<p className="mb-3 text-amber-800 text-sm">{role.description}</p>
											<div className="flex flex-wrap gap-2">
												{role.skillsRequired.map((skill) => (
													<span key={skill} className="inline-flex items-center bg-amber-100 px-2.5 py-1 border border-amber-200 rounded-md font-medium text-amber-800 text-xs">
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
							<div>
								<h4 className="flex items-center gap-2 mb-3 font-medium text-green-800 text-md">
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
											className="bg-green-50 hover:bg-green-100/50 p-4 border border-green-200 rounded-lg transition-colors"
										>
											<div className="flex justify-between items-start mb-2">
												<h5 className="font-semibold text-green-900">{role.title}</h5>
												<span className="bg-green-200 px-2 py-1 rounded-full font-medium text-green-800 text-xs">
													Filled
												</span>
											</div>
											<p className="mb-3 text-green-800 text-sm">{role.description}</p>
											<div className="flex flex-wrap gap-2">
												{role.skillsRequired.map((skill) => (
													<span key={skill} className="inline-flex items-center bg-green-100 px-2.5 py-1 border border-green-200 rounded-md font-medium text-green-800 text-xs">
														{skill}
													</span>
												))}
											</div>
										</motion.div>
									))}
								</div>
							</div>
						)}

						{project.rolesNeeded.length === 0 && (
							<div className="py-8 text-center">
								<UserIcon className="mx-auto mb-3 w-12 h-12 text-gray-400" />
								<p className="text-gray-500">No roles defined for this project yet.</p>
							</div>
						)}
					</motion.div>

					{/* Project Owner */}
					<motion.div 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="pt-6 border-gray-100 border-t"
					>
						<div className="flex items-center gap-2 text-gray-500 text-sm">
							<UserIcon className="w-4 h-4" />
							<span>Project Owner: <span className="font-medium text-gray-700">{project.authorEmail.split('@')[0]}</span></span>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
