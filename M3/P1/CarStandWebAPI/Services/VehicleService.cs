using CarStandBusiness.DTO;
using CarStandBusiness.Models;
using CarStandBusiness.Repositories;
using DalPro;
using Microsoft.Data.SqlClient;

namespace CarStandWebAPI.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _veiculoRepository;
        private readonly IMarcasRepository _marcaRepository;
        private readonly IModelosRepository _modeloRepository;
        private readonly IInspecoesRepository _inspecaoRepository;
        private readonly ILogger _logger;

        public VehicleService(ILogger<VehicleService> logger, IVehicleRepository veiculoRepository,
            IMarcasRepository marcasRepository, IModelosRepository modelosRepository, IInspecoesRepository inspecoesRepository)
        {
            _veiculoRepository = veiculoRepository;
            _marcaRepository = marcasRepository;
            _inspecaoRepository = inspecoesRepository;
            _modeloRepository = modelosRepository;
            _logger = logger;
        }

        public List<MarcasDTO> GetUniqueMarcas()
        {
            _logger.LogInformation("Called GetUniqueMarcas()");
            try
            {
                return [.. _veiculoRepository.GetUniqueMarcas("CarStand")
                    .Select(p => new MarcasDTO
                    {
                        IDMarca = p.IDMarca,
                        Nome = p.Nome
                    })];   
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

        public List<ModelosDTO> GetUniqueModelos()
        {
            _logger.LogInformation("Called GetUniqueModelos()");
            try
            {
            return [.. _veiculoRepository.GetUniqueModelos("CarStand")
                .Select(p => new ModelosDTO
                {
                    IDModelos = p.IDModelos,
                    Modelo = p.Modelo
                })];
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

        public List<AnoDTO> GetUniqueYears()
        {
            _logger.LogInformation("Called GetUniqueModelos()");
            try
            {
            return [.. _veiculoRepository.GetUniqueYears("CarStand")
                .Select(p => new AnoDTO
                {
                    Ano = p.Ano
                })];
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

        public void Delete(long id, string tag)
        {
            _logger.LogInformation("Called Delete()");
            try
            {
            _inspecaoRepository.DeleteByVehicleId(id, tag);
            _veiculoRepository.Delete(id, tag);
             
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

        public VeiculosDTO GetById(long id, string tag)
        {
            _logger.LogInformation("Called GetById()");
            try
            {
            return _veiculoRepository.SearchById(id, tag);
               

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
        public List<VeiculosDTO> SearchResult(FilterDTO filter, string tag)
        {
            _logger.LogInformation("Called SearchResult()");
            try
            {
            return _veiculoRepository.SearchResult(filter, tag);
               

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

        public VeiculosDTO Upsert(VeiculoUpsertDTO dto, string tag)
        {
            try
            {
            if (dto.VeiculoID.HasValue)
                return Update(dto, tag);
            else
                return Insert(dto, tag);
           
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

        private VeiculosDTO Update(VeiculoUpsertDTO upsertDTO,  string tag)
        {

            try
            {
                var current = _veiculoRepository.GetById(upsertDTO.VeiculoID.Value, tag);

                if (current == null)
                    throw new Exception("Veiculo not found");

                // Resolve Marca
                var marca = _marcaRepository.GetByNome(upsertDTO.MarcaNome, tag);
                int marcaId = marca?.IDMarca ?? _marcaRepository.Insert(
                    new MarcasDTO { Nome = upsertDTO.MarcaNome }, tag);

                // Resolve Modelo
                var modelo = _modeloRepository.GetByNome(upsertDTO.ModeloNome, tag);
                int modeloId = modelo?.IDModelos ?? _modeloRepository.Insert(new ModelosDTO { Modelo = upsertDTO.ModeloNome }, tag);

                // Check changes
                bool needsUpdate =
                    current.MarcaID != marcaId ||
                    current.ModeloID != modeloId ||
                    current.Ano != upsertDTO.Ano ||
                    current.Vendido != upsertDTO.Vendido;

                if (needsUpdate)
                {
                    _veiculoRepository.Update(new Veiculos
                    {
                        VeiculoID = current.VeiculoID,
                        MarcaID = marcaId,
                        ModeloID = modeloId,
                        Ano = upsertDTO.Ano,
                        Vendido = upsertDTO.Vendido
                    }, tag);
                }

                // Handle inspection
                if (needsUpdate && upsertDTO.DataDeInspecao.HasValue)
                {
                    _inspecaoRepository.Insert(new Inspecoes
                    {
                        VeiculoID = current.VeiculoID,
                        DataDeInspecao = upsertDTO.DataDeInspecao.Value,
                        Resultado = true
                    }, tag);
                }
                var res = _veiculoRepository.SearchById(current.VeiculoID, tag);

                return res;

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

        private VeiculosDTO Insert(VeiculoUpsertDTO upsertDTO, string tag)
        {
            try
            {

                // Resolve Marca
                var marca = _marcaRepository.GetByNome(upsertDTO.MarcaNome, tag);
                int marcaId = marca?.IDMarca ?? _marcaRepository.Insert(
                    new MarcasDTO { Nome = upsertDTO.MarcaNome }, tag);

                // Resolve Modelo
                var modelo = _modeloRepository.GetByNome(upsertDTO.ModeloNome, tag);
                int modeloId = modelo?.IDModelos ?? _modeloRepository.Insert(new ModelosDTO { Modelo = upsertDTO.ModeloNome }, tag);

                var current = _veiculoRepository.Insert(new Veiculos
                {
                    MarcaID = marcaId,
                    ModeloID = modeloId,
                    Ano = upsertDTO.Ano,
                    Vendido = upsertDTO.Vendido
                }, tag);

                // Handle inspection
                if (upsertDTO.DataDeInspecao.HasValue)
                {
                    _inspecaoRepository.Insert(new Inspecoes
                    {
                        VeiculoID = current.VeiculoID,
                        DataDeInspecao = upsertDTO.DataDeInspecao.Value,
                        Resultado = true
                    }, tag);
                }

                var res = _veiculoRepository.SearchById(current.VeiculoID, tag);

                return res;
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
            _logger.LogInformation("Called DeleteAll()");
            try
            {
                _inspecaoRepository.DeleteAll(tag);
                _veiculoRepository.DeleteAll(tag);
                _marcaRepository.DeleteAll(tag);
                _modeloRepository.DeleteAll(tag);
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
