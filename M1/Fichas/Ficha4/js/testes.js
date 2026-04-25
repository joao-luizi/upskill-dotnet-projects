const fname = [
  ["ex01", Testeex01],
  ["sum", Testesum],
  ["ex03", Testeex03],
  ["ex04", Testeex04],
  ["isOrdered", TesteisOrdered],
  ["inverted", Testeinverted],
  ["ex07", Testeex07],
  ["ex08", Testeex08],
  ["ex09", Testeex09],
  ["contains", Testecontains],
  ["count", Testecount],
  ["isPalindrome", TesteisPalindrome],
  ["ex13", Testeex13],
  ["areTheSame", TesteareTheSame],
  ["merge", Testemerge],
  ["subArray", TestesubArray],
  ["leftSide", TesteleftSide],
  ["rightSide", TesterightSide],
  ["alternatedBooleans", TestealternatedBooleans],
  ["invertedBooleans", TesteinvertedBooleans],
];

function Testeex01() {
  let numbers = [4, 3, 2, 1];
  const explain = document.getElementById("ex01Explain");
  if (explain) {
    explain.innerHTML = `numbers = [${numbers}] → sum = [${ex01(numbers)}]`;
  }
}
function Testesum() {
  let numbers = [];
  let l = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < l; i++) {
    numbers.push(Math.floor(Math.random() * 10) + 1);
  }
  const explain = document.getElementById("sumExplain");
  if (explain) {
    explain.innerHTML = `numbers = [${numbers.sort()}] → sum = [${sum(numbers)}]`;
  }
}
function Testeex03() {
  let digits = [];
  digits[9] = undefined;
  const explain = document.getElementById("ex03Explain");
  if (explain) {
    explain.innerHTML = `digits = [${ex03(digits)}]`;
  }
}
function Testeex04() {
  const length = Math.floor(Math.random() * 20) + 1;
  const numbers = ex04(length);
  const explain = document.getElementById("ex04Explain");
  if (explain) {
    explain.innerHTML = `numbers (${length}) = [${numbers}]`;
  }
}
function TesteisOrdered() {
  const length = Math.floor(Math.random() * 10) + 1;
  const orderedNumbers = [];
  for (let i = 0; i < length; i++) {
    orderedNumbers[i] = Math.floor(Math.random() * 10) + 1;
  }
  const numbers = [...orderedNumbers];
  orderedNumbers.sort((a, b) => a - b);
  const explain = document.getElementById("isOrderedExplain");
  if (explain) {
    explain.innerHTML = `numbers [${numbers}] está ordenado por ordem ascendente? ${isOrdered(numbers) ? " Sim" : " Não"}. orderedNumbers [${orderedNumbers}] está ordenado? ${isOrdered(orderedNumbers) ? " Sim" : " Não"}`;
  }
}
function Testeinverted() {
  const length = Math.floor(Math.random() * 10) + 1;
  const numbers = [];
  for (let i = 0; i < length; i++) {
    numbers[i] = Math.floor(Math.random() * 10) + 1;
  }
  const explain = document.getElementById("invertedExplain");
  if (explain) {
    explain.innerHTML = `inverted(${numbers}) → [${inverted(numbers)}]`;
  }
}

function Testeex07() {
  const classEx = new ex07();
  const empty = [];
  const nonEmpty = [10, 15];
  const firstandlast = [9, 8, 7];
  const nextIndex = [1, 2, 3, 4];
  const element = [2, 3, 4, 5];
  const explain = document.getElementById("ex07Explain");
  if (explain) {
    explain.innerHTML = `isEmpty([${empty}]) → ${classEx.isEmpty(empty) ? " Sim" : " Não"};
    isEmpty([${nonEmpty}]) → ${classEx.isEmpty(nonEmpty) ? " Sim" : " Não"};
    first([${firstandlast}]) → ${classEx.first(firstandlast)};
    last([${firstandlast}]) → ${classEx.last(firstandlast)};
    nextIndex([${nextIndex}], 2) → ${classEx.nextIndex(nextIndex, 2)};
    nextIndex([${nextIndex}], 3) → ${classEx.nextIndex(nextIndex, 3)};
    prevIndex([${nextIndex}], 0) → ${classEx.prevIndex(nextIndex, 0)};
    element([${element}], 2) → ${classEx.element(element, 2)};
    element([${element}], -1) → ${classEx.element(element, -1)};`;
  }
}

function Testeex08() {
  const classEx = new ex08();
  const arg1 = [1, 3, 4];
  const arg2 = [1, 3, 4, 5];
  const arg3 = [1, 2, 3];
  const explain = document.getElementById("ex08Explain");
  if (explain) {
    explain.innerHTML = `copyNewSize([${arg1}], 5) → [${classEx.copyNewSize(arg1, 5)}];
copyNewSize([${arg2}], 2) → [${classEx.copyNewSize(arg2, 2)}];
copyNewSize([${arg3}], 3) → [${classEx.copyNewSize(arg3, 3)}];
copy([${arg3}]) → [${classEx.copy(arg3)}];
`;
  }
}

