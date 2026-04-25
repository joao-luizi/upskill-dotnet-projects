using Ex4;
using System.Data;

namespace Ex5
{//Criar um programa para armazenar dados de clientes (ID como chave, nome como valor).
    internal class Program
    {
        static void Main(string[] args)
        {
            Dictionary<int, string> clientes = new Dictionary<int, string>();

            Console.WriteLine("Adiciona Pessoas");
            for (int i = 0; i < 10; i++)
            {
                Console.Clear();
                Console.WriteLine($"Adicione o nome da pessoa {i + 1}:");
                string nome = Utils.GetInput();
                clientes.Add(i + 1, nome);
            }

            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine($"Cliente Id: {i + 1} Nome: {clientes[i + 1]}.");
            }


        }
    }
}
