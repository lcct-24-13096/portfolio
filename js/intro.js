/* =====================================================================
   THE LIVING CANVAS · cinematic introduction — "ENTER JENA'S WORLD"
   Gate (wake the canvas + tune the sound line) → 1 first spark → 2 cartoon world → 3 name reveal → 4 real photograph (centre) → 5 welcome
   Skippable at any time (button or Esc). First visit only: returning visitors go straight in
   (localStorage "jbr-seen"); the intro can be replayed from the Discovery Portal or the sound panel.
   The photograph is the untouched original (images/profile.jpg) — only masked and framed.
   ===================================================================== */
window.Intro=(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement,el=$('#intro');
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||root.classList.contains('calm');
const PHOTO='images/profile.jpg';
let T=[],playing=false,ctx={},raf=0,fxStop=null,esc=null;
const at=(ms,fn)=>{T.push(setTimeout(fn,ms))};
const clear=()=>{T.forEach(clearTimeout);T=[]};
const A=()=>window.ART,J=()=>window.JA;
const snd=(n)=>{try{J().play(n)}catch(e){}};

function letters(txt,cls){return [...txt].map((c,i)=>c===' '?'<span class="sp"> </span>':`<span class="l ${cls||''}" style="--i:${i}"><i>${c}</i></span>`).join('')}

function build(){
  const S=A().pick;
  el.innerHTML=`
  <canvas class="ix-fx" id="ixFx" aria-hidden="true"></canvas><div class="ix-vig" aria-hidden="true"></div><i class="ix-grain" aria-hidden="true"></i><i class="ix-bar t" aria-hidden="true"></i><i class="ix-bar b" aria-hidden="true"></i><i class="ix-prog" aria-hidden="true"><b></b></i>
  <button class="ix-skip bt bt-s bt-o" id="ixSkip" type="button">Skip intro <kbd>Esc</kbd></button>

  <div class="sc ix-gate in" id="ixGate">
    <div class="ix-orb" aria-hidden="true"><i></i><i></i><i></i></div>
    <p class="ix-k">An interactive portfolio by Jena Benisse Redondo</p>
    <h2 class="ix-h"><span>ENTER</span><span class="o">JENA’S</span><span>WORLD</span></h2>
    <div class="ix-wake">
      <button class="ix-seed" id="ixSeed" type="button" aria-label="Wake the canvas and enter the portfolio">
        <svg viewBox="0 0 120 120" aria-hidden="true"><circle class="rt" cx="60" cy="60" r="54"/><circle class="rf" cx="60" cy="60" r="54" pathLength="1"/></svg>
        <span class="sd-core" aria-hidden="true"></span>
        <span class="sd-t"><b>WAKE</b><i>the canvas</i></span>
      </button>
      <button class="ix-tune" id="ixTune" type="button" role="switch" aria-checked="false" aria-label="Sound for the introduction and portfolio">
        <canvas id="ixWave" width="260" height="56" aria-hidden="true"></canvas>
        <span class="tl"><b>Sound</b><em id="ixTuneS">Off · tap the line to tune in</em></span>
      </button>
    </div>
    <p class="ix-n">Sound is off by default and only starts if you tune it in. Change it any time from the speaker button.</p>
  </div>

  <div class="sc ix-s1" id="ixS1" aria-hidden="true"><svg class="ix-trail" viewBox="0 0 1000 600" preserveAspectRatio="none"><path pathLength="1" d="M-20 540C180 380 330 580 520 310S820 110 1020 50"/><circle r="7" class="hd"/></svg><div class="ix-ring"><i></i><i></i><i></i></div><p class="ix-hand">hello, world…</p></div>

  <div class="sc ix-s2" id="ixS2" aria-hidden="true">
    <p class="ix-hand h2">meet the crew ✦</p><div class="ix-sprig" id="ixSprig">${A().sprig('happy')}<div class="ix-say" id="ixSay">Hi! I’m Sprig.</div></div>
    ${[['laptop','l1'],['bolt','l2'],['star','l3'],['db','l4'],['net','l5'],['cap','l6'],['rocket','l7'],['sprout','l8'],['bulb','l9'],['heart','l10']].map(([n,c],i)=>`<span class="ix-st ${c}" style="--k:${i}">${S(n)}</span>`).join('')}
    <span class="ix-st b1">${S('bubble','Hello!')}</span><span class="ix-st b2">${S('bubble','{ code }')}</span>
  </div>

  <div class="sc ix-s3" id="ixS3" aria-hidden="true">
    <div class="ix-nm"><p class="ix-hand h3">this is…</p><div class="ix-big">${letters('JENA')}</div><div class="ix-sub">${letters('BENISSE REDONDO','o')}</div><i class="ix-sweep"></i></div>
  </div>

  <div class="sc ix-s4" id="ixS4" aria-hidden="true">
    <i class="ix-rays" aria-hidden="true"></i><i class="ix-flash" aria-hidden="true"></i><div class="ix-bgw" aria-hidden="true">JENA</div><div class="ix-bgw2" aria-hidden="true">WORLD</div>
    <div class="ix-ph" id="ixPh">
      <svg class="ix-fr f1" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M10 0H100V110L90 125H0V15Z"/></svg>
      <svg class="ix-fr f2" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M10 0H100V110L90 125H0V15Z"/></svg>
      <svg class="ix-fr f3" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M10 0H100V110L90 125H0V15Z"/></svg>
      <div class="ix-win"><div class="ix-cart">${A().me()}</div><img class="ix-real" src="${PHOTO}" alt="Portrait of Jena Benisse Redondo" width="900" height="638" fetchpriority="high"><i class="ix-lt"></i></div><i class="ix-ink" aria-hidden="true"></i><span class="ix-hi" aria-hidden="true">${S('bubble','Hi, I’m Jena!')}</span><p class="ix-cap" aria-hidden="true"><span class="c1">this is the cartoon me…</span><span class="c2">…and this is the real me ✦</span></p>
      ${['star','laptop','bolt','db','net','cap'].map(n=>`<span class="ix-fly fx-${n}" data-fly="${n}">${S(n)}</span>`).join('')}
    </div>
    <div class="ix-wel" id="ixWel"><h2 class="ix-wh">${letters('WELCOME TO MY WORLD.')}</h2><div class="ix-slide ix-go" id="ixGo" role="button" tabindex="0" aria-label="Open the portfolio. Drag the knob to the right, or press Enter."><span class="sl-fill" aria-hidden="true"></span><span class="sl-t" aria-hidden="true">Slide to open</span><span class="sl-knob" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6l6 6-6 6"/><path d="M12 6l6 6-6 6" opacity=".55"/></svg></span></div>
    </div>
    <span class="ix-fly ix-spr" data-fly="sprig" aria-hidden="true">${A().sprig('wow')}</span>
  </div>`;
  gate();
  $('#ixSkip').onclick=()=>finish(true);slide();
  /* sprig blinks and the bubble talks */
}

/* ---------- the gate: wake the canvas + tune the sound line ---------- */
let waveStop=null,tuned=false;
function gate(){
  const seed=$('#ixSeed'),tune=$('#ixTune'),cv=$('#ixWave'),st=$('#ixTuneS');if(!seed||!tune||!cv)return;
  tuned=!!J().on||(J().prefs.c==='sound'&&J().supported);
  const paint=()=>{tune.setAttribute('aria-checked',tuned);tune.classList.toggle('on',tuned);st.textContent=tuned?(J().on?'On · tap the line to mute':'On · starts when you wake the canvas'):'Off · tap the line to tune in'};paint();
  tune.onclick=()=>{
    if(tuned){J().disable();tuned=false}
    else if(J().enable()){tuned=true;J().intensity(.3);snd('sparkle')}
    else{st.textContent='Sound is not supported in this browser';return}
    paint()};
  /* the line: flat and dim when silent, a living waveform when tuned in */
  const c=cv.getContext('2d'),W=cv.width,H=cv.height;let run=true,t0=performance.now(),lvl=0;
  (function f(now){if(!run)return;const t=(now-t0)/1000,rm=RM();
    let target=0;if(tuned){const b=J().bars(12);target=b.reduce((a,v)=>a+v,0)/12}
    lvl+=((tuned?Math.max(.22,Math.min(1,target*2.4)):0)-lvl)*.12;
    c.clearRect(0,0,W,H);c.lineWidth=2.5;c.lineCap='round';
    const g=c.createLinearGradient(0,0,W,0);g.addColorStop(0,'rgba(74,222,128,.15)');g.addColorStop(.5,tuned?'#86efac':'rgba(159,176,204,.55)');g.addColorStop(1,'rgba(163,230,53,.15)');c.strokeStyle=g;
    c.beginPath();for(let x=0;x<=W;x+=3){const e=Math.sin(Math.PI*x/W),y=H/2+Math.sin(x*.075+(rm?0:t*5))*lvl*H*.38*e+Math.sin(x*.19-(rm?0:t*7.5))*lvl*H*.12*e;x?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();
    /* the knob */
    const kx=tuned?W-18:18;c.fillStyle=tuned?'#22C55E':'#9fb0cc';c.shadowColor=tuned?'#22C55E':'transparent';c.shadowBlur=tuned?14:0;c.beginPath();c.arc(kx,H/2,6,0,6.283);c.fill();c.shadowBlur=0;
    requestAnimationFrame(f)})(t0);
  waveStop=()=>{run=false};
  /* wake: the ring draws itself, then the film begins (sound state was decided by the line) */
  let waking=false;
  seed.onclick=()=>{if(waking)return;waking=true;seed.classList.add('go');snd('whoosh');
    const k=RM()?.25:1;at(1050*k,()=>begin(tuned))};
}

/* ---------- the welcome control: slide the knob to open the portfolio (tap / Enter also works) ---------- */
function slide(){
  const tr=$('#ixGo');if(!tr)return;const kn=$('.sl-knob',tr),fl=$('.sl-fill',tr),tx=$('.sl-t',tr);
  let drag=false,x0=0,sx=0,p=0,moved=0,done=false,suppress=false;
  const max=()=>Math.max(1,tr.clientWidth-kn.offsetWidth-8);
  const set=(v,anim)=>{p=Math.max(0,Math.min(1,v));tr.classList.toggle('anim',!!anim);kn.style.transform='translateX('+(p*max())+'px)';fl.style.width=(p*max()+kn.offsetWidth+8)+'px';if(!done)tx.style.opacity=1-Math.min(1,p*1.7)};
  const complete=()=>{if(done)return;done=true;tr.classList.remove('drag');tr.classList.add('done');set(1,true);tx.textContent='Welcome';tx.style.opacity=1;snd('achieve');at(RM()?100:450,()=>finish(false))};
  tr.addEventListener('pointerdown',e=>{if(done)return;drag=true;moved=0;x0=e.clientX;sx=e.clientX-p*max();try{tr.setPointerCapture(e.pointerId)}catch(_){}tr.classList.add('drag');tr.classList.remove('anim')});
  tr.addEventListener('pointermove',e=>{if(!drag)return;moved=Math.max(moved,Math.abs(e.clientX-x0));set((e.clientX-sx)/max())});
  const up=()=>{if(!drag)return;drag=false;tr.classList.remove('drag');
    if(moved>6){suppress=true;setTimeout(()=>suppress=false,60);if(p>.85)complete();else{set(0,true);snd('tick')}}else set(p>.85?1:0,true)};
  tr.addEventListener('pointerup',up);tr.addEventListener('pointercancel',()=>{drag=false;tr.classList.remove('drag');set(0,true)});
  tr.addEventListener('click',()=>{if(suppress||done)return;complete()});
  tr.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();complete()}});
}

