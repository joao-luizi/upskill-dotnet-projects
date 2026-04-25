const fname = [
  ["abs", Testeabs],
  ["max", Testemax],
  ["min", Testemin],
  ["irsGroup", TesteirsGroup],
  ["irsTax", TesteirsTax],
  ["Exercise6", TesteExercise6],
  ["firstDigit", TestefirstDigit],
  ["sumMax", TestesumMax],
  ["powerOfTwo", TestepowerOfTwo],
  ["isMultiple", TesteisMultiple],
  ["intDivision", TesteintDivision],
  ["sumEvenBetween", TestesumEvenBetween],
  ["nextLetter", TestenextLetter],
  ["euclides", Testeeuclides],
  ["invertNumber", TesteinvertNumber],
  ["fib",  Testefib],
];

function Testeabs() {
  const explain = document.getElementById("absExplain");
  if (explain) {
    const arg1 = Math.floor(Math.random() * 9) * -1;
    explain.innerHTML = `Valor absoluto de ${arg1}? ${abs(arg1)}`;
  }
}
function Testemax() {
  const explain = document.getElementById("maxExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 9) - Math.floor(Math.random() * 19);
    const arg2 = Math.floor(Math.random() * 9) - Math.floor(Math.random() * 19);
    explain.innerHTML = `Maximo entre ${arg1} e ${arg2}? ${max(arg1, arg2)}`;
  }
}
function Testemin() {
  const explain = document.getElementById("minExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 9) - Math.floor(Math.random() * 19);
    const arg2 = Math.floor(Math.random() * 9) - Math.floor(Math.random() * 19);
    explain.innerHTML = `Minimo entre ${arg1} e ${arg2}? ${min(arg1, arg2)}`;
  }
}
function TesteirsGroup() {
  const explain = document.getElementById("irsGroupExplain");
  if (explain){

      const arg1 = Math.floor(Math.random() * 100000) + 1;
      explain.innerHTML = `Rendimento de ${arg1} pertence a grupo ${irsGroup(arg1)}`;  
    }
}
function TesteirsTax() {
  const explain = document.getElementById("irsTaxExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 6);
      explain.innerHTML = `A percentagem de Irs no escalão ${arg1} é ${irsTax(arg1)}`;  
  }
}
function TesteExercise6() {
  const explain = document.getElementById("Exercise6Explain");
  class Irs {
    static irsGroup(x) {
      let result = 0;
      if (x >= 0 && x < 10000) {
        result = 1;
      } else if (x >= 10000 && x <= 25500) {
        result = 2;
      } else if (x > 25500 && x <= 48500) {
        result = 3;
      } else if (x > 48500) {
        result = 4;
      }
      return result;
    }
    static irsTax(x) {
      let result = 0.0;
      if (x == 1) {
        result = 12 / 100;
      } else if (x == 2) {
        result = 18 / 100;
      } else if (x == 3) {
        result = 23 / 100;
      } else if (x == 4) {
        result = 29 / 100;
      }
      return result;
    }
  }
  if (explain){

      const arg1 = Math.floor(Math.random() * 100000) + 1;
      explain.innerHTML = `Rendimento de ${arg1} pertence a grupo ${Irs.irsGroup(arg1)} e tem Taxa de ${Irs.irsTax(Irs.irsGroup(arg1))}`;  
    }
}
function TestefirstDigit() {
  const explain = document.getElementById("firstDigitExplain");
  if (explain){
     const arg1 = Math.floor(Math.random() * 100000) + 1;
     explain.innerHTML = `O primeiro digito de ${arg1} é ${firstDigit(arg1)}`
  }
}
function TestesumMax() {
  const explain = document.getElementById("sumMaxExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 9) + 1;
     explain.innerHTML = `a soma dos números naturais [1, ${arg1}] é ${sumMax(arg1)}`
  }
}
function TestepowerOfTwo() {
  const explain = document.getElementById("powerOfTwoExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 9) + 1;
     explain.innerHTML = `A potencia de 2 de ${arg1} é ${powerOfTwo(arg1)}`
  }
}
function TesteisMultiple() {
  const explain = document.getElementById("isMultipleExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 59) + 1;
    const arg2 = Math.floor(Math.random() * 9) + 1;
    explain.innerHTML = `${arg1} é multiplo de ${arg2}? ${isMultiple(arg1, arg2) ? " Sim" : " Não"}`
  }
}
function TesteintDivision() {
  const explain = document.getElementById("intDivisionExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 59) + 1;
    const arg2 = Math.floor(Math.random() * 9) + 1;
    let arr = [arg1, arg2]
    console.log(arr)
    arr = arr.sort((a, b) => a - b);
    console.log(arr)
    explain.innerHTML = `O quociente da divisão ${arr[1]} por ${arr[0]}? ${intDivision(arr[1], arr[0])}`
  }
}
function TestesumEvenBetween() {
  const explain = document.getElementById("sumEvenBetweenExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 19) + 1;
    const arg2 = Math.floor(Math.random() * 9) + 1;
    let arr = [arg1, arg2]
    arr = arr.sort((a, b) => a - b);
    explain.innerHTML = `a soma dos números naturais pares compreendidos no intervalo [${arr[0]}, ${arr[1]}] ${sumEvenBetween(arr[0], arr[1])}`
  }

}
function TestenextLetter() {
  const explain = document.getElementById("nextLetterExplain");
  if (explain){
    const arg1 =  alpha[Math.floor(Math.random() * alpha.length)]
    explain.innerHTML = `a letra seguinte a '${arg1}' é o '${nextLetter(arg1)}'`
  }
}
function Testeeuclides() {
  const explain = document.getElementById("euclidesExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 19) + 1;
    const arg2 = Math.floor(Math.random() * 19) + 1;
    explain.innerHTML = `o máximo divisor comum de ${arg1} e ${arg2} é ${euclides(arg1, arg2)}`
  }
}
function TesteinvertNumber() {
  const explain = document.getElementById("invertNumberExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 1999) + 1;
    explain.innerHTML = `o numero ${arg1} invertido é: ${invertNumber(arg1)}`
  }
}
function Testefib() {
  const explain = document.getElementById("fibExplain");
  if (explain){
    const arg1 = Math.floor(Math.random() * 19);
    explain.innerHTML = `o n-ésimo (n=${arg1}) número da sequência de Fibonacci é: ${fib(arg1)}`
  }
}
