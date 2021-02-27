import { translate } from '../utils';

export function klein(v, u, target) {
  const du = translate(u, [0, 2 * Math.PI]);
  const dv = translate(v, [0, 2 * Math.PI]);

  let x;
  let z;
  if (du < Math.PI) {
    x = 3 * Math.cos(du) * (1 + Math.sin(du)) + 2 * (1 - Math.cos(du) / 2) * Math.cos(du) * Math.cos(dv);
    z = -8 * Math.sin(du) - 2 * (1 - Math.cos(du) / 2) * Math.sin(du) * Math.cos(dv);
  } else {
    x = 3 * Math.cos(du) * (1 + Math.sin(du)) + 2 * (1 - Math.cos(du) / 2) * Math.cos(dv + Math.PI);
    z = -8 * Math.sin(du);
  }

  const y = -2 * (1 - Math.cos(du) / 2) * Math.sin(dv);

  target.set(x, y, z);
}
