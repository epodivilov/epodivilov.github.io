/*

Seashell
h: h = 1 - 0.5 v
x = a h cos(n v π) (1 + cos(u π)) + c cos(n v π)
y = a h sin(n v π) (1 + cos(u π)) + c sin(n v π)
 z = b 0.5 v + a h sin(u π)
  u ∈ [0, 2], v ∈ [0, 2]

*/

import { cos, sin } from 'mathjs';
import { translate } from '../utils';

export function seashell(v, u, target) {
  const du = translate(u, [0, 2]);
  const dv = translate(v, [0, 2]);

  const h = 1 - 0.5 * dv;

  const a = Math.PI / 4;
  const b = 4;
  const c = 1;
  const n = 3;

  const x = a * h * cos(n * dv * Math.PI) * (1 + cos(du * Math.PI)) + c * cos(n * dv * Math.PI);
  const y = a * h * sin(n * dv * Math.PI) * (1 + cos(du * Math.PI)) + c * sin(n * dv * Math.PI);
  const z = b * 0.5 * dv + a * h * sin(du * Math.PI);

  target.set(x, y, z);
}
