using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ex4
{
    public static class RandomActivity
    {
        private static readonly List<string> MediumWorkTasks = new()
    {
        "Organizing old files",
        "Rewriting forms",
        "Cleaning keyboard",
        "Pretending to enter data"
    };

        private static readonly List<string> SmallWorkTasks = new()
    {
        "Adjusting stapler",
        "Shuffling papers",
        "Checking pens"
    };

        private static readonly List<string> MediumIdleTasks = new()
    {
        "Making coffee ☕",
        "Going to the bathroom 🚽",
        "Watching birds outside 🐦",
        "Chatting with imaginary colleague"
    };

        private static readonly List<string> SmallIdleTasks = new()
    {
        "Eating a cookie 🍪",
        "Adjusting chair",
        "Talking to self",
        "Stretching arms"
    };

        /// <summary>
        /// Returns a random medium-length work-looking task.
        /// </summary>
        public static (string TaskName, int DurationMinutes) GetMediumWorkTask(Random r)
        {
            string task = MediumWorkTasks[r.Next(MediumWorkTasks.Count)];
            int duration = r.Next(5, 15); // 5–15 minutes
            return (task, duration);
        }

        /// <summary>
        /// Returns a random small work-looking task.
        /// </summary>
        public static (string TaskName, int DurationMinutes) GetSmallWorkTask(Random r)
        {
            string task = SmallWorkTasks[r.Next(SmallWorkTasks.Count)];
            int duration = r.Next(2, 5); // 2–5 minutes
            return (task, duration);
        }

        /// <summary>
        /// Returns a random medium-length idle/funny task.
        /// </summary>
        public static (string TaskName, int DurationMinutes) GetMediumIdleTask(Random r)
        {
            string task = MediumIdleTasks[r.Next(MediumIdleTasks.Count)];
            int duration = r.Next(5, 15); // 5–15 minutes
            return (task, duration);
        }

        /// <summary>
        /// Returns a random small idle/funny task.
        /// </summary>
        public static (string TaskName, int DurationMinutes) GetSmallIdleTask(Random r)
        {
            string task = SmallIdleTasks[r.Next(SmallIdleTasks.Count)];
            int duration = r.Next(2, 5); // 2–5 minutes
            return (task, duration);
        }
    }
    public  class Teller : Person
    {
        public string?  CurrentActivity { get; private set; }
        public int RemainingMinutes { get; private set; }
        public int Boredom { get; private set; }
        private Random rand = new Random();
        public Teller(string name) : base(name)
        { 
            RemainingMinutes = 0;
        }

        public Teller(string name, string activity, int remainingMinutes) : base(name)
        {
            CurrentActivity = activity;
            RemainingMinutes = remainingMinutes;
        }

        public void SetTask(string taskName, int taskBaseMinutes, TimeSpan bankClock, int peopleWaiting = 0)
        {
            CurrentActivity = taskName;
            RemainingMinutes = taskBaseMinutes + rand.Next(taskBaseMinutes / 2) - rand.Next(taskBaseMinutes / 2);
            if (peopleWaiting > 0) 
                Utils.WriteConsoleFormatted($"Teller is starting: {CurrentActivity} while {peopleWaiting} are waiting!", bankClock, ConsoleColor.Magenta);
        }

        private void HandleQueue(Queue<Person> bankLine, TimeSpan bankClock)
        {
            if (bankLine.Count > 0)
            {
                if (Boredom > 80 && rand.NextDouble() < 0.7)
                {
                    var task = RandomActivity.GetMediumWorkTask(rand);
                    SetTask(task.TaskName, task.DurationMinutes, bankClock, bankLine.Count);
                    Boredom = 0;
                    return;
                }
                if (Boredom > 30 && rand.NextDouble() < 0.2)
                {
                    var task = RandomActivity.GetSmallWorkTask(rand);
                    SetTask(task.TaskName, task.DurationMinutes, bankClock, bankLine.Count);
                    Boredom = 0;
                    return;
                }
               
                if (bankLine.Dequeue() is BankClient client)
                {
                    SetTask($"Attending {client.Name} regarding client's subject {client.Subject}", client.SubjectMinutes, bankClock);
                    return;
                }
            }
            if (bankLine.Count == 0)
            {
                if (Boredom > 80 && rand.NextDouble() < 0.7)
                {
                    var task = RandomActivity.GetMediumWorkTask(rand);
                    SetTask(task.TaskName, task.DurationMinutes, bankClock);
                    Boredom = 0;
                    return;
                }
                if (Boredom > 30 && rand.NextDouble() < 0.7)
                {
                    var task = RandomActivity.GetMediumWorkTask(rand);
                    SetTask(task.TaskName, task.DurationMinutes, bankClock);
                    Boredom = 0;
                    return;
                }
                this.CurrentActivity = null;
                this.RemainingMinutes = 0;
            }
        }
        public void TellerTick(Queue<Person> bankLine, TimeSpan bankClock)
        {
            Boredom++;
            if (CurrentActivity != null)
            {
                RemainingMinutes--;
                if (RemainingMinutes == 0)
                {
                    Utils.WriteConsoleFormatted($"Teller {this.Name} finished the Task: {CurrentActivity}", bankClock, ConsoleColor.Gray);
                    CurrentActivity = null;
                }
            }
            if (CurrentActivity == null)
                HandleQueue(bankLine, bankClock);
            
        }
    }
}
