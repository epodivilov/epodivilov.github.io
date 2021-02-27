/*

Wellenkugel
x = u cos(cos u) cos v
y = u cos(cos u) sin v
z = u sin(cos u)
u ∈ [0, 14.5] , v ∈ [0, 2π]
*/

import { cos, sin } from 'mathjs';
import { translate } from '../utils';

export function waveBall(v, u, target) {
  const du = translate(u, [0, 14.5]);
  const dv = translate(v, [0, Math.PI * 2]);

  const x = du * cos(cos(du)) * cos(dv);
  const y = du * cos(cos(du)) * sin(dv);
  const z = du * sin(cos(du));

  target.set(x, y, z);
}
