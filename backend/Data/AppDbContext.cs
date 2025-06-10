using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Models.Student> Student { get; set; } = default!;
    public DbSet<Models.Project> Project { get; set; } = default!;
}
