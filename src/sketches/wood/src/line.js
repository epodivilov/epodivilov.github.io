// eslint-disable-next-line max-classes-per-file
import { degToRad } from '../../../utils/deg-to-rad';

export class Branch extends Path2D {
  constructor(start, length, angle = 0, color = '#fff') {
    super();

    const radians = (angle * Math.PI) / 180;

    this.color = color;
    this.start = start;
    this.end = {
      x: start.x + length * Math.sin(radians),
      y: start.y - length * Math.cos(radians),
    };

    this.moveTo(this.start.x, this.start.y);
    this.lineTo(this.end.x, this.end.y);
  }
}

export class Leaf extends Path2D {
  constructor(start, length, angle = 0, color = '#fff') {
    super();

    this.color = color;
    this.start = start;
    this.end = {
      x: start.x + length * Math.sin(degToRad(angle)),
      y: start.y - length * Math.cos(degToRad(angle)),
    };

    const midX = this.start.x + (this.end.x - this.start.x) * 0.5;
    const midY = this.start.y + (this.end.y - this.start.y) * 0.5;

    const t1 = {
      x: midX + (length / 4) * Math.sin(degToRad(angle + 90)),
      y: midY - (length / 4) * Math.cos(degToRad(angle + 90)),
    };

    const t2 = {
      x: midX + (length / 4) * Math.sin(degToRad(angle - 90)),
      y: midY - (length / 4) * Math.cos(degToRad(angle - 90)),
    };

    this.moveTo(this.start.x, this.start.y);
    this.quadraticCurveTo(t1.x, t1.y, this.end.x, this.end.y);
    this.quadraticCurveTo(t2.x, t2.y, this.start.x, this.start.y);
  }
}
