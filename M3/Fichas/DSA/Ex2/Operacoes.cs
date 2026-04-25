using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ex2
{
    public  class Operacoes
    {
        public static void FiltrarLista(List<Produto> lst)
        {

            if (lst == null || lst.Count == 0)
            {
                Console.WriteLine("Esta lista está vazia e não pode ser filtrada.");
                return;
            }
            
             Console.WriteLine("Introduza o valor máximo para os itens a mostrar");
             int precoMax = Utils.GetInput(null, 0);
             List<Produto> filtrado = lst.Where(x => x.Preco < precoMax).ToList();
             if (filtrado.Count == 0)
             {
                Console.WriteLine($"Não existem items abaixo de {precoMax}.");
                return;
             }
             for (int i = 0; i < filtrado.Count; i++)
             {
                Console.WriteLine($"Nome: {filtrado[i].Nome} Preco: {filtrado[i].Preco}");
             }
            
        }
        public static void  InserirProduto(List<Produto> lst)
        {
            string? nome = null;
            int? preco = null;
            while (nome == null)
            {
                Console.WriteLine("Introduza o nome do novo Produto");
                string inputNome = Utils.GetInput();
                if (lst.Any(x => x.Nome.ToLower() == inputNome.ToLower()))
                    Console.WriteLine("Este Produto já existe na lista");
                else
                    nome = inputNome;
            }
            Console.WriteLine($"Introduza o preco de {nome}");
            while (preco == null)
            {
                preco = Utils.GetInput(null, 1);
            }
            lst.Add(new Produto(nome, (int)preco));
          
        }
    }
}
