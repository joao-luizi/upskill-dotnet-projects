
using CarStandBusiness.DTO;
using CarStandBusiness.Repositories;
using CarStandWebAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Security.Claims;
using System.Text;

namespace CarStandWebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
            .WriteTo.Console()
            .WriteTo.File("logs/log.txt",
                rollingInterval: RollingInterval.Day)
            .CreateLogger();

            var builder = WebApplication.CreateBuilder(args);
            builder.Host.UseSerilog();

            // Add services to the container.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("cors",
                    policy =>
                    {
                        policy
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });
           
            string? secret_key = builder.Configuration["App:JWT:SECRET_KEY"] ?? throw new Exception("secret_key string não definida");
          
            var key = Encoding.UTF8.GetBytes(secret_key);
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "CarStand",
                    ValidAudience = "CarStand",
                    IssuerSigningKey = new SymmetricSecurityKey(key),

                    RoleClaimType = ClaimTypes.Role,
                    NameClaimType = ClaimTypes.Name
                };
            });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "jwtToken",
                    Version = "v1"
                });

                options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Description = "Enter: Bearer {your JWT token}",
                    Name = "Authorization",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    Scheme = "bearer"
                });

                options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
                {
                    {
                        new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                        {
                            Reference = new Microsoft.OpenApi.Models.OpenApiReference
                            {
                                Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });
            builder.Services.AddAuthorization();
            builder.Services.AddScoped<AuthService>();
            builder.Services.AddScoped<IDatabaseRepository, DatabaseRepository>();
            builder.Services.AddScoped<IDatabaseService, DatabaseService>();
            builder.Services.AddScoped<IInspecoesRepository, InspecoesRepository>();
            builder.Services.AddScoped<IMarcasRepository, MarcasRepository>();
            builder.Services.AddScoped<IModelosRepository, ModelosRepository>();
            builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IVehicleService, VehicleService>();
            builder.Services.AddScoped<ILoginService, LoginService>();

            var app = builder.Build();

            app.UseCors("cors");
            #if DEV
            app.UseSwagger();
            app.UseSwaggerUI();
            #endif
            app.UseAuthentication();
            app.UseAuthorization();



            // Configure the HTTP request pipeline.

            app.MapGet("/", () => "Carstand Minimal API");

            app.MapGet("/filterMarca", (ILogger<VehicleService> Logger,  IVehicleService service) => {
                return service.GetUniqueMarcas(); 
            });

            app.MapGet("/filterModelos", (ILogger<VehicleService> Logger, IVehicleService service) => {
                return service.GetUniqueModelos();
            });

            app.MapGet("/filterYears", (ILogger<VehicleService> Logger, IVehicleService service) => {
                return service.GetUniqueYears();
            });

            app.MapGet("/veiculos/{id}", (long id, ILogger<VehicleService> Logger, IVehicleService service) => {
                return service.GetById(id, "CarStand");
            });

            app.MapDelete("/veiculos/{id}", (long id, ILogger<VehicleService> logger, IVehicleService service) =>
            {
                service.Delete(id, "CarStand");
            }).RequireAuthorization(policy => policy.RequireRole("admin"));


            app.MapGet("/me", (ClaimsPrincipal user) =>
            {
                return Results.Ok(new
                {
                    username = user.Identity?.Name,
                    role = user.FindFirst(ClaimTypes.Role)?.Value
                });
            }).RequireAuthorization();

            #if MockLogin
            app.MapPost("/login", (LoginDTO login, AuthService auth, ILogger<Program> logger) =>
            {
                if (login.UserName == "admin" && login.Password == "123")
                {
                    var token = auth.GenerateToken(login.UserName, "admin");
                    logger.LogInformation($"Mock Endpoint /login token: {token}");

                    return Results.Ok(new { token });
                }

                return Results.Unauthorized();

            });
#else
            app.MapPost("/login", (LoginDTO login, ILoginService service, ILogger<Program> logger) =>
            {
                var token = service.GetToken(login, "CarStand");
                if (token == null)
                    return Results.Unauthorized();
                logger.LogInformation($"Endpoint /login token: {token}");
                return Results.Ok(new { token });
            });
#endif
            app.MapPost("/search", (FilterDTO filter, IVehicleService service, ILogger<Program> logger) =>
            {
                return service.SearchResult(filter, "CarStand");

            });

            app.MapPost("/veiculos", (VeiculoUpsertDTO upsertDTO, IVehicleService service, ILogger<Program> logger) =>
            {
                return service.Upsert(upsertDTO, "CarStand");

            }).RequireAuthorization();

            app.MapDelete("/veiculos/all", (ILogger<VehicleService> logger, IVehicleService VehicleService, 
                ILoginService LoginService) =>
            {
                VehicleService.DeleteAll("CarStand");
            }).RequireAuthorization(policy => policy.RequireRole("admin"));

            app.MapPost("/veiculos/rebuild", (ILogger<Program> logger, IDatabaseService service) =>
            {
                service.SeedData("CarStand");
            }).RequireAuthorization(policy => policy.RequireRole("admin"));
            app.Run();
        }
    }
}
