import { useUserProjectStore } from "../Stores/UserProjectStore";
import UserProjectCard from "./UserProjectCard";
import UserSelectedProject from "./UserSelectedProject";
import { FolderPlusIcon } from "@heroicons/react/24/outline";

export default function UserProjects() {
	const projects = useUserProjectStore((state) => state.userProjects);

	return (
		<div className='w-full h-full'>
			{projects?.length > 0 ? (
				<div className='flex lg:flex-row flex-col gap-6 lg:gap-8 h-full'>
					{/* Projects Grid */}
					<div className='flex flex-col flex-1 lg:flex-[1] min-h-0'>
						<div className='flex flex-shrink-0 justify-between items-center mb-4'>
							<h2 className='font-semibold text-gray-900 dark:text-gray-100 text-lg'>
								{projects.length} Project
								{projects.length !== 1 ? "s" : ""} in Your
								Portfolio
							</h2>
						</div>

						{/* Scrollable Projects Container */}
						<div className='flex-1 -mr-2 pr-2 max-h-screen lg:max-h-none overflow-y-auto'>
							<div className='gap-4 lg:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 mt-1 pb-4'>
								{projects.map((project) => (
									<UserProjectCard
										key={project.id}
										project={project}
									/>
								))}
							</div>
						</div>
					</div>

					{/* Selected Project Panel */}
					<div className='flex-shrink-0 lg:flex-1'>
						<div className='lg:top-6 lg:sticky h-full lg:h-auto'>
							<UserSelectedProject />
						</div>
					</div>
				</div>
			) : (
				<div className='flex flex-col justify-center items-center px-4 py-16'>
					<div className='max-w-md text-center'>
						<div className='flex justify-center items-center bg-indigo-100 mx-auto mb-6 rounded-full w-16 h-16'>
							<FolderPlusIcon className='w-8 h-8 text-indigo-600' />
						</div>
						<h3 className='mb-3 font-semibold text-gray-900 dark:text-gray-100 text-xl'>
							No projects yet
						</h3>
						<p className='mb-6 text-gray-500 leading-relaxed'>
							Ready to bring your ideas to life? Create your first
							project and start building something amazing with
							Cobweb.
						</p>
						<div className='bg-gray-50 p-4 rounded-lg text-left'>
							<h4 className='mb-2 font-medium text-gray-900 dark:text-gray-100'>
								Get started by:
							</h4>
							<ul className='space-y-1 text-gray-600 text-sm'>
								<li>• Clicking "Create Project" above</li>
								<li>
									• Adding a compelling title and description
								</li>
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
