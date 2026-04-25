using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ex2
{
    public class Produto
    {
        public int Preco { get; private set; }
        public string Nome { get; private set; }

        public Produto(string nome, int preco) 
        { 
            Nome = nome;
            Preco = preco;
        }
    }
}
