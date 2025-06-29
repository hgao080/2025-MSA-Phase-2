import { useEffect } from "react";
import { useUserApplicationStore } from "../Stores/UserApplicationStore";
import type { ApplicationStatus } from "../Models/Application";

export default function DashboardApplications() {
  const { 
    applications, 
    applicants, 
    isLoading, 
    fetchApplicationsPage,
    withdrawApplication,
    approveApplication,
    denyApplication 
  } = useUserApplicationStore();

  useEffect(() => {
    fetchApplicationsPage();
  }, [fetchApplicationsPage]);

  const getStatusBadge = (status: ApplicationStatus) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Denied':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Withdrawn':
        return `${baseClasses} bg-gray-100 text-gray-800`;
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

  const handleApprove = async (applicationId: number) => {
    if (window.confirm('Are you sure you want to approve this application?')) {
      await approveApplication(applicationId);
    }
  };

  const handleDeny = async (applicationId: number) => {
    if (window.confirm('Are you sure you want to deny this application?')) {
      await denyApplication(applicationId);
    }
  };

  return (
    <>
      <header className='bg-white shadow-sm'>
        <div className='flex items-end justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Your Applications
          </h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          {isLoading ? (
            <div className='flex justify-center items-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600'></div>
            </div>
          ) : (
            <div className='space-y-8'>
              {/* My Applications Section */}
              <div>
                <div className='mb-6'>
                  <h2 className='text-xl font-semibold text-gray-900'>My Applications</h2>
                  <p className='text-sm text-gray-600 mt-1'>Projects you've applied to</p>
                </div>
                
                {applications.length > 0 ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {applications.map((application) => (
                      <div key={application.id} className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                        <div className='flex justify-between items-start mb-4'>
                          <h3 className='text-lg font-medium text-gray-900 truncate'>
                            {application.projectTitle}
                          </h3>
                          <span className={getStatusBadge(application.status)}>
                            {application.status}
                          </span>
                        </div>
                        
                        <div className='space-y-2 mb-4'>
                          <p className='text-sm text-gray-600'>
                            <span className='font-medium'>Applied:</span> {formatDate(application.appliedAt)}
                          </p>
                          {application.reviewedAt && (
                            <p className='text-sm text-gray-600'>
                              <span className='font-medium'>Reviewed:</span> {formatDate(application.reviewedAt)}
                            </p>
                          )}
                        </div>
                        
                        <div className='mb-4'>
                          <p className='text-sm text-gray-600 font-medium mb-1'>Message:</p>
                          <p className='text-sm text-gray-800 bg-gray-50 p-2 rounded text-wrap break-words'>
                            {application.message}
                          </p>
                        </div>
                        
                        {application.status === 'Pending' && (
                          <button
                            onClick={() => handleWithdraw(application.id)}
                            className='w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                          >
                            Withdraw Application
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-12 bg-gray-50 rounded-lg'>
                    <div className='text-gray-500'>
                      <p className='text-lg font-medium'>No applications yet</p>
                      <p className='text-sm mt-1'>Start exploring projects and apply to ones that interest you!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Applicants to My Projects Section */}
              <div>
                <div className='mb-6'>
                  <h2 className='text-xl font-semibold text-gray-900'>Applicants to My Projects</h2>
                  <p className='text-sm text-gray-600 mt-1'>People who have applied to your projects</p>
                </div>
                
                {applicants.length > 0 ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {applicants.map((applicant) => (
                      <div key={applicant.id} className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                        <div className='flex justify-between items-start mb-4'>
                          <h3 className='text-lg font-medium text-gray-900 truncate'>
                            {applicant.projectTitle}
                          </h3>
                          <span className={getStatusBadge(applicant.status)}>
                            {applicant.status}
                          </span>
                        </div>
                        
                        <div className='space-y-2 mb-4'>
                          <p className='text-sm text-gray-600'>
                            <span className='font-medium'>Applicant:</span> {applicant.applicantName}
                          </p>
                          <p className='text-sm text-gray-600'>
                            <span className='font-medium'>Email:</span> {applicant.applicantEmail}
                          </p>
                          <p className='text-sm text-gray-600'>
                            <span className='font-medium'>Applied:</span> {formatDate(applicant.appliedAt)}
                          </p>
                          {applicant.reviewedAt && (
                            <p className='text-sm text-gray-600'>
                              <span className='font-medium'>Reviewed:</span> {formatDate(applicant.reviewedAt)}
                            </p>
                          )}
                        </div>
                        
                        <div className='mb-4'>
                          <p className='text-sm text-gray-600 font-medium mb-1'>Message:</p>
                          <p className='text-sm text-gray-800 bg-gray-50 p-2 rounded text-wrap break-words'>
                            {applicant.message}
                          </p>
                        </div>
                        
                        {applicant.status === 'Pending' && (
                          <div className='flex gap-2'>
                            <button
                              onClick={() => handleApprove(applicant.id)}
                              className='flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDeny(applicant.id)}
                              className='flex-1 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                            >
                              Deny
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-12 bg-gray-50 rounded-lg'>
                    <div className='text-gray-500'>
                      <p className='text-lg font-medium'>No applicants yet</p>
                      <p className='text-sm mt-1'>When people apply to your projects, they'll appear here.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
