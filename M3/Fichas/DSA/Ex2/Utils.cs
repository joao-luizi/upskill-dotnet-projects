using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ex2
{
    public class Utils
    {
        public static void InitArray<T>(T[] array,  T defaultValue)
        {
            for (int i = 0; i < array.Length; i++)
            {
                array[i] = defaultValue;
            }
        }

        public static int GetInput(int? maxValue, int? minValue)
        {     
            while (true)
            { 
                string? input = Console.ReadLine();
                if (input == null)
                    continue;
                if (!Int32.TryParse(input, out int value))
                    continue;
                if (maxValue != null && value > maxValue)
                    continue;
                if (minValue != null && value < minValue)
                    continue;
                return value;                
            }
        }

        public static string GetInput()
        {
            while (true)
            {
                string? input = Console.ReadLine();
                if (input == null)
                    continue;
                return input;
            }
        }
    }
}
