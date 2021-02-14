/**
 * @param {Function} callback
 * @param {number} fps
 * @returns {Function} call to start/re-start
 */
export function raf(callback, fps = 60) {
  let delay = 1000 / fps;
  let time = null;
  let frame = -1;
  let _id = null;

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

    _id = requestAnimationFrame(loop);
  }

  return () => {
    if (_id != null) {
      cancelAnimationFrame(_id);
      _id = null;
      time = null;
      frame = -1;
    }

    loop(0);
  };
}
