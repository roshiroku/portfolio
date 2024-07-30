import Element from "./Element.js";
import Point from "./Point.js";
export default class Wall extends Element {
    constructor(pixels = []) {
        super();
        this.color = "grey";
        this.pixels = pixels;
        this.hitbox = this.pixels;
    }
}
export class VerticalWall extends Wall {
    constructor(x, y, length) {
        const pixels = [];
        for (let i = 0; i < length; i++) {
            pixels.push(new Point(x, y + i));
        }
        super(pixels);
    }
}
export class HorizontalWall extends Wall {
    constructor(x, y, length) {
        const pixels = [];
        for (let i = 0; i < length; i++) {
            pixels.push(new Point(x + i, y));
        }
        super(pixels);
    }
}
