/* =====================================================================
   JENA BENISSE REDONDO — THE SIGNATURE INTERACTIVE IDENTITY EXPERIENCE
   Vanilla JavaScript · hash-routed multi-view architecture (GitHub Pages + Laragon safe)
   1 helpers · 2 theme & modes · 3 intro · 4 router · 5 navigation · 6 overlays · 7 viewer
   8 pages (home … contact) · 9 palette · 10 terminal · 11 tour · 12 input & easter eggs · 13 init
   ===================================================================== */
(()=>{'use strict';
const D=window.PF,{EMAIL,PHONE,LI,CV,ROUTES,PHOTOS,P,C,S,CATS,CIC,MS,CW,PS,FILT,cu,cthumb,cview}=D;

/* ---------- 1 · helpers ---------- */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
const RM0=matchMedia('(prefers-reduced-motion: reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
let RM=RM0||root.classList.contains('calm');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pad=n=>String(n).padStart(2,'0'),reflow=e=>void e.offsetWidth;
const save=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},load=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const tokens=s=>s.toLowerCase().split(/\s+/).filter(Boolean);
const matches=(hay,q)=>{const h=hay.toLowerCase();return tokens(q).every(w=>h.includes(w))};
const anim=(el,kf,o)=>el.animate(kf,Object.assign({fill:'forwards',easing:'cubic-bezier(.76,0,.24,1)'},o));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let tt;const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2400)};
const isTyping=t=>t&&(/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable);
const visible=e=>{if(!e)return false;const r=e.getBoundingClientRect(),cs=getComputedStyle(e);return r.width>0&&r.height>0&&cs.display!=='none'&&cs.visibility!=='hidden'};
function trap(e,c){if(e.key!=='Tab')return;const f=$$('a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]',c).filter(x=>visible(x)&&!x.closest('[hidden]'));if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){z.focus();e.preventDefault()}else if(!e.shiftKey&&document.activeElement===z){a.focus();e.preventDefault()}}
function copyText(txt,what,btn){const ok=()=>{toast(what+' copied!');if(btn){btn.classList.add('done');setTimeout(()=>btn.classList.remove('done'),1400)}};
  const fb=()=>{try{const ta=document.createElement('textarea');ta.value=txt;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;left:-999px;top:0';document.body.append(ta);ta.select();const r=document.execCommand('copy');ta.remove();r?ok():toast('Could not copy automatically — please select and copy it manually.')}catch(e){toast('Could not copy automatically — please select and copy it manually.')}};
  if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(txt).then(ok).catch(fb);else fb()}
const dlCV=()=>{const a=document.createElement('a');a.href=CV.u;a.download=CV.dl;document.body.append(a);a.click();a.remove()};
const vcard=()=>{const v='BEGIN:VCARD\nVERSION:3.0\nFN:Jena Benisse Redondo\nN:Redondo;Jena Benisse;;;\nTITLE:BSIT Student\nORG:La Consolacion College Tanauan\nTEL;TYPE=CELL:'+PHONE+'\nEMAIL:'+EMAIL+'\nADR;TYPE=HOME:;;Sulpoc;Tanauan City;Batangas;;Philippines\nURL:'+D.SITE+'\nEND:VCARD',a=document.createElement('a');a.href=URL.createObjectURL(new Blob([v],{type:'text/vcard'}));a.download='Jena-Benisse-Redondo.vcf';document.body.append(a);a.click();a.remove();toast('Contact card saved!')};

/* ---------- 2 · theme & viewing modes ---------- */
function setTheme(t){root.dataset.theme=t;save('jbr-theme',t);$('#th i').className='fa-solid '+(t==='dark'?'fa-moon':'fa-sun');$('#th').setAttribute('aria-label','Switch to '+(t==='dark'?'light':'dark')+' mode');$('meta[name=theme-color]').content=t==='dark'?'#081226':'#f3f7fc';$('#palTheme b').textContent=t}
function flip(){const n=root.dataset.theme==='dark'?'light':'dark';if(document.startViewTransition&&!RM)document.startViewTransition(()=>setTheme(n));else setTheme(n)}
function setMode(name,on,quiet){const cls={calm:'calm',light:'nolight',comfy:'comfy'}[name],key='jbr-'+name;
  root.classList.toggle(cls,name==='light'?!on:on);save(key,on?'on':'off');if(name==='calm')RM=RM0||on;
  const b={calm:'#palCalm',light:'#palLight',comfy:'#palComfy'}[name];if(b){$(b).setAttribute('aria-pressed',on);$('b',$(b)).textContent=on?'on':'off'}
  if(name==='calm'){$('#fxBtn').setAttribute('aria-pressed',!on)}
  if(!quiet)toast({calm:'Calm mode '+(on?'on — motion reduced':'off'),light:'Cursor light '+(on?'on':'off'),comfy:'Comfort text '+(on?'on':'off')}[name])}
const modeOn=name=>name==='light'?!root.classList.contains('nolight'):root.classList.contains(name==='calm'?'calm':'comfy');

/* ---------- 3 · intro (see js/intro.js) ---------- */
const intro=$('#intro');let introDone=!root.classList.contains('intro-on')||RM;
function runIntro(){if(introDone||!window.Intro){root.classList.remove('intro-on');intro.hidden=true;return startApp()}
  Intro.run(()=>{introDone=true;startApp()})}

/* ---------- 4 · router: one page at a time, hash based ---------- */
const IDS=ROUTES.map(r=>r[0]);let cur=null,busy=false,pending=null,started=false;
const tx=$('#tx'),txPanels=$$('i',tx);
function parseHash(){const h=location.hash.replace(/^#\/?/,''),[r,s]=h.split('/');let id=D.LEGACY[r]||r;if(!IDS.includes(id))id='home';return{id,sub:s}}
function nav(id,sub){const h='#/'+id+(sub?'/'+sub:'');if(location.hash===h)onHash();else location.hash=h}
function setSub(id,n){try{history.replaceState(null,'','#/'+id+'/'+n)}catch(e){}}
function onHash(){if(!started)return;const{id,sub}=parseHash();if(busy){pending={id,sub};return}if(id!==cur)show(id,sub);else applySub(id,sub)}
const INIT={},ENTER={},SUB={};let inited={};
function swapTo(id,sub){const i=IDS.indexOf(id);
  $$('.pg').forEach(p=>{const on=p.dataset.route===id;p.hidden=!on;p.classList.toggle('on',on);$('.pg-in',p).classList.remove('in');if(on)p.scrollTop=0});
  cur=id;setCur(i);document.dispatchEvent(new CustomEvent('jb:route',{detail:{id,sub}}));document.title=(id==='home'?'Jena Benisse Redondo | IT Portfolio':ROUTES[i][1]+' · Jena Benisse Redondo');
  if(!inited[id]){inited[id]=1;INIT[id]&&INIT[id]()}
  const pg=$('#pg-'+id),inner=$('.pg-in',pg);reflow(pg);inner.classList.add('in');ENTER[id]&&ENTER[id](sub);applySub(id,sub);
  const st=$('#stage');if(!RM0)try{pg.focus({preventScroll:true})}catch(e){}}
function applySub(id,sub){SUB[id]&&sub!==undefined&&SUB[id](sub)}
async function show(id,sub){const first=cur===null;if(first||RM){swapTo(id,sub);return}
  busy=true;const from=IDS.indexOf(cur),to=IDS.indexOf(id),fwd=to>=from;
  closeOverlays(true,true);document.dispatchEvent(new CustomEvent('jb:tx',{detail:{phase:'start',from:cur,to:id,fwd}}));tx.classList.add('run');$('#txn').textContent=pad(to+1);$('#txl').textContent=ROUTES[to][1];
  txPanels.forEach(p=>p.style.transformOrigin=fwd?'bottom':'top');
  const lab=$('.tx-l',tx),line=tx;
  const ins=txPanels.map((p,i)=>anim(p,[{transform:'scaleY(0)'},{transform:'scaleY(1)'}],{duration:460,delay:i*70}).finished);
  anim(lab,[{opacity:0,transform:'translate(-50%,-20%)'},{opacity:1,transform:'translate(-50%,-50%)'}],{duration:420,delay:330,easing:'cubic-bezier(.16,1,.3,1)'});
  await Promise.all(ins);swapTo(id,sub);document.dispatchEvent(new CustomEvent('jb:tx',{detail:{phase:'swap',to:id,fwd}}));await wait(230);
  txPanels.forEach(p=>p.style.transformOrigin=fwd?'top':'bottom');
  anim(lab,[{opacity:1},{opacity:0}],{duration:240});
  const outs=txPanels.map((p,i)=>anim(p,[{transform:'scaleY(1)'},{transform:'scaleY(0)'}],{duration:460,delay:i*70}).finished);
  await Promise.all(outs);tx.classList.remove('run');[...txPanels,lab].forEach(e=>e.getAnimations().forEach(a=>a.cancel()));
  busy=false;if(pending){const q=pending;pending=null;if(q.id!==cur)show(q.id,q.sub);else applySub(q.id,q.sub)}}
const jump=d=>{const n=IDS.indexOf(cur)+d;if(n>=0&&n<IDS.length)nav(IDS[n])};

/* ---------- 5 · navigation: spine, tab bar, directory, top bar ---------- */
function buildNav(){
  $('#spine').insertAdjacentHTML('beforeend',ROUTES.map((r,i)=>`<a href="#/${r[0]}" data-r="${r[0]}" aria-label="${r[1]}"><b>${pad(i+1)}</b><em>${esc(r[1])}</em></a>`).join(''));
  const tabs=[['home','fa-house','Home'],['projects','fa-laptop-code','Projects'],['certificates','fa-award','Certs'],['contact','fa-paper-plane','Contact']];
  $('#tabbar').innerHTML=tabs.map(t=>`<a href="#/${t[0]}" data-r="${t[0]}"><i class="fa-solid ${t[1]}"></i>${t[2]}</a>`).join('')+'<button type="button" id="tabMore" aria-haspopup="dialog" aria-label="All pages"><i class="fa-solid fa-table-cells-large"></i>All pages</button>';
  $('#dirG').innerHTML=ROUTES.map((r,i)=>`<li><a href="#/${r[0]}" data-r="${r[0]}"><i class="fa-solid ${r[3]}"></i><span><b>${pad(i+1)}</b><h3>${esc(r[1])}</h3></span><p>${esc(r[2])}</p></a></li>`).join('');
  $('#tabMore').onclick=e=>DIR.show(e.currentTarget)}
function setCur(i){$('#wn').textContent=pad(i+1);$('#wt').textContent=ROUTES[i][1];
  $$('.spine a,.tabbar a,.dir-g a').forEach(a=>{const on=a.dataset.r===IDS[i];a.classList.toggle('on',on);if(a.closest('.dir-g'))a.parentElement.classList.toggle('here',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  const a=$('.spine a.on');if(a){const p=$('#spinePtr');p.style.transform=`translateY(${a.offsetTop+a.offsetHeight/2-15}px)`}
  $('#prog').style.transform=`scaleX(${(i+1)/IDS.length})`}

/* ---------- 6 · overlays ---------- */
function overlay(el,{onOpen,onClose,focus}={}){let open=false,from;
  return{get open(){return open},show(origin){if(open)return;from=origin||document.activeElement;const r=origin&&origin.getBoundingClientRect?origin.getBoundingClientRect():null;
      el.style.setProperty('--ox',(r?r.left+r.width/2:innerWidth/2)+'px');el.style.setProperty('--oy',(r?r.top+r.height/2:innerHeight/3)+'px');
      el.hidden=false;reflow(el);el.classList.add('open');open=true;onOpen&&onOpen();setTimeout(()=>{const f=focus&&$(focus,el);f&&f.focus({preventScroll:true})},RM?0:120)},
    hide(instant,nofocus){if(!open)return;el.classList.remove('open');open=false;onClose&&onClose();setTimeout(()=>{if(!open)el.hidden=true},instant?0:760);if(!nofocus&&from&&from.focus&&document.contains(from))from.focus({preventScroll:true})}}}
const DIR=overlay($('#dir'),{focus:'.dir-g a.on, .dir-g a'});
const CMP=overlay($('#cmp'),{focus:'#cmpX'});
function closeOverlays(instant,keepTour){window.Portal&&Portal.close(true);DIR.hide(instant,true);CMP.hide(instant,true);closeL(instant);if(TOURON&&!keepTour)endTour(true)}
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#/"]');if(a&&a.closest('.ov'))closeOverlays(false)});

/* ---------- 7 · viewer: documents, certificates, screenshots, photographs ---------- */
const lb=$('#lb'),li=$('#li'),lst=$('#lst'),lf=$('#lf'),loupe=$('#loupe');
let L=[],lci=0,lbOpen=false,lbFrom,lbT,Z={z:1,x:0,y:0},lensOn=false,pdfMode=false;
function zApply(){const bw=li.offsetWidth,bh=li.offsetHeight,mx=Math.max(0,(bw*Z.z-lst.clientWidth)/2),my=Math.max(0,(bh*Z.z-lst.clientHeight)/2);Z.x=Math.max(-mx,Math.min(mx,Z.x));Z.y=Math.max(-my,Math.min(my,Z.y));li.style.setProperty('--z',Z.z);li.style.setProperty('--tx',Z.x+'px');li.style.setProperty('--ty',Z.y+'px');li.classList.toggle('zoomed',Z.z>1);$('#lzr').textContent=Math.round(Z.z*100)+'%'}
function zSet(z){Z.z=Math.max(1,Math.min(5,z));if(Z.z===1){Z.x=0;Z.y=0}zApply()}
const zReset=()=>{Z={z:1,x:0,y:0};zApply()};
function setLens(on){lensOn=on&&!pdfMode;$('#lens').setAttribute('aria-pressed',lensOn);lb.classList.toggle('is-lens',lensOn);if(!lensOn)loupe.hidden=true}
function setPdf(on){pdfMode=on;const it=L[lci];$('#lpdf').setAttribute('aria-pressed',on);$('span',$('#lpdf')).textContent=on?'Show image':'Original PDF';lf.hidden=!on;li.hidden=on;$('#lz').hidden=on;$('#lens').hidden=on;if(on){setLens(false);lf.src=it.pdf+'#view=FitH'}else lf.src='about:blank'}
function showL(i){lci=(i+L.length)%L.length;const it=L[lci];pdfMode=false;
  $('#lt').textContent=it.t;$('#lsub').textContent=it.sub||'';$('#lcnt').textContent=L.length>1?(lci+1)+' / '+L.length:'';
  const d=$('#ld2');d.href=it.dl||it.pdf||it.u;d.setAttribute('download',it.dlName||'');$('span',d).textContent=it.pdf||/\.pdf$/.test(it.dl||'')?'Download PDF':'Download';$('#lo').href=it.pdf||it.dl||it.u;
  $('#lpdf').hidden=!it.pdf;$('#lpdf').setAttribute('aria-pressed',false);$('span',$('#lpdf')).textContent='Original PDF';
  lf.hidden=true;lf.src='about:blank';li.hidden=false;$('#lz').hidden=false;$('#lens').hidden=false;
  li.src=it.u;li.alt=it.t;zReset();loupe.hidden=true;lb.classList.toggle('multi',L.length>1);
  const film=$('#lfilm');film.hidden=!(L.length>1&&L[0].th);if(!film.hidden){film.innerHTML=L.map((x,k)=>`<button type="button" class="${k===lci?'on':''}" data-k="${k}" aria-label="${esc(x.t)}"><img src="${x.th}" alt=""></button>`).join('')}}
function openL(list,i,from){L=list;clearTimeout(lbT);lbFrom=from||document.activeElement;const r=from&&from.getBoundingClientRect?from.getBoundingClientRect():null;
  lb.style.setProperty('--ox',(r?r.left+r.width/2:innerWidth/2)+'px');lb.style.setProperty('--oy',(r?r.top+r.height/2:innerHeight/2)+'px');
  showL(i);lb.hidden=false;reflow(lb);lb.classList.add('open');lbOpen=true;setTimeout(()=>$('#lc').focus({preventScroll:true}),RM?0:100)}
function closeL(instant){if(!lbOpen)return;lb.classList.remove('open');lbOpen=false;setLens(false);lbT=setTimeout(()=>{lb.hidden=true;lf.src='about:blank'},instant?0:760);if(!instant&&lbFrom&&lbFrom.focus&&document.contains(lbFrom))lbFrom.focus({preventScroll:true})}
$('#lc').onclick=()=>closeL();$('#lbp').onclick=()=>showL(lci-1);$('#lbn').onclick=()=>showL(lci+1);
$('#lzi').onclick=()=>zSet(Z.z*1.3);$('#lzo').onclick=()=>zSet(Z.z/1.3);$('#lzr').onclick=zReset;
$('#lens').onclick=()=>setLens(!lensOn);$('#lpdf').onclick=()=>setPdf(!pdfMode);
$('#lfilm').onclick=e=>{const b=e.target.closest('button');if(b)showL(+b.dataset.k)};
lst.addEventListener('wheel',e=>{if(pdfMode)return;e.preventDefault();zSet(Z.z*(e.deltaY<0?1.15:1/1.15))},{passive:false});
li.addEventListener('dblclick',()=>zSet(Z.z>1?1:2.4));
li.addEventListener('click',()=>{if(!lensOn&&Z.z===1&&!dragged)zSet(2)});
const pts=new Map();let pinch=0,pan=null,dragged=false;
lst.addEventListener('pointerdown',e=>{if(pdfMode)return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});dragged=false;if(pts.size===1&&Z.z>1){pan={x:e.clientX,y:e.clientY,tx:Z.x,ty:Z.y};li.classList.add('panning')}if(pts.size===2){const[a,b]=[...pts.values()];pinch=Math.hypot(a.x-b.x,a.y-b.y)/Z.z}});
lst.addEventListener('pointermove',e=>{if(pts.has(e.pointerId))pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pts.size===2){const[a,b]=[...pts.values()];zSet(Math.hypot(a.x-b.x,a.y-b.y)/pinch);dragged=true}
  else if(pan&&pts.size===1){const dx=e.clientX-pan.x,dy=e.clientY-pan.y;if(Math.abs(dx)+Math.abs(dy)>3)dragged=true;Z.x=pan.tx+dx;Z.y=pan.ty+dy;zApply()}
  if(lensOn){const r=li.getBoundingClientRect(),sr=lst.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    if(x<0||x>1||y<0||y>1){loupe.hidden=true;return}const k=3;loupe.hidden=false;loupe.style.left=(e.clientX-sr.left)+'px';loupe.style.top=(e.clientY-sr.top)+'px';
    loupe.style.backgroundImage=`url("${li.src}")`;loupe.style.backgroundSize=(r.width*k)+'px '+(r.height*k)+'px';loupe.style.backgroundPosition=(-(x*r.width*k-95))+'px '+(-(y*r.height*k-95))+'px'}});
const pend=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=0;if(!pts.size){pan=null;li.classList.remove('panning');setTimeout(()=>dragged=false,0)}};lst.addEventListener('pointerup',pend);lst.addEventListener('pointercancel',pend);
lst.addEventListener('pointerleave',()=>{if(lensOn)loupe.hidden=true});
const photoItems=()=>PHOTOS.map(p=>({u:p.u,th:p.u,t:p.t,sub:p.cap}));
const openPhotos=(i,from)=>openL(photoItems(),i||0,from);
const certItems=()=>C.map((c,i)=>({u:cview(i),th:cthumb(i),t:c[0],sub:c[2],pdf:c[3]==='pdf'?cu(i):null,dl:cu(i)}));
const cvItem=()=>[{u:CV.hi,t:CV.t,sub:'Page 1 of 1 · PDF',pdf:CV.u,dl:CV.u,dlName:CV.dl}];
const openCV=from=>openL(cvItem(),0,from);

/* ---------- 8 · pages ---------- */
/* ===== HOME ===== */
let lk=0,lkT,roleT;
INIT.home=()=>{
  let ci=0;$$('#nm .nl').forEach(s=>{const t=s.textContent;s.innerHTML=[...t].map(c=>`<span class="ch" style="--i:${ci++}">${c}</span>`).join('')});
  $('#sigPh').innerHTML=PHOTOS.map((p,i)=>`<img src="${p.u}" alt="${esc(p.alt)}" style="object-position:${p.pos}" width="900" height="${i?1004:638}" ${i?'loading="lazy"':''}>`).join('');
  $('#looks').innerHTML=PHOTOS.map((p,i)=>`<button type="button" aria-pressed="false" aria-label="${esc(p.look)} photo" data-i="${i}"><img src="${p.u}" alt="" style="object-position:${p.pos}" loading="lazy"></button>`).join('');
  $('#looks').onclick=e=>{const b=e.target.closest('button');if(b){showLook(+b.dataset.i);autoLook()}};
  showLook(0);autoLook();
  const st=$('#sigStage'),win=$('#sigWin');
  st.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||RM)return;const r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    win.style.setProperty('--ry',((x-.5)*14).toFixed(2)+'deg');win.style.setProperty('--rx',((.5-y)*12).toFixed(2)+'deg');win.style.setProperty('--lx',(x*100)+'%');win.style.setProperty('--ly',(y*100)+'%');
    $$('.ftag',st).forEach(t=>t.style.setProperty('--py',((y-.5)*+t.dataset.p).toFixed(1)))});
  st.addEventListener('pointerleave',()=>{win.style.setProperty('--ry','0deg');win.style.setProperty('--rx','0deg');$$('.ftag',st).forEach(t=>t.style.setProperty('--py',0))});
  win.onclick=()=>openPhotos(lk,win);
  const p0=P[0];$('#spotPh').innerHTML=`<img src="${p0.shots[0]}" alt="${esc(p0.t)} screenshot" loading="lazy">`;$('#spotT').textContent=p0.t;$('#spotD').textContent='Race your knowledge against the Bot or challenge another player online.';
  $('#spot').onclick=()=>nav('projects','1');
  const clk=()=>{const e=$('#lt2');if(e)e.textContent=new Date().toLocaleTimeString('en-PH',{timeZone:'Asia/Manila',hour:'numeric',minute:'2-digit'})};clk();setInterval(clk,30000);
  roleLoop()};
