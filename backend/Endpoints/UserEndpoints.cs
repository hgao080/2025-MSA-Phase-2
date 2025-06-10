using Backend.Data;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/users", (AppDbContext db) => db.Users.ToList());
        // Add more user endpoints here
    }
}