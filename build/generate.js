/**
 * Generate index.html
 */
const path = require('path');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');

const resolve = file => path.resolve(__dirname, file);

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, options);
}

const templatePath = resolve('../src/index.template.html');
const template = fs.readFileSync(templatePath, 'utf-8');
const bundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const context = { title: 'vs-issue-list-demo' };

renderer = createRenderer(bundle, {
  template,
  clientManifest
});

console.log('Start generating...');

renderer.renderToString(context, (err, html) => {
  if (err) {
    throw new Error('Generate file fail!');
  }

  console.log('Generated!');
  fs.writeFileSync(resolve('../dist/index.html'), html, 'utf8');
});
