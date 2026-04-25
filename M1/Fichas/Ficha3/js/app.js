function randomUntil(x) {
  let result = x + 1;
  result = Math.floor(Math.random() * x);
  return result;
}
function randomWithin(min, max) {
  let result = max + 1;
  while (result < min || result > max) {
    result = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return result;
}
function randomEven(max) {
  result = max + 1;
  while (result === 0 || result > max || result % 2 != 0) {
    result = Math.floor(randomUntil(max));
  }
  result = result.toFixed(1);
  return parseFloat(result);
}
function randomOdd(max) {
  result = max + 1;
  while (result > max || result % 2 == 0) {
    result = Math.floor(randomUntil(max));
  }
  result = result.toFixed(1);
  return parseFloat(result);
}
function sqrt(x) {
  let result = Math.sqrt(x);
  console.log(result);
  console.log(Math.floor(result));
  return result === Math.floor(result) ? true : false;
}
class ex4 {
  countDivisors(x) {
    let i = 0;
    let count = 0;
    while (i <= x) {
      if (x % i == 0) count++;
      i++;
    }
    return count;
  }
  sumProperDivisors(x) {
    let i = 0;
    let sum = 0;
    while (i < x) {
      if (x % i == 0) sum += i;
      i++;
    }
    return sum;
  }
  isPrime(x) {
    if (x <= 1) return false;
    let i = 2;
    let count = 0;
    while (i < x) {
      if (x % i == 0) {
        count++;
      }
      i++;
    }
    return count > 0 ? false : true;
  }
}
class ex5 {
  countPrimes(x) {
    let sum = 0;
    for (let i = 2; i <= x; i++) {
      let ex = new ex4();
      if (ex.isPrime(i)) sum++;
    }
    return sum;
  }
  existsPrimeBetween(x, y) {
    let found = false;
    let ex = new ex4();
    while (!found && x <= y) {
      if (ex.isPrime(x)) found = true;
      x++;
    }
    return found;
  }
}

class ex6 {
  isPerfect(x) {
    let sum = 0;
    let i = 0;
    while (i < x) {
      if (x % i == 0) sum += i;
      i++;
    }
    return x == sum ? true : false;
  }
  countPerfectNumbers(x) {
    let i = 2;
    let sum = 0;
    while (i < x) {
      if (this.isPerfect(i)) sum++;
      i++;
    }
    return sum;
  }
}
function largestPrimeDiff(max) {
  let arr = [];
  const ex = new ex4();
  for (let i = 1; i < max; i++) {
    if (ex.isPrime(i)) arr.push(i);
  }
  if (arr.length == 0) return 0;
  else if (arr.length === 1) return arr[0];
  else {
    return arr[arr.length - 1] - arr[arr.length - 2];
  }
}
