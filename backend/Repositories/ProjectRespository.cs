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
            return await _context.Project.ToListAsync();
        }

        public async Task AddProjectAsync(Project project)
        {
            _context.Project.Add(project);
            await _context.SaveChangesAsync();
        }
    }
}
