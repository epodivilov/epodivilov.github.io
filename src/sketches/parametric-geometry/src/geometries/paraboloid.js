import { translate } from '../utils';
/*
Paraboloid
x = a v cos u
y = a v sin u
z = b v²
u ∈ [-π, π] , v ∈ [0, 2]

*/

export function paraboloid(v, u, target) {
  const du = translate(u, [-Math.PI, Math.PI]);
  const dv = translate(v, [0, 2]);

  const a = 1;
  const b = 1;

  const x = a * dv * Math.cos(du);
  const y = a * dv * Math.sin(du);
  const z = b * dv ** 2;
  target.set(x, y, z);
}
