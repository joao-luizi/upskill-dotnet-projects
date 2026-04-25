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
    public interface IMarcasRepository
    {
        public List<Marcas> GetAll(string tag);

        public Marcas GetById(long id, string tag);

        public Marcas GetByNome(string Nome, string tag);

        public int Insert(MarcasDTO ins, string tag, SqlTransaction? trans = null);
       
        public void Update(MarcasDTO ins, string tag, SqlTransaction? trans = null);

        public void Delete(long id, string tag);

        public void DeleteAll(string tag);
    }
}
