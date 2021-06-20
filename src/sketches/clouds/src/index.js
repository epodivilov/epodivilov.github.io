/* eslint-disable no-underscore-dangle */
import { Pane } from 'tweakpane';
import canvasSketch from 'canvas-sketch';
import { range } from '../../../utils/range';
import { Circle } from '../../../utils/geometries';

const settings = {
  length: 32,
  colored: false,
  strokeWidth: 1,
  radius: 30,
};

const pane = new Pane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'length', { min: 1, max: 100, step: 1 });
pane.addInput(settings, 'strokeWidth', { min: 1, max: 100, step: 1 });
pane.addInput(settings, 'radius', { min: 1, max: 100, step: 1 });
pane.addInput(settings, 'colored');

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

    context.fillStyle = 'rgba(21, 21, 19, 1)';
    context.fillRect(0, 0, width, height);

    return (/** @type {Params} */ { time }) => {
      const t = time * 2;
      context.fillStyle = 'rgba(21, 21, 19, 1)';
      context.fillRect(0, 0, width, height);

      context.translate(width / 2, height / 2);

      context.lineWidth = settings.strokeWidth;
      context.strokeStyle = 'black';
      context.fillStyle = 'white';

      range(settings.length).forEach((i) => {
        const angle = (i * Math.PI * 2) / settings.length;
        const x = 180 * Math.cos(angle);
        const y = 180 * Math.sin(angle);

        const radius = ((Math.sin(t + i) + 1) / 2) * settings.radius;

        const el = new Circle(x, y, radius);

        if (settings.colored) {
          context.fillStyle = `hsla(${(i / settings.length) * 360}, 50%, 50%, 1.8)`;
        }

        context.fill(el);
        context.stroke(el);
      });
    };
  },
  { animate: true }
);
