using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using backend.Contracts;
using backend.Repositories;
using backend.Hubs;
using Models;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Text;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env file
Env.Load();

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

// Configure DbContext with proper Azure configuration
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<AppDbContext>(options =>
       {
           var connectionString = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
           if (string.IsNullOrEmpty(connectionString))
           {
               throw new InvalidOperationException("Connection string 'AZURE_SQL_CONNECTIONSTRING' not found.");
           }
           options.UseSqlServer(connectionString, sqlOptions =>
           {
               sqlOptions.EnableRetryOnFailure(
                   maxRetryCount: 3,
                   maxRetryDelay: TimeSpan.FromSeconds(30),
                   errorNumbersToAdd: null);
           });
       });
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo 
        { 
            Title = "MSA Phase 2 Backend API", 
            Version = "v1",
            Description = "ASP.NET Core Web API for MSA Phase 2 Project Management System"
        });

        // Add JWT Authentication to Swagger
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header. Just enter your token below (without 'Bearer' prefix).",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
            }
        });
    });
}
else
{
    // Azure production configuration
    builder.Services.AddDbContext<AppDbContext>(options =>
    {
        var connectionString = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException("Connection string 'AZURE_SQL_CONNECTIONSTRING' not found.");
        }
        options.UseSqlServer(connectionString, sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 3,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null);
        });
    });
}

builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();

// Add JWT service
builder.Services.AddScoped<backend.Services.IJwtService, backend.Services.JwtService>();

// Add SignalR
builder.Services.AddSignalR();

// JWT Configuration - Get secret from environment or configuration
var jwtKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY") 
    ?? builder.Configuration["JWT:SecretKey"]
    ?? throw new InvalidOperationException("JWT Secret Key not found. Set JWT_SECRET_KEY environment variable or configure in user secrets.");

var jwtIssuer = builder.Configuration["JWT:Issuer"] ?? "MSAPhase2Backend";
var jwtAudience = builder.Configuration["JWT:Audience"] ?? "MSAPhase2Frontend";

// Validate secret key length for security
if (jwtKey.Length < 32)
{
    throw new InvalidOperationException("JWT Secret Key must be at least 32 characters long for security.");
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ClockSkew = TimeSpan.Zero
    };
    
    // Allow JWT token in SignalR
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;
            
            // If the request is for our SignalR hub and has an access token
            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/api/messageHub"))
            {
                context.Token = accessToken;
            }
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddIdentityCore<User>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

// Remove SignInManager since we're using JWT
// .AddSignInManager()

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowMySpecificOrigins",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://cobweb-msa-2025.vercel.app")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
                  // Removed .AllowCredentials() since we're using JWT tokens
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline with Azure-optimized error handling
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MSA Phase 2 Backend API v1");
        c.RoutePrefix = "swagger"; // Swagger UI at /swagger
        c.DocumentTitle = "MSA Phase 2 API Documentation";
        c.DisplayRequestDuration();
        c.EnableDeepLinking();
        c.EnableFilter();
        c.ShowExtensions();
        c.EnableValidator();
    });
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowMySpecificOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Map SignalR Hub under /api for consistency
app.MapHub<ProjectMessagingHub>("/api/messageHub");

app.Run();