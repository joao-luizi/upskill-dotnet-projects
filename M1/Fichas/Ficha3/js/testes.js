const fname = [
  ["randomUntil", TesterandomUntil],
  ["randomWithin", TesterandomWithin],
  ["randomEven", TesterandomEven],
  ["randomOdd", TesterandomOdd],
  ["sqrt", Testesqrt],
  ["Ex4", TesteEx4],
  ["Ex5", TesteEx5],
  ["Ex6", TesteEx6],
  ["largestPrimeDiff", TestelargestPrimeDiff],
];

function TesterandomUntil() {
  const explain = document.getElementById("randomUntilExplain");
  if (explain) {
    const arg1 = randomUntil(10) + 5;
    explain.innerHTML = `randomUntil(${arg1}) → ${randomUntil(arg1)}`;
  }
}
function TesterandomWithin() {
  const explain = document.getElementById("randomWithinExplain");
  if (explain) {
    const arg2 = Math.floor(Math.random() * 5) + 10;
    const arg1 = Math.floor(Math.random() * 5);
    explain.innerHTML = `randomWithin(${arg1}, ${arg2}) → ${randomWithin(arg1, arg2)}`;
  }
}
function TesterandomEven() {
  const explain = document.getElementById("randomEvenExplain");
  if (explain) {
    const arg1 = Math.floor(Math.random() * 50) + 4;
    explain.innerHTML = `randomEven(${arg1}) → ${randomEven(arg1)}`;
  }
}
function TesterandomOdd() {
  const explain = document.getElementById("randomOddExplain");
  if (explain) {
    const arg1 = Math.floor(Math.random() * 50) + 4;
    explain.innerHTML = `randomOddExplain(${arg1}) → ${randomOdd(arg1)}`;
  }
}
function Testesqrt() {
  const explain = document.getElementById("sqrtExplain");
  if (explain) {
    const arg1 = Math.floor(Math.random() * 9) + 1;
    explain.innerHTML = `É um quadrado perfeito ${arg1}? ${sqrt(arg1) ? " Sim" : " Não"}`;
  }
}

function TestelargestPrimeDiff() {
  const explain = document.getElementById("largestPrimeDiffExplain");
  if (explain) {
    const arg1 = Math.floor(Math.random() * 29) + 1;
    explain.innerHTML = `largestPrimeDiff(${arg1}) → ${largestPrimeDiff(arg1)}`;
  }
}

function TesteEx4() {
  const explain = document.getElementById("Ex4Explain");
  if (explain) {
    const classEx = new ex4();
    const arg1 = Math.floor(Math.random() * 9) + 1;
    const arg2 = Math.floor(Math.random() * 9) + 1;
    const arg3 = Math.floor(Math.random() * 9) + 1;
    explain.innerHTML = `countDivisors(${arg1}) → ${classEx.countDivisors(arg1)}
    sumProperDivisors(${arg2}) → ${classEx.sumProperDivisors(arg1)}
    isPrime(${arg3}) →${classEx.isPrime(arg3)}`;
  }
}
function TesteEx5() {
  const explain = document.getElementById("Ex5Explain");
  if (explain) {
    const classEx = new ex5();
    const arg1 = Math.floor(Math.random() * 9) + 1;
    const arg2 = Math.floor(Math.random() * 9) + 1;
    const arg3 = Math.floor(Math.random() * 9) + 1;
    let arr = [arg1, arg3].sort();
    explain.innerHTML = `countPrimes(${arg1}) → ${classEx.countPrimes(arg1)}
    existsPrimeBetween(${arr[0]}, ${arr[1]}) → ${classEx.existsPrimeBetween(arr[0], arr[1])}`;
  }
}
function TesteEx6() {
  const explain = document.getElementById("Ex6Explain");
  if (explain) {
    const classEx = new ex6();
    const arg1 = Math.floor(Math.random() * 9) + 1;
    const arg2 = Math.floor(Math.random() * 30) + 10;

    explain.innerHTML = `isPerfect(${arg1}) → ${classEx.isPerfect(arg1)}
    countPerfectNumbers(${arg2}) → ${classEx.countPerfectNumbers(arg2)}`;
  }
}
