/**
 * Resize canvas element
 * @param {HTMLCanvasElement} canvas
 * @param {number} width
 * @param {number} height
 */
export function resize(canvas, width, height) {
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
}

/**
 * Return middle index
 * @param {any[]} array
 */
export function middle(array) {
  return Math.trunc((array.length - 1) / 2);
}

/**
 * Convert degrees to radians
 * @param {number} degree
 */
export function toRad(degree) {
  return (degree * Math.PI) / 180;
}
