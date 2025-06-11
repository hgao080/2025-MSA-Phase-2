using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;

        public ProjectsController(IProjectRepository repository, UserManager<User> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
        {
            var projects = await _repository.GetAllProjectsAsync();
            var projectDtos = projects.Select(p => new ProjectDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                AuthorEmail = p.Author.Email,
                CreatedAt = p.CreatedAt
            });
            return Ok(projectDtos);
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProject(int id)
        {
            var project = await _repository.GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            var projectDto = new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                AuthorEmail = project.Author.Email,
                CreatedAt = project.CreatedAt
            };

            return Ok(projectDto);
        }

        // GET: api/Projects/my-projects
        [HttpGet("my-projects")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetMyProjects()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            var projects = await _repository.GetProjectsByAuthorIdAsync(user.Id);
            var projectDtos = projects.Select(p => new ProjectDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                AuthorEmail = p.Author.Email,
                CreatedAt = p.CreatedAt
            });

            return Ok(projectDtos);
        }

        // POST: api/Projects
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ProjectDto>> CreateProject(CreateProjectDto createProjectDto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            var project = new Project
            {
                Name = createProjectDto.Name,
                Description = createProjectDto.Description,
                AuthorId = user.Id
            };

            await _repository.AddProjectAsync(project);

            // Fetch the project with author info
            var createdProject = await _repository.GetProjectByIdAsync(project.Id);
            var projectDto = new ProjectDto
            {
                Id = createdProject!.Id,
                Name = createdProject.Name,
                Description = createdProject.Description,
                AuthorEmail = createdProject.Author.Email,
                CreatedAt = createdProject.CreatedAt
            };

            return CreatedAtAction("GetProject", new { id = project.Id }, projectDto);
        }
    }

    // DTOs for API responses
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string? AuthorEmail { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateProjectDto
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}