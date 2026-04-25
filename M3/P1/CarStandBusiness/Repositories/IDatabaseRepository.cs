using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStandBusiness.Repositories
{
    public interface IDatabaseRepository
    {
        public void SeedData(string tag);
    }
}
