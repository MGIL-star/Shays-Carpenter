const sharp=require('C:/Users/ellag/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const files=["IMG-20180913-WA0198","IMG-20231116-WA0120","IMG-20251205-WA0022","IMG-20251210-WA0067","IMG-20260311-WA0123","20251023_175221"];
(async()=>{for(const f of files)await sharp('../edited/'+f+'-retouched.png').resize({width:2000,height:2000,fit:'inside',withoutEnlargement:true}).webp({quality:88}).toFile('dist/assets/'+f+'.webp');console.log('Six assets ready');})();
