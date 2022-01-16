export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(value, min));
}

export function powerOf(timeFraction, n) {
  return timeFraction ** n;
}

export function animate({ timing, render, duration }) {
  const start = performance.now();

  requestAnimationFrame(function tick(time) {
    const timeFraction = clamp((time - start) / duration);
    const progress = timing(timeFraction);

    render(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(tick);
    }
  });
}

export function lerp(x, y, a) {
  return x * (1 - a) + y * a;
}
