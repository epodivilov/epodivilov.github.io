import Tweakpane from 'tweakpane';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  AmbientLight,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  ParametricBufferGeometry,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three';

import { klein } from './geometries/klein';
import { sinusSurface } from './geometries/sinus-surface';
import { cosinusSurface } from './geometries/cosinus-surface';
import { tractroid } from './geometries/tractroid';
import { paraboloid } from './geometries/paraboloid';
import { catenoid } from './geometries/catenoid';
import { helicoid } from './geometries/helicoid';
import { mobius } from './geometries/mobius';
import { appleSurface } from './geometries/apple-surface';
import { pillow } from './geometries/pillow';
import { fishSurface } from './geometries/fish-surface';
import { jetSurface } from './geometries/jet-surface';
import { kidneySurface } from './geometries/kidney-surface';
import { triaxialTeardrop } from './geometries/trixial-teardrop';
import { drop } from './geometries/drop';
import { seashell } from './geometries/seashell';
import { waveBall } from './geometries/wave-ball';
import { trixialTritorus } from './geometries/trixial-tritorus';
import { wreath } from './geometries/wreath';
import { umbilicTorus } from './geometries/umbilic-torus';

import { calculateOptimalScale, raf } from './utils';

const geometries = [
  new ParametricBufferGeometry(appleSurface, 50, 50),
  new ParametricBufferGeometry(catenoid, 50, 50),
  new ParametricBufferGeometry(cosinusSurface, 50, 50),
  new ParametricBufferGeometry(drop, 50, 50),
  new ParametricBufferGeometry(fishSurface, 50, 50),
  new ParametricBufferGeometry(helicoid, 50, 50),
  new ParametricBufferGeometry(jetSurface, 50, 50),
  new ParametricBufferGeometry(kidneySurface, 50, 50),
  new ParametricBufferGeometry(klein, 50, 50),
  new ParametricBufferGeometry(mobius, 50, 50),
  new ParametricBufferGeometry(paraboloid, 50, 50),
  new ParametricBufferGeometry(pillow, 50, 50),
  new ParametricBufferGeometry(seashell, 50, 50),
  new ParametricBufferGeometry(sinusSurface, 50, 50),
  new ParametricBufferGeometry(tractroid, 50, 50),
  new ParametricBufferGeometry(triaxialTeardrop, 50, 50),
  new ParametricBufferGeometry(trixialTritorus, 50, 50),
  new ParametricBufferGeometry(umbilicTorus, 50, 50),
  new ParametricBufferGeometry(waveBall, 50, 50),
  new ParametricBufferGeometry(wreath, 50, 50),
];

const settings = {
  geometryIdx: 0,
  controls: false,
};
const pane = new Tweakpane({ title: 'Parameters', expanded: false });
pane.addInput(settings, 'controls');
pane.addInput(settings, 'geometryIdx', {
  options: {
    'Apple surface': 0,
    Catenoid: 1,
    'Cosinus surface': 2,
    Drop: 3,
    'Fish surface': 4,
    Helicoid: 5,
    'Jet surface': 6,
    'Kidney surface': 7,
    'Klein bottle': 8,
    'Mobius band': 9,
    Paraboloid: 10,
    Pillow: 11,
    Seashell: 12,
    'Sinus surface': 13,
    Tractroid: 14,
    'Triaxial teardrop': 15,
    'Trixial tritorus': 16,
    'Umbilic torus': 17,
    'Wave ball': 18,
    Wreath: 19,
  },
});

function initRenderer({ container }) {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return renderer;
}

function initCamera() {
  const cam = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
  cam.position.y = 600;

  cam.add(new PointLight(0xffffff, 0.8));

  window.addEventListener('resize', () => {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
  });

  return cam;
}

function initScene() {
  const scene = new Scene();
  const material = new MeshPhongMaterial({ side: DoubleSide });
  const object = new Mesh(geometries[settings.geometryIdx], material);
  object.position.set(0, 0, 0);
  object.scale.multiplyScalar(calculateOptimalScale(object, 200));

  settings.object = object;

  scene.add(new AmbientLight(0xcccccc, 0.4));
  scene.add(object);

  pane.on('change', (event) => {
    if (event.presetKey === 'geometryIdx') {
      object.geometry = geometries[event.value];
      object.scale.multiplyScalar(calculateOptimalScale(object, 200));
    }
  });

  return scene;
}

function action() {
  const renderer = initRenderer({ container: document.body });
  const camera = initCamera();
  const scene = initScene();

  scene.add(camera);

  const controls = new OrbitControls(camera, renderer.domElement);

  pane.on('change', (event) => {
    if (event.presetKey === 'controls') {
      controls.reset();
      controls.enabled = settings.controls;
    }
  });

  let hue = 0;

  raf((time) => {
    hue += 1;
    const t = time / 10000;

    if (settings.controls === false) {
      scene.traverse((object) => {
        if (object.isMesh === true) {
          object.rotation.set(t * 5, t * 2.5, 0);
          object.material.color.setHSL(hue / 1000, 0.5, 0.5);
        }
      });

      camera.position.x = Math.cos(t) * 80;
      camera.position.z = Math.sin(t) * 80;
    }

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  })();
}

action();
