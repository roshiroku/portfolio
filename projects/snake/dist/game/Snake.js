var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Snake_speed;
import { AnimatedElement } from "./Element.js";
import Food from "./Food.js";
import Point from "./Point.js";
import Timer from "./Timer.js";
class Snake extends AnimatedElement {
    constructor() {
        super(...arguments);
        this.color = "green";
        this.dir = Point.right;
        this.nextDir = Point.right;
        this.minUpdateRate = 50;
        this.nextMoveTime = 0;
        _Snake_speed.set(this, 0.25);
        this.onKeyDown = (e) => {
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
        };
    }
    // drawColliders = true;
    get speed() {
        return __classPrivateFieldGet(this, _Snake_speed, "f");
    }
    set speed(speed) {
        const nextMoveTime = this.nextMoveTime - this.updateRate;
        __classPrivateFieldSet(this, _Snake_speed, Math.max(0.1, Math.min(speed, 1)), "f");
        this.nextMoveTime = nextMoveTime + this.updateRate;
    }
    get updateRate() {
        return this.minUpdateRate / this.speed;
    }
    start() {
        super.start();
        const { width, height } = this.game;
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
            this.handleCollisions(this.game.elements);
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
    onCollision(other) {
        if (!(other instanceof Food)) {
            this.game.stop();
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
    turn(dir) {
        if (this.canTurn(dir)) {
            this.nextDir = dir;
        }
    }
    canTurn(dir) {
        return this.isValidDir(dir) &&
            (this.pixels.length == 1 || (dir.x && !this.dir.x) || (dir.y && !this.dir.y));
    }
    isValidDir(dir) {
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
    isCollision(other) {
        const size = this.game.size;
        const px1 = this.nextPixels[0];
        const boundPx1 = px1.absModulus(size);
        return other.hitbox.some(px2 => {
            const boundPx2 = px2.absModulus(size);
            return px1 != px2 && boundPx1.overlaps(boundPx2);
        });
    }
}
_Snake_speed = new WeakMap();
export default Snake;
