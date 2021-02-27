import { translate } from '../utils';

export function cosinusSurface(v, u, target) {
  const du = translate(u, [-Math.PI, Math.PI]);
  const dv = translate(v, [-Math.PI, Math.PI]);

  const x = Math.cos(du) * 4;
  const y = Math.cos(dv) * 4;
  const z = Math.cos(du + dv) * 4;

  target.set(x, y, z);
}
