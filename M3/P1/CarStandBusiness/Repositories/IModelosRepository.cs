using CarStandBusiness.DTO;
using CarStandBusiness.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStandBusiness.Repositories
{
    public interface IModelosRepository
    {
        public List<Modelos> GetAll(string tag);

        public Modelos GetById(long id, string tag);

        public Modelos GetByNome(string Modelo, string tag);

        public int Insert(ModelosDTO ins, string tag, SqlTransaction? trans = null);

        public void Update(ModelosDTO ins, string tag, SqlTransaction? trans = null);

        public void Delete(long id, string tag);

        public void DeleteAll(string tag);
    }
}
