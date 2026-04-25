using Azure;
using CarStandBusiness.DTO;
using CarStandBusiness.Models;
using CarStandBusiness.Repositories;
using Microsoft.Data.SqlClient;

namespace CarStandWebAPI.Services
{
    public class LoginService :ILoginService
    {

        private readonly IUserRepository _repo;
        private readonly ILogger<LoginService> _logger;
        private readonly AuthService _auth;

        public LoginService(ILogger<LoginService> logger, IUserRepository repo, AuthService auth)
        {
            _repo = repo;
            _logger = logger;
            _auth = auth;
        }

        public string? GetToken(LoginDTO loginDTO, string tag)
        {
            try
            {
                
            var user = _repo.GetByLogin(loginDTO.UserName, loginDTO.Password, tag);

            if (user == null)
                return null;

            return _auth.GenerateToken(user.UserName, user.Role);

            }
            catch (SqlException ex)
            {
                if (ex.Number == 4060 || ex.Number == 18456)
                {
                    _logger.LogError("Database issue detected. Ensure the database is created and accessible. Use scripts in /Database folder.");
                    throw new Exception("Database not available. Please initialize it using the provided scripts.", ex);
                }

                throw;
            }
        }

        public void DeleteAll(string tag)
        {
            try
            {
                _repo.DeleteAll(1, tag);
            }
            catch (SqlException ex)
            {
                if (ex.Number == 4060 || ex.Number == 18456)
                {
                    _logger.LogError("Database issue detected. Ensure the database is created and accessible. Use scripts in /Database folder.");
                    throw new Exception("Database not available. Please initialize it using the provided scripts.", ex);
                }

                throw;
            }
        }

    }
}
