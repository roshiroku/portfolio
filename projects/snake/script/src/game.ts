import { settings } from './config.js';
import { Mouse, Pizza } from './game/Food.js';
import Game from "./game/Game.js";
import Snake from "./game/Snake.js";
import { HorizontalWall, VerticalWall } from './game/Wall.js';

const scoreEl = document.getElementById("game-score")!;
const speedEl = document.getElementById("current-speed")!;
const canvasEl = document.getElementById("game-canvas") as HTMLCanvasElement;

export const state: { game?: Game, snake?: Snake } = {};

export function setupGame() {
  state.game?.stop();

  const snake = state.snake = new Snake();
  const game = state.game = new Game(canvasEl, {
    width: 21,
    height: 21,
    scale: getScale(),
    onScore: updateDisplay,
    onStart: updateDisplay
  });

  snake.speed = settings.initialSpeed;
  game.addElement(snake);

  if (settings.enableWalls) {
    game.addElement(
      new HorizontalWall(0, 0, game.width),
      new HorizontalWall(0, game.height - 1, game.width),
      new VerticalWall(0, 1, game.height - 2),
      new VerticalWall(game.width - 1, 1, game.height - 2)
    );
  }

  for (let i = 0; i < settings.pizzaCount; i++) {
    game.addElement(new Pizza());
  }

  if (settings.enableMice) {
    game.addElement(new Mouse());
  }

  game.start();
}

export function getScale() {
  return window.innerWidth > 600 && window.innerHeight > 900 ? 18 : 12;
}

function updateDisplay() {
  scoreEl.innerText = `${state.game!.score}`;
  speedEl.innerText = `${Math.floor(100 * state.snake!.speed) / 100}`;
}