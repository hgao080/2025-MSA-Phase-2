import { useUserProjectStore } from '../Stores/UserProjectStore';
import UserProjectCard from './UserProjectCard';
import UserSelectedProject from './UserSelectedProject';
import { FolderPlusIcon } from '@heroicons/react/24/outline';

export default function UserProjects() {
	const projects = useUserProjectStore((state) => state.userProjects);

	return (
		<div className="w-full">
			{projects?.length > 0 ? (
				<div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
					{/* Projects Grid */}
					<div className='flex-1 lg:flex-[2]'>
						<div className="mb-6 flex items-center justify-between">
							<div>
								<h2 className="text-lg font-semibold text-gray-900">
									Your Projects
								</h2>
								<p className="text-sm text-gray-600 mt-1">
									{projects.length} project{projects.length !== 1 ? 's' : ''} in your portfolio
								</p>
							</div>
						</div>
						
						<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6'>
							{projects.map((project) => (
								<UserProjectCard key={project.id} project={project} />
							))}
						</div>
					</div>

					{/* Selected Project Panel */}
					<div className='lg:flex-1 lg:min-h-[600px]'>
						<div className="sticky top-6">
							<UserSelectedProject />
						</div>
					</div>
				</div>
			) : (
				<div className='flex flex-col items-center justify-center py-16 px-4'>
					<div className="text-center max-w-md">
						<div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<FolderPlusIcon className="w-8 h-8 text-indigo-600" />
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-3">No projects yet</h3>
						<p className="text-gray-500 mb-6 leading-relaxed">
							Ready to bring your ideas to life? Create your first project and start building something amazing with Cobweb.
						</p>
						<div className="bg-gray-50 rounded-lg p-4 text-left">
							<h4 className="font-medium text-gray-900 mb-2">Get started by:</h4>
							<ul className="text-sm text-gray-600 space-y-1">
								<li>• Clicking "Create Project" above</li>
								<li>• Adding a compelling title and description</li>
								<li>• Choosing your project type</li>
								<li>• Sharing with potential collaborators</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
