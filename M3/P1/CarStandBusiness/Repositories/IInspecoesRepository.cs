using CarStandBusiness.DTO;
using CarStandBusiness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStandBusiness.Repositories
{
    public interface IInspecoesRepository
    {
        public List<Inspecoes> GetAll(long VeiculoID, string tag);

        public Inspecoes GetById(long id, string tag);

        public long Insert(Inspecoes ins, string tag);

        public void Update(Inspecoes ins, string tag);

        public void Delete(long id, string tag);

        public void DeleteByVehicleId(long id, string tag);

        public void DeleteAll(string tag);
    }
}
