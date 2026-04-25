using CarStandBusiness.DTO;

namespace CarStandWebAPI.Services
{
    public interface IVehicleService
    {
        public List<MarcasDTO> GetUniqueMarcas();

        public List<ModelosDTO> GetUniqueModelos();

        public List<AnoDTO> GetUniqueYears();

        public List<VeiculosDTO> SearchResult(FilterDTO filter, string tag);

        public VeiculosDTO Upsert(VeiculoUpsertDTO dto, string tag);

        public VeiculosDTO GetById(long id, string tag);

        public void Delete(long id, string tag);

        public void DeleteAll(string tag);

    }
}
