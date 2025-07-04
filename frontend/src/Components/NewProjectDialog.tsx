import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { useUserProjectStore } from '../Stores/UserProjectStore';
import type { ProjectType } from '../Models/Project';

interface NewProjectDialogProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export default function NewProjectDialog({
	isOpen,
	setIsOpen,
}: NewProjectDialogProps) {
	const createProject = useUserProjectStore((state) => state.createProject);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tag, setTag] = useState<ProjectType>('Frontend');

	const handleCreateProject = async (e: React.FormEvent) => {
		e.preventDefault();

		const project = {
			title,
			description,
			tag,
		};

		await createProject(project);

		setTitle('');
		setDescription('');
		setTag('Frontend');
		setIsOpen(false);
	};

	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className='relative z-50'>
			<div className='fixed inset-0 bg-gray-600/65' />
			<div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
				<DialogPanel className='relative max-w-lg w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden'>
					{/* Header */}
					<div className='bg-gradient-to-r from-indigo-50 to-white px-6 py-5 border-b border-gray-200'>
						<DialogTitle className='text-xl font-semibold text-gray-900'>
							Create a New Project
						</DialogTitle>
						<p className='text-sm text-gray-600 mt-1'>
							Start building something amazing with Cobweb
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleCreateProject} className='px-6 py-6'>
						<div className='space-y-6'>
							<div className=''>
								<label
									htmlFor='title'
									className='block text-sm font-medium text-gray-900 mb-2'>
									Project Title
								</label>
								<input
									id='title'
									name='title'
									type='text'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className='block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									placeholder='Enter your project title'
									required
								/>
							</div>

							<div className=''>
								<label
									htmlFor='tag'
									className='block text-sm font-medium text-gray-900 mb-2'>
									Project Type
								</label>
								<select
									id='tag'
									name='tag'
									value={tag}
									onChange={(e) =>
										setTag(e.target.value as ProjectType)
									}
									className='block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
									<option value='Frontend'>Frontend</option>
									<option value='Backend'>Backend</option>
									<option value='Fullstack'>Fullstack</option>
								</select>
							</div>

							<div className=''>
								<label
									htmlFor='description'
									className='block text-sm font-medium text-gray-900 mb-2'>
									Description
								</label>
								<textarea
									id='description'
									name='description'
									rows={4}
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									className='block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									placeholder="Describe your project and what you're looking to build..."
									required
								/>
								<p className='mt-2 text-xs text-gray-500'>
									Write a compelling description to attract
									potential collaborators.
								</p>
							</div>

							{/* Actions */}
							<div className='flex flex-col-reverse sm:flex-row gap-3 pt-4'>
								<button
									type='button'
									onClick={() => setIsOpen(false)}
									className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'>
									Cancel
								</button>
								<button
									type='submit'
									className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'>
									Create Project
								</button>
							</div>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
