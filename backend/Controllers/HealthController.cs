using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { 
                Status = "Healthy", 
                Timestamp = DateTime.UtcNow,
                Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Unknown"
            });
        }

        [HttpGet("db")]
        public async Task<IActionResult> CheckDatabase([FromServices] AppDbContext context)
        {
            try
            {
                // Simple database connectivity test
                var canConnect = await context.Database.CanConnectAsync();
                return Ok(new { 
                    DatabaseConnected = canConnect,
                    Timestamp = DateTime.UtcNow 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    Error = "Database connection failed",
                    Message = ex.Message,
                    Timestamp = DateTime.UtcNow 
                });
            }
        }
    }
}
