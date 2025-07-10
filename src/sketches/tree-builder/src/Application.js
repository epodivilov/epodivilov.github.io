import {
  AmbientLight,
  CineonToneMapping,
  DirectionalLight,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Application {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Object} options
   * @param {number} options.width
   * @param {number} options.height
   * @param {number} options.pixelRatio
   */
  constructor(canvas, options) {
    this.canvas = canvas;

    /** @type {import('./AbstractObject').AbstractObject[]} */
    this.children = [];

    this.renderer = new WebGLRenderer({ canvas, alpha: false });
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setSize(options.width, options.height);
    this.renderer.setPixelRatio(Math.min(options.pixelRatio, 2));

    this.scene = new Scene();

    const aspect = options.width / options.height;
    this.camera = new PerspectiveCamera(75, aspect, 0.1, 100);
    this.camera.position.set(2, 2, 2);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;

    const ambientLight = new AmbientLight(0xffffff, 0.25);
    const pointLight = new DirectionalLight(0xffffff, 0.75);
    pointLight.position.set(4, 3, 1);
    this.scene.add(ambientLight, pointLight);
  }

  /**
   * @param {import('./AbstractObject').AbstractObject} child
   */
  appendChild(child) {
    this.children.push(child);

    child.onAppend(this.scene);
  }

  /**
   * @param {Object} options
   * @param {number} options.delta
   * @param {number} options.elapsed
   */
  update(options) {
    this.children.forEach((child) => {
      child.update(options);
    });

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    requestAnimationFrame(() => this.tick());
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.update({
      delta: this.delta,
      elapsed: this.elapsed,
    });

    this.frameId = requestAnimationFrame(() => this.tick());
  }

  destroy() {
    this.stop();
  }
}
