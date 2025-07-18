using System.ComponentModel.DataAnnotations;

namespace Models
{
    /// <summary>
    /// Represents a text message sent within a project team
    /// </summary>
    public class Message
    {
        public long Id { get; set; }
        
        [Required]
        public int ProjectId { get; set; }
        
        [Required]
        public string SenderId { get; set; } = null!;
        
        [Required]
        [StringLength(2000, ErrorMessage = "Message content cannot exceed 2000 characters")]
        public string Content { get; set; } = null!;
        
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? EditedAt { get; set; }
        
        public bool IsDeleted { get; set; } = false;
        
        // Navigation properties
        public Project Project { get; set; } = null!;
        public User Sender { get; set; } = null!;
    }
}
