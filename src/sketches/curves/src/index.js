import canvasSketch from 'canvas-sketch';
import { Pane } from 'tweakpane';

import { range } from '../../../utils/range';
import { radToDeg } from '../../../utils/rad-to-deg';
import { debounce } from '../../../utils/debounce';

/**
 * @typedef {Object} Params
 * @property {CanvasRenderingContext2D} context
 * @property {number} width
 * @property {number} height
 */

const parameters = {
  length: 24,
  step: 8,
  radius: 240,
  borderWidth: 8,
  lineWidth: 8,
  clean: true,
};

(async () => {
  const sketch = await canvasSketch(
    () =>
      (/** @type {Params} */ { context, width, height }) => {
        const { radius, length, borderWidth, lineWidth, step, clean } = parameters;

        const points = range(length).map((i) => {
          const alpha = (i * Math.PI * 2) / length;
          const x = radius * Math.cos(alpha);
          const y = radius * Math.sin(alpha);

          return { x, y, alpha };
        });

        if (clean) {
          context.clearRect(0, 0, width, height);
        }

        context.translate(width / 2, height / 2);

        /* Draw curves */
        for (let i = 0; i < length; i += 1) {
          const current = points[i];
          const next = points[(i + step) % length];

          const grad = context.createLinearGradient(current.x, current.y, next.x, next.y);
          grad.addColorStop(0, `hsl(${radToDeg(current.alpha)}, 50%, 50%)`);
          grad.addColorStop(1, `hsl(${radToDeg(next.alpha)}, 50%, 50%)`);

          context.strokeStyle = grad;
          context.lineWidth = lineWidth;

          context.shadowOffsetX = 2 * -Math.sign(current.x);
          context.shadowOffsetY = 2 * -Math.sign(current.y);
          context.shadowBlur = 4;
          context.shadowColor = 'rgba(0,0,0,0.35)';

          context.beginPath();
          context.moveTo(current.x, current.y);
          context.quadraticCurveTo(0, 0, next.x, next.y);
          context.stroke();
        }

        /* Draw outer circle */
        for (let i = 0; i < length; i += 1) {
          const current = points[i];
          const next = points[(i + 1) % length];

          const grad = context.createLinearGradient(current.x, current.y, next.x, next.y);
          grad.addColorStop(0, `hsl(${radToDeg(current.alpha)}, 50%, 50%)`);
          grad.addColorStop(1, `hsl(${radToDeg(next.alpha)}, 50%, 50%)`);

          context.strokeStyle = grad;
          context.lineWidth = borderWidth;

          context.shadowColor = 'transparent';

          context.beginPath();
          context.moveTo(current.x, current.y);
          context.arc(0, 0, radius, current.alpha, next.alpha);
          context.stroke();
        }
      },
    { dimensions: [512, 512], pixelRatio: Math.min(devicePixelRatio, 2) }
  );

  const pane = new Pane({ title: 'Parameters', expanded: false });
  pane.addInput(parameters, 'clean', { label: 'Clear before update' });
  pane.addInput(parameters, 'step', { min: 1, max: 360, step: 1, label: 'Step' });
  pane.addInput(parameters, 'length', { min: 1, max: 360, step: 1, label: 'Points' });
  pane.addInput(parameters, 'radius', { min: 1, max: 240, step: 1, label: 'Radius' });
  pane.addInput(parameters, 'lineWidth', { min: 1, max: 10, step: 1, label: 'Line width' });
  pane.addInput(parameters, 'borderWidth', { min: 1, max: 10, step: 1, label: 'Border width' });
  pane.on(
    'change',
    debounce(() => {
      if (sketch) {
        sketch.render();
      }
    }, 100)
  );
})();
