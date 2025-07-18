using Models;

namespace backend.Contracts
{
    public interface IMessageRepository
    {
        Task<Message> AddMessageAsync(Message message);
        Task<Message?> GetMessageByIdAsync(long messageId);
        Task<IEnumerable<Message>> GetProjectMessagesAsync(int projectId, int page = 1, int pageSize = 50);
        Task<Message> UpdateMessageAsync(Message message);
        Task<bool> DeleteMessageAsync(long messageId, string userId);
        Task<bool> UserHasProjectAccessAsync(string userId, int projectId);
        Task<int> GetMessageCountForProjectAsync(int projectId);
    }
}
