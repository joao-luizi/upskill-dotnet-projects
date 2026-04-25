function createSnake() {
  const row = Math.floor(GS.gridSize / 2);
  const col = Math.floor(GS.gridSize / 2);
  const snake = GS.snake;

  //Hook Left To Up
  //snake[0] = { x: col, y: row };
  //snake[1] = { x: col + 1, y: row };
  //snake[2] = { x: col + 1, y: row - 1 };

  //Hook Up To Left
  //snake[2] = { x: col, y: row };
  //snake[1] = { x: col + 1, y: row };
  //snake[0] = { x: col + 1, y: row - 1 };

  //Hook Left To Down
  //snake[0] = { x: col, y: row };
  //snake[1] = { x: col + 1, y: row };
  //snake[2] = { x: col + 1, y: row + 1};

  //Hook Down To Left
  //snake[2] = { x: col, y: row };
  //snake[1] = { x: col + 1, y: row };
  //snake[0] = { x: col + 1, y: row + 1};

  //Hook Right To Up
  //snake[0] = { x: col, y: row };
  //snake[1] = { x: col - 1, y: row };
  //snake[2] = { x: col - 1, y: row - 1 };

  //Hook Up To Right
  //snake[2] = { x: col, y: row };
  //snake[1] = { x: col - 1, y: row };
  //snake[0] = { x: col - 1, y: row - 1 };

  //Hook Right To Down
  //snake[0] = { x: col, y: row };
  //snake[1] = { x: col - 1, y: row };
  //snake[2] = { x: col - 1, y: row + 1};

  //Hook Down To Right
  //snake[2] = { x: col, y: row };
  //snake[1] = { x: col - 1, y: row };
  //snake[0] = { x: col - 1, y: row + 1 };

  //Straight Right
  //snake[0] = { x: col, y: row };
  //snake[1] = { x: col - 1, y: row };
  //snake[2] = { x: col - 2, y: row};

  //Straight Left
  //snake[0] = { x: col, y: row };
  //snake[1] = { x: col + 1, y: row };
  //snake[2] = { x: col + 2, y: row};

//  snake[2] = { x: 9, y: 0, dx: 0, dy: -1 };
  //snake[1] = { x: 0, y: 0, dx: 0, dy: -1 };
  //snake[0] = { x: 0, y: 9, dx: 0, dy: -1 };
  //Straight up
  snake[0] = { x: col, y: row, dx: 0, dy: -1 };
  snake[1] = { x: col, y: row + 1 };
  snake[2] = { x: col, y: row + 2 };
  //snake[3] = { x: col, y: row + 3 };
  //snake[4] = { x: col, y: row + 4 };

  //Straight Down
  //snake[0] = { x: col, y: row };
  //snake[1] = { x: col, y: row - 1 };
  //snake[2] = { x: col, y: row - 2 };
  //GS.snake = snake;
}

function renderHead(i, target) {
  const currX = GS.snake[i].x;
  const currY = GS.snake[i].y;
  const nextX = GS.snake[i + 1].x;
  const nextY = GS.snake[i + 1].y;
  if (nextY === currY) {
    if (currX === 0 && nextX == GS.gridSize - 1)
      target.classList = "gridHeadRight";
    else if (nextX == 0 && currX === GS.gridSize - 1)
      target.classList = "gridHeadLeft";
    else if (nextX > currX) target.classList = "gridHeadLeft";
    else target.classList = "gridHeadRight";
  } else if (nextX === currX) {
    if (currY === 0 && nextY == GS.gridSize - 1)
      target.classList = "gridHeadDown";
    else if (nextY == 0 && currY === GS.gridSize - 1)
      target.classList = "gridHeadUp";
    else if (nextY > currY) target.classList = "gridHeadUp";
    else target.classList = "gridHeadDown";
  }
}

function renderTail(i, target) {
  const currX = GS.snake[i].x;
  const currY = GS.snake[i].y;
  const nextX = GS.snake[i - 1].x;
  const nextY = GS.snake[i - 1].y;
  if (nextY === currY) {
    if (currX === 0 && nextX == GS.gridSize - 1)
      target.classList = "gridTailLeft";
    else if (nextX == 0 && currX === GS.gridSize - 1)
      target.classList = "gridTailRight";
    else if (nextX > currX) target.classList = "gridTailRight";
    else target.classList = "gridTailLeft";
  } else if (nextX === currX) {
    if (currY === 0 && nextY == GS.gridSize - 1)
      target.classList = "gridTailUp";
    else if (nextY == 0 && currY === GS.gridSize - 1)
      target.classList = "gridTailDown";
    else if (nextY > currY) target.classList = "gridTailDown";
    else target.classList = "gridTailUp";
  }
}

