using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ex4
{
    public static class RandomClient
    {
        private static List<string> firstNames = new()
    {
        "João", "Maria", "Pedro", "Ana", "Miguel",
        "Inês", "Ricardo", "Sofia", "Tiago", "Carla"
    };

        private static List<string> lastNames = new()
    {
        "Silva", "Santos", "Ferreira", "Pereira",
        "Costa", "Oliveira", "Martins", "Rodrigues"
    };

        private static List<(string Subject, int Minutes)> subjects = new()
    {
        ("Open a bank account", 20),
        ("Request a loan", 45),
        ("Deposit money", 10),
        ("Withdraw money", 5),
        ("Update personal data", 15),
        ("Credit card issue", 25),
        ("Mortgage discussion", 60),
        ("Close account", 30)
    };

        public static BankClient GetRandomClient(Random r)
        {
            string firstName = firstNames[r.Next(firstNames.Count)];
            string lastName = lastNames[r.Next(lastNames.Count)];
            string fullName = $"{firstName} {lastName}";

            var randomSubject = subjects[r.Next(subjects.Count)];

            return new BankClient(fullName, randomSubject.Subject, randomSubject.Minutes + r.Next(randomSubject.Minutes / 2));
        }
    }
    public  class BankClient : Person
    {
        public string Subject { get; private set; }
        public int SubjectMinutes { get; private set; }

        public BankClient(string nome, string subject, int subjectMinutes) : base(nome)
        { 
           
            Subject = subject;
            SubjectMinutes = subjectMinutes;
        }
    }
}
