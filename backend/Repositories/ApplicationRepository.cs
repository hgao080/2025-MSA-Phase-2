using Microsoft.EntityFrameworkCore;
using Models;
using backend.Contracts;

namespace backend.Repositories
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly AppDbContext _context;

        public ApplicationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Application>> GetApplicationsByProjectIdAsync(int projectId)
        {
            return await _context.Application
                .Include(a => a.Applicant)
                .Include(a => a.Project)
                .Where(a => a.ProjectId == projectId)
                .OrderBy(a => a.AppliedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Application>> GetApplicationsByApplicantIdAsync(string applicantId)
        {
            return await _context.Application
                .Include(a => a.Applicant)
                .Include(a => a.Project)
                .ThenInclude(p => p.Author)
                .Where(a => a.ApplicantId == applicantId)
                .OrderByDescending(a => a.AppliedAt)
                .ToListAsync();
        }

        public async Task<Application?> GetApplicationByIdAsync(long id)
        {
            return await _context.Application
                .Include(a => a.Applicant)
                .Include(a => a.Project)
                .ThenInclude(p => p.Author)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<bool> HasUserAppliedToProjectAsync(string applicantId, int projectId)
        {
            return await _context.Application
                .AnyAsync(a => a.ApplicantId == applicantId && 
                              a.ProjectId == projectId && 
                              a.Status != ApplicationStatus.Withdrawn);
        }

        public async Task AddApplicationAsync(Application application)
        {
            _context.Application.Add(application);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateApplicationAsync(Application application)
        {
            _context.Entry(application).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task WithdrawApplicationAsync(long id)
        {
            var application = await _context.Application.FindAsync(id);
            if (application != null && application.Status == ApplicationStatus.Pending)
            {
                application.Status = ApplicationStatus.Withdrawn;
                application.ReviewedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ApplicationExistsAsync(long id)
        {
            return await _context.Application.AnyAsync(e => e.Id == id);
        }

        public async Task<Application?> GetApplicationWithDetailsAsync(long id)
        {
            return await _context.Application
                .Include(a => a.Applicant)
                .Include(a => a.Project)
                .ThenInclude(p => p.Author)
                .FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}
