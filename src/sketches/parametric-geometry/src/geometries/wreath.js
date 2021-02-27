/*
Kranz
x = cos(u + 4)/3
y = cos u sin v  cos v sin u cos v + 0.5 cos u
z = cos v sin u  cos u  sin v
u ∈ [0, 2π] , v ∈ [0, 2π]
*/

import { cos, sin } from 'mathjs';
import { translate } from '../utils';

export function wreath(v, u, target) {
  const du = translate(u, [0, 2 * Math.PI]);
  const dv = translate(v, [0, 2 * Math.PI]);

  const x = cos(du + 4) / 3;
  const y = cos(du) * sin(dv) * cos(dv) * sin(du) * cos(dv) + 0.5 * cos(du);
  const z = cos(dv) * sin(du) * cos(du) * sin(dv);

  target.set(x, y, z);
}
