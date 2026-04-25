const fname = ["MediaDeDois", "Arredondar", "isNegative", "isDigit", "isEven", "isOdd", "abs", "min", "somaN", "isVowel",
    "isSorted", "isInRange", "isNotInRange", "xor", "sameSignal", "onlyOnePositive"]
const loweralfa = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

//Ficha 1 - 1
        function MediaDeDois(x, y){
            return (x + y) / 2
        }
        //Ficha 1 - 2 - É suposto ter 2 funções a simular o ceiling e o floor da biblioteca Math ou 
        //podemos ter um argumento booleano a ser passado para a função que determina o tip ode arredondamento a ralizar
        function Arredondar(x){
            return ((x - parseInt(x)) >= 0.5) ?  parseInt(x) + 1 : parseInt(x)   
        }
        //Ficha 1 - 3
        function isNegative(x){
            return (x < 0)? true : false
        }
        //Ficha 1 - 4
        function isDigit(x){
            return (x >= 0 && x <= 9) ? true : false 
        }
        //Ficha 1 - 5
        function isEven(x){
            return (x % 2 == 0) ? true : false
        }
        //Ficha 1 - 6
        function isOdd(x){
            return (x % 2 == 0) ? false : true
        }
        //Ficha 1 - 7
        function abs(x){
            return (x < 0) ? x * -1 : x
        }
        //Ficha 1 - 8
        function min(x , y){
            return (x < y) ? x : y
        }
        //Ficha 1 - 9
        function somaN(n){
            let i = 1;
            let s = 0;
            while (i <= n){
                s+= (i * (i + 1)) / 2
                i++;
            }
            return (s)
        }
        //Ficha 1 - 10
        function isVowel(x){
            let vec = ['a', 'e', 'i', 'o', 'u']
            return vec.includes(x)
        }
        //Ficha 1 - 11
        function isSorted(x, y, z){
            return (x < y) ? (y < z) ? true: false: false
        }
        //Ficha 1 - 12
        function isInRange(x, min, max){
            return (x >= min) ? (x <=max) ? true : false: false 
        }
        //Ficha 1 - 13
        function isNotInRange(x, min, max){
            return (x < min) ? true : (x > max) ? true : false
        }
        //Ficha 1 - 14
        function xor(x, y){
            return ((x == false && y == true) || (x == true && y == false)) ? true : false
        }
        //Ficha 1 - 15
        function sameSignal(x, y){
            return (x == 0 || y == 0) ? false: ((x < 0 && y < 0) || (x > 0 && y > 0)) ? true: false
        }
        //Ficha 1 - 16
        function onlyOnePositive(x, y){
            return (x < 0 && y > 0) ? true : (x > 0 && y < 0) ? true : false
        }