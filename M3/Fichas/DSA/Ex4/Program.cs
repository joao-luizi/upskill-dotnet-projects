using System.Diagnostics;
using System.Security.Cryptography;

namespace Ex4
{//Criar um programa para simular uma fila de atendimento bancário.
    internal class Program
    {
        static void Main(string[] args)
        {
           
           Random r = new Random();
           Console.WriteLine("What is Your Name?");
           string bankTeller = Utils.GetInput();

           Bank bank = new Bank(3, bankTeller);
           Utils.WriteConsoleFormatted($"{bankTeller} starts working at {bank.clock.Hours:D2}:{bank.clock.Minutes:D2} and he will close the door at {bank.ClosingTime}:00",
               bank.clock, ConsoleColor.Green);


            while (bank.clock.Hours < 15)
            {
                bank.Tick();
                System.Threading.Thread.Sleep(50);
            }
            Utils.WriteConsoleFormatted($"{bankTeller} closes the door at {bank.clock.Hours:D2}:{bank.clock.Minutes:D2} and there are {bank.line.Count} clients left to attend.",
                bank.clock, ConsoleColor.DarkYellow);
            if (bank.line.Count > 0)
            {
                foreach (var person in bank.line)
                    Console.WriteLine($"{person.Name}");
            }

        }
    }
}
