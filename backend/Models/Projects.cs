namespace Backend.Models
{
  public class Project
  {
    public long Id { get; set; }
    public required string Name { get; set; }
    public required String description { get; set; }
    public long UserId { get; set; }
    public required User User { get; set; }
  }
}