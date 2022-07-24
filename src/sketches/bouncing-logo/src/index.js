import { Pane } from 'tweakpane';
import { raf } from '../../../utils/raf';

const settings = {
  velocity: 3,
};
const pane = new Pane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'velocity', { min: 1, max: 100, step: 1 });

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const width = window.innerWidth * window.devicePixelRatio;
const height = window.innerHeight * window.devicePixelRatio;

canvas.width = width;
canvas.height = height;

const context = canvas.getContext('2d');

context.font = '48px serif';

const position = {
  x: 10,
  y: 40,
};

const direction = {
  x: 1,
  y: 1,
};

raf(() => {
  context.clearRect(0, 0, width, height);

  position.x += direction.x * settings.velocity;
  position.y += direction.y * settings.velocity;

  if (position.x < 0) {
    direction.x = 1;
  }

  if (position.x > width - 120) {
    direction.x = -1;
  }

  if (position.y < 35) {
    direction.y = 1;
  }

  if (position.y > height - 10) {
    direction.y = -1;
  }

  context.fillText('U·ᴥ·U', position.x, position.y);
}).start();
