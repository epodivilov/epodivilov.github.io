const Bundler = require('parcel-bundler');
const fs = require('fs/promises');
const { resolve } = require('path');
const fse = require('fs-extra');

function findSketch(name, from) {
  return fs
    .readdir(from)
    .then((result) =>
      Promise.all(
        result.map(async (it) => {
          const path = resolve(from, it);

          return (await fs.stat(path)).isDirectory() ? path : null;
        })
      )
    )
    .then((list) => list.find((it) => it && it.endsWith(name)));
}

async function build(name, root) {
  const projectDir = await findSketch(name, root);
  const staticDir = resolve(projectDir, 'static');
  const outDir = resolve(process.cwd(), `./docs/${name}`);

  try {
    const hasStatic = await (await fs.lstat(staticDir)).isDirectory();
    if (hasStatic) {
      await fse.copy(staticDir, outDir, { overwrite: true, recursive: true });
    }
  } catch (error) {}

  const sketch = new Bundler([resolve(projectDir, './src/index.html')], {
    outDir,
    publicUrl: './',
  });

  await sketch.bundle();

  const home = new Bundler([resolve(root, './index.html')], {
    outDir: resolve(process.cwd(), './docs'),
    publicUrl: './',
  });

  await home.bundle();
}

const [name] = process.argv.slice(2);
const root = resolve(process.cwd(), 'src/sketches/');

if (name == null) {
  throw new Error('Need provide name of sketch');
}

if (name === '--all') {
  const isDraft = /wip-/;
  fs.readdir(root)
    .then((result) =>
      Promise.all(
        result.map(async (it) => {
          const path = resolve(root, it);

          return (await fs.stat(path)).isDirectory() ? it : null;
        })
      )
    )
    .then((list) => list.filter((it) => it && isDraft.test(it) === false))
    .then((list) => Promise.all(list.map((it) => build(it, root))));
} else {
  build(name, root);
}
