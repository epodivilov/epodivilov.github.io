import { Body, Box, Vec3 } from 'cannon-es';
import { BoxBufferGeometry, Mesh, MeshStandardMaterial, TextureLoader, Vector2 } from 'three';

const textureLoader = new TextureLoader();

const basecolorTx = textureLoader.load('./textures/stone/basecolor.jpg');
const ambientTx = textureLoader.load('./textures/stone/ambient-occlusion.jpg');
const heightTx = textureLoader.load('./textures/stone/height.png');
const normalTx = textureLoader.load('./textures/stone/normal.jpg');
const roughnessTx = textureLoader.load('./textures/stone/roughness.jpg');

const boxGeometry = new BoxBufferGeometry(1, 1, 1);
const material = new MeshStandardMaterial({
  metalness: 0.1,
  roughness: 0.4,
  map: basecolorTx,
  aoMap: ambientTx,
  aoMapIntensity: 0.01,
  displacementMap: heightTx,
  displacementScale: 0.0001,
  transparent: true,
  roughnessMap: roughnessTx,
  normalMap: normalTx,
  normalScale: new Vector2(0.5, 0.5),
});
const shape = new Box(new Vec3(0.5, 0.5, 0.5));

export function createWall(width, height, depth) {
  const objects = [];

  const halfWidth = Math.floor(width / 2);

  for (let y = 0; y < height; y += 1) {
    for (let x = -halfWidth; x <= halfWidth; x += 1) {
      for (let z = 0; z < depth; z += 1) {
        const position = { x, y: y + 1, z: -z };
        const mesh = new Mesh(boxGeometry, material);
        mesh.castShadow = true;
        mesh.position.copy(position);

        const body = new Body({ mass: 1, shape });
        body.position.copy(position);

        objects.push({ mesh, body });
      }
    }
  }

  return objects;
}
