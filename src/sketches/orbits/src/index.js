import Tweakpane from 'tweakpane';
import { radToDeg } from '../../../utils/rad-to-deg';
import { raf } from '../../../utils/raf';

function createContext() {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.position = 'fixed';
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
  });

  document.body.appendChild(canvas);

  return canvas.getContext('2d');
}

/**
 *
 * @param {CanvasRenderingContext2D} context
 */
function clearCanvas(context) {
  context.save();
  context.fillStyle = '#152028';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.restore();
}

/**
 *
 * @typedef {Object} Options
 * @property {Object} center
 * @property {number} center.x
 * @property {number} center.y
 * @property {number} radius
 * @property {string} color
 * @property {number} orbit
 * @property {number}  offset
 */

class Object {
  /**
   * @param {Options} options
   */
  constructor(options) {
    const { center, radius, orbit, color, offset } = options;

    this.x = center.x;
    this.y = center.y;
    this.radius = radius;
    this.orbit = orbit;
    this.color = color;
    this.offset = offset || 0;
    this.opacity = 0;
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @param {number} t
   */
  render(context, t) {
    this.opacity = Math.min(this.opacity + t / 1000, 0.25);

    context.save();
    context.beginPath();
    context.fillStyle = 'transparent';
    context.strokeStyle = `hsla(${this.color}, 50%, 50%, ${this.opacity})`;
    context.lineWidth = devicePixelRatio;
    context.arc(this.x, this.y, this.orbit, 0, Math.PI * 2);
    context.closePath();
    context.stroke();
    context.restore();

    context.save();
    context.beginPath();
    context.fillStyle = `hsla(${this.color}, 50%, 50%, ${this.opacity * 4})`;
    context.arc(
      this.x + Math.cos(t + this.offset) * this.orbit,
      this.y + Math.sin(t + this.offset) * this.orbit,
      this.radius,
      0,
      Math.PI * 2
    );
    context.closePath();
    context.fill();
    context.restore();
  }
}

function makeObjects({ length, radius, size }) {
  return Array.from({ length }).map((_, idx) => {
    const temp = (Math.PI * 2) / length;
    const angle = temp * idx;
    const x = Math.cos(angle) * size;
    const y = Math.sin(angle) * size;
    const color = radToDeg(angle);
    const orbit = size * 1.5;
    const offset = -angle;

    return new Object({ center: { x, y }, color, orbit, offset, radius });
  });
}

const pane = new Tweakpane({ title: 'Parameters', expanded: false });
const context = createContext();
const settings = {
  size: (Math.round((Math.min(window.innerWidth, window.innerHeight) * 0.5) / 100) * 100) / 2,
  radius: 10,
  length: 32,
  speed: 5,
};

pane.addInput(settings, 'size', { min: 1, max: 1000, step: 1, label: 'Orbit radius' });
pane.addInput(settings, 'radius', { min: 1, step: 1, label: 'Point radius' });
pane.addInput(settings, 'length', { min: 2, step: 2, label: 'Number of points' });
pane.addInput(settings, 'speed', { min: 0, step: 1, max: 10, label: 'Speed' });

let objects = makeObjects(settings);
pane.on('change', () => {
  objects = makeObjects(settings);
});

let temp = settings.length / 2;
const tick = () => {
  if (temp > 1) {
    temp = Math.max(temp / 2, 1);
    setTimeout(tick, 4000);
  }
};
setTimeout(tick, 4000);

raf((t) => {
  const { width, height } = context.canvas;

  context.resetTransform();
  clearCanvas(context);

  const dt = t / (10000 / settings.speed);

  context.translate(width / 2, height / 2);
  objects.forEach((object, idx) => {
    if (idx % temp === 0) {
      object.render(context, dt);
    }
  });
}).start();
