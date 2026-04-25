function ex01(m) {
  let sum = 0;
  for (let i = 0; i < m.length; i++) {
    sum = m[i].reduce((acc, curr) => acc + curr, sum);
  }
  return sum;
}

function totalElements(m) {
  let sum = 0;
  for (let i = 0; i < m.length; i++) {
    sum += m[i].length;
  }
  return sum;
}

function longestLineLength(m) {
  let max = 0;
  for (let i = 0; i < m.length; i++) {
    if (m[i].length > max) max = m[i].length;
  }
  return max;
}

function isRectangular(m) {
  let length = m[0].length;
  for (let i = 1; i < m.length; i++) {
    if (m[i].length !== length) return false;
  }
  return true;
}

function isSquare(m) {
  const rows = m.length;
  for (let i = 0; i < rows; i++) {
    if (m[i].length !== rows) return false;
  }
  return true;
}
function rectangularMatrixNaturals(n, m) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < m; j++) {
      matrix[i][j] = i * m + j + 1;
    }
  }
  return matrix;
}

function squareMatrixNaturals(n) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      matrix[i][j] = i * n + j + 1;
    }
  }
  return matrix;
}

function toAbsMatrix(m) {
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      m[i][j] = Math.abs(m[i][j]);
    }
  }
}

function columnFromMatrix(m, colIndex) {
  const elements = [];
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      if (j === colIndex) elements.push(m[i][j]);
    }
  }
  return elements;
}

function transposeMatrix(m) {
  const elements = [];
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      if (!elements[j]) elements[j] = [];
      elements[j][i] = m[i][j];
    }
  }
  return elements;
}

function identityMatrix(n) {
  const elements = [];
  let colIndex = 0;
  let rowIndex = 0;
  for (let i = 0; i < n; i++) {
    elements[i] = [];
    for (let j = 0; j < n; j++) {
      if (j === colIndex && i === rowIndex) {
        elements[i][j] = 1;
        colIndex++;
        rowIndex++;
      } else elements[i][j] = 0;
    }
  }
  return elements;
}

function randomArray(n) {
  let result = [];
  while (n) {
    result.push(Math.floor(Math.random() * 10));
    n--;
  }
  return result;
}
function randomMatrix(n, m, maxValue) {
  const matrix = []
  for (let row = 0; row < n; row++) {
    matrix[row] = randomArray(m);
    for (let j = 0; j < matrix[row].length; j++){
      matrix[row][j] = Math.floor(Math.random() * maxValue);
    }  
  }
  return matrix;
}

function randomSquareMatrix(n){
  return randomMatrix(n,n, 10)
}

function matrix2Vector(m){
  const vector = []
  for (let i = 0; i < m.length; i++){
    for (let j = 0; j < m[i].length; j++){
      vector.push(m[i][j]); 
    }
  }
  return vector;
}

function copyNewSize(arr, n) {
    let i = 0;
    let result = [];
    while (i < n) {
      if (i < arr.length) result[i] = arr[i];
      else result[i] = 0;
      ++i;
    }
    return result;
  }

function vector2Matrix(vec, rows, cols){
  const m = [];
  if ((rows * cols) > vec.length)
      vec = copyNewSize(vec, (rows * cols));
  let vecStep = vec.length / rows;
  for (let i = 0; i < rows; i++){
    m[i] = []
    let vecIndex = i * vecStep;
    for (let j = 0; j < cols; j++){
      m[i][j] = vec[vecIndex + j];
    }
  }
  return m;
}
