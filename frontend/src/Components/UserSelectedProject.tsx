import { useUserProjectStore } from '../Stores/UserProjectStore';

export default function UserSelectedProject() {
	const project = useUserProjectStore((state) => state.selectedProject);
  const deleteProject = useUserProjectStore((state) => state.deleteProject);

  const handleEdit = () => {
    return
  }

  const handleDelete = async () => {
    if (!project) {
      console.error("No project selected for deletion.");
      return;
    }

    await deleteProject(project.id);
  }

	return (
    <>
    {project != null ? <div className='flex flex-col shadow-xl rounded-3xl p-6'>
			<div className='flex justify-between items-center'>
				<h2>{project?.title}</h2>
				<div className='flex gap-2 items-center'>
					<button
						className='hover:cursor-pointer'
						onClick={handleEdit}>
						Edit
					</button>
          <button
						className='hover:cursor-pointer'
						onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>
			<p className=''>{project?.description}</p>
		</div> : <div className='text-center'>No project selected.</div>}
    </>
		
	);
}
