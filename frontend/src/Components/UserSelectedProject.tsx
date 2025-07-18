import { useState, useEffect } from "react";
import { useUserProjectStore } from "../Stores/UserProjectStore";
import type { ProjectType, ProjectRole } from "../Models/Project";
import {
	UserIcon,
	TagIcon,
	PencilIcon,
	TrashIcon,
	UserGroupIcon,
	ClockIcon,
	CheckCircleIcon,
	ExclamationCircleIcon,
	AcademicCapIcon,
	PlusIcon,
	XMarkIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function UserSelectedProject() {
	const project = useUserProjectStore((state) => state.selectedProject);
	const updateProject = useUserProjectStore((state) => state.updateProject);
	const deleteProject = useUserProjectStore((state) => state.deleteProject);

	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState("");
	const [editedDescription, setEditedDescription] = useState("");
	const [editedTag, setEditedTag] = useState<ProjectType>("Frontend");
	const [editedTeamSize, setEditedTeamSize] = useState(3);
	const [editedEstimatedDuration, setEditedEstimatedDuration] = useState<
		number | undefined
	>(undefined);
	const [editedRoles, setEditedRoles] = useState<ProjectRole[]>([]);
	const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

	const handleEdit = () => {
		if (project) {
			setEditedTitle(project.title);
			setEditedDescription(project.description);
			setEditedTag(project.tag);
			setEditedTeamSize(project.teamSize);
			setEditedEstimatedDuration(project.estimatedDuration);
			setEditedRoles(JSON.parse(JSON.stringify(project.rolesNeeded))); // Deep copy
			setCurrentRoleIndex(0); // Reset to first role when editing
			setIsEditing(true);
		}
	};

	const handleSave = async () => {
		if (!project) return;

		await updateProject(project.id, {
			title: editedTitle,
			description: editedDescription,
			tag: editedTag,
			rolesNeeded: editedRoles,
			teamSize: editedTeamSize,
			estimatedDuration: editedEstimatedDuration,
		});

		setIsEditing(false);
	};

	// Role management functions
	const addRole = () => {
		const newRole: ProjectRole = {
			id: `role-${Date.now()}`,
			title: "",
			description: "",
			skillsRequired: [],
			filled: false,
		};
		const newRoles = [...editedRoles, newRole];
		setEditedRoles(newRoles);
		// Navigate to the newly added role
		setCurrentRoleIndex(newRoles.length - 1);
	};

	const updateRole = (
		index: number,
		field: keyof ProjectRole,
		value: string | string[] | boolean
	) => {
		const updatedRoles = [...editedRoles];
		updatedRoles[index] = { ...updatedRoles[index], [field]: value };
		setEditedRoles(updatedRoles);
	};

	const removeRole = (index: number) => {
		const newRoles = editedRoles.filter((_, i) => i !== index);
		setEditedRoles(newRoles);
		
		// Adjust current index after removal
		if (newRoles.length === 0) {
			setCurrentRoleIndex(0);
		} else if (currentRoleIndex >= newRoles.length) {
			setCurrentRoleIndex(newRoles.length - 1);
		} else if (index < currentRoleIndex) {
			setCurrentRoleIndex(currentRoleIndex - 1);
		}
		// If we removed the current role, stay at the same index (which now shows the next role)
	};

	const addSkillToRole = (roleIndex: number, skill: string) => {
		if (
			skill.trim() &&
			!editedRoles[roleIndex].skillsRequired.includes(skill.trim())
		) {
			updateRole(roleIndex, "skillsRequired", [
				...editedRoles[roleIndex].skillsRequired,
				skill.trim(),
			]);
		}
	};

	const removeSkillFromRole = (roleIndex: number, skillToRemove: string) => {
		updateRole(
			roleIndex,
			"skillsRequired",
			editedRoles[roleIndex].skillsRequired.filter(
				(skill) => skill !== skillToRemove
			)
		);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedTitle("");
		setEditedDescription("");
		setEditedTag("Frontend");
		setEditedTeamSize(3);
		setEditedEstimatedDuration(undefined);
		setEditedRoles([]);
	};

	// Role carousel navigation functions
	const nextRole = () => {
		const rolesArray = isEditing ? editedRoles : project?.rolesNeeded || [];
		if (rolesArray.length > 0) {
			setCurrentRoleIndex(
				(prev) => (prev + 1) % rolesArray.length
			);
		}
	};

	const prevRole = () => {
		const rolesArray = isEditing ? editedRoles : project?.rolesNeeded || [];
		if (rolesArray.length > 0) {
			setCurrentRoleIndex(
				(prev) =>
					(prev - 1 + rolesArray.length) %
					rolesArray.length
			);
		}
	};

	const handleDelete = async () => {
		if (!project) {
			console.error("No project selected for deletion.");
			return;
		}

		if (window.confirm("Are you sure you want to delete this project?")) {
			await deleteProject(project.id);
		}
	};

	const getTagColor = (tag: string) => {
		switch (tag) {
			case "Frontend":
				return "from-blue-500 to-cyan-500";
			case "Backend":
				return "from-purple-500 to-pink-500";
			case "Fullstack":
				return "from-green-500 to-teal-500";
			default:
				return "from-gray-500 to-gray-600";
		}
	};

	// Reset role index when project changes or when there are no roles
	useEffect(() => {
		const rolesArray = isEditing ? editedRoles : project?.rolesNeeded || [];
		
		if (rolesArray.length === 0) {
			setCurrentRoleIndex(0);
		} else if (currentRoleIndex >= rolesArray.length) {
			setCurrentRoleIndex(Math.max(0, rolesArray.length - 1));
		}
	}, [project, editedRoles, currentRoleIndex, isEditing]);

	if (!project) {
		return (
			<div className='flex justify-center items-center bg-white dark:bg-gray-800 shadow-sm p-8 border border-gray-200 dark:border-gray-700 rounded-xl h-full'>
				<div className='text-center'>
					<div className='flex justify-center items-center bg-gradient-to-br from-gray-100 dark:from-gray-700 to-gray-200 dark:to-gray-600 mx-auto mb-4 rounded-full w-16 h-16'>
						<TagIcon className='w-8 h-8 text-gray-400 dark:text-gray-300' />
					</div>
					<h3 className='mb-2 font-medium text-gray-900 dark:text-gray-100 text-lg'>
						No project selected
					</h3>
					<p className='text-gray-500 dark:text-gray-400 text-sm'>
						Choose a project from the list to view and manage its
						details.
					</p>
				</div>
			</div>
		);
	}

	const openRoles = project.rolesNeeded.filter((role) => !role.filled);
	const filledRoles = project.rolesNeeded.filter((role) => role.filled);

	return (
		<div className='h-full'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='flex flex-col bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl h-full overflow-hidden'>
				{/* Header */}
				<div className='bg-gradient-to-r from-indigo-50/50 dark:from-gray-700/50 to-purple-50/50 dark:to-gray-600/50 px-6 py-6 border-gray-100 dark:border-gray-700 border-b'>
					{/* Title and Metadata Row */}
					<div className='mb-4'>
						{isEditing ? (
							<div className='space-y-4'>
								{/* Title - Full Width */}
								<input
									type='text'
									value={editedTitle}
									onChange={(e) =>
										setEditedTitle(e.target.value)
									}
									className='bg-white dark:bg-gray-700 px-4 py-3 border-2 border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-lg outline-none w-full font-bold text-gray-900 dark:text-gray-100 text-xl'
									placeholder='Project title'
								/>

								{/* Tag, Team Size, and Duration Row */}
								<div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
									<div>
										<label className='block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm'>
											Category
										</label>
										<select
											value={editedTag}
											onChange={(e) =>
												setEditedTag(
													e.target
														.value as ProjectType
												)
											}
											className='bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-lg outline-none w-full text-gray-900 dark:text-gray-100'>
											<option value='Frontend'>
												Frontend
											</option>
											<option value='Backend'>
												Backend
											</option>
											<option value='Fullstack'>
												Fullstack
											</option>
										</select>
									</div>
									<div>
										<label className='block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm'>
											Team Size
										</label>
										<input
											type='number'
											min='1'
											max='20'
											value={editedTeamSize}
											onChange={(e) =>
												setEditedTeamSize(
													Number(e.target.value)
												)
											}
											className='bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-lg outline-none w-full text-gray-900 dark:text-gray-100'
											placeholder='Team size'
										/>
									</div>
									<div>
										<label className='block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm'>
											Duration (months)
										</label>
										<input
											type='number'
											min='1'
											max='24'
											value={
												editedEstimatedDuration || ""
											}
											onChange={(e) =>
												setEditedEstimatedDuration(
													e.target.value
														? Number(e.target.value)
														: undefined
												)
											}
											className='bg-white dark:bg-gray-700 px-3 py-2 border-2 border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-lg outline-none w-full text-gray-900 dark:text-gray-100'
											placeholder='Duration in months'
										/>
									</div>
								</div>
							</div>
						) : (
							<>
								<div className='flex items-center gap-3 mb-3'>
									<span
										className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${getTagColor(
											project.tag
										)} text-white`}>
										<TagIcon className='mr-1.5 w-4 h-4' />
										{project.tag}
									</span>
									{project.estimatedDuration && (
										<span className='inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-sm'>
											<ClockIcon className='w-4 h-4' />
											{project.estimatedDuration}{" "}
											{project.estimatedDuration === 1
												? "month"
												: "months"}
										</span>
									)}
								</div>

								<h2 className='mb-3 font-bold text-gray-900 dark:text-gray-100 text-2xl leading-tight'>
									{project.title}
								</h2>

								{/* Team Progress */}
								<div className='flex items-center gap-4'>
									<div className='flex items-center gap-2'>
										<UserGroupIcon className='w-5 h-5 text-gray-500 dark:text-gray-400' />
										<span className='text-gray-600 dark:text-gray-400 text-sm'>
											{project.currentTeamSize}/
											{isEditing
												? editedTeamSize
												: project.teamSize}{" "}
											members
										</span>
									</div>
									<div className='flex-1 max-w-40'>
										<div className='bg-gray-200 dark:bg-gray-700 rounded-full w-full h-2'>
											<motion.div
												initial={{ width: 0 }}
												animate={{
													width: `${
														(project.currentTeamSize /
															(isEditing
																? editedTeamSize
																: project.teamSize)) *
														100
													}%`,
												}}
												transition={{
													duration: 1,
													delay: 0.3,
												}}
												className='bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full h-full'
											/>
										</div>
									</div>
								</div>
							</>
						)}
					</div>

					{/* Action Buttons Row */}
					<div className='flex justify-center gap-3'>
						{isEditing ? (
							<>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='inline-flex items-center bg-gradient-to-r from-green-600 hover:from-green-700 to-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl px-6 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200'
									onClick={handleSave}>
									<CheckCircleIcon className='mr-2 w-4 h-4' />
									Save Changes
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='inline-flex items-center bg-gray-500 hover:bg-gray-600 shadow-lg hover:shadow-xl px-6 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200'
									onClick={handleCancel}>
									Cancel
								</motion.button>
							</>
						) : (
							<>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='inline-flex items-center bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl px-6 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200'
									onClick={handleEdit}>
									<PencilIcon className='mr-2 w-4 h-4' />
									Edit Project
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='inline-flex items-center bg-gradient-to-r from-red-600 hover:from-red-700 to-pink-600 hover:to-pink-700 shadow-lg hover:shadow-xl px-6 py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-200'
									onClick={handleDelete}>
									<TrashIcon className='mr-2 w-4 h-4' />
									Delete
								</motion.button>
							</>
						)}
					</div>
				</div>

				{/* Content */}
				<div className='flex-1 px-6 py-6 overflow-y-auto'>
					{/* Description */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='mb-8'>
						<h3 className='flex items-center gap-2 mb-3 font-semibold text-gray-900 dark:text-gray-100 text-lg'>
							<AcademicCapIcon className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
							Project Description
						</h3>
						{isEditing ? (
							<textarea
								value={editedDescription}
								onChange={(e) =>
									setEditedDescription(e.target.value)
								}
								className='bg-white dark:bg-gray-700 p-4 border-2 border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-lg outline-none w-full text-gray-900 dark:text-gray-100 resize-none'
								rows={4}
								placeholder='Project description'
							/>
						) : (
							<p className='bg-gray-50 dark:bg-gray-700 p-4 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap'>
								{project.description}
							</p>
						)}
					</motion.div>

					{/* Roles Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className='mb-8'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100 text-lg'>
								<UserGroupIcon className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
								Team Roles
							</h3>
							{isEditing && (
								<button
									onClick={addRole}
									className='inline-flex items-center bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg font-medium text-white text-sm transition-colors'>
									<PlusIcon className='mr-1 w-4 h-4' />
									Add Role
								</button>
							)}
						</div>

						{isEditing ? (
							/* Role Editing Carousel */
							<div>
								{editedRoles.length === 0 ? (
									<div className='py-8 text-center'>
										<UserIcon className='mx-auto mb-3 w-12 h-12 text-gray-400 dark:text-gray-500' />
										<p className='mb-3 text-gray-500 dark:text-gray-400'>
											No roles defined yet.
										</p>
										<button
											onClick={addRole}
											className='inline-flex items-center bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors'>
											<PlusIcon className='mr-2 w-4 h-4' />
											Add First Role
										</button>
									</div>
								) : (
									<div className='relative'>
										{/* Carousel Header */}
										<div className='flex justify-between items-center mb-4'>
											<div className='flex items-center gap-4'>
												<span className='text-gray-600 dark:text-gray-400 text-sm'>
													{currentRoleIndex + 1} of{" "}
													{editedRoles.length}
												</span>
												<div className='flex gap-2'>
													{editedRoles.filter(role => !role.filled).length > 0 && (
														<span className='inline-flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-full text-amber-800 text-xs dark:bg-amber-800/20 dark:text-amber-300'>
															<ExclamationCircleIcon className='w-3 h-3' />
															{editedRoles.filter(role => !role.filled).length}{" "}
															Open
														</span>
													)}
													{editedRoles.filter(role => role.filled).length > 0 && (
														<span className='inline-flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full text-green-800 text-xs dark:bg-green-800/20 dark:text-green-300'>
															<CheckCircleIcon className='w-3 h-3' />
															{editedRoles.filter(role => role.filled).length}{" "}
															Filled
														</span>
													)}
												</div>
											</div>

											{/* Navigation Controls */}
											<div className='flex gap-2'>
												<button
													onClick={prevRole}
													disabled={editedRoles.length <= 1}
													className='inline-flex justify-center items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 p-2 rounded-lg transition-colors disabled:cursor-not-allowed'>
													<ChevronLeftIcon className='w-4 h-4 text-gray-600 dark:text-gray-300' />
												</button>
												<button
													onClick={nextRole}
													disabled={editedRoles.length <= 1}
													className='inline-flex justify-center items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 p-2 rounded-lg transition-colors disabled:cursor-not-allowed'>
													<ChevronRightIcon className='w-4 h-4 text-gray-600 dark:text-gray-300' />
												</button>
											</div>
										</div>

										{/* Current Role Editing Form */}
										{(() => {
											const currentRole = editedRoles[currentRoleIndex];
											if (!currentRole) return null;

											return (
												<motion.div
													key={`edit-${currentRole.id}`}
													initial={{ opacity: 0, x: 20 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: -20 }}
													transition={{ duration: 0.3 }}
													className='bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600 rounded-xl'
												>
													<div className='gap-4 grid grid-cols-1 md:grid-cols-2 mb-4'>
														<input
															type='text'
															value={currentRole.title}
															onChange={(e) =>
																updateRole(
																	currentRoleIndex,
																	"title",
																	e.target.value
																)
															}
															className='bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-md outline-none font-medium text-gray-900 dark:text-gray-100 text-lg'
															placeholder='Role title'
														/>
														<div className='flex items-center gap-4'>
															<label className='flex items-center'>
																<input
																	type='checkbox'
																	checked={currentRole.filled}
																	onChange={(e) =>
																		updateRole(
																			currentRoleIndex,
																			"filled",
																			e.target.checked
																		)
																	}
																	className='mr-2'
																/>
																<span className='font-medium text-gray-700 dark:text-gray-300 text-sm'>
																	Position filled
																</span>
															</label>
															<button
																onClick={() =>
																	removeRole(currentRoleIndex)
																}
																className='bg-red-100 hover:bg-red-200 ml-auto p-2 rounded-lg text-red-600 transition-colors'>
																<TrashIcon className='w-4 h-4' />
															</button>
														</div>
													</div>

													<textarea
														value={currentRole.description}
														onChange={(e) =>
															updateRole(
																currentRoleIndex,
																"description",
																e.target.value
															)
														}
														className='bg-white dark:bg-gray-700 mb-4 p-3 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-md outline-none w-full text-gray-900 dark:text-gray-100 resize-none'
														rows={3}
														placeholder='Role description'
													/>

													{/* Skills for this role */}
													<div>
														<label className='block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm'>
															Required Skills
														</label>
														<div className='flex flex-wrap gap-2 mb-3'>
															{currentRole.skillsRequired.map(
																(skill, skillIndex) => (
																	<span
																		key={skillIndex}
																		className='inline-flex items-center bg-indigo-100 px-3 py-1.5 rounded-full text-indigo-800 text-sm'>
																		{skill}
																		<button
																			onClick={() =>
																				removeSkillFromRole(
																					currentRoleIndex,
																					skill
																				)
																			}
																			className='ml-2 text-indigo-600 hover:text-indigo-800'>
																			<XMarkIcon className='w-3 h-3' />
																		</button>
																	</span>
																)
															)}
														</div>
														<input
															type='text'
															className='bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-md outline-none w-full text-gray-900 dark:text-gray-100'
															placeholder='Add a skill and press Enter'
															onKeyDown={(e) => {
																if (e.key === "Enter") {
																	e.preventDefault();
																	const skill =
																		e.currentTarget.value.trim();
																	if (skill) {
																		addSkillToRole(
																			currentRoleIndex,
																			skill
																		);
																		e.currentTarget.value = "";
																	}
																}
															}}
														/>
													</div>
												</motion.div>
											);
										})()}

										{/* Role Indicators */}
										{editedRoles.length > 1 && (
											<div className='flex justify-center gap-2 mt-4'>
												{editedRoles.map((role, index) => (
													<button
														key={role.id}
														onClick={() => setCurrentRoleIndex(index)}
														className={`w-2 h-2 rounded-full transition-all ${
															index === currentRoleIndex 
																? 'bg-indigo-600 w-6' 
																: 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
														}`}
													/>
												))}
											</div>
										)}
									</div>
								)}
							</div>
						) : (
							<div>
								{project.rolesNeeded.length === 0 ? (
									<div className='py-8 text-center'>
										<UserIcon className='mx-auto mb-3 w-12 h-12 text-gray-400 dark:text-gray-500' />
										<p className='text-gray-500 dark:text-gray-400'>
											No roles defined for this project
											yet.
										</p>
									</div>
								) : (
									/* Role Carousel */
									<div className='relative'>
										{/* Carousel Header */}
										<div className='flex justify-between items-center mb-4'>
											<div className='flex items-center gap-4'>
												<span className='text-gray-600 dark:text-gray-400 text-sm'>
													{currentRoleIndex + 1} of{" "}
													{project.rolesNeeded.length}
												</span>
												<div className='flex gap-2'>
													{openRoles.length > 0 && (
														<span className='inline-flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-full text-amber-800 text-xs dark:bg-amber-800/20 dark:text-amber-300'>
															<ExclamationCircleIcon className='w-3 h-3' />
															{openRoles.length}{" "}
															Open
														</span>
													)}
													{filledRoles.length > 0 && (
														<span className='inline-flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full text-green-800 text-xs dark:bg-green-800/20 dark:text-green-300'>
															<CheckCircleIcon className='w-3 h-3' />
															{filledRoles.length}{" "}
															Filled
														</span>
													)}
												</div>
											</div>

											{/* Navigation Controls */}
											<div className='flex gap-2'>
												<button
													onClick={prevRole}
													disabled={
														project.rolesNeeded
															.length <= 1
													}
													className='inline-flex justify-center items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 p-2 rounded-lg transition-colors disabled:cursor-not-allowed'>
													<ChevronLeftIcon className='w-4 h-4 text-gray-600 dark:text-gray-300' />
												</button>
												<button
													onClick={nextRole}
													disabled={
														project.rolesNeeded
															.length <= 1
													}
													className='inline-flex justify-center items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 p-2 rounded-lg transition-colors disabled:cursor-not-allowed'>
													<ChevronRightIcon className='w-4 h-4 text-gray-600 dark:text-gray-300' />
												</button>
											</div>
										</div>

										{/* Current Role Display */}
										{(() => {
											const currentRole =
												project.rolesNeeded[
													currentRoleIndex
												];
											const isOpen = !currentRole?.filled;

											if (!currentRole) return null;

											return (
												<motion.div
													key={currentRole.id}
													initial={{
														opacity: 0,
														x: 20,
													}}
													animate={{
														opacity: 1,
														x: 0,
													}}
													exit={{
														opacity: 0,
														x: -20,
													}}
													transition={{
														duration: 0.3,
													}}
													className={`p-6 border-2 rounded-xl transition-all ${
														isOpen
															? "bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 dark:border-amber-700"
															: "bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-700"
													}`}>
													<div className='flex justify-between items-center mb-4'>
														<h5
															className={`font-bold text-xl ${
																isOpen
																	? "text-amber-900 dark:text-amber-200"
																	: "text-green-900 dark:text-green-200"
															}`}>
															{currentRole.title}
														</h5>
														<span
															className={`px-3 py-1.5 text-center text-nowrap rounded-full font-medium text-sm ${
																isOpen
																	? "bg-amber-200 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300"
																	: "bg-green-200 text-green-800 dark:bg-green-800/30 dark:text-green-300"
															}`}>
															{isOpen
																? "Open Position"
																: "Position Filled"}
														</span>
													</div>

													<p
														className={`mb-4 text-sm leading-relaxed ${
															isOpen
																? "text-amber-800 dark:text-amber-300"
																: "text-green-800 dark:text-green-300"
														}`}>
														{
															currentRole.description
														}
													</p>

													<div>
														<h6
															className={`mb-2 font-medium text-sm ${
																isOpen
																	? "text-amber-900 dark:text-amber-200"
																	: "text-green-900 dark:text-green-200"
															}`}>
															Required Skills:
														</h6>
														<div className='flex flex-wrap gap-2'>
															{currentRole.skillsRequired.map(
																(skill) => (
																	<span
																		key={
																			skill
																		}
																		className={`inline-flex items-center px-3 py-1.5 border rounded-lg font-medium text-sm ${
																			isOpen
																				? "bg-amber-100 border-amber-200 text-amber-800 dark:bg-amber-800/20 dark:border-amber-700 dark:text-amber-300"
																				: "bg-green-100 border-green-200 text-green-800 dark:bg-green-800/20 dark:border-green-700 dark:text-green-300"
																		}`}>
																		{skill}
																	</span>
																)
															)}
														</div>
													</div>
												</motion.div>
											);
										})()}

										{/* Role Indicators */}
										{project.rolesNeeded.length > 1 && (
											<div className='flex justify-center gap-2 mt-4'>
												{project.rolesNeeded.map(
													(role, index) => (
														<button
															key={role.id}
															onClick={() =>
																setCurrentRoleIndex(
																	index
																)
															}
															className={`w-2 h-2 rounded-full transition-all ${
																index ===
																currentRoleIndex
																	? "bg-indigo-600 w-6"
																	: "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
															}`}
														/>
													)
												)}
											</div>
										)}
									</div>
								)}
							</div>
						)}
					</motion.div>

					{/* Project Owner */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className='pt-6 border-gray-100 dark:border-gray-700 border-t'>
						<div className='flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm'>
							<UserIcon className='w-4 h-4' />
							<span>
								Project Owner:{" "}
								<span className='font-medium text-gray-700 dark:text-gray-300'>
									{project.authorEmail.split("@")[0]}
								</span>
							</span>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