function renderBody(i, target) {
  const prevX = GS.snake[i - 1].x;
  const prevY = GS.snake[i - 1].y;
  const currX = GS.snake[i].x;
  const currY = GS.snake[i].y;
  const nextX = GS.snake[i + 1].x;
  const nextY = GS.snake[i + 1].y;
 
  console.log({prevX: prevX, prevY: prevY, currX: currX, currY: currY, nextX: nextX, nextY: nextY})
  if (prevY === 0 && currY == GS.gridSize - 1) {
    console.log(prevY);
  }
  if (prevX === currX && nextX === currX) {
    target.classList = "gridBodyVertical";
  } else if (prevY === currY && nextY === currY) {
    target.classList = "gridBodyHorizontal";
  } else if (prevX > currX && nextY > currY) {
    //
    if (prevX == GS.gridSize - 1 && nextX == 0){
      if (currX === 0 && currY === 0)
        target.classList = "gridBodyLeftUp";
        else
      target.classList = "gridBodyLeftDown";
    }
    else{
      if (currY === 0 && nextY === GS.gridSize - 1)
      target.classList = "gridBodyRightUp";
    else
      target.classList = "gridBodyRightDown";

    }
  } else if (prevX > currX && nextY < currY) {
    //
    if (prevX == GS.gridSize - 1 && nextX == 0)
    {
      if (currX === 0 && currY === GS.gridSize - 1)
        target.classList = "gridBodyLeftDown";
        else
      target.classList = "gridBodyLeftUp";
    }
    else{
      if (currY === GS.gridSize - 1 && nextY === 0)
      target.classList = "gridBodyRightDown";
    else
      target.classList = "gridBodyRightUp";

    } 
  } else if (prevX < currX && nextY > currY) {
    //
    if (prevX == 0 && nextX == GS.gridSize - 1){
      if (currX === GS.gridSize - 1 && currY === 0)
        target.classList = "gridBodyRightUp";
        else
      target.classList = "gridBodyRightDown";
    }
    else {
      if (prevY === 0 && nextY === GS.gridSize - 1)
        target.classList = "gridBodyLeftUp";
      else target.classList = "gridBodyLeftDown";
    }
  } else if (prevX < currX && nextY < currY) {
    //
    if (prevX == 0 && nextX == GS.gridSize - 1)
    {
      if (currX === GS.gridSize -1 && currY === GS.gridSize -1)
        target.classList = "gridBodyRightDown";
        else
      target.classList = "gridBodyRightUp";
    }
    else {
      if (currY == GS.gridSize - 1 && nextY == 0)
        target.classList = "gridBodyLeftDown";
      else
        target.classList = "gridBodyLeftUp";
    }
  } else if (prevY > currY && currX < nextX) {
    //
    if (prevY == GS.gridSize - 1 && nextY == 0){
      if (currX === 0 && currY ===0)
        target.classList = "gridBodyLeftUp";
        else
      target.classList = "gridBodyRightUp";
    }
    else{
      if (currX === 0 && nextX === GS.gridSize - 1)
      target.classList = "gridBodyLeftDown";
    else
      target.classList = "gridBodyRightDown";
    } 
  } else if (prevY < currY && currX < nextX) {
    //
    if (prevY == 0 && nextY == GS.gridSize - 1){
      if (currX === 0 && currY === 9)
        target.classList = "gridBodyLeftDown";
        else
      target.classList = "gridBodyRightDown";
    }
    else{
      if (currX === 0 && nextX === GS.gridSize - 1)
      target.classList = "gridBodyLeftUp";
      else
      target.classList = "gridBodyRightUp";

    } 
  } else if (prevY > currY && currX > nextX) {
    //
    if (prevY == GS.gridSize - 1 && nextY == 0){
      if (currX === GS.gridSize - 1 && currY == 0)
        target.classList = "gridBodyRightUp";
        else
      target.classList = "gridBodyLeftUp";

    }
    else{
      if (currX === GS.gridSize - 1 && nextX === 0)
        target.classList = "gridBodyRightDown";
      else
      target.classList = "gridBodyLeftDown";
    } 
  } else if (prevY < currY && currX > nextX) {
    //
    if (prevY == 0 && nextY == GS.gridSize - 1){
      if (currX === GS.gridSize - 1 && currY === GS.gridSize -1)
        target.classList = "gridBodyRightDown";
        else
      target.classList = "gridBodyLeftDown";
    }
    else{
      if(currX === GS.gridSize -1 && nextX === 0)
        target.classList = "gridBodyRightUp";
      else
        target.classList = "gridBodyLeftUp";
    } 
  } else {
    target.classList = "gridCellGeneric";
  }
}
function renderSnake(arrTd) {
  for (let i = 0; i < GS.snake.length; i++) {
    const target = arrTd.find(
      (item) =>
        Number(item.dataset.x) === GS.snake[i].x &&
        Number(item.dataset.y) === GS.snake[i].y,
    );
    if (target) {
      if (i === 0) {
        renderHead(i, target);
      } else if (i === GS.snake.length - 1) {
        renderTail(i, target);
      } else {
        renderBody(i, target);
      }
    }
  }
}
