/* eslint-disable no-param-reassign */
import { Pane } from 'tweakpane';
import canvasSketch from 'canvas-sketch';
import { range } from '../../../utils/range';
import { degToRad } from '../../../utils/deg-to-rad';
import { random } from '../../../utils/random';

const settings = {
  density: 200,
  radius: { min: 1, max: 5 },
  spikes: { min: 5, max: 9 },
};

const pane = new Pane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'density', { min: 1, max: 1000, step: 1 });

const f1 = pane.addFolder({ title: 'radius' });
f1.addInput(settings.radius, 'min', { min: 1, step: 1 });
f1.addInput(settings.radius, 'max', { min: 1, step: 1 });

const f2 = pane.addFolder({ title: 'spikes' });
f2.addInput(settings.spikes, 'min', { min: 1, step: 1, max: 9 });
f2.addInput(settings.spikes, 'max', { min: 1, step: 1, max: 9 });

class Star {
  constructor({ x, y, radius, velocity, spikes }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.spikes = spikes;
  }

  draw(context) {
    let { x, y } = this;

    const cx = this.x;
    const cy = this.y;

    const outerRadius = this.radius;
    const innerRadius = Math.floor(this.radius / 2);
    const spikes = 9;

    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / this.spikes;

    context.beginPath();
    context.moveTo(cx, cy - outerRadius);

    for (let i = 0; i <= spikes; i += 1) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      context.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      context.lineTo(x, y);
      rot += step;
    }

    context.lineTo(cx, cy - outerRadius);
    context.closePath();
    context.lineWidth = outerRadius - innerRadius;
    context.stroke();
    context.fill();
  }
}

function spawnStars(options = {}) {
  return range(options.density).map(() => {
    const object = new Star({
      x: Math.floor(random(0, options.width)),
      y: Math.floor(random(0, options.height)),
      radius: Math.floor(random(options.radius.min, options.radius.max)),
      spikes: Math.floor(random(options.spikes.min, options.spikes.max)),
      velocity: random(1, 5),
    });

    return object;
  });
}

/**
 * @typedef {Object} Params
 * @property {CanvasRenderingContext2D} context
 * @property {number} width
 * @property {number} height
 * @property {number} deltaTime
 * @property {number} time
 */
canvasSketch(
  (/** @type {Params} */ params) => {
    const { context, width, height } = params;

    let circles = spawnStars({ ...settings, width, height });

    pane.on('change', () => {
      circles = spawnStars({ ...settings, width, height });
    });

    return (/** @type {Params} */ { deltaTime }) => {
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(0, 0, width, height);

      context.translate(width / 2, height / 2);
      context.rotate(degToRad(135));
      context.scale(1.5, 1.5);
      context.translate(-width / 2, -height / 2);

      circles.forEach((circle, i) => {
        circle.x += deltaTime * 100 * circle.velocity;

        if (circle.x > width) {
          circle.x = random(-200, -100);
          circle.y = random(0, height);
        }

        context.fillStyle = `hsl(${(i / (circles.length - 1)) * 360}, 50%, 70%)`;
        context.strokeStyle = `hsl(${(i / (circles.length - 1)) * 360}, 70%, 40%)`;
        circle.draw(context);
      });
    };
  },
  { animate: true }
);
