import canvasSketch from 'canvas-sketch';
import { Circle } from '../../../utils/geometries';
import { random } from '../../../utils/random';

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - 2 ** (-10 * x);
}

class Eye {
  constructor(options = {}) {
    const { x, y, size } = options;

    this.x = x;
    this.pupilX = x;
    this.y = y;
    this.pupilY = y;
    this.scale = 0;
    this.size = size;

    this.sclera = new Circle(0, 0, size);
    this.pupil = new Circle(0, 0, size / 10);

    this.blink();
  }

  blink() {
    this.scale = 0;

    setTimeout(() => this.blink(), random(3000, 6000));
  }

  render(context, dt) {
    this.scale = easeOutExpo(Math.min(this.scale + dt / 1000, 1));

    context.save();
    context.translate(this.x, this.y);
    context.scale(1, this.scale);
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.fill(this.sclera);
    context.stroke(this.sclera);
    context.restore();

    context.save();
    context.translate(this.pupilX, this.pupilY);
    context.fillStyle = 'black';
    context.fill(this.pupil);
    context.restore();
  }

  lookAt(target) {
    const dx = target.x - this.x;
    const dy = target.y - this.y;

    const radius = this.size / 2;
    const angle = Math.atan2(dx, dy);

    if (Math.abs(dx) <= radius && Math.abs(dy) <= radius) {
      this.pupilX = target.x;
      this.pupilY = target.y;
    } else {
      this.pupilX = this.x + Math.sin(angle) * radius;
      this.pupilY = this.y + Math.cos(angle) * radius;
    }
  }
}

/**
 * @typedef {Object} Params
 * @property {CanvasRenderingContext2D} context
 * @property {number} width
 * @property {number} height
 * @property {number} deltaTime
 */
canvasSketch(
  (/** @type {Params} */ params) => {
    const { context, width, height } = params;

    const eyes = [];

    const mouse = { x: 0, y: 0 };

    window.addEventListener('mousemove', ({ clientX, clientY }) => {
      mouse.x = clientX - width / 2;
      mouse.y = clientY - height / 2;
    });

    window.addEventListener('click', ({ clientX, clientY }) => {
      const x = clientX - width / 2;
      const y = clientY - height / 2;
      const size = Math.floor(random(25, 75));

      eyes.push(new Eye({ x, y, size }));
    });

    return (/** @type {Params} */ { deltaTime }) => {
      context.translate(width / 2, height / 2);
      context.fillStyle = 'black';
      context.fillRect(-width / 2, -height / 2, width, height);

      eyes.forEach((eye) => {
        eye.render(context, deltaTime, mouse);
        eye.lookAt(mouse);
      });
    };
  },
  { animate: true }
);
