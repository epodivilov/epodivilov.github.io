import { translate } from '../utils';

const theta = Math.PI;

export function helicoid(v, u, target) {
  const du = translate(u, [-Math.PI, Math.PI]);
  const dv = translate(v, [-2, 2]);

  const x = Math.cos(theta) * Math.sinh(dv) * Math.sin(du) + Math.sin(theta) * Math.cosh(dv) * Math.cos(du);
  const y = -Math.cos(theta) * Math.sinh(dv) * Math.cos(du) + Math.sin(theta) * Math.cosh(dv) * Math.sin(du);
  const z = du * Math.cos(theta) + dv * Math.sin(theta);

  target.set(x, y, z);
}
