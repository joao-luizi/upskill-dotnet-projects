using DalPro;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CarStandWebAPI.Services
{
    public class AuthService
    {
        private readonly IConfiguration _config;
        private readonly ILogger<AuthService> _logger;
        public AuthService(ILogger<AuthService> logger, IConfiguration config)
        {
            _logger = logger;
            _config = config;
        }
        public string GenerateToken(string username, string userrole)
        {

            try
            {

                var secret_key = _config["App:JWT:SECRET_KEY"]
                ?? throw new InvalidOperationException("JWT secret not configured");
                var key = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(secret_key));

                var creds = new SigningCredentials(
                    key,
                    SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, userrole)
                };

                var token = new JwtSecurityToken(
                    issuer: "CarStand",
                    audience: "CarStand",
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(2),
                    signingCredentials: creds);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating JWT");
                throw;
            }
        }
    }
}
