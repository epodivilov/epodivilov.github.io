/**
 *
 * @param {number} length
 * @param {(index:number) => any} [cb]
 */
export function range(length, cb) {
  return Array.from({ length }).map((_, i) => cb(i));
}

/**
 *
 * @param {string} initial
 * @param {number} iterations
 */
export function growWood(initial, iterations) {
  const rules = { 1: '21', 0: '1[20]20' };
  let result = initial;

  range(iterations, () => {
    const characters = result.split('');
    result = '';

    characters.forEach((character) => {
      const addition = rules[character] || character;
      result += addition;
    });

    return result;
  });

  return result;
}
