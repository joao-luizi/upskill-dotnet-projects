namespace Ex2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Produto> lista = new();

            bool exit = false;
            while (!exit) 
            {
                Console.Clear();
                Console.WriteLine("Lista Atual:");
                if (lista.Count == 0)
                {
                    Console.WriteLine("Nenhum item na lista.");
                }
                else
                {
                    for (int i = 0; i < lista.Count; i++)
                    {
                        Console.WriteLine($"{i + 1} : Nome: {lista[i].Nome} Preço: {lista[i].Preco} €");
                    }
                }
                Console.WriteLine(" 0 - Introduzir novo Produto");
                Console.WriteLine(" 1 - Filtrar por valor");
                Console.WriteLine(" 2 - Sair");
                int choice = Utils.GetInput(2, 0);
                switch (choice)
                {
                    case 0:
                        Operacoes.InserirProduto(lista);
                        Console.WriteLine("Pressione qualquer tecla para prosseguir");
                        Console.ReadKey();
                        break;
                    case 1:
                        Operacoes.FiltrarLista(lista);
                        Console.WriteLine("Pressione qualquer tecla para prosseguir");
                        Console.ReadKey();
                        break;
                    case 2:
                        exit = true;
                        break;
                    default:
                        continue;
                }

            }

        }
    }
}
