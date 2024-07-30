import { Pizza, Mouse } from "./game/Food.js";
import Game from "./game/Game.js";
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
const enableWallsInput = document.getElementById("enable-walls");
const initialSpeedInput = document.getElementById("initial-speed");
const pizzaCountInput = document.getElementById("pizza-count");
const enableMiceInput = document.getElementById("enable-mice");
const initialSpeedValue = document.getElementById("initial-speed-value");
const pizzaCountValue = document.getElementById("pizza-count-value");
const canvas = document.getElementById("game-canvas");
const scoreEl = document.getElementById("game-score");
const speedEl = document.getElementById("current-speed");
const playBtn = document.getElementById("play-btn");
const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");
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
let game;
let snake;
const setupGame = () => {
    const enableWalls = enableWallsInput.checked;
    const initialSpeed = Number(initialSpeedInput.value);
    const pizzaCount = Number(pizzaCountInput.value);
    const enableMice = enableMiceInput.checked;
    game?.stop();
    snake = new Snake();
    game = new Game(canvas, {
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
        game.addElement(new HorizontalWall(0, 0, game.width), new HorizontalWall(0, game.height - 1, game.width), new VerticalWall(0, 1, game.height - 2), new VerticalWall(game.width - 1, 1, game.height - 2));
    }
    for (let i = 0; i < pizzaCount; i++) {
        game.addElement(new Pizza());
    }
    if (enableMice) {
        game.addElement(new Mouse());
    }
    game.start();
};
// Event listeners
playBtn.addEventListener("click", setupGame);
saveBtn.addEventListener("click", () => {
    const settings = {
        enableWalls: enableWallsInput.checked,
        initialSpeed: Number(initialSpeedInput.value),
        pizzaCount: Number(pizzaCountInput.value),
        enableMice: enableMiceInput.checked
    };
    localStorage.setItem('snakeSettings', JSON.stringify(settings));
});
resetBtn.addEventListener("click", () => {
    localStorage.removeItem('snakeSettings');
    enableWallsInput.checked = defaultSettings.enableWalls;
    initialSpeedInput.value = `${defaultSettings.initialSpeed}`;
    pizzaCountInput.value = `${defaultSettings.pizzaCount}`;
    enableMiceInput.checked = defaultSettings.enableMice;
    updateSpeedDisplay();
    updatePizzaCountDisplay();
});
// Initial game setup
setupGame();
