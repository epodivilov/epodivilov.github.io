/**
 *
 * @param {number} from
 * @param {number} to
 * @param {number} progress
 * @returns
 */
export function lerp(from, to, progress) {
  return from * (1 - progress) + to * progress;
}

/**
 *
 * @param {number} length
 * @param {(index:number) => any} [cb]
 */
export function range(length, cb) {
  return Array.from({ length }).map((_, i) => cb(i));
}
