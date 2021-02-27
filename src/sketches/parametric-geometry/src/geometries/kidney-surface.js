/*

Kidney Surface
x = cos u (3 cos v - cos(3v))
y = sin u (3 cos v - cos(3v))
z = 3 sin v - sin (3v)
u ∈ [0, 2π] , v ∈ [-π/2, π/2]

*/

import { cos, sin } from 'mathjs';
import { translate } from '../utils';

export function kidneySurface(v, u, target) {
  const du = translate(u, [0, 2 * Math.PI]);
  const dv = translate(v, [-Math.PI / 2, Math.PI / 2]);

  const x = cos(du) * (3 * cos(dv) - cos(3 * dv));
  const y = sin(du) * (3 * cos(dv) - cos(3 * dv));
  const z = 3 * sin(dv) - sin(3 * dv);

  target.set(x, y, z);
}
