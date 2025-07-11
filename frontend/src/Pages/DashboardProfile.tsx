import { useState } from "react";
import { motion } from 'framer-motion';
import { useAuthStore } from "../Stores/AuthStore";
import { 
  UserIcon, 
  LinkIcon, 
  DocumentTextIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  GlobeAltIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

export default function DashboardProfile() {
  const {user, update} = useAuthStore();
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
      await update({
        firstName: editData.firstName,
        lastName: editData.lastName,
        summary: editData.summary,
        linkedinUrl: editData.linkedinUrl ?? null,
        githubUrl: editData.githubUrl ?? null,
        websiteUrl: editData.websiteUrl ?? null,
      });
      
      // For now, just toggle back to view mode
      // In a real app, you'd call an API here and update the auth store
      setIsEditing(false);
      
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

	return (
		<div className="flex flex-col bg-gradient-to-br from-gray-50 to-indigo-50/30 min-h-screen">
			{/* Header */}
			<header className='flex-shrink-0 bg-white/80 shadow-sm backdrop-blur-sm border-gray-200/60 border-b'>
				<div className='mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl'>
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4'
					>
						<div className='flex items-center gap-4'>
							<motion.div 
								whileHover={{ scale: 1.05 }}
								className="flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg rounded-xl w-12 h-12"
							>
								<UserIcon className="w-7 h-7 text-white" />
							</motion.div>
							<div>
								<h1 className='bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 font-bold text-transparent text-2xl sm:text-3xl tracking-tight'>
									Your Profile
								</h1>
								<p className="mt-1 text-gray-600 text-sm">
									Manage your personal information and professional links
								</p>
							</div>
						</div>
						
						{/* Edit Toggle Button */}
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={handleEditToggle}
							className={`px-6 py-3 rounded-xl font-medium text-sm shadow-lg transition-all duration-200 flex items-center gap-2 ${
								isEditing 
									? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white' 
									: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
							}`}
						>
							{isEditing ? (
								<>
									<XMarkIcon className="w-4 h-4" />
									Cancel
								</>
							) : (
								<>
									<PencilIcon className="w-4 h-4" />
									Edit Profile
								</>
							)}
						</motion.button>
					</motion.div>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1 py-8">
				<div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
					{user ? (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className='space-y-8'
						>
							{/* Basic Information Card */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.1 }}
								className='bg-white shadow-sm hover:shadow-md p-6 border border-gray-200 rounded-2xl transition-all duration-300'
							>
								<div className='flex items-center gap-3 mb-6'>
									<div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm rounded-lg w-10 h-10">
										<UserIcon className="w-5 h-5 text-white" />
									</div>
									<h3 className='font-semibold text-gray-900 text-xl'>
										Basic Information
									</h3>
								</div>
								
								<div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
									<div>
										<label className='block mb-2 font-medium text-gray-700 text-sm'>
											First Name
										</label>
										{isEditing ? (
											<input
												type="text"
												value={editData.firstName}
												onChange={(e) => handleInputChange('firstName', e.target.value)}
												className='px-4 py-3 border border-gray-300 focus:border-indigo-500 rounded-xl focus:ring-4 focus:ring-indigo-500/20 w-full text-sm transition-all duration-200'
											/>
										) : (
											<div className='bg-gradient-to-r from-gray-50 to-gray-100 p-3 border border-gray-200 rounded-xl'>
												<p className='font-medium text-gray-900 text-sm'>
													{user.firstName || 'Not specified'}
												</p>
											</div>
										)}
									</div>
									
									<div>
										<label className='block mb-2 font-medium text-gray-700 text-sm'>
											Last Name
										</label>
										{isEditing ? (
											<input
												type="text"
												value={editData.lastName}
												onChange={(e) => handleInputChange('lastName', e.target.value)}
												className='px-4 py-3 border border-gray-300 focus:border-indigo-500 rounded-xl focus:ring-4 focus:ring-indigo-500/20 w-full text-sm transition-all duration-200'
											/>
										) : (
											<div className='bg-gradient-to-r from-gray-50 to-gray-100 p-3 border border-gray-200 rounded-xl'>
												<p className='font-medium text-gray-900 text-sm'>
													{user.lastName || 'Not specified'}
												</p>
											</div>
										)}
									</div>
									
									<div className="md:col-span-2">
										<label className='flex items-center gap-2 mb-2 font-medium text-gray-700 text-sm'>
											<EnvelopeIcon className="w-4 h-4" />
											Email
										</label>
										<div className='bg-gradient-to-r from-gray-50 to-gray-100 p-3 border border-gray-200 rounded-xl'>
											<p className='font-medium text-gray-900 text-sm'>
												{user.email}
											</p>
											{isEditing && (
												<p className='mt-1 text-gray-500 text-xs'>
													Email cannot be changed
												</p>
											)}
										</div>
									</div>
								</div>
							</motion.div>

							{/* Professional Links Card */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.2 }}
								className='bg-white shadow-sm hover:shadow-md p-6 border border-gray-200 rounded-2xl transition-all duration-300'
							>
								<div className='flex items-center gap-3 mb-6'>
									<div className="flex justify-center items-center bg-gradient-to-br from-green-500 to-teal-500 shadow-sm rounded-lg w-10 h-10">
										<LinkIcon className="w-5 h-5 text-white" />
									</div>
									<h3 className='font-semibold text-gray-900 text-xl'>
										Professional Links
									</h3>
								</div>
								
								<div className='space-y-6'>
									<div>
										<label className='block mb-2 font-medium text-gray-700 text-sm'>
											LinkedIn
										</label>
										{isEditing ? (
											<input
												type="url"
												value={editData.linkedinUrl}
												onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
												placeholder="https://linkedin.com/in/yourprofile"
												className='px-4 py-3 border border-gray-300 focus:border-indigo-500 rounded-xl focus:ring-4 focus:ring-indigo-500/20 w-full text-sm transition-all duration-200'
											/>
										) : (
											<div className='bg-gradient-to-r from-gray-50 to-gray-100 p-3 border border-gray-200 rounded-xl'>
												{user.linkedinUrl ? (
													<a 
														href={user.linkedinUrl}
														target='_blank'
														rel='noopener noreferrer'
														className='flex items-center gap-2 font-medium text-indigo-600 hover:text-indigo-700 text-sm transition-colors duration-200'
													>
														<GlobeAltIcon className="w-4 h-4" />
														{user.linkedinUrl}
													</a>
												) : (
													<span className='text-gray-500 text-sm'>Not specified</span>
												)}
											</div>
										)}
									</div>
									
									<div>
										<label className='block mb-2 font-medium text-gray-700 text-sm'>
											GitHub
										</label>
										{isEditing ? (
											<input
												type="url"
												value={editData.githubUrl}
												onChange={(e) => handleInputChange('githubUrl', e.target.value)}
												placeholder="https://github.com/yourusername"
												className='px-4 py-3 border border-gray-300 focus:border-indigo-500 rounded-xl focus:ring-4 focus:ring-indigo-500/20 w-full text-sm transition-all duration-200'
											/>
										) : (
											<div className='bg-gradient-to-r from-gray-50 to-gray-100 p-3 border border-gray-200 rounded-xl'>
												{user.githubUrl ? (
													<a 
														href={user.githubUrl}
														target='_blank'
														rel='noopener noreferrer'
														className='flex items-center gap-2 font-medium text-indigo-600 hover:text-indigo-700 text-sm transition-colors duration-200'
													>
														<GlobeAltIcon className="w-4 h-4" />
														{user.githubUrl}
													</a>
												) : (
													<span className='text-gray-500 text-sm'>Not specified</span>
												)}
											</div>
										)}
									</div>
									
									<div>
										<label className='block mb-2 font-medium text-gray-700 text-sm'>
											Website
										</label>
										{isEditing ? (
											<input
												type="url"
												value={editData.websiteUrl}
												onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
												placeholder="https://yourwebsite.com"
												className='px-4 py-3 border border-gray-300 focus:border-indigo-500 rounded-xl focus:ring-4 focus:ring-indigo-500/20 w-full text-sm transition-all duration-200'
											/>
										) : (
											<div className='bg-gradient-to-r from-gray-50 to-gray-100 p-3 border border-gray-200 rounded-xl'>
												{user.websiteUrl ? (
													<a 
														href={user.websiteUrl}
														target='_blank'
														rel='noopener noreferrer'
														className='flex items-center gap-2 font-medium text-indigo-600 hover:text-indigo-700 text-sm transition-colors duration-200'
													>
														<GlobeAltIcon className="w-4 h-4" />
														{user.websiteUrl}
													</a>
												) : (
													<span className='text-gray-500 text-sm'>Not specified</span>
												)}
											</div>
										)}
									</div>
								</div>
							</motion.div>

							{/* About Me Card */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.3 }}
								className='bg-white shadow-sm hover:shadow-md p-6 border border-gray-200 rounded-2xl transition-all duration-300'
							>
								<div className='flex items-center gap-3 mb-6'>
									<div className="flex justify-center items-center bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm rounded-lg w-10 h-10">
										<DocumentTextIcon className="w-5 h-5 text-white" />
									</div>
									<h3 className='font-semibold text-gray-900 text-xl'>
										About Me
									</h3>
								</div>
								
								{isEditing ? (
									<textarea
										value={editData.summary}
										onChange={(e) => handleInputChange('summary', e.target.value)}
										rows={6}
										placeholder="Tell us about yourself, your interests, and what you're looking for in collaborations..."
										className='px-4 py-3 border border-gray-300 focus:border-indigo-500 rounded-xl focus:ring-4 focus:ring-indigo-500/20 w-full text-sm transition-all duration-200 resize-none'
									/>
								) : (
									<div className='flex items-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 border border-gray-200 rounded-xl min-h-[120px]'>
										<p className='text-gray-900 text-sm leading-relaxed whitespace-pre-wrap'>
											{user.summary || 'No summary provided yet. Click "Edit Profile" to add information about yourself!'}
										</p>
									</div>
								)}
							</motion.div>

							{/* Save/Cancel Buttons (only show when editing) */}
							{isEditing && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: 0.4 }}
									className='flex justify-end gap-4'
								>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										type='button'
										onClick={handleEditToggle}
										className='flex items-center gap-2 bg-white hover:bg-gray-50 shadow-sm px-6 py-3 border border-gray-300 hover:border-gray-400 rounded-xl font-medium text-gray-700 text-sm transition-all duration-200'
									>
										<XMarkIcon className="w-4 h-4" />
										Cancel
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										type='button'
										onClick={handleSave}
										className='flex items-center gap-2 bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl px-6 py-3 rounded-xl font-medium text-white text-sm transition-all duration-200'
									>
										<CheckIcon className="w-4 h-4" />
										Save Changes
									</motion.button>
								</motion.div>
							)}
						</motion.div>
					) : (
						<div className='py-16 text-center'>
							<motion.div 
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
								className='text-gray-500'
							>
								<div className="flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 mx-auto mb-4 rounded-full w-16 h-16">
									<UserIcon className="w-8 h-8 text-gray-400" />
								</div>
								<p className='mb-2 font-medium text-gray-900 text-lg'>Loading user information...</p>
								<p className='text-sm'>Please wait while we fetch your profile details.</p>
							</motion.div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
