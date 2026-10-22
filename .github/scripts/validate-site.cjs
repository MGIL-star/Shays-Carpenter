const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../../apel-site/dist');
const base = new URL('https://mgil-star.github.io/Shays-Carpenter/');
let checks = 0;
function check(value, source) {
  if (!value || /^(?:#|data:|https?:|mailto:|tel:|\/\/)/i.test(value)) return;
  const url = new URL(value, base);
  assert(url.pathname.startsWith(base.pathname), `${source}: URL escapes project path: ${value}`);
  const relative = decodeURIComponent(url.pathname.slice(base.pathname.length));
  const target = path.resolve(root, relative);
  assert(target.startsWith(root + path.sep), `${source}: path escapes dist: ${value}`);
  assert(fs.existsSync(target), `${source}: missing ${value}`);
  // Linux hosting is case-sensitive, even when checked on Windows.
  let current = root;
  for (const part of relative.split('/')) {
    assert(fs.readdirSync(current).includes(part), `${source}: filename case mismatch: ${value}`);
    current = path.join(current, part);
  }
  checks++;
}
for (const file of ['index.html', 'style.css', 'app.js']) assert(fs.existsSync(path.join(root, file)), `Missing ${file}`);
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi)) check(match[1], 'index.html');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
for (const match of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/gi)) check(match[1], 'style.css');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const marker = app.indexOf('const asset=');
assert(marker > 0, 'Gallery data marker missing');
const projects = vm.runInNewContext(app.slice(0, marker) + '; projects', {}, {timeout: 1000});
for (const project of projects) check('assets/' + encodeURIComponent(project[0]) + '.webp', 'gallery');
const hero = app.match(/const backgrounds=(\[[^;]+?\])\.map/);
assert(hero, 'Hero data missing');
for (const id of vm.runInNewContext(hero[1], {}, {timeout: 1000})) check('assets/' + encodeURIComponent(id) + '.webp', 'hero');
assert(!/<base\b/i.test(html), 'Unexpected base element changes relative URL resolution');
console.log(`PASS: ${checks} project-relative references, ${projects.length} gallery photos, CSS, JavaScript and video sources.`);
