export default class Point {
    static get zero() {
        return new Point(0, 0);
    }
    static get up() {
        return new Point(0, -1);
    }
    static get down() {
        return new Point(0, 1);
    }
    static get left() {
        return new Point(-1, 0);
    }
    static get right() {
        return new Point(1, 0);
    }
    constructor(arg1, arg2) {
        const { x, y } = arg1 instanceof Point ? arg1 : { x: arg1, y: arg2 ?? arg1 };
        this.x = x;
        this.y = y;
    }
    plus(arg1, arg2) {
        const { x, y } = arg1 instanceof Point ? arg1 : { x: arg1, y: arg2 ?? arg1 };
        return new Point(this.x + x, this.y + y);
    }
    minus(arg1, arg2) {
        const { x, y } = arg1 instanceof Point ? arg1 : { x: arg1, y: arg2 ?? arg1 };
        return new Point(this.x - x, this.y - y);
    }
    times(arg1, arg2) {
        const { x, y } = arg1 instanceof Point ? arg1 : { x: arg1, y: arg2 ?? arg1 };
        return new Point(this.x * x, this.y * y);
    }
    absModulus(arg1, arg2) {
        const { x, y } = arg1 instanceof Point ? arg1 : { x: arg1, y: arg2 ?? arg1 };
        return new Point(((this.x % x) + x) % x, ((this.y % y) + y) % y);
    }
    absDistance(point) {
        return Math.abs(this.x - point.x) + Math.abs(this.y - point.y);
    }
    equals(other) {
        return this.x == other.x && this.y == other.y;
    }
    overlaps(other) {
        return this.equals(other) || (this.x < other.x + 1 &&
            this.x + 1 > other.x &&
            this.y < other.y + 1 &&
            this.y + 1 > other.y);
    }
    toString() {
        return `${this.x},${this.y}`;
    }
}
