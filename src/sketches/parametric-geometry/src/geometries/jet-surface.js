/*

Jet Surface
x = (1-cosh u) sin u cos v/2
y = (1-cosh u) sin u sin v/2
z = cosh u
u ∈ [0, π] , v ∈ [0, π/2]
*/

import { cos, cosh, sin } from 'mathjs';
import { translate } from '../utils';

export function jetSurface(v, u, target) {
  const du = translate(u, [0, Math.PI]);
  const dv = translate(v, [0, Math.PI / 2]);

  const x = (1 - cosh(du * 0.7)) * sin(du) * cos(dv * 4);
  const y = (1 - cosh(du * 0.7)) * sin(du) * sin(dv * 4);
  const z = cosh(du) - Math.PI * 2;

  target.set(x, y, z);
}
