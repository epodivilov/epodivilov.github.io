import { Pane } from 'tweakpane';
import canvasSketch from 'canvas-sketch';
import { Circle, Line } from '../../../utils/geometries';
import { range } from '../../../utils/range';
import { degToRad } from '../../../utils/deg-to-rad';

const settings = {
  rows: 1,
  columns: 15,
  padding: 15,
  radius: 5,
};

const pane = new Pane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'columns', { min: 1, max: 50, step: 1, label: 'length' });
pane.addInput(settings, 'padding', { min: 1, max: 100, step: 1 });
pane.addInput(settings, 'radius', { min: 1, max: 10, step: 1 });

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

    return (/** @type {Params} */ { time }) => {
      context.fillStyle = '#152028';
      context.fillRect(0, 0, width, height);

      context.translate(width / 2, height / 2);
      context.rotate(degToRad(10 * time));

      range(settings.rows).forEach((r) => {
        const dy = r - settings.rows / 2;

        range(settings.columns).forEach((c) => {
          const dx = c - settings.columns / 2;
          const r1 =
            1 + (1 + Math.sin(time * 2 + c / (settings.columns / 4) - r / (settings.rows / 4))) * settings.radius;

          const r2 =
            1 + (1 + Math.sin(time * 2 + c / (settings.columns / 4) - r / (settings.rows / 4) + 2)) * settings.radius;

          const x1 = dx * settings.radius * 2 + dx * settings.padding;
          const y1 =
            dy * settings.radius * 2 + dy * settings.padding + Math.sin(time * 2 + c / (settings.columns / 6)) * 50;
          const y2 =
            dy * settings.radius * 2 + dy * settings.padding + Math.sin(time * 2 + c / (settings.columns / 6) + 3) * 50;

          const color = `hsl(${(c / settings.columns) * 360}, 50%, 50%)`;

          context.fillStyle = color;
          context.strokeStyle = color;

          context.stroke(new Line(y1, x1, y2, x1));

          if (r1 < r2) {
            context.fill(new Circle(y1, x1, r1));
            context.fill(new Circle(y2, x1, r2));
          } else {
            context.fill(new Circle(y2, x1, r2));
            context.fill(new Circle(y1, x1, r1));
          }
        });
      });
    };
  },
  { animate: true, fps: 60 }
);
