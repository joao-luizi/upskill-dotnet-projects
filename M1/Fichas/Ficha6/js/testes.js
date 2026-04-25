const fname = [
  ["ex01", Testeex01],
  ["ex02", Testeex02],
  ["ex03", Testeex03],
  ["ex04", Testeex04],
  ["ex05", Testeex05],
  ["ex06", Testeex06],
  ["ex07", Testeex07],
  ["ex08", Testeex08],
  ["ex09", Testeex09],
  ["ex10", Testeex10],
  ["ex11", Testeex11],

];

function Testeex01() {
  const string = "Cadeia de caracteres"
  const explain = document.getElementById("ex01Explain");
  if (explain) {
    explain.innerHTML = `A string: ${string} tem ${ex01(string)} caracteres.`;
  }
}

function Testeex02() {
  const string = "Cadeia de caracteres"
  const explain = document.getElementById("ex02Explain");
  if (explain) {
    explain.innerHTML = `toUpper(${string}) → ${toUpper(string)}`;
  }
}

function Testeex03() {
  
  const explain = document.getElementById("ex03Explain");
  if (explain) {
    explain.innerHTML = `containsSubstring("JavaScript", "Script") → ${containsSubstring("JavaScript", "Script")}`;
  }
}

function Testeex04() {
  
  const explain = document.getElementById("ex04Explain");
  if (explain) {
    explain.innerHTML = `reverseString("hello") → "${reverseString("hello")}"`;
  }
}

function Testeex05() {
  const str1 = "aeiou"
  const str2 = "qwerty"
  const explain = document.getElementById("ex05Explain");
  if (explain) {
    explain.innerHTML = `countVowels(${str1}) → ${countVowels(str1)}
countVowels([${str2}]) → ${countVowels(str2)}`;
  }
}

function Testeex06() {
  

  const explain = document.getElementById("ex06Explain");
  if (explain) {
    explain.innerHTML = `replaceCharacter("hello world", "o", "a") → "${replaceCharacter("hello world", "o", "a")}"`;
  }
}

function Testeex07() {
 
  const explain = document.getElementById("ex07Explain");
  if (explain) {
    explain.innerHTML = `isPalindrome("madam") → ${isPalindrome("madam")}
isPalindrome("hello") → ${isPalindrome("hello")}`;
  }
}

function Testeex08() {
  

  const explain = document.getElementById("ex08Explain");
  if (explain) {
    explain.innerHTML = `mostFrequentChar("javascript") → "${mostFrequentChar("javascript")}"`;
  }
}
function Testeex09() {
 
  const explain = document.getElementById("ex09Explain");
  if (explain) {
    explain.innerHTML = `getInitials("John Doe") → “${getInitials("John Doe")}”`;
  }
}
function Testeex10() {
  
  const explain = document.getElementById("ex10Explain");
  if (explain) {
    explain.innerHTML = `countWords("quatro palavras nesta frase") → ${countWords("quatro palavras nesta frase")}`;
  }
}
function Testeex11() {
  
  const classEx = new AllFunctions();
  const explain = document.getElementById("ex11Explain");
  if (explain) {
    explain.innerHTML = `countWords("quatro palavras nesta frase") → ${classEx.countWords("quatro palavras nesta frase")}`;
  }
}

