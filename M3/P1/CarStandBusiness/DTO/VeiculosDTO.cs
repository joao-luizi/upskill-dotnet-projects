using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStandBusiness.DTO
{
    public class VeiculosDTO
    {
        public long VeiculoID { get; set; }
        public string Modelo { get; set; } = null!;
        public string Nome { get; set; } = null!;
        public int Ano { get; set; }
        public bool Vendido { get; set; }
        public DateTime? DataDeInspecao { get; set; }
        public bool? Resultado { get; set; }
    }
}
