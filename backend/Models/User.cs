using Microsoft.AspNetCore.Identity;

namespace Models
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? DisplayName { get; set; }
        public string? Summary { get; set; }
        public string? linkedinUrl { get; set; }
        public string? githubUrl { get; set; }
        public string? websiteUrl { get; set; }

        // Navigation property for projects created by this user
        public ICollection<Project> CreatedProjects { get; set; } = new List<Project>();
    }
}