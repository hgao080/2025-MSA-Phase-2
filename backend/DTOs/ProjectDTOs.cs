using System.ComponentModel.DataAnnotations;
using Models;

namespace DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public ProjectTag Tag { get; set; }
        public string? AuthorEmail { get; set; }
        public DateTime CreatedAt { get; set; }
    }

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
    }
}
