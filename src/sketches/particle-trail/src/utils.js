/**
 * Get random value between in range
 * @param {number} [min] min value (default: 0)
 * @param {number} [max] max value (default: 1)
 */
export function randomBetween(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

/**
 * Limit value in range
 * @param {number} value input value
 * @param {number} [min] min value (default: 0)
 * @param {number} [max] max value (default: 1)
 */
export function clamp(value, min = 0, max = 1) {
  return Math.max(Math.min(value, max), min);
}

/**
 * @param {Function} callback
 * @param {number} fps number of frames per second
 * @returns {Function} call to start/re-start
 */
export function raf(callback, fps = 60) {
  const delay = 1000 / fps;
  let time = null;
  let frame = -1;
  let rafId = null;

  /** @param {number} timestamp */
  function loop(timestamp) {
    if (time === null) {
      time = timestamp;
    }

    const seg = Math.floor((timestamp - time) / delay);

    if (seg > frame) {
      frame = seg;
      callback(timestamp);
    }

    rafId = requestAnimationFrame(loop);
  }

  return {
    stop() {
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        time = null;
        frame = -1;
      }
    },
    start() {
      loop(0);
    },
  };
}

/**
 * Get array of number
 * @param {number} length
 * @param {number} [from]
 */
export function range(length, from = 0) {
  return Array.from({ length }, (_, i) => from + i);
}
