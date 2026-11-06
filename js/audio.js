/* =====================================================================
   THE LIVING CANVAS · sound design
   Every sound is synthesized live with the Web Audio API (no audio files, no licensing
   issues, nothing to download). Audio never starts until the visitor tunes the sound line
   in the introduction (or turns it on from the speaker panel). Preferences persist in localStorage (jbr-audio).
   ===================================================================== */
window.JA=(function(){
const KEY='jbr-audio';let P={m:1,s:1,v:.7,x:0,c:''};
try{Object.assign(P,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}};
const AC=window.AudioContext||window.webkitAudioContext;
let ctx,master,mus,sfx,send,rev,an,noise,on=false,running=false,tm=0,nextT=0,stp=0,inten=.35;
const last={};

function build(){
  if(ctx)return true;if(!AC)return false;
  try{ctx=new AC()}catch(e){return false}
  master=ctx.createGain();mus=ctx.createGain();sfx=ctx.createGain();send=ctx.createGain();rev=ctx.createConvolver();an=ctx.createAnalyser();
  an.fftSize=128;an.smoothingTimeConstant=.8;
  const n=ctx.sampleRate*2.4,b=ctx.createBuffer(2,n,ctx.sampleRate);
  for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2.6)}
  rev.buffer=b;send.gain.value=.34;
  mus.connect(master);sfx.connect(master);mus.connect(send);sfx.connect(send);send.connect(rev);rev.connect(master);
  master.connect(an);an.connect(ctx.destination);
  const nb=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;noise=nb;
  gains();return true}
function gains(){if(!ctx)return;const t=ctx.currentTime;
  master.gain.setTargetAtTime(on&&!P.x?Math.pow(P.v,1.6):0,t,.05);
  mus.gain.setTargetAtTime(P.m?.5:0,t,.2);sfx.gain.setTargetAtTime(P.s?.95:0,t,.05)}

/* ---------- synthesis helpers ---------- */
function env(g,t,a,d,pk){g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(pk,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+d)}
function osc(type,f,t,dur,pk,dest,a,f2){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+dur);o.connect(g);g.connect(dest);env(g,t,a||.01,dur,pk);o.start(t);o.stop(t+(a||.01)+dur+.08);return o}
function nz(t,dur,f0,f1,pk,q,dest,type){const s=ctx.createBufferSource();s.buffer=noise;s.loop=true;const f=ctx.createBiquadFilter();f.type=type||'bandpass';f.Q.value=q;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+dur);const g=ctx.createGain();s.connect(f);f.connect(g);g.connect(dest);env(g,t,dur*.45,dur*.55,pk);s.start(t);s.stop(t+dur+.1)}

const FX={
  whoosh(t){nz(t,1.05,260,5400,.55,1.1,sfx);osc('sine',180,t,.9,.05,sfx,.5,520)},
  swoosh(t){nz(t,.42,900,4200,.3,2,sfx)},
  impact(t){osc('sine',120,t,1.1,.9,sfx,.005,32);nz(t,.5,1800,90,.6,.7,sfx,'lowpass');osc('triangle',55,t,1.4,.35,sfx,.01,40)},
  sparkle(t){[1318.5,1568,1976,2349.3,2637,3136].forEach((f,i)=>osc('sine',f,t+i*.055,.55,.1,sfx,.005))},
  reveal(t){[220,261.6,329.6,440,659.3].forEach((f,i)=>{osc('triangle',f,t+i*.04,2.2,.1,sfx,.7);osc('sine',f*2,t+.3+i*.04,1.6,.035,sfx,.6)})},
  click(t){osc('sine',880,t,.09,.12,sfx,.003,1320);osc('sine',1760,t+.02,.05,.04,sfx,.002)},
  pop(t){osc('sine',280,t,.14,.2,sfx,.004,760)},
  tick(t){osc('sine',1500,t,.04,.035,sfx,.002)},
  achieve(t){[783.99,1046.5,1568].forEach((f,i)=>{osc('triangle',f,t+i*.1,.55,.13,sfx,.008);osc('sine',f*2,t+i*.1,.4,.03,sfx,.008)})},
  riser(t){nz(t,1.15,180,7000,.5,2.4,sfx);osc('sawtooth',90,t,1.1,.07,sfx,.9,1100);osc('sine',220,t,1.1,.1,sfx,.9,1760)},
  page(t){nz(t,.5,500,2600,.32,1.4,sfx);osc('sine',140,t,.35,.18,sfx,.01,70)}
};
function play(name){if(!on||!ctx||P.x||!P.s||ctx.state!=='running'||!FX[name])return;
  const n=performance.now();if(last[name]&&n-last[name]<70)return;last[name]=n;FX[name](ctx.currentTime+.01)}

