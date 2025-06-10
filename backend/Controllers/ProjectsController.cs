using Microsoft.AspNetCore.Mvc;
using Models;
using backend.Contracts;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectRepository _repository;

        public ProjectsController(IProjectRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _repository.GetAllProjectsAsync();
            return Ok(projects);
        }

        // POST: api/Projects
        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject(Project project)
        {
            await _repository.AddProjectAsync(project);
            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }
    }
}