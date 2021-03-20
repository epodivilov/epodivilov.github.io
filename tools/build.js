const Bundler = require('parcel-bundler');
const fs = require('fs/promises');
const { resolve } = require('path');

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

const [name] = process.argv.slice(2);
const root = resolve(process.cwd(), 'src/sketches/');

if (name == null) {
  throw new Error('Need provide name of sketch');
}

(async () => {
  const projectDir = await findSketch(name, root);

  const sketch = new Bundler([resolve(projectDir, './src/index.html')], {
    outDir: resolve(process.cwd(), `./docs/${name}`),
    publicUrl: './',
  });

  await sketch.bundle();

  const home = new Bundler([resolve(root, './index.html')], {
    outDir: resolve(process.cwd(), './docs'),
    publicUrl: './',
  });

  await home.bundle();
})();