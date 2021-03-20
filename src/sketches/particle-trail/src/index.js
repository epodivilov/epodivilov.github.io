import Tweakpane from 'tweakpane';
import { raf, randomBetween, range } from './utils';
import { Particle } from './particle';

function initPane(options, cb) {
  const pane = new Tweakpane({ title: 'Parameters', expanded: false });

  pane.addInput(options, 'particles', { min: 1, max: 1000, step: 1 });
  pane.addInput(options, 'scatter', { min: 1, step: 1 });
  pane.addInput(options, 'radius', { min: 1, step: 1 });
  pane.addInput(options, 'size', { min: 1, step: 1 });
  pane.addInput(options.ttl, 'min', {
    label: 'TTL (min)',
    min: 1,
    max: 5000,
    step: 1,
  });
  pane.addInput(options.ttl, 'max', {
    label: 'TTL (max)',
    min: 10,
    max: 5000,
    step: 1,
  });

  pane.on('change', () => cb());

  const paneEl = document.querySelector('.tp-dfwv');
  const stopPropagation = (e) => e.stopPropagation();

  paneEl.addEventListener('click', stopPropagation);
  paneEl.addEventListener('mousemove', stopPropagation);
  paneEl.addEventListener('touchmove', stopPropagation);
}

function createParticles(options) {
  return range(options.particles).map(() => {
    const particle = Particle.create({
      size: options.size,
      ttl: randomBetween(options.ttl.min, options.ttl.max),
      scatter: options.scatter,
      radius: options.radius,
    });

    const node = particle.spawn({ x: options.width / 2, y: options.height / 2 });

    options.container.appendChild(node);

    return particle;
  });
}

function main(options) {
  const particles = createParticles(options);

  let x = options.width / 2;
  let x2 = options.width / 2;
  let y = options.height / 2;
  let y2 = options.height / 2;

  const handleClick = ({ clientX, clientY }) => {
    x2 = clientX;
    y2 = clientY;

    particles.forEach((particle) => {
      particle.destroy();
      particle.spawn({ x: x2, y: y2 });
    });
  };

  const handleMove = (e) => {
    if (e.type === 'touchmove') {
      x2 = e.touches[0].clientX;
      y2 = e.touches[0].clientY;
    } else {
      x2 = e.clientX;
      y2 = e.clientY;
    }
  };

  document.body.addEventListener('click', handleClick);
  document.body.addEventListener('mousemove', handleMove);
  document.body.addEventListener('touchmove', handleMove);

  const { start, stop } = raf(() => {
    x -= (x - x2) * 0.2;
    y -= (y - y2) * 0.2;

    particles.forEach((particle) => {
      if (particle.destroyed) {
        particle.spawn({ x, y });
      }

      particle.update();
    });
  });

  start();

  return () => {
    document.body.removeEventListener('click', handleClick);
    document.body.removeEventListener('mousemove', handleMove);
    document.body.removeEventListener('touchmove', handleMove);

    particles.forEach((particle) => {
      particle.destroy();
      // eslint-disable-next-line no-param-reassign
      options.container.innerHTML = '';
    });

    stop();
  };
}

/* ********************************************************************* */

const settings = {
  width: window.innerWidth,
  height: window.innerHeight,
  container: document.getElementById('canvas'),
  particles: 100,
  scatter: 30,
  radius: 30,
  size: 5,
  ttl: {
    min: 500,
    max: 2500,
  },
};

let stop = main(settings);
initPane(settings, () => {
  stop();
  stop = main(settings);
});
