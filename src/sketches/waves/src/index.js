import Tweakpane from 'tweakpane';
import canvasSketch from 'canvas-sketch';

const pane = new Tweakpane({ title: 'Parameters', expanded: false });

/**
 * @typedef {Object} Params
 * @property {CanvasRenderingContext2D} context
 * @property {number} width
 * @property {number} height
 * @property {number} time
 * @property {number} deltaTime
 */
canvasSketch(
  (/** @type {Params} */ params) => {
    const { context, width, height } = params;

    const settings = {
      sectors: 16,
      amplitude: 40,
      frequency: 40,
    };

    pane.addInput(settings, 'sectors', { min: 1, step: 1 });
    pane.addInput(settings, 'amplitude', { min: 1, step: 1 });
    pane.addInput(settings, 'frequency', { min: 1, step: 1 });

    return (/** @type {Params} */ { time }) => {
      context.fillStyle = '#152028';
      context.translate(width / 2, height / 2);
      context.fillRect(-width / 2, -height / 2, width, height);

      context.beginPath();

      for (let i = 0; i < settings.sectors; i += 1) {
        const alpha = (i * -Math.PI * 4) / settings.sectors;

        context.save();

        context.rotate(alpha / 2);

        let x = 0;
        let y = 0;

        context.beginPath();

        while (x < width * 1.5) {
          y = (settings.amplitude + x / 10) * Math.sin(x / settings.frequency + -time * 2);

          context.lineTo(x, y);
          x += 1;
        }

        context.restore();
        context.save();
        context.rotate(alpha / 2 + 10 * (Math.PI / 180));

        while (x >= 0) {
          y = (settings.amplitude + x / 10) * Math.sin(x / settings.frequency + -time * 2);

          context.lineTo(x, y);
          x -= 1;
        }

        context.closePath();

        context.fillStyle = `hsl(${(i / settings.sectors) * 360}, 50%, 50%)`;
        context.fill();

        context.restore();
      }
    };
  },
  { animate: true }
);
