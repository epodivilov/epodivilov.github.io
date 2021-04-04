import Tweakpane from 'tweakpane';
import { debounce } from '../../../utils/debounce';
import { omit } from '../../../utils/omit';
import { Sketch } from '../../../utils/sketch';
import { parseQuery, updateQuery } from './utils';

function createImage(settings) {
  return new Promise((resolve) => {
    const worker = new Worker('./worker.js');

    worker.onmessage = ({ data }) => {
      resolve(data);
    };

    worker.postMessage(settings);
  });
}

const DEFAULT_SETTINGS = {
  max: 50,
  scale: 4,
  x: -0.5,
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
  image: null,
  area: null,
  loading: false,
  refresh() {
    this.loading = true;

    return createImage(settings).then((result) => {
      this.image = result;
      this.loading = false;
      updateQuery(omit(settings, ['width', 'height']));
    });
  },
};

store.refresh();

pane.addInput(settings, 'max', { min: 50, max: 1000, step: 10, label: 'Iterations' });
pane.addMonitor(settings, 'scale');
pane.addMonitor(settings, 'x');
pane.addMonitor(settings, 'y');
pane.addSeparator();
pane.addButton({ title: 'Reset' }).on(
  'click',
  debounce(() => {
    Object.assign(settings, DEFAULT_SETTINGS);
    pane.refresh();
    store.refresh();
  }, 500)
);
pane.on(
  'change',
  debounce(() => store.refresh(), 500)
);

window.addEventListener('popstate', () => {
  Object.assign(settings, parseQuery(window.location.search));
  store.refresh();
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

      store.refresh();
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

      store.refresh();
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

  if (store.loading) {
    sketch.context.font = '48px serif';
    sketch.context.fillStyle = 'white';
    sketch.context.fillText('Processing...', settings.width / 2 - 120, settings.height / 2);
  }
});
