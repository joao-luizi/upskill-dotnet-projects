using CarStandBusiness.DTO;
using CarStandBusiness.Models;
using DalPro;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace CarStandBusiness.Repositories
{
    public  class ModelosRepository : IModelosRepository
    {
        private readonly IConfiguration _configuration;
        public ModelosRepository(IConfiguration config)
        {
            _configuration = config;
        }

        private string GetConnectionsString(string tag)
        {
            var connectionString = _configuration.GetConnectionString(tag) ?? throw new Exception($"Connection string for tag: {tag} not found!");
            return connectionString;
        }

        public List<Modelos> GetAll(string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            [IDModelos] ,[Modelo]
            FROM [Modelos]";

            return DALPro.Query<Modelos>(sql);
        }

        public Modelos GetById(long id, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            SELECT [IDModelos], [Modelo]
            FROM [Modelos]
            WHERE [IDModelos] = @Id";

            var parameters = new Dictionary<string, object>
                {
                    { "Id", id }
                };

            return DALPro.Query<Modelos>(sql, parameters).FirstOrDefault();
        }

        public Modelos GetByNome(string Modelo, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            SELECT [IDModelos], [Modelo]
            FROM [Modelos]
            WHERE [Modelo] = @Modelo";

            var parameters = new Dictionary<string, object>
                {
                    { "Modelo", Modelo }
                };

            return DALPro.Query<Modelos>(sql, parameters).FirstOrDefault();
        }

        public int Insert(ModelosDTO ins, string tag, SqlTransaction? trans = null)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            INSERT INTO [Modelos] ([Modelo])
            VALUES (@Modelo);
            SELECT SCOPE_IDENTITY();";

            var parameters = new Dictionary<string, object>
                {
                    { "Modelo", ins.Modelo },
                };

            return Convert.ToInt32(DALPro.ExecuteScalar(sql, parameters, trans));
        }

        public void Update(ModelosDTO ins, string tag, SqlTransaction? trans = null)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
                UPDATE Modelos
                SET Modelo = @Modelo,
                WHERE IDModelos = @IDModelos";

            var parameters = new Dictionary<string, object>
            {
                { "IDModelos", ins.IDModelos },
                { "Modelo", ins.Modelo }
            };

            DALPro.Execute(sql, parameters, trans);
        }

        public void Delete(long id, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = "DELETE FROM [Modelos] WHERE [IDModelos] = @Id";

            var parameters = new Dictionary<string, object>
            {
                { "Id", id }
            };

            DALPro.Execute(sql, parameters);
        }

        public void DeleteAll(string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = "DELETE FROM [Modelos]";
            DALPro.Execute(sql);
        }
    }
}