/* ---------- generative cinematic score: Am · F · C · G ---------- */
const BPM=76,E=60/BPM/2;
const CH=[{r:55,n:[220,261.63,329.63]},{r:43.65,n:[174.61,220,261.63]},{r:65.41,n:[261.63,329.63,392]},{r:49,n:[196,246.94,293.66]}];
const ARP=[0,2,1,2,0,2,1,2];
function stepAt(t,i){
  const bar=Math.floor(i/8)%4,s=i%8,c=CH[bar];
  if(s===0){
    const d=E*8;
    osc('sine',c.r,t,d,.34,mus,.05);osc('sine',c.r*2,t,d*.8,.06,mus,.1);
    c.n.forEach(f=>[-7,7].forEach(dt=>{const o=ctx.createOscillator(),g=ctx.createGain(),lp=ctx.createBiquadFilter();o.type='sawtooth';o.frequency.value=f;o.detune.value=dt;lp.type='lowpass';lp.frequency.value=760;g.gain.value=.0001;o.connect(lp);lp.connect(g);g.connect(mus);
      g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.034,t+1.3);g.gain.linearRampToValueAtTime(.0001,t+d);o.start(t);o.stop(t+d+.1)}));
  }
  const a=inten;
  if(a>.05){const f=c.n[ARP[s]]*2;osc('triangle',f,t,.5,.1*a,mus,.006);if(s%4===2)osc('sine',f*2,t,.9,.04*a,mus,.01)}
  if(s===0&&bar%2===0&&a>.5)osc('sine',c.n[2]*4,t+E,1.6,.03,mus,.02);
  if(s%2===0&&a>.7)osc('sine',58,t,.18,.14,mus,.004,40);
}
function sched(){if(!ctx)return;while(nextT<ctx.currentTime+.3){stepAt(nextT,stp);nextT+=E;stp++}}
function musicStart(){if(!on||!ctx||running)return;running=true;nextT=ctx.currentTime+.08;stp=0;sched();tm=setInterval(sched,70)}
function musicStop(){running=false;clearInterval(tm)}

/* ---------- public API ---------- */
const api={
  get on(){return on},get prefs(){return P},get analyser(){return an},get supported(){return !!AC},
  enable(){if(!build())return false;on=true;P.c='sound';save();ctx.resume&&ctx.resume();gains();if(P.m)musicStart();fire();return true},
  disable(){on=false;P.c='silent';save();musicStop();gains();fire()},
  chooseSilent(){P.c='silent';save();fire()},
  play,
  intensity(v){inten=v},
  setMusic(b){P.m=b?1:0;save();gains();if(b&&on)musicStart();fire()},
  setSfx(b){P.s=b?1:0;save();gains();fire()},
  setVol(v){P.v=Math.max(0,Math.min(1,v));save();gains();fire()},
  setMute(b){P.x=b?1:0;save();gains();fire()},
  /* bars for the visualizer, 0..1 */
  bars(n){const out=new Array(n).fill(0);if(!an||!on||P.x)return out;const d=new Uint8Array(an.frequencyBinCount);an.getByteFrequencyData(d);const k=Math.floor(d.length*.75/n);for(let i=0;i<n;i++){let s=0;for(let j=0;j<k;j++)s+=d[i*k+j];out[i]=s/k/255}return out},
  viz(cv){if(!cv)return()=>{};const c=cv.getContext('2d');let raf=0,stop=false;
    (function f(){if(stop)return;const w=cv.width,h=cv.height,N=24,b=api.bars(N),st=getComputedStyle(document.documentElement);c.clearRect(0,0,w,h);
      const bw=w/N;for(let i=0;i<N;i++){const v=Math.max(.06,b[i]),bh=v*h*.95;c.fillStyle=i%3?'#22C55E':'#a3e635';c.globalAlpha=on&&!P.x?.95:.35;c.fillRect(i*bw+2,h-bh,bw-4,bh)}
      raf=requestAnimationFrame(f)})();return()=>{stop=true;cancelAnimationFrame(raf)}}
};
function fire(){document.dispatchEvent(new CustomEvent('ja:change',{detail:{on,P}}))}
document.addEventListener('visibilitychange',()=>{if(!ctx||!on)return;if(document.hidden)ctx.suspend&&ctx.suspend();else ctx.resume&&ctx.resume()});
return api})();
