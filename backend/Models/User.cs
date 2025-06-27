using Microsoft.AspNetCore.Identity;

namespace Models
{
    public class User : IdentityUser
    {
        // Required fields for registration
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        // Optional fields for user dashboard
        public string? Summary { get; set; }
        public string? LinkedinUrl { get; set; }
        public string? GithubUrl { get; set; }
        public string? WebsiteUrl { get; set; }

        // Navigation property for projects
        public ICollection<Project> CreatedProjects { get; set; } = [];
        
        // Navigation property for applications submitted by this user
        public ICollection<Application> Applications { get; set; } = [];
    }
    
    
}