using CarStandBusiness.Repositories;

namespace CarStandWebAPI.Services
{
    public class DatabaseService : IDatabaseService
    {
        private readonly ILogger _logger;
        private readonly IDatabaseRepository _repository;

        public DatabaseService(ILogger<VehicleService> logger, IDatabaseRepository repository)
        {
           
            _logger = logger;
            _repository = repository;
        }

        public void SeedData(string tag)
        {
            _repository.SeedData(tag);
        }
    }
}
