/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay) {
  let timeout;
  let lastArgs;

  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    lastArgs = args;
    timeout = setTimeout(() => {
      fn.apply(this, lastArgs);
      timeout = undefined;
    }, delay);
  };
}
