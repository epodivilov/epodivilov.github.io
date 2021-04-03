import Tweakpane from 'tweakpane';
import { omit } from '../../../utils/omit';
import { Sketch } from '../../../utils/sketch';
import { calcIterations, indexToCoordinate, createImageData, parseQuery, calcColor, updateQuery } from './utils';

const STEPS = [0, 0.2, 0.4, 0.6, 0.8, 1];
const PALETTE = [
  [89, 14, 34, 255],
  [12, 3, 68, 255],
  [52, 137, 218, 255],
  [255, 255, 255, 255],
  [255, 210, 47, 255],
  [174, 67, 13, 255],
];

function createImage(settings) {
  const { width, height, x, y, scale, max } = settings;
  const ratio = height / width;

  return createImageData({ width, height }, (index) => {
    const point = indexToCoordinate(index, { scale, width, height, center: { x, y }, ratio });
    const iterations = calcIterations(point, max);

    return calcColor(iterations / max, STEPS, PALETTE, 0.7) || [0, 0, 0, 255];
  });
}

const DEFAULT_SETTINGS = {
  max: 50,
  scale: 4,
  x: -0.3,
  y: 0,
};

const pane = new Tweakpane({ title: 'Parameters', expanded: false });
const sketch = new Sketch();
const settings = {
  width: sketch.width,
  height: sketch.height,
  ...DEFAULT_SETTINGS,
  ...parseQuery(window.location.search),
};

const store = {
  image: createImage(settings),
  area: null,
};

pane.addInput(settings, 'max', { min: 50, max: 1000, step: 10, label: 'Iterations' });
pane.addMonitor(settings, 'scale');
pane.addMonitor(settings, 'x');
pane.addMonitor(settings, 'y');
pane.addSeparator();
pane.addButton({ title: 'Reset' }).on('click', () => {
  Object.assign(settings, DEFAULT_SETTINGS);
  pane.refresh();
  store.image = createImage(settings);
  updateQuery(omit(settings, ['width', 'height']));
});
pane.on('change', () => {
  store.image = createImage(settings);
  updateQuery(omit(settings, ['width', 'height']));
});

window.addEventListener('popstate', () => {
  Object.assign(settings, parseQuery(window.location.search));
  store.image = createImage(settings);
});

window.addEventListener('mousedown', ({ target, clientX, clientY }) => {
  if (target !== sketch.context.canvas) {
    return;
  }

  store.area = {
    x: clientX * devicePixelRatio,
    y: clientY * devicePixelRatio,
    width: 0,
    height: 0,
  };
});

window.addEventListener('mouseup', () => {
  if (store.area != null) {
    const { x, y, width } = store.area;

    const ratio = settings.height / settings.width;
    const dx = ((x * settings.scale) / settings.width - settings.scale / 2) / ratio;
    const dy = ((y * settings.scale) / settings.height - settings.scale / 2) * -1;

    if (width > 0) {
      settings.x += dx;
      settings.y += dy;
      settings.scale *= width / settings.width;

      store.image = createImage(settings);

      updateQuery(omit(settings, ['width', 'height']));
    }
  }

  store.area = null;
});

window.addEventListener('mousemove', ({ clientX }) => {
  if (store.area != null) {
    store.area.width = Math.abs(clientX * devicePixelRatio - store.area.x);
    store.area.height = store.area.width * (settings.height / settings.width);
  }
});

window.addEventListener('touchstart', ({ target, touches }) => {
  if (target !== sketch.context.canvas) {
    return;
  }

  store.area = {
    x: touches[0].clientX * devicePixelRatio,
    y: touches[0].clientY * devicePixelRatio,
    width: 0,
    height: 0,
  };
});

window.addEventListener('touchend', () => {
  if (store.area != null) {
    const { x, y, width } = store.area;

    const ratio = settings.height / settings.width;
    const dx = ((x * settings.scale) / settings.width - settings.scale / 2) / ratio;
    const dy = ((y * settings.scale) / settings.height - settings.scale / 2) * -1;

    if (width > 0) {
      settings.x += dx;
      settings.y += dy;
      settings.scale *= width / settings.width;

      store.image = createImage(settings);

      updateQuery(omit(settings, ['width', 'height']));
    }
  }

  store.area = null;
});

window.addEventListener('touchmove', ({ touches }) => {
  if (store.area != null) {
    if (settings.height > settings.width) {
      store.area.height = Math.abs(touches[0].clientY * devicePixelRatio - store.area.y);
      store.area.width = store.area.height / (settings.height / settings.width);
    } else {
      store.area.width = Math.abs(touches[0].clientX * devicePixelRatio - store.area.x);
      store.area.height = store.area.width * (settings.height / settings.width);
    }
  }
});

sketch.run(() => {
  sketch.clear('#000');

  if (store.image != null) {
    sketch.context.putImageData(store.image, 0, 0);
  }

  if (store.area != null) {
    sketch.context.beginPath();
    sketch.context.strokeStyle = 'red';
    sketch.context.lineWidth = devicePixelRatio;

    const { x, y, width, height } = store.area;

    const cx = x - width / 2;
    const cy = y - height / 2;

    sketch.context.rect(cx, cy, width, height);
    sketch.context.stroke();
  }
});