ENTER.home=()=>{$$('#ledger [data-n]').forEach(countUp)};
function showLook(i){const imgs=$$('#sigPh img');if(!imgs.length)return;const old=imgs.find(x=>x.classList.contains('on'));imgs.forEach(x=>x.classList.remove('prev'));
  if(old&&old!==imgs[i]){old.classList.remove('on');old.classList.add('prev')}
  if(old!==imgs[i]){imgs[i].classList.remove('on');reflow(imgs[i]);imgs[i].classList.add('on')}
  lk=i;$$('#looks button').forEach((b,j)=>{b.classList.toggle('on',j===i);b.setAttribute('aria-pressed',j===i)});$('#cntr').textContent=pad(i+1)+' / '+pad(PHOTOS.length);
  const b=$('#pbar');b.classList.remove('go');reflow(b);if(!RM)b.classList.add('go')}
function autoLook(){clearInterval(lkT);lkT=setInterval(()=>{if(!RM&&!document.hidden&&cur==='home'&&!lbOpen)showLook((lk+1)%PHOTOS.length)},4200)}
function countUp(el){const n=+el.dataset.n;if(RM){el.textContent=n;return}let i=0;el.textContent=0;const s=setInterval(()=>{el.textContent=++i;if(i>=n)clearInterval(s)},110)}
function roleLoop(){const el=$('#role'),R=D.ROLES;if(RM)return;let ri=0,n=R[0].length,del=false;
  (function step(){const w=R[ri];if(cur&&cur!=='home'){roleT=setTimeout(step,1200);return}
    if(!del){n++;el.textContent=w.slice(0,Math.min(n,w.length));if(n>=w.length){del=true;roleT=setTimeout(step,2600);return}roleT=setTimeout(step,55)}
    else{n--;el.textContent=w.slice(0,Math.max(n,0));if(n<=0){del=false;ri=(ri+1)%R.length;n=0}roleT=setTimeout(step,28)}})()}

