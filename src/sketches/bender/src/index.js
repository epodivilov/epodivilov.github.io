import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

/** Canvas */
const canvas = document.getElementById('canvas');

/** Scene */
const scene = new THREE.Scene();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load('./models/bender.glb', (gltf) => {
  gltf.scene.scale.set(0.3, 0.3, 0.3);
  gltf.scene.position.set(0, -1.5, 0);
  scene.add(gltf.scene);
});

/** Lights */
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(0.25, 3, -2.25);
light.castShadow = true;
light.shadow.mapSize.set(1024, 1024);
light.shadow.camera.far = 15;
light.shadow.normalBias = 0.05;
scene.add(light);

/** Sizes */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/** Camera */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1, 0.5, -2);
scene.add(camera);

/** Controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/** Renderer */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x2993bb);
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

(function tick() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
})();
