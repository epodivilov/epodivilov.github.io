import { cos, sin } from 'mathjs';
import { translate } from '../utils';

export function mobius(v, u, target) {
  const du = translate(u, [0, 2 * Math.PI]);
  const dv = translate(v, [-1, 1]);

  const r = 1;
  const x = (r + (dv / 2) * cos(du / 2)) * cos(du);
  const y = (r + (dv / 2) * cos(du / 2)) * sin(du);
  const z = (dv / 2) * sin(du / 2);

  target.set(x, y, z);
}
