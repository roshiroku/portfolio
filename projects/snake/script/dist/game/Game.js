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
var _Game_score, _Game_scale;
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
    get scale() {
        return __classPrivateFieldGet(this, _Game_scale, "f");
    }
    set scale(scale) {
        this.canvas.width = this.width * scale;
        this.canvas.height = this.height * scale;
        this.ctx.scale(scale, scale);
        __classPrivateFieldSet(this, _Game_scale, scale, "f");
    }
    constructor(canvas, { width = 21, height = 21, scale = 20, onScore = () => { }, onStart = () => { }, onStop = () => { } } = {}) {
        this.active = false;
        _Game_score.set(this, 0);
        this.elements = [];
        _Game_scale.set(this, 1);
        this.update = () => {
            if (!this.active)
                return;
            this.elements.forEach(el => el.update());
            this.draw();
            requestAnimationFrame(this.update);
        };
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.onScore = onScore;
        this.onStart = onStart;
        this.onStop = onStop;
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
        this.onStart();
        requestAnimationFrame(this.update);
    }
    stop() {
        if (!this.active)
            return;
        this.active = false;
        Timer.stop();
        this.elements.forEach(el => el.stop());
        this.onStop();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.elements.forEach(el => el.draw());
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
_Game_score = new WeakMap(), _Game_scale = new WeakMap();
export default Game;
