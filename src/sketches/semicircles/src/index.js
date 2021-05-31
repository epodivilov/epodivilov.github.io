import { Pane } from 'tweakpane';
import canvasSketch from 'canvas-sketch';
import { range } from '../../../utils/range';

const settings = {
  circles: 10,
  step: 25,
  speed: 2,
};

const pane = new Pane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'circles', { min: 1, max: 50, step: 1, label: 'length' });
pane.addInput(settings, 'step', { min: 1, max: 100, step: 1 });
pane.addInput(settings, 'speed', { min: 1, max: 10, step: 1 });

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

      context.lineWidth = 10;
      context.lineCap = 'round';

      range(settings.circles).forEach((i) => {
        const length = Math.PI / 2;
        const t = settings.speed * time;
        const progress = (Math.sin(t) + 1) / 2;
        const angle = progress * length + length / 2;

        context.strokeStyle = `hsl(${(i / settings.circles + ((time / 2) % 1)) * 360}, 70%, 50%)`;
        context.beginPath();
        context.arc(
          0,
          0,
          settings.step * (i + 1),
          -angle + (t - Math.sqrt(i)) ,
          angle + (t - Math.sqrt(i))
        );

        context.stroke();
      });
    };
  },
  { animate: true }
);