/* ===== ABOUT ===== */
function segTabs(seg,attr,pane){$$('button',seg).forEach(b=>b.addEventListener('click',()=>{$$('button',seg).forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});$$('['+pane+']',seg.closest('.pg-in')||document).forEach(p=>p.hidden=p.getAttribute(pane)!==b.dataset[attr])}))}
INIT.about=()=>{
  segTabs($('#abSeg'),'ab','data-abv');
  const chap=$('#chap');chap.addEventListener('click',e=>{const b=e.target.closest('article>button');if(!b)return;const a=b.parentElement,on=!a.classList.contains('on');a.classList.toggle('on',on);b.setAttribute('aria-expanded',on);chapState()});
  const chapState=()=>{const all=$$('#chap article').every(a=>a.classList.contains('on'));$('#chapAll').setAttribute('aria-pressed',all);$('span',$('#chapAll')).textContent=all?'Collapse all':'Expand all'};
  $('#chapAll').onclick=()=>{const all=$$('#chap article').every(a=>a.classList.contains('on'));$$('#chap article').forEach(a=>{a.classList.toggle('on',!all);$('button',a).setAttribute('aria-expanded',!all)});chapState()};
  const order=[0,2,3];$('#film').innerHTML=order.map(i=>`<figure data-i="${i}" tabindex="0" role="button" aria-label="Open ${esc(PHOTOS[i].cap)} photo"><img src="${PHOTOS[i].u}" alt="${esc(PHOTOS[i].alt)}" style="object-position:${PHOTOS[i].pos}" loading="lazy" width="900" height="1000"><figcaption>${esc(PHOTOS[i].cap)}</figcaption></figure>`).join('');
  const openF=e=>{const f=e.target.closest('figure');if(f)openPhotos(+f.dataset.i,f)};$('#film').onclick=openF;$('#film').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openF(e)}};
  $('#openPhotos').onclick=e=>openPhotos(0,e.currentTarget);
  $('.arch').onclick=e=>openPhotos(1,e.currentTarget)};

