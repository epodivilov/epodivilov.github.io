import { debounce, raf } from './utils';

const settings = {
  canvas: document.getElementById('canvas'),
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  hue: 25,
  saturation: 60,
  lightness: 50,
  circles: 17,
  points: 500,
  offset: 2,
  speed: 1,
  rays: 6,
};

function initPane(options) {
  const pane = new Tweakpane({ title: 'Parameters', expanded: false });
  pane.addInput(options, 'theme', { options: { Dark: 'dark', Light: 'light' } }).on('change', (value) => {
    if (value === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  });
  pane.addSeparator();
  pane.addInput(options, 'hue', { min: 0, max: 360, step: 1 });
  pane.addInput(options, 'saturation', { min: 0, max: 100, step: 1 });
  pane.addInput(options, 'lightness', { min: 0, max: 100, step: 1 });
  pane.addSeparator();
  pane.addInput(options, 'circles', { min: 1, step: 1 });
  pane.addInput(options, 'points', { min: 3, step: 1 });
  pane.addSeparator();
  pane.addInput(options, 'offset', { min: 1, step: 1 });
  pane.addInput(options, 'speed', { min: 0, step: 1 });
  pane.addInput(options, 'rays', { min: 1, step: 1 });
}

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Object} options
 */
function pathFabric(context, options) {
  /**
   * @param {number} baseRadius
   * @param {string} color
   * @param {number} amplitude
   * @param {number} offset
   */
  return function draw(baseRadius, color, amplitude, offset) {
    const points = options.points;

    context.beginPath();
    for (let i = 0; i <= points; i++) {
      const alpha = (i * Math.PI * 2) / points;
      const radius = baseRadius + amplitude * Math.sin(alpha * options.rays + offset);
      const x = radius * Math.cos(alpha);
      const y = radius * Math.sin(alpha);

      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.closePath();

    context.fillStyle = color;
    context.fill();
  };
}

/**
 * @param {Object} options
 * @param {HTMLCanvasElement} options.canvas
 * @param {'dark' | 'light'} options.theme
 * @param {number} options.hue
 * @param {number} options.saturation
 * @param {number} options.lightness
 * @param {number} options.circles
 * @param {number} options.points
 * @param {number} options.offset
 * @param {number} options.speed
 */
function initCanvas(options) {
  /** @type {CanvasRenderingContext2D} */
  const context = options.canvas.getContext('2d');

  const draw = pathFabric(context, options);

  let hue = 0;
  const render = raf((timestamp) => {
    const { saturation, lightness, offset, speed, circles, theme } = options;

    const { width, height } = context.canvas;

    context.fillStyle = theme === 'dark' ? '#152028' : '#E9FCFF';
    context.fillRect(-width / 2, -height / 2, width, height);

    hue += 0.7;

    for (let i = 0; i < circles; i++) {
      const radius = (width * 0.30) - i * 10;
      const color = `hsl(${hue + i * options.hue}, ${saturation}%, ${lightness}%)`;
      const step = (i * Math.PI) / offset + 3 * (timestamp / (2000 / speed));
      const amplitude = (width * 0.05) + 1.5 * (circles - i) * Math.sin(timestamp / (1000 / speed));

      draw(radius, color, amplitude, step);
    }
  }, 24);

  const resizeHandler = debounce(() => {
    const size = Math.floor(Math.min(window.innerHeight, window.innerWidth) * 0.9);
    options.canvas.width = size;
    options.canvas.height = size;
    context.translate(size / 2, size / 2);

    render();
  }, 500);

  window.addEventListener('resize', resizeHandler);

  resizeHandler();
}

initPane(settings);
initCanvas(settings);