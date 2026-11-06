/* =====================================================================
   THE DISCOVERY PORTAL — an original, visual way to explore the portfolio.
   Replaces the terminal and the command palette. Nothing is typed: pick a room on the
   map, or pick up a project, certificate, skill or quick action from the shelf.
   Keys: P or Ctrl+K opens it · arrows move between rooms · 1–9 enter a room · Esc closes.
   ===================================================================== */
window.Portal=(function(){
const JB=window.JB,D=JB.D,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const el=$('#portal'),A=window.ART,snd=n=>{try{JA.play(n)}catch(e){}};
const ICON={home:'star',about:'heart',education:'cap',skills:'net',projects:'laptop',certificates:'ribbon',experience:'rocket',resume:'bulb',contact:'bolt'};
const R=JB.ROUTES;let isOpen=false,from=null,tab='projects',busy=false;

/* ---------- the map of rooms ---------- */
function buildRooms(){
  const n=R.length;
  $('#ptRooms').innerHTML=R.map((r,i)=>{
    const a=-Math.PI/2+i*(2*Math.PI/n),x=50+Math.cos(a)*40,y=50+Math.sin(a)*37;
    return `<li style="--x:${x.toFixed(2)}%;--y:${y.toFixed(2)}%;--i:${i}"><button class="pt-door" type="button" data-r="${r[0]}" data-i="${i}" aria-label="${JB.esc(r[1])} room. ${JB.esc(r[2])}">
      <span class="pt-art">${A.pick(ICON[r[0]]||'star',r[0]==='contact'?'Hi!':'')}</span><span class="pt-nm"><b>${JB.pad(i+1)}</b>${JB.esc(r[1])}</span></button></li>`}).join('');
  $('#ptLines').setAttribute('viewBox','0 0 100 100');$('#ptLines').setAttribute('preserveAspectRatio','none');
  $('#ptLines').innerHTML=R.map((r,i)=>{const a=-Math.PI/2+i*(2*Math.PI/n);return `<line data-r="${r[0]}" x1="50" y1="50" x2="${(50+Math.cos(a)*40).toFixed(2)}" y2="${(50+Math.sin(a)*37).toFixed(2)}" vector-effect="non-scaling-stroke"/>`}).join('');
  $('#ptSpr').innerHTML=A.sprig('happy');
}
function peek(id){const i=JB.IDS.indexOf(id);const r=R[i];if(!r)return;$('#ptName').textContent=r[1];$('#ptDesc').textContent=r[2];
  $$('#ptLines line').forEach(l=>l.classList.toggle('on',l.dataset.r===id));$('#ptCore').classList.add('peek');$('#ptSpr').firstElementChild.setAttribute('class','sprig m-wow')}
function unpeek(){$('#ptName').textContent='Choose a room';$('#ptDesc').textContent='Hover, focus or tap a door to peek inside.';$$('#ptLines line').forEach(l=>l.classList.remove('on'));$('#ptCore').classList.remove('peek');$('#ptSpr').firstElementChild.setAttribute('class','sprig m-happy')}
function enter(fn,quiet){if(busy)return;busy=true;snd('swoosh');$('#ptCore').classList.add('enter');el.classList.add('going');
  setTimeout(()=>{close(true);busy=false;$('#ptCore').classList.remove('enter');el.classList.remove('going');fn()},JB.RM()?0:520)}

/* ---------- the discovery shelf ---------- */
const th=(c1,c2,ic)=>`<span class="pt-th" style="background:linear-gradient(135deg,${c1},${c2})"><i class="fa-solid ${ic}"></i></span>`;
const shelf={
  projects:()=>JB.P.map((p,i)=>`<button class="pt-it" type="button" data-go="projects" data-i="${i}">${p.shots?`<span class="pt-th"><img src="${p.shots[0]}" alt="" loading="lazy"></span>`:th(p.c1,p.c2,p.ic)}<span><b>${JB.esc(p.t)}</b><small>${JB.esc(p.cat)}</small></span></button>`).join(''),
  certs:()=>JB.C.map((c,i)=>`<button class="pt-it" type="button" data-go="certificates" data-i="${i}"><span class="pt-th"><img src="${D.cthumb(i)}" alt="" loading="lazy"></span><span><b>${JB.esc(c[0])}</b><small>${JB.esc(c[1])}</small></span></button>`).join(''),
  skills:()=>D.CATS.map(cat=>`<div class="pt-grp"><h3><i class="fa-solid ${D.CIC[cat]}"></i>${cat}</h3><div>${JB.S.filter(s=>s[1]===cat).map(s=>`<button class="pt-chip" type="button" data-sk="${JB.esc(s[0])}"><i class="${s[2]}"></i>${JB.esc(s[0])}</button>`).join('')}</div></div>`).join(''),
  extras:()=>ACTS.map((a,i)=>`<button class="pt-it pt-ac" type="button" data-ac="${i}"><span class="pt-th"><i class="${a[1]}"></i></span><span><b>${a[0]}</b></span></button>`).join('')
};
const ACTS=[
 ['Copy email address','fa-solid fa-copy',()=>JB.copyText(D.EMAIL,'Email')],
 ['Download Curriculum Vitae','fa-solid fa-download',JB.dlCV],
 ['View Curriculum Vitae','fa-solid fa-file-lines',()=>JB.openCV()],
 ['Save my contact (vCard)','fa-solid fa-address-book',JB.vcard],
 ['Open LinkedIn profile','fa-brands fa-linkedin-in',()=>window.open(D.LI,'_blank','noopener')],
 ['Play Knowledge Dash','fa-solid fa-gamepad',()=>window.open(JB.P[0].link[0],'_blank','noopener')],
 ['Open the photo explorer','fa-solid fa-images',()=>JB.openPhotos(0)],
 ['Open the visual index','fa-solid fa-table-cells-large',()=>JB.openDirectory()],
 ['Start the guided tour','fa-solid fa-route',()=>JB.startTour()],
 ['Replay the introduction','fa-solid fa-clapperboard',()=>replay()],
 ['Send me a message','fa-solid fa-pen',()=>{JB.nav('contact');setTimeout(()=>{const f=$('#fn');f&&f.focus({preventScroll:true})},JB.RM()?100:1700)}],
 ['Switch dark / light mode','fa-solid fa-circle-half-stroke',()=>JB.flip()]
];
function drawShelf(){$('#ptItems').innerHTML=shelf[tab]();$('#ptItems').dataset.k=tab;
  $$('#ptSeg button').forEach(b=>{const on=b.dataset.k===tab;b.classList.toggle('on',on);b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1})}
function replay(){JB.closeOverlays(true);JB.nav('home');setTimeout(()=>window.Intro&&Intro.replay(),JB.RM()?60:900)}

/* ---------- open / close ---------- */
function show(origin){if(isOpen)return;JB.closeOverlays(true);from=origin||document.activeElement;
  const r=origin&&origin.getBoundingClientRect?origin.getBoundingClientRect():null;
  el.style.setProperty('--ox',(r?r.left+r.width/2:innerWidth-80)+'px');el.style.setProperty('--oy',(r?r.top+r.height/2:40)+'px');
  el.hidden=false;void el.offsetWidth;el.classList.add('open');isOpen=true;$('#portalBtn').setAttribute('aria-expanded','true');snd('reveal');
  document.dispatchEvent(new CustomEvent('jb:portal'));
  setTimeout(()=>{const cur=$(`.pt-door[data-r="${JB.cur}"]`)||$('.pt-door');cur&&cur.focus({preventScroll:true})},JB.RM()?0:200)}
function close(nofocus){if(!isOpen)return;isOpen=false;el.classList.remove('open');$('#portalBtn').setAttribute('aria-expanded','false');unpeek();
  setTimeout(()=>{if(!isOpen)el.hidden=true},nofocus===true?0:700);if(nofocus!==true&&from&&from.focus&&document.contains(from))from.focus({preventScroll:true})}
const toggle=()=>isOpen?close():show($('#portalBtn'));

/* ---------- wiring ---------- */
buildRooms();drawShelf();
$('#portalBtn').onclick=e=>toggle(e.currentTarget);$('#ptx').onclick=()=>close();$('#ptRand').onclick=()=>{const o=JB.IDS.filter(x=>x!==JB.cur);const id=o[Math.random()*o.length|0];enter(()=>JB.nav(id))};$('#ptReplay').onclick=()=>{close(true);replay()};
$('#dirPortal')&&($('#dirPortal').onclick=()=>{JB.closeOverlays(true);setTimeout(()=>show($('#portalBtn')),260)});
el.addEventListener('click',e=>{if(e.target===el)close()});
$('#ptRooms').addEventListener('click',e=>{const b=e.target.closest('.pt-door');if(b)enter(()=>JB.nav(b.dataset.r))});
$('#ptRooms').addEventListener('pointerover',e=>{const b=e.target.closest('.pt-door');if(b)peek(b.dataset.r)});
$('#ptRooms').addEventListener('focusin',e=>{const b=e.target.closest('.pt-door');if(b)peek(b.dataset.r)});
$('#ptRooms').addEventListener('pointerleave',()=>{const f=document.activeElement;if(f&&f.classList&&f.classList.contains('pt-door'))peek(f.dataset.r);else unpeek()});
$('#ptSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;tab=b.dataset.k;snd('click');drawShelf()});
$('#ptSeg').addEventListener('keydown',e=>{if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;const bs=$$('#ptSeg button'),i=bs.findIndex(b=>b.classList.contains('on')),n=bs[(i+(e.key==='ArrowRight'?1:-1)+bs.length)%bs.length];tab=n.dataset.k;drawShelf();n.focus();e.preventDefault()});
$('#ptItems').addEventListener('click',e=>{
  const it=e.target.closest('.pt-it'),sk=e.target.closest('.pt-chip');
  if(sk){enter(()=>JB.openSkill(sk.dataset.sk));return}
  if(!it)return;
  if(it.dataset.ac!==undefined){const a=ACTS[+it.dataset.ac];if(a[0].startsWith('Replay')||a[0].startsWith('Start')||a[0].startsWith('Open the')||a[0].startsWith('View')||a[0].startsWith('Send')){close(true);setTimeout(a[2],JB.RM()?0:260)}else{snd('click');a[2]()}return}
  enter(()=>JB.nav(it.dataset.go,String(+it.dataset.i+1)))});
/* keyboard: Esc, Tab trap, arrows around the ring, 1–9 */
document.addEventListener('keydown',e=>{if(!isOpen)return;const k=e.key;
  if(k==='Escape'){e.preventDefault();e.stopPropagation();close();return}
  if(k==='Tab'){const f=$$('button:not([disabled]),a[href],input',el).filter(x=>x.offsetParent!==null&&x.tabIndex>=0);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){z.focus();e.preventDefault()}else if(!e.shiftKey&&document.activeElement===z){a.focus();e.preventDefault()}return}
  if(/^[1-9]$/.test(k)&&!e.target.closest('#ptSeg')){const r=R[+k-1];if(r){e.preventDefault();enter(()=>JB.nav(r[0]))}return}
  const d=document.activeElement&&document.activeElement.closest&&document.activeElement.closest('.pt-door');
  if(d&&/^Arrow/.test(k)){const ds=$$('.pt-door'),i=ds.indexOf(d),n=(k==='ArrowRight'||k==='ArrowDown')?1:-1;ds[(i+n+ds.length)%ds.length].focus();e.preventDefault()}
},true);
document.addEventListener('intro:done',()=>{});
return {get open(){return isOpen},show,close,toggle,replay};
})();
