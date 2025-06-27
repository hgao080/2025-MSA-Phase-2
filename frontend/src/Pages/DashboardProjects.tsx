import { useEffect, useState } from 'react';
import UserProjects from '../Components/UserProjects';
import NewProjectDialog from '../Components/NewProjectDialog';
import { useUserProjectStore } from '../Stores/UserProjectStore';


export default function DashboardProjects() {
	const fetchMyProjects = useUserProjectStore((state) => state.fetchMyProjects);
	const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);

	useEffect(() => {
		fetchMyProjects();
	}, [fetchMyProjects]);

	return (
		<>
			<header className='bg-white shadow-sm'>
				<div className='flex items-end justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Your Projects
					</h1>

					<button className='hover:cursor-pointer' onClick={() => setIsNewProjectDialogOpen(true)}>
						Create a project
					</button>
					<NewProjectDialog isOpen={isNewProjectDialogOpen} setIsOpen={setIsNewProjectDialogOpen}/>
				</div>
			</header>
			<main>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<UserProjects />
				</div>
			</main>
		</>
	);
}
