export function range(length, from = 0) {
  return Array.from({ length }).map((_, i) => from + i);
}
