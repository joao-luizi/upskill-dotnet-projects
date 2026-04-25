using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStandBusiness.DTO
{
    public class InspecoesDTO
    {
        public long InspecoesID { get; set; }
        public long VeiculoID { get; set; }
        public DateTime? DataDeInspecao { get; set; }
        public bool Resultado { get; set; }
    }
}
