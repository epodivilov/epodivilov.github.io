import { Pane } from 'tweakpane';
import { raf } from '../../../utils/raf';
import { degToRad } from '../../../utils/deg-to-rad';

const settings = {
  R: 200,
  r: 40,
  d: 20,
  loop: 6000,
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

const stator = 300;

/**
 *       {Array<[radius, hypotrochoid|epitrochoid]>}
 * @type {Array<[number, boolean]>}
 */
const rotors = [
  [300, true],
  [200, true],
  // [100, true],
];

const points = [];

function almostEqual(one, two, threshold = 0.1) {
  return Math.abs(one - two) <= threshold;
}

function last(array) {
  return array[array.length - 1];
}

let i = 0;
const { start, stop } = raf((timestamp) => {
  backContext.clearRect(-width / 2, -height / 2, width, height);

  // const theta = (timestamp / settings.loop) * Math.PI * 2;

  const point = { x: 0, y: 0, alpha: 0 };

  backContext.beginPath();
  backContext.arc(point.x, point.y, rotors[0][0], 0, Math.PI * 2);
  backContext.stroke();

  rotors.reduce(([prevRad], [currentRad, isHypotrochoid], id) => {
    const R = isHypotrochoid ? prevRad - currentRad : prevRad + currentRad;

    point.alpha = id / (rotors.length - 1);
    point.x += R * Math.cos(point.alpha * i * (Math.PI / 180));
    point.y -= R * Math.sin(point.alpha * i * (Math.PI / 180));

    backContext.beginPath();
    backContext.arc(point.x, point.y, currentRad, 0, Math.PI * 2);
    backContext.stroke();

    return [currentRad, isHypotrochoid];
  });

  point.alpha = -6 / rotors.length;
  point.x += last(rotors)[0] * Math.cos((1 - point.alpha) * i * (Math.PI / 180));
  point.y -= last(rotors)[0] * Math.sin((1 - point.alpha) * i * (Math.PI / 180));

  backContext.beginPath();
  backContext.arc(point.x, point.y, 5, 0, Math.PI * 2);
  backContext.fill();

  // FIXME
  points.push(point);
  if (points.length > 2) {
    points.shift();
  }

  if (points.length === 2) {
    frontContext.beginPath();
    frontContext.moveTo(points[0].x, points[0].y);
    frontContext.lineTo(points[1].x, points[1].y);
    frontContext.stroke();
  }

  if (i > 0.25 && points[1] && almostEqual(points[1].x, stator, 1) && almostEqual(points[1].y, 0, 2)) {
    stop();
  }

  i += 0.25;
});

start();

pane.addInput(settings, 'drawCircles');
pane.addInput(settings, 'R', { min: 1, max: 1000, step: 1 });
pane.addInput(settings, 'r', { min: 1, max: 1000, step: 1 });
pane.addInput(settings, 'd', { min: 1, max: 1000, step: 1 });
pane.addInput(settings, 'loop', { min: 1, max: 100000, step: 1 });
pane.on('change', () => {
  stop();
  backContext.clearRect(-width / 2, -height / 2, width, height);
  frontContext.clearRect(-width / 2, -height / 2, width, height);
  start();
});
