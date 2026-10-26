const projects=[
["IMG-20260326-WA0037","kitchen","מטבח בהיר עם ידיות זהב","נגרות מסגרת בתכנון אישי"],
["photo-222931-wine-fridge","kitchen","מטבח עם אי וויטרינה מוארת","גוונים חמים ונגרות בהתאמה אישית"],
["kitchen-05-psalm-mixer","kitchen","מטבח בקווים נקיים","חזיתות לבנות ואי בגוון אבן"],
["photo-222532-final","kitchen","מטבח סהרה עם קלפות אגוז","ארונות גבוהים בגוון חם"],
["photo-222551-final","kitchen","מטבח קטן עם קלפות אגוז","חלוקה מדויקת לחלל קומפקטי"],
["photo-222728","kitchen","מטבח לבן עם ארונות גבוהים","חזיתות חלקות ותאורה היקפית"],
["photo-222736","kitchen","מטבח עם מחיצת טלוויזיה","נגרות המשלבת בין המטבח לסלון"],
["IMG-20250630-WA0111","kitchen","מטבח לבן קלאסי","חזיתות מסגרת ואי מרכזי"],
["20181217_143015","kitchen","מטבח קלאסי עם אי מרכזי","חזיתות מסגרת ופרטי נגרות מעוצבים"],
["IMG-20180913-WA0198","kitchen","מטבח קלאסי לבן מזווית נוספת","ארונות גבוהים ואי מרכזי"],
["IMG-20231116-WA0120","kitchen","מטבח כפרי עם אי עץ","חזיתות בהירות ומשטח עץ טבעי"],
["IMG-20260225-WA0134","kitchen","מטבח עם ויטרינות מוארות","חזיתות בהירות, משטח כהה ותאורה חמה"],
["IMG-20260403-WA0002","kitchen","נגרות גבוהה למטבח","ארונות ומשטח עבודה בגוונים טבעיים"],
["IMG-20251210-WA0067","kitchen","מטבח אפור בהיר","נגרות נקייה וידיות בגוון זהב"],
["20251023_175221","kitchen","נגרות למטבח מסעדה","תכנון לחלל עבודה מקצועי"],
["IMG-20251205-WA0022","living","קיר יין מואר במסעדה","נגרות עץ, זכוכית ותאורה חמה"],
["photo-224050","kitchen","מטבח עם קלפה בגוון אגוז","משטח בהיר וידיות כהות"],
["photo-224057","storage","ויטרינת יין בתאורה פנימית","מדפי תצוגה ופינת קפה"],
["photo-224146","storage","פרטי יחידת היין","מרקם אגוז וזכוכית"],
["photo-224126","living","קיר סלון ומזנון","חיפוי בגוון אבן ונגרות נקייה"],
["IMG-20250509-WA0037","living","קיר סלון עם ויטרינה מוארת","חיפוי עץ ומזנון מרחף"],
["IMG-20260226-WA0151","living","קיר האח בשעות הערב","עץ ותאורה חמה"],
["IMG-20230212-WA0077","living","קיר טלוויזיה בחיפוי פסים","עץ טבעי ומזנון כהה"],
["IMG-20230212-WA0076","living","חיפוי פסים מקרוב","מפגש בין עץ למזנון כהה"],
["IMG-20260625-WA0052","storage","חדר ארונות עם תאורה","מדפים, מגירות ופסי תאורה"],
["IMG-20260625-WA0048","storage","פרטי חדר הארונות","מרקם עץ ותאורה פנימית"],
["IMG-20250704-WA0082","storage","ארון קיר עם מראות","חזיתות בגוון חם וידיות טבעת שחורות"],
["cab40229-aac5-4df0-8a72-32b61eb965c2","storage","ארונות פינתיים עד התקרה","חזיתות בהירות וידיות שקועות"],
["IMG-20250508-WA0158","storage","ארון ופינת איפור","פתרון אחסון בגוון חם"],
["IMG-20240818-WA0036","storage","פינת איפור מרחפת","מראה גבוהה ונגרות מינימליסטית"],
["IMG-20250703-WA0024(1)","storage","פינת איפור עם מראה מוארת","תאורה היקפית וקווים שקטים"],
["IMG-20250703-WA0023(1)","storage","פינת כניסה עם מראה מוארת","חיפוי עץ וקונסולה מרחפת"],
["entry-mirror-soft-light","storage","קונסולה מרחפת ומראה מוארת","תאורה היקפית עדינה ונגרות בגוון חם"],
];
const asset=p=>'assets/'+encodeURIComponent(({'photo-222532-final':'photo-222532-even-light-cropped','photo-222551-final':'photo-222551-even-light'})[p[0]]||p[0])+'.webp';let visible=projects,photoIndex=0;const gallery=document.querySelector('#gallery'),viewer=document.querySelector('#viewer');
function showPhoto(i){photoIndex=(i+visible.length)%visible.length;const p=visible[photoIndex];document.querySelector('#full-photo').src=asset(p);document.querySelector('#full-photo').alt=p[2];document.querySelector('#photo-title').textContent=p[2];}
function renderGallery(filter='all'){visible=projects.filter(p=>filter==='all'||p[1]===filter);gallery.replaceChildren(...visible.map((p,i)=>{const b=document.createElement('button');b.className='work-card';b.type='button';b.setAttribute('aria-label','פתיחת תמונה: '+p[2]);const img=document.createElement('img');img.src=asset(p);img.alt=p[2];img.loading='lazy';img.decoding='async';const title=document.createElement('span');title.textContent=p[2];const desc=document.createElement('small');desc.textContent=p[3];b.append(img,title,desc);b.addEventListener('click',()=>{showPhoto(i);viewer.showModal()});return b}));}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});renderGallery(b.dataset.filter)}));renderGallery();
document.querySelector('.close').addEventListener('click',()=>viewer.close());document.querySelector('#next').addEventListener('click',()=>showPhoto(photoIndex+1));document.querySelector('#previous').addEventListener('click',()=>showPhoto(photoIndex-1));viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close()}});viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')showPhoto(photoIndex+1);if(e.key==='ArrowRight')showPhoto(photoIndex-1)});
const backgrounds=['IMG-20260326-WA0037','photo-222931-wine-fridge','20251023_175221','IMG-20260403-WA0002','kitchen-05-psalm-mixer'].map(id=>id==='kitchen-05-psalm-mixer'?[id,'kitchen','מטבח לבן עם ארונות בגוון בטון','']:projects.find(p=>p[0]===id));let slide=0,active=0,slideTimer;const layers=[document.querySelector('#bg1'),document.querySelector('#bg2')];function selectSlide(i){if(i===slide)return;const layer=layers[1-active],preload=new Image();preload.onload=()=>{layer.src=preload.src;layer.classList.add('active');layers[active].classList.remove('active');active=1-active;slide=i;document.querySelectorAll('[data-slide]').forEach(b=>{b.classList.toggle('selected',Number(b.dataset.slide)===i);b.setAttribute('aria-pressed',String(Number(b.dataset.slide)===i))})};preload.src=asset(backgrounds[i]);}function startTimer(){clearInterval(slideTimer);if(!document.hidden)slideTimer=setInterval(()=>selectSlide((slide+1)%backgrounds.length),7000);}document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>{selectSlide(Number(b.dataset.slide));startTimer()}));document.addEventListener('visibilitychange',startTimer);startTimer();


const films=[...document.querySelectorAll('.video-gallery video')];const filmObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.play().catch(()=>{});}else{e.target.pause();}}),{threshold:.25});films.forEach(v=>filmObserver.observe(v));







