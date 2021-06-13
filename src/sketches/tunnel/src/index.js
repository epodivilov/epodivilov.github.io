/* eslint-disable no-underscore-dangle */
import { Pane } from 'tweakpane';
import canvasSketch from 'canvas-sketch';

const settings = {
  side: 6,
};

const pane = new Pane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'side', { min: 3, step: 1, max: 24 });

function render(context, { time, side }) {
  const w = Math.max(window.innerWidth, window.innerHeight) / 2;
  context.beginPath();

  for (let i = 0; i < side; i += 1) {
    const alpha = (i * Math.PI * 2) / side;
    const radius = Math.min(w + time * 100, 0);
    const x = radius * Math.cos(alpha + time);
    const y = radius * Math.sin(alpha + time);

    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }

  context.closePath();
  context.stroke();
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

    context.fillStyle = 'rgba(21, 21, 19, 1)';
    context.fillRect(0, 0, width, height);

    return (/** @type {Params} */ { time }) => {
      context.fillStyle = 'rgba(21, 21, 19, 0.1)';
      context.fillRect(0, 0, width, height);

      context.translate(width / 2, height / 2);

      for (let i = 0; i < 50; i += 1) {
        context.strokeStyle = `hsla(${(i / 20) * 360}, 50%, 50%, 0.8)`;
        context.fillStyle = `hsla(${(i / 20) * 360}, 50%, 50%, 0.8)`;
        render(context, {
          ...settings,
          time: (time - i) % 20,
        });
      }
    };
  },
  { animate: true }
);
