using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace backend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly UserManager<User> _userManager;

    public UserController(UserManager<User> userManager)
    {
      _userManager = userManager;
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserResponse>> GetCurrentUser()
    {
      var user = await _userManager.GetUserAsync(User);
      if (user == null)
      {
        return NotFound();
      }

      return Ok(new UserResponse
      {
        Id = user.Id,
        Email = user.Email,
      });
    }
  }

  // Move to DTO for future
  public class UserResponse
  {
    public string Id { get; set; } = null!;
    public string Email { get; set; }
  }
}