/* ---------- particles: emerald dust, stars, light trails ---------- */
function fx(){
  const cv=$('#ixFx');if(!cv)return()=>{};const c=cv.getContext('2d');let W,H,dpr=Math.min(2,devicePixelRatio||1),mx=0,my=0,tx=0,ty=0,run=true,burst=0;
  const rs=()=>{W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr};rs();addEventListener('resize',rs);
  const spr=document.createElement('canvas');spr.width=spr.height=64;const sc=spr.getContext('2d'),g=sc.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(134,239,172,.8)');g.addColorStop(1,'rgba(34,197,94,0)');sc.fillStyle=g;sc.fillRect(0,0,64,64);
  const N=innerWidth<700?55:110,P=[];
  const mk=(o)=>Object.assign({x:Math.random(),y:Math.random(),z:.2+Math.random()*.8,vx:(Math.random()-.5)*.00012,vy:-.00006-Math.random()*.00014,tw:Math.random()*6,star:Math.random()<.22,c:Math.random()<.3?'#a3e635':'#4ade80'},o||{});
  for(let i=0;i<N;i++)P.push(mk());
  const trails=[];let last=performance.now(),nt=0;
  const onm=e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5};addEventListener('pointermove',onm);
  function star(x,y,r,a){c.save();c.translate(x,y);c.globalAlpha=a;c.fillStyle='#d9ffe6';c.beginPath();for(let i=0;i<8;i++){const rr=i%2?r*.28:r;c.lineTo(Math.cos(i*Math.PI/4)*rr,Math.sin(i*Math.PI/4)*rr)}c.closePath();c.fill();c.restore()}
  function f(t){if(!run)return;const dt=Math.min(50,t-last);last=t;mx+=(tx-mx)*.05;my+=(ty-my)*.05;
    c.clearRect(0,0,W,H);c.globalCompositeOperation='lighter';
    P.forEach(p=>{p.x+=p.vx*dt*(1+burst*8);p.y+=p.vy*dt*(1+burst*8);p.tw+=dt*.003;if(p.y<-.05){p.y=1.05;p.x=Math.random()}if(p.x<-.05)p.x=1.05;if(p.x>1.05)p.x=-.05;
      const x=(p.x+mx*.05*p.z)*W,y=(p.y+my*.05*p.z)*H,s=(p.star?5:11)*p.z*dpr,a=.35+.4*Math.sin(p.tw);
      if(p.star)star(x,y,s*1.3,Math.max(.15,a));else{c.globalAlpha=Math.max(.12,a)*p.z;c.drawImage(spr,x-s,y-s,s*2,s*2)}});
    nt-=dt;if(nt<=0&&!RM()){nt=1500+Math.random()*1800;trails.push({x:Math.random()*1.2-.1,y:-.1,l:.0,a:.5+Math.random()*.35,v:.0009+Math.random()*.0006})}
    trails.forEach(tr=>{tr.l+=tr.v*dt;const x0=(tr.x+tr.l*-.55)*W,y0=(tr.y+tr.l*1.1)*H,x1=x0+.28*W*.55*.0+ (-.55*.12)*W,y1=y0+.12*H*1.1;
      const gr=c.createLinearGradient(x0,y0,x1,y1);gr.addColorStop(0,'rgba(163,230,53,0)');gr.addColorStop(1,'rgba(134,239,172,'+tr.a+')');c.globalAlpha=1;c.strokeStyle=gr;c.lineWidth=2*dpr;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke()});
    for(let i=trails.length-1;i>=0;i--)if(trails[i].l>1.3)trails.splice(i,1);
    burst*=.965;c.globalCompositeOperation='source-over';raf=requestAnimationFrame(f)}
  raf=requestAnimationFrame(f);
  const api={burst(){burst=1;for(let i=0;i<30;i++){P.push(mk({x:.5+(Math.random()-.5)*.04,y:.5+(Math.random()-.5)*.04,vx:(Math.random()-.5)*.0016,vy:(Math.random()-.5)*.0016,z:.6+Math.random()*.6}))}while(P.length>N+40)P.splice(N,1)}};
  fxApi=api;return()=>{run=false;cancelAnimationFrame(raf);removeEventListener('resize',rs);removeEventListener('pointermove',onm);fxApi=null}}
