namespace Models
{
    public class Application
    {
        public long Id { get; set; }
        
        // Foreign key to Project
        public int ProjectId { get; set; }
        
        // Foreign key to User (applicant)
        public string ApplicantId { get; set; } = null!;
        
        // Application status
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Pending;
        
        // When the application was submitted
        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
        
        // When the application was reviewed (approved/denied)
        public DateTime? ReviewedAt { get; set; }
        
        // Navigation properties
        public Project Project { get; set; } = null!;
        public User Applicant { get; set; } = null!;
    }
    
    public enum ApplicationStatus
    {
        Pending = 0,
        Approved = 1,
        Denied = 2,
        Withdrawn = 3
    }
}
