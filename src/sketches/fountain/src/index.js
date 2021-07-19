/* eslint-disable no-underscore-dangle */
import { Pane } from 'tweakpane';
import canvasSketch from 'canvas-sketch';
import SimplexNoise from 'simplex-noise';
import { Circle } from '../../../utils/geometries';

const settings = {
  length: 7,
  strokeWidth: 2,
  height: 100,
  freq: 5,
  gap: 10,
};

const pane = new Pane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'length', { min: 1, step: 1 });
pane.addInput(settings, 'strokeWidth', { min: 1, step: 1 });
pane.addInput(settings, 'height', { min: 10, step: 10, max: 100 });
pane.addInput(settings, 'gap', { min: 0, step: 1, max: 100 });
pane.addInput(settings, 'freq', { min: 1, step: 1, max: 100 });

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

    context.fillStyle = '#3B3B3B';
    context.fillRect(0, 0, width, height);

    const simplex = new SimplexNoise();

    return (/** @type {Params} */ { time }) => {
      context.fillStyle = 'rgba(21, 21, 19, 0.1)';
      context.fillRect(0, 0, width, height);

      for (let i = 0; i < height; i += 1) {
        const k = 0.5 + 0.5 * Math.sin((i / height + 0.75) * Math.PI * 2);

        for (let j = 0; j < settings.length; j += 1) {
          const offset = width / 2 - j * settings.gap - settings.gap / 2;
          const n = -settings.height * k ** 4 * simplex.noise2D(-time / 2 + (i / height) * settings.freq, k);

          context.fillStyle = `hsla(${(j / 10) * 360}, 50%, 50%, ${i / height})`;
          context.fill(new Circle(offset + n, i / k, settings.strokeWidth));
          context.fill(new Circle(width - (offset + n), i / k, settings.strokeWidth));
        }
      }
    };
  },
  { animate: true }
);
