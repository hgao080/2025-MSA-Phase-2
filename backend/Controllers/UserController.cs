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

      // Convert empty strings to null and only update if not null, otherwise keep existing value
      user.FirstName = string.IsNullOrWhiteSpace(updateProfileDto.FirstName) ? user.FirstName : updateProfileDto.FirstName;
      user.LastName = string.IsNullOrWhiteSpace(updateProfileDto.LastName) ? user.LastName : updateProfileDto.LastName;
      user.Summary = string.IsNullOrWhiteSpace(updateProfileDto.Summary) ? null : updateProfileDto.Summary;
      user.LinkedinUrl = string.IsNullOrWhiteSpace(updateProfileDto.LinkedinUrl) ? null : updateProfileDto.LinkedinUrl;
      user.GithubUrl = string.IsNullOrWhiteSpace(updateProfileDto.GithubUrl) ? null : updateProfileDto.GithubUrl;
      user.WebsiteUrl = string.IsNullOrWhiteSpace(updateProfileDto.WebsiteUrl) ? null : updateProfileDto.WebsiteUrl;

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