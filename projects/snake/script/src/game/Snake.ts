import Element, { AnimatedElement } from "./Element.js";
import Food from "./Food.js";
import Point from "./Point.js";
import Timer from "./Timer.js";

export default class Snake extends AnimatedElement {
  color = "green";
  dir = Point.right;
  nextDir = Point.right;
  minUpdateRate = 50;
  nextMoveTime = 0;
  #speed = 0.25;
  // drawColliders = true;

  get speed() {
    return this.#speed;
  }

  set speed(speed) {
    const nextMoveTime = this.nextMoveTime - this.updateRate;
    this.#speed = Math.max(0.1, Math.min(speed, 1));
    this.nextMoveTime = nextMoveTime + this.updateRate;
  }

  get updateRate() {
    return this.minUpdateRate / this.speed;
  }

  start() {
    super.start();
    const { width, height } = this.game!;
    const middle = new Point(Math.floor(width / 2), Math.floor(height / 2));
    this.pixels = [new Point(middle)];
    this.prevPixels = [new Point(middle)];
    this.nextPixels = [new Point(middle)];
    window.addEventListener("keydown", this.onKeyDown);
  }

  update() {
    super.update();

    if (Timer.elapsed >= this.nextMoveTime) {
      this.move();
      this.handleCollisions(this.game!.elements);
    }

    const progress = this.game?.active ? 1 - (this.nextMoveTime - Timer.elapsed) / this.updateRate : 0;
    this.animate(progress);
  }

  stop() {
    super.stop();
    window.removeEventListener("keydown", this.onKeyDown);
  }

  draw() {
    this.fill(this.prevPixels.slice(0, this.prevPixels.length - 1));
    super.draw();
    // this.drawHitbox();
  }

  onCollision(other: Element) {
    if (!(other instanceof Food)) {
      this.game!.stop();
    }
  }

  onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        return this.turn(Point.up);
      case "ArrowDown":
        return this.turn(Point.down);
      case "ArrowLeft":
        return this.turn(Point.left);
      case "ArrowRight":
        return this.turn(Point.right);
    }
  }

  move() {
    const head = this.nextPixels[0];
    const nextHead = head.plus(this.nextDir);
    this.dir = this.nextDir;
    this.prevPixels = [head, ...this.prevPixels];
    this.prevPixels.pop();
    this.nextPixels = [nextHead, ...this.nextPixels];
    this.nextPixels.pop();
    this.hitbox = [nextHead, ...this.hitbox];
    this.nextMoveTime = Timer.elapsed + this.updateRate;

    if (this.hitbox.length > this.nextPixels.length) {
      this.hitbox.pop();
    }
  }

  turn(dir: Point) {
    if (this.canTurn(dir)) {
      this.nextDir = dir;
    }
  }

  canTurn(dir: Point) {
    return this.isValidDir(dir) &&
      (this.pixels.length == 1 || (dir.x && !this.dir.x) || (dir.y && !this.dir.y));
  }

  isValidDir(dir: Point) {
    return (dir.x ** 2 == 1 && !dir.y) || (dir.y ** 2 == 1 && !dir.x);
  }

  extend() {
    const px = this.pixels[this.pixels.length - 1];
    const prevPx = this.prevPixels[this.prevPixels.length - 1];
    const nextPx = this.nextPixels[this.nextPixels.length - 1];
    this.pixels.push(new Point(px));
    this.prevPixels.push(new Point(prevPx));
    this.nextPixels.push(new Point(nextPx));
  }

  isCollision(other: Element) {
    const size = this.game!.size;
    const px1 = this.nextPixels[0];
    const boundPx1 = px1.absModulus(size);

    return other.hitbox.some(px2 => {
      const boundPx2 = px2.absModulus(size);
      return px1 != px2 && boundPx1.overlaps(boundPx2);
    });
  }
}
