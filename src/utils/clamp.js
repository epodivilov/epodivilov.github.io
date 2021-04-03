/**
 * Clamp value between two edges
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}
