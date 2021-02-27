import { cos, log, sin } from 'mathjs';
import { translate } from '../utils';

export function appleSurface(v, u, target) {
  const du = translate(u, [0, 2 * Math.PI]);
  const dv = translate(v, [-Math.PI, Math.PI]);

  const R1 = 4;
  const R2 = 3.8;
  const x = cos(du) * (R1 + R2 * cos(dv));
  const y = sin(du) * (R1 + R2 * cos(dv));
  const z = (cos(dv) + sin(dv) - 1) * (1 + sin(dv)) * log(1 - (Math.PI * dv) / 10) + 7.5 * sin(dv);

  target.set(x, y, z);
}
