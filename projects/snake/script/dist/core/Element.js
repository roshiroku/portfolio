export default class Element {
    constructor() {
        this.pixels = [];
        this.hitbox = [];
    }
    start() { }
    update() { }
    stop() { }
    draw() {
        this.fill(this.pixels);
    }
    drawHitbox() {
        const { size, ctx } = this.game;
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = "#1066ff99";
        this.hitbox.forEach(px => {
            const boundPx = px.absModulus(size);
            ctx.strokeRect(boundPx.x, boundPx.y, 1, 1);
        });
    }
    fill(pixels) {
        if (this.color) {
            const { width, height, size, ctx } = this.game;
            ctx.fillStyle = this.color;
            pixels.forEach(px => {
                const { x, y } = px.absModulus(size);
                ctx.fillRect(x, y, 1, 1);
                if (x < 1)
                    ctx.fillRect(x + width, y, 1, 1);
                if (x > width - 1)
                    ctx.fillRect(x - width, y, 1, 1);
                if (y < 1)
                    ctx.fillRect(x, y + height, 1, 1);
                if (y > height - 1)
                    ctx.fillRect(x, y - height, 1, 1);
            });
        }
    }
    handleCollisions(elements) {
        elements.forEach(el => {
            if (this.isCollision(el)) {
                this.onCollision(el);
                if (el != this)
                    el.onCollision(this);
            }
        });
    }
    isCollision(other) {
        const size = this.game.size;
        return this.hitbox.some(px1 => {
            const boundPx1 = px1.absModulus(size);
            return other.hitbox.some(px2 => {
                const boundPx2 = px2.absModulus(size);
                return px1 != px2 && boundPx1.overlaps(boundPx2);
            });
        });
    }
    onCollision(other) { }
    remove() {
        this.game?.removeElement(this);
    }
}
export class AnimatedElement extends Element {
    constructor() {
        super(...arguments);
        this.prevPixels = [];
        this.nextPixels = [];
    }
    animate(progress) {
        this.pixels.forEach((px, i) => {
            const from = this.prevPixels[i];
            const to = this.nextPixels[i];
            const distance = to.minus(from);
            const { x, y } = distance.times(progress).plus(from);
            px.x = x;
            px.y = y;
        });
    }
}
