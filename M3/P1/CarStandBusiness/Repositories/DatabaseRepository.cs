using DalPro;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStandBusiness.Repositories
{
    public class DatabaseRepository : IDatabaseRepository
    {
        private readonly IConfiguration _configuration;
        public DatabaseRepository(IConfiguration config)
        {
            _configuration = config;
        }

        private string GetConnectionsString(string tag)
        {
            var connectionString = _configuration.GetConnectionString(tag) ?? throw new Exception($"Connection string for tag: {tag} not found!");
            return connectionString;
        }

        public void SeedData(string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            DALPro.ExecuteSP("SeedDatabase");
        }
    }
}
