import { Pane } from 'tweakpane';
import { raf } from '../../../utils/raf';

const settings = {
  R: 150,
  r: 252,
  d: 0.6,
  loop: 500,
  drawCircles: true,
};

const pane = new Pane({ title: 'Parameters', expanded: false });

const width = window.innerWidth * window.devicePixelRatio;
const height = window.innerHeight * window.devicePixelRatio;

/** @type {HTMLCanvasElement} */
const backCanvas = document.getElementById('back-canvas');
backCanvas.width = width;
backCanvas.height = height;

/** @type {HTMLCanvasElement} */
const frontCanvas = document.getElementById('front-canvas');
frontCanvas.width = width;
frontCanvas.height = height;

const backContext = backCanvas.getContext('2d');
backContext.translate(width / 2, height / 2);
backContext.strokeStyle = 'gray';
backContext.fillStyle = 'gold';

const frontContext = frontCanvas.getContext('2d');
frontContext.translate(width / 2, height / 2);
frontContext.strokeStyle = 'gold';

/**
 *
 * @param {number} angle
 */
function getPoint(angle) {
  const { R, r, d } = settings;

  const k = r / R;

  return [
    R * ((1 - k) * Math.cos(angle) + d * k * Math.cos(((1 - k) / k) * angle)),
    R * ((1 - k) * Math.sin(angle) - d * k * Math.sin(((1 - k) / k) * angle)),
  ];
}

let point = getPoint(0);

const { start, stop } = raf((timestamp) => {
  const { R, r, drawCircles, loop } = settings;

  const alpha = (timestamp / loop) * Math.PI * 2;
  const [x, y] = getPoint(alpha);

  if (drawCircles) {
    backContext.clearRect(-width / 2, -height / 2, width, height);

    backContext.beginPath();
    backContext.arc(0, 0, R, 0, Math.PI * 2);
    backContext.stroke();

    backContext.beginPath();
    backContext.arc((R - r) * Math.cos(alpha), (R - r) * Math.sin(alpha), Math.abs(r), 0, Math.PI * 2);
    backContext.stroke();

    backContext.beginPath();
    backContext.arc(x, y, 5, 0, Math.PI * 2);
    backContext.fill();
  }

  frontContext.beginPath();
  frontContext.moveTo(...point);
  frontContext.lineTo(x, y);
  frontContext.stroke();

  point = [x, y];
});

start();

pane.addInput(settings, 'drawCircles');
pane.addInput(settings, 'R', { min: 1, max: 1000, step: 1 });
pane.addInput(settings, 'r', { min: 1, max: 1000, step: 1 });
pane.addInput(settings, 'd', { min: -1, max: 1, step: 0.1 });
pane.addInput(settings, 'loop', { min: 1, max: 100000, step: 1 });
pane.on('change', () => {
  stop();
  backContext.clearRect(-width / 2, -height / 2, width, height);
  frontContext.clearRect(-width / 2, -height / 2, width, height);
  point = getPoint(0);
  start();
});
