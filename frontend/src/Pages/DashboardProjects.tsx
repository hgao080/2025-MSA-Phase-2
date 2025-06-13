import { useEffect } from "react";
import { useProjectStore } from "../Stores/ProjectStore";
import UserProjects from "../Components/UserProjects";

export default function DashboardProjects() {
  const fetchMyProjects = useProjectStore(state => state.fetchMyProjects);

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
          
          <button className="hover:cursor-pointer">Create a project</button>
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
