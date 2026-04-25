function ex01(numbers) {
  
  let sum = numbers.reduce((acc, num) => {
    const last = acc.length ? acc[acc.length - 1] : 0;
    acc.push(last + num);
    return acc;
  }, []);
  return sum;
}
function sum(x) {
  let initialValue = 0;
  let sum = x.reduce((acc, num) => {
    const last = acc.length ? acc[acc.length - 1] : 0;
    acc += num;
    return acc;
  }, initialValue);
  return sum;
}
function ex03() {
  let x = [];
  let i = 0;
  while (x.length < 10) {
    x[i] = i;
    ++i;
  }
  return x;
}
function ex04(n) {
  let arr = [];
  let i = 1;
  while (i < n) {
    arr[i - 1] = i;
    ++i;
  }
  return arr;
}
function isOrdered(x) {
  let i = 0;
  while (i < x.length - 1) {
    if (x[i] > x[i + 1]) return false;
    i++;
  }
  return true;
}
function inverted(arr) {
  //let inverted = arr.slice();
  const inverted = [...arr];
  return inverted.reverse();
}
class ex07 {
  isEmpty(arr) {
    return arr.length == 0;
  }
  first(arr) {
    if (this.isEmpty(arr)) return undefined;
    else return arr[0];
  }
  last(arr) {
    if (this.isEmpty(arr)) return undefined;
    else return arr[arr.length - 1];
  }
  nextIndex(arr, index) {
    return index == arr.length - 1? 0 : index + 1;
  }
  prevIndex(arr, index) {
    return index == 0 ? arr.length - 1 : index - 1;
  }
  element(arr, index) {
    let i;
    if (index < 0) i = arr.length;
    else i = 0;
    return arr[i + index];
  }
}
class ex08 {
  copyNewSize(arr, n) {
    let i = 0;
    let result = [];
    while (i < n) {
      if (i < arr.length) result[i] = arr[i];
      else result[i] = 0;
      ++i;
    }
    return result;
  }
  copy(arr) {
    return this.copyNewSize(arr, arr.length);
  }
}
class ex09 {
  randomArray(n) {
    let result = [];
    while (n) {
      result.push(Math.floor(Math.random() * 10));
      n--;
    }
    return result;
  }
  randomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  }
  randomElement(arr) {
    return arr[this.randomIndex(arr)];
  }
}

function contains(arr, x) {
  return arr.includes(x);
}

function count(arr, x) {
  return arr.reduce((total, y) => (y == x ? total + 1 : total), 0);
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

class ex13{
  static min(arr){
    return Math.min(...arr);
  }
  static max(arr){
    return Math.max(...arr);
  }
  static sum(arr){
    return sum(arr);
  }
  static average(arr){
    return this.sum(arr) / arr.length;
  }

}

function areTheSame(arr1, arr2) {
  if (arr1.length != arr2.length) return false;
  let i = 0;
  while (i < arr1.length) {
    if (arr1[i] != arr2[i]) return false;
    i++;
  }
  return true;
}
function merge(left, right) {
  let i = 0;
  let result = [];
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  i = 0;
  while (i < right.length) {
    result.push(right[i]);
    i++;
  }
  return result;
}
function subArray(arr, x, y) {
  let i = x;
  let result = [];
  while (i <= y) {
    result[result.length] = arr[i];
    i++;
  }
  return result;
}
function leftSide(arr, b) {
  let i = 0;
  let end;
  if (b) end = Math.round(arr.length / 2);
  else end = Math.round((arr.length - 1) / 2);
  let result = [];
  while (i < end) {
    result[i] = arr[i];
    i++;
  }
  return result;
}
function rightSide(arr, b) {
  let i;
  let j = 0;
  if (b) i = Math.floor(arr.length / 2);
  else i = Math.floor((arr.length + 1) / 2);
  let result = [];
  while (i < arr.length) {
    result[j] = arr[i];
    i++;
    j++;
  }
  return result;
}

function alternatedBooleans(arr) {
  let bool = arr[0];
  let i = 0;
  while (i < arr.length) {
    if (arr[i] != bool) return false;
    i++;
    bool = !bool;
  }
  return true;
}

function invertedBooleans(arr) {
  let i = 0;
  let result = [];
  while (i < arr.length) {
    result[i] = !arr[i];
    i++;
  }
  return result;
}
