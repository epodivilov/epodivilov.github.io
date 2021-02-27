import { cos, sin } from 'mathjs';
import { translate } from '../utils';

export function umbilicTorus(v, u, target) {
  const du = translate(u, [-Math.PI, Math.PI]);
  const dv = translate(v, [-Math.PI, Math.PI]);

  const x = sin(du) * (7 + cos(du / 3 - 2 * dv)) + 2 * cos(du / 3 + dv);
  const y = cos(du) * (7 + cos(du / 3 - 2 * dv)) + 2 * cos(du / 3 + dv);
  const z = sin(du / 3 - 2 * dv) + 2 * sin(du / 3 + dv);

  target.set(x, y, z);
}
