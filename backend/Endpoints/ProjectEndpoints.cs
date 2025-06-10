using Backend.Data;

public static class ProjectEndpoints
{
    public static void MapProjectEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/projects", (AppDbContext db) => db.Projects.ToList());
        // Add more project endpoints here
    }
}