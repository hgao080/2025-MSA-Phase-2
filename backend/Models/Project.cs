namespace Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public ProjectTag Tag { get; set; }

        // Foreign key to User
        public string AuthorId { get; set; } = null!;

        // Navigation property
        public User Author { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property for applications to this project
        public ICollection<Application> Applications { get; set; } = [];
    }
    
    public enum ProjectTag
    {
        Frontend = 0,
        Backend = 1,
        FullStack = 2
    }
}