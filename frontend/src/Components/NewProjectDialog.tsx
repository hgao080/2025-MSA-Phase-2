import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserProjectStore } from '../Stores/UserProjectStore';
import type { ProjectType, CreateProjectRequest } from '../Models/Project';
import { 
  PlusIcon, 
  XMarkIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon,
  CheckIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface NewProjectDialogProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

interface RoleForm {
	title: string;
	description: string;
	skillsRequired: string[];
}

type Step = 'basic' | 'details' | 'roles' | 'review';



export default function NewProjectDialog({
	isOpen,
	setIsOpen,
}: NewProjectDialogProps) {
	const createProject = useUserProjectStore((state) => state.createProject);

	// Form state
	const [currentStep, setCurrentStep] = useState<Step>('basic');
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		tag: 'Frontend' as ProjectType,
		teamSize: 3,
		estimatedDuration: undefined as number | undefined,
		rolesNeeded: [] as RoleForm[]
	});

	// UI state
	const [isSubmitting, setIsSubmitting] = useState(false);

	const resetForm = () => {
		setFormData({
			title: '',
			description: '',
			tag: 'Frontend',
			teamSize: 3,
			estimatedDuration: undefined,
			rolesNeeded: []
		});
		setCurrentStep('basic');
		setIsSubmitting(false);
	};

	const handleClose = () => {
		setIsOpen(false);
		resetForm();
	};



	const addRole = () => {
		setFormData(prev => ({
			...prev,
			rolesNeeded: [...prev.rolesNeeded, { title: '', description: '', skillsRequired: []}]
		}));
	};

	const updateRole = (index: number, field: keyof RoleForm, value: string | string[]) => {
		setFormData(prev => ({
			...prev,
			rolesNeeded: prev.rolesNeeded.map((role, i) => 
				i === index ? { ...role, [field]: value } : role
			)
		}));
	};

	const removeRole = (index: number) => {
		setFormData(prev => ({
			...prev,
			rolesNeeded: prev.rolesNeeded.filter((_, i) => i !== index)
		}));
	};

	const addSkillToRole = (roleIndex: number, skill: string) => {
		if (skill && !formData.rolesNeeded[roleIndex]?.skillsRequired.includes(skill)) {
			updateRole(roleIndex, 'skillsRequired', [...formData.rolesNeeded[roleIndex].skillsRequired, skill]);
		}
	};

	const removeSkillFromRole = (roleIndex: number, skillToRemove: string) => {
		updateRole(roleIndex, 'skillsRequired', 
			formData.rolesNeeded[roleIndex].skillsRequired.filter(skill => skill !== skillToRemove)
		);
	};

	const canProceedFromStep = (step: Step): boolean => {
		switch (step) {
			case 'basic':
				return formData.title.trim() !== '' && formData.description.trim() !== '';
			case 'details':
				return formData.teamSize >= 1;
			case 'roles':
				return formData.rolesNeeded.length > 0 && 
					   formData.rolesNeeded.every(role => 
						   role.title.trim() !== '' && 
						   role.description.trim() !== '' && 
						   role.skillsRequired.length > 0
					   );
			case 'review':
				return true;
			default:
				return false;
		}
	};

	const handleSubmit = async () => {
		if (!canProceedFromStep('roles')) return;
		
		setIsSubmitting(true);
		try {
			const projectRequest: CreateProjectRequest = {
				title: formData.title,
				description: formData.description,
				tag: formData.tag,
				teamSize: formData.teamSize,
				estimatedDuration: formData.estimatedDuration || undefined,
				rolesNeeded: formData.rolesNeeded
			};

			await createProject(projectRequest);
			handleClose();
		} catch (error) {
			console.error('Failed to create project:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const nextStep = () => {
		const steps: Step[] = ['basic', 'details', 'roles', 'review'];
		const currentIndex = steps.indexOf(currentStep);
		if (currentIndex < steps.length - 1 && canProceedFromStep(currentStep)) {
			setCurrentStep(steps[currentIndex + 1]);
		}
	};

	const prevStep = () => {
		const steps: Step[] = ['basic', 'details', 'roles', 'review'];
		const currentIndex = steps.indexOf(currentStep);
		if (currentIndex > 0) {
			setCurrentStep(steps[currentIndex - 1]);
		}
	};

	const getStepProgress = () => {
		const steps: Step[] = ['basic', 'details', 'roles', 'review'];
		return (steps.indexOf(currentStep) + 1) / steps.length * 100;
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 'basic':
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div>
							<label htmlFor='title' className='block mb-2 font-medium text-gray-900 dark:text-gray-100 text-sm'>
								Project Title *
							</label>
							<input
								id='title'
								type='text'
								value={formData.title}
								onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
								className='block bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 w-full text-gray-900 dark:placeholder:text-gray-500 dark:text-gray-100 placeholder:text-gray-400 sm:text-sm transition-all duration-200'
								placeholder='Enter your project title'
								required
							/>
						</div>

						<div>
							<label htmlFor='tag' className='block mb-2 font-medium text-gray-900 dark:text-gray-100 text-sm'>
								Project Type *
							</label>
							<select
								id='tag'
								value={formData.tag}
								onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value as ProjectType }))}
								className='block bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 w-full text-gray-900 dark:text-gray-100 sm:text-sm transition-all duration-200'
							>
								<option value='Frontend'>Frontend</option>
								<option value='Backend'>Backend</option>
								<option value='Fullstack'>Fullstack</option>
							</select>
						</div>

						<div>
							<label htmlFor='description' className='block mb-2 font-medium text-gray-900 dark:text-gray-100 text-sm'>
								Description *
							</label>
							<textarea
								id='description'
								rows={4}
								value={formData.description}
								onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
								className='block bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 w-full text-gray-900 dark:placeholder:text-gray-500 dark:text-gray-100 placeholder:text-gray-400 sm:text-sm transition-all duration-200 resize-none'
								placeholder="Describe your project and what you're looking to build..."
								required
							/>
						</div>
					</motion.div>
				);

			case 'details':
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="gap-4 grid grid-cols-2">
							<div>
								<label htmlFor='teamSize' className='block mb-2 font-medium text-gray-900 dark:text-gray-100 text-sm'>
									Team Size *
								</label>
								<input
									id='teamSize'
									type='number'
									min="1"
									max="20"
									value={formData.teamSize}
									onChange={(e) => setFormData(prev => ({ ...prev, teamSize: parseInt(e.target.value) }))}
									className='block bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 w-full text-gray-900 dark:text-gray-100 sm:text-sm transition-all duration-200'
								/>
							</div>

							<div>
								<label htmlFor='duration' className='block mb-2 font-medium text-gray-900 dark:text-gray-100 text-sm'>
									Estimated Duration (in months)
								</label>
								<input
									id='duration'
									type='number'
									value={formData.estimatedDuration}
									onChange={(e) => setFormData(prev => ({ 
										...prev, 
										estimatedDuration: e.target.value ? Number(e.target.value) : undefined 
									}))}
									className='block bg-white dark:bg-gray-700 px-4 py-3 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 w-full text-gray-900 dark:placeholder:text-gray-500 dark:text-gray-100 placeholder:text-gray-400 sm:text-sm transition-all duration-200'
									placeholder='e.g. 4'
								/>
							</div>
						</div>


					</motion.div>
				);

			case 'roles':
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-2">
								<UserGroupIcon className="w-5 h-5 text-indigo-600" />
								<h3 className="font-medium text-gray-900 dark:text-gray-100 text-lg">Project Roles</h3>
							</div>
							<button
								type="button"
								onClick={addRole}
								className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-white text-sm transition-colors duration-200"
							>
								<PlusIcon className="w-4 h-4" />
								Add Role
							</button>
						</div>

						{formData.rolesNeeded.length === 0 ? (
							<div className="bg-gray-50 dark:bg-gray-700/50 py-8 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-xl text-center">
								<UserGroupIcon className="mx-auto mb-4 w-12 h-12 text-gray-400 dark:text-gray-500" />
								<p className="mb-4 text-gray-600 dark:text-gray-400">No roles defined yet</p>
								<button
									type="button"
									onClick={addRole}
									className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-white transition-colors duration-200"
								>
									<PlusIcon className="w-4 h-4" />
									Add Your First Role
								</button>
							</div>
						) : (
							<div className="space-y-4 max-h-96 overflow-y-auto">
								{formData.rolesNeeded.map((role, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className="bg-gray-50 dark:bg-gray-700/50 p-4 border border-gray-200 dark:border-gray-600 rounded-xl"
									>
										<div className="flex justify-between items-start mb-4">
											<h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Role {index + 1}</h4>
											<button
												type="button"
												onClick={() => removeRole(index)}
												className="text-red-600 hover:text-red-800"
											>
												<XMarkIcon className="w-4 h-4" />
											</button>
										</div>

										<div className="space-y-4">
											<div>
												<label className='block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm'>
													Role Title *
												</label>
												<input
													type="text"
													value={role.title}
													onChange={(e) => updateRole(index, 'title', e.target.value)}
													className='block bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 w-full text-gray-900 dark:placeholder:text-gray-500 dark:text-gray-100 placeholder:text-gray-400 sm:text-sm'
													placeholder='e.g., Frontend Developer'
												/>
											</div>

											<div>
												<label className='block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm'>
													Description *
												</label>
												<textarea
													rows={2}
													value={role.description}
													onChange={(e) => updateRole(index, 'description', e.target.value)}
													className='block bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 w-full text-gray-900 dark:placeholder:text-gray-500 dark:text-gray-100 placeholder:text-gray-400 sm:text-sm resize-none'
													placeholder='Describe the role responsibilities...'
												/>
											</div>

											<div>
												<label className='block mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm'>
													Required Skills *
												</label>
												<div className="flex flex-wrap gap-1 mb-2">
													{role.skillsRequired.map((skill, skillIndex) => (
														<span
															key={skillIndex}
															className="inline-flex items-center gap-1 bg-indigo-100 dark:bg-indigo-800/20 px-2 py-1 rounded-full text-indigo-800 dark:text-indigo-300 text-xs"
														>
															{skill}
															<button
																type="button"
																onClick={() => removeSkillFromRole(index, skill)}
																className="text-indigo-600 hover:text-indigo-800"
															>
																<XMarkIcon className="w-3 h-3" />
															</button>
														</span>
													))}
												</div>
												<div className="flex gap-2">
													<input
														type="text"
														onKeyDown={(e) => {
															if (e.key === 'Enter') {
																e.preventDefault();
																const skill = e.currentTarget.value.trim();
																if (skill) {
																	addSkillToRole(index, skill);
																	e.currentTarget.value = '';
																}
															}
														}}
														className='flex-1 bg-white dark:bg-gray-700 px-3 py-2 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:placeholder:text-gray-500 dark:text-gray-100 placeholder:text-gray-400 sm:text-sm'
														placeholder='Type skill and press Enter'
													/>
												</div>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						)}
					</motion.div>
				);

			case 'review':
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
							<h3 className="mb-4 font-medium text-gray-900 dark:text-gray-100 text-lg">Project Summary</h3>
							
							<div className="gap-4 grid grid-cols-2 mb-4">
								<div>
									<span className="font-medium text-gray-600 dark:text-gray-400 text-sm">Title:</span>
									<p className="text-gray-900 dark:text-gray-100">{formData.title}</p>
								</div>
								<div>
									<span className="font-medium text-gray-600 dark:text-gray-400 text-sm">Type:</span>
									<p className="text-gray-900 dark:text-gray-100">{formData.tag}</p>
								</div>
								<div>
									<span className="font-medium text-gray-600 dark:text-gray-400 text-sm">Team Size:</span>
									<p className="text-gray-900 dark:text-gray-100">{formData.teamSize}</p>
								</div>
								<div>
									<span className="font-medium text-gray-600 dark:text-gray-400 text-sm">Duration:</span>
									<p className="text-gray-900 dark:text-gray-100">
										{formData.estimatedDuration 
											? `${formData.estimatedDuration} ${formData.estimatedDuration === 1 ? 'month' : 'months'}` 
											: 'Not specified'
										}
									</p>
								</div>
							</div>

							<div className="mb-4">
								<span className="font-medium text-gray-600 dark:text-gray-400 text-sm">Description:</span>
								<p className="mt-1 text-gray-900 dark:text-gray-100">{formData.description}</p>
							</div>



							<div>
								<span className="font-medium text-gray-600 dark:text-gray-400 text-sm">Roles ({formData.rolesNeeded.length}):</span>
								<div className="space-y-2 mt-1">
									{formData.rolesNeeded.map((role, index) => (
										<div key={index} className="bg-white dark:bg-gray-700 p-3 border border-gray-300 dark:border-gray-600 rounded-lg">
											<p className="font-medium text-gray-900 dark:text-gray-100">{role.title}</p>
											<p className="mb-2 text-gray-600 dark:text-gray-400 text-sm">{role.description}</p>
											<div className="flex flex-wrap gap-1">
												{role.skillsRequired.map((skill, skillIndex) => (
													<span
														key={skillIndex}
														className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300 text-xs"
													>
														{skill}
													</span>
												))}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				);

			default:
				return null;
		}
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			className='z-50 relative'>
			<div className='fixed inset-0 bg-gray-600/65 dark:bg-gray-900/75 backdrop-blur-sm' />
			<div className='fixed inset-0 flex justify-center items-center p-4 w-screen'>
				<DialogPanel className='relative bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl w-full max-w-2xl overflow-hidden'>
					{/* Header */}
					<div className='bg-gradient-to-r from-indigo-50 dark:from-indigo-950/20 to-purple-50 dark:to-purple-950/20 px-6 py-5 border-gray-200 dark:border-gray-700 border-b'>
						<div className="flex justify-between items-center">
							<div>
								<DialogTitle className='flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100 text-xl'>
									<CogIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
									Create a New Project
								</DialogTitle>
								<p className='mt-1 text-gray-600 dark:text-gray-400 text-sm'>
									Step {['basic', 'details', 'roles', 'review'].indexOf(currentStep) + 1} of 4
								</p>
							</div>
							<button
								onClick={handleClose}
								className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 dark:text-gray-500 transition-colors duration-200"
							>
								<XMarkIcon className="w-6 h-6" />
							</button>
						</div>

						{/* Progress Bar */}
						<div className="mt-4">
							<div className="bg-gray-200 rounded-full h-2">
								<motion.div
									className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full h-2"
									initial={{ width: 0 }}
									animate={{ width: `${getStepProgress()}%` }}
									transition={{ duration: 0.3 }}
								/>
							</div>
						</div>
					</div>

					{/* Form Content */}
					<div className='px-6 py-6 min-h-[400px]'>
						<AnimatePresence mode="wait">
							{renderStepContent()}
						</AnimatePresence>
					</div>

					{/* Footer */}
					<div className='flex justify-between bg-gray-50 px-6 py-4 border-gray-200 border-t'>
						<button
							type='button'
							onClick={prevStep}
							disabled={currentStep === 'basic'}
							className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
								currentStep === 'basic'
									? 'text-gray-400 cursor-not-allowed'
									: 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
							}`}
						>
							<ArrowLeftIcon className="w-4 h-4" />
							Previous
						</button>

						{currentStep === 'review' ? (
							<button
								type='button'
								onClick={handleSubmit}
								disabled={isSubmitting}
								className='inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 disabled:opacity-50 px-6 py-2 rounded-xl font-medium text-white text-sm transition-all duration-200'
							>
								{isSubmitting ? (
									<>
										<motion.div
											animate={{ rotate: 360 }}
											transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
											className="border-2 border-white border-t-transparent rounded-full w-4 h-4"
										/>
										Creating...
									</>
								) : (
									<>
										<CheckIcon className="w-4 h-4" />
										Create Project
									</>
								)}
							</button>
						) : (
							<button
								type='button'
								onClick={nextStep}
								disabled={!canProceedFromStep(currentStep)}
								className={`inline-flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
									canProceedFromStep(currentStep)
										? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
										: 'text-gray-400 bg-gray-200 cursor-not-allowed'
								}`}
							>
								Next
								<ArrowRightIcon className="w-4 h-4" />
							</button>
						)}
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
