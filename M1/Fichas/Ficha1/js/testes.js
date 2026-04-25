function TesteMediaDeDois() {
  const explain = document.getElementById("MediaDeDoisExplain");
  if (explain) {
    const arg1 = Math.floor(Math.random() * 9) + 1;
    const arg2 = Math.floor(Math.random() * 9) + 1;
    explain.innerHTML = `Média de ${arg1} e ${arg2} = ${MediaDeDois(
      arg1,
      arg2
    )}`;
  }
}

function TesteArredondar() {
  const explain = document.getElementById("ArredondarExplain");
  if (explain){
    const arg1 = Math.random() * 9 + 1;
    explain.innerHTML = `Arrendondamento de ${arg1} = ${Arredondar(
      arg1
    )}`;
  }
}

//Ficha 1 - 3
function TesteisNegative() {
  const explain = document.getElementById("isNegativeExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 9) - Math.floor(Math.random() * 19);
    explain.innerHTML = `É negativo ${arg1}? ${isNegative(arg1) ? ' Sim' : 'Não'}`;
  }
}
//Ficha 1 - 4
function TesteisDigit() {
  const explain = document.getElementById("isDigitExplain");
  if (explain){
    const alfadigits = [...loweralfa, ...digits]
    const arg1 = alfadigits[Math.floor(Math.random() * alfadigits.length)];
    explain.innerHTML = `É digito ${arg1}? ${isDigit(arg1) ? ' Sim' : 'Não'}`;
  }
}
//Ficha 1 - 5
function TesteisEven() {
  const explain = document.getElementById("isEvenExplain");
  if (explain){
    const digitsMinus0 = digits;
    digitsMinus0.shift();
    const arg1 = digitsMinus0[Math.floor(Math.random() * digits.length)];
    explain.innerHTML = `É par ${arg1}? ${isEven(arg1) ? ' Sim' : 'Não'}`;
  }
}
//Ficha 1 - 6
function TesteisOdd() {
  const explain = document.getElementById("isOddExplain");
  if (explain){
    const digitsMinus0 = digits;
    digitsMinus0.shift();
    const arg1 = digitsMinus0[Math.floor(Math.random() * digits.length)];
    explain.innerHTML = `É impar ${arg1}? ${isOdd(arg1) ? ' Sim' : 'Não'}`;
  }
}
//Ficha 1 - 7
function Testeabs() {
  const explain = document.getElementById("absExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 9) * -1;
    explain.innerHTML = `Valor absoluto de ${arg1}? ${abs(arg1)}`;
  }
}
//Ficha 1 - 8
function Testemin() {
  const explain = document.getElementById("minExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 9) - Math.floor(Math.random() * 19);
    const arg2 = Math.floor(Math.random() * 9) - Math.floor(Math.random() * 19);
    explain.innerHTML = `Minimo entre ${arg1} e ${arg2}? ${min(arg1, arg2)}`;
  }
}
//Ficha 1 - 9
function TestesomaN() {
  const explain = document.getElementById("somaNExplain");
   if (explain){
    const arg1 = Math.floor(Math.random() * 9) + 1;
    explain.innerHTML = ` a soma dos primeiros ${arg1} números naturais segundo a formula S = n * (n + 1) / 2? ${somaN(arg1)}`;
  }
}
//Ficha 1 - 10
function TesteisVowel() {
  const explain = document.getElementById("isVowelExplain");
  if (explain){
    const arg1 = loweralfa[Math.floor(Math.random() * loweralfa.length)];
    explain.innerHTML = `O caracter ${arg1} é vogal? ${isVowel(arg1) ? ' Sim' : 'Não'}`;
  }
}
//Ficha 1 - 11
function TesteisSorted() {
  const explain = document.getElementById("isSortedExplain");
   if (explain){
    const arg1 = Math.floor(Math.random() * 9) + 1;
    const arg2 = Math.floor(Math.random() * 9) + 1;
    while (arg2 === arg1)
        arg2 = Math.floor(Math.random() * 9) + 1;
    const arg3 = Math.floor(Math.random() * 9) + 1;
    while (arg3 === arg1 || arg3 === arg2)
      arg3 = Math.floor(Math.random() * 9) + 1;
    explain.innerHTML = `O conjunto [${arg1}, ${arg2}, ${arg3}] Está ordenado por ordem crescente? ${isSorted(arg1, arg2, arg3) ? ' Sim' : 'Não'}`;
  }
}
//Ficha 1 - 12
function TesteisInRange() {
  const explain = document.getElementById("isInRangeExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 9) + 1;
    let arg2 = Math.floor(Math.random() * 9) + 1;
    let arg3 = Math.floor(Math.random() * 9) + 1;
    while (arg3 === arg2)
        arg3 = Math.floor(Math.random() * 9) + 1;
    let arr = [arg2, arg3]
    arr.sort();
    explain.innerHTML = `O numero ${arg1} pertence ao intervalo [${arr[0]}, ${arr[1]}]? ${isInRange(arg1, arr[0], arr[1]) ? ' Sim' : 'Não'}`;
  }
}
//Ficha 1 - 13
function TesteisNotInRange() {
  const explain = document.getElementById("isNotInRangeExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 9) + 1;
    let arg2 = Math.floor(Math.random() * 9) + 1;
    let arg3 = Math.floor(Math.random() * 9) + 1;
    while (arg3 === arg2)
        arg3 = Math.floor(Math.random() * 9) + 1;
    let arr = [arg2, arg3]
    arr.sort();
    explain.innerHTML = `O numero ${arg1} não pertence ao intervalo [${arr[0]}, ${arr[1]}]? ${isNotInRange(arg1, arr[0], arr[1]) ? ' Sim' : 'Não'}`;
  }
}
//Ficha 1 - 14
function Testexor() {
  const explain = document.getElementById("xorExplain");
  if (explain){
    const arg1 = Math.random() < 0.5;
    const arg2 = Math.random() < 0.5;
    explain.innerHTML = `A disjunção exclusiva (XOR) entre (${arg1}) e (${arg2}) é: ${xor(arg1, arg2)}`;
  }
}
//Ficha 1 - 15
function TestesameSignal() {
  const explain = document.getElementById("sameSignalExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 9) - Math.floor(Math.random() * 19);
    const arg2 = Math.floor(Math.random() * 9) - Math.floor(Math.random() * 19);
    explain.innerHTML = `Os valores ${arg1} e ${arg2} têm o mesmo sinal? ${sameSignal(arg1, arg2) ? ' Sim' : 'Não'}`;
  }
}
//Ficha 1 - 16
function TesteonlyOnePositive() {
  const explain = document.getElementById("onlyOnePositiveExplain");
 if (explain){
    const arg1 = Math.floor(Math.random() * 9) - Math.floor(Math.random() * 19);
    const arg2 = Math.floor(Math.random() * 9) - Math.floor(Math.random() * 19);
    explain.innerHTML = `Entre ${arg1} e ${arg2} só um é positivo? ${onlyOnePositive(arg1, arg2) ? ' Sim' : 'Não'}`;
  }
}
