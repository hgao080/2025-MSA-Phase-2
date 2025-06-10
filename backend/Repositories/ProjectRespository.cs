using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories
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
            return await _context.Project.ToListAsync();
        }

        public async Task<Project> GetProjectByIdAsync(long id)
        {
            return await _context.Project.FindAsync(id);
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

        public async Task DeleteProjectAsync(long id)
        {
            var project = await _context.Project.FindAsync(id);
            if (project != null)
            {
                _context.Project.Remove(project);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ProjectExistsAsync(long id)
        {
            return await _context.Project.AnyAsync(e => e.Id == id);
        }
    }
}
