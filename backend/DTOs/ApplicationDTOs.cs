using System.ComponentModel.DataAnnotations;
using Models;

namespace DTOs
{
    public class CreateApplicationDto
    {
        [Required(ErrorMessage = "Project ID is required")]
        public int ProjectId { get; set; }
        
        [StringLength(500, ErrorMessage = "Message cannot exceed 500 characters")]
        public string? Message { get; set; }
    }
    
    public class ApplicationDto
    {
        public long Id { get; set; }
        public int ProjectId { get; set; }
        public string ProjectTitle { get; set; } = null!;
        public string ApplicantId { get; set; } = null!;
        public string ApplicantName { get; set; } = null!;
        public string ApplicantEmail { get; set; } = null!;
        public string? Message { get; set; }
        public ApplicationStatus Status { get; set; }
        public DateTime AppliedAt { get; set; }
        public DateTime? ReviewedAt { get; set; }
    }
    
    public class UpdateApplicationStatusDto
    {
        [Required(ErrorMessage = "Status is required")]
        public ApplicationStatus Status { get; set; }
    }
}
