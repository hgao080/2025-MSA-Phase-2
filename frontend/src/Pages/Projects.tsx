import { useEffect } from 'react';
import AllProjects from '../Components/AllProjects';
import { useProjectStore } from '../Stores/ProjectStore';

export default function Projects() {
	// const fetchAllProjects = useProjectStore((state) => state.fetchAllProjects);

	// useEffect(() => {
	// 	fetchAllProjects();
	// }, [fetchAllProjects]);

	return (
		<div className='mt-24 flex flex-col items-center justify-center w-screen'>
			<div className=''>
				{/* Search and Filter component TODO Later */}
			</div>

			<AllProjects />
		</div>
	);
}
