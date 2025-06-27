using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models;

public class AppDbContext : IdentityDbContext<User>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
    public DbSet<User> User { get; set; } = default!;
    public DbSet<Project> Project { get; set; } = default!;
    public DbSet<Application> Application { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Configure Project-User relationship
        builder.Entity<Project>()
            .HasOne(p => p.Author)
            .WithMany(u => u.CreatedProjects)
            .HasForeignKey(p => p.AuthorId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure Application-Project relationship
        builder.Entity<Application>()
            .HasOne(a => a.Project)
            .WithMany(p => p.Applications)
            .HasForeignKey(a => a.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure Application-User relationship
        builder.Entity<Application>()
            .HasOne(a => a.Applicant)
            .WithMany(u => u.Applications)
            .HasForeignKey(a => a.ApplicantId)
            .OnDelete(DeleteBehavior.NoAction); // Prevent cascade delete conflicts
    }
}
