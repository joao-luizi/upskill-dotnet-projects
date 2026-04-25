using CarStandBusiness.DTO;
using CarStandBusiness.Models;
using DalPro;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStandBusiness.Repositories
{
    public  class MarcasRepository : IMarcasRepository
    {
        private readonly IConfiguration _configuration;
        public MarcasRepository(IConfiguration config)
        {
            _configuration = config;
        }

        private string GetConnectionsString(string tag)
        {
            var connectionString = _configuration.GetConnectionString(tag) ?? throw new Exception($"Connection string for tag: {tag} not found!");
            return connectionString;
        }

        public List<Marcas> GetAll(string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            SELECT [IDMarca] ,[Nome] 
            FROM [Marcas]";

            return DALPro.Query<Marcas>(sql);
        }

        public Marcas GetById(long id, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            SELECT [IDMarca], [Nome]
            FROM [Marcas]
            WHERE [IDMarca] = @Id";

            var parameters = new Dictionary<string, object>
                {
                    { "Id", id }
                };

            return DALPro.Query<Marcas>(sql, parameters).FirstOrDefault();
        }

        public Marcas GetByNome(string Nome, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            SELECT [IDMarca], [Nome]
            FROM [Marcas]
            WHERE [Nome] = @Nome";

            var parameters = new Dictionary<string, object>
                {
                    { "Nome", Nome }
                };

            return DALPro.Query<Marcas>(sql, parameters).FirstOrDefault();
        }

        public int Insert(MarcasDTO ins, string tag, SqlTransaction? trans = null)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            INSERT INTO [Marcas] ([Nome])
            VALUES (@Nome);
            SELECT SCOPE_IDENTITY();";

            var parameters = new Dictionary<string, object>
                {
                    { "Nome", ins.Nome },

                };

            return Convert.ToInt32(DALPro.ExecuteScalar(sql, parameters, trans));
        }

        public void Update(MarcasDTO ins, string tag, SqlTransaction? trans = null)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
                UPDATE Marcas
                SET Nome = @Nome,
                WHERE IDMarca = @IDMarca";

            var parameters = new Dictionary<string, object>
            {
                { "IDMarca", ins.IDMarca },
                { "Nome", ins.Nome }
            };

            DALPro.Execute(sql, parameters, trans);
        }

        public void Delete(long id, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = "DELETE FROM [Marcas] WHERE [IDMarca] = @Id";

            var parameters = new Dictionary<string, object>
            {
                { "Id", id }
            };

            DALPro.Execute(sql, parameters);
        }

        public void DeleteAll(string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = "DELETE FROM [Marcas]";


            DALPro.Execute(sql);
        }
    }
}
