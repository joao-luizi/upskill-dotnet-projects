using System.Linq.Expressions;

namespace Ex3
{//Criar um programa para verificar a validade de parênteses numa expressão matemática
    internal class Program
    {
        static void Main(string[] args)
        {

            while (true)
            {

                Console.WriteLine("Escreva a sua expressão ou TERMINAR para sair.");
                string expression = Utils.GetInput();
                if (expression == "TERMINAR")
                    break;
                bool breakThis = false;
                Stack<string> stack = new Stack<string>();
                for (int i = 0; i < expression.Length; i++)
                {
                    if (expression[i] == '(')
                        stack.Push("(");
                    if (expression[i] == ')')
                    {
                        if (stack.Count == 0)
                        {
                            Console.WriteLine("Parenteses invalidos.");
                            breakThis = true;
                            break;
                        }
                        stack.Pop();
                    }
                }
                if (breakThis == true)
                    continue;
                if (stack.Count != 0)
                    Console.WriteLine("Parenteses invalidos.");
                else
                    Console.WriteLine("Parenteses validos.");
                }
        }
    }
}