/* ===== EDUCATION ===== */
let jI=0;
INIT.education=()=>{
  segTabs($('#edSeg'),'ed','data-edv');
  const rail=$('#jrRail');rail.insertAdjacentHTML('beforeend',MS.map((m,i)=>`<button type="button" role="tab" aria-selected="false" data-i="${i}" style="--i:${i}"><span class="yr">${m.yr}${m.sm?`<small>${m.sm}</small>`:''}</span><h3>${esc(m.t)}</h3></button>`).join(''));
  rail.addEventListener('click',e=>{const b=e.target.closest('button[data-i]');if(b)jSel(+b.dataset.i)});
  rail.addEventListener('keydown',e=>{const k=e.key;if(k==='ArrowDown'||k==='ArrowRight'){jSel(jI+1,true);e.preventDefault()}else if(k==='ArrowUp'||k==='ArrowLeft'){jSel(jI-1,true);e.preventDefault()}else if(k==='Home'){jSel(0,true);e.preventDefault()}else if(k==='End'){jSel(MS.length-1,true);e.preventDefault()}});
  $('#jrD').addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(b)jSel(jI+ +b.dataset.d)});
  jSel(0,false,true);addEventListener('resize',jLine);
  const dCW=t=>{$('#cw').innerHTML=CW[t].map((c,i)=>`<div class="${t?'now2':''}" style="--i:${i}"><i class="k fa-solid ${c[1]}"></i><h4>${esc(c[0])}</h4>${c[2]?`<ul>${c[2].map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<span class="mini">In Progress</span>'}</div>`).join('')};
  dCW(0);$('#ctabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('#ctabs button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});dCW(+b.dataset.t)}};
ENTER.education=()=>{requestAnimationFrame(jLine)};
function jSel(i,focus,quiet){if(i<0||i>=MS.length)return;jI=i;const m=MS[i];
  $$('#jrRail button[data-i]').forEach((b,k)=>{b.classList.toggle('on',k===i);b.classList.toggle('past',k<i);b.setAttribute('aria-selected',k===i);b.tabIndex=k===i?0:-1;if(k===i&&focus)b.focus({preventScroll:true})});
  const d=$('#jrD');d.innerHTML=`<span class="bgyr" aria-hidden="true">${m.yr}</span><p class="when">${esc(m.when)}</p><h3>${esc(m.t)}</h3>${m.html}<p class="tg">${m.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</p><div class="jr-nav"><button class="ib" type="button" data-d="-1" aria-label="Previous milestone" ${i===0?'disabled':''}><i class="fa-solid fa-arrow-up"></i></button><span class="cnt">${pad(i+1)} / ${pad(MS.length)}</span><button class="ib" type="button" data-d="1" aria-label="Next milestone" ${i===MS.length-1?'disabled':''}><i class="fa-solid fa-arrow-down"></i></button></div>`;
  if(!quiet&&!RM){d.classList.remove('sw');reflow(d);d.classList.add('sw')}jLine()}
function jLine(){const rail=$('#jrRail'),bs=$$('button[data-i]',rail);if(!bs.length||!visible(rail)||rail.scrollWidth>rail.clientWidth+4&&getComputedStyle(rail).flexDirection==='row')return;
  const c=b=>b.offsetTop+b.offsetHeight/2,y0=c(bs[0]),y1=c(bs[bs.length-1]),len=Math.max(1,y1-y0),svg=$('#jrLine');svg.style.top=y0+'px';svg.style.height=len+'px';
  [$('#jrBase'),$('#jrFill')].forEach(l=>{l.setAttribute('x1',2);l.setAttribute('x2',2);l.setAttribute('y1',0);l.setAttribute('y2',len)});
  const f=$('#jrFill');f.style.setProperty('--len',len);f.style.strokeDasharray=len;f.style.strokeDashoffset=len-(c(bs[jI])-y0)}

/* ===== SKILLS ===== */
let skF='All',skS=null,skNodes=[],skLines=[];
const SKP={};
INIT.skills=()=>{
  const st=$('#skStage'),A={Frontend:-90,Backend:-30,Database:30,Networking:90,Productivity:150,Exploration:210},R=Math.PI/180,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
  const nodes=[{id:'core',k:'core',x:50,y:50,l:'JBR'}];
  CATS.forEach(c=>{const a=A[c]*R,hx=50+31*Math.cos(a),hy=50+27*Math.sin(a);nodes.push({id:c,k:'hub',cat:c,x:hx,y:hy,l:c,ic:'fa-solid '+CIC[c]});
    const ks=S.filter(s=>s[1]===c),n=ks.length,offs=n===1?[0]:n===3?[-56,0,56]:n===4?[-78,-26,26,78]:ks.map((_,j)=>(j-(n-1)/2)*40);
    ks.forEach((s,j)=>{const b=(A[c]+offs[j])*R;nodes.push({id:s[0],k:'skill',cat:c,x:cl(hx+16*Math.cos(b),8,92),y:cl(hy+15*Math.sin(b),7,93),l:s[0],ic:s[2],d:s[3]})})});
  skNodes=nodes;nodes.forEach(n=>SKP[n.id]=n);
  const lines=[];nodes.forEach(n=>{if(n.k==='hub')lines.push([ 'core',n.id,'']);if(n.k==='skill')lines.push([n.cat,n.id,''])});D.SKLINK.forEach(l=>lines.push([l[0],l[1],'x']));skLines=lines;
  $('#skLines').innerHTML=lines.map((l,i)=>`<line class="${l[2]}" style="--i:${i}" x1="${SKP[l[0]].x}" y1="${SKP[l[0]].y}" x2="${SKP[l[1]].x}" y2="${SKP[l[1]].y}" data-a="${esc(l[0])}" data-b="${esc(l[1])}"/>`).join('');
  st.insertAdjacentHTML('beforeend',nodes.map((n,i)=>`<button type="button" class="nd ${n.k}" style="left:${n.x}%;top:${n.y}%;--i:${i}" data-id="${esc(n.id)}" aria-pressed="false" aria-label="${n.k==='core'?'Reset the constellation':n.k==='hub'?'Cluster: '+esc(n.l):esc(n.l)+' — '+esc(n.d)}"><i class="${n.k==='core'?'':n.ic}">${n.k==='core'?n.l:''}</i><span>${n.k==='core'?'Jena':esc(n.l)}</span></button>`).join(''));
  st.addEventListener('click',e=>{const b=e.target.closest('.nd');if(!b)return;const n=SKP[b.dataset.id];
    if(n.k==='core'){skF='All';skS=null}else if(n.k==='hub'){skF=skF===n.id&&!skS?'All':n.id;skS=null}else{skS=n.id;skF=n.cat;document.dispatchEvent(new CustomEvent('jb:skill',{detail:{id:n.id}}));}skRender()});
  $('#stabs').innerHTML=['All',...CATS].map(c=>`<button type="button" data-c="${c}" class="${c==='All'?'on':''}">${c==='All'?'<i class="fa-solid fa-border-all"></i> ':`<i class="fa-solid ${CIC[c]}"></i> `}${c}</button>`).join('');
  $('#stabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;skF=b.dataset.c;skS=null;skRender()};
  $('#skU').innerHTML=D.TECHU.map(t=>`<li>${t}</li>`).join('');
  segTabs($('#skSeg'),'sk','data-skp');
  skRender()};
function skRender(){const nb=new Set();
  if(skS){nb.add(skS);const n=SKP[skS];nb.add(n.cat);skLines.forEach(l=>{if(l[0]===skS)nb.add(l[1]);if(l[1]===skS)nb.add(l[0])})}
  $$('.nd',$('#skStage')).forEach(b=>{const n=SKP[b.dataset.id];const dim=skF!=='All'&&n.k!=='core'&&n.cat!==skF&&!(skS&&nb.has(n.id));
    b.classList.toggle('dim',dim);const sel=n.k==='skill'?skS===n.id:n.k==='hub'?(skF===n.id&&!skS):false;b.classList.toggle('sel',sel);b.classList.toggle('nb',!!skS&&nb.has(n.id)&&n.id!==skS);b.setAttribute('aria-pressed',sel)});
  $$('#skLines line').forEach(l=>{const a=l.dataset.a,b=l.dataset.b;const hl=skS?(a===skS||b===skS):(skF!=='All'&&(a===skF||b===skF));const inF=skF==='All'||[a,b].every(x=>x==='core'||SKP[x].cat===skF||(SKP[x].id===skF));l.classList.toggle('hl',!!hl);l.classList.toggle('dim',!hl&&!inF&&!(skS&&nb.has(a)&&nb.has(b)))});
  $$('#stabs button').forEach(b=>b.classList.toggle('on',b.dataset.c===skF));
  const s=skS&&S.find(x=>x[0]===skS);
  if(s){$('#skCat').textContent='Cluster · '+s[1];$('#skName').textContent=s[0];$('#skDesc').textContent=s[3]+(nb.size>2?' Connected to: '+[...nb].filter(x=>x!==s[0]&&x!==s[1]).join(', ')+'.':'')}
  else if(skF!=='All'){$('#skCat').textContent='Cluster · '+skF;$('#skName').textContent=skF;$('#skDesc').textContent='Skills in this cluster: '+S.filter(x=>x[1]===skF).map(x=>x[0]).join(', ')+'. Select one to read how I use it.'}
  else{$('#skCat').textContent='Cluster · All';$('#skName').textContent='Pick a node';$('#skDesc').textContent='Select any skill in the constellation to read how I use it. Use the clusters to filter.'}}

/* ===== PROJECTS ===== */
let pi=0,pf='all',ps='',cmpOn=false,cmpSel=[],shotI=0,ph=null;
const pvis=()=>P.map((p,i)=>i).filter(i=>(pf==='all'||P[i].f===pf)&&(!ps||matches([P[i].t,P[i].cat,P[i].tag,P[i].d,P[i].tech.join(' ')].join(' '),ps)));
function stageHTML(p,i){if(p.shots){const n=p.shots.length;return`<div class="v"><div class="art"></div><div class="layers">${p.shots.map((s,k)=>`<img src="${s}" alt="${esc(p.t)} — ${esc(p.caps[k])}" width="1400" data-k="${k}" data-pos="${(k-shotI+n)%n}" ${k?'loading="lazy"':''}>`).join('')}</div><span class="cap" id="pxCap">${esc(p.caps[shotI])}</span><span class="shotn">${p.shots.map((_,k)=>`<button type="button" data-k="${k}" class="${k===shotI?'on':''}" aria-label="Show screenshot ${k+1}: ${esc(p.caps[k])}"></button>`).join('')}</span></div>`}
  return`<div class="v"><div class="art"></div><div class="bar3"></div><i class="big-i fa-solid ${p.ic}"></i><b class="big-n">${pad(i+1)}</b><span class="cap">Screenshots coming soon</span></div>`}
function infoHTML(p,i){const long=p.d.length>230;
  return`<span class="tag">${esc(p.tag)}</span><h2>${esc(p.t)}</h2>${p.kst?`<div class="kst">${p.kst.map(k=>`<div><b>${k[0]}</b>${k[1]}</div>`).join('')}</div>`:''}<div class="desc-w"><div class="${long?'desc':''}" id="pdesc"><p>${esc(p.d)}</p></div>${long?'<button class="more-d" type="button" id="pmore" aria-expanded="false"><span>Read more</span><i class="fa-solid fa-chevron-down"></i></button>':''}</div><ul class="chips">${p.tech.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><p class="px-m"><i class="fa-solid fa-layer-group"></i> ${esc(p.cat)} &nbsp;·&nbsp; <i class="fa-solid fa-user"></i> Developed by Jena Benisse Redondo</p><div class="cta">${p.shots?`<button class="bt bt-o bt-s" type="button" id="pShots"><i class="fa-solid fa-expand"></i> Screenshots full-screen</button>`:''}${p.link?`<a class="bt bt-p bt-s" href="${p.link[0]}" target="_blank" rel="noopener"><i class="fa-solid ${p.link[2]}"></i> ${p.link[1]}</a>`:''}<button class="bt bt-o bt-s" type="button" id="pCmp"><i class="fa-solid fa-code-compare"></i> ${cmpSel.includes(i)?'Remove from compare':'Add to compare'}</button><a class="bt bt-o bt-s" href="#/contact"><i class="fa-solid fa-paper-plane"></i> Discuss this project</a></div>`}
function drawList(){const v=pvis();$('#pxList').innerHTML=P.map((p,i)=>`<li data-i="${i}" style="--i:${i}" class="${i===pi?'on':''} ${v.includes(i)?'':'gone'} ${ph&&p.tech.includes(ph)?'hit':''} ${cmpSel.includes(i)?'picked':''}"><button type="button" aria-current="${i===pi}"><span class="n">${pad(i+1)}</span><h3>${esc(p.t)}</h3><small>${esc(p.cat)}</small></button><button type="button" class="pick" data-pick="${i}" aria-pressed="${cmpSel.includes(i)}" aria-label="${cmpSel.includes(i)?'Remove':'Add'} ${esc(p.t)} ${cmpSel.includes(i)?'from':'to'} comparison"><i class="fa-solid ${cmpSel.includes(i)?'fa-check':'fa-plus'}"></i></button></li>`).join('');
  $('#pxEmpty').hidden=v.length>0;const on=$('#pxList .on');const pl=$('#pxList');if(on&&visible(on)){if(pl.scrollHeight>pl.clientHeight+4)pl.scrollTop=on.offsetTop-pl.clientHeight/2+on.offsetHeight/2;else pl.scrollLeft=on.offsetLeft-pl.clientWidth/2+on.offsetWidth/2}}
function showP(i,opt={}){if(i===undefined||i<0||i>=P.length)return;document.dispatchEvent(new CustomEvent('jb:project',{detail:{i}}));const changed=i!==pi||opt.force;pi=i;if(changed)shotI=0;const p=P[i];drawList();
  const st=$('#pxStage');st.style.setProperty('--c1',p.c1);st.style.setProperty('--c2',p.c2);st.innerHTML=stageHTML(p,i);st.setAttribute('role','button');st.setAttribute('tabindex','0');st.setAttribute('aria-label',p.shots?'Open screenshots full-screen: '+p.t:p.t+' — screenshots coming soon');
  if(!RM&&opt.anim!==false){st.classList.remove('swap');reflow(st);st.classList.add('swap')}
  const inf=$('#pxInfo');inf.innerHTML=infoHTML(p,i);if(!RM&&opt.anim!==false){inf.classList.remove('sw');reflow(inf);inf.classList.add('sw')}
  $('#pxCnt').textContent=pad(i+1)+' / '+pad(P.length);if(cur==='projects')setSub('projects',i+1)}
function setShot(k){const p=P[pi];if(!p.shots)return;shotI=k;const n=p.shots.length;$$('#pxStage .layers img').forEach(im=>im.dataset.pos=(+im.dataset.k-k+n)%n);$$('#pxStage .shotn button').forEach((b,j)=>b.classList.toggle('on',j===k));const c=$('#pxCap');if(c)c.textContent=p.caps[k]}
const projItems=p=>p.shots.map((s,k)=>({u:s,th:s,t:p.t,sub:p.caps[k]+' · '+(k+1)+' of '+p.shots.length}));
const stepPx=d=>{const v=pvis();if(!v.length)return;showP(v[(Math.max(0,v.indexOf(pi))+d+v.length)%v.length])};
function cmpUpd(){$('#cmpN').textContent=cmpSel.length?cmpSel.length+' selected'+(cmpSel.length<2?' — pick at least one more':''):'Pick 2 or 3 projects';$('#cmpGo').disabled=cmpSel.length<2}
function togglePick(i){if(cmpSel.includes(i))cmpSel=cmpSel.filter(x=>x!==i);else{if(cmpSel.length>=3){toast('Compare up to 3 projects at a time');return}cmpSel.push(i)}if(!cmpOn)setCmp(true);cmpUpd();drawList();const b=$('#pCmp');if(b)b.lastChild.textContent=' '+(cmpSel.includes(pi)?'Remove from compare':'Add to compare')}
function setCmp(on){cmpOn=on;$('#cmpT').setAttribute('aria-pressed',on);$('#cmpBar').hidden=!on;$('.prj').classList.toggle('cmping',on);if(!on)cmpSel=[],drawList();cmpUpd()}
function openCompare(){const sel=cmpSel.slice(),n=sel.length;if(n<2)return;const t=$('#cmpT2');t.style.gridTemplateColumns=`110px repeat(${n},minmax(0,1fr))`;
  const row=(lab,fn)=>`<div class="lb2">${lab}</div>`+sel.map(i=>`<div>${fn(P[i],i)}</div>`).join('');
  t.innerHTML=row('Preview',(p,i)=>p.shots?`<img src="${p.shots[0]}" alt="${esc(p.t)} screenshot" loading="lazy">`:`<div style="aspect-ratio:16/9;border-radius:8px;display:grid;place-items:center;background:linear-gradient(135deg,${p.c1},${p.c2});color:rgba(255,255,255,.75);font-size:2rem"><i class="fa-solid ${p.ic}"></i></div>`)
    +`<div class="lb2">Project</div>`+sel.map(i=>`<div class="hd">${esc(P[i].t)}</div>`).join('')+row('Type',p=>esc(p.cat))+row('Summary',p=>esc(p.d))+row('Technologies',p=>p.tech.map(x=>`<span class="tg" style="display:inline-flex;margin:0 6px 6px 0"><span>${esc(x)}</span></span>`).join(''))
    +row('Screenshots',p=>p.shots?p.shots.length+' available':'Coming soon')+row('Live link',p=>p.link?`<a class="bt bt-s bt-o" href="${p.link[0]}" target="_blank" rel="noopener">${p.link[1]}</a>`:'—');
  CMP.show($('#cmpGo'))}
INIT.projects=()=>{
  $('#fl').innerHTML=FILT.map((f,i)=>`<button type="button" data-f="${f[0]}" class="${i?'':'on'}" aria-pressed="${!i}">${f[1]}</button>`).join('');
  $('#fl').onclick=e=>{const b=e.target.closest('button');if(!b)return;pf=b.dataset.f;$$('#fl button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});drawList();const v=pvis();if(v.length&&!v.includes(pi))showP(v[0])};
  $('#pq').oninput=e=>{ps=e.target.value.trim();drawList();const v=pvis();if(v.length&&!v.includes(pi))showP(v[0])};
  $('#pxList').onclick=e=>{const pk=e.target.closest('.pick');if(pk){togglePick(+pk.dataset.pick);return}const li2=e.target.closest('li');if(!li2)return;const i=+li2.dataset.i;if(cmpOn&&e.shiftKey){togglePick(i);return}showP(i)};
  $('#pxPrev').onclick=()=>stepPx(-1);$('#pxNext').onclick=()=>stepPx(1);
  const st=$('#pxStage');
  st.addEventListener('click',e=>{const p=P[pi],im=e.target.closest('.layers img'),dot=e.target.closest('.shotn button');if(dot){setShot(+dot.dataset.k);e.stopPropagation();return}
    if(!p.shots)return;if(im&&+im.dataset.pos!==0){setShot(+im.dataset.k);return}openL(projItems(p),shotI,st)});
  st.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target===st){e.preventDefault();const p=P[pi];if(p.shots)openL(projItems(p),shotI,st)}else if(e.key==='ArrowDown'&&P[pi].shots){setShot((shotI+1)%P[pi].shots.length);e.preventDefault()}else if(e.key==='ArrowUp'&&P[pi].shots){setShot((shotI-1+P[pi].shots.length)%P[pi].shots.length);e.preventDefault()}});
  $('#pxInfo').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
    if(b.id==='pmore'){const d=$('#pdesc'),on=!d.classList.contains('open');d.classList.toggle('open',on);b.setAttribute('aria-expanded',on);$('span',b).textContent=on?'Show less':'Read more';$('i',b).className='fa-solid fa-chevron-'+(on?'up':'down')}
    else if(b.id==='pShots')openL(projItems(P[pi]),shotI,b);else if(b.id==='pCmp')togglePick(pi)});
  $('#cmpT').onclick=()=>setCmp(!cmpOn);$('#cmpClr').onclick=()=>{cmpSel=[];cmpUpd();drawList()};$('#cmpGo').onclick=openCompare;$('#cmpX').onclick=()=>CMP.hide();
  drawList();showP(0,{anim:false});cmpUpd()};
ENTER.projects=()=>{if(!inited.__pj){inited.__pj=1}};
SUB.projects=s=>{const n=parseInt(s,10);if(n>=1&&n<=P.length&&n-1!==pi){pf='all';ps='';const q=$('#pq');if(q)q.value='';$$('#fl button').forEach(x=>{const on=x.dataset.f==='all';x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});showP(n-1)}};

/* ===== CERTIFICATES ===== */
let cs=0,cf='All',cs2='';
const cVis=()=>C.map((c,i)=>i).filter(i=>(cf==='All'||C[i][6]===cf)&&(!cs2||matches([C[i][0],C[i][1],C[i][2],C[i][4],C[i][5].join(' ')].join(' '),cs2)));
function showC(i,fresh){if(i===undefined||i<0||i>=C.length)return;document.dispatchEvent(new CustomEvent('jb:cert',{detail:{i}}));cs=i;const c=C[i],im=$('#cgImg'),v=$('#vault');im.src=cthumb(i);im.alt=c[0]+' certificate';$('#cgNo').textContent=pad(i+1);
  const vis=cVis(),pos=Math.max(0,vis.indexOf(i));$('#cgCnt').textContent=pad(pos+1)+' / '+pad(vis.length||C.length);
  $$('#strip button').forEach(b=>{const on=+b.dataset.i===i;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});const sb=$('#strip button.on'),sp=$('#strip');if(sb&&visible(sb))sp.scrollTo({left:sb.offsetLeft-sp.clientWidth/2+sb.offsetWidth/2,behavior:RM?'auto':'smooth'});
  const m=$('#cgMeta'),pdf=c[3]==='pdf';m.innerHTML=`<span class="cat">${esc(c[1])} · ${pdf?'PDF document':'Image certificate'}</span><h3>${esc(c[0])}</h3><p class="iss">${esc(c[2])}</p><p>${esc(c[4])}</p><ul class="chips">${c[5].map(t=>`<li>${esc(t)}</li>`).join('')}</ul><div class="cta"><button class="bt bt-p" type="button" data-act="inspect"><i class="fa-solid fa-magnifying-glass-plus"></i> Open &amp; inspect</button><a class="bt bt-o" href="${cu(i)}" download><i class="fa-solid fa-download"></i> Download original ${pdf?'PDF':'image'}</a><a class="bt bt-o" href="${cu(i)}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open original</a></div>`;
  if(!RM&&fresh!==false){m.classList.remove('sw');reflow(m);m.classList.add('sw');v.classList.remove('open','sw');reflow(v);v.classList.add('sw');setTimeout(()=>v.classList.add('open'),90)}else v.classList.add('open');
  if(cur==='certificates')setSub('certificates',i+1)}
function cApply(){const v=cVis();$$('#strip button').forEach(x=>x.classList.toggle('gone',!v.includes(+x.dataset.i)));$('#cEmpty').hidden=v.length>0;$('#vault').hidden=!v.length;$('#strip').hidden=!v.length;if(v.length&&!v.includes(cs))showC(v[0])}
const stepC=d=>{const v=cVis();if(!v.length)return;showC(v[(Math.max(0,v.indexOf(cs))+d+v.length)%v.length])};
INIT.certificates=()=>{
  const groups=['All',...new Set(C.map(c=>c[6]))];$('#ctf').innerHTML=groups.map((g,i)=>`<button type="button" data-g="${g}" class="${i?'':'on'}" aria-pressed="${!i}">${g}</button>`).join('');
  $('#ctf').onclick=e=>{const b=e.target.closest('button');if(!b)return;cf=b.dataset.g;$$('#ctf button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});cApply()};
  $('#cq').oninput=e=>{cs2=e.target.value.trim();cApply()};
  $('#strip').innerHTML=C.map((c,i)=>`<button type="button" role="option" data-i="${i}" style="--i:${i}" aria-selected="false"><b>${pad(i+1)}</b><img src="${cthumb(i)}" alt="${esc(c[0])} certificate thumbnail" loading="lazy" width="660" height="510"><span>${esc(c[0])}</span></button>`).join('');
  $('#strip').onclick=e=>{const b=e.target.closest('button');if(b)showC(+b.dataset.i)};
  $('#cgPrev').onclick=()=>stepC(-1);$('#cgNext').onclick=()=>stepC(1);
  const inspect=()=>openL(certItems(),cs,$('#vaultPaper'));$('#vaultPaper').onclick=inspect;$('#cgMeta').onclick=e=>{if(e.target.closest('[data-act=inspect]'))inspect()};
  showC(0,false)};
ENTER.certificates=()=>{const v=$('#vault');if(!RM&&inited.certificates){v.classList.remove('open','sw');reflow(v);v.classList.add('sw');setTimeout(()=>v.classList.add('open'),350)}};
SUB.certificates=s=>{const n=parseInt(s,10);if(n>=1&&n<=C.length&&n-1!==cs){cf='All';cs2='';$('#cq').value='';$$('#ctf button').forEach((x,k)=>{x.classList.toggle('on',!k);x.setAttribute('aria-pressed',!k)});cApply();showC(n-1)}};

/* ===== EXPERIENCE ===== */
INIT.experience=()=>{
  segTabs($('#exSeg'),'ex','data-exv');
  $('#recL').addEventListener('click',e=>{const cb=e.target.closest('[data-cert]');if(cb){openL(certItems(),+cb.dataset.cert,cb);return}const b=e.target.closest('.rec>button');if(!b)return;const r=b.parentElement,on=!r.classList.contains('on');$$('#recL .rec').forEach(x=>{x.classList.remove('on');$('button',x).setAttribute('aria-expanded',false)});r.classList.toggle('on',on);b.setAttribute('aria-expanded',on)});
  const fan=$('#fan');const act=p=>{$$('.fp',fan).forEach(x=>x.classList.toggle('on',x===p))};$$('.fp',fan).forEach(p=>{p.addEventListener('click',()=>act(p));p.addEventListener('focus',()=>act(p));p.addEventListener('mouseenter',()=>{if(FINE)act(p)})});
  $('.proc-steps').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('.proc-steps button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});const s=PS[+b.dataset.s];$('#pI').className='fa-solid '+s[0];$('#pT').textContent=s[1]})};

/* ===== RESUME ===== */
INIT.resume=()=>{
  $('#cvView').onclick=e=>openCV(e.currentTarget);$('#cvDoc').onclick=e=>openCV(e.currentTarget);
  $('#cvTog').onclick=()=>{const live=$('#docLive'),on=live.hidden;live.hidden=!on;$('#cvDoc').hidden=on;$('#cvTog').setAttribute('aria-pressed',on);$('span',$('#cvTog')).textContent=on?'Show preview image':'Live preview';if(on&&!$('#cvFrame').src.includes('.pdf'))$('#cvFrame').src=CV.u+'#view=FitH'};
  const d=$('#cvDoc'),w=$('#docWrap');w.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||RM)return;const r=w.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;d.style.setProperty('--ry',((x-.5)*16).toFixed(1)+'deg');d.style.setProperty('--rx',((.5-y)*12).toFixed(1)+'deg')});
  w.addEventListener('pointerleave',()=>{d.style.setProperty('--ry','0deg');d.style.setProperty('--rx','0deg')})};

/* ===== CONTACT ===== */
const FQ=()=>$$('#faq-l details');
function faqAllState(){const v=FQ().filter(d=>!d.classList.contains('gone')),all=v.length&&v.every(d=>d.open&&!d.classList.contains('closing')),b=$('#faqAll');b.setAttribute('aria-pressed',!!all);$('span',b).textContent=all?'Collapse all':'Expand all'}
function faqToggle(d,force){const open=force!==undefined?force:!d.open,a=$('.fa',d);if(open===d.open&&!d.classList.contains('closing'))return;a.getAnimations().forEach(x=>x.cancel());d.classList.remove('closing');
  if(RM){d.open=open;faqAllState();return}
  if(open){d.open=true;const h=a.offsetHeight;a.animate([{height:'0px',opacity:0},{height:h+'px',opacity:1}],{duration:380,easing:'cubic-bezier(.2,.8,.2,1)'})}
  else{d.classList.add('closing');const h=a.offsetHeight,an=a.animate([{height:h+'px',opacity:1},{height:'0px',opacity:0}],{duration:300,easing:'cubic-bezier(.2,.8,.2,1)'});an.onfinish=()=>{d.open=false;d.classList.remove('closing');faqAllState()}}
  faqAllState()}
function confetti(b){if(RM||!b)return;const c=document.createElement('canvas');c.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:3300';c.width=innerWidth;c.height=innerHeight;document.body.append(c);const x=c.getContext('2d'),r=b.getBoundingClientRect(),cols=['#22C55E','#e8f3e6','#86efac','#4ade80'],Pt=Array.from({length:80},()=>({x:r.left+r.width/2,y:r.top,vx:(Math.random()-.5)*12,vy:-Math.random()*13-3,s:Math.random()*6+3,c:cols[Math.random()*4|0],a:1}));(function f(){x.clearRect(0,0,c.width,c.height);let al=0;Pt.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.a-=.012;if(p.a>0){al++;x.globalAlpha=p.a;x.fillStyle=p.c;x.fillRect(p.x,p.y,p.s,p.s*.6)}});al?requestAnimationFrame(f):c.remove()})()}
INIT.contact=()=>{
  segTabs($('#ctSeg'),'ct','data-ctv');
  $('#faq-l').addEventListener('click',e=>{const s=e.target.closest('summary');if(!s)return;e.preventDefault();faqToggle(s.parentElement)});
  $('#faq-l').addEventListener('keydown',e=>{const s=e.target.closest&&e.target.closest('summary');if(!s)return;const vs=FQ().filter(d=>!d.classList.contains('gone')).map(d=>$('summary',d)),i=vs.indexOf(s);if(e.key==='ArrowDown'&&vs[i+1]){vs[i+1].focus();e.preventDefault()}else if(e.key==='ArrowUp'&&vs[i-1]){vs[i-1].focus();e.preventDefault()}else if(e.key==='Home'){vs[0].focus();e.preventDefault()}else if(e.key==='End'){vs[vs.length-1].focus();e.preventDefault()}});
  $('#faqAll').onclick=()=>{const vs=FQ().filter(d=>!d.classList.contains('gone')),all=vs.every(d=>d.open);vs.forEach(d=>faqToggle(d,!all))};
  $('#fq').oninput=()=>{const q=$('#fq').value.trim();let n=0,last=null;FQ().forEach(d=>{const hit=!q||matches(d.textContent,q);d.classList.toggle('gone',!hit);if(hit){n++;last=d}});$('#fEmpty').hidden=n>0;if(q&&n===1)faqToggle(last,true);faqAllState()};faqAllState();
  $('#copy').onclick=()=>{copyText(EMAIL,'Email',$('#copy'));confetti($('#copy'))};
  $('#cf').onsubmit=e=>{e.preventDefault();const n=$('#fn'),m=$('#fe'),g=$('#fm');let ok=1;[n,m,g].forEach(i=>{const bad=!i.value.trim()||(i===m&&!/^\S+@\S+\.\S+$/.test(i.value));i.classList.toggle('bad',bad);i.setAttribute('aria-invalid',bad);if(bad)ok=0});if(!ok){toast('Please complete the highlighted fields');return}
    const sub=encodeURIComponent('Portfolio inquiry: '+$('#ft').value+' — '+n.value.trim()),body=encodeURIComponent('Hi Jena,\n\n'+g.value.trim()+'\n\nI’m interested in: '+$('#ft').value+'\n\nFrom: '+n.value.trim()+' ('+m.value.trim()+')');location.href='mailto:'+EMAIL+'?subject='+sub+'&body='+body;toast('Opening your email app…')};
  $$('[data-tilt]').forEach(c=>{c.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||RM)return;const r=c.getBoundingClientRect();c.style.setProperty('--try',(((e.clientX-r.left)/r.width-.5)*8).toFixed(1)+'deg');c.style.setProperty('--trx',((.5-(e.clientY-r.top)/r.height)*8).toFixed(1)+'deg')});c.addEventListener('pointerleave',()=>{c.style.setProperty('--try','0deg');c.style.setProperty('--trx','0deg')})})};
document.addEventListener('click',e=>{const b=e.target.closest('[data-copy]');if(b)copyText(b.dataset.copy,b.dataset.what||'Text',b);const a=e.target.closest('[data-act=vcard]');if(a)vcard()});

/* ---------- 9 · overlays wiring (the Discovery Portal lives in js/portal.js) ---------- */
$('#palTheme').onclick=flip;$('#palCalm').onclick=()=>setMode('calm',!modeOn('calm'));$('#palLight').onclick=()=>setMode('light',!modeOn('light'));$('#palComfy').onclick=()=>setMode('comfy',!modeOn('comfy'));
$('#dirBtn').onclick=e=>DIR.show(e.currentTarget);$('#dirx').onclick=()=>DIR.hide();
$('#dirRand').onclick=()=>{const o=IDS.filter(x=>x!==cur);nav(o[Math.random()*o.length|0])};
$('#dirTour').onclick=()=>{DIR.hide(false,true);setTimeout(startTour,500)};
$('#cmp').addEventListener('click',e=>{if(e.target.id==='cmp')CMP.hide()});

/* ---------- 11 · guided discovery tour ---------- */
let TOURON=false,tourI=0;
const tour=$('#tour');
async function tourGo(i){tourI=i;const s=D.TOUR[i];if(s.r!==cur){nav(s.r);await wait(RM?150:1500)}else await wait(120);
  const el=$$(s.sel).find(visible);$('#tourN').textContent=(i+1)+' / '+D.TOUR.length;$('#tourT').textContent=s.t;$('#tourD').textContent=s.d;
  $('#tourPrev').disabled=i===0;$('#tourNext').textContent=i===D.TOUR.length-1?'Finish':'Next';tourPlace(el)}
function tourPlace(el){const h=$('#tourHole'),c=$('#tourC');if(el){const r=el.getBoundingClientRect(),pd=8;Object.assign(h.style,{left:(r.left-pd)+'px',top:(r.top-pd)+'px',width:(r.width+pd*2)+'px',height:(r.height+pd*2)+'px'});
    const cw=Math.min(340,innerWidth-32),ch=c.offsetHeight||190;let x=Math.max(16,Math.min(innerWidth-cw-16,r.left+r.width/2-cw/2)),y=r.bottom+pd+14;if(y+ch>innerHeight-12)y=Math.max(12,r.top-ch-pd-14);if(r.width>innerWidth*.7&&r.height>innerHeight*.5){y=innerHeight-ch-24}
    if(r.right<innerWidth*.2){x=r.right+22;y=Math.max(12,Math.min(innerHeight-ch-12,r.top))}c.style.left=x+'px';c.style.top=y+'px'}
  else{Object.assign(h.style,{left:'50%',top:'50%',width:'0px',height:'0px'});c.style.left=Math.max(16,(innerWidth-340)/2)+'px';c.style.top='30%'}}
function startTour(){if(TOURON)return;closeOverlays(true);TOURON=true;tour.hidden=false;tourGo(0);setTimeout(()=>$('#tourNext').focus(),1700)}
function endTour(quiet){if(!TOURON)return;TOURON=false;tour.hidden=true;if(!quiet)toast('Tour finished — press ? to replay it')}
$('#tourNext').onclick=()=>{if(tourI>=D.TOUR.length-1)endTour();else tourGo(tourI+1)};$('#tourPrev').onclick=()=>tourGo(Math.max(0,tourI-1));$('#tourSkip').onclick=()=>endTour();
$('#tourBtn').onclick=startTour;addEventListener('resize',()=>{if(TOURON){const el=$$(D.TOUR[tourI].sel).find(visible);tourPlace(el)}});

/* ---------- 12 · pointer light · magnetic buttons · keyboard · easter eggs ---------- */
(function(){let gx=0,gy=0,raf=0;const g=$('#glow');addEventListener('pointermove',e=>{if(RM||e.pointerType==='touch')return;gx=e.clientX;gy=e.clientY;if(!raf)raf=requestAnimationFrame(()=>{raf=0;g.style.setProperty('--gx',gx+'px');g.style.setProperty('--gy',gy+'px')})},{passive:true})})();
if(FINE){document.addEventListener('mousemove',e=>{const m=e.target.closest&&e.target.closest('[data-mag]');if(m&&!RM){const r=m.getBoundingClientRect();m.style.setProperty('--mx',((e.clientX-r.left-r.width/2)*.18)+'px');m.style.setProperty('--my',((e.clientY-r.top-r.height/2)*.28)+'px')}},{passive:true});
  document.addEventListener('mouseout',e=>{const m=e.target.closest&&e.target.closest('[data-mag]');if(m&&!m.contains(e.relatedTarget)){m.style.setProperty('--mx','0px');m.style.setProperty('--my','0px')}})}
const bl=$('#bloom'),bx=bl.getContext('2d');let blRun=false;
function bloom(){toast('You found the secret garden. Thanks for exploring!');if(RM||blRun)return;blRun=true;bl.width=innerWidth;bl.height=innerHeight;const cols=['#22C55E','#4ade80','#86efac','#dcfce7','#16a34a'],lv=Array.from({length:110},()=>({x:Math.random()*bl.width,y:-Math.random()*bl.height*.6,s:7+Math.random()*12,v:1.2+Math.random()*2.6,sw:Math.random()*6.28,r:Math.random()*6.28,c:cols[Math.random()*5|0]}));let T=0;
  (function f(){T++;bx.clearRect(0,0,bl.width,bl.height);let alive=0;lv.forEach(l=>{l.y+=l.v;l.sw+=.04;l.x+=Math.sin(l.sw)*1.4;l.r+=.03;if(l.y<bl.height+30){alive++;bx.save();bx.translate(l.x,l.y);bx.rotate(l.r);bx.fillStyle=l.c;bx.beginPath();bx.moveTo(0,-l.s);bx.quadraticCurveTo(l.s*.8,0,0,l.s);bx.quadraticCurveTo(-l.s*.8,0,0,-l.s);bx.fill();bx.restore()}});if(alive&&T<700)requestAnimationFrame(f);else{bx.clearRect(0,0,bl.width,bl.height);blRun=false}})()}
let taps=0,tapT;$('#brand').addEventListener('click',()=>{taps++;clearTimeout(tapT);tapT=setTimeout(()=>taps=0,2000);if(taps>=5){taps=0;bloom()}});
const KON=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];let kp=0;
addEventListener('keydown',e=>{const k=e.key;
  if(window.Intro&&Intro.playing)return;
  if(window.Portal&&Portal.open)return;
  if(TOURON){if(k==='Escape')endTour();else if(k==='ArrowRight')$('#tourNext').click();else if(k==='ArrowLeft')$('#tourPrev').click();return}
  if(lbOpen){if(k==='Escape')closeL();else if(L.length>1&&k==='ArrowLeft')showL(lci-1);else if(L.length>1&&k==='ArrowRight')showL(lci+1);else if(!pdfMode&&(k==='+'||k==='='))zSet(Z.z*1.3);else if(!pdfMode&&(k==='-'||k==='_'))zSet(Z.z/1.3);else if(!pdfMode&&k==='0')zReset();else if(k==='l'||k==='L'){if(!pdfMode)setLens(!lensOn)}else trap(e,lb);return}
  if(CMP.open){if(k==='Escape')CMP.hide();else trap(e,$('#cmp'));return}
  if(DIR.open){if(k==='Escape')DIR.hide();else trap(e,$('#dir'));return}
  if((e.ctrlKey||e.metaKey)&&k.toLowerCase()==='k'){e.preventDefault();window.Portal&&Portal.toggle();return}
  if(e.ctrlKey||e.metaKey||e.altKey||isTyping(e.target))return;
  if(k===KON[kp]||k.toLowerCase()===KON[kp]){kp++;if(kp===KON.length){kp=0;bloom()}}else kp=(k===KON[0])?1:0;
  if(k==='/'||k==='p'||k==='P'){e.preventDefault();window.Portal&&Portal.toggle()}
  else if(k==='g'||k==='G')DIR.show($('#dirBtn'));else if(k==='['||(k==='PageUp'&&false))jump(-1);else if(k===']')jump(1);
  else if(k==='t'||k==='T')flip();else if(k==='?')startTour();
  else if(/^[1-9]$/.test(k)){nav(IDS[+k-1])}
  else if(k==='ArrowRight'||k==='ArrowLeft'){const d=k==='ArrowRight'?1:-1;if(cur==='projects')stepPx(d);else if(cur==='certificates')stepC(d);else if(cur==='education')jSel(jI+d)}
  else if(k==='ArrowDown'||k==='ArrowUp'){if(cur==='education'&&!e.target.closest('.pg-in')?.querySelector(':focus'))jSel(jI+(k==='ArrowDown'?1:-1))}});

