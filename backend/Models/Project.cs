namespace Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        
        // Foreign key to User
        public string AuthorId { get; set; } = null!;
        
        // Navigation property
        public User Author { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}