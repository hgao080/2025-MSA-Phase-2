using Models;

namespace backend.Contracts
{
    public interface IApplicationRepository
    {
        // Get all applications for a specific project (for project authors)
        Task<IEnumerable<Application>> GetApplicationsByProjectIdAsync(int projectId);
        
        // Get all applications submitted by a specific user (for applicants)
        Task<IEnumerable<Application>> GetApplicationsByApplicantIdAsync(string applicantId);
        
        // Get a specific application by ID
        Task<Application?> GetApplicationByIdAsync(long id);
        
        // Check if a user has already applied to a project
        Task<bool> HasUserAppliedToProjectAsync(string applicantId, int projectId);
        
        // Submit a new application
        Task AddApplicationAsync(Application application);
        
        // Update application status (approve/deny)
        Task UpdateApplicationAsync(Application application);
        
        // Withdraw an application (user can withdraw their own pending applications)
        Task WithdrawApplicationAsync(long id);
        
        // Check if application exists
        Task<bool> ApplicationExistsAsync(long id);
        
        // Get application with related data (project and applicant info)
        Task<Application?> GetApplicationWithDetailsAsync(long id);
    }
}
