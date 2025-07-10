/* eslint-disable max-classes-per-file */
import { ConeGeometry, CylinderGeometry, Group, Mesh, MeshPhongMaterial } from 'three';
import { random } from '../../../utils/random';

import { AbstractObject } from './AbstractObject';
import { Application } from './Application';

class Tree extends AbstractObject {
  constructor() {
    super();

    // const geometry = new ConeGeometry(1, 0.75, 5);
    const material = new MeshPhongMaterial({ color: 0x42692f, flatShading: true });
    const level1 = new Mesh(new ConeGeometry(1, 0.75, Math.floor(random(9, 12))), material);
    level1.position.y = 0;
    level1.rotation.y = random(-Math.PI, Math.PI);
    level1.scale.set(1, 1, 1);
    const level2 = new Mesh(new ConeGeometry(1, 0.75, Math.floor(random(7, 9))), material);
    level2.position.y = 0.5;
    level1.rotation.y = random(-Math.PI, Math.PI);
    level2.scale.set(0.7, 1, 0.7);
    const level3 = new Mesh(new ConeGeometry(1, 0.75, Math.floor(random(5, 7))), material);
    level3.position.y = 1;
    level1.rotation.y = random(-Math.PI, Math.PI);
    level3.scale.set(0.5, 1, 0.5);

    const trunk = new Mesh(
      new CylinderGeometry(0.1, 0.1, 1, 32),
      new MeshPhongMaterial({ color: 0x765c48, flatShading: true })
    );
    trunk.position.y = -0.25;

    this.instance = new Group();

    this.instance.add(level1, level2, level3, trunk);
  }
}

const app = new Application(document.getElementById('canvas'), {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio,
});

app.appendChild(new Tree());

app.start();
