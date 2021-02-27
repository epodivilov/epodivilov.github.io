/*

Triaxial Teartrop
x = (1-cos u) cos(u + 2π/3) cos(v + 2π/3)/2
y = (1-cos u) cos(u + 2π/3) cos(v - 2π/3)/2
z = cos(u - 2π/3)
u ∈ [0, π] , v ∈ [0, π/2]

*/

import { cos } from 'mathjs';
import { translate } from '../utils';

export function triaxialTeardrop(v, u, target) {
  const du = translate(u, [0, Math.PI]);
  const dv = translate(v, [0, Math.PI * 2]);

  const x = ((1 - cos(du)) * cos(du + (2 * Math.PI) / 3) * cos(dv + (2 * Math.PI) / 3)) / 2;
  const y = ((1 - cos(du)) * cos(du + (2 * Math.PI) / 3) * cos(dv - (2 * Math.PI) / 3)) / 2;
  const z = cos(du - (2 * Math.PI) / 3);

  target.set(x, y, z);
}
