import { Pane } from 'tweakpane';
import Noise from 'perlin-noise-3d';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  AmbientLight,
  CylinderBufferGeometry,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

const parameters = {
  width: window.innerWidth,
  height: window.innerHeight,
  radius: 20,
  tileRadius: 0.1,
  waterLevel: 0.25,

  offsetX: 0,
  offsetY: 0,
};

const pane = new Pane({ title: 'Parameters', expanded: false });
pane.addInput(parameters, 'radius', { min: 1, max: 100, step: 1, label: 'Map radius' });
pane.addInput(parameters, 'tileRadius', { min: 0.01, max: 1, step: 0.01, label: 'Tile radius' });
pane.addInput(parameters, 'waterLevel', { min: 0, max: 1, step: 0.1, label: 'Water level' });

const canvas = document.getElementById('canvas');

const renderer = new WebGLRenderer({ canvas });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.setSize(parameters.width, parameters.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x87ceeb);

const scene = new Scene();

const camera = new PerspectiveCamera(75, parameters.width / parameters.height, 0.1, 500);
camera.position.set(0, 2, 5);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0xffffff, 0.7);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const COLORS = {
  WATER: '#444476',
  BEACH: '#ceba91',
  FOREST: '#457558',
  JUNGLE: '#71935f',
  SAVANNAH: '#8fa960',
  DESERT: '#cbd2a1',
  MOUNTAINS: '#bbbbac',
  SNOW: '#e4e3e8',
};

const MATERIALS = {
  WATER: new MeshPhongMaterial({
    color: COLORS.WATER,
    emissive: 0x04131b,
    flatShading: true,
  }),
  BEACH: new MeshPhongMaterial({
    color: COLORS.BEACH,
    emissive: 0x04131b,
    flatShading: true,
  }),
  FOREST: new MeshPhongMaterial({
    color: COLORS.FOREST,
    emissive: 0x04131b,
    flatShading: true,
  }),
  JUNGLE: new MeshPhongMaterial({
    color: COLORS.JUNGLE,
    emissive: 0x04131b,
    flatShading: true,
  }),
  SAVANNAH: new MeshPhongMaterial({
    color: COLORS.SAVANNAH,
    emissive: 0x04131b,
    flatShading: true,
  }),
  DESERT: new MeshPhongMaterial({
    color: COLORS.DESERT,
    emissive: 0x04131b,
    flatShading: true,
  }),
  MOUNTAINS: new MeshPhongMaterial({
    color: COLORS.MOUNTAINS,
    emissive: 0x04131b,
    flatShading: true,
  }),
  SNOW: new MeshPhongMaterial({
    color: COLORS.SNOW,
    emissive: 0x04131b,
    flatShading: true,
  }),
};

function getMaterial(height) {
  if (height < 0.1) return MATERIALS.WATER;
  if (height < 0.15) return MATERIALS.BEACH;
  if (height < 0.2) return MATERIALS.FOREST;
  if (height < 0.4) return MATERIALS.JUNGLE;
  if (height < 0.7) return MATERIALS.SAVANNAH;
  if (height < 0.8) return MATERIALS.DESERT;
  if (height < 0.9) return MATERIALS.MOUNTAINS;
  return MATERIALS.SNOW;
}

let tiles = [];

const noise = new Noise();
function generateTiles(seed) {
  tiles.forEach((tile) => scene.remove(tile));
  tiles = [];

  const { radius, tileRadius } = parameters;
  const tileWidth = 2 * tileRadius * 0.86603;
  const tileHeight = tileWidth / 2;
  const tileThickness = 0.2;

  const geometry = new CylinderBufferGeometry(tileRadius, tileRadius, tileThickness, 6, 1);

  if (seed) {
    noise.noiseSeed(seed);
  }

  for (let q = -radius; q <= radius; q += 1) {
    for (let r = -radius; r <= radius; r += 1) {
      if (Math.abs(q + r) <= radius) {
        let x = q * tileWidth;
        const z = 1.5 * r * tileRadius;

        let offset = 0;
        if (r % 2 !== 0) {
          offset = Math.sign(r) * (Math.abs(r) - 1) * tileHeight + (r % 2) * tileHeight;
        } else {
          offset = r * tileHeight;
        }
        x += offset;

        const nx = (q / radius - 0.5) * 1 + parameters.offsetX;
        const ny = (r / radius - 0.5) * 1 + parameters.offsetY;
        const e = 1 * noise.get(1 * nx, 1 * ny) + 0.5 * noise.get(2 * nx, 2 * ny) + 0.25 * noise.get(4 * nx, 4 * ny);

        // e = Math.round(e * 64) / 64;
        const height = e;

        const dy = Math.max(height ** 2, 0.15) * 2;
        const mesh = new Mesh(geometry, getMaterial(height - parameters.waterLevel));

        mesh.position.set(x, (dy * tileThickness) / 2, z);
        mesh.scale.set(1, dy, 1);

        tiles.push(mesh);
        scene.add(mesh);
      }
    }
  }
}

pane.addButton({ title: 'Generate' }).on('click', () => generateTiles(Date.now()));
pane.on('change', (event) => {
  if (event.last) {
    generateTiles();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    parameters.offsetX += 0.1;
  }
  if (e.key === 'ArrowLeft') {
    parameters.offsetX -= 0.1;
  }
  if (e.key === 'ArrowUp') {
    parameters.offsetY -= 0.1;
  }
  if (e.key === 'ArrowDown') {
    parameters.offsetY += 0.1;
  }
  generateTiles();
});

// const clock = new Clock();
const tick = () => {
  // const elapsedTime = clock.getElapsedTime();
  // camera.position.x = Math.cos(elapsedTime/30) * 5;
  // camera.position.z = Math.sin(elapsedTime/30) * 5;
  // camera.lookAt(new Vector3(0, 0, 0));

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

generateTiles();
tick();
