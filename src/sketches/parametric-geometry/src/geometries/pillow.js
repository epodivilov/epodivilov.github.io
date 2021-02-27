/*

Pillow Shape x
x = cos u ;
y = cos v
z = a sin u sin v
u ∈ [0, π] , v ∈ [-π, π]

*/

import { cos, sin } from 'mathjs';
import { translate } from '../utils';

export function pillow(v, u, target) {
  const du = translate(u, [0, 2 * Math.PI]);
  const dv = translate(v, [-Math.PI, Math.PI]);

  const a = 0.4;
  const x = cos(du);
  const y = cos(dv);
  const z = a * sin(du) * sin(dv);

  target.set(x, y, z);
}
