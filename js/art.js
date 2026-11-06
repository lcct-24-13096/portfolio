/* =====================================================================
   THE LIVING CANVAS · original cartoon art (inline SVG, no image files)
   - Sprig: the portfolio companion (a sprout-headed code buddy). NOT a likeness of Jena.
   - Stickers: floating doodles with a white "sticker" outline.
   If you add your own cartoon pictures, list them in PF.CARTOONS (js/data.js);
   they are used first wherever a sticker is needed. Your real photos are never redrawn.
   ===================================================================== */
window.ART=(function(){
const G='#22C55E',L='#a3e635',M='#bbf7d0',N='#081226',W='#f4fbf7',D='#15803d';
const o='stroke="#fff" stroke-width="7" stroke-linejoin="round" paint-order="stroke"';  /* sticker outline */
const svg=(vb,b,cls)=>`<svg class="stk ${cls||''}" viewBox="${vb}" aria-hidden="true" focusable="false">${b}</svg>`;

const S={
 star:()=>svg('0 0 100 100',`<path ${o} fill="${L}" d="M50 8l12 27 29 3-22 20 7 29-26-15-26 15 7-29L9 38l29-3z"/><circle cx="43" cy="44" r="3" fill="${N}"/><circle cx="58" cy="44" r="3" fill="${N}"/><path d="M45 54q6 6 11 0" fill="none" stroke="${N}" stroke-width="3" stroke-linecap="round"/>`),
 spark:()=>svg('0 0 100 100',`<path ${o} fill="${M}" d="M50 4c4 26 20 42 46 46-26 4-42 20-46 46-4-26-20-42-46-46 26-4 42-20 46-46z"/>`),
 laptop:()=>svg('0 0 120 100',`<rect ${o} x="20" y="14" width="80" height="54" rx="7" fill="${N}"/><rect x="26" y="20" width="68" height="42" rx="3" fill="${G}"/><path d="M38 34l-8 7 8 7M82 34l8 7-8 7M66 30l-12 22" fill="none" stroke="${N}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path ${o} d="M8 74h104l-9 13H17z" fill="${M}"/>`),
 bolt:()=>svg('0 0 80 100',`<path ${o} fill="${L}" d="M46 4L10 56h26l-8 40 42-56H44z"/>`),
 bubble:(t)=>svg('0 0 140 90',`<path ${o} fill="${W}" d="M16 8h108a10 10 0 0110 10v38a10 10 0 01-10 10H62L40 84V66H16A10 10 0 016 56V18A10 10 0 0116 8z"/><text x="70" y="42" text-anchor="middle" font-family="Caveat,'Comic Sans MS',cursive" font-weight="700" font-size="26" fill="${N}">${t||'Hi!'}</text>`,'bub'),
 code:()=>svg('0 0 120 80',`<rect ${o} x="6" y="8" width="108" height="64" rx="12" fill="${N}"/><path d="M44 28L28 40l16 12M76 28l16 12-16 12" fill="none" stroke="${L}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M66 24L54 56" stroke="${G}" stroke-width="6" stroke-linecap="round"/>`),
 db:()=>svg('0 0 90 100',`<path ${o} fill="${G}" d="M10 22v56c0 9 15 16 35 16s35-7 35-16V22z"/><ellipse ${o} cx="45" cy="22" rx="35" ry="14" fill="${M}"/><path d="M10 44c0 9 15 16 35 16s35-7 35-16M10 62c0 9 15 16 35 16s35-7 35-16" fill="none" stroke="${D}" stroke-width="3"/>`),
 net:()=>svg('0 0 110 100',`<path d="M55 22L22 74M55 22l33 52M22 74h66" stroke="${N}" stroke-width="5" stroke-linecap="round"/><circle ${o} cx="55" cy="22" r="14" fill="${G}"/><circle ${o} cx="22" cy="74" r="14" fill="${L}"/><circle ${o} cx="88" cy="74" r="14" fill="${M}"/>`),
 cap:()=>svg('0 0 120 90',`<path ${o} fill="${N}" d="M60 8L6 34l54 26 54-26z"/><path ${o} fill="${G}" d="M28 50v18c0 8 14 14 32 14s32-6 32-14V50L60 64z"/><path d="M108 38v30" stroke="${L}" stroke-width="5" stroke-linecap="round"/><circle cx="108" cy="72" r="6" fill="${L}"/>`),
 ribbon:()=>svg('0 0 90 110',`<path ${o} fill="${D}" d="M24 60l-12 44 22-10 10 14 8-48zM66 60l12 44-22-10-10 14-8-48z"/><circle ${o} cx="45" cy="40" r="32" fill="${L}"/><circle cx="45" cy="40" r="21" fill="none" stroke="${N}" stroke-width="3" stroke-dasharray="3 5"/><path d="M36 41l7 7 12-14" fill="none" stroke="${N}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`),
 bulb:()=>svg('0 0 80 110',`<path ${o} fill="${L}" d="M40 6C22 6 10 19 10 36c0 12 7 19 13 27 3 4 4 8 4 12h26c0-4 1-8 4-12 6-8 13-15 13-27C70 19 58 6 40 6z"/><path ${o} fill="${N}" d="M28 82h24v10a12 12 0 01-24 0z"/><path d="M32 52l8-14 8 14" fill="none" stroke="${N}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`),
 rocket:()=>svg('0 0 80 120',`<path ${o} fill="${W}" d="M40 4c16 14 22 34 20 62H20C18 38 24 18 40 4z"/><circle cx="40" cy="38" r="9" fill="${G}" stroke="${N}" stroke-width="4"/><path ${o} fill="${G}" d="M20 56L4 84l18-6zM60 56l16 28-18-6z"/><path ${o} fill="${L}" d="M28 70h24l-12 40z"/>`),
 heart:()=>svg('0 0 100 90',`<path ${o} fill="${G}" d="M50 84C14 58 6 38 8 26 10 12 24 6 36 10c7 2 11 7 14 12 3-5 7-10 14-12 12-4 26 2 28 16 2 12-6 32-42 58z"/>`),
 sprout:()=>svg('0 0 90 110',`<path d="M45 104V54" stroke="${D}" stroke-width="7" stroke-linecap="round"/><path ${o} fill="${G}" d="M45 58C20 62 8 46 8 20c26-2 40 10 37 38z"/><path ${o} fill="${L}" d="M45 50C48 24 62 10 84 12c2 26-12 42-39 38z"/>`),
 mag:()=>svg('0 0 100 100',`<circle ${o} cx="42" cy="42" r="28" fill="${M}"/><path ${o} d="M64 64l26 26" stroke="${N}" stroke-width="12" stroke-linecap="round"/><path d="M28 36a16 16 0 0114-10" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`),
 key:()=>svg('0 0 110 70',`<circle ${o} cx="26" cy="35" r="20" fill="${L}"/><circle cx="26" cy="35" r="7" fill="${N}"/><path ${o} d="M44 35h56M82 35v14M96 35v10" stroke="${L}" stroke-width="10" stroke-linecap="round"/>`),
 arrow:()=>svg('0 0 140 70',`<path d="M6 52C34 8 84 6 128 36M128 36l-26-2M128 36l-10 24" fill="none" stroke="${G}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,'plain'),
 squig:()=>svg('0 0 140 30',`<path d="M4 18c12-16 22 16 34 0s22 16 34 0 22 16 34 0 22 16 30 0" fill="none" stroke="${L}" stroke-width="5" stroke-linecap="round"/>`,'plain')
};

/* ---------- Sprig, the companion ---------- */
function sprig(mood){
 return `<svg class="sprig m-${mood||'happy'}" viewBox="0 0 160 190" aria-hidden="true" focusable="false">
 <g class="sp-body">
  <ellipse cx="80" cy="180" rx="38" ry="6" fill="rgba(0,0,0,.22)"/>
  <g class="sp-leaf"><path d="M80 44C78 22 64 8 42 8c-2 22 10 38 38 36z" fill="${G}" stroke="${N}" stroke-width="4" stroke-linejoin="round"/><path d="M80 44C84 20 100 8 122 12c0 22-14 36-42 32z" fill="${L}" stroke="${N}" stroke-width="4" stroke-linejoin="round"/></g>
  <path d="M30 108c0-36 22-62 50-62s50 26 50 62c0 36-20 66-50 66s-50-30-50-66z" fill="${M}" stroke="${N}" stroke-width="5"/>
  <path d="M44 128c8 24 24 36 38 36" fill="none" stroke="#86efac" stroke-width="8" stroke-linecap="round" opacity=".7"/>
  <g class="sp-eyes"><circle cx="58" cy="100" r="17" fill="#fff" stroke="${N}" stroke-width="4"/><circle cx="102" cy="100" r="17" fill="#fff" stroke="${N}" stroke-width="4"/><path d="M75 100h10" stroke="${N}" stroke-width="4"/>
   <g class="sp-pupils"><circle cx="60" cy="102" r="6" fill="${N}"/><circle cx="100" cy="102" r="6" fill="${N}"/><circle cx="62" cy="99" r="2" fill="#fff"/><circle cx="102" cy="99" r="2" fill="#fff"/></g></g>
  <path class="sp-m sp-m1" d="M62 130q18 20 36 0" fill="#fff" stroke="${N}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse class="sp-m sp-m2" cx="80" cy="136" rx="10" ry="12" fill="${N}"/>
  <circle cx="42" cy="124" r="7" fill="#4ade80" opacity=".55"/><circle cx="118" cy="124" r="7" fill="#4ade80" opacity=".55"/>
  <path class="sp-arm sp-al" d="M32 112q-18 6-22 28" fill="none" stroke="${N}" stroke-width="5" stroke-linecap="round"/>
  <path class="sp-arm sp-ar" d="M128 112q18 6 22 28" fill="none" stroke="${N}" stroke-width="5" stroke-linecap="round"/>
 </g></svg>`}


/* ---------- cartoon portrait of Jena (original illustration; the real photo is never altered) ---------- */
function cartoon(){const K='#0b1020',SK='#f2bd9c',SH='#e3a483',HR='#15110f';
 return `<svg class="cart" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
 <defs><linearGradient id="cbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9ffe6"/><stop offset="1" stop-color="#86efac"/></linearGradient></defs>
 <rect width="400" height="500" fill="url(#cbg)"/><circle cx="330" cy="70" r="46" fill="#a3e635" opacity=".55"/><circle cx="60" cy="400" r="70" fill="#22C55E" opacity=".25"/>
 <path d="M104 215C96 96 152 44 200 44s104 52 96 171l8 215H96z" fill="${HR}" stroke="${K}" stroke-width="5" stroke-linejoin="round"/>
 <path d="M40 505l22-96q60-56 138-58 78 2 138 58l22 96z" fill="#12151f" stroke="${K}" stroke-width="5" stroke-linejoin="round"/>
 <path d="M172 352l28 86 28-86-14-12-14 44-14-44z" fill="#fff" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
 <path d="M160 350l-40 70M240 350l40 70" stroke="#2a3040" stroke-width="5" stroke-linecap="round"/>
 <rect x="176" y="296" width="48" height="62" rx="18" fill="${SH}" stroke="${K}" stroke-width="5"/>
 <ellipse cx="200" cy="228" rx="82" ry="98" fill="${SK}" stroke="${K}" stroke-width="5"/>
 <circle cx="119" cy="262" r="7" fill="#fff" stroke="${K}" stroke-width="3"/><circle cx="281" cy="262" r="7" fill="#fff" stroke="${K}" stroke-width="3"/>
 <path d="M200 62C132 70 112 160 114 270l20 70 14-100c0-72 26-118 52-130z" fill="${HR}" stroke="${K}" stroke-width="5" stroke-linejoin="round"/>
 <path d="M200 62c68 8 88 98 86 208l-20 70-14-100c0-72-26-118-52-130z" fill="${HR}" stroke="${K}" stroke-width="5" stroke-linejoin="round"/>
 <path d="M150 120c10-26 28-40 50-44" fill="none" stroke="#3a3430" stroke-width="5" stroke-linecap="round" opacity=".6"/>
 <path d="M150 196q16-12 32-2M218 194q16-10 32 2" fill="none" stroke="${HR}" stroke-width="6" stroke-linecap="round"/>
 <g class="c-eyes"><ellipse cx="166" cy="226" rx="17" ry="15" fill="#fff" stroke="${K}" stroke-width="4"/><ellipse cx="234" cy="226" rx="17" ry="15" fill="#fff" stroke="${K}" stroke-width="4"/>
 <circle cx="168" cy="228" r="9" fill="#4a2a1a"/><circle cx="236" cy="228" r="9" fill="#4a2a1a"/><circle cx="168" cy="228" r="4.5" fill="${K}"/><circle cx="236" cy="228" r="4.5" fill="${K}"/><circle cx="172" cy="223" r="3" fill="#fff"/><circle cx="240" cy="223" r="3" fill="#fff"/>
 <path d="M147 216q8-9 20-9M253 216q-8-9-20-9" fill="none" stroke="${K}" stroke-width="5" stroke-linecap="round"/></g>
 <path d="M196 252q4 10 10 4" fill="none" stroke="#b9775c" stroke-width="4" stroke-linecap="round"/>
 <ellipse cx="150" cy="262" rx="15" ry="9" fill="#ff8f8f" opacity=".45"/><ellipse cx="250" cy="262" rx="15" ry="9" fill="#ff8f8f" opacity=".45"/>
 <path d="M160 280q40 44 80 0q-40 12-80 0z" fill="#fff" stroke="${K}" stroke-width="4.5" stroke-linejoin="round"/><path d="M166 285q34 12 68 0" fill="none" stroke="#d98a8a" stroke-width="5" stroke-linecap="round"/>
 </svg>`}

/* pick a sticker: user's own cartoon image first, else the original SVG */
function pick(name,arg){const own=(window.PF&&PF.CARTOONS||[]).find(c=>c.name===name);
 if(own)return `<img class="stk" src="${own.u}" alt="" aria-hidden="true" loading="lazy">`;return S[name]?S[name](arg):''}

function me(){const own=(window.PF&&PF.CARTOONS||[]).find(c=>c.name==='me');return own?`<img class="cart" src="${own.u}" alt="" aria-hidden="true">`:cartoon()}
return {S,sprig,pick,me,cartoon,colors:{G,L,M,N,W,D}};
})();
