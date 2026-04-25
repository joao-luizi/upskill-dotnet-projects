namespace Ex1
{
    //Criar um programa para armazenar e mostrar as notas de uma turma
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] grades = new int[10];

            Utils.InitArray<int>(grades, -1);
           
            while (grades.Any((x) => x < 0))
            {
                Console.Clear();
                Console.WriteLine("Escolha uma nota para editar:");
                for (int i = 0; i < grades.Length; i++)
                {
                    Console.WriteLine($"[{i}] : {(grades[i] >= 0 ? grades[i].ToString() : "<Sem nota lançada>")}");
                }
                int index = Utils.GetInput(9, 0);
                Console.WriteLine("Escolha a nota de 0 a 20 a atribuir :");
                grades[index] = Utils.GetInput(20, 0);
            }
        }
    }
}
