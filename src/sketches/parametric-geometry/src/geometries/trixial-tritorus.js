/*

Triaxial Tritorus
x = sin u (1 + cos v)
y = sin(u+2π/3) (1+cos(v+2π/3))
z = sin(u+4π/3) (1+cos(v+4π/3))
u ∈ [-π, π] , v ∈ [-π, π]
*/

import { cos, sin } from 'mathjs';
import { translate } from '../utils';

export function trixialTritorus(v, u, target) {
  const du = translate(u, [-Math.PI, Math.PI]);
  const dv = translate(v, [-Math.PI, Math.PI]);

  const x = sin(du) * (1 + cos(dv));
  const y = sin(du + (2 * Math.PI) / 3) * (1 + cos(dv + (2 * Math.PI) / 3));
  const z = sin(du + (4 * Math.PI) / 3) * (1 + cos(dv + (4 * Math.PI) / 3));

  target.set(x, y, z);
}
