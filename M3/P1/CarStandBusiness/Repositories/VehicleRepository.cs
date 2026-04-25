using CarStandBusiness.DTO;
using CarStandBusiness.Models;
using DalPro;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text;

namespace CarStandBusiness.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly IConfiguration _configuration;
        public VehicleRepository(IConfiguration config)
        {
            _configuration = config;
        }

        private string GetConnectionsString(string tag)
        {
            var connectionString = _configuration.GetConnectionString(tag) ?? throw new Exception($"Connection string for tag: {tag} not found!");
            return connectionString;
        }

        public Veiculos GetById(long id, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = @"
            SELECT VeiculoID, MarcaID, ModeloID, Ano, Vendido
            FROM Veiculos
            WHERE VeiculoID = @Id";

            var parameters = new Dictionary<string, object>
                {
                    { "Id", id }
                };

            return DALPro.Query<Veiculos>(sql, parameters).FirstOrDefault();
        }

        public List<Marcas> GetUniqueMarcas(string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);
            string sql = "SELECT * FROM Marcas WHERE Marcas.IDMarca IN (SELECT DISTINCT (IDMarca) FROM Veiculos)";

            return DALPro.Query<Marcas>(sql);
        }

        public List<Modelos> GetUniqueModelos(string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);
            string sql = "SELECT * FROM Modelos WHERE Modelos.IDModelos IN (SELECT DISTINCT (IDModelos) FROM Veiculos)";

            return DALPro.Query<Modelos>(sql);
        }

        public List<Veiculos> GetUniqueYears(string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);
            string sql = "SELECT DISTINCT Ano FROM Veiculos";

            return DALPro.Query<Veiculos>(sql);
        }

        private void AddInClause<T>(StringBuilder sql, Dictionary<string, object> parameters,
                    string columnName, string paramBaseName, List<T> values)
        {
            if (values == null || values.Count == 0)
                return;

            var paramNames = new List<string>();

            for (int i = 0; i < values.Count; i++)
            {
                string paramName = $"@{paramBaseName}{i}";
                paramNames.Add(paramName);
                parameters.Add(paramName, values[i]);
            }

            sql.Append($" AND {columnName} IN ({string.Join(",", paramNames)})");
        }

        public List<VeiculosDTO> SearchResult(FilterDTO filter, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);
            var sql = new StringBuilder();
            var parameters = new Dictionary<string, object>();
            sql.Append(@"
            SELECT 
                v.VeiculoID, m.Nome, mo.Modelo, v.Ano, 
                v.Vendido, i.DataDeInspecao, i.Resultado
            FROM Veiculos v
            LEFT JOIN Marcas m ON m.IDMarca = v.MarcaID
            LEFT JOIN Modelos mo ON mo.IDModelos = v.ModeloID
            LEFT JOIN (
                SELECT *
                FROM (
                    SELECT 
                        Inspecoes.*,
                        ROW_NUMBER() OVER (
                            PARTITION BY VeiculoID
                            ORDER BY DataDeInspecao DESC, InspecoesID DESC
                        ) AS rn
                    FROM Inspecoes
                ) x
                WHERE rn = 1
            ) i ON i.VeiculoID = v.VeiculoID
            WHERE 1 = 1
            ");

            AddInClause(sql, parameters, "Ano", "Ano", filter.Anos);
            AddInClause(sql, parameters, "MarcaID", "Marca", filter.Marcas);
            AddInClause(sql, parameters, "ModeloID", "Modelo", filter.Modelos);

            if (filter.Vendido.HasValue)
            {
                sql.Append(" AND Vendido = @Vendido");
                parameters.Add("Vendido", filter.Vendido.Value);
            }

            
            return DALPro.Query<VeiculosDTO>(sql.ToString(), parameters);
        }

        public VeiculosDTO SearchById(long id, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);
            var sql = new StringBuilder();
           

            sql.Append(@"
            SELECT 
                v.VeiculoID,
                m.Nome,
                mo.Modelo,
                v.Ano,
                v.Vendido,
                i.DataDeInspecao,
                i.Resultado
            FROM Veiculos v
            LEFT JOIN Marcas m 
                ON m.IDMarca = v.MarcaID
            LEFT JOIN Modelos mo 
                ON mo.IDModelos = v.ModeloID
            LEFT JOIN (
                SELECT *
                FROM (
                    SELECT 
                        Inspecoes.*,
                        ROW_NUMBER() OVER (
                            PARTITION BY VeiculoID
                            ORDER BY DataDeInspecao DESC, InspecoesID DESC
                        ) AS rn
                    FROM Inspecoes
                ) x
                WHERE rn = 1
            ) i
                ON i.VeiculoID = v.VeiculoID
            WHERE v.VeiculoID = @id;
            ");

            var parameters = new Dictionary<string, object>
                {
                    { "id", id }
                };


            return DALPro.Query<VeiculosDTO>(sql.ToString(), parameters).FirstOrDefault();
        }

        public void Update(Veiculos veiculo, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            string sql = @"
            UPDATE Veiculos
            SET 
                MarcaID = @MarcaID,
                ModeloID = @ModeloID,
                Ano = @Ano,
                Vendido = @Vendido
            WHERE VeiculoID = @VeiculoID;
            ";

            var parameters = new Dictionary<string, object>
            {
                { "@VeiculoID", veiculo.VeiculoID },
                { "@MarcaID", veiculo.MarcaID },
                { "@ModeloID", veiculo.ModeloID },
                { "@Ano", veiculo.Ano },
                { "@Vendido", veiculo.Vendido }
            };

            DALPro.Execute(sql, parameters);
        }

        public Veiculos Insert(Veiculos veiculo, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            string sql = @"
            INSERT INTO Veiculos (MarcaID, ModeloID, Ano, Vendido)
            VALUES (@MarcaID, @ModeloID, @Ano, @Vendido);

            SELECT CAST(SCOPE_IDENTITY() AS BIGINT);
            ";

                    var parameters = new Dictionary<string, object>
            {
                { "@MarcaID", veiculo.MarcaID },
                { "@ModeloID", veiculo.ModeloID },
                { "@Ano", veiculo.Ano },
                { "@Vendido", veiculo.Vendido }
            };

            veiculo.VeiculoID = Convert.ToInt64(DALPro.ExecuteScalar(sql, parameters));

            return veiculo;
        }

        public void Delete(long id, string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            string sql = @"
            DELETE FROM Veiculos WHERE VeiculoID = @VeiculoID; 
            ";

            var parameters = new Dictionary<string, object>
            {
                { "@VeiculoID", id }
            };

            DALPro.Execute(sql, parameters);

        }

        public void DeleteAll(string tag)
        {
            DalPro.DALPro.ConnectionString = GetConnectionsString(tag);

            var sql = "DELETE FROM [Veiculos]";
            DALPro.Execute(sql);
        }

    }
}
