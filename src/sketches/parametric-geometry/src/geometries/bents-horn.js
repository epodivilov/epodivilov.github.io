/*

Bent’s Horn
x = (2+cos u) (v/3 – sin v)
y = (2+cos (u+2π/3) (cos v -1)
z = (2+cos (u-2π/3) (cos v -1)
u ∈ [-π, π] , v ∈ [-2π, 2π]

*/

import { cos, sin } from 'mathjs';
import { translate } from '../utils';

export function bentsHorn(v, u, target) {
  const du = translate(u, [-Math.PI, Math.PI]);
  const dv = translate(v, [-2 * Math.PI, 2 * Math.PI]);

  const x = (2 + cos(du)) * (dv / 3 - sin(dv));
  const y = (2 + cos(du - (2 * Math.PI) / 3)) * cos(dv) * -1;
  const z = (2 + cos(du + (2 * Math.PI) / 3)) * cos(dv) * -1;

  target.set(x, y, z);
}
