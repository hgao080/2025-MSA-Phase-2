import type { Project } from '../Models/Project';
import ProjectCard from './ProjectCard';
import SelectedProject from './SelectedProject';

interface AllProjectsProps {
	projects: Project[];
}

export default function AllProjects({ projects }: AllProjectsProps) {
	return (
		<div className="mx-auto px-4 w-full min-w-[70vw] max-w-7xl h-full">
			{projects?.length > 0 ? (
				<div className='flex lg:flex-row flex-col gap-6 lg:gap-8 h-full'>
					{/* Projects Grid */}
					<div className='flex flex-col flex-1 lg:flex-[2] min-h-0'>
						<div className="flex flex-shrink-0 justify-between items-center mb-4">
							<h2 className="font-semibold text-gray-900 text-lg">
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

					{/* Selected Project Panel */}
					<div className='flex-shrink-0 lg:flex-1/4'>
						<div className="lg:top-6 lg:sticky h-full lg:h-auto">
							<SelectedProject />
						</div>
					</div>
				</div>
			) : (
				<div className='flex flex-col justify-center items-center px-4 py-16'>
					<div className="text-center">
						<div className="flex justify-center items-center bg-gray-100 mx-auto mb-4 rounded-full w-16 h-16">
							<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</div>
						<h3 className="mb-2 font-semibold text-gray-900 text-xl">No projects found</h3>
						<p className="max-w-md text-gray-500 text-center">
							No projects match your current search criteria. Try adjusting your search terms or filters to find what you're looking for.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
