

const alpha = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function abs(x) {
  if (x >= 0) {
    return x;
  } else {
    return -x;
  }
}
function max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}
function min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}
function irsGroup(x) {
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
function irsTax(x) {
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
function firstDigit(x) {
  let remainder = 0;
  while (x > 0) {
    remainder = x % 10;
    x = parseInt(x / 10);
  }
  return remainder;
}
function sumMax(max) {
  let i = 0;
  let sum = 0;
  while (i <= max) {
    sum += i;
    i++;
  }
  return sum;
}
function powerOfTwo(x) {
  let result = 1;
  while (x) {
    result *= 2;
    x--;
  }
  return result;
}
function isMultiple(x, y) {
  let remain = x;
  while (remain >= y) {
    remain -= y;
  }
  if (remain == 0) return true;
  else return false;
}
function intDivision(x, y) {
  let q = 0;
  while (x >= y) {
    x -= y;
    q++;
  }
  return q;
}
function sumEvenBetween(min, max) {
  let result = 0;
  while (min <= max) {
    if (min % 2 == 0) result += min;
    min++;
  }
  return result;
}
function nextLetter(x) {
  let i = 0;
  while (x != alpha[i]) {
    i++;
  }
  if (alpha[i] == "z") return alpha[0];
  else return alpha[i + 1];
}
function euclides(x, y) {
  let tempy;
  while (y > 0) {
    tempy = x % y;
    x = y;
    y = tempy;
  }
  return x;
}
function invertNumber(x) {
  let result = 0;
  while (x > 0) {
    result *= 10;
    result += parseInt(x % 10);
    x = parseInt(x / 10);
  }
  return result;
}
function fib(x) {
  let f1 = 0;
  let f2 = 1;
  let result = 0;
  x--;
  while (x > 0) {
    result = f1 + f2;
    f1 = f2;
    f2 = result;
    x--;
  }
  return result;
}
