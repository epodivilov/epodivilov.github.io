/**
 * @typedef {Object} Result
 * @property {Function} Result.start
 * @property {Function} Result.stop
 *
 * @param {(timestamp:number) => void} callback
 * @param {number} fps number of frames per second
 * @returns {Result} call to start/re-start
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
