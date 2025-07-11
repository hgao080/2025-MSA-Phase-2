namespace Models
{
    public class ProjectRole
    {
        public string Id { get; set; } = null!;
        public int ProjectId { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string SkillsRequired { get; set; } = null!; // JSON string
        public bool Filled { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        public Project Project { get; set; } = null!;
    }
}
