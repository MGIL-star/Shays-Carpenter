const fs=require('fs'),sharp=require('C:/Users/ellag/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp'),vm=require('vm');
(async()=>{
const source='C:/Users/ellag/.codex/generated_images/01a10856-c09c-74c1-8e0f-c913588f854c/exec-6ced4dd2-7d1d-4c24-9aff-96ec8865a07f.png';
fs.copyFileSync(source,'../edited/entry-mirror-soft-light.png');
await sharp(source).webp({quality:94}).toFile('dist/assets/entry-mirror-soft-light.webp');
let app=fs.readFileSync('dist/app.js','utf8');
if(!app.includes("['entry-mirror-soft-light'"))app=app.replace('const projects=[',"const projects=[\n['entry-mirror-soft-light','storage','קונסולה מרחפת ומראה מוארת','תאורה היקפית עדינה ונגרות בגוון חם'],");
fs.writeFileSync('dist/app.js',app);
fs.writeFileSync('dist/index.html',fs.readFileSync('dist/index.html','utf8').replace('app.js?v=gallery-pruned-final','app.js?v=entry-mirror-light'));
const p=vm.runInNewContext(app.split('const asset=')[0]+';projects');
for(const item of p)if(!fs.existsSync('dist/assets/'+item[0]+'.webp'))throw Error('Missing asset '+item[0]);
console.log('Verified all '+p.length+' gallery assets.');
})();
