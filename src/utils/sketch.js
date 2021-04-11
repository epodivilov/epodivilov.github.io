export class Sketch {
  /** @type {HTMLCanvasElement} */
  #canvas;

  /** @type {CanvasRenderingContext2D} */
  context;

  /** @type {number|null} */
  #raf = null;

  constructor() {
    this.#canvas = document.createElement('canvas');
    this.context = this.#canvas.getContext('2d');

    this.#canvas.width = window.innerWidth * devicePixelRatio;
    this.#canvas.height = window.innerHeight * devicePixelRatio;

    document.body.appendChild(this.#canvas);

    window.addEventListener('resize', () => {
      this.#canvas.width = window.innerWidth * devicePixelRatio;
      this.#canvas.height = window.innerHeight * devicePixelRatio;
    });
  }

  get width() {
    return this.#canvas.width;
  }

  get height() {
    return this.#canvas.height;
  }

  clear = (color = '#152028') => {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
  };

  /**
   * @param {(timestamp:number, dt: number) => void} callback
   * @param {number} fps
   */
  run = (callback, fps = 60) => {
    if (this.#raf != null) {
      cancelAnimationFrame(this.#raf);
    }

    const delay = 1000 / fps;
    let time = null;
    let frame = -1;
    let last = 0;

    /** @param {number} timestamp */
    const loop = (timestamp) => {
      if (time === null) {
        time = timestamp;
      }

      const seg = Math.floor((timestamp - time) / delay);

      if (seg > frame) {
        frame = seg;

        this.context.save();
        callback(timestamp, timestamp - last);
        this.context.restore();

        last = timestamp;
      }

      this.#raf = requestAnimationFrame(loop);
    };

    loop(0);
  };

  /**
   * @param {[(timestamp:number) => void, number][]} tuples
   */
  runs = (tuples = []) => {
    if (this.#raf != null) {
      cancelAnimationFrame(this.#raf);
    }

    const loops = tuples.map(([cb, fps = 60]) => {
      const delay = 1000 / fps;
      let time = null;
      let frame = -1;

      return (timestamp) => {
        if (time === null) {
          time = timestamp;
        }

        const seg = Math.floor((timestamp - time) / delay);

        if (seg > frame) {
          frame = seg;
          this.context.save();
          cb(timestamp);
          this.context.restore();
        }
      };
    });

    const mainLoop = (timestamp) => {
      loops.forEach((cb) => cb(timestamp));

      this.#raf = requestAnimationFrame(mainLoop);
    };

    mainLoop(0);
  };
}
