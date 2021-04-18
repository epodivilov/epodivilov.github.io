import { Branch, Leaf } from './line';

/**
 *
 * @param {string} expression
 * @param {*} param1
 * @param {number} param1.stepLength
 * @param {number} param1.stepAngle
 * @returns
 */
export function translate(expression, { stepLength, stepAngle, branchWidth, leafWidth }) {
  const result = [];
  const stack = [];

  let position = { x: 0, y: 0 };
  let angle = 0;
  let width = branchWidth;

  // eslint-disable-next-line no-restricted-syntax
  for (const ch of expression.split('')) {
    // eslint-disable-next-line default-case
    switch (ch) {
      case '0': {
        const line = new Leaf(position, stepLength, angle, Math.random() > 0.5 ? '#98BF60' : '#475F30');
        line.width = leafWidth;

        position = line.end;

        result.push(line);
        break;
      }

      case '1':
      case '2': {
        if (Math.random() > 0.4) {
          break;
        }

        const line = new Branch(position, stepLength, angle, '#8b5a2b');
        line.width = width;

        position = line.end;

        result.push(line);
        break;
      }

      case '[': {
        width *= 0.75;
        angle -= stepAngle + (Math.random() - 0.5) * 10;
        stack.push({ location: { ...position }, rotation: angle, lineWidth: width });

        break;
      }

      case ']': {
        const { location, rotation, lineWidth } = stack.pop();
        width = lineWidth;
        position = { ...location };
        angle = rotation + 2 * stepAngle + (Math.random() - 0.5) * 10;
        break;
      }
    }
  }

  return result;
}
