using CarStandBusiness.DTO;
using CarStandBusiness.Models;
using DalPro;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStandBusiness.Repositories
{
    public  class InspecoesRepository : IInspecoesRepository
    {
        private readonly IConfiguration _configuration;
        public InspecoesRepository(IConfiguration config)
        {
            _configuration = config;
        }

        private string GetConnectionsString(string tag)
        {
            var connectionString = _configuration.GetConnectionString(tag) ?? throw new Exception($"Connection string for tag: {tag} not found!");
            return connectionString;
        }

        public List<Inspecoes> GetAll(long VeiculoID, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            SELECT InspecoesID, VeiculoID, DataDeInspecao, Resultado
            FROM Inspecoes
            WHERE VeiculoID = @VeiculoID
            ORDER BY DataDeInspecao DESC";

                var parameters = new Dictionary<string, object>
                {
                    { "VeiculoID", VeiculoID }
                };

                return DALPro.Query<Inspecoes>(sql, parameters);
        }

        public Inspecoes GetById(long id, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            SELECT InspecoesID, VeiculoID, DataDeInspecao, Resultado
            FROM Inspecoes
            WHERE InspecoesID = @Id";

                var parameters = new Dictionary<string, object>
                {
                    { "Id", id }
                };

                return DALPro.Query<Inspecoes>(sql, parameters).FirstOrDefault();
        }

        public long Insert(Inspecoes ins, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            INSERT INTO Inspecoes (VeiculoID, DataDeInspecao, Resultado)
            VALUES (@VeiculoID, @DataDeInspecao, @Resultado);
            SELECT SCOPE_IDENTITY();";

                var parameters = new Dictionary<string, object>
                {
                    { "VeiculoID", ins.VeiculoID },
                    { "DataDeInspecao", ins.DataDeInspecao },
                    { "Resultado", ins.Resultado }
                };

                return Convert.ToInt64(DALPro.ExecuteScalar(sql, parameters));
        }

        public void Update(Inspecoes ins, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
                UPDATE Inspecoes
                SET VeiculoID = @VeiculoID,
                    DataDeInspecao = @DataDeInspecao,
                    Resultado = @Resultado
                WHERE InspecoesID = @InspecoesID";

                    var parameters = new Dictionary<string, object>
            {
                { "InspecoesID", ins.InspecoesID },
                { "VeiculoID", ins.VeiculoID },
                { "DataDeInspecao", ins.DataDeInspecao },
                { "Resultado", ins.Resultado }
            };

            DALPro.Execute(sql, parameters);
        }

        public void Delete(long id, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = "DELETE FROM Inspecoes WHERE InspecoesID = @Id";

            var parameters = new Dictionary<string, object>
            {
                { "Id", id }
            };

            DALPro.Execute(sql, parameters);
        }

        public void DeleteAll(string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = "DELETE FROM Inspecoes";

            
            DALPro.Execute(sql);
        }

        public void DeleteByVehicleId(long id, string tag)
        {
            string sql = @"
            DELETE FROM Inspecoes WHERE VeiculoID = @VeiculoID; 
            ";

            var parameters = new Dictionary<string, object>
            {
                { "@VeiculoID", id }
            };

            DALPro.Execute(sql, parameters);
        }
    }
}
