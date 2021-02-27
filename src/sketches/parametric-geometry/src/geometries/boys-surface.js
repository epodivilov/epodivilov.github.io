/*
Boys Surface
a = √2
b = 2- sin(3u) sin(2v)
x = a cos² v cos(2u) + cos u sin(2v) /b
y = 3 cos² v /b
z = a cos² v sin(2u) + cos u sin(2v) /b
u ∈ [-π/2, π/2] , v ∈ [0, π]
*/

import {
  cos, pow, sin, sqrt,
} from 'mathjs';
import { translate } from '../utils';

export function boysSurface(v, u, target) {
  const du = translate(u, [-Math.PI / 2, Math.PI / 2]);
  const dv = translate(v, [0, Math.PI]);

  const a = sqrt(2);
  const b = 2 - sin(3 * du) * sin(2 * dv);
  const x = a * pow(cos(dv), 2) * cos(2 * du) + (cos(du) * sin(2 * dv)) / b;
  const y = (3 * pow(cos(dv), 2)) / b;
  const z = a * pow(cos(dv), 2) * sin(2 * du) + (cos(du) * sin(2 * dv)) / b;

  target.set(x, y, z);
}
