using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;
using backend.Contracts;
using System.ComponentModel.DataAnnotations;
using DTOs;
using System.Text.Json;

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

        // Helper method to convert Project to ProjectDto
        private static ProjectDto ConvertToDto(Project project)
        {
            return new ProjectDto
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                Tag = project.Tag,
                AuthorName = project.Author?.FirstName + " " + project.Author?.LastName,
                AuthorEmail = project.Author?.Email,
                TeamSize = project.TeamSize,
                CurrentTeamSize = project.CurrentTeamSize,
                EstimatedDuration = project.EstimatedDuration,
                CreatedAt = project.CreatedAt,
                RolesNeeded = project.RolesNeeded.Select(r => new ProjectRoleDto
                {
                    Id = r.Id,
                    Title = r.Title,
                    Description = r.Description,
                    SkillsRequired = JsonSerializer.Deserialize<string[]>(r.SkillsRequired) ?? [],
                    Filled = r.Filled
                }).ToArray()
            };
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
        {
            var projects = await _repository.GetAllProjectsAsync();
            var projectDtos = projects.Select(ConvertToDto);
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

            var projectDto = ConvertToDto(project);
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
            var projectDtos = projects.Select(ConvertToDto);
            return Ok(projectDtos);
        }

        // POST: api/Projects
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ProjectDto>> CreateProject(CreateProjectDto createProjectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            var project = new Project
            {
                Title = createProjectDto.Title,
                Description = createProjectDto.Description,
                Tag = createProjectDto.Tag,
                AuthorId = user.Id,
                TeamSize = createProjectDto.TeamSize,
                CurrentTeamSize = 0,
                EstimatedDuration = createProjectDto.EstimatedDuration,
                RolesNeeded = createProjectDto.RolesNeeded.Select(r => new ProjectRole
                {
                    Id = Guid.NewGuid().ToString(),
                    Title = r.Title,
                    Description = r.Description,
                    SkillsRequired = JsonSerializer.Serialize(r.SkillsRequired),
                    Filled = false
                }).ToList()
            };

            await _repository.AddProjectAsync(project);

            // Fetch the project with author info and roles
            var createdProject = await _repository.GetProjectByIdAsync(project.Id);
            var projectDto = ConvertToDto(createdProject!);

            return CreatedAtAction("GetProject", new { id = project.Id }, projectDto);
        }

        // PUT: api/Projects/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<ProjectDto>> UpdateProject(int id, UpdateProjectDto updateProjectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            var project = await _repository.GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            // Check if the current user is the author of the project
            if (project.AuthorId != user.Id)
            {
                return Forbid("You can only update your own projects.");
            }

            // Update project properties
            project.Title = updateProjectDto.Title;
            project.Description = updateProjectDto.Description;
            project.Tag = updateProjectDto.Tag;
            project.TeamSize = updateProjectDto.TeamSize;
            project.EstimatedDuration = updateProjectDto.EstimatedDuration;

            // Update roles intelligently - preserve existing role IDs and filled status
            var existingRoles = project.RolesNeeded.ToList();
            var incomingRoles = updateProjectDto.RolesNeeded.ToList();

            // Clear the collection but keep references to existing roles
            project.RolesNeeded.Clear();

            for (int i = 0; i < incomingRoles.Count; i++)
            {
                var roleDto = incomingRoles[i];
                ProjectRole roleToAdd;

                // If we have an existing role at this index, preserve its ID and filled status
                if (i < existingRoles.Count)
                {
                    var existingRole = existingRoles[i];
                    roleToAdd = new ProjectRole
                    {
                        Id = existingRole.Id, // Preserve existing ID
                        ProjectId = project.Id,
                        Title = roleDto.Title,
                        Description = roleDto.Description,
                        SkillsRequired = JsonSerializer.Serialize(roleDto.SkillsRequired),
                        Filled = roleDto.Filled,
                        CreatedAt = existingRole.CreatedAt // Preserve creation date
                    };
                }
                else
                {
                    // New role - create with new ID and default filled status
                    roleToAdd = new ProjectRole
                    {
                        Id = Guid.NewGuid().ToString(),
                        ProjectId = project.Id,
                        Title = roleDto.Title,
                        Description = roleDto.Description,
                        SkillsRequired = JsonSerializer.Serialize(roleDto.SkillsRequired),
                    };
                }

                project.RolesNeeded.Add(roleToAdd);
            }

            // Keep current team size as is - user manages this manually
            // No recalculation needed

            try
            {
                await _repository.UpdateProjectAsync(project);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while updating the project.");
            }

            // Return updated project
            var updatedProject = await _repository.GetProjectByIdAsync(id);
            var projectDto = ConvertToDto(updatedProject!);
            return Ok(projectDto);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            var project = await _repository.GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            // Check if the current user is the author of the project
            if (project.AuthorId != user.Id)
            {
                return Forbid("You can only delete your own projects.");
            }

            try
            {
                await _repository.DeleteProjectAsync(id);
                return NoContent(); // 204 No Content - successful deletion
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while deleting the project.");
            }
        }
    }

}