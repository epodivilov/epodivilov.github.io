import { sech } from 'mathjs';

/*

Tractroid
x = sech u cos v
y = sech u sin v
z = u – tanh u
u ∈ [0, 4] , v ∈ [0, 2π]
*/

export function tractroid(v, u, target) {
  const du = u * 4;
  const dv = v * Math.PI * 2;

  const x = sech(du) * Math.cos(dv);
  const y = sech(du) * Math.sin(dv);
  const z = du - Math.tanh(du);
  target.set(x, y, z);
}
