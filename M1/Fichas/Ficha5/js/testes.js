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
  ["ex12", Testeex12],
  ["ex13", Testeex13],
];

function Testeex01() {
  let m = [[1, 2], [3, 4, 5], [6]];
  let str = "";
  for (let i = 0; i < m.length; i++) {
    str += `[${m[i]}]`;
    if (i < m.length - 1) str += `,`;
  }
  const explain = document.getElementById("ex01Explain");
  if (explain) {
    explain.innerHTML = `m = [${str}] → sum = ${ex01(m)}`;
  }
}

function Testeex02() {
  let m = [
    [1, 2],
    [3, 4, 5],
  ];
  let str = "";
  for (let i = 0; i < m.length; i++) {
    str += `[${m[i]}]`;
    if (i < m.length - 1) str += `,`;
  }
  const explain = document.getElementById("ex02Explain");
  if (explain) {
    explain.innerHTML = `totalElements([${str}]) → ${totalElements(m)}`;
  }
}

function Testeex03() {
  let m1 = [
    [1, 2],
    [3, 4, 5],
  ];
  let m2 = [[1, 2, 3, 4], [5]];
  let str1 = "";
  let str2 = "";
  for (let i = 0; i < m1.length; i++) {
    str1 += `[${m1[i]}]`;
    if (i < m1.length - 1) str1 += `,`;
  }
  for (let i = 0; i < m2.length; i++) {
    str2 += `[${m2[i]}]`;
    if (i < m2.length - 1) str2 += `,`;
  }
  const explain = document.getElementById("ex03Explain");
  if (explain) {
    explain.innerHTML = `longestLineLength([${str1}]) → ${longestLineLength(m1)}
longestLineLength([${str2}]) → ${longestLineLength(m2)}`;
  }
}

function Testeex04() {
  let m1 = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  let m2 = [
    [1, 2],
    [3, 4, 5],
  ];
  let str1 = "";
  let str2 = "";
  for (let i = 0; i < m1.length; i++) {
    str1 += `[${m1[i]}]`;
    if (i < m1.length - 1) str1 += `,`;
  }
  for (let i = 0; i < m2.length; i++) {
    str2 += `[${m2[i]}]`;
    if (i < m2.length - 1) str2 += `,`;
  }
  const explain = document.getElementById("ex04Explain");
  if (explain) {
    explain.innerHTML = `isRectangular([${str1}]) → ${isRectangular(m1)}
isRectangular([${str2}]) → ${isRectangular(m2)}`;
  }
}

function Testeex05() {
  let m1 = [
    [1, 2],
    [3, 4],
  ];
  let m2 = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  let str1 = "";
  let str2 = "";
  for (let i = 0; i < m1.length; i++) {
    str1 += `[${m1[i]}]`;
    if (i < m1.length - 1) str1 += `,`;
  }
  for (let i = 0; i < m2.length; i++) {
    str2 += `[${m2[i]}]`;
    if (i < m2.length - 1) str2 += `,`;
  }
  const explain = document.getElementById("ex05Explain");
  if (explain) {
    explain.innerHTML = `isSquare([${str1}]) → ${isSquare(m1)}
isSquare([${str2}]) → ${isSquare(m2)}`;
  }
}

function Testeex06() {
  let m1 = rectangularMatrixNaturals(3, 4);

  let str1 = "";

  for (let i = 0; i < m1.length; i++) {
    str1 += `[${m1[i]}]`;
    if (i < m1.length - 1) str1 += `,`;
  }

  const explain = document.getElementById("ex06Explain");
  if (explain) {
    explain.innerHTML = `rectangularMatrixNaturals(3, 4) → [${str1}]`;
  }
}

function Testeex07() {
  let m1 = squareMatrixNaturals(3);

  let str1 = "";

  for (let i = 0; i < m1.length; i++) {
    str1 += `[${m1[i]}]`;
    if (i < m1.length - 1) str1 += `,`;
  }

  const explain = document.getElementById("ex07Explain");
  if (explain) {
    explain.innerHTML = `squareMatrixNaturals(3) → [${str1}]`;
  }
}

