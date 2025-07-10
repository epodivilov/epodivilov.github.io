export class AbstractObject {
  constructor() {}

  /**
   * @param {import('three').Scene} scene
   */
  onAppend(scene) {
    if (this.instance) {
      scene.add(this.instance);
    }
  }

  /**
   * @param {Object} options
   * @param {number} options.delta
   * @param {number} options.elapsed
   */
  update(options) {}
}
