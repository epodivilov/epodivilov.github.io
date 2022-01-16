import { Pane } from 'tweakpane';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { clamp, lerp } from 'three/src/math/MathUtils';
import { animate, powerOf } from './utils';

const pane = new Pane({ title: 'Parameters', expanded: false });

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('./particle.png');

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
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Galaxy
 */
const parameters = {};
parameters.count = 100000;
parameters.size = 0.01;
parameters.radius = 0;
parameters.branches = 5;
parameters.spin = 2;
parameters.spread = 1;
parameters.insideColor = '#ff6030';
parameters.outsideColor = '#1b3984';

let geometry = null;
let material = null;

/** @type {THREE.Points} */
let points = null;

const generateGalaxy = () => {
  // Destroy old galaxy
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  /**
   * Geometry
   */
  geometry = new THREE.BufferGeometry();

  /**
   * Material
   */
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    alphaMap: particleTexture,
    transparent: true,
  });

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  for (let i = 1; i < parameters.count; i += 1) {
    const i3 = i * 3;

    const r = (i / parameters.count) * parameters.radius;
    const radius = (i / parameters.count) ** 2 * parameters.radius;

    const spinAngle = radius * parameters.spin;
    const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    let randomX = Math.random() * (Math.random() < 0.5 ? 1 : -1);
    let randomY = Math.random() * (Math.random() < 0.5 ? 1 : -1);
    let randomZ = Math.random() * (Math.random() < 0.5 ? 1 : -1);

    const mag = Math.sqrt(randomX * randomX + randomY * randomY + randomZ * randomZ);
    randomX /= mag;
    randomY /= mag;
    randomZ /= mag;

    const d = Math.random();
    randomX *= d;
    randomY *= d;
    randomZ *= d;

    const x =
      Math.cos(branchAngle + spinAngle) * radius +
      randomX * clamp(1 - i / parameters.count, 0.1, 0.5) * parameters.spread;
    const y = randomY * clamp(1 - i / parameters.count, 0.2, 0.3) * parameters.spread;
    const z =
      Math.sin(branchAngle + spinAngle) * radius +
      randomZ * clamp(1 - i / parameters.count, 0.1, 0.5) * parameters.spread;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, r / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  /**
   * Points
   */
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

generateGalaxy();

pane.addInput(parameters, 'count', { min: 1000, max: 10000000, step: 100, label: 'Number of stars' });
pane.addInput(parameters, 'radius', { min: 0.01, max: 10, step: 0.01, label: 'Radius of galaxy' });
pane.addInput(parameters, 'branches', { min: 1, max: 50, step: 1, label: 'Number of branches' });
pane.addInput(parameters, 'spin', { min: -10, max: 10, step: 1, label: 'Galaxy spin' });
pane.addInput(parameters, 'spread', { min: 0.01, max: 2, step: 0.01, label: 'Spread of stars' });
pane.on('change', generateGalaxy);

/**
 * Animate
 */
const clock = new THREE.Clock();

animate({
  timing: (t) => 1 - powerOf(1 - t, 4),
  duration: 3000,
  render(progress) {
    camera.position.x = lerp(0, 2, progress);
    camera.position.y = lerp(90, 1, progress);
    camera.position.z = lerp(0, 1, progress);
  },
});

animate({
  timing: (t) => powerOf(t, 4),
  duration: 2000,
  render(progress) {
    parameters.radius = 1 * progress;
    generateGalaxy();
  },
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  points.rotation.y = elapsedTime * 0.1;

  controls.update();
  renderer.render(scene, camera);
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
