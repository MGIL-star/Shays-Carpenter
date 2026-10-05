const fs=require('fs'), sharp=require('C:/Users/ellag/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
(async()=>{
const source='C:/Users/ellag/.codex/generated_images/01a10856-c09c-74c1-8e0f-c913588f854c/exec-236db162-5b96-4cfb-83e6-7fcaec210e55.png';
fs.mkdirSync('../edited',{recursive:true});fs.copyFileSync(source,'../edited/kitchen-05-psalm-mixer.png');
await sharp(source).webp({quality:94}).toFile('dist/assets/kitchen-05-psalm-mixer.webp');
let app=fs.readFileSync('dist/app.js','utf8');
app=app.replaceAll('kitchen-05-landscape-final','kitchen-05-psalm-mixer');
app=app.replace("['IMG-20250812-WA0063-only-appliances','kitchen','מטבח בקווים נקיים','חזיתות לבנות ואי בגוון אבן']","['kitchen-05-psalm-mixer','kitchen','מטבח בקווים נקיים','חזיתות לבנות ואי בגוון אבן']");
fs.writeFileSync('dist/app.js',app);
let html=fs.readFileSync('dist/index.html','utf8').replace('app.js?v=landscape-hero05','app.js?v=psalm-mixer-final');fs.writeFileSync('dist/index.html',html);
console.log('Updated gallery and fifth hero; saved new asset.');
})();
