using System.ComponentModel.DataAnnotations;
using Models;
using System.Text.Json;

namespace DTOs
{
    public class CreateProjectDto
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters")]
        public string Title { get; set; } = null!;
        
        [Required(ErrorMessage = "Description is required")]
        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
        public string Description { get; set; } = null!;
        
        [Required(ErrorMessage = "Tag is required")]
        [EnumDataType(typeof(ProjectTag), ErrorMessage = "Tag must be Frontend, Backend, or FullStack")]
        public ProjectTag Tag { get; set; }

        [Required(ErrorMessage = "Team size is required")]
        [Range(1, 20, ErrorMessage = "Team size must be between 1 and 20")]
        public int TeamSize { get; set; }

        [Range(1, 120, ErrorMessage = "Estimated duration must be between 1 and 120 months")]
        public int? EstimatedDuration { get; set; }

        [Required(ErrorMessage = "Roles needed are required")]
        [MinLength(1, ErrorMessage = "At least one role is required")]
        public CreateProjectRoleDto[] RolesNeeded { get; set; } = [];
    }

    public class UpdateProjectDto
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters")]
        public string Title { get; set; } = null!;
        
        [Required(ErrorMessage = "Description is required")]
        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
        public string Description { get; set; } = null!;
        
        [Required(ErrorMessage = "Tag is required")]
        [EnumDataType(typeof(ProjectTag), ErrorMessage = "Tag must be Frontend, Backend, or FullStack")]
        public ProjectTag Tag { get; set; }

        [Required(ErrorMessage = "Team size is required")]
        [Range(1, 20, ErrorMessage = "Team size must be between 1 and 20")]
        public int TeamSize { get; set; }

        [Range(1, 120, ErrorMessage = "Estimated duration must be between 1 and 120 months")]
        public int? EstimatedDuration { get; set; }

        [Required(ErrorMessage = "Roles needed are required")]
        [MinLength(1, ErrorMessage = "At least one role is required")]
        public ProjectRoleDto[] RolesNeeded { get; set; } = [];
    }

    public class CreateProjectRoleDto
    {
        [Required(ErrorMessage = "Role title is required")]
        [StringLength(100, ErrorMessage = "Role title cannot exceed 100 characters")]
        public string Title { get; set; } = null!;
        
        [Required(ErrorMessage = "Role description is required")]
        [StringLength(500, ErrorMessage = "Role description cannot exceed 500 characters")]
        public string Description { get; set; } = null!;
        
        [Required(ErrorMessage = "Skills required is required")]
        [MinLength(1, ErrorMessage = "At least one skill is required")]
        public string[] SkillsRequired { get; set; } = [];
    }
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public ProjectTag Tag { get; set; }
        public string? AuthorName { get; set; }
        public string? AuthorEmail { get; set; }
        public int TeamSize { get; set; }
        public int CurrentTeamSize { get; set; }
        public int? EstimatedDuration { get; set; }
        public DateTime CreatedAt { get; set; }
        public ProjectRoleDto[] RolesNeeded { get; set; } = [];
    }

    public class ProjectRoleDto
    {
        public string Id { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string[] SkillsRequired { get; set; } = [];
        public bool Filled { get; set; }
    }

    
}
