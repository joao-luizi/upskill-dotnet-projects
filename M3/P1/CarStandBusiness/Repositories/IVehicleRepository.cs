using CarStandBusiness.DTO;
using CarStandBusiness.Models;
using Microsoft.Data.SqlClient;

namespace CarStandBusiness.Repositories
{
    public interface IVehicleRepository
    {
        public List<Marcas> GetUniqueMarcas(string tag);
        public List<Modelos> GetUniqueModelos(string tag);
        public List<Veiculos> GetUniqueYears(string tag);
        public List<VeiculosDTO> SearchResult(FilterDTO filter, string tag);

        public void Update(Veiculos upsertDTO, string tag);

        public Veiculos Insert(Veiculos upsertDTO, string tag);

        public Veiculos GetById(long id, string tag);

        public VeiculosDTO SearchById(long id, string tag);

        public void Delete(long id, string tag);

        public void DeleteAll(string tag);
    }
}