/* ---------- 13 · init ---------- */
function startApp(){if(started)return;started=true;onHash();setTimeout(()=>{setCur(IDS.indexOf(cur||'home'))},60)}
buildNav();
setTheme(root.dataset.theme);setMode('calm',root.classList.contains('calm'),true);setMode('light',!root.classList.contains('nolight'),true);setMode('comfy',load('jbr-comfy')==='on',true);
$('#th').onclick=flip;$('#fxBtn').onclick=()=>setMode('calm',!modeOn('calm'));$('#fxBtn').setAttribute('aria-pressed',!root.classList.contains('calm'));
addEventListener('hashchange',onHash);addEventListener('resize',()=>{if(cur)setCur(IDS.indexOf(cur));if(cur==='education')jLine()});
document.addEventListener('visibilitychange',()=>{});
/* ---------- 14 · bridge for the Discovery Portal, audio, achievements and the companion ---------- */
window.JB={nav,openCV:()=>openCV(),openPhotos:(i,f)=>openPhotos(i,f),startTour,flip,setMode,modeOn,copyText,vcard,dlCV,toast,confetti,bloom,
  IDS,ROUTES,P,C,S,D,esc,pad,RM:()=>RM,get cur(){return cur},get started(){return started},
  openSkill(name){const sk=S.find(x=>x[0]===name);nav('skills');setTimeout(()=>{if(sk){skF=sk[1];skS=sk[0];if(inited.skills)skRender();document.dispatchEvent(new CustomEvent('jb:skill',{detail:{id:name}}))}},RM?80:1500)},
  openDirectory:o=>DIR.show(o||$('#dirBtn')),closeOverlays,get lbOpen(){return lbOpen},get tourOn(){return TOURON}};
document.dispatchEvent(new Event('jb:ready'));
runIntro();
})();
