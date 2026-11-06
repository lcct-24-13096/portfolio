/* THE LIVING CANVAS · part 2 — atmosphere, handwritten asides, cursor */
(()=>{'use strict';
const JB=window.JB,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],root=document.documentElement;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches,RM=()=>JB.RM();
/* aurora + grain */
const au=document.createElement('div');au.className='aurora';au.setAttribute('aria-hidden','true');au.innerHTML='<i></i><i></i><i></i>';document.body.prepend(au);
const gr=document.createElement('div');gr.className='grain';gr.setAttribute('aria-hidden','true');document.body.append(gr);
root.dataset.pg='home';document.addEventListener('jb:route',e=>{root.dataset.pg=e.detail.id});
/* handwritten asides next to each page title */
const NOTE={about:'get to know me ↓',education:'pick a milestone →',skills:'poke a node ✦',projects:'click the screens',certificates:'open a folder ↓',experience:'learning, in practice',contact:'say hi! ✦'};
$$('.pg').forEach(pg=>{const n=NOTE[pg.dataset.route],t=$('.pt',pg);if(!n||!t)return;const h=t.closest('.ph>div')||t.parentElement;h.style.position='relative';
  const s=document.createElement('span');s.className='note-h';s.setAttribute('aria-hidden','true');s.textContent=n;s.style.cssText='left:calc(100% + 18px);top:.1em;right:auto';h.append(s)});
/* cursor ring (mouse only) */
if(FINE){const r=document.createElement('div'),d=document.createElement('div');r.className='cur';r.innerHTML='<b></b>';d.className='cur-dot';r.setAttribute('aria-hidden','true');d.setAttribute('aria-hidden','true');document.body.append(r,d);
  let x=0,y=0,rx=0,ry=0,raf=0,on=false;
  addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;x=e.clientX;y=e.clientY;if(!on){on=true;r.classList.add('on');d.classList.add('on');root.classList.add('cursor-on');rx=x;ry=y}
    const t=e.target.closest&&e.target.closest('a,button,[role=button],[data-cursor],summary,input,select,textarea');const lab=t&&t.dataset&&t.dataset.cursor;
    r.classList.toggle('hot',!!t&&!lab);r.classList.toggle('lbl',!!lab);$('b',r).textContent=lab||'';
    d.style.transform=`translate(${x}px,${y}px)`;if(!raf)raf=requestAnimationFrame(loop)},{passive:true});
  document.addEventListener('mouseleave',()=>{r.classList.remove('on');d.classList.remove('on');on=false});
  function loop(){raf=0;rx+=(x-rx)*.22;ry+=(y-ry)*.22;r.style.transform=`translate(${rx}px,${ry}px)`;if(Math.abs(x-rx)+Math.abs(y-ry)>.3)raf=requestAnimationFrame(loop)}}
})();
