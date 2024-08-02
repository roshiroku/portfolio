import { setupGame, state } from "./game.js";
import Point from "./game/Point.js";

const startBtn = document.getElementById("start-btn")!;
const upBtn = document.getElementById("up-btn")!;
const downBtn = document.getElementById("down-btn")!;
const leftBtn = document.getElementById("left-btn")!;
const rightBtn = document.getElementById("right-btn")!;
const keyMap = {
  "ArrowUp": upBtn,
  "ArrowDown": downBtn,
  "ArrowLeft": leftBtn,
  "ArrowRight": rightBtn,
  "Enter": startBtn
};

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
startBtn.addEventListener("click", setupGame);
upBtn.addEventListener("click", () => state.snake?.turn(Point.up));
downBtn.addEventListener("click", () => state.snake?.turn(Point.down));
leftBtn.addEventListener("click", () => state.snake?.turn(Point.left));
rightBtn.addEventListener("click", () => state.snake?.turn(Point.right));

function onKeyDown(e: KeyboardEvent) {
  if (e.key in keyMap) {
    const btn = keyMap[e.key as keyof typeof keyMap];
    btn.classList.add("active");
    if (e.key == "Enter") setupGame();
  }
}

function onKeyUp(e: KeyboardEvent) {
  if (e.key in keyMap) {
    const btn = keyMap[e.key as keyof typeof keyMap];
    btn.classList.remove("active");
  }
}