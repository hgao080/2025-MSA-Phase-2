import { useEffect, useState } from 'react';
import UserProjects from '../Components/UserProjects';
import NewProjectDialog from '../Components/NewProjectDialog';
import { useUserProjectStore } from '../Stores/UserProjectStore';
import { PlusIcon, FolderIcon } from '@heroicons/react/24/outline';

export default function DashboardProjects() {
	const fetchMyProjects = useUserProjectStore((state) => state.fetchMyProjects);
	const userProjects = useUserProjectStore((state) => state.userProjects);
	const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);

	useEffect(() => {
		fetchMyProjects();
	}, [fetchMyProjects]);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className='bg-white shadow-sm border-b border-gray-200'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
						<div className='flex items-center gap-3'>
							<div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
								<FolderIcon className="w-6 h-6 text-indigo-600" />
							</div>
							<div>
								<h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-gray-900'>
									Your Projects
								</h1>
								<p className="text-sm text-gray-600 mt-1">
									Manage and track your project portfolio
								</p>
							</div>
						</div>

						<button 
							onClick={() => setIsNewProjectDialogOpen(true)}
							className='inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							<PlusIcon className="w-4 h-4 mr-2" />
							Create Project
						</button>
					</div>
					
					{/* Stats Bar */}
					{userProjects && userProjects.length > 0 && (
						<div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
							<div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
								<div className="flex items-center">
									<div className="text-2xl font-bold text-gray-900">{userProjects.length}</div>
									<div className="ml-2 text-sm text-gray-700">Total Projects</div>
								</div>
							</div>
							<div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
								<div className="flex items-center">
									<div className="text-2xl font-bold text-blue-900">
										{userProjects.filter(p => p.tag === 'Frontend').length}
									</div>
									<div className="ml-2 text-sm text-blue-700">Frontend</div>
								</div>
							</div>
							<div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
								<div className="flex items-center">
									<div className="text-2xl font-bold text-green-900">
										{userProjects.filter(p => p.tag === 'Backend').length}
									</div>
									<div className="ml-2 text-sm text-green-700">Backend</div>
								</div>
							</div>
							<div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
								<div className="flex items-center">
									<div className="text-2xl font-bold text-purple-900">
										{userProjects.filter(p => p.tag === 'Fullstack').length}
									</div>
									<div className="ml-2 text-sm text-purple-700">Fullstack</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</header>

			{/* Main Content */}
			<main className="py-8">
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<UserProjects />
				</div>
			</main>

			{/* Dialog */}
			<NewProjectDialog isOpen={isNewProjectDialogOpen} setIsOpen={setIsNewProjectDialogOpen}/>
		</div>
	);
}
