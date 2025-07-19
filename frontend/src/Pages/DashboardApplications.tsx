import { useEffect } from "react";
import { motion } from 'framer-motion';
import { useUserApplicationStore } from "../Stores/UserApplicationStore";
import type { ApplicationStatus } from "../Models/Application";
import { 
  PaperAirplaneIcon, 
  UserGroupIcon, 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InboxIcon
} from '@heroicons/react/24/outline';

export default function DashboardApplications() {
  const { 
    applications, 
    applicants, 
    isLoading, 
    fetchApplicationsPage,
    withdrawApplication,
    updateApplicantStatus,
  } = useUserApplicationStore();

  useEffect(() => {
    fetchApplicationsPage();
  }, [fetchApplicationsPage]);

  const getStatusBadge = (status: ApplicationStatus) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'Pending':
        return `${baseClasses} bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300`;
      case 'Approved':
        return `${baseClasses} bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300`;
      case 'Denied':
        return `${baseClasses} bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300`;
      case 'Withdrawn':
        return `${baseClasses} bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleWithdraw = async (applicationId: number) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      await withdrawApplication(applicationId);
    }
  };

  const handleApproveDeny = async (applicationId: number, status: string) => {
    if (window.confirm(`Are you sure you want to ${status} this application?`)) {
      let statusReq = { status: '' as ApplicationStatus };
      switch (status) {
        case 'approve':
          statusReq = { status: 'Approved' as ApplicationStatus };
          break;
        case 'deny':
          statusReq = { status: 'Denied' as ApplicationStatus };
          break;
        default:
          console.error('Invalid status for application update');
          return;
      }

      await updateApplicantStatus(applicationId, statusReq);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-50 dark:from-gray-900 to-indigo-50/30 dark:to-indigo-950/30 min-h-screen">
      {/* Header */}
      <header className='flex-shrink-0 bg-white/80 dark:bg-gray-900/80 shadow-sm backdrop-blur-sm border-gray-200/60 dark:border-gray-700/60 border-b'>
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
                <PaperAirplaneIcon className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className='bg-clip-text bg-gradient-to-r from-gray-900 dark:from-gray-100 to-gray-700 dark:to-gray-300 font-bold text-transparent text-2xl sm:text-3xl tracking-tight'>
                  Your Applications
                </h1>
                <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
                  Manage your project applications and review candidates
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced Stats Bar */}
          {(applications.length > 0 || applicants.length > 0) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="gap-4 grid grid-cols-2 lg:grid-cols-4 mt-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ y: -2 }}
                className="bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-blue-100 dark:to-blue-800/20 shadow-sm hover:shadow-md p-4 border border-white/60 dark:border-blue-700/30 rounded-xl transition-all duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-blue-900 dark:text-blue-100 text-2xl">
                      {applications.length}
                    </div>
                    <div className="font-medium text-blue-700 dark:text-blue-300 text-sm">
                      My Applications
                    </div>
                  </div>
                  <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-500 shadow-sm rounded-lg w-10 h-10">
                    <PaperAirplaneIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ y: -2 }}
                className="bg-gradient-to-br from-green-50 dark:from-green-900/20 to-green-100 dark:to-green-800/20 shadow-sm hover:shadow-md p-4 border border-white/60 dark:border-green-700/30 rounded-xl transition-all duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-green-900 dark:text-green-100 text-2xl">
                      {applicants.length}
                    </div>
                    <div className="font-medium text-green-700 dark:text-green-300 text-sm">
                      Applicants
                    </div>
                  </div>
                  <div className="flex justify-center items-center bg-gradient-to-br from-green-500 to-teal-500 shadow-sm rounded-lg w-10 h-10">
                    <UserGroupIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                whileHover={{ y: -2 }}
                className="bg-gradient-to-br from-amber-50 dark:from-amber-900/20 to-amber-100 dark:to-amber-800/20 shadow-sm hover:shadow-md p-4 border border-white/60 dark:border-amber-700/30 rounded-xl transition-all duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-amber-900 dark:text-amber-100 text-2xl">
                      {applications.filter(app => app.status === 'Pending').length}
                    </div>
                    <div className="font-medium text-amber-700 dark:text-amber-300 text-sm">
                      Pending
                    </div>
                  </div>
                  <div className="flex justify-center items-center bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm rounded-lg w-10 h-10">
                    <ClockIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ y: -2 }}
                className="bg-gradient-to-br from-emerald-50 dark:from-emerald-900/20 to-emerald-100 dark:to-emerald-800/20 shadow-sm hover:shadow-md p-4 border border-white/60 dark:border-emerald-700/30 rounded-xl transition-all duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-emerald-900 dark:text-emerald-100 text-2xl">
                      {applications.filter(app => app.status === 'Approved').length}
                    </div>
                    <div className="font-medium text-emerald-700 dark:text-emerald-300 text-sm">
                      Approved
                    </div>
                  </div>
                  <div className="flex justify-center items-center bg-gradient-to-br from-emerald-500 to-green-500 shadow-sm rounded-lg w-10 h-10">
                    <CheckCircleIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 min-h-0">
        <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full'>
          {isLoading ? (
            <div className='flex justify-center items-center py-16'>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className='border-2 border-indigo-600 border-t-transparent rounded-full w-8 h-8'
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8 h-full"
            >
              {/* My Applications Section */}
              <div>
                <div className='mb-6'>
                  <h2 className='flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100 text-xl'>
                    <PaperAirplaneIcon className="w-6 h-6 text-indigo-600" />
                    My Applications
                  </h2>
                  <p className='mt-1 text-gray-600 dark:text-gray-400 text-sm'>Projects you've applied to</p>
                </div>
                
                {applications.length > 0 ? (
                  <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {applications.map((application, index) => (
                      <motion.div 
                        key={application.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                        className='group bg-white dark:bg-gray-800 shadow-sm p-6 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-2xl transition-all duration-300'
                      >
                        {/* Header */}
                        <div className='flex justify-between items-start mb-4'>
                          <h3 className='flex-1 mr-3 overflow-hidden font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 text-lg transition-colors duration-200'>
                            <span className="block truncate">{application.projectTitle}</span>
                          </h3>
                          <span className={`${getStatusBadge(application.status)} shrink-0`}>
                            {application.status}
                          </span>
                        </div>
                        
                        {/* Timeline */}
                        <div className='space-y-2 mb-4'>
                          <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm'>
                            <ClockIcon className="w-4 h-4" />
                            <span className='font-medium'>Applied:</span> 
                            <span>{formatDate(application.appliedAt)}</span>
                          </div>
                          {application.reviewedAt && (
                            <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm'>
                              <CheckCircleIcon className="w-4 h-4" />
                              <span className='font-medium'>Reviewed:</span> 
                              <span>{formatDate(application.reviewedAt)}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Action Button */}
                        {application.status === 'Pending' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleWithdraw(application.id)}
                            className='flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 hover:from-red-700 to-pink-600 hover:to-pink-700 shadow-lg hover:shadow-xl px-4 py-3 rounded-xl w-full font-medium text-white text-sm transition-all duration-200'
                          >
                            <ExclamationTriangleIcon className="w-4 h-4" />
                            Withdraw Application
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className='bg-gradient-to-r from-gray-50 dark:from-gray-800 to-indigo-50/30 dark:to-indigo-900/30 py-16 border border-gray-200 dark:border-gray-700 rounded-2xl text-center'>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className='text-gray-500 dark:text-gray-400'
                    >
                      <div className="flex justify-center items-center bg-gradient-to-br from-gray-100 dark:from-gray-700 to-gray-200 dark:to-gray-600 mx-auto mb-4 rounded-full w-16 h-16">
                        <InboxIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className='mb-2 font-medium text-gray-900 dark:text-gray-100 text-lg'>No applications yet</p>
                      <p className='text-sm'>Start exploring projects and apply to ones that interest you!</p>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Applicants to My Projects Section */}
              <div>
                <div className='mb-6'>
                  <h2 className='flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100 text-xl'>
                    <UserGroupIcon className="w-6 h-6 text-indigo-600" />
                    Applicants to My Projects
                  </h2>
                  <p className='mt-1 text-gray-600 dark:text-gray-400 text-sm'>People who have applied to your projects</p>
                </div>
                
                {applicants.length > 0 ? (
                  <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {applicants.map((applicant, index) => (
                      <motion.div 
                        key={applicant.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                        className='group bg-white dark:bg-gray-800 shadow-sm p-6 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-2xl transition-all duration-300'
                      >
                        {/* Header */}
                        <div className='flex justify-between items-start mb-4'>
                          <h3 className='flex-1 mr-3 overflow-hidden font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 text-lg transition-colors duration-200'>
                            <span className="block truncate">{applicant.projectTitle}</span>
                          </h3>
                          <span className={`${getStatusBadge(applicant.status)} shrink-0`}>
                            {applicant.status}
                          </span>
                        </div>
                        
                        {/* Applicant Info */}
                        <div className='space-y-2 mb-4'>
                          <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className='font-medium'>Applicant:</span> 
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{applicant.applicantName}</span>
                          </div>
                          <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <span className='font-medium'>Email:</span> 
                            <span className="truncate">{applicant.applicantEmail}</span>
                          </div>
                          <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm'>
                            <ClockIcon className="w-4 h-4" />
                            <span className='font-medium'>Applied:</span> 
                            <span>{formatDate(applicant.appliedAt)}</span>
                          </div>
                          {applicant.reviewedAt && (
                            <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm'>
                              <CheckCircleIcon className="w-4 h-4" />
                              <span className='font-medium'>Reviewed:</span> 
                              <span>{formatDate(applicant.reviewedAt)}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Action Buttons */}
                        {applicant.status === 'Pending' && (
                          <div className='flex gap-3'>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleApproveDeny(applicant.id, 'approve')}
                              className='flex flex-1 justify-center items-center gap-2 bg-gradient-to-r from-green-600 hover:from-green-700 to-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl px-4 py-3 rounded-xl font-medium text-white text-sm transition-all duration-200'
                            >
                              <CheckCircleIcon className="w-4 h-4" />
                              Approve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleApproveDeny(applicant.id, 'deny')}
                              className='flex flex-1 justify-center items-center gap-2 bg-gradient-to-r from-red-600 hover:from-red-700 to-pink-600 hover:to-pink-700 shadow-lg hover:shadow-xl px-4 py-3 rounded-xl font-medium text-white text-sm transition-all duration-200'
                            >
                              <XCircleIcon className="w-4 h-4" />
                              Deny
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className='bg-gradient-to-r from-gray-50 dark:from-gray-800 to-indigo-50/30 dark:to-indigo-900/30 py-16 border border-gray-200 dark:border-gray-700 rounded-2xl text-center'>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className='text-gray-500 dark:text-gray-400'
                    >
                      <div className="flex justify-center items-center bg-gradient-to-br from-gray-100 dark:from-gray-700 to-gray-200 dark:to-gray-600 mx-auto mb-4 rounded-full w-16 h-16">
                        <UserGroupIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className='mb-2 font-medium text-gray-900 dark:text-gray-100 text-lg'>No applicants yet</p>
                      <p className='text-sm'>When people apply to your projects, they'll appear here.</p>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
