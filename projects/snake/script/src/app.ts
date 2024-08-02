import { Pizza, Mouse } from "./game/Food.js";
import Game from "./game/Game.js";
import Point from "./game/Point.js";
import Snake from "./game/Snake.js";
import { HorizontalWall, VerticalWall } from "./game/Wall.js";

// Load settings from local storage or use defaults
const defaultSettings = {
  enableWalls: true,
  initialSpeed: 0.2,
  pizzaCount: 1,
  enableMice: false
};

const settings = JSON.parse(localStorage.getItem('snakeSettings') || JSON.stringify(defaultSettings));

// Elements
const enableWallsInput = document.getElementById("enable-walls") as HTMLInputElement;
const initialSpeedInput = document.getElementById("initial-speed") as HTMLInputElement;
const pizzaCountInput = document.getElementById("pizza-count") as HTMLInputElement;
const enableMiceInput = document.getElementById("enable-mice") as HTMLInputElement;
const initialSpeedValue = document.getElementById("initial-speed-value")!;
const pizzaCountValue = document.getElementById("pizza-count-value")!;
const mainEl = document.querySelector("main")!;
const lightboxEl = document.querySelector(".lightbox")!;
const asideEl = document.querySelector(".settings-section")!;
const canvasEl = document.getElementById("game-canvas") as HTMLCanvasElement;
const scoreEl = document.getElementById("game-score")!;
const speedEl = document.getElementById("current-speed")!;
const menuBtn = document.getElementById("menu-btn")!;
const startBtn = document.getElementById("start-btn")!;
const saveBtn = document.getElementById("save-btn")!;
const defaultBtn = document.getElementById("default-btn")!;
const upBtn = document.getElementById("up-btn")!;
const downBtn = document.getElementById("down-btn")!;
const leftBtn = document.getElementById("left-btn")!;
const rightBtn = document.getElementById("right-btn")!;

// Update UI elements with loaded settings
enableWallsInput.checked = settings.enableWalls;
initialSpeedInput.value = settings.initialSpeed.toString();
pizzaCountInput.value = settings.pizzaCount.toString();
enableMiceInput.checked = settings.enableMice;
initialSpeedValue.innerText = settings.initialSpeed.toFixed(1);
pizzaCountValue.innerText = settings.pizzaCount.toString();

const updateSpeedDisplay = () => initialSpeedValue.innerText = Number(initialSpeedInput.value).toFixed(1);
const updatePizzaCountDisplay = () => pizzaCountValue.innerText = pizzaCountInput.value;

initialSpeedInput.addEventListener("input", updateSpeedDisplay);
pizzaCountInput.addEventListener("input", updatePizzaCountDisplay);

// Game setup
let game: Game;
let snake: Snake;

// Event listeners

saveBtn.addEventListener("click", () => {
  const settings = {
    enableWalls: enableWallsInput.checked,
    initialSpeed: Number(initialSpeedInput.value),
    pizzaCount: Number(pizzaCountInput.value),
    enableMice: enableMiceInput.checked
  };
  localStorage.setItem('snakeSettings', JSON.stringify(settings));
  closeSettings();
  setupGame();
});

defaultBtn.addEventListener("click", () => {
  localStorage.removeItem('snakeSettings');
  enableWallsInput.checked = defaultSettings.enableWalls;
  initialSpeedInput.value = `${defaultSettings.initialSpeed}`;
  pizzaCountInput.value = `${defaultSettings.pizzaCount}`;
  enableMiceInput.checked = defaultSettings.enableMice;
  updateSpeedDisplay();
  updatePizzaCountDisplay();
  closeSettings();
  setupGame();
});

menuBtn.addEventListener("click", () => {
  asideEl.classList.toggle("open");
  mainEl.classList.toggle("shifted");
  lightboxEl.classList.toggle("active");
  for (const el of menuBtn.children) el.classList.toggle("hidden");
});

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
startBtn.addEventListener("click", setupGame);
lightboxEl.addEventListener("click", closeSettings);
upBtn.addEventListener("click", () => snake.turn(Point.up));
downBtn.addEventListener("click", () => snake.turn(Point.down));
leftBtn.addEventListener("click", () => snake.turn(Point.left));
rightBtn.addEventListener("click", () => snake.turn(Point.right));
window.addEventListener("resize", onResize);

// Initial game setup
setupGame();

function setupGame() {
  const enableWalls = enableWallsInput.checked;
  const initialSpeed = Number(initialSpeedInput.value);
  const pizzaCount = Number(pizzaCountInput.value);
  const enableMice = enableMiceInput.checked;

  game?.stop();
  snake = new Snake();
  game = new Game(canvasEl, {
    width: 21,
    height: 21,
    onScore: () => {
      scoreEl.innerText = `${game.score}`;
      speedEl.innerText = `${Math.floor(100 * snake.speed) / 100}`;
    }
  });

  snake.speed = initialSpeed;
  game.addElement(snake);

  if (enableWalls) {
    game.addElement(
      new HorizontalWall(0, 0, game.width),
      new HorizontalWall(0, game.height - 1, game.width),
      new VerticalWall(0, 1, game.height - 2),
      new VerticalWall(game.width - 1, 1, game.height - 2)
    );
  }

  for (let i = 0; i < pizzaCount; i++) {
    game.addElement(new Pizza());
  }

  if (enableMice) {
    game.addElement(new Mouse());
  }

  onResize();
  game.start();
}

function closeSettings() {
  asideEl.classList.remove("open");
  mainEl.classList.remove("shifted");
  lightboxEl.classList.remove("active");
  menuBtn.children[0].classList.remove("hidden");
  menuBtn.children[1].classList.add("hidden");
}

function onKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case "ArrowUp":
      return upBtn.classList.add("active");
    case "ArrowDown":
      return downBtn.classList.add("active");
    case "ArrowLeft":
      return leftBtn.classList.add("active");
    case "ArrowRight":
      return rightBtn.classList.add("active");
    case "Enter":
      setupGame();
      startBtn.classList.add("active");
  }
}

function onKeyUp(e: KeyboardEvent) {
  switch (e.key) {
    case "ArrowUp":
      return upBtn.classList.remove("active");
    case "ArrowDown":
      return downBtn.classList.remove("active");
    case "ArrowLeft":
      return leftBtn.classList.remove("active");
    case "ArrowRight":
      return rightBtn.classList.remove("active");
    case "Enter":
      startBtn.classList.remove("active");
  }
}

function onResize() {
  game.scale = window.innerWidth > 600 && window.innerHeight > 900 ? 18 : 12;
  game.draw();
}