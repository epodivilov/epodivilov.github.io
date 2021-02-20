import { clamp } from './utils';

/**
 * @typedef Options
 * @property {number} options.ttl
 * @property {number} options.size
 * @property {number} options.scatter
 * @property {number} options.radius
 */

export class Particle {
  /** @param {Options} options */
  static create(options) {
    return new Particle(options);
  }

  /** @param {Options} options */
  constructor(options) {
    const el = document.createElement('div');
    el.classList.add('particle');

    this.el = el;
    this.size = options.size;
    this.ttl = options.ttl;
    this.scatter = options.scatter / 2;
    this.radius = options.radius;

    this.el.style.width = `${options.size}px`;
    this.el.style.height = `${options.size}px`;
  }

  /**
   * @param {Object} params
   * @param {number} param.x
   * @param {number} param.y
   * @returns {HTMLElement}
   */
  spawn({ x, y }) {
    this.startTime = new Date();
    this.destroyed = false;

    const angle = 2 * Math.PI * Math.random();
    const radius = this.scatter * this.scatter * Math.random();

    this.position = {
      y: y - Math.sqrt(radius) * Math.sin(angle),
      y2: y + Math.sin(angle) * this.radius,
      x: x - Math.sqrt(radius) * Math.cos(angle),
      x2: x + Math.cos(angle) * this.radius,
    };

    this.update();

    return this.el;
  }

  update() {
    if (this.destroyed) {
      return;
    }

    const dt = new Date() - this.startTime;
    const tx = this.position.x + (this.position.x - this.position.x2) * (dt / this.ttl);
    const ty = this.position.y + (this.position.y - this.position.y2) * (dt / this.ttl);

    const opacity = clamp(1 - dt / this.ttl, 0, 1);
    const size = clamp(Math.round(this.size - this.size * (dt / this.ttl)), 0, this.size);

    this.el.style.opacity = opacity;
    this.el.style.transform = `translate(${tx}px, ${ty}px) scale(${size / this.size})`;

    if (size === 0) {
      this.destroy();
    }
  }

  destroy() {
    this.destroyed = true;
  }
}
