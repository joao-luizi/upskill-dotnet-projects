using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStandBusiness.Models
{
    public  class Veiculos
    {
        public long VeiculoID { get; set; }

        public int MarcaID { get; set; }

        public int ModeloID { get; set; }

        public int Ano {  get; set; }

        public bool Vendido { get; set; }
    }
}