let fxApi=null;

/* ---------- the sequence ---------- */
const sc=n=>$('#ixS'+n);
const show=n=>{const s=typeof n==='string'?$(n):sc(n);s.classList.add('in');s.setAttribute('aria-hidden','false')};
const hide=n=>{const s=typeof n==='string'?$(n):sc(n);s.classList.remove('in');s.classList.add('gone');setTimeout(()=>s.classList.remove('gone'),900);s.setAttribute('aria-hidden','true')};
const say=(t)=>{const b=$('#ixSay');if(!b)return;b.classList.remove('talk');void b.offsetWidth;b.textContent=t;b.classList.add('talk')};

function begin(withSound){
  if(withSound){if(!J().on)J().enable();J().intensity(.3)}else{if(J().on)J().disable();J().chooseSilent()}
  waveStop&&waveStop();waveStop=null;
  $('#ixGate').classList.remove('in');$('#ixGate').classList.add('gone');
  el.classList.add('run','bars');const rm=RM(),k=rm?.35:1;
  const pb=$('.ix-prog b');if(pb){pb.style.transition='transform '+(15.6*k)+'s linear';requestAnimationFrame(()=>pb.style.transform='scaleX(1)')}
  /* Scene 1 — the first spark */
  at(0,()=>{show(1);snd('whoosh');fxApi&&fxApi.burst()});
  at(1500*k,()=>snd('sparkle'));
  /* Scene 2 — the cartoon world */
  at(2700*k,()=>{hide(1);show(2);snd('swoosh');J().intensity(.55)});
  at(3300*k,()=>snd('pop'));at(3800*k,()=>{say('Welcome to Jena’s world!');snd('pop')});at(4500*k,()=>{$('#ixSprig').classList.add('hop');snd('pop')});
  at(5400*k,()=>{say('Ready to meet her?');snd('sparkle')});
  /* Scene 3 — the name */
  at(6700*k,()=>{hide(2);show(3);snd('whoosh');J().intensity(.8)});
  at(7500*k,()=>{snd('impact');$('#ixS3').classList.add('hit');fxApi&&fxApi.burst()});
  /* Scene 4 — the real photograph, centred */
  at(10100*k,()=>{hide(3);show(4);snd('whoosh')});
  at(10900*k,()=>{snd('sparkle');$('#ixS4').classList.add('cart-on')});
  at(12100*k,()=>snd('riser'));
  at(13000*k,()=>{snd('reveal');snd('impact');$('#ixS4').classList.add('real','lit');fxApi&&fxApi.burst()});
  at(14300*k,()=>snd('sparkle'));
  /* Scene 5 — welcome */
  at(15200*k,()=>{el.classList.remove('bars');$('#ixS4').classList.add('welcome');snd('achieve');J().intensity(.5);const g=$('#ixGo');g.focus({preventScroll:true})});
}