function Testeex09() {
  const classEx = new ex09();
  const arg1 = Math.floor(Math.random() * 10) + 1;
  const arg2 = classEx.randomArray(arg1);
  const arg3 = Math.floor(Math.random() * arg1);
  const explain = document.getElementById("ex09Explain");
  if (explain) {
    explain.innerHTML = `randomArray(${arg1}) → [${arg2}]
randomIndex([${arg2}]) → ${classEx.randomIndex(arg2)}
randomElement([${arg2}]) → ${classEx.randomElement(arg2)}`;
  }
}
function Testecontains() {
  const arg1 = [1, 2, 4, 2];
  const arg2 = [1, 3, 2, 1];

  const explain = document.getElementById("containsExplain");
  if (explain) {
    explain.innerHTML = `contains([${arg1}], 5) → ${contains(arg1, 5)}
contains([${arg2}], 3) → ${contains(arg2, 3)}`;
  }
}

function Testecount() {
  const arg1 = [2, 3, 4, 2, 2];
  const arg2 = [1, 3, 2, 1];

  const explain = document.getElementById("countExplain");
  if (explain) {
    explain.innerHTML = `count([${arg1}], 2) → ${count(arg1, 2)}
  count([${arg2}], 7) → ${count(arg2, 7)}`;
  }
}

function TesteisPalindrome() {
  const arg1 = ["s", "o", "p", "a", "p", "o", "s"];
  const arg2 = ["s", "o", "p", "a"];

  const explain = document.getElementById("isPalindromeExplain");
  if (explain) {
    explain.innerHTML = `isPalindrome([${arg1}]) → ${isPalindrome(arg1)}
  isPalindrome([${arg2}]) → ${isPalindrome(arg2)}`;
  }
}

function Testeex13() {
  const arg1 = [4.2, 2.1, 3.3, 5.0];
  const arg2 = [4.2, 2.1, 3.3, 5.0];
  const arg3 = Math.floor(Math.random() * arg1);
  const explain = document.getElementById("ex13Explain");
  if (explain) {
    explain.innerHTML = `min([${arg1}]) → ${ex13.min(arg1)}
max([${arg1}]) → ${ex13.max(arg1)}
sum([${arg1}]) →${ex13.sum(arg1)}
average([${arg1}]) → ${ex13.average(arg1)}`;
  }
}

function TesteareTheSame() {
  const arg1 = [2, 3, 4, 2, 2];
  const arg2 = [2, 3, 4, 2, 2];
  const arg3 = new ex09().randomArray(5);

  const explain = document.getElementById("areTheSameExplain");
  if (explain) {
    explain.innerHTML = `São iguais [${arg1}] e [${arg2}] → ${areTheSame(arg1, arg2) ? " Sim" : " Não"}
  São iguais [${arg1}] e [${arg3}] → ${areTheSame(arg1, arg3) ? " Sim" : " Não"}`;
  }
}
function Testemerge() {
  const arg1 = [1, 2];
  const arg2 = [3, 4, 5];

  const explain = document.getElementById("mergeExplain");
  if (explain) {
    explain.innerHTML = `merge([${arg1}], [${arg2}]) → [${merge(arg1, arg2)}]`;
  }
}
function TestesubArray() {
  const arg1 = [5, 6, 7, 8, 9];
  const arg2 = [5, 6, 7, 8];

  const explain = document.getElementById("subArrayExplain");
  if (explain) {
    explain.innerHTML = `subArray([${arg1}], 1, 3) → [${subArray(arg1, 1, 3)}]`;
  }
}
function TesteleftSide() {
  const arg1 = [5, 6, 7, 8, 9];
  const arg2 = [5, 6, 7, 8];

  const explain = document.getElementById("leftSideExplain");
  if (explain) {
    explain.innerHTML = `leftSide([${arg2}], false) → [${leftSide(arg2, false)}]`;
  }
}
function TesterightSide() {
  const arg1 = [5, 6, 7, 8, 9];
  const arg2 = [5, 6, 7, 8];

  const explain = document.getElementById("rightSideExplain");
  if (explain) {
    explain.innerHTML = `rightSide([${arg1}], true) → [${rightSide(arg1, true)}]`;
  }
}

function TestealternatedBooleans() {
  const arg1 = [true, false, true, false];
  const arg2 = [true, true, true, false];

  const explain = document.getElementById("alternatedBooleansExplain");
  if (explain) {
    explain.innerHTML = `alternatedBooleans([${arg1}]) → ${alternatedBooleans(arg1)}
alternatedBooleans([${arg2}]) → ${alternatedBooleans(arg2)}`;
  }
}

function TesteinvertedBooleans() {
  const arg1 = [true, false, true];

  const explain = document.getElementById("invertedBooleansExplain");
  if (explain) {
    explain.innerHTML = `invertedBooleans([${arg1}]) → [${invertedBooleans(arg1)}]`;
  }
}
