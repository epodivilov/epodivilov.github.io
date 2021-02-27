/*

Tropfen
x = a (b- cos u) sin u cos v
y = a (b- cos u) sin u sin v
z = cos u
u ∈ [0, π] , v ∈ [0, π/2]

*/

import { cos, sin } from 'mathjs';
import { translate } from '../utils';

export function drop(v, u, target) {
  const du = translate(u, [0, Math.PI]);
  const dv = translate(v, [0, Math.PI * 2]);

  const a = Math.PI / 6;
  const b = Math.PI / 3;
  const x = a * (b - cos(du)) * sin(du) * cos(dv);
  const y = a * (b - cos(du)) * sin(du) * sin(dv);
  const z = cos(du);

  target.set(x, y, z);
}
