const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('apel-site/dist/counters.js','utf8');
const settle=()=>new Promise(r=>setImmediate(r));
function element(){return {dataset:{},isConnected:true,children:[],value:{textContent:''},append(...c){this.children.push(...c)},querySelector(){return this.value}};}
(async()=>{
 const observers=[],calls=[],values=new Map(),storage=new Map();let fail=false;
 const caption=element(),footer=element(),handlers={};
 const video={paused:false,currentTime:0,querySelector:()=>({getAttribute:()=> 'assets/test-video.mp4'}),closest:()=>({querySelector:()=>caption}),addEventListener:(name,cb)=>handlers[name]=cb};
 const document={hidden:false,createElement:element,querySelector:()=>footer,querySelectorAll:()=>[video]};
 const context={window:{},document,location:{hostname:'mgil-star.github.io',pathname:'/Shays-Carpenter/'},Intl,AbortSignal,queueMicrotask,
 sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},
 IntersectionObserver:class{constructor(cb){this.cb=cb;observers.push(this)}observe(){}unobserve(){}},
 fetch:async url=>{calls.push(url);if(fail)throw Error('offline');const parts=url.split('/'),op=parts.at(-2),key=decodeURIComponent(parts.at(-1));if(op==='hit')values.set(key,(values.get(key)||0)+1);return {status:values.has(key)?200:404,ok:values.has(key),json:async()=>({value:values.get(key)})}}
 };vm.runInNewContext(source,context);const counters=context.window.SiteCounters;
 const photo=counters.create('photo','test');await settle();observers[0].cb([{target:photo,isIntersecting:true}]);await settle();assert.equal(photo.value.textContent,'669 פתיחות');
 await counters.hit('photo','test');assert.equal(photo.value.textContent,'670 פתיחות');
 const duplicate=counters.create('photo','test');await settle();assert.equal(duplicate.value.textContent,'670 פתיחות');
 const before=calls.length;document.hidden=true;await counters.hit('photo','test');assert.equal(calls.length,before);document.hidden=false;
 fail=true;await counters.hit('photo','test');assert.equal(photo.value.textContent,'670 פתיחות');fail=false;
 counters.init();await settle();observers[1].cb([{target:video,isIntersecting:true}]);
 for(let i=0;i<=8;i++){video.currentTime=i*.5;handlers.timeupdate()}await settle();await settle();
 assert.equal(calls.filter(u=>u.includes('/hit/')&&u.endsWith('video-test-video')).length,1);
 for(let i=9;i<=16;i++){video.currentTime=i*.5;handlers.timeupdate()}await settle();
 assert.equal(calls.filter(u=>u.includes('/hit/')&&u.endsWith('video-test-video')).length,1);
 assert.equal(caption.children[0].value.textContent,'670 צפיות');
 console.log('PASS counters: baseline, shared responses, hidden tabs, offline fallback, three-second video threshold and no repeat count.');
})();
