class Timer {
    static start() {
        Timer.stopped = false;
        if (Timer.active)
            return;
        Timer.active = true;
        Timer.tickDelta = Date.now();
        Timer.update();
    }
    static update() {
        Timer.tickDelta = Date.now() - Timer.lastTick;
        Timer.lastTick = Date.now();
        if (!Timer.stopped) {
            Timer.elapsed += Timer.tickDelta;
        }
        requestAnimationFrame(Timer.update);
    }
    static stop() {
        Timer.stopped = true;
    }
}
Timer.lastTick = 0;
Timer.active = false;
Timer.stopped = false;
Timer.tickDelta = 0;
Timer.elapsed = 0;
export default Timer;
