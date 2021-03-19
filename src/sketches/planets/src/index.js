// eslint-disable-next-line max-classes-per-file
import Tweakpane from 'tweakpane';
import { hexToRgba } from '../../../utils/hex-to-rgba';
import { randomHexColor } from '../../../utils/random-hex-color';

import { Sketch } from '../../../utils/sketch';

function getLSItem(key, defaultValue) {
  try {
    const value = localStorage.getItem(key);

    return value != null ? JSON.parse(value) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

class Star {
  constructor(context, options) {
    this.context = context;
    this.options = options;
  }

  render(t) {
    const { cx, cy, radius, rays, amplitude } = this.options;

    this.context.beginPath();

    for (let i = 0; i < 360; i += 1) {
      const angle = (i * Math.PI) / 180;
      const amp = amplitude + Math.sin(t) * (amplitude / 2);
      const x = cx + (radius + amp * Math.sin(rays * angle + t)) * Math.cos(angle);
      const y = cy + (radius + amp * Math.sin(rays * angle + t)) * Math.sin(angle);

      this.context.lineTo(x, y);
    }

    this.context.closePath();
    this.context.fillStyle = '#FDB813';
    this.context.fill();
  }
}

const settings = getLSItem('settings', {
  number: 3,
  planets: [
    { color: '#4285F4', radius: 10, orbit: 200, clockwise: true, speed: 150 },
    { color: '#DB4437', radius: 20, orbit: 300, clockwise: true, speed: 70 },
    { color: '#0F9D58', radius: 30, orbit: 400, clockwise: true, speed: 25 },
  ],
  hidePlanets: false,
});

const panes = [];
const pane = new Tweakpane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'number', { min: 1, max: 5, step: 1, label: 'Number of planets' });
pane.addInput(settings, 'hidePlanets');

settings.planets.forEach((planet, idx) => {
  const p = pane.addFolder({ title: `Planet #${idx}`, index: 0 });
  p.addInput(planet, 'color');
  p.addInput(planet, 'radius', { min: 1, step: 1, max: 100 });
  p.addInput(planet, 'orbit', { min: 10, step: 10, max: 1000 });
  p.addInput(planet, 'speed', { min: 10, step: 10, max: 1000 });
  p.addInput(planet, 'clockwise');

  panes.push(p);
});

const sketch = new Sketch();
const points = [];

const star = new Star(sketch.context, {
  cx: 0,
  cy: 0,
  radius: 80,
  rays: 40,
  amplitude: 5,
});

function collectLines(t) {
  settings.planets.forEach(({ orbit, clockwise, speed }) => {
    const d = clockwise ? 1 : -1;
    const x = Math.cos(((t * d) / 100000) * speed) * orbit;
    const y = Math.sin(((t * d) / 100000) * speed) * orbit;

    points.push({ x, y });
  });
}

function render(t) {
  sketch.clear();

  sketch.context.translate(sketch.width / 2, sketch.height / 2);

  for (let i = 0; i < points.length; i += settings.number) {
    const p0 = points[i];

    sketch.context.beginPath();
    sketch.context.moveTo(p0.x, p0.y);

    for (let j = 1; j < settings.number; j += 1) {
      const pN = points[i + j];

      sketch.context.lineTo(pN.x, pN.y);
    }

    sketch.context.strokeStyle = hexToRgba('#fff', 0.3);
    sketch.context.stroke();
  }

  if (settings.hidePlanets === false) {
    settings.planets.forEach(({ orbit, color, radius, clockwise, speed }) => {
      const d = clockwise ? 1 : -1;
      const x = Math.cos(((t * d) / 100000) * speed) * orbit;
      const y = Math.sin(((t * d) / 100000) * speed) * orbit;

      sketch.context.beginPath();
      sketch.context.arc(0, 0, orbit, 0, Math.PI * 2);
      sketch.context.strokeStyle = hexToRgba(color, 0.2);
      sketch.context.lineWidth = devicePixelRatio;
      sketch.context.stroke();

      sketch.context.beginPath();
      sketch.context.arc(x, y, radius, 0, Math.PI * 2);
      sketch.context.fillStyle = hexToRgba(color);
      sketch.context.fill();
    });
  }

  star.render(-t / 500);
}

sketch.runs([
  [collectLines, 10],
  [render, 60],
]);

pane.on('change', ({ presetKey, value }) => {
  if (presetKey === 'number') {
    if (value > settings.planets.length) {
      const lastIdx = settings.planets.length - 1;
      let last = settings.planets[settings.planets.length - 1];

      for (let i = lastIdx + 1; i < value; i += 1) {
        const planet = {
          color: randomHexColor(),
          radius: last.radius + 10,
          orbit: last.orbit + 100,
          clockwise: Math.random() > 0.5,
          speed: last.speed - 10,
        };

        last = planet;

        const p = pane.addFolder({ title: `Planet #${i}`, index: 0 });
        p.addInput(planet, 'color');
        p.addInput(planet, 'radius', { min: 1, step: 1, max: 100 });
        p.addInput(planet, 'orbit', { min: 10, step: 10, max: 1000 });
        p.addInput(planet, 'speed', { min: 10, step: 10, max: 1000 });
        p.addInput(planet, 'clockwise');

        settings.planets.push(planet);
        panes.push(p);
      }
    } else if (settings.planets.length > 1) {
      while (settings.planets.length !== value) {
        settings.planets.pop();
        panes.pop().dispose();
      }
    }

    points.length = 0;
    sketch.runs([
      [collectLines, 10],
      [render, 60],
    ]);
  }

  localStorage.setItem('settings', JSON.stringify(settings));
});
