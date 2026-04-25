using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ex4
{
    public  class Bank
    {
        public int AverageClientsPerHour { get; private set; }

        public Queue<Person> line { get; private set; }

        public TimeSpan clock = new TimeSpan(8, 0, 0);

        public bool isDoorOpen { get; private set; }
        public int ClosingTime { get; private set; }
        public Teller teller;
           
        private Random rand = new  Random();
        public Bank(int averageClients, string tellername)
        {
            AverageClientsPerHour = averageClients;
            teller = new Teller(tellername, "Starting WorkDay", 15);
            line = new Queue<Person>();
            ClosingTime = 15;
            isDoorOpen = true;
        }

        public void Tick()
        {
            if (isDoorOpen && clock.Hours >= ClosingTime)
            {
                if (teller.CurrentActivity == null)
                    isDoorOpen = false;
                return;
            }
            PersonEntersBank();
            teller.TellerTick(line, clock);
            //update time
            clock = Utils.NewDayTime(clock);
        }

        public void PersonEntersBank()
        {
            if (rand.NextDouble() < AverageClientsPerHour / 60.0)
            {
                BankClient newPerson = RandomClient.GetRandomClient(rand);
                line.Enqueue(newPerson);
                Utils.WriteConsoleFormatted($"{newPerson.Name} enters the bank with the subject: {newPerson.Subject}", clock, ConsoleColor.Cyan);
                
            }

        }

        
    }
}
