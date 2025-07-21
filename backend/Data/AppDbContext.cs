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
    public DbSet<ProjectRole> ProjectRole { get; set; } = default!;
    public DbSet<Message> Message { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Configure Project-User relationship
        builder.Entity<Project>()
            .HasOne(p => p.Author)
            .WithMany(u => u.CreatedProjects)
            .HasForeignKey(p => p.AuthorId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure Project-ProjectRole relationship
        builder.Entity<ProjectRole>()
            .HasOne(pr => pr.Project)
            .WithMany(p => p.RolesNeeded)
            .HasForeignKey(pr => pr.ProjectId)
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

        // Configure Message-Project relationship
        builder.Entity<Message>()
            .HasOne(m => m.Project)
            .WithMany()
            .HasForeignKey(m => m.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure Message-User relationship
        builder.Entity<Message>()
            .HasOne(m => m.Sender)
            .WithMany()
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.NoAction); // Prevent cascade delete conflicts

        // Create index for efficient message queries
        builder.Entity<Message>()
            .HasIndex(m => new { m.ProjectId, m.SentAt })
            .HasDatabaseName("IX_Message_ProjectId_SentAt");

        // Seed data
        SeedData(builder);
    }

    private static void SeedData(ModelBuilder builder)
    {
        // Seed sample projects
        builder.Entity<Project>().HasData(
            new Project
            {
                Id = 1,
                Title = "E-Commerce Mobile App",
                Description = "Build a cross-platform mobile app for online shopping with React Native",
                Tag = ProjectTag.Fullstack,
                AuthorId = "2cc667eb-f438-40d3-9351-6198f624f188", // You'll need to create this user first
                TeamSize = 4,
                CurrentTeamSize = 1,
                EstimatedDuration = 12, // weeks
                CreatedAt = new DateTime(2025, 6, 16, 12, 0, 0, DateTimeKind.Utc) // Static date: June 16, 2025
            },
            new Project
            {
                Id = 2,
                Title = "AI-Powered Learning Platform",
                Description = "Develop an intelligent tutoring system using machine learning",
                Tag = ProjectTag.Backend,
                AuthorId = "582115f1-4f91-4b54-b91a-ac681e9a0b4c",
                TeamSize = 6,
                CurrentTeamSize = 2,
                EstimatedDuration = 16,
                CreatedAt = new DateTime(2025, 6, 26, 12, 0, 0, DateTimeKind.Utc) // Static date: June 26, 2025
            },
            new Project
            {
                Id = 3,
                Title = "IoT Smart Home System",
                Description = "Create a comprehensive smart home automation system",
                Tag = ProjectTag.Fullstack,
                AuthorId = "2cc667eb-f438-40d3-9351-6198f624f188",
                TeamSize = 3,
                CurrentTeamSize = 1,
                EstimatedDuration = 10,
                CreatedAt = new DateTime(2025, 7, 1, 12, 0, 0, DateTimeKind.Utc) // Static date: July 1, 2025
            }
        );

        // Seed project roles
        builder.Entity<ProjectRole>().HasData(
            // E-Commerce App roles
            new ProjectRole
            {
                Id = "role-1",
                ProjectId = 1,
                Title = "Frontend Developer",
                Description = "Develop user interface using React Native",
                SkillsRequired = "[\"React Native\", \"JavaScript\", \"UI/UX Design\"]",
                Filled = false,
                CreatedAt = new DateTime(2025, 6, 16, 12, 0, 0, DateTimeKind.Utc)
            },
            new ProjectRole
            {
                Id = "role-2",
                ProjectId = 1,
                Title = "Backend Developer",
                Description = "Build REST APIs and database architecture",
                SkillsRequired = "[\"Node.js\", \"Express\", \"MongoDB\", \"API Design\"]",
                Filled = false,
                CreatedAt = new DateTime(2025, 6, 16, 12, 0, 0, DateTimeKind.Utc)
            },
            new ProjectRole
            {
                Id = "role-3",
                ProjectId = 1,
                Title = "DevOps Engineer",
                Description = "Set up CI/CD pipelines and cloud infrastructure",
                SkillsRequired = "[\"AWS\", \"Docker\", \"CI/CD\", \"Kubernetes\"]",
                Filled = false,
                CreatedAt = new DateTime(2025, 6, 16, 12, 0, 0, DateTimeKind.Utc)
            },
            
            // AI Learning Platform roles
            new ProjectRole
            {
                Id = "role-4",
                ProjectId = 2,
                Title = "ML Engineer",
                Description = "Develop machine learning models for personalized learning",
                SkillsRequired = "[\"Python\", \"TensorFlow\", \"PyTorch\", \"Data Science\"]",
                Filled = false,
                CreatedAt = new DateTime(2025, 6, 26, 12, 0, 0, DateTimeKind.Utc)
            },
            new ProjectRole
            {
                Id = "role-5",
                ProjectId = 2,
                Title = "Full Stack Developer",
                Description = "Build web application with modern frameworks",
                SkillsRequired = "[\"React\", \"Node.js\", \"TypeScript\", \"PostgreSQL\"]",
                Filled = true,
                CreatedAt = new DateTime(2025, 6, 26, 12, 0, 0, DateTimeKind.Utc)
            },
            new ProjectRole
            {
                Id = "role-6",
                ProjectId = 2,
                Title = "Data Engineer",
                Description = "Design data pipelines and analytics infrastructure",
                SkillsRequired = "[\"Python\", \"Apache Spark\", \"SQL\", \"ETL\"]",
                Filled = false,
                CreatedAt = new DateTime(2025, 6, 26, 12, 0, 0, DateTimeKind.Utc)
            },
            
            // IoT Smart Home roles
            new ProjectRole
            {
                Id = "role-7",
                ProjectId = 3,
                Title = "Embedded Systems Developer",
                Description = "Program microcontrollers and sensors",
                SkillsRequired = "[\"C/C++\", \"Arduino\", \"Raspberry Pi\", \"Electronics\"]",
                Filled = false,
                CreatedAt = new DateTime(2025, 7, 1, 12, 0, 0, DateTimeKind.Utc)
            },
            new ProjectRole
            {
                Id = "role-8",
                ProjectId = 3,
                Title = "Mobile App Developer",
                Description = "Create mobile app for controlling smart home devices",
                SkillsRequired = "[\"Flutter\", \"Dart\", \"IoT Protocols\", \"Mobile UI\"]",
                Filled = false,
                CreatedAt = new DateTime(2025, 7, 1, 12, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}
