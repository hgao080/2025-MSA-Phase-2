using Models;
using System.ComponentModel.DataAnnotations;

namespace DTOs
{
    /// <summary>
    /// DTO for creating a new message
    /// </summary>
    public class CreateMessageDto
    {
        [Required(ErrorMessage = "Message content is required")]
        [StringLength(2000, ErrorMessage = "Message content cannot exceed 2000 characters")]
        public string Content { get; set; } = null!;
    }
    
    /// <summary>
    /// DTO for returning message data
    /// </summary>
    public class MessageDto
    {
        public long Id { get; set; }
        public int ProjectId { get; set; }
        public string SenderId { get; set; } = null!;
        public string SenderName { get; set; } = null!;
        public string SenderEmail { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime SentAt { get; set; }
        public DateTime? EditedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
    
    /// <summary>
    /// DTO for editing existing messages
    /// </summary>
    public class EditMessageDto
    {
        [Required(ErrorMessage = "Message content is required")]
        [StringLength(2000, ErrorMessage = "Message content cannot exceed 2000 characters")]
        public string Content { get; set; } = null!;
    }
    
    /// <summary>
    /// DTO for real-time message broadcasting
    /// </summary>
    public class MessageBroadcastDto
    {
        public long MessageId { get; set; }
        public int ProjectId { get; set; }
        public string SenderId { get; set; } = null!;
        public string SenderName { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime SentAt { get; set; }
    }
}
