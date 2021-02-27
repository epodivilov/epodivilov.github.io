import { translate } from '../utils';

export function sinusSurface(v, u, target) {
  const du = translate(u, [-Math.PI, Math.PI]);
  const dv = translate(v, [-Math.PI, Math.PI]);

  const x = Math.sin(du) * 4;
  const y = Math.sin(dv) * 4;
  const z = Math.sin(du + dv) * 4;

  target.set(x, y, z);
}
