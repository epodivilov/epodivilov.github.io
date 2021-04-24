/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { resolve, parse, dirname } = require('path');
const fs = require('fs/promises');
const ejs = require('ejs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv));

function toKebabCase(str) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');
}

const paths = {
  root: process.cwd(),
  templates: resolve(__dirname, '_templates_'),
  sources: resolve(process.cwd(), 'src'),
};

(async () => {
  const [template] = argv._;
  const data = {
    name: toKebabCase(argv.name),
    description: argv.description,
    title: argv.name,
  };

  const templateFolder = resolve(paths.templates, template);
  const queue = [templateFolder];

  while (queue.length > 0) {
    const parent = queue.pop();
    const list = await fs.readdir(parent);

    for (const item of list) {
      const path = resolve(parent, item);

      if ((await fs.stat(path)).isDirectory()) {
        queue.push(path);
      } else {
        const folder = dirname(path).replace(templateFolder, `${paths.sources}/sketches/${data.name}`);
        const filePath = resolve(folder, parse(item).name);

        const file = await fs.readFile(path, 'utf-8');

        await fs.mkdir(dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, ejs.compile(file)(data), 'utf-8');
      }
    }
  }
})();
