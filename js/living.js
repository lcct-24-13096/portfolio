/* =====================================================================
   THE LIVING CANVAS · the layer that makes the portfolio feel alive
   audio panel · Sprig companion · achievements · cross-section transitions ·
   magnetic typography · page accents · easter eggs
   ===================================================================== */
(()=>{'use strict';
const JB=window.JB,A=window.ART,JA=window.JA,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement,RM=()=>JB.RM(),FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const snd=n=>{try{JA.play(n)}catch(e){}};
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};

/* ---------- 1 · stickers on the home hero ---------- */
$$('.hs[data-s]').forEach(e=>{e.innerHTML=A.pick(e.dataset.s)});

/* ---------- 2 · sound panel ---------- */
(function(){
  const btn=$('#audBtn'),pan=$('#aud');let open=false,stopViz=null;
  const sync=()=>{const P=JA.prefs,on=JA.on,live=on&&!P.x;
    $('i',btn).className='fa-solid '+(live?'fa-volume-high':'fa-volume-xmark');btn.classList.toggle('live',live);
    $('#audState').textContent=!JA.supported?'Not supported here':on?(P.x?'Muted':'Playing'):'Off';
    $('span',$('#audOn')).textContent=on?'Turn sound off':'Turn sound on';$('i',$('#audOn')).className='fa-solid '+(on?'fa-volume-xmark':'fa-volume-high');
    const set=(id,v)=>{const b=$(id);b.setAttribute('aria-pressed',!!v);$('b',b).textContent=v?'on':'off'};
    set('#audMus',P.m);set('#audSfx',P.s);set('#audMute',P.x);$('#audVol').value=Math.round(P.v*100)};
  document.addEventListener('ja:change',sync);sync();
  const show=()=>{if(open)return;JB.closeOverlays(true);open=true;pan.hidden=false;void pan.offsetWidth;pan.classList.add('open');btn.setAttribute('aria-expanded','true');stopViz=JA.viz($('#audViz'));$('#audOn').focus({preventScroll:true})};
  const hide=(f)=>{if(!open)return;open=false;pan.classList.remove('open');btn.setAttribute('aria-expanded','false');stopViz&&stopViz();setTimeout(()=>{if(!open)pan.hidden=true},300);if(f)btn.focus({preventScroll:true})};
  btn.onclick=()=>open?hide(true):show();
  $('#audOn').onclick=()=>{if(JA.on){JA.disable()}else if(JA.enable()){snd('sparkle');unlock('sound')}else JB.toast('Sound is not supported in this browser.')};
  $('#audMus').onclick=()=>JA.setMusic(!JA.prefs.m);$('#audSfx').onclick=()=>JA.setSfx(!JA.prefs.s);$('#audMute').onclick=()=>JA.setMute(!JA.prefs.x);
  $('#audVol').oninput=e=>JA.setVol(e.target.value/100);
  $('#audReplay').onclick=()=>{hide();JB.closeOverlays(true);JB.nav('home');setTimeout(()=>Intro.replay(),RM()?50:800)};
  document.addEventListener('click',e=>{if(open&&!pan.contains(e.target)&&!btn.contains(e.target))hide()});
  document.addEventListener('keydown',e=>{if(open&&e.key==='Escape'){e.stopPropagation();hide(true)}},true);
  /* subtle interface sounds — only buttons and page changes, never every animation */
  document.addEventListener('pointerdown',e=>{const t=e.target.closest&&e.target.closest('.bt,.ib,.chip-b,.spine a,.tabbar a,.dir-g a,.pt-it,.pt-chip,.seg button');if(t&&!t.closest('#intro'))snd('click')},true);
  document.addEventListener('jb:route',()=>snd('page'));
})();

/* ---------- 3 · achievements ---------- */
const ACH=[
 ['first','First Visit','You stepped into Jena’s world.','star'],
 ['explorer','Portfolio Explorer','You opened every page.','net'],
 ['projects','Project Explorer','You looked at three projects.','laptop'],
 ['certs','Certificate Collector','You opened four certificates.','ribbon'],
 ['skills','Skill Discoverer','You selected three skills.','bulb'],
 ['portal','Portal Traveler','You travelled through the Discovery Portal.','spark'],
 ['sound','Sound Check','You turned the sound on.','heart'],
 ['secret','Secret Finder','You found something hidden.','key']
];
let got=new Set(ld('jbr-ach',[])),seen=new Set(ld('jbr-seenpages',[])),pj=new Set(),ct=new Set(),sk=new Set();
function unlock(id,silent){if(got.has(id))return;got.add(id);sv('jbr-ach',[...got]);const a=ACH.find(x=>x[0]===id);drawAch();if(!a||silent)return;
  const p=document.createElement('div');p.className='ach-pop';p.setAttribute('role','status');p.innerHTML=`<span>${A.pick(a[3])}</span><div><small>Achievement unlocked</small><b>${a[1]}</b><em>${a[2]}</em></div>`;document.body.append(p);
  snd('achieve');setTimeout(()=>p.classList.add('on'),30);setTimeout(()=>{p.classList.remove('on');setTimeout(()=>p.remove(),500)},3600);sprigSay('You unlocked “'+a[1]+'”!','wow')}
const achBtn=document.createElement('button');achBtn.className='ib hide-s';achBtn.id='achBtn';achBtn.type='button';achBtn.setAttribute('aria-haspopup','dialog');achBtn.setAttribute('aria-expanded','false');achBtn.setAttribute('aria-label','Achievements');achBtn.dataset.tip='Achievements';achBtn.innerHTML='<i class="fa-solid fa-trophy"></i><em id="achN">0</em>';
$('#th').before(achBtn);
const achP=document.createElement('div');achP.className='ach';achP.id='achP';achP.hidden=true;achP.setAttribute('role','dialog');achP.setAttribute('aria-label','Achievements');document.body.append(achP);
function drawAch(){$('#achN').textContent=got.size;achP.innerHTML=`<div class="aud-h"><b>Achievements</b><span>${got.size} / ${ACH.length}</span></div><ul>${ACH.map(a=>`<li class="${got.has(a[0])?'on':''}"><span>${got.has(a[0])?A.pick(a[3]):'<i class="fa-solid fa-lock"></i>'}</span><div><b>${a[1]}</b><small>${got.has(a[0])?a[2]:'Keep exploring to unlock.'}</small></div></li>`).join('')}</ul>`}
let achOpen=false;const achToggle=(o)=>{achOpen=o===undefined?!achOpen:o;achP.hidden=false;void achP.offsetWidth;achP.classList.toggle('open',achOpen);achBtn.setAttribute('aria-expanded',achOpen);if(!achOpen)setTimeout(()=>{if(!achOpen)achP.hidden=true},300)};
achBtn.onclick=()=>achToggle();document.addEventListener('click',e=>{if(achOpen&&!achP.contains(e.target)&&!achBtn.contains(e.target))achToggle(false)});
document.addEventListener('keydown',e=>{if(achOpen&&e.key==='Escape'){e.stopPropagation();achToggle(false);achBtn.focus()}},true);
drawAch();
document.addEventListener('jb:route',e=>{seen.add(e.detail.id);sv('jbr-seenpages',[...seen]);if(JB.IDS.every(i=>seen.has(i)))unlock('explorer')});
document.addEventListener('jb:project',e=>{pj.add(e.detail.i);if(pj.size>=3)unlock('projects')});
document.addEventListener('jb:cert',e=>{ct.add(e.detail.i);if(ct.size>=4)unlock('certs')});
document.addEventListener('jb:skill',e=>{sk.add(e.detail.id);if(sk.size>=3)unlock('skills')});
document.addEventListener('jb:portal',()=>{window.__pt=1});
document.addEventListener('jb:route',()=>{if(window.__pt){unlock('portal');window.__pt=0}});
document.addEventListener('ja:change',()=>{if(JA.on&&JA.prefs.c==='sound'&&document.body.dataset.sndOnce!=='1'){document.body.dataset.sndOnce='1';unlock('sound')}});

/* ---------- 4 · Sprig, the companion ---------- */
const dock=document.createElement('div');dock.className='sdock';dock.id='sprigDock';dock.dataset.flyto='sprig';
dock.innerHTML=`<button class="sd-b" type="button" aria-label="Sprig, the portfolio companion. Press to hear a tip."><span class="sd-s">${A.sprig('happy')}</span></button><div class="sd-say" id="sdSay" role="status" aria-live="polite"></div>`;document.body.append(dock);
let sayT=0,clicks=0,clkT=0;
const LINES={home:'Pick a door — or open the portal ✦',about:'This is the story part.',education:'Every milestone counts.',skills:'Poke a node. They’re all connected!',projects:'Big screens ahead. Click to zoom in.',certificates:'Open a folder, then zoom in.',experience:'Where learning met real work.',resume:'The original CV — untouched.',contact:'Say hello. Copy, call or write!'};
function mood(m){const s=$('.sprig',dock);if(s)s.setAttribute('class','sprig m-'+m)}
function sprigSay(t,m,ms){const b=$('#sdSay');b.textContent=t;b.classList.add('on');mood(m||'happy');clearTimeout(sayT);sayT=setTimeout(()=>{b.classList.remove('on');mood('happy')},ms||3800)}
document.addEventListener('jb:route',e=>{if(Intro.playing)return;setTimeout(()=>sprigSay(LINES[e.detail.id]||'',e.detail.id==='contact'?'wow':'happy'),RM()?100:1400)});
$('.sd-b',dock).onclick=()=>{clicks++;clearTimeout(clkT);clkT=setTimeout(()=>clicks=0,2500);dock.classList.remove('hop');void dock.offsetWidth;dock.classList.add('hop');snd('pop');
  if(clicks>=7){clicks=0;party()}else{const tips=['Press P to open the Discovery Portal.','Press ? for a guided tour.','Press T to switch dark and light.','Try the arrow keys on Projects and Certificates.','There are secrets hidden around here…'];sprigSay(tips[Math.random()*tips.length|0],'wow')}};
function party(){unlock('secret');sprigSay('Party time! 🌱','wow',3000);JB.bloom();snd('sparkle')}

/* ---------- 5 · intro hand-off ---------- */
document.addEventListener('intro:done',()=>{dock.classList.add('on','landed');$$('.hs').forEach(h=>h.classList.add('landed'));unlock('first',false);setTimeout(()=>sprigSay(LINES[JB.cur||'home'],'happy'),900)});
if(!root.classList.contains('intro-on')){dock.classList.add('on','landed');$$('.hs').forEach(h=>h.classList.add('landed'));unlock('first',true)}
if(root.classList.contains('intro-on'))dock.classList.add('wait');

/* ---------- 6 · page accents: a few stickers per page, used sparingly ---------- */
const ACC={about:[['sprout','a1'],['spark','a2'],['squig','a3 wide']],education:[['cap','a1'],['arrow','a2 wide'],['star','a3']],skills:[['bulb','a1'],['net','a2']],projects:[['code','a1'],['arrow','a2 wide']],certificates:[['ribbon','a1'],['spark','a2']],experience:[['rocket','a1'],['squig','a2 wide']],resume:[['mag','a1']],contact:[['bubble','a1'],['bolt','a2'],['heart','a3']]};
const WORD={home:'WORLD',about:'STORY',education:'MEMORY',skills:'ECOSYSTEM',projects:'EXHIBIT',certificates:'GALLERY',experience:'MOTION',resume:'STUDIO',contact:'CANVAS'};
$$('.pg').forEach(pg=>{const id=pg.dataset.route;
  const w=document.createElement('div');w.className='bgw';w.setAttribute('aria-hidden','true');w.dataset.mt='';w.textContent=WORD[id]||'';pg.prepend(w);
  const a=ACC[id];if(a){const d=document.createElement('div');d.className='accs';d.setAttribute('aria-hidden','true');d.innerHTML=a.map(([n,c])=>`<span class="acc ${c}">${A.pick(n,id==='contact'?'Say hi!':'')}</span>`).join('');pg.prepend(d)}});

/* ---------- 7 · cross-section transitions: a sticker travels, the word becomes the next page's backdrop ---------- */
const TXI={home:'star',about:'sprout',education:'cap',skills:'net',projects:'laptop',certificates:'ribbon',experience:'rocket',resume:'bulb',contact:'bolt'};
const txv=document.createElement('div');txv.className='txv';txv.setAttribute('aria-hidden','true');document.body.append(txv);
let txWord=null;
document.addEventListener('jb:tx',e=>{const d=e.detail;if(RM())return;
  if(d.phase==='start'){
    const s=document.createElement('span');s.className='txs';s.innerHTML=A.pick(TXI[d.to]||'star');txv.append(s);
    const W=innerWidth,H=innerHeight,x0=d.fwd?-160:W+40,x1=d.fwd?W+40:-160,mid=(Math.random()*.3+.25)*H;
    s.animate([{transform:`translate(${x0}px,${H*.78}px) rotate(${d.fwd?-30:30}deg) scale(.8)`},{transform:`translate(${(x0+x1)/2}px,${mid}px) rotate(${d.fwd?8:-8}deg) scale(1.5)`,offset:.5},{transform:`translate(${x1}px,${H*.2}px) rotate(${d.fwd?40:-40}deg) scale(.9)`}],{duration:1250,easing:'cubic-bezier(.5,0,.3,1)',fill:'forwards'}).onfinish=()=>s.remove();
    const w=document.createElement('div');w.className='txw';w.textContent=WORD[d.to]||'';txv.append(w);txWord=w;
    w.animate([{opacity:0,transform:'translate(-50%,-40%) scale(.82)'},{opacity:1,transform:'translate(-50%,-50%) scale(1)'}],{duration:560,delay:280,fill:'forwards',easing:'cubic-bezier(.16,1,.3,1)'});
  }else if(d.phase==='swap'&&txWord){
    const w=txWord,bg=$('#pg-'+d.to+' .bgw');txWord=null;
    if(bg){const a=w.getBoundingClientRect(),b=bg.getBoundingClientRect();
      if(a.width&&b.width){const dx=b.left+b.width/2-(a.left+a.width/2),dy=b.top+b.height/2-(a.top+a.height/2),k=b.width/a.width;
        bg.style.opacity=0;w.animate([{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(${k})`,opacity:.9}],{duration:620,delay:120,fill:'forwards',easing:'cubic-bezier(.65,0,.25,1)'}).onfinish=()=>{bg.style.opacity='';w.remove()};return}}
    w.animate([{opacity:1},{opacity:0}],{duration:300,fill:'forwards'}).onfinish=()=>w.remove()}
});

/* ---------- 8 · magnetic typography: big words lean toward the pointer ---------- */
if(FINE){let raf=0,px=0,py=0;
  addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;if(raf||RM())return;raf=requestAnimationFrame(()=>{raf=0;
    const pg=$('.pg.on');if(!pg)return;const w=$('.bgw',pg);if(w){const dx=(px/innerWidth-.5)*-26,dy=(py/innerHeight-.5)*-14;w.style.setProperty('--bx',dx.toFixed(1)+'px');w.style.setProperty('--by',dy.toFixed(1)+'px')}
    if(JB.cur==='home'){$$('#nm .nl:first-child .ch').forEach(c=>{const r=c.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=px-cx,dy=py-cy,dist=Math.hypot(dx,dy),f=Math.max(0,1-dist/320);
      c.style.setProperty('--mx2',(dx/(dist||1)*f*-22).toFixed(1)+'px');c.style.setProperty('--my2',(dy/(dist||1)*f*-16).toFixed(1)+'px');c.style.setProperty('--ms',(1+f*.08).toFixed(3))})}},{passive:true})},{passive:true})}

/* ---------- 9 · easter eggs & special messages ---------- */
document.addEventListener('click',e=>{
  const st=e.target.closest('.hs[data-s=star]');if(st){st.classList.remove('wiggle');void st.offsetWidth;st.classList.add('wiggle');snd('sparkle');st.dataset.n=(+st.dataset.n||0)+1;if(+st.dataset.n===3){JB.toast('You found a hidden star. Make a wish ✦');unlock('secret');JB.bloom()}}
  const nt=e.target.closest('.hs-note');if(nt){JB.toast('Yes — that’s really me. Welcome!');snd('pop')}
});
/* secret word: type "jena" anywhere (outside inputs) */
let buf='';addEventListener('keydown',e=>{const t=e.target;if(t&&(/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable)||e.ctrlKey||e.metaKey||e.altKey||e.key.length!==1)return;
  buf=(buf+e.key.toLowerCase()).slice(-4);if(buf==='jena'){buf='';unlock('secret');JB.toast('That’s the secret word. Hello, Jena! 💚');snd('sparkle');sprigSay('You typed her name!','wow')}});
/* original easter eggs in main.js (logo ×5, Konami code) also unlock the achievement */
const brand=$('#brand');let bt=0,btT;brand.addEventListener('click',()=>{bt++;clearTimeout(btT);btT=setTimeout(()=>bt=0,2000);if(bt>=5){bt=0;unlock('secret')}});

/* ---------- 10 · tilt for layered photographs & project/cert frames (light, pointer only) ---------- */
if(FINE){$$('.arch,.arch-2,.film figure').forEach(f=>{f.addEventListener('pointermove',e=>{if(RM())return;const r=f.getBoundingClientRect();f.style.setProperty('--tx',(((e.clientX-r.left)/r.width-.5)*10).toFixed(1)+'deg');f.style.setProperty('--ty',((.5-(e.clientY-r.top)/r.height)*8).toFixed(1)+'deg')});f.addEventListener('pointerleave',()=>{f.style.setProperty('--tx','0deg');f.style.setProperty('--ty','0deg')})})}

})();
