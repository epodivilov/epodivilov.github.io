import canvasSketch from 'canvas-sketch';
import { Circle } from '../../../utils/geometries';
import { range } from '../../../utils/range';
import { random } from '../../../utils/random';

class Bubble {
  constructor({ color, x, y, vx, vy, radius }) {
    this.life = true;

    this.radius = radius;
    this.vr = 0;

    this.x = x;
    this.vx = vx;

    this.y = y;
    this.vy = vy;

    this.color = color;
  }

  update() {
    this.vy += 0.000001;
    this.vr += Math.random() > 0.99 ? 0.002 : 0.02;
    this.y -= this.vy;
    this.x += this.vx;

    if (this.radius > 1) {
      this.radius -= this.vr;
    }

    if (this.radius <= 1) {
      this.life = false;
    }
  }

  respawn({ x, y, vx, vy, radius }) {
    this.life = true;

    this.radius = radius;
    this.vr = 0;

    this.x = x;
    this.vx = vx;

    this.y = y;
    this.vy = vy;
  }

  draw(ctx) {
    if (this.life === false) {
      return;
    }

    ctx.fillStyle = this.color;
    ctx.fill(new Circle(this.x, this.y, this.radius));
  }
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

    const bubbles = [
      ...range(50).map(() => {
        const radius = random(30, 150);

        return new Bubble({
          x: random(0, width),
          vx: random(-2, 2),
          y: Math.random() * 20 + (height + radius),
          vy: random(0.0001, 0.0002) + 4,
          color: 'hsl(210, 60%, 90%)',
          radius,
        });
      }),
      ...range(50).map(() => {
        const radius = random(30, 150);

        return new Bubble({
          x: random(0, width),
          vx: random(-2, 2),
          y: Math.random() * 20 + (height + radius),
          vy: random(0.0001, 0.0002) + 3,
          color: 'hsl(210, 60%, 50%)',
          radius,
        });
      }),
    ];

    return () => {
      context.clearRect(0, 0, width, height);

      bubbles.forEach((bubble, i) => {
        if (bubble.life) {
          bubble.update();
          bubble.draw(context);
        } else {
          const radius = random(30, 150);
          const vy = i < bubbles.length / 2 ? 5 : 3;

          bubble.respawn({
            x: random(0, width),
            vx: random(-2, 2),
            y: Math.random() * 20 + (height + radius),
            vy: random(0.0001, 0.0002) + Math.random() > 0.99 ? 10 : vy,
            radius,
          });
        }
      });
    };
  },
  { animate: true }
);
