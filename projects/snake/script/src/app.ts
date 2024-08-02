import "./ui.js";
import "./controls.js";
import { getScale, setupGame, state } from "./game.js";

setupGame();

window.addEventListener("resize", () => {
  state.game!.scale = getScale();
  state.game!.draw();
});