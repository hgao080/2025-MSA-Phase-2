import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UserProjects from '../Components/UserProjects';
import NewProjectDialog from '../Components/NewProjectDialog';
import { useUserProjectStore } from '../Stores/UserProjectStore';
import { PlusIcon, FolderIcon, RocketLaunchIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function DashboardProjects() {
	const fetchMyProjects = useUserProjectStore((state) => state.fetchMyProjects);
	const userProjects = useUserProjectStore((state) => state.userProjects);
	const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);

	useEffect(() => {
		fetchMyProjects();
	}, [fetchMyProjects]);

	// Calculate project statistics
	const totalProjects = userProjects?.length || 0;
	const frontendProjects = userProjects?.filter(p => p.tag === 'Frontend').length || 0;
	const backendProjects = userProjects?.filter(p => p.tag === 'Backend').length || 0;
	const fullStackProjects = userProjects?.filter(p => p.tag === 'Fullstack').length || 0;

	const stats = [
		{
			label: 'Total Projects',
			value: totalProjects,
			icon: FolderIcon,
			color: 'from-indigo-500 to-purple-500',
			bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20',
			textColor: 'text-indigo-900 dark:text-indigo-100'
		},
		{
			label: 'Frontend',
			value: frontendProjects,
			icon: RocketLaunchIcon,
			color: 'from-blue-500 to-cyan-500',
			bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
			textColor: 'text-blue-900 dark:text-blue-100'
		},
		{
			label: 'Backend',
			value: backendProjects,
			icon: UserGroupIcon,
			color: 'from-green-500 to-teal-500',
			bgColor: 'from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20',
			textColor: 'text-green-900 dark:text-green-100'
		},
		{
			label: 'Full Stack',
			value: fullStackProjects,
			icon: ClockIcon,
			color: 'from-purple-500 to-pink-500',
			bgColor: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
			textColor: 'text-purple-900 dark:text-purple-100'
		}
	];

	return (
		<div className="flex flex-col bg-gradient-to-br from-gray-50 dark:from-gray-900 to-indigo-50/30 dark:to-indigo-950/30 min-h-screen">
			{/* Header */}
			<header className='flex-shrink-0 bg-white/80 dark:bg-gray-900/80 shadow-sm backdrop-blur-sm border-gray-200/60 dark:border-gray-700/60 border-b'>
				<div className='mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl'>
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4'
					>
						<div className='flex items-center gap-4'>
							<motion.div 
								whileHover={{ scale: 1.05 }}
								className="flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg rounded-xl w-12 h-12"
							>
								<FolderIcon className="w-7 h-7 text-white" />
							</motion.div>
							<div>
								<h1 className='bg-clip-text bg-gradient-to-r from-gray-900 dark:from-gray-100 to-gray-700 dark:to-gray-300 font-bold text-transparent text-2xl sm:text-3xl tracking-tight'>
									Your Projects
								</h1>
								<p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
									Manage and track your project portfolio
								</p>
							</div>
						</div>

						<motion.button 
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setIsNewProjectDialogOpen(true)}
							className='inline-flex items-center bg-gradient-to-r from-indigo-600 hover:from-indigo-700 dark:from-indigo-500 dark:hover:from-indigo-600 to-purple-600 hover:to-purple-700 dark:hover:to-purple-600 dark:to-purple-500 shadow-lg hover:shadow-xl px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 font-medium text-white text-sm transition-all duration-200'
						>
							<PlusIcon className="mr-2 w-4 h-4" />
							Create Project
						</motion.button>
					</motion.div>
					
					{/* Enhanced Stats Bar */}
					{totalProjects > 0 && (
						<motion.div 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="gap-4 grid grid-cols-2 lg:grid-cols-4 mt-8"
						>
							{stats.map((stat, index) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.3, delay: 0.1 * index }}
									whileHover={{ y: -2 }}
									className={`bg-gradient-to-br ${stat.bgColor} p-4 rounded-xl border border-white/60 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all duration-200`}
								>
									<div className="flex justify-between items-center">
										<div>
											<div className={`text-2xl font-bold ${stat.textColor}`}>
												{stat.value}
											</div>
											<div className="font-medium text-gray-700 dark:text-gray-300 text-sm">
												{stat.label}
											</div>
										</div>
										<div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg shadow-sm`}>
											<stat.icon className="w-5 h-5 text-white" />
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					)}
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1 py-8 min-h-0">
				<div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="h-full"
					>
						<UserProjects />
					</motion.div>
				</div>
			</main>

			{/* Dialog */}
			<NewProjectDialog isOpen={isNewProjectDialogOpen} setIsOpen={setIsNewProjectDialogOpen}/>
		</div>
	);
}
