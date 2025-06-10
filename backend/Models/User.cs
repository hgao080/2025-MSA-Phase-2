namespace Backend.Models
{
  public class User
  {
    public long Id { get; set; }
    public required String Email { get; set; }
    public required String Password { get; set; }
  }
}