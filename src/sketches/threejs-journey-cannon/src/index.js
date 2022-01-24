import { Pane } from 'tweakpane';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Body, ContactMaterial, Material, Plane, SAPBroadphase, Sphere, Vec3, World } from 'cannon-es';
import {
  AmbientLight,
  Clock,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereBufferGeometry,
  WebGLRenderer,
} from 'three';
import { createWall } from './wall';

const parameters = {
  width: window.innerWidth,
  height: window.innerHeight,
  w: 1,
  h: 1,
  d: 1,
  mass: 1,
  force: 500,
};

const hitSound = new Audio('./sounds/hit.mp3');
function playSound(event) {
  const impact = event.contact.getImpactVelocityAlongNormal();
  if (impact > 0.5) {
    hitSound.currentTime = 0;
    hitSound.volume = Math.min(impact / 10, 1);
    hitSound.play();
  }
}

const pane = new Pane({ title: 'Parameters', expanded: false });
const wallTweaks = pane.addFolder({ title: 'Wall' });
wallTweaks.addInput(parameters, 'w', { min: 1, max: 10, step: 1, label: 'Width' });
wallTweaks.addInput(parameters, 'h', { min: 1, max: 10, step: 1, label: 'Height' });
wallTweaks.addInput(parameters, 'd', { min: 1, max: 10, step: 1, label: 'Depth' });

const ballTweaks = pane.addFolder({ title: 'Cannonball' });
ballTweaks.addInput(parameters, 'mass', { min: 1, max: 100, step: 1, label: 'Mass' });
ballTweaks.addInput(parameters, 'force', { min: 100, max: 100000, step: 100, label: 'Force' });

const canvas = document.getElementById('canvas');

const scene = new Scene();
const world = new World();

world.gravity.set(0, -9.82, 0);
world.defaultMaterial = new Material('concrete');
world.addContactMaterial(
  new ContactMaterial(world.defaultMaterial, world.defaultMaterial, {
    friction: 0.1,
    restitution: 0.7,
  })
);
world.broadphase = new SAPBroadphase(world);
world.allowSleep = true;

const camera = new PerspectiveCamera(75, parameters.width / parameters.height, 0.1, 100);
camera.position.set(0, 5, 12);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new WebGLRenderer({ canvas });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.setSize(parameters.width, parameters.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const ambientLight = new AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0xffffff, 0.52);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const floor = new Mesh(
  new PlaneGeometry(12, 20),
  new MeshStandardMaterial({
    color: '#777777',
    metalness: 0.3,
    roughness: 0.4,
    envMapIntensity: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const planeBody = new Body({ mass: 0, shape: new Plane() });
planeBody.quaternion.setFromAxisAngle(new Vec3(-1, 0, 0), Math.PI / 2);
world.addBody(planeBody);

const sphereGeometry = new SphereBufferGeometry(0.5, 20, 20);
const material = new MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.1,
});
let cannonball = new Mesh(sphereGeometry, material);
cannonball.position.set(0, 1, 8);
cannonball.castShadow = true;

let cannonballBody = new Body({ mass: parameters.mass, shape: new Sphere(0.5) });
cannonballBody.position.copy(cannonball.position);

scene.add(cannonball);
world.addBody(cannonballBody);

let objects = [];
function reinit() {
  scene.remove(cannonball);
  world.removeBody(cannonballBody);
  objects.forEach(({ body, mesh }) => {
    body.removeEventListener('collide', playSound);

    scene.remove(mesh);
    world.removeBody(body);
  });

  objects = createWall(parameters.w, parameters.h, parameters.d);

  cannonball = new Mesh(sphereGeometry, material);
  cannonball.position.set(0, 1, 8);
  cannonballBody = new Body({ mass: parameters.mass, shape: new Sphere(0.5) });
  cannonballBody.position.copy(cannonball.position);

  scene.add(cannonball);
  world.addBody(cannonballBody);
  objects.forEach(({ mesh, body }) => {
    body.addEventListener('collide', playSound);

    scene.add(mesh);
    world.addBody(body);
  });
}
reinit();

pane.on('change', reinit);
pane.addButton({ title: 'Reset' }).on('click', () => {
  parameters.w = 1;
  parameters.h = 1;
  parameters.d = 1;
  parameters.mass = 1;
  parameters.force = 200;
  pane.refresh();
  reinit();
});
pane.addButton({ title: 'Fire' }).on('click', () => {
  cannonballBody.applyLocalForce(new Vec3(0, 0, -parameters.force), new Vec3(0, 0, 0));
});

let lastTime = 0;
const clock = new Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const dt = elapsedTime - lastTime;
  lastTime = elapsedTime;

  world.step(1 / 60, dt, 3);
  objects.forEach(({ mesh, body }) => {
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);
  });

  cannonball.position.copy(cannonballBody.position);
  cannonball.quaternion.copy(cannonballBody.quaternion);

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
