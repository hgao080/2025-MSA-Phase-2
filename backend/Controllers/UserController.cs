using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.ComponentModel.DataAnnotations;
using DTOs;

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

    [HttpPut("profile")]
    public async Task<ActionResult<UserResponse>> UpdateProfile(UpdateProfileDto updateProfileDto)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var user = await _userManager.GetUserAsync(User);
      if (user == null)
      {
        return NotFound();
      }

      // Update optional profile fields
      user.Summary = updateProfileDto.Summary;
      user.LinkedinUrl = updateProfileDto.LinkedinUrl;
      user.GithubUrl = updateProfileDto.GithubUrl;
      user.WebsiteUrl = updateProfileDto.WebsiteUrl;

      var result = await _userManager.UpdateAsync(user);

      if (result.Succeeded)
      {
        return Ok(new UserResponse
        {
          Id = user.Id,
          Email = user.Email!,
          FirstName = user.FirstName,
          LastName = user.LastName,
          Summary = user.Summary,
          LinkedinUrl = user.LinkedinUrl,
          GithubUrl = user.GithubUrl,
          WebsiteUrl = user.WebsiteUrl
        });
      }

      return BadRequest(result.Errors);
    }
  }

}