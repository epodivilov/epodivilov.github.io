import { Box3, Vector3 } from "three";

/**
 * @param {Function} callback
 * @param {number} fps
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

  return () => {
    if (rafId != null) {
      cancelAnimationFrame(rafId);
      rafId = null;
      time = null;
      frame = -1;
    }

    loop(0);
  };
}

/**
 * Translate value from 0 to 1 to another coordinate system
 * @param {number} value current value
 * @param {[number, number]} range two edges of new coordination system
 */
export function translate(value, range = []) {
  const [min, max] = range;

  return value * (max - min) + min;
}

export function calculateOptimalScale(object, maxScale =  50) {
  const boundingBox = new Box3();
  boundingBox.setFromObject(object);
  const size = boundingBox.getSize(new Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z);

  return maxScale / maxDimension
}
