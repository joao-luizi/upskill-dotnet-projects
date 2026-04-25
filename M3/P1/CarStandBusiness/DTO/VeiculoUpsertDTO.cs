using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStandBusiness.DTO
{
    public class VeiculoUpsertDTO
    {
        public long? VeiculoID { get; set; }
        public string ModeloNome { get; set; } = null!;
        public string MarcaNome { get; set; } = null!;
        public int Ano { get; set; }
        public bool Vendido { get; set; }
        public DateTime? DataDeInspecao { get; set; }
    }
}
