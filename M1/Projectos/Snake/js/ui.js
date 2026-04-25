function getGrid(){
    const grid = document.createElement("table");
    grid.classList.add("center", "table");
    
    for (let i = 0; i < GS.gridSize; i++) {
    const row = document.createElement("tr");
    GS.grid[i] = [];
    for (let j = 0; j < GS.gridSize; j++) {
        GS.grid[i][j] = "";
        const cell = document.createElement("td");
        cell.dataset.y = `${i}`;
        cell.dataset.x = `${j}`;
        cell.classList.add("gridCellEmpty");
        GS.tdArray.push(cell);
        row.appendChild(cell);
    }
    grid.appendChild(row);
}
return grid;
}

function getHud(){
  const scoreDiv = document.createElement("div");
 
  const pScore = document.createElement("p");
  pScore.innerHTML = `<strong>Score: </strong> <span id="score">0000</span>`;
  const pTimer = document.createElement("p");
  pTimer.innerHTML = `<strong>Time: </strong><span id="time">00:00</span>`;
  scoreDiv.append(pScore, pTimer);
  return scoreDiv
}


function SetUpGameStage(){
    container.innerHTML = "";
    const grid = getGrid();
    const hud = getHud();
    const divAside = document.createElement("div")
    divAside.classList.add("aside");
    const button = document.createElement("button");
    button.innerText = "Novo Jogo";
    button.style.marginTop = "10px";
    button.addEventListener("click", NewGame);
    divAside.append(hud, button)
    container.append(divAside, grid)
}

function renderFood(arrTd){
   const foodCells = arrTd.filter((cell) => GS.foods.some((food) => food.x === Number(cell.dataset.x) && food.y === Number(cell.dataset.y)));
   for (let i = 0; i < foodCells.length; i++){
    foodCells[i].classList = "gridFood";
   }
}
function renderStage(){
    const arrTd = GS.tdArray;
  for (let i = 0; i < arrTd.length; i++) {
    arrTd[i].classList = "gridCellEmpty";
  }
  renderFood(arrTd)
  renderSnake(arrTd)
  updateScoreUI();
}

function updateTimerUI(minutes, seconds) {
  const hudTime = document.getElementById("time");
  if (hudTime) {
    hudTime.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }
}

function updateScoreUI() {
  const hudScore = document.getElementById("score");
  if (hudScore) {
    hudScore.innerHTML = `${String(GS.foodEaten).padStart(4, "0")}`;
  }
}
