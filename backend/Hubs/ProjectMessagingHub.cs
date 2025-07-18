using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Models;
using DTOs;

namespace backend.Hubs
{
    /// <summary>
    /// SignalR Hub for real-time messaging within project teams
    /// Think of this as a "chat room manager" that handles live connections
    /// </summary>
    [Authorize] // Only authenticated users can connect
    public class ProjectMessagingHub : Hub
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;

        public ProjectMessagingHub(AppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        /// <summary>
        /// Called when a user connects to the hub
        /// We'll automatically join them to all their project groups
        /// </summary>
        public override async Task OnConnectedAsync()
        {
            var user = await _userManager.GetUserAsync(Context.User!);
            if (user != null)
            {
                // Find all projects where user is a team member (approved applications)
                var userProjects = await _context.Application
                    .Where(a => a.ApplicantId == user.Id && a.Status == ApplicationStatus.Approved)
                    .Select(a => a.ProjectId)
                    .ToListAsync();

                // Also include projects created by the user
                var createdProjects = await _context.Project
                    .Where(p => p.AuthorId == user.Id)
                    .Select(p => p.Id)
                    .ToListAsync();

                // Combine both lists
                var allProjectIds = userProjects.Concat(createdProjects).Distinct();

                // Join SignalR groups for each project
                foreach (var projectId in allProjectIds)
                {
                    await Groups.AddToGroupAsync(Context.ConnectionId, $"Project_{projectId}");
                }

                // Send a system message to let others know user is online (optional)
                foreach (var projectId in allProjectIds)
                {
                    await Clients.Group($"Project_{projectId}")
                        .SendAsync("UserConnected", new { UserId = user.Id, UserName = $"{user.FirstName} {user.LastName}" });
                }
            }

            await base.OnConnectedAsync();
        }

        /// <summary>
        /// Called when a user disconnects
        /// </summary>
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var user = await _userManager.GetUserAsync(Context.User!);
            if (user != null)
            {
                // Find all projects and notify about disconnection
                var userProjects = await _context.Application
                    .Where(a => a.ApplicantId == user.Id && a.Status == ApplicationStatus.Approved)
                    .Select(a => a.ProjectId)
                    .ToListAsync();

                var createdProjects = await _context.Project
                    .Where(p => p.AuthorId == user.Id)
                    .Select(p => p.Id)
                    .ToListAsync();

                var allProjectIds = userProjects.Concat(createdProjects).Distinct();

                foreach (var projectId in allProjectIds)
                {
                    await Clients.Group($"Project_{projectId}")
                        .SendAsync("UserDisconnected", new { UserId = user.Id, UserName = $"{user.FirstName} {user.LastName}" });
                }
            }

            await base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// Send a message to a specific project team
        /// This is called from the client-side JavaScript
        /// </summary>
        public async Task SendMessageToProject(int projectId, string content)
        {
            var user = await _userManager.GetUserAsync(Context.User!);
            if (user == null)
            {
                throw new HubException("User not authenticated");
            }

            // Verify user has access to this project
            var hasAccess = await VerifyProjectAccess(user.Id, projectId);
            if (!hasAccess)
            {
                throw new HubException("You don't have access to this project");
            }

            // Create and save the message to database
            var message = new Message
            {
                ProjectId = projectId,
                SenderId = user.Id,
                Content = content.Trim(),
                SentAt = DateTime.UtcNow
            };

            _context.Message.Add(message);
            await _context.SaveChangesAsync();

            // Create broadcast DTO
            var broadcastMessage = new MessageBroadcastDto
            {
                MessageId = message.Id,
                ProjectId = projectId,
                SenderId = user.Id,
                SenderName = $"{user.FirstName} {user.LastName}",
                Content = content,
                SentAt = message.SentAt
            };

            // Broadcast to all connected users in this project group
            await Clients.Group($"Project_{projectId}")
                .SendAsync("ReceiveMessage", broadcastMessage);
        }

        /// <summary>
        /// Manually join a project group (if user gets added to project while online)
        /// </summary>
        public async Task JoinProject(int projectId)
        {
            var user = await _userManager.GetUserAsync(Context.User!);
            if (user == null) return;

            var hasAccess = await VerifyProjectAccess(user.Id, projectId);
            if (hasAccess)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, $"Project_{projectId}");
                
                // Notify others that user joined
                await Clients.Group($"Project_{projectId}")
                    .SendAsync("UserJoinedProject", new { 
                        UserId = user.Id, 
                        UserName = $"{user.FirstName} {user.LastName}",
                        ProjectId = projectId 
                    });
            }
        }

        /// <summary>
        /// Leave a project group
        /// </summary>
        public async Task LeaveProject(int projectId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Project_{projectId}");
        }

        /// <summary>
        /// Helper method to verify if user has access to a project
        /// </summary>
        private async Task<bool> VerifyProjectAccess(string userId, int projectId)
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
    }
}
