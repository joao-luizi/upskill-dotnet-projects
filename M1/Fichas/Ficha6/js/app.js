function ex01(string) {
  return string.length;
}

function toUpper(string) {
  return string.toUpperCase();
}

function containsSubstring(haystack, needle) {
  return haystack.includes(needle);
}

function reverseString(string) {
  let reversed = "";
  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i];
  }
  return reversed;
}

function countVowels(string) {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (
      string[i] === "a" ||
      string[i] === "e" ||
      string[i] === "i" ||
      string[i] === "o" ||
      string[i] === "u"
    )
      count++;
  }
  return count;
}
function replaceCharacter(string, target, replace) {
  let replaced = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] == target) replaced += replace;
    else replaced += string[i];
  }
  return replaced;
}

function isPalindrome(arr) {
  let i = 0;
  let result = true;
  while (result && i < arr.length) {
    if (arr[i] != arr[arr.length - (1 + i)]) result = false;
    ++i;
  }
  return result;
}

function mostFrequentChar(string) {
  const counter = {};
  for (let i = 0; i < string.length; i++) {
    if (counter[string[i]]) counter[string[i]]++;
    else counter[string[i]] = 1;
  }
  let max = undefined;
  for (key in counter) {
    if (!max) max = { key: key, value: counter[key] };
    if (max.value < counter[key]) {
      max.key = key;
      max.value = counter[key];
    }
  }
  return max.key;
}

function getInitials(string) {
  let initials = "";
  let isinitial = true;
  for (let i = 0; i < string.length; i++) {
    if (isinitial) {
      initials += string[i] + ".";
      isinitial = false;
    }
    if (string[i] === " ") isinitial = true;
  }
  return initials;
}

function countWords(string) {
  let count = 0;
  let isWord = true;
  for (let i = 0; i < string.length; i++) {
    if (isWord && string[i] !== " ") {
      count++;
      isWord = false;
    }
    if (string[i] === " ") isWord = true;
  }
  return count;
}

class AllFunctions {
  countWords = countWords;
  getInitials = getInitials;
  mostFrequentChar = mostFrequentChar;
  isPalindrome = isPalindrome;
  replaceCharacter = replaceCharacter;
  countVowels = countVowels;
  reverseString = reverseString;
  containsSubstring = containsSubstring;
  toUpper = toUpper;
  ex01 = ex01;
}
