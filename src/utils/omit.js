export function omit(object, keys = []) {
  return Object.entries(object).reduce((acc, [k, v]) => {
    if (keys.includes(k)) {
      return acc;
    }

    return Object.assign(acc, { [k]: v });
  }, {});
}
