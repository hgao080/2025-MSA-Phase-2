import { useProjectStore } from '../Stores/ProjectStore';
import ProjectCard from './ProjectCard';
import SelectedProject from './SelectedProject';

export default function AllProjects() {
	const projects = useProjectStore((state) => state.allProjects);

	return (
		<>
			{projects?.length > 0 ? <div className='flex justify-between gap-4 w-[55%]'>
				<div className='flex-1 grid grid-cols-2 gap-4'>
					{projects?.map((p) => (
						<ProjectCard project={p} />
					))}
				</div>

				<div className='flex-1'>
					<SelectedProject />
				</div>
			</div> : <div className='text-center'>No projects to display. How about you start one?</div>}
		</>
	);
}
