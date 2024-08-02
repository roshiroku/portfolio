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

  x: number;
  y: number;

  constructor(xy: number);
  constructor(x: number, y: number);
  constructor(point: Point);
  constructor(arg1: number | Point, arg2?: number) {
    const { x, y } = arg1 instanceof Point ? arg1 : { x: arg1, y: arg2 ?? arg1 };
    this.x = x;
    this.y = y;
  }

  plus(xy: number): Point;
  plus(x: number, y: number): Point;
  plus(arg: Point): Point;
  plus(arg1: number | Point, arg2?: number) {
    const { x, y } = arg1 instanceof Point ? arg1 : { x: arg1, y: arg2 ?? arg1 };
    return new Point(this.x + x, this.y + y);
  }

  minus(xy: number): Point;
  minus(x: number, y: number): Point;
  minus(arg: Point): Point;
  minus(arg1: number | Point, arg2?: number) {
    const { x, y } = arg1 instanceof Point ? arg1 : { x: arg1, y: arg2 ?? arg1 };
    return new Point(this.x - x, this.y - y);
  }

  times(xy: number): Point;
  times(x: number, y: number): Point;
  times(arg: Point): Point;
  times(arg1: number | Point, arg2?: number) {
    const { x, y } = arg1 instanceof Point ? arg1 : { x: arg1, y: arg2 ?? arg1 };
    return new Point(this.x * x, this.y * y);
  }

  absModulus(xy: number): Point;
  absModulus(x: number, y: number): Point;
  absModulus(arg: Point): Point;
  absModulus(arg1: number | Point, arg2?: number) {
    const { x, y } = arg1 instanceof Point ? arg1 : { x: arg1, y: arg2 ?? arg1 };
    return new Point(((this.x % x) + x) % x, ((this.y % y) + y) % y);
  }

  absDistance(point: Point) {
    return Math.abs(this.x - point.x) + Math.abs(this.y - point.y);
  }

  equals(other: Point) {
    return this.x == other.x && this.y == other.y;
  }

  overlaps(other: Point) {
    return this.equals(other) || (
      this.x < other.x + 1 &&
      this.x + 1 > other.x &&
      this.y < other.y + 1 &&
      this.y + 1 > other.y
    );
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}