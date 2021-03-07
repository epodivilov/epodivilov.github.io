import Tweakpane from 'tweakpane';
import { debounce } from '../../../utils/debounce';
import { middle, resize, toRad } from './utils';

/**
 * Generate Heighway dragon curve
 * @param {number} iteration
 */
function generateCurve(iteration) {
  if (iteration === 0) {
    return [];
  }

  let curve = ['R'];

  let step = iteration;
  while (step > 1) {
    const copy = curve.slice(0);
    copy.splice(middle(copy), 1, 'L');

    curve = curve.concat('R', copy);
    step -= 1;
  }

  return curve;
}

function pause(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function draw(context, curve, { angle, color, d }) {
  const l = d * 0.8;
  const m = d * 0.2;

  context.strokeStyle = color;

  context.resetTransform();
  context.translate(context.canvas.width / 2, context.canvas.height / 2);
  context.rotate(toRad(angle));
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(l, 0);
  context.quadraticCurveTo(d, 0, d, m);
  context.translate(d, 0);
  context.stroke();

  for (let idx = 0; idx < curve.length; idx += 1) {
    const direction = curve[idx];

    const k = idx === 0 || curve[idx + 1] !== 'L' ? 1 : -1;

    if (direction === 'R') {
      context.rotate(toRad(90));
    } else {
      context.rotate(toRad(-90));
    }

    if (curve[idx + 1] != null) {
      context.moveTo(m, 0);
      context.lineTo(l, 0);
      context.quadraticCurveTo(d, 0, d, m * k);
    } else {
      context.moveTo(m, 0);
      context.lineTo(d, 0);
    }

    context.translate(d, 0);
    context.stroke();

    // eslint-disable-next-line no-await-in-loop
    await pause(10 / curve.length);
  }

  // context.stroke();
}

/** @type {HTMLCanvasElement} */
const canvas1 = document.getElementById('screen-1');
const canvas2 = document.getElementById('screen-2');
const canvas3 = document.getElementById('screen-3');
const canvas4 = document.getElementById('screen-4');
const context1 = canvas1.getContext('2d');
const context2 = canvas2.getContext('2d');
const context3 = canvas3.getContext('2d');
const context4 = canvas4.getContext('2d');

async function render(options) {
  const a = Math.min(window.innerHeight, window.innerWidth) * 0.2;
  const d = a / Math.sqrt(2) ** (options.iteration - 1);

  const curve = generateCurve(options.iteration);

  const init = (context) => {
    const { width, height } = context.canvas;
    context.lineWidth = options.lineWidth;
    context.resetTransform();
    context.clearRect(0, 0, width, height);
  };

  init(context1);
  init(context2);
  init(context3);
  init(context4);

  draw(context1, curve, { angle: 0, color: '#4285f4', d });
  draw(context2, curve, { angle: 90, color: '#ea4335', d });
  draw(context3, curve, { angle: 180, color: '#fbbc05', d });
  draw(context4, curve, { angle: 270, color: '#34a853', d });
}

const settings = {
  lineWidth: 2,
  iteration: 7,
};

resize(canvas1, window.innerWidth, window.innerHeight);
resize(canvas2, window.innerWidth, window.innerHeight);
resize(canvas3, window.innerWidth, window.innerHeight);
resize(canvas4, window.innerWidth, window.innerHeight);

const pane = new Tweakpane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'lineWidth', { label: 'Curve width', min: 1, step: 1 });
pane.addInput(settings, 'iteration', {
  label: 'Iterations',
  min: 0,
  max: 20,
  step: 1,
});
pane.on(
  'change',
  debounce(() => render(settings), 250),
);

render(settings);
