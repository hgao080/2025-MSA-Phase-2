import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

interface NewProjectDialogProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export default function NewProjectDialog({
	isOpen,
	setIsOpen,
}: NewProjectDialogProps) {
	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className='relative z-50'>
			<div className='fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-[2px]'>
				<DialogPanel className='max-w-lg space-y-4 border bg-white p-12'>
					<DialogTitle className='font-bold'>
						Create a project
					</DialogTitle>

					<form action=''>
						<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
							<div className='sm:col-span-4'>
								<label
									htmlFor='title'
									className='block text-sm/6 font-medium text-gray-900'>
									Project Title
								</label>
								<div className='mt-2'>
									<div className='flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600'>
										<input
											id='title'
											name='title'
											type='text'
											placeholder=''
											className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
										/>
									</div>
								</div>
							</div>

							<div className='col-span-full'>
								<label
									htmlFor='description'
									className='block text-sm/6 font-medium text-gray-900'>
									Description
								</label>
								<div className='mt-2'>
									<textarea
										id='description'
										name='description'
										rows={8}
										className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
										defaultValue={''}
									/>
								</div>
								<p className='mt-3 text-sm/6 text-gray-600'>
									Write a few sentences about the project.
								</p>
							</div>

							<div className='flex gap-4'>
								<button onClick={() => setIsOpen(false)}>
									Cancel
								</button>
								<button onClick={() => setIsOpen(false)}>
									Create
								</button>
							</div>
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
