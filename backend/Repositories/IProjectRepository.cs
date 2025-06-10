using Models;

namespace Repositories
{
  public interface IProjectRepository
  {
    Task<IEnumerable<Project>> GetAllProjectsAsync();
    Task<Project> GetProjectByIdAsync(long id);
    Task AddProjectAsync(Project project);
    Task UpdateProjectAsync(Project project);
    Task DeleteProjectAsync(long id);
    Task<bool> ProjectExistsAsync(long id);
  }
}
