const GS = {
  gridSize: 10,
  grid: [],
  foods: [],
  snake: [],
  tdArray: [],
  snakeInitialSize: 3,
  placeFood: true,
  grow: false,
  moreSpeed: false,
  foodEaten: 0,
  isPaused: true,
  isStarted: false,
  startTime: Date.now(),
  interval: 800,
};

const backdrop = document.getElementById("backdrop");
const container = document.getElementById("container");
const paused = document.getElementById("paused");
const gameover = document.getElementById("gameover");

let timerid = -1;
let timerGame = -1;
let GameTickOn = false;

function isPlaceFood() {
  if (GS.foods.length === 0) GS.placeFood = Math.random() < 0.7 ? true : false;
  else if (GS.foods.length === 1)
    GS.placeFood = Math.random() < 0.1 ? true : false;
  else GS.placeFood = false;

  while (GS.placeFood) {
    let foodx = Math.floor(Math.random() * GS.gridSize);
    let foody = Math.floor(Math.random() * GS.gridSize);
    if (
      !GS.foods.some((i) => i.x === foodx && i.y === foody) &&
      !GS.snake.some((s) => s.x === foodx && s.y === foody)
    ) {
      GS.foods.push({ x: foodx, y: foody });
      GS.placeFood = false;
    }
  }
}
function isDeadSnake() {
  for (let i = 0; i < GS.snake.length; i++) {
    if (
      GS.snake.filter((s) => s.x === GS.snake[i].x && s.y === GS.snake[i].y)
        .length !== 1
    )
      return true;
  }
  return false;
}

function isFoodColision() {
  const NoncolidingFood = GS.foods.filter(
    (food) =>
      !GS.snake.some((element) => element.x === food.x && element.y === food.y),
  );
  if (NoncolidingFood.length !== GS.foods.length) {
    GS.foodEaten += GS.foods.length - NoncolidingFood.length;
    GS.foods = NoncolidingFood;
    GS.grow = true;
    GS.moreSpeed = true;
  }
}
function UpdateSnakePosition() {
  //update Head
  const head = GS.snake[0];
  for (let i = GS.snake.length - 1; i > 0; i--) {
    if (i === GS.snake.length - 1 && GS.grow === true) {
      GS.snake.push({ x: GS.snake[i].x, y: GS.snake[i].y });
      GS.grow = false;
    }
    GS.snake[i].x = GS.snake[i - 1].x;
    GS.snake[i].y = GS.snake[i - 1].y;
  }
  head.x += head.dx;
  head.y += head.dy;

  if (head.x < 0) head.x = GS.gridSize - 1;
  if (head.x > GS.gridSize - 1) head.x = 0;
  if (head.y < 0) head.y = GS.gridSize - 1;
  if (head.y > GS.gridSize - 1) head.y = 0;
}

function GameTick() {
  GameTickOn = true;
  //update snake position
  UpdateSnakePosition();
  //check colisions - death
  if (!isDeadSnake()) {
    //check colisions - food
    isFoodColision();
    //check place food
    isPlaceFood();
    //render food
    //render snake
    renderStage();
    //setnew timeout
    if (!GS.isPaused) {
      if (GS.moreSpeed) {
        GS.interval = Math.max(200, GS.interval - 50);
        GS.moreSpeed = false;
      }
      timerGame = setTimeout(GameTick, GS.interval);
    }
  } else {
    GS.isStarted = false;
    gameover.style.display = "block";
    clearInterval(timerid);
    timerid = -1;
  }
  GameTickOn = false;
}

function timerTick() {
  console.log("TimerTick");
  let elapsed = Date.now() - GS.startTime;
  let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
  updateTimerUI(minutes, seconds);
}

function Reset() {
  GS.grid = [];
  GS.foods = [];
  GS.snake = [];
  GS.tdArray = [];
  GS.interval = 800;
  GS.foodEaten = 0;
  GS.isPaused = true;
  GS.isStarted = false;
  GS.startTime = undefined;
  GS.grow = false;
  GS.moreSpeed = false;
  GS.placeFood = false;
  backdrop.style.display = "none";
  container.style.display = "none";
  paused.style.display = "none";
  gameover.style.display = "none";
  clearInterval(timerid);
  timerid = -1;
  clearInterval(timerGame);
  timerGame = -1;
  GameTickOn = false;
}

function NewGame() {
  Reset();
  createSnake();
  SetUpGameStage();
  renderStage();
  GS.isPaused = true;
  GS.isStarted = true;
  backdrop.style.display = "block";
  container.style.display = "block";
  paused.style.display = "block";
}
function State(state) {
  switch (state) {
    case 0:
      console.log("State " + state);
      Reset();
      break;
    case 1:
      console.log("State " + state);
      createSnake();
      SetUpGameStage();
      renderStage();
      GS.isPaused = true;
      GS.isStarted = true;
      backdrop.style.display = "block";
      container.style.display = "block";
      paused.style.display = "block";
      break;
    case 2:
      console.log("State " + state);
      //gamer running

      break;
  }
}

function EvaluateisPaused() {
  if (GS.isPaused) {
    backdrop.style.display = "block";
    paused.style.display = "block";
    clearInterval(timerid);
    timerid = -1;
  } else {
    backdrop.style.display = "none";
    paused.style.display = "none";
    if (GS.startTime === undefined) GS.startTime = Date.now();
    timerid = setInterval(timerTick, 1000);
    if (!GameTickOn) timerGame = setTimeout(GameTick, GS.interval);
  }
}
function Init() {
  window.addEventListener("keydown", function (e) {
    if (GS.isStarted) {
      if (e.code === "Escape") {
        GS.isPaused = !GS.isPaused;
        EvaluateisPaused();
      }
      if (e.code == "KeyA" || e.code == "ArrowLeft") {
        if (GS.snake[0].dx != 1) {
          GS.snake[0].dx = -1;
          GS.snake[0].dy = 0;
        }
      }
      if (e.code == "KeyD" || e.code == "ArrowRight") {
        if (GS.snake[0].dx != -1) {
          GS.snake[0].dx = 1;
          GS.snake[0].dy = 0;
        }
      }
      if (e.code == "KeyW" || e.code == "ArrowUp") {
        if (GS.snake[0].dy != 1) {
          GS.snake[0].dx = 0;
          GS.snake[0].dy = -1;
        }
      }
      if (e.code == "KeyD" || e.code == "ArrowDown") {
        if (GS.snake[0].dy != -1) {
          GS.snake[0].dy = 1;
          GS.snake[0].dx = 0;
        }
      }
    }
  });
  NewGame();
}