function Testeex08() {
  let m1 = [
    [-1, 2, -3],
    [4, -5, 6],
  ];
  let str1 = "";
  for (let i = 0; i < m1.length; i++) {
    str1 += `[${m1[i]}]`;
    if (i < m1.length - 1) str1 += `,`;
  }
  toAbsMatrix(m1);
  let str2 = "";

  for (let i = 0; i < m1.length; i++) {
    str2 += `[${m1[i]}]`;
    if (i < m1.length - 1) str2 += `,`;
  }

  const explain = document.getElementById("ex08Explain");
  if (explain) {
    explain.innerHTML = `toAbsMatrix([${str1}]) → [${str2}]`;
  }
}
function Testeex09() {
  const m1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const m2 = columnFromMatrix(m1, 1);
  let str1 = "";
  for (let i = 0; i < m1.length; i++) {
    str1 += `[${m1[i]}]`;
    if (i < m1.length - 1) str1 += `,`;
  }

  const explain = document.getElementById("ex09Explain");
  if (explain) {
    explain.innerHTML = `columnFromMatrix([${str1}], 1) → [${m2}]`;
  }
}
function Testeex10() {
  const m1 = [
   [1,2,3],[4,5,6]
  ];
  const m2 = transposeMatrix(m1);
  let str1 = "";
  let str2 = "";
  for (let i = 0; i < m1.length; i++) {
    str1 += `[${m1[i]}]`;
    if (i < m1.length - 1) str1 += `,`;
  }
   for (let i = 0; i < m2.length; i++) {
    str2 += `[${m2[i]}]`;
    if (i < m2.length - 1) str2 += `,`;
  }

  const explain = document.getElementById("ex10Explain");
  if (explain) {
    explain.innerHTML = `transposeMatrix([${str1}]) → [${str2}]`;
  }
}
function Testeex11() {
  const m1 = identityMatrix(3)
  
  let str1 = "";
  
  for (let i = 0; i < m1.length; i++) {
    str1 += `[${m1[i]}]`;
    if (i < m1.length - 1) str1 += `,`;
  }

  const explain = document.getElementById("ex11Explain");
  if (explain) {
    explain.innerHTML = `identityMatrix(3) → [${str1}]`;
  }
}

function Testeex12() {
  const m1 = randomMatrix(3, 5, 50)
  const m2 = randomSquareMatrix(5)
  let str1 = "";
  for (let i = 0; i < m1.length; i++) {
    str1 += `[${m1[i]}]`;
    if (i < m1.length - 1) str1 += `,`;
  }

   let str2 = "";
  for (let i = 0; i < m2.length; i++) {
    str2 += `[${m2[i]}]`;
    if (i < m2.length - 1) str2 += `,`;
  }

  const explain = document.getElementById("ex12Explain");
  if (explain) {
    explain.innerHTML = `randomMatrix(3, 5, 50) → [${str1}]; randomSquareMatrix(5) → [${str2}]`;
  }
}

function Testeex13() {
  const m1 = [[1, 2, 3], [4, 5, 6]]
  const m2 = [1, 2, 3, 4, 5, 6]
  const m3 = vector2Matrix(m2, 2, 2);
  const m4 = vector2Matrix(m2, 2, 4);
  let str1 = "";
  for (let i = 0; i < m1.length; i++) {
    str1 += `[${m1[i]}]`;
    if (i < m1.length - 1) str1 += `,`;
  }

   let str2 = "";
  for (let i = 0; i < m3.length; i++) {
    str2 += `[${m3[i]}]`;
    if (i < m3.length - 1) str2 += `,`;
  }

  let str3 = "";
  for (let i = 0; i < m4.length; i++) {
    str3 += `[${m4[i]}]`;
    if (i < m4.length - 1) str3 += `,`;
  }

  const explain = document.getElementById("ex13Explain");
  if (explain) {
    explain.innerHTML = `matrix2Vector([${str1}]) → [${matrix2Vector(m1)}]; vector2Matrix([${m2}], 2, 2) → [${str2}]; vector2Matrix([${m2}], 2, 4) → [${str3}]`;
  }
}