import Tweakpane from 'tweakpane';
import canvasSketch from 'canvas-sketch';

import { translate } from './translator';
import { growWood } from './wood';
import { debounce } from '../../../utils/debounce';

/**
 * @typedef {Object} Params
 * @property {CanvasRenderingContext2D} context
 * @property {number} width
 * @property {number} height
 */

const settings = {
  stepLength: window.innerHeight * 0.01,
  stepAngle: 16,
  iterations: 12,
  branchWidth: 16,
  leafWidth: 4,
};

let manager;

(async () => {
  manager = await canvasSketch((/** @type {Params} */ params) => {
    const { context, width, height } = params;

    return () => {
      context.fillStyle = '#f8f8ff';
      context.fillRect(0, 0, width, height);
      context.translate(width / 2, (height / 4) * 3);

      context.strokeStyle = 'white';

      translate(growWood('22220', settings.iterations), settings).forEach((line) => {
        context.beginPath();
        context.strokeStyle = line.color;
        context.fillStyle = line.color;
        context.lineWidth = line.width;
        context.stroke(line);
        context.fill(line);
      });
    };
  });
})();

const pane = new Tweakpane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'stepLength', { min: 1, max: 50, step: 1 });
pane.addInput(settings, 'stepAngle', { min: 0, max: 180, step: 1 });
pane.addInput(settings, 'iterations', { min: 0, max: 20, step: 1 });
pane.addInput(settings, 'branchWidth', { min: 1, max: 50, step: 1 });
pane.addInput(settings, 'leafWidth', { min: 1, max: 50, step: 1 });
pane.on(
  'change',
  debounce(() => {
    if (manager) {
      manager.render();
    }
  }, 500)
);
