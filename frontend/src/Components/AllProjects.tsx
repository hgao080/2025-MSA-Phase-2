import type { Project } from '../Models/Project';
import ProjectCard from './ProjectCard';
import SelectedProject from './SelectedProject';

interface AllProjectsProps {
	projects: Project[];
}

export default function AllProjects({ projects }: AllProjectsProps) {
	return (
		<div className="w-full max-w-7xl mx-auto px-4">
			{projects?.length > 0 ? (
				<div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
					{/* Projects Grid */}
					<div className='flex-1 lg:flex-[2]'>
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-lg font-semibold text-gray-900">
								{projects.length} Project{projects.length !== 1 ? 's' : ''} Found
							</h2>
						</div>
						
						<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6'>
							{projects.map((project) => (
								<ProjectCard key={project.id} project={project} />
							))}
						</div>
					</div>

					{/* Selected Project Panel */}
					<div className='lg:flex-1 lg:min-h-[600px]'>
						<div className="sticky top-6">
							<SelectedProject />
						</div>
					</div>
				</div>
			) : (
				<div className='flex flex-col items-center justify-center py-16 px-4'>
					<div className="text-center">
						<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
						<p className="text-gray-500 text-center max-w-md">
							No projects match your current search criteria. Try adjusting your search terms or filters to find what you're looking for.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
