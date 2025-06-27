using System.ComponentModel.DataAnnotations;

namespace DTOs
{
  public class UpdateProfileDto
  {
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    [StringLength(500, ErrorMessage = "Summary cannot exceed 500 characters")]
    public string? Summary { get; set; }

    [OptionalUrl(ErrorMessage = "Invalid LinkedIn URL format")]
    public string? LinkedinUrl { get; set; }

    [OptionalUrl(ErrorMessage = "Invalid GitHub URL format")]
    public string? GithubUrl { get; set; }

    [OptionalUrl(ErrorMessage = "Invalid website URL format")]
    public string? WebsiteUrl { get; set; }
  }

  // Custom validation attribute for optional URLs that allows empty strings
  public class OptionalUrlAttribute : ValidationAttribute
  {
    public override bool IsValid(object? value)
    {
      if (value == null || (value is string str && string.IsNullOrWhiteSpace(str)))
      {
        return true; // Null or empty strings are valid
      }

      // Use the built-in URL validator for non-empty strings
      var urlAttribute = new UrlAttribute();
      return urlAttribute.IsValid(value);
    }
  }
}
