export default class Timer {
  private static lastTick = 0;
  private static active = false;
  private static stopped = false;
  static tickDelta = 0;
  static elapsed = 0;
  
  static start() {
    Timer.stopped = false;

    if (Timer.active) return;

    Timer.active = true;
    Timer.tickDelta = Date.now();
    Timer.update();
  }

  private static update() {
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