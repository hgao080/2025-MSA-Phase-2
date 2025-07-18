using backend.Contracts;
using Microsoft.EntityFrameworkCore;
using Models;

namespace backend.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly AppDbContext _context;

        public MessageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Message> AddMessageAsync(Message message)
        {
            _context.Message.Add(message);
            await _context.SaveChangesAsync();
            
            // Return the message with sender info populated
            return await GetMessageByIdAsync(message.Id) ?? message;
        }

        public async Task<Message?> GetMessageByIdAsync(long messageId)
        {
            return await _context.Message
                .Include(m => m.Sender)
                .Include(m => m.Project)
                .FirstOrDefaultAsync(m => m.Id == messageId && !m.IsDeleted);
        }

        public async Task<IEnumerable<Message>> GetProjectMessagesAsync(int projectId, int page = 1, int pageSize = 50)
        {
            return await _context.Message
                .Include(m => m.Sender)
                .Where(m => m.ProjectId == projectId && !m.IsDeleted)
                .OrderByDescending(m => m.SentAt) // Latest messages first
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<Message> UpdateMessageAsync(Message message)
        {
            message.EditedAt = DateTime.UtcNow;
            _context.Message.Update(message);
            await _context.SaveChangesAsync();
            return message;
        }

        public async Task<bool> DeleteMessageAsync(long messageId, string userId)
        {
            var message = await _context.Message
                .FirstOrDefaultAsync(m => m.Id == messageId && m.SenderId == userId);
            
            if (message == null) return false;

            // Soft delete - mark as deleted but keep in database
            message.IsDeleted = true;
            message.EditedAt = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UserHasProjectAccessAsync(string userId, int projectId)
        {
            // Check if user is project author
            var isAuthor = await _context.Project
                .AnyAsync(p => p.Id == projectId && p.AuthorId == userId);

            if (isAuthor) return true;

            // Check if user has approved application for this project
            var hasApprovedApplication = await _context.Application
                .AnyAsync(a => a.ProjectId == projectId && 
                          a.ApplicantId == userId && 
                          a.Status == ApplicationStatus.Approved);

            return hasApprovedApplication;
        }

        public async Task<int> GetMessageCountForProjectAsync(int projectId)
        {
            return await _context.Message
                .CountAsync(m => m.ProjectId == projectId && !m.IsDeleted);
        }
    }
}
