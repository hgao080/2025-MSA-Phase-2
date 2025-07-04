import { useState } from 'react';
import { useUserProjectStore } from '../Stores/UserProjectStore';
import type { ProjectType } from '../Models/Project';

export default function UserSelectedProject() {
	const project = useUserProjectStore((state) => state.selectedProject);
	const updateProject = useUserProjectStore((state) => state.updateProject);
	const deleteProject = useUserProjectStore((state) => state.deleteProject);

	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState('');
	const [editedDescription, setEditedDescription] = useState('');
	const [editedTag, setEditedTag] = useState<ProjectType>('Frontend');

	const handleEdit = () => {
		if (project) {
			setEditedTitle(project.title);
			setEditedDescription(project.description);
			setEditedTag(project.tag);
			setIsEditing(true);
		}
	};

	const handleSave = async () => {
		if (!project) return;

		await updateProject(project.id, {
			title: editedTitle,
			description: editedDescription,
			tag: editedTag,
		});

		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedTitle('');
		setEditedDescription('');
		setEditedTag('Frontend');
	};

	const handleDelete = async () => {
		if (!project) {
			console.error('No project selected for deletion.');
			return;
		}

		if (window.confirm('Are you sure you want to delete this project?')) {
			await deleteProject(project.id);
		}
	};

	return (
		<>
			{project != null ? (
				<div className='flex flex-col shadow-xl rounded-3xl p-6'>
					<div className='flex justify-between items-center mb-4'>
						{isEditing ? (
							<div className='flex flex-col gap-2 flex-grow mr-4'>
								<input
									type='text'
									value={editedTitle}
									onChange={(e) => setEditedTitle(e.target.value)}
									className='text-xl font-bold border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent'
									placeholder='Project title'
								/>
								<select
									value={editedTag}
									onChange={(e) => setEditedTag(e.target.value as ProjectType)}
									className='text-sm px-3 py-1 border border-gray-300 rounded focus:border-blue-500 outline-none bg-white'
								>
									<option value='Frontend'>Frontend</option>
									<option value='Backend'>Backend</option>
									<option value='Fullstack'>Fullstack</option>
								</select>
							</div>
						) : (
							<div className='flex flex-col gap-2'>
								<h2 className='text-xl font-bold'>
									{project.title}
								</h2>
								<span className={`inline-block px-3 py-1 rounded-full text-xs font-medium w-fit ${
									project.tag === 'Frontend' ? 'bg-blue-100 text-blue-800' :
									project.tag === 'Backend' ? 'bg-green-100 text-green-800' :
									'bg-purple-100 text-purple-800'
								}`}>
									{project.tag}
								</span>
							</div>
						)}

						<div className='flex gap-2 items-center'>
							{isEditing ? (
								<>
									<button
										className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
										onClick={handleSave}>
										Save
									</button>
									<button
										className='px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors'
										onClick={handleCancel}>
										Cancel
									</button>
								</>
							) : (
								<>
									<button
										className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
										onClick={handleEdit}>
										Edit
									</button>
									<button
										className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
										onClick={handleDelete}>
										Delete
									</button>
								</>
							)}
						</div>
					</div>

					{isEditing ? (
						<textarea
							value={editedDescription}
							onChange={(e) =>
								setEditedDescription(e.target.value)
							}
							className='w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none resize-none'
							rows={4}
							placeholder='Project description'
						/>
					) : (
						<p className='text-gray-700'>{project.description}</p>
					)}
				</div>
			) : (
				<div className='text-center text-gray-500'>
					No project selected.
				</div>
			)}
		</>
	);
}
