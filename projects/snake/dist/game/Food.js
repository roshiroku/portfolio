import Element from "./Element.js";
import Point from "./Point.js";
import Snake from "./Snake.js";
import Timer from "./Timer.js";
export default class Food extends Element {
    constructor() {
        super(...arguments);
        this.value = 0;
    }
    respawn() {
        const positions = this.getRespawnPositions();
        const pos = positions[Math.floor(Math.random() * positions.length)];
        this.pixels = this.hitbox = [pos];
    }
    getRespawnPositions() {
        const positions = [];
        const { width, height, size, elements } = this.game;
        const occupied = new Set();
        elements.forEach(el => el.hitbox.forEach(px => {
            const { x, y } = px.absModulus(size);
            occupied.add(`${x},${y}`);
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
    onCollision(other) {
        if (other instanceof Snake) {
            this.consume(other);
        }
    }
    consume(snake) {
        this.game.score += this.value;
        this.pixels = this.hitbox = [];
    }
}
export class Pizza extends Food {
    constructor() {
        super(...arguments);
        this.color = "gold";
        this.value = 1;
    }
    start() {
        super.start();
        this.respawn();
    }
    consume(snake) {
        snake.extend();
        snake.speed += 0.01;
        super.consume(snake);
        this.respawn();
    }
}
export class Mouse extends Food {
    constructor() {
        super(...arguments);
        this.color = "silver";
        this.rate = 0.01;
        this.value = 2;
        this.nextSpawnTime = 0;
    }
    start() {
        this.snake = this.game.elements.find(el => el instanceof Snake);
    }
    update() {
        super.update();
        if (Timer.elapsed > this.nextSpawnTime) {
            if (!this.pixels.length && Math.random() > 1 - this.rate) {
                this.respawn();
            }
        }
        this.nextSpawnTime = this.snake.nextMoveTime;
    }
    consume(snake) {
        snake.extend();
        snake.speed -= 0.02;
        super.consume(snake);
    }
}
