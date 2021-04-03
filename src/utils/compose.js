export function compose(...fns) {
  return (params) => fns.slice(1).reduce((prev, fn) => fn(prev), fns[0](params));
}
