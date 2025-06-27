using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Contracts;
using DTOs;
using Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ApplicationsController : ControllerBase
    {
        private readonly IApplicationRepository _applicationRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly UserManager<User> _userManager;

        public ApplicationsController(
            IApplicationRepository applicationRepository,
            IProjectRepository projectRepository,
            UserManager<User> userManager)
        {
            _applicationRepository = applicationRepository;
            _projectRepository = projectRepository;
            _userManager = userManager;
        }

        /// <summary>
        /// Submit an application to a project
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ApplicationDto>> SubmitApplication(CreateApplicationDto createApplicationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated");
            }

            // Check if project exists
            var project = await _projectRepository.GetProjectByIdAsync(createApplicationDto.ProjectId);
            if (project == null)
            {
                return NotFound("Project not found");
            }

            // Check if user is trying to apply to their own project
            if (project.AuthorId == userId)
            {
                return BadRequest("You cannot apply to your own project");
            }

            // Check if user has already applied to this project
            var hasApplied = await _applicationRepository.HasUserAppliedToProjectAsync(userId, createApplicationDto.ProjectId);
            if (hasApplied)
            {
                return BadRequest("You have already applied to this project");
            }

            // Create the application
            var application = new Application
            {
                ProjectId = createApplicationDto.ProjectId,
                ApplicantId = userId,
                Message = string.IsNullOrWhiteSpace(createApplicationDto.Message) ? null : createApplicationDto.Message.Trim(),
                Status = ApplicationStatus.Pending,
                AppliedAt = DateTime.UtcNow
            };

            try
            {
                await _applicationRepository.AddApplicationAsync(application);

                // Fetch the created application with details for response
                var createdApplication = await _applicationRepository.GetApplicationWithDetailsAsync(application.Id);
                if (createdApplication == null)
                {
                    return StatusCode(500, "Failed to retrieve created application");
                }

                var applicationDto = new ApplicationDto
                {
                    Id = createdApplication.Id,
                    ProjectId = createdApplication.ProjectId,
                    ProjectTitle = createdApplication.Project.Title,
                    ApplicantId = createdApplication.ApplicantId,
                    ApplicantName = $"{createdApplication.Applicant.FirstName} {createdApplication.Applicant.LastName}",
                    ApplicantEmail = createdApplication.Applicant.Email ?? "",
                    Message = createdApplication.Message,
                    Status = createdApplication.Status,
                    AppliedAt = createdApplication.AppliedAt,
                    ReviewedAt = createdApplication.ReviewedAt
                };

                return CreatedAtAction(nameof(GetApplication), new { id = application.Id }, applicationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while submitting the application: {ex.Message}");
            }
        }

        /// <summary>
        /// Get a specific application by ID (accessible by applicant or project author)
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationDto>> GetApplication(long id)
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated");
            }

            var application = await _applicationRepository.GetApplicationWithDetailsAsync(id);
            if (application == null)
            {
                return NotFound("Application not found");
            }

            // Check if user has permission to view this application
            // (must be the applicant or the project author)
            if (application.ApplicantId != userId && application.Project.AuthorId != userId)
            {
                return Forbid("You don't have permission to view this application");
            }

            var applicationDto = new ApplicationDto
            {
                Id = application.Id,
                ProjectId = application.ProjectId,
                ProjectTitle = application.Project.Title,
                ApplicantId = application.ApplicantId,
                ApplicantName = $"{application.Applicant.FirstName} {application.Applicant.LastName}",
                ApplicantEmail = application.Applicant.Email ?? "",
                Message = application.Message,
                Status = application.Status,
                AppliedAt = application.AppliedAt,
                ReviewedAt = application.ReviewedAt
            };

            return Ok(applicationDto);
        }

        /// <summary>
        /// Get all applications for projects owned by the current user
        /// </summary>
        [HttpGet("my-projects")]
        public async Task<ActionResult<IEnumerable<ApplicationDto>>> GetApplicationsForMyProjects()
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated");
            }

            // Get all projects owned by the user
            var userProjects = await _projectRepository.GetProjectsByAuthorIdAsync(userId);
            var projectIds = userProjects.Select(p => p.Id).ToList();

            if (!projectIds.Any())
            {
                return Ok(new List<ApplicationDto>());
            }

            // Get all applications for these projects
            var allApplications = new List<Application>();
            foreach (var projectId in projectIds)
            {
                var projectApplications = await _applicationRepository.GetApplicationsByProjectIdAsync(projectId);
                allApplications.AddRange(projectApplications);
            }

            var applicationDtos = allApplications.Select(a => new ApplicationDto
            {
                Id = a.Id,
                ProjectId = a.ProjectId,
                ProjectTitle = a.Project.Title,
                ApplicantId = a.ApplicantId,
                ApplicantName = $"{a.Applicant.FirstName} {a.Applicant.LastName}",
                ApplicantEmail = a.Applicant.Email ?? "",
                Message = a.Message,
                Status = a.Status,
                AppliedAt = a.AppliedAt,
                ReviewedAt = a.ReviewedAt
            }).OrderByDescending(a => a.AppliedAt);

            return Ok(applicationDtos);
        }

        /// <summary>
        /// Get all applications submitted by the current user
        /// </summary>
        [HttpGet("my-applications")]
        public async Task<ActionResult<IEnumerable<ApplicationDto>>> GetMyApplications()
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated");
            }

            var applications = await _applicationRepository.GetApplicationsByApplicantIdAsync(userId);

            var applicationDtos = applications.Select(a => new ApplicationDto
            {
                Id = a.Id,
                ProjectId = a.ProjectId,
                ProjectTitle = a.Project.Title,
                ApplicantId = a.ApplicantId,
                ApplicantName = $"{a.Applicant.FirstName} {a.Applicant.LastName}",
                ApplicantEmail = a.Applicant.Email ?? "",
                Message = a.Message,
                Status = a.Status,
                AppliedAt = a.AppliedAt,
                ReviewedAt = a.ReviewedAt
            });

            return Ok(applicationDtos);
        }

        /// <summary>
        /// Get all applications for a specific project (project author only)
        /// </summary>
        [HttpGet("project/{projectId}")]
        public async Task<ActionResult<IEnumerable<ApplicationDto>>> GetApplicationsForProject(int projectId)
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated");
            }

            // Check if project exists and user is the author
            var project = await _projectRepository.GetProjectByIdAsync(projectId);
            if (project == null)
            {
                return NotFound("Project not found");
            }

            if (project.AuthorId != userId)
            {
                return Forbid("You don't have permission to view applications for this project");
            }

            var applications = await _applicationRepository.GetApplicationsByProjectIdAsync(projectId);

            var applicationDtos = applications.Select(a => new ApplicationDto
            {
                Id = a.Id,
                ProjectId = a.ProjectId,
                ProjectTitle = a.Project.Title,
                ApplicantId = a.ApplicantId,
                ApplicantName = $"{a.Applicant.FirstName} {a.Applicant.LastName}",
                ApplicantEmail = a.Applicant.Email ?? "",
                Message = a.Message,
                Status = a.Status,
                AppliedAt = a.AppliedAt,
                ReviewedAt = a.ReviewedAt
            });

            return Ok(applicationDtos);
        }

        /// <summary>
        /// Update application status (approve/deny) - project author only
        /// </summary>
        [HttpPatch("{id}/status")]
        public async Task<ActionResult<ApplicationDto>> UpdateApplicationStatus(long id, UpdateApplicationStatusDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated");
            }

            var application = await _applicationRepository.GetApplicationWithDetailsAsync(id);
            if (application == null)
            {
                return NotFound("Application not found");
            }

            // Check if user is the project author
            if (application.Project.AuthorId != userId)
            {
                return Forbid("You don't have permission to update this application");
            }

            // Check if application is in pending status
            if (application.Status != ApplicationStatus.Pending)
            {
                return BadRequest("Only pending applications can be approved or denied");
            }

            // Validate status transition
            if (updateDto.Status != ApplicationStatus.Approved && updateDto.Status != ApplicationStatus.Denied)
            {
                return BadRequest("Status can only be set to Approved or Denied");
            }

            try
            {
                application.Status = updateDto.Status;
                application.ReviewedAt = DateTime.UtcNow;

                await _applicationRepository.UpdateApplicationAsync(application);

                var applicationDto = new ApplicationDto
                {
                    Id = application.Id,
                    ProjectId = application.ProjectId,
                    ProjectTitle = application.Project.Title,
                    ApplicantId = application.ApplicantId,
                    ApplicantName = $"{application.Applicant.FirstName} {application.Applicant.LastName}",
                    ApplicantEmail = application.Applicant.Email ?? "",
                    Message = application.Message,
                    Status = application.Status,
                    AppliedAt = application.AppliedAt,
                    ReviewedAt = application.ReviewedAt
                };

                return Ok(applicationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the application: {ex.Message}");
            }
        }

        /// <summary>
        /// Withdraw an application (applicant only)
        /// </summary>
        [HttpPatch("{id}/withdraw")]
        public async Task<ActionResult<ApplicationDto>> WithdrawApplication(long id)
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated");
            }

            var application = await _applicationRepository.GetApplicationWithDetailsAsync(id);
            if (application == null)
            {
                return NotFound("Application not found");
            }

            // Check if user is the applicant
            if (application.ApplicantId != userId)
            {
                return Forbid("You can only withdraw your own applications");
            }

            // Check if application is in pending status
            if (application.Status != ApplicationStatus.Pending)
            {
                return BadRequest("Only pending applications can be withdrawn");
            }

            try
            {
                await _applicationRepository.WithdrawApplicationAsync(id);

                // Fetch updated application
                var updatedApplication = await _applicationRepository.GetApplicationWithDetailsAsync(id);
                if (updatedApplication == null)
                {
                    return StatusCode(500, "Failed to retrieve updated application");
                }

                var applicationDto = new ApplicationDto
                {
                    Id = updatedApplication.Id,
                    ProjectId = updatedApplication.ProjectId,
                    ProjectTitle = updatedApplication.Project.Title,
                    ApplicantId = updatedApplication.ApplicantId,
                    ApplicantName = $"{updatedApplication.Applicant.FirstName} {updatedApplication.Applicant.LastName}",
                    ApplicantEmail = updatedApplication.Applicant.Email ?? "",
                    Message = updatedApplication.Message,
                    Status = updatedApplication.Status,
                    AppliedAt = updatedApplication.AppliedAt,
                    ReviewedAt = updatedApplication.ReviewedAt
                };

                return Ok(applicationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while withdrawing the application: {ex.Message}");
            }
        }
    }
}
