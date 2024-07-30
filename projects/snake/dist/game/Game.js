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
var _Game_score;
import Point from "./Point.js";
import Timer from "./Timer.js";
class Game {
    get size() {
        return new Point(this.width, this.height);
    }
    get score() {
        return __classPrivateFieldGet(this, _Game_score, "f");
    }
    set score(score) {
        __classPrivateFieldSet(this, _Game_score, score, "f");
        this.onScore();
    }
    constructor(canvas, { width = 21, height = 21, scale = 20, onScore = () => { }, onGameOver = () => { } } = {}) {
        this.active = false;
        _Game_score.set(this, 0);
        this.elements = [];
        this.update = () => {
            if (!this.active)
                return;
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.elements.forEach(el => {
                el.update();
                el.draw();
            });
            requestAnimationFrame(this.update);
        };
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        canvas.width = this.width * this.scale;
        canvas.height = this.height * this.scale;
        this.ctx.scale(this.scale, this.scale);
        this.onScore = onScore;
        this.onGameOver = onGameOver;
    }
    start() {
        if (this.active)
            return;
        this.active = true;
        Timer.start();
        this.elements.forEach(el => {
            el.start();
            el.draw();
        });
        requestAnimationFrame(this.update);
    }
    stop() {
        if (!this.active)
            return;
        this.active = false;
        Timer.stop();
        this.elements.forEach(el => el.stop());
    }
    addElement(...elements) {
        elements.forEach(el => {
            this.elements.push(el);
            el.game = this;
        });
    }
    removeElement(...elements) {
        elements.forEach(el => {
            const index = this.elements.indexOf(el);
            if (index > -1) {
                this.elements.splice(index, 1);
                el.game = undefined;
            }
        });
    }
}
_Game_score = new WeakMap();
export default Game;
