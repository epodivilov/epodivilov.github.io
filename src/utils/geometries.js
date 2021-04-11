// eslint-disable-next-line max-classes-per-file
export class Circle extends Path2D {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   */
  constructor(x, y, radius) {
    super();
    this.arc(x, y, radius, 0, Math.PI * 2);
  }
}

export class Line extends Path2D {
  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   */
  constructor(x1, y1, x2, y2) {
    super();
    this.moveTo(x1, y1);
    this.lineTo(x2, y2);
  }
}