/* hand the cartoon objects over to the homepage */
function fly(done){
  const home=$('#pg-home');const keys=$$('.ix-fly[data-fly]');if(!home||RM()||!keys.length){done();return}
  const layer=document.createElement('div');layer.className='ix-flylayer';document.body.append(layer);let n=0;
  keys.forEach((k,i)=>{const key=k.dataset.fly,t=key==='sprig'?$('#sprigDock .sd-s'):$(`#pg-home .hs[data-fly="${key}"]`);if(!t||!t.offsetWidth)return;
    const a=k.getBoundingClientRect(),b=t.getBoundingClientRect();if(!a.width||!b.width)return;
    const c=k.cloneNode(true);c.className='ix-fl';Object.assign(c.style,{left:a.left+'px',top:a.top+'px',width:a.width+'px',height:a.height+'px'});layer.append(c);k.style.visibility='hidden';n++;
    const dx=b.left+b.width/2-(a.left+a.width/2),dy=b.top+b.height/2-(a.top+a.height/2),s=b.width/a.width;
    const an=c.animate([{transform:'translate(0,0) scale(1) rotate(0)'},{transform:`translate(${dx*.5}px,${dy*.5-60}px) scale(${(1+s)/2+.15}) rotate(${i%2?-14:14}deg)`,offset:.5},{transform:`translate(${dx}px,${dy}px) scale(${s}) rotate(0)`}],{duration:1150,delay:i*70,easing:'cubic-bezier(.65,0,.25,1)',fill:'forwards'});
    an.onfinish=()=>{(key==='sprig'?$('#sprigDock'):t).classList.add('landed');c.remove();if(--n<=0)layer.remove()}});
  if(!n){layer.remove();done();return}
  setTimeout(done,1000)}

