import { clamp } from '../../../utils/clamp';
import { compose } from '../../../utils/compose';

/**
 * Transform index of image data to coordinate of plane
 * @param {number} index
 * @param {Object} options
 */
export function indexToCoordinate(index, options) {
  const { scale, width, height, center, ratio } = options;

  const i = index / 4;
  const x0 = i % width;
  const y0 = Math.floor(i / width);

  const x = ((x0 * scale) / width - scale / 2 + center.x * ratio) / ratio;
  const y = ((y0 * scale) / height - scale / 2) * -1 + center.y;

  return { x, y };
}

/**
 * @typedef {Object} Dot
 * @property {number} x
 * @property {number} y
 *
 * Scalar product
 * @param {Dot} v1
 * @param {Dot} v2
 * @returns
 */
export function dot(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

/**
 *
 * @param {*} querystring
 * @returns
 */
export function parseQuery(querystring) {
  const params = new URLSearchParams(querystring);
  return [...params.entries()].reduce((acc, [k, v]) => Object.assign(acc, { [k]: parseFloat(v) }), {});
}

/**
 *
 * @param {*} params
 * @returns
 */
export function stringifyQuery(params = {}) {
  return Object.entries(params)
    .reduce((acc, [k, v]) => {
      acc.set(k, v);
      return acc;
    }, new URLSearchParams())
    .toString();
}

export function updateQuery(params) {
  const url = new URL(window.location.pathname, window.location.origin);
  url.search = stringifyQuery(params);

  window.history.pushState(null, '', url);
}

/**
 *
 * @param {*} options
 * @param {*} fn
 * @returns
 */
export function createImageData(options, fn) {
  const { width, height } = options;
  const image = new ImageData(width, height);

  for (let i = 0; i < image.data.length; i += 4) {
    const [r = 0, g = 0, b = 0, a = 0] = fn(i);

    image.data[i] = r;
    image.data[i + 1] = g;
    image.data[i + 2] = b;
    image.data[i + 3] = a;
  }

  return image;
}

/**
 *
 * @param {*} center
 * @param {*} limit
 * @returns
 */
export function calcIterations(center, limit) {
  let n = 0;
  const z = { x: 0, y: 0 };

  for (let i = 0; i < limit; i += 1) {
    const x = z.x * z.x - z.y * z.y + center.x;
    const y = 2.0 * z.x * z.y + center.y;

    z.x = x;
    z.y = y;

    if (dot(z, z) > 4) {
      break;
    }

    n += 1;
  }

  return n - Math.log2(Math.log2(dot(z, z))) + 4;
}

function map(value, domain, range) {
  return range[0] + ((range[1] - range[0]) * (value - domain[0])) / (domain[1] - domain[0]);
}

const clamAndFloor = compose(Math.floor, (value) => clamp(value, 0, 255));

function mapColor(fraction, stops, colors) {
  const f = clamp(fraction, 0, 1);

  let marker;
  for (let i = 1; i < stops.length; i += 1) {
    if (f < stops[i]) {
      marker = i - 1;
      break;
    }
  }

  try {
    if (marker != null) {
      const from = stops[marker];
      const to = stops[marker + 1];
      const colorFrom = colors[marker];
      const colorTo = colors[marker + 1];

      const r = clamAndFloor(map(f, [from, to], [colorFrom[0], colorTo[0]]));
      const g = clamAndFloor(map(f, [from, to], [colorFrom[1], colorTo[1]]));
      const b = clamAndFloor(map(f, [from, to], [colorFrom[2], colorTo[2]]));
      const a = clamAndFloor(map(f, [from, to], [colorFrom[3], colorTo[3]]));

      return [r, g, b, a];
    }
  } catch {
    /*  */
  }

  return null;
}

export function calcColor(fraction, stops, palette, cycleFraction) {
  const colors = palette.slice(0);
  colors.unshift(colors.pop());

  if (Number.isFinite(fraction) && fraction > 1 - cycleFraction) {
    return calcColor((fraction + cycleFraction - 1) / cycleFraction, stops, colors, cycleFraction * cycleFraction);
  }

  return mapColor(fraction / (1 - cycleFraction), stops, palette);
}
