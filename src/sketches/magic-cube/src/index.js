import {
  AmbientLight,
  AxesHelper,
  BoxBufferGeometry,
  Color,
  DirectionalLight,
  Euler,
  Float32BufferAttribute,
  Mesh,
  MeshToonMaterial,
  PerspectiveCamera,
  Quaternion,
  Raycaster,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const parameters = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.getElementById('canvas');

const renderer = new WebGLRenderer({ canvas });
renderer.setSize(parameters.width, parameters.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new Scene();

const axesHelper = new AxesHelper(5);
scene.add(axesHelper);

const camera = new PerspectiveCamera(75, parameters.width / parameters.height, 0.1, 500);
camera.position.x = -Math.sin(0.5 * -2 * Math.PI + Math.PI / 4) * 7;
camera.position.y = -Math.sin(0.25 * 1 * Math.PI - Math.PI / 2) * 7;
camera.position.z = -Math.cos(0.5 * -2 * Math.PI + Math.PI / 4) * 7;
camera.lookAt(new Vector3(0, 0, 0));
scene.add(camera);

// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(7, 5, 3);
scene.add(directionalLight);

const baseGeometry = new BoxBufferGeometry(1, 1, 1).toNonIndexed();
const material = new MeshToonMaterial({ color: 0xffffff, vertexColors: true });

const COLORS = ['#FFFFFF', '#F8D748', '#A82838', '#E7622A', '#1B45A7', '#449951'];

/** @type {Mesh[]} */
const cubes = [];

for (let i = 0; i < 27; i += 1) {
  const x = i % 3;
  const y = Math.floor(i / 9);
  const z = Math.floor(i / 3) - y * 3;

  const geometry = baseGeometry.clone();
  const positionAttribute = geometry.getAttribute('position');
  const colors = [];
  const color = new Color();

  for (let j = 0; j < positionAttribute.count; j += 6) {
    color.set(COLORS[j / 6]);

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

  const cube = new Mesh(geometry, material);
  cube.position.set(x, y, z);
  // cube.scale.set(0.98, 0.98, 0.98);
  scene.add(cube);
  cubes.push(cube);
}

const inputX = document.getElementById('rotate-x');
inputX.addEventListener('input', (e) => {
  const progress = Number(e.currentTarget.value) / 100;
  camera.position.x = -Math.sin(progress * 2 * Math.PI + Math.PI / 4) * 7;
  camera.position.z = -Math.cos(progress * 2 * Math.PI + Math.PI / 4) * 7;
  camera.lookAt(new Vector3(0, 0, 0));
});

const inputY = document.getElementById('rotate-y');
inputY.addEventListener('input', (e) => {
  const progress = Number(e.currentTarget.value) / 100;
  camera.position.y = Math.sin(progress * 1 * Math.PI - Math.PI / 2) * 7;
  camera.lookAt(new Vector3(0, 0, 0));
});

const raycaster = new Raycaster();

function radToDeg(rad) {
  return rad * (180 / Math.PI);
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

const quaternion = new Quaternion();
function rotateAroundWorldAxis(mesh, point, axis, angle) {
  quaternion.setFromAxisAngle(axis, angle);

  mesh.quaternion.multiplyQuaternions(quaternion, mesh.quaternion);

  mesh.position.sub(point);
  mesh.position.applyQuaternion(quaternion);
  mesh.position.add(point);

  return mesh;
}

const previousPoint = { x: 0, y: 0 };
let point = null;
let rotationAxis = null;

const axisX = new Vector3(1, 0, 0);
const axisY = new Vector3(0, 1, 0);
const axisZ = new Vector3(0, 0, 1);
const pivot = new Vector3(1, 1, 1);

const temp = new Vector3();

/**
 *
 * @param {MouseEvent} e
 */
function onDrag(e) {
  if (point == null) {
    return;
  }

  const dx = (e.touches?.[0]?.pageX || e.pageX) - previousPoint.x;
  const dy = (e.touches?.[0]?.pageY || e.pageY) - previousPoint.y;

  previousPoint.x = e.touches?.[0]?.pageX || e.pageX;
  previousPoint.y = e.touches?.[0]?.pageY || e.pageY;

  if (rotationAxis == null && Math.abs(dx) >= Math.abs(dy)) {
    rotationAxis = 'y';
  } else if (rotationAxis == null && Math.abs(point.x) > Math.abs(point.z)) {
    rotationAxis = 'z';
  } else if (rotationAxis == null && Math.abs(point.x) < Math.abs(point.z)) {
    rotationAxis = 'x';
  }

  if (rotationAxis === 'y') {
    cubes
      .filter((mesh) => mesh.position.y === Math.round(point.y))
      .forEach((cube) => {
        cube.material = cube.material.clone();
        cube.material.color.set(new Color(0xff0000));
        rotateAroundWorldAxis(cube, pivot.clone(), axisY, 0.07 * Math.sign(dx));
      });
  }

  if (rotationAxis === 'z') {
    cubes
      .filter((mesh) => mesh.position.z === Math.round(point.z))
      .forEach((cube) => {
        cube.material = cube.material.clone();
        cube.material.color.set(new Color(0x00ff00));
        rotateAroundWorldAxis(cube, pivot, axisZ, -0.07 * Math.sign(dy));
      });
  }

  if (rotationAxis === 'x') {
    cubes
      .filter((mesh) => mesh.position.x === Math.round(point.x))
      .forEach((cube) => {
        cube.material = cube.material.clone();
        cube.material.color.set(new Color(0x0000ff));
        rotateAroundWorldAxis(cube, pivot, axisX, 0.07 * Math.sign(dy));
      });
  }
}

function getAxisAndAngelFromQuaternion(q) {
  const angle = 2 * Math.acos(q.w);
  let s;
  if (1 - q.w * q.w < 0.000001) {
    s = 1;
  } else {
    s = Math.sqrt(1 - q.w * q.w);
  }
  return { axis: new Vector3(Math.round(q.x / s), Math.round(q.y / s), Math.round(q.z / s)), angle };
}

window.addEventListener('mousedown', (e) => {
  rotationAxis = null;
  const x = (e.clientX / parameters.width) * 2 - 1;
  const y = -(e.clientY / parameters.height) * 2 + 1;

  previousPoint.x = e.pageX;
  previousPoint.y = e.pageY;

  raycaster.setFromCamera({ x, y }, camera);
  const intersections = raycaster.intersectObjects(cubes);

  if (intersections.length > 0) {
    const index = cubes.findIndex((cube) => cube === intersections[0].object);

    temp.y = Math.floor(index / 9);
    temp.z = index % 3;
    temp.x = Math.abs((index % 3) - 2);

    point = intersections[0].point;
  }

  window.addEventListener('mousemove', onDrag);

  function stopListening() {
    cubes.forEach((cube) => {
      cube.material = material;

      const { angle } = getAxisAndAngelFromQuaternion(cube.quaternion);

      /* if (axis.x === 0 && axis.y === 0 && axis.z === 0) {
        return;
      } */

      const targetAngle = degToRad(Math.round(radToDeg(angle) / 90) * 90);

      // rotateAroundWorldAxis(cube, pivot, axisY, targetAngle - angle);

      if (rotationAxis === 'y') {
        rotateAroundWorldAxis(cube, pivot, axisY, targetAngle);
      }
      if (rotationAxis === 'z') {
        rotateAroundWorldAxis(cube, pivot, axisZ, targetAngle);
      }
      if (rotationAxis === 'x') {
        rotateAroundWorldAxis(cube, pivot, axisX, targetAngle);
      }

      cube.position.set(Math.round(cube.position.x), Math.round(cube.position.y), Math.round(cube.position.z));
      cube.rotation.setFromQuaternion(cube.quaternion, 'XYZ');
    });

    // cubes.sort((a, b) => a.position.x - b.position.x || a.position.z - b.position.z || a.position.y - b.position.y);

    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', stopListening);
  }
  window.addEventListener('mouseup', stopListening);
});

/* window.addEventListener('touchstart', (e) => {
  rotationAxis = null;

  const x = (e.touches[0].clientX / parameters.width) * 2 - 1;
  const y = -(e.touches[0].clientY / parameters.height) * 2 + 1;

  previousPoint.x = e.touches?.[0]?.pageX;
  previousPoint.y = e.touches?.[0]?.pageY;

  raycaster.setFromCamera({ x, y }, camera);
  const intersections = raycaster.intersectObjects(cubes);

  if (intersections.length > 0) {
    point = intersections[0].point;
  }

  window.addEventListener('touchmove', onDrag);

  function stopListening() {
    cubes[0].rotation.y = degToRad(Math.round(radToDeg(cubes[0].rotation.y) / 90) * 90);
    cubes[0].rotation.x = degToRad(Math.round(radToDeg(cubes[0].rotation.x) / 90) * 90);
    cubes[0].rotation.z = degToRad(Math.round(radToDeg(cubes[0].rotation.z) / 90) * 90);

    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('touchend', stopListening);
  }
  window.addEventListener('touchend', stopListening);
}); */

/*  */
(function tick() {
  // controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
})();
