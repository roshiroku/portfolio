import Element from "./Element.js";
import Point from "./Point.js";
import Timer from "./Timer.js";

export default class Game {
  active = false;
  #score = 0;
  readonly elements: Element[] = [];
  readonly width;
  readonly height;
  #scale = 1;
  readonly canvas;
  readonly ctx;
  onScore: () => void;
  onGameOver: () => void;

  get size() {
    return new Point(this.width, this.height);
  }

  get score() {
    return this.#score;
  }

  set score(score) {
    this.#score = score;
    this.onScore();
  }

  get scale() {
    return this.#scale;
  }

  set scale(scale) {
    this.canvas.width = this.width * scale;
    this.canvas.height = this.height * scale;
    this.ctx.scale(scale / this.scale, scale / this.scale);
    this.#scale = scale;
  }

  constructor(canvas: HTMLCanvasElement, {
    width = 21,
    height = 21,
    scale = 20,
    onScore = () => { },
    onGameOver = () => { }
  } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.onScore = onScore;
    this.onGameOver = onGameOver;
  }

  start() {
    if (this.active) return;

    this.active = true;
    Timer.start();
    this.elements.forEach(el => {
      el.start();
      el.draw();
    });
    requestAnimationFrame(this.update);
  }

  update = () => {
    if (!this.active) return;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.elements.forEach(el => {
      el.update();
      el.draw();
    });

    requestAnimationFrame(this.update);
  }

  stop() {
    if (!this.active) return;

    this.active = false;
    Timer.stop();
    this.elements.forEach(el => el.stop());
  }

  addElement(...elements: Element[]) {
    elements.forEach(el => {
      this.elements.push(el);
      el.game = this;
    });
  }

  removeElement(...elements: Element[]) {
    elements.forEach(el => {
      const index = this.elements.indexOf(el);
      if (index > -1) {
        this.elements.splice(index, 1);
        el.game = undefined;
      }
    });
  }
}