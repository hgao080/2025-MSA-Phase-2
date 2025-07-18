using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using backend.Contracts;
using backend.Hubs;
using DTOs;
using Models;

namespace backend.Controllers
{
    /// <summary>
    /// REST API for message operations
    /// SignalR handles real-time messaging, this handles CRUD operations
    /// </summary>
    [Route("api/projects/{projectId}/messages")]
    [ApiController]
    [Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly UserManager<User> _userManager;
        private readonly IHubContext<ProjectMessagingHub> _hubContext;

        public MessagesController(
            IMessageRepository messageRepository, 
            UserManager<User> userManager,
            IHubContext<ProjectMessagingHub> hubContext)
        {
            _messageRepository = messageRepository;
            _userManager = userManager;
            _hubContext = hubContext;
        }

        /// <summary>
        /// Get paginated messages for a project
        /// GET: api/projects/5/messages?page=1&pageSize=50
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetProjectMessages(
            int projectId, 
            [FromQuery] int page = 1, 
            [FromQuery] int pageSize = 50)
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            // Verify user has access to this project
            var hasAccess = await _messageRepository.UserHasProjectAccessAsync(userId, projectId);
            if (!hasAccess)
            {
                return Forbid("You don't have access to this project's messages");
            }

            // Validate pagination parameters
            if (page < 1) page = 1;
            if (pageSize < 1 || pageSize > 100) pageSize = 50;

            var messages = await _messageRepository.GetProjectMessagesAsync(projectId, page, pageSize);
            
            var messageDtos = messages.Select(m => new MessageDto
            {
                Id = m.Id,
                ProjectId = m.ProjectId,
                SenderId = m.SenderId,
                SenderName = $"{m.Sender.FirstName} {m.Sender.LastName}",
                SenderEmail = m.Sender.Email ?? "",
                Content = m.Content,
                SentAt = m.SentAt,
                EditedAt = m.EditedAt,
                IsDeleted = m.IsDeleted
            });

            return Ok(messageDtos);
        }

        /// <summary>
        /// Get a specific message
        /// GET: api/projects/5/messages/123
        /// </summary>
        [HttpGet("{messageId}")]
        public async Task<ActionResult<MessageDto>> GetMessage(int projectId, long messageId)
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var hasAccess = await _messageRepository.UserHasProjectAccessAsync(userId, projectId);
            if (!hasAccess)
            {
                return Forbid("You don't have access to this project's messages");
            }

            var message = await _messageRepository.GetMessageByIdAsync(messageId);
            if (message == null || message.ProjectId != projectId)
            {
                return NotFound();
            }

            var messageDto = new MessageDto
            {
                Id = message.Id,
                ProjectId = message.ProjectId,
                SenderId = message.SenderId,
                SenderName = $"{message.Sender.FirstName} {message.Sender.LastName}",
                SenderEmail = message.Sender.Email ?? "",
                Content = message.Content,
                SentAt = message.SentAt,
                EditedAt = message.EditedAt,
                IsDeleted = message.IsDeleted
            };

            return Ok(messageDto);
        }

        /// <summary>
        /// Send a message (also broadcasts via SignalR)
        /// POST: api/projects/5/messages
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<MessageDto>> SendMessage(int projectId, CreateMessageDto createMessageDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var hasAccess = await _messageRepository.UserHasProjectAccessAsync(userId, projectId);
            if (!hasAccess)
            {
                return Forbid("You don't have access to send messages to this project");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized();
            }

            // Create message
            var message = new Message
            {
                ProjectId = projectId,
                SenderId = userId,
                Content = createMessageDto.Content.Trim()
            };

            var savedMessage = await _messageRepository.AddMessageAsync(message);

            // Create response DTO
            var messageDto = new MessageDto
            {
                Id = savedMessage.Id,
                ProjectId = savedMessage.ProjectId,
                SenderId = savedMessage.SenderId,
                SenderName = $"{user.FirstName} {user.LastName}",
                SenderEmail = user.Email ?? "",
                Content = savedMessage.Content,
                SentAt = savedMessage.SentAt,
                EditedAt = savedMessage.EditedAt,
                IsDeleted = savedMessage.IsDeleted
            };

            // Broadcast to SignalR clients
            var broadcastMessage = new MessageBroadcastDto
            {
                MessageId = savedMessage.Id,
                ProjectId = projectId,
                SenderId = userId,
                SenderName = $"{user.FirstName} {user.LastName}",
                Content = savedMessage.Content,
                SentAt = savedMessage.SentAt
            };

            await _hubContext.Clients.Group($"Project_{projectId}")
                .SendAsync("ReceiveMessage", broadcastMessage);

            return CreatedAtAction(
                nameof(GetMessage), 
                new { projectId = projectId, messageId = savedMessage.Id }, 
                messageDto);
        }

        /// <summary>
        /// Edit an existing message
        /// PUT: api/projects/5/messages/123
        /// </summary>
        [HttpPut("{messageId}")]
        public async Task<ActionResult<MessageDto>> EditMessage(
            int projectId, 
            long messageId, 
            EditMessageDto editMessageDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var message = await _messageRepository.GetMessageByIdAsync(messageId);
            if (message == null || message.ProjectId != projectId)
            {
                return NotFound();
            }

            // Only message sender can edit their own messages
            if (message.SenderId != userId)
            {
                return Forbid("You can only edit your own messages");
            }

            // Update message content
            message.Content = editMessageDto.Content.Trim();
            var updatedMessage = await _messageRepository.UpdateMessageAsync(message);

            // Broadcast edit to SignalR clients
            await _hubContext.Clients.Group($"Project_{projectId}")
                .SendAsync("MessageEdited", new
                {
                    MessageId = messageId,
                    NewContent = updatedMessage.Content,
                    EditedAt = updatedMessage.EditedAt
                });

            var messageDto = new MessageDto
            {
                Id = updatedMessage.Id,
                ProjectId = updatedMessage.ProjectId,
                SenderId = updatedMessage.SenderId,
                SenderName = $"{updatedMessage.Sender.FirstName} {updatedMessage.Sender.LastName}",
                SenderEmail = updatedMessage.Sender.Email ?? "",
                Content = updatedMessage.Content,
                SentAt = updatedMessage.SentAt,
                EditedAt = updatedMessage.EditedAt,
                IsDeleted = updatedMessage.IsDeleted
            };

            return Ok(messageDto);
        }

        /// <summary>
        /// Delete a message (soft delete)
        /// DELETE: api/projects/5/messages/123
        /// </summary>
        [HttpDelete("{messageId}")]
        public async Task<IActionResult> DeleteMessage(int projectId, long messageId)
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var success = await _messageRepository.DeleteMessageAsync(messageId, userId);
            if (!success)
            {
                return NotFound("Message not found or you don't have permission to delete it");
            }

            // Broadcast deletion to SignalR clients
            await _hubContext.Clients.Group($"Project_{projectId}")
                .SendAsync("MessageDeleted", new { MessageId = messageId });

            return NoContent();
        }

        /// <summary>
        /// Get message statistics for a project
        /// GET: api/projects/5/messages/stats
        /// </summary>
        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetMessageStats(int projectId)
        {
            var userId = _userManager.GetUserId(User);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var hasAccess = await _messageRepository.UserHasProjectAccessAsync(userId, projectId);
            if (!hasAccess)
            {
                return Forbid("You don't have access to this project");
            }

            var messageCount = await _messageRepository.GetMessageCountForProjectAsync(projectId);

            return Ok(new
            {
                ProjectId = projectId,
                TotalMessages = messageCount,
                RetrievedAt = DateTime.UtcNow
            });
        }
    }
}
