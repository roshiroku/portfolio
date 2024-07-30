import Element, { AnimatedElement } from "./Element.js";
import Point from "./Point.js";
import Snake from "./Snake.js";
import Timer from "./Timer.js";

export default class Food extends Element {
  value = 0;

  respawn() {
    const positions = this.getRespawnPositions();
    const pos = positions[Math.floor(Math.random() * positions.length)];
    this.pixels = this.hitbox = [pos];
  }

  getRespawnPositions() {
    const positions: Point[] = [];
    const { width, height, size, elements } = this.game!;
    const occupied = new Set<string>();

    elements.forEach(el => el.hitbox.forEach(px => {
      const { x, y } = px.absModulus(size);
      occupied.add(`${x},${y}`)
    }));

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (!occupied.has(`${x},${y}`)) {
          positions.push(new Point(x, y));
        }
      }
    }

    return positions;
  }

  onCollision(other: Element) {
    if (other instanceof Snake) {
      this.consume(other);
    }
  }

  consume(snake: Snake) {
    this.game!.score += this.value;
    this.pixels = this.hitbox = [];
  }
}

export class Pizza extends Food {
  color = "gold";
  value = 1;

  start() {
    super.start();
    this.respawn();
  }

  consume(snake: Snake) {
    snake.extend();
    snake.speed += 0.01;
    super.consume(snake);
    this.respawn();
  }
}

export class Mouse extends Food {
  color = "silver";
  rate = 0.01;
  value = 2;
  nextSpawnTime = 0;
  snake?: Snake;

  start() {
    this.snake = this.game!.elements.find(el => el instanceof Snake);
  }

  update() {
    super.update();

    if (Timer.elapsed > this.nextSpawnTime) {
      if (!this.pixels.length && Math.random() > 1 - this.rate) {
        this.respawn();
      }
    }

    this.nextSpawnTime = this.snake!.nextMoveTime;
  }

  consume(snake: Snake) {
    snake.extend();
    snake.speed -= 0.02;
    super.consume(snake);
  }
}