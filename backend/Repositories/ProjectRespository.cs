using Microsoft.EntityFrameworkCore;
using Models;
using backend.Contracts;

namespace backend.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext _context;

        public ProjectRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> GetAllProjectsAsync()
        {
            return await _context.Project
                .Include(p => p.Author)
                .Include(p => p.RolesNeeded)
                .ToListAsync();
        }

        public async Task<Project?> GetProjectByIdAsync(int id)
        {
            return await _context.Project
                .Include(p => p.Author)
                .Include(p => p.RolesNeeded)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Project>> GetProjectsByAuthorIdAsync(string authorId)
        {
            return await _context.Project
                .Include(p => p.Author)
                .Include(p => p.RolesNeeded)
                .Where(p => p.AuthorId == authorId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Project>> GetProjectsJoinedByUserAsync(string userId)
        {
            return await _context.Project
                .Include(p => p.Author)
                .Include(p => p.RolesNeeded)
                .Include(p => p.Applications)
                .Where(p => p.Applications.Any(a => a.ApplicantId == userId && a.Status == ApplicationStatus.Approved))
                .ToListAsync();
        }

        public async Task AddProjectAsync(Project project)
        {
            _context.Project.Add(project);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProjectAsync(Project project)
        {
            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProjectAsync(int id)
        {
            var project = await _context.Project.FindAsync(id);
            if (project != null)
            {
                _context.Project.Remove(project);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ProjectExistsAsync(int id)
        {
            return await _context.Project.AnyAsync(e => e.Id == id);
        }
    }
}