function finish(skipped){
  if(!playing)return;playing=false;clear();document.removeEventListener('keydown',esc);
  const wasFirst=ctx.first;try{localStorage.setItem('jbr-seen','1')}catch(e){}
  const cb=ctx.start||(()=>{});
  if(skipped){el.classList.add('out');cb();root.classList.remove('fly-wait');setTimeout(close,900);return}
  /* explore: reveal the home page behind, fly the stickers, wipe the intro away */
  snd('swoosh');root.classList.add('fly-wait');cb();
  setTimeout(()=>{el.classList.add('wipe');fly(()=>{root.classList.remove('fly-wait');el.classList.add('out');setTimeout(close,850)})},wasFirst?560:260)}
function close(){document.removeEventListener('pointermove',ctx.mv);fxStop&&fxStop();fxStop=null;el.hidden=true;el.classList.remove('run','out','wipe');root.classList.remove('intro-on','fly-wait');el.innerHTML='';
  document.dispatchEvent(new CustomEvent('intro:done'))}

/* opts: {first:boolean, start:fn, quickGate:boolean} */
function play(opts){
  if(playing)return;opts=opts||{};playing=true;ctx=opts;
  root.classList.add('intro-on');el.hidden=false;el.classList.remove('out','wipe','run');build();fxStop=fx();
  const mv=e=>{el.style.setProperty('--px',(e.clientX/innerWidth-.5).toFixed(3));el.style.setProperty('--py',(e.clientY/innerHeight-.5).toFixed(3))};document.addEventListener('pointermove',mv);ctx.mv=mv;
  esc=e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();finish(true)}};document.addEventListener('keydown',esc,true);
  /* replay while sound is already on: no need for the gate */
  if(opts.replay){const on=J().on;begin(on)}
  else setTimeout(()=>{const b=$('#ixSeed');b&&b.focus({preventScroll:true})},60)}

return {play,get playing(){return playing},seen(){try{return localStorage.getItem('jbr-seen')==='1'}catch(e){return false}},
  run(startApp){play({first:true,start:startApp})},replay(){if(playing)return;play({first:false,replay:true,start:()=>{}})}};
})();
