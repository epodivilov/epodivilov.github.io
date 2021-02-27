/*

Fish Surface
x = (cos u–cos(2u))cos(v)/4
y = (sin u–sin(2u)) sin(v)/4
z = cos u
u ∈ [0, π] , v ∈ [0, 2π]
*/

import { cos, sin } from 'mathjs';
import { translate } from '../utils';

export function fishSurface(v, u, target) {
  const du = translate(u, [0, Math.PI]);
  const dv = translate(v, [0, 2 * Math.PI]);

  const x = ((cos(du) - cos(2 * du)) * cos(dv)) / 4;
  const y = ((sin(du) - sin(2 * du)) * sin(dv)) / 4;
  const z = cos(du);

  target.set(x, y, z);
}
