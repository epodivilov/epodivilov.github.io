// import { Pane } from 'tweakpane';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

// const pane = new Pane({ title: 'Parameters', expanded: false });

function rand(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const gradientMap = textureLoader.load('./textures/gradients.jpg');
const map = textureLoader.load('./textures/donut.jpg');

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.x = 0;
pointLight.position.y = 4;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Fonts
 */
const fontLoader = new FontLoader();
const textMaterial = new THREE.MeshToonMaterial({ color: 0xfed90f, gradientMap });

fontLoader.load('./fonts/akbar.json', (font) => {
  const theGeometry = new TextGeometry('The', {
    font,
    size: 0.2,
    height: 0.2,
    curveSegments: 35,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 35,
  });
  theGeometry.center();

  const simpsonsGeometry = new TextGeometry('Simpsons', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 35,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 35,
  });
  simpsonsGeometry.center();

  const theText = new THREE.Mesh(theGeometry, textMaterial);
  const simpsonsText = new THREE.Mesh(simpsonsGeometry, textMaterial);

  theText.position.y = 0.5;

  scene.add(theText, simpsonsText);
});

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const donutMaterial = new THREE.MeshToonMaterial({ color: 0xdfb77e, map, gradientMap });

const length = 100;
for (let i = 0; i < length; i += 1) {
  const donut = new THREE.Mesh(donutGeometry, donutMaterial);

  donut.position.x = rand(-5, 5);
  donut.position.y = rand(-5, 5);
  donut.position.z = rand(-5, 5);

  donut.rotation.x = rand(0, Math.PI);
  donut.rotation.y = rand(0, Math.PI);

  const scale = rand(0.1, 0.8);
  donut.scale.set(scale, scale, scale);

  scene.add(donut);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, -0.25, 3);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x70d1fe, 0);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime() / 10;

  camera.position.x = Math.cos(elapsedTime);
  camera.position.y = Math.sin(elapsedTime);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
