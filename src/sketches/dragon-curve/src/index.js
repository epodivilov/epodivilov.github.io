import Tweakpane from 'tweakpane';
import { debounce } from '../../../utils/debounce';
import { middle, resize, toRad } from './utils';

/**
 * Generate Heighway dragon curve
 * @param {number} iteration
 */
function generateCurve(iteration) {
  let curve = ['R'];

  let step = iteration;
  while (step > 0) {
    const copy = curve.slice(0);
    copy.splice(middle(copy), 1, 'L');

    curve = curve.concat('R', copy);
    step -= 1;
  }

  return curve;
}

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function render(options) {
  const { width, height } = context.canvas;
  const length = options.size * 1;
  const l = length * 0.8;
  const m = length * 0.2;
  const curve = generateCurve(options.iteration);

  context.strokeStyle = options.strokeStyle;
  context.lineWidth = options.lineWidth;
  context.fillStyle = options.fillStyle;

  context.resetTransform();
  context.fillRect(0, 0, width, height);

  context.translate(width / 2, height / 2);
  context.rotate(toRad(-90));

  context.beginPath();
  context.moveTo(length, 0);
  context.lineTo(m, 0);
  context.quadraticCurveTo(0, 0, 0, m);
  context.stroke();

  curve.forEach((direction, idx) => {
    const k = idx === 0 || curve[idx + 1] !== 'L' ? 1 : -1;

    if (direction === 'R') {
      context.rotate(toRad(90));
    } else {
      context.rotate(toRad(-90));
    }

    context.moveTo(m, 0);
    context.lineTo(l, 0);
    context.quadraticCurveTo(length, 0, length, m * k);
    context.translate(length, 0);
  });

  context.stroke();
}

const settings = {
  strokeStyle: '#0f0',
  lineWidth: 2,
  fillStyle: '#000',
  iteration: 8,
  size: 10,
};

resize(canvas, window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
  resize(canvas, window.innerWidth, window.innerHeight);
  render(settings);
});

const pane = new Tweakpane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'fillStyle', { label: 'Background' });
pane.addInput(settings, 'strokeStyle', { label: 'Curve color' });
pane.addInput(settings, 'lineWidth', { label: 'Curve width', min: 1, step: 1 });
pane.addInput(settings, 'iteration', {
  label: 'Iterations',
  min: 0,
  max: 14,
  step: 1,
});
pane.addInput(settings, 'size', { label: 'Cell size', min: 1, step: 1 });
pane.on(
  'change',
  debounce(() => render(settings), 250),
);

render(settings);
