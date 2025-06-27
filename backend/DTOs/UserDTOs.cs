using System.ComponentModel.DataAnnotations;

namespace DTOs
{
    public class UpdateProfileDto
    {
        [StringLength(500, ErrorMessage = "Summary cannot exceed 500 characters")]
        public string? Summary { get; set; }
        
        [Url(ErrorMessage = "Invalid LinkedIn URL format")]
        public string? LinkedinUrl { get; set; }
        
        [Url(ErrorMessage = "Invalid GitHub URL format")]
        public string? GithubUrl { get; set; }
        
        [Url(ErrorMessage = "Invalid website URL format")]
        public string? WebsiteUrl { get; set; }
    }
}
