using Microsoft.AspNetCore.Identity;

namespace Models
{
    public class User : IdentityUser
    {
        // Navigation property for projects created by this user
        public ICollection<Project> CreatedProjects { get; set; } = new List<Project>();
    }
}