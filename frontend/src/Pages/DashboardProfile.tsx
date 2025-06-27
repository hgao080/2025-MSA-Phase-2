import { useState } from "react";
import { useAuthStore } from "../Stores/AuthStore";

export default function DashboardProfile() {
  const user = useAuthStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    summary: user?.summary || '',
    linkedinUrl: user?.linkedinUrl || '',
    githubUrl: user?.githubUrl || '',
    websiteUrl: user?.websiteUrl || '',
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form data when canceling
      setEditData({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        summary: user?.summary || '',
        linkedinUrl: user?.linkedinUrl || '',
        githubUrl: user?.githubUrl || '',
        websiteUrl: user?.websiteUrl || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // TODO: Implement API call to update user profile
      console.log('Saving profile data:', editData);
      
      // For now, just toggle back to view mode
      // In a real app, you'd call an API here and update the auth store
      setIsEditing(false);
      
      // You could show a success message here
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

	return (
		<>
			<header className='bg-white shadow-sm'>
				<div className='flex items-end justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Your Profile
					</h1>
				</div>
			</header>
			<main>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					{user ? (
						<div className='bg-white shadow-sm rounded-lg'>
							<div className='px-4 py-6 sm:p-6'>
								<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
									{/* Basic Information */}
									<div className='space-y-6'>
										<div>
											<h3 className='text-lg font-medium text-gray-900 mb-4'>
												Basic Information
											</h3>
											<div className='space-y-4'>
												<div>
													<label className='block text-sm font-medium text-gray-700'>
														First Name
													</label>
													{isEditing ? (
														<input
															type="text"
															value={editData.firstName}
															onChange={(e) => handleInputChange('firstName', e.target.value)}
															className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border'
														/>
													) : (
														<p className='mt-1 text-sm text-gray-900'>
															{user.firstName || 'Not specified'}
														</p>
													)}
												</div>
												<div>
													<label className='block text-sm font-medium text-gray-700'>
														Last Name
													</label>
													{isEditing ? (
														<input
															type="text"
															value={editData.lastName}
															onChange={(e) => handleInputChange('lastName', e.target.value)}
															className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border'
														/>
													) : (
														<p className='mt-1 text-sm text-gray-900'>
															{user.lastName || 'Not specified'}
														</p>
													)}
												</div>
												<div>
													<label className='block text-sm font-medium text-gray-700'>
														Email
													</label>
													<p className='mt-1 text-sm text-gray-900'>
														{user.email}
													</p>
													{isEditing && (
														<p className='mt-1 text-xs text-gray-500'>
															Email cannot be changed
														</p>
													)}
												</div>
											</div>
										</div>
									</div>

									{/* Professional Information */}
									<div className='space-y-6'>
										<div>
											<h3 className='text-lg font-medium text-gray-900 mb-4'>
												Professional Links
											</h3>
											<div className='space-y-4'>
												<div>
													<label className='block text-sm font-medium text-gray-700'>
														LinkedIn
													</label>
													{isEditing ? (
														<input
															type="url"
															value={editData.linkedinUrl}
															onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
															placeholder="https://linkedin.com/in/yourprofile"
															className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border'
														/>
													) : (
														<p className='mt-1 text-sm'>
															{user.linkedinUrl ? (
																<a 
																	href={user.linkedinUrl}
																	target='_blank'
																	rel='noopener noreferrer'
																	className='text-indigo-600 hover:text-indigo-500 underline'
																>
																	{user.linkedinUrl}
																</a>
															) : (
																<span className='text-gray-500'>Not specified</span>
															)}
														</p>
													)}
												</div>
												<div>
													<label className='block text-sm font-medium text-gray-700'>
														GitHub
													</label>
													{isEditing ? (
														<input
															type="url"
															value={editData.githubUrl}
															onChange={(e) => handleInputChange('githubUrl', e.target.value)}
															placeholder="https://github.com/yourusername"
															className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border'
														/>
													) : (
														<p className='mt-1 text-sm'>
															{user.githubUrl ? (
																<a 
																	href={user.githubUrl}
																	target='_blank'
																	rel='noopener noreferrer'
																	className='text-indigo-600 hover:text-indigo-500 underline'
																>
																	{user.githubUrl}
																</a>
															) : (
																<span className='text-gray-500'>Not specified</span>
															)}
														</p>
													)}
												</div>
												<div>
													<label className='block text-sm font-medium text-gray-700'>
														Website
													</label>
													{isEditing ? (
														<input
															type="url"
															value={editData.websiteUrl}
															onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
															placeholder="https://yourwebsite.com"
															className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border'
														/>
													) : (
														<p className='mt-1 text-sm'>
															{user.websiteUrl ? (
																<a 
																	href={user.websiteUrl}
																	target='_blank'
																	rel='noopener noreferrer'
																	className='text-indigo-600 hover:text-indigo-500 underline'
																>
																	{user.websiteUrl}
																</a>
															) : (
																<span className='text-gray-500'>Not specified</span>
															)}
														</p>
													)}
												</div>
											</div>
										</div>
									</div>

									{/* Summary Section (spans full width) */}
									<div className='md:col-span-2'>
										<div>
											<h3 className='text-lg font-medium text-gray-900 mb-4'>
												About Me
											</h3>
											{isEditing ? (
												<textarea
													value={editData.summary}
													onChange={(e) => handleInputChange('summary', e.target.value)}
													rows={4}
													placeholder="Tell us about yourself, your interests, and what you're looking for in collaborations..."
													className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border'
												/>
											) : (
												<div className='bg-gray-50 rounded-md p-4'>
													<p className='text-sm text-gray-900 whitespace-pre-wrap'>
														{user.summary || 'No summary provided yet.'}
													</p>
												</div>
											)}
										</div>
									</div>
								</div>

								{/* Edit Profile Buttons */}
								<div className='mt-8 pt-6 border-t border-gray-200'>
									{isEditing ? (
										<div className='flex gap-3'>
											<button
												type='button'
												onClick={handleSave}
												className='bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
											>
												Save Changes
											</button>
											<button
												type='button'
												onClick={handleEditToggle}
												className='bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
											>
												Cancel
											</button>
										</div>
									) : (
										<button
											type='button'
											onClick={handleEditToggle}
											className='bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
										>
											Edit Profile
										</button>
									)}
								</div>
							</div>
						</div>
					) : (
						<div className='text-center py-12'>
							<div className='text-gray-500'>Loading user information...</div>
						</div>
					)}
				</div>
			</main>
		</>
	);
}
