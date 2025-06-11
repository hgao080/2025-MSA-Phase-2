using Models;

namespace backend.Contracts
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllProjectsAsync();
        Task<Project?> GetProjectByIdAsync(int id);
        Task<IEnumerable<Project>> GetProjectsByAuthorIdAsync(string authorId);
        Task AddProjectAsync(Project project);
        Task UpdateProjectAsync(Project project);
        Task DeleteProjectAsync(int id);
        Task<bool> ProjectExistsAsync(int id);
    }
}