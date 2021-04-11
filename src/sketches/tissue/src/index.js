import Tweakpane from 'tweakpane';
import { Circle } from '../../../utils/geometries';
import { Sketch } from '../../../utils/sketch';
import { noise } from './noise';
import { lerp, range } from './utils';

const { context, width, height, run, clear } = new Sketch();

function drawLine(length, dot1, dot2, dt) {
  range(length, (i) => {
    const progress = i / length;
    const from = dot1(dt + progress * 2);
    const to = dot2(dt + (1 - progress) * 2);

    const x = lerp(from[0], to[0], progress);
    const y = lerp(from[1], to[1], progress);

    context.fillStyle = `hsla(${lerp(0, 360, progress)}, 50%, 50%, 0.35)`;

    context.fill(new Circle(x, y, 3));
  });
}

const settings = {
  radius: 300,
  points: 10,
  dots: 100,
};
let dots = range(settings.points, (i) => {
  const cx = settings.radius * Math.cos((i * Math.PI) / (settings.points / 2));
  const cy = settings.radius * Math.sin((i * Math.PI) / (settings.points / 2));

  return (dt) => [
    cx + 100 * noise(Math.cos(dt * Math.PI), Math.sin(dt * Math.PI), i) - 50,
    cy + 100 * noise(Math.cos(dt * Math.PI), Math.sin(dt * Math.PI), settings.points - i) - 50,
  ];
});

const pane = new Tweakpane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'radius', { min: 100, max: 1000, step: 10 });
pane.addInput(settings, 'points', { min: 1, max: 24, step: 1 });
pane.addInput(settings, 'dots', { min: 1, max: 300, step: 1 });
pane.on('change', () => {
  dots = range(settings.points, (i) => {
    const cx = settings.radius * Math.cos((i * Math.PI) / (settings.points / 2));
    const cy = settings.radius * Math.sin((i * Math.PI) / (settings.points / 2));

    return (dt) => [
      cx + 100 * noise(Math.cos(dt * Math.PI), Math.sin(dt * Math.PI), i) - 50,
      cy + 100 * noise(Math.cos(dt * Math.PI), Math.sin(dt * Math.PI), settings.points - i) - 50,
    ];
  });
});

run((t) => {
  const dt = t / 5000;

  clear('#152028');
  context.translate(width / 2, height / 2);

  for (let i = 0; i < settings.points; i += 1) {
    const [x1, y1] = dots[i](dt);

    for (let j = i + 1; j < settings.points; j += 1) {
      const gradient = context.createLinearGradient(50, 50, 150, 150);
      gradient.addColorStop(0, `hsla(${360 * (j / settings.points)}, 50%, 50%, 0.5)`);
      gradient.addColorStop(1, `hsla(${360 * (i / settings.points)}, 50%, 50%, 0.5)`);

      context.strokeStyle = gradient;

      drawLine(settings.dots, dots[i], dots[j], dt);
    }

    context.fillStyle = `hsla(${lerp(0, 360, i / settings.points)}, 50%, 50%, 1)`;
    context.fill(new Circle(x1, y1, 10));
  }
});
