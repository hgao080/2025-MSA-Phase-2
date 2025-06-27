import { useUserProjectStore } from '../Stores/UserProjectStore';
import UserProjectCard from './UserProjectCard';
import UserSelectedProject from './UserSelectedProject';

export default function UserProjects() {
	const projects = useUserProjectStore((state) => state.userProjects);

	return (
		<>
			{projects?.length > 0 ? (
				<div className='flex justify-between gap-4'>
					<div className='flex-1 grid grid-cols-2 gap-4'>
						{projects?.map((p) => (
							<UserProjectCard project={p} />
						))}
					</div>

					<div className='flex-1'>
						<UserSelectedProject />
					</div>
				</div>
			) : (
				<div className='text-center'>
					No projects to display. How about you start one?
				</div>
			)}
		</>
	);
}
