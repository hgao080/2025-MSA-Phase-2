import type { Project } from '../../Models/Project';
import ProjectCard from './ProjectCard';

interface AllProjectsProps {
	projects: Project[];
}

export default function AllProjects({ projects }: AllProjectsProps) {
	return (
		<div className="w-full h-full">
			{projects?.length > 0 ? (
				<div className='flex flex-col h-full'>
					<div className="flex flex-shrink-0 justify-between items-center mb-4">
						<h2 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
							{projects.length} Project{projects.length !== 1 ? 's' : ''} Found
						</h2>
					</div>
					
					{/* Scrollable Projects Container */}
					<div className='flex-1 -mr-2 pr-2 max-h-screen overflow-y-auto'>
						<div className='gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 mt-1 pb-4'>
							{projects.map((project) => (
								<ProjectCard key={project.id} project={project} />
							))}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
