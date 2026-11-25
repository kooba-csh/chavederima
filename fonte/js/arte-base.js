/* =====================================================================
   Chave de Rima · arte-base.js
   Utilitários, muros (fundos), fumaça, papel rasgado, pinceladas e o
   motor de letras de grafite (throw-up, wildstyle, bloco 3D, pincel, tag).
   Tudo é desenhado em Canvas 2D, sem imagens prontas.
   ===================================================================== */

/* ---------- fontes ---------- */
const FONTES={
  bubble:'"Titan One","Bowlby One",sans-serif',
  wild:'"Sedgwick Ave Display","Permanent Marker",cursive',
  block:'Bungee,"Bowlby One",sans-serif',
  brush:'Knewave,"Permanent Marker",cursive',
  tag:'"Permanent Marker",cursive',
  cond:'Anton,"Archivo Black",Impact,sans-serif',
  corpo:'Archivo,"Archivo Black",sans-serif',
  mao:'"Permanent Marker",cursive',
  selo:'"Bowlby One","Archivo Black",sans-serif'
};
async function fontsReady(){
  const f=['60px "Sedgwick Ave Display"','60px "Permanent Marker"','60px "Titan One"','60px Bungee','60px "Bowlby One"','60px Knewave','60px Anton','800 40px Archivo','600 40px Archivo','900 40px Archivo'];
  try{await Promise.all(f.map(x=>document.fonts.load(x,'AÃÇ&ab0').catch(()=>{})))}catch(e){}
}

/* ---------- cores e números ---------- */
const rng=seed=>()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const hx=h=>{h=String(h).replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');const n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255]};
const rgba=(h,a)=>{const[r,g,b]=hx(h);return`rgba(${r},${g},${b},${a})`};
const mix=(a,b,t)=>{const X=hx(a),Y=hx(b);return'#'+X.map((v,i)=>Math.round(v+(Y[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const shade=(h,d)=>'#'+hx(h).map(v=>Math.max(0,Math.min(255,Math.round(v+d))).toString(16).padStart(2,'0')).join('');
const lum=h=>{const[r,g,b]=hx(h).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b};
const textoSobre=bg=>lum(bg)>.33?'#111114':'#ffffff';
/* "$f1", "$acc", "$fog0"… viram cores da paleta; hex passa direto */
function cor(v,p){if(!v)return'#ffffff';if(v[0]!=='$')return v;const k=v.slice(1);if(k.startsWith('fog'))return p.fog[+k.slice(3)||0];return p[k]||'#ffffff'}
/* cor viva da paleta pra destaque de campeão (contraste com o fundo escuro) */
function corCampeao(p){const c=[p.f2,p.acc,p.f1].find(x=>lum(x)>.12&&lum(x)<.75);return c||p.acc}
function corAmarela(p){const c=[p.acc,p.f1,'#ffd21f'].find(x=>{const[r,g,b]=hx(x);return r>180&&g>150&&b<140});return c||'#ffd21f'}

function rr(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function fit(c,t,w){t=String(t);if(c.measureText(t).width<=w)return t;while(t.length>1&&c.measureText(t+'…').width>w)t=t.slice(0,-1);return t+'…'}
/* maior tamanho de fonte que cabe em w×h (uma linha) */
function tamanhoQueCabe(c,t,fonte,w,h,max){let s=Math.min(max||h,h);c.font=fonte(s);const m=c.measureText(t).width;if(m>w)s=s*w/m;return Math.max(8,s)}
function wrap(c,t,w,max){const ws=String(t).split(/\s+/),out=[];let cur='';for(const x of ws){const tt=cur?cur+' '+x:x;if(c.measureText(tt).width>w&&cur){out.push(cur);cur=x}else cur=tt}if(cur)out.push(cur);
  if(out.length>max){out.length=max;out[max-1]=fit(c,out[max-1]+'…',w)}return out.map(l=>fit(c,l,w))}
function txtContorno(c,t,x,y,col,lw,out){c.lineJoin='round';c.miterLimit=2;c.lineWidth=lw;c.strokeStyle=out;c.strokeText(t,x,y);c.fillStyle=col;c.fillText(t,x,y)}

/* ===================== MUROS ===================== */
function ruido(c,W,H,r,a){const o=document.createElement('canvas');o.width=o.height=180;const x=o.getContext('2d'),d=x.createImageData(180,180);for(let i=0;i<d.data.length;i+=4){const v=r()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=a||34}x.putImageData(d,0,0);c.fillStyle=c.createPattern(o,'repeat');c.fillRect(0,0,W,H)}
function bgTijolo(c,W,H,r,p){const base=mix(p.bg,['#8a4433','#6b5246','#5b5f66','#7a6a55'][r()*4|0],.6);c.fillStyle=shade(base,-45);c.fillRect(0,0,W,H);
  const bh=Math.round(H/(18+r()*8)),bw=bh*2.2;for(let y=0,row=0;y<H;y+=bh,row++){const off=row%2?bw/2:0;for(let x=-off;x<W;x+=bw){c.fillStyle=shade(base,(r()-.5)*40);c.fillRect(x+3,y+3,bw-6,bh-6);if(r()<.3){c.fillStyle='rgba(0,0,0,.14)';c.fillRect(x+3,y+bh*.55,bw-6,bh*.45-3)}}}}
function bgConcreto(c,W,H,r,p){c.fillStyle=mix(p.bg,'#7a7a7e',.45);c.fillRect(0,0,W,H);
  for(let i=0;i<40;i++){const x=r()*W,y=r()*H,R=60+r()*320,g=c.createRadialGradient(x,y,0,x,y,R),col=r()<.5?'#000000':'#ffffff';g.addColorStop(0,rgba(col,.06+r()*.1));g.addColorStop(1,rgba(col,0));c.fillStyle=g;c.fillRect(x-R,y-R,R*2,R*2)}
  c.strokeStyle='rgba(0,0,0,.35)';for(let i=0;i<7;i++){c.lineWidth=1+r()*2;c.beginPath();let x=r()*W,y=r()*H;c.moveTo(x,y);for(let k=0;k<22;k++){x+=(r()-.5)*60;y+=(r()-.3)*40;c.lineTo(x,y)}c.stroke()}
  c.strokeStyle='rgba(0,0,0,.28)';c.lineWidth=4;const pw=W/(2+(r()*2|0));for(let x=pw;x<W-10;x+=pw){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke()}}
function bgPorta(c,W,H,r,p){const base=mix(p.bg,'#6f747c',.5),sh=18+(r()*14|0);for(let y=0;y<H;y+=sh){const g=c.createLinearGradient(0,y,0,y+sh);g.addColorStop(0,shade(base,30));g.addColorStop(.5,base);g.addColorStop(1,shade(base,-50));c.fillStyle=g;c.fillRect(0,y,W,sh)}
  for(let i=0;i<14;i++){const x=r()*W,y=r()*H,R=30+r()*150,g=c.createRadialGradient(x,y,0,x,y,R);g.addColorStop(0,'rgba(150,70,20,.3)');g.addColorStop(1,'rgba(150,70,20,0)');c.fillStyle=g;c.fillRect(x-R,y-R,R*2,R*2)}}
function bgColorido(c,W,H,r,p){c.fillStyle=shade(p.bg,12);c.fillRect(0,0,W,H);c.lineCap='round';
  for(let i=0;i<7;i++){c.strokeStyle=rgba(p.fog[i%3],.22+r()*.2);c.lineWidth=120+r()*260;c.beginPath();const y=r()*H;c.moveTo(-200,y);c.bezierCurveTo(W*.3,y+(r()-.5)*600,W*.7,y+(r()-.5)*600,W+200,y+(r()-.5)*400);c.stroke()}
  c.fillStyle='rgba(0,0,0,.3)';c.fillRect(0,0,W,H)}
/* noite neon: concreto quase preto, o visual das referências */
function bgNoite(c,W,H,r,p){c.fillStyle=mix(p.bg,'#101114',.6);c.fillRect(0,0,W,H);
  for(let i=0;i<60;i++){const x=r()*W,y=r()*H,R=40+r()*260,g=c.createRadialGradient(x,y,0,x,y,R),col=r()<.6?'#000000':'#8a8d96';g.addColorStop(0,rgba(col,.08+r()*.12));g.addColorStop(1,rgba(col,0));c.fillStyle=g;c.fillRect(x-R,y-R,R*2,R*2)}
  c.strokeStyle='rgba(0,0,0,.45)';for(let i=0;i<9;i++){c.lineWidth=1+r()*2;c.beginPath();let x=r()*W,y=r()*H;c.moveTo(x,y);for(let k=0;k<20;k++){x+=(r()-.5)*50;y+=(r()-.3)*36;c.lineTo(x,y)}c.stroke()}}
/* por do sol da quebrada: céu em degradê, base pra skyline */
function bgPorDoSol(c,W,H,r,p){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,mix(p.bg,'#0d0b14',.5));g.addColorStop(.55,mix(p.fog[0],'#2a1240',.55));g.addColorStop(.82,mix('#ff7a2f',p.f2,.25));g.addColorStop(1,'#ffb347');c.fillStyle=g;c.fillRect(0,0,W,H);
  bgTijoloTopo(c,W,H*.62,r,p)}
function bgTijoloTopo(c,W,h,r,p){const g=c.createLinearGradient(0,0,0,h);c.save();const bh=Math.round(h/12),bw=bh*2.2;for(let y=0,row=0;y<h;y+=bh,row++){const a=.55*(1-y/h);const off=row%2?bw/2:0;for(let x=-off;x<W;x+=bw){c.fillStyle=rgba(shade('#5e3a30',(r()-.5)*36),a);c.fillRect(x+3,y+3,bw-6,bh-6)}}c.restore()}

/* muros descritos por camadas (formato do JSON) */
function tornPath(c,x,y,w,h,r,amp,passo){c.beginPath();const pts=[];const n1=Math.max(4,Math.round(w/passo)),n2=Math.max(3,Math.round(h/passo));
  for(let i=0;i<=n1;i++)pts.push([x+w*i/n1,y+(r()-.5)*amp]);for(let i=1;i<=n2;i++)pts.push([x+w+(r()-.5)*amp,y+h*i/n2]);
  for(let i=n1-1;i>=0;i--)pts.push([x+w*i/n1,y+h+(r()-.5)*amp]);for(let i=n2-1;i>=1;i--)pts.push([x+(r()-.5)*amp,y+h*i/n2]);
  c.moveTo(pts[0][0],pts[0][1]);pts.forEach(q=>c.lineTo(q[0],q[1]));c.closePath()}
function bgCamadas(c,W,H,r,spec){
  const ri=(a,b)=>a+r()*(b-a),pick=a=>a[r()*a.length|0];
  for(const L of spec.camadas){c.save();c.globalAlpha=L.opacidade??1;
    switch(L.tipo){
      case'fundo_solido':c.globalAlpha=1;c.fillStyle=L.cor;c.fillRect(0,0,W,H);break;
      case'gradiente_radial':{c.globalAlpha=1;const x=W*L.centro_x_pct/100,y=H*L.centro_y_pct/100,g=c.createRadialGradient(x,y,0,x,y,Math.max(W,H)*L.raio_pct/100);g.addColorStop(0,L.cores[0]);g.addColorStop(1,L.cores[1]);c.fillStyle=g;c.fillRect(0,0,W,H);break}
      case'grade':{const s=W*L.passo_x_pct/100;for(let y=0;y<H;y+=s)for(let x=0;x<W;x+=s){c.fillStyle=r()<.5?'rgba(255,255,255,.18)':'rgba(0,0,0,.06)';c.fillRect(x,y,s,s);const g=c.createLinearGradient(x,y,x+s,y+s);g.addColorStop(0,'rgba(255,255,255,.22)');g.addColorStop(1,'rgba(0,0,0,.08)');c.fillStyle=g;c.fillRect(x,y,s,s)}
        c.strokeStyle=L.cor_linhas;c.lineWidth=(L.espessura_px||2)*1.6;c.beginPath();for(let x=0;x<=W;x+=s){c.moveTo(x,0);c.lineTo(x,H)}for(let y=0;y<=H;y+=s){c.moveTo(0,y);c.lineTo(W,y)}c.stroke();break}
      case'grade_losangular':{const s=W*L.passo_x_pct/100;c.lineWidth=(L.espessura_px||2)*1.8;c.beginPath();for(let k=-H;k<W+H;k+=s){c.moveTo(k,0);c.lineTo(k+H,H);c.moveTo(k+H,0);c.lineTo(k,H)}
        c.strokeStyle='rgba(0,0,0,.6)';c.save();c.translate(3,4);c.stroke();c.restore();c.strokeStyle=L.cor_linhas;c.stroke();break}
      case'manchas_irregulares':case'textura_concreto':{const n=L.quantidade||20;for(let i=0;i<n;i++){const x=r()*W,y=r()*H,R=W*ri(L.raio_pct_min||3,L.raio_pct_max||12)/100,g=c.createRadialGradient(x,y,0,x,y,R),cc=pick(L.cores);g.addColorStop(0,cc);g.addColorStop(1,rgba(cc,0));c.fillStyle=g;c.fillRect(x-R,y-R,R*2,R*2)}
        if(L.tipo==='textura_concreto'){for(let i=0;i<1400;i++){c.fillStyle=rgba(pick(L.cores),.6);c.fillRect(r()*W,r()*H,1+r()*3,1+r()*3)}}break}
      case'pichacoes_textuais':{for(let i=0;i<(L.quantidade||8);i++){c.save();c.translate(r()*W,r()*H);c.rotate(ri(L.rotacao_min||-20,L.rotacao_max||20)*Math.PI/180);c.font=`${W*(.06+r()*.07)|0}px ${FONTES.tag}`;c.fillStyle=pick(L.cores);c.fillText(pick(L.textos),0,0);c.restore()}break}
      case'escorridos':{c.strokeStyle=L.cor;c.fillStyle=L.cor;c.lineCap='round';for(let i=0;i<(L.quantidade||10);i++){const x=r()*W,y=r()*H*.7,len=H*ri(L.comprimento_pct_min||4,L.comprimento_pct_max||14)/100,lw=ri(L.espessura_px_min||2,L.espessura_px_max||5)*1.5;c.lineWidth=lw;c.beginPath();c.moveTo(x,y);c.lineTo(x,y+len);c.stroke();c.beginPath();c.arc(x,y+len,lw*.9,0,7);c.fill()}break}
      case'retangulos_irregulares':{for(let i=0;i<(L.quantidade||12);i++){const w=W*ri(L.largura_pct_min,L.largura_pct_max)/100,h=H*ri(L.altura_pct_min,L.altura_pct_max)/100;c.save();c.translate(r()*W,r()*H);c.rotate(ri(L.rotacao_min||-10,L.rotacao_max||10)*Math.PI/180);
          const cc=pick(L.cores);if(L.bordas_rasgadas)tornPath(c,-w/2,-h/2,w,h,r,w*.03,w*.025);else{c.beginPath();c.rect(-w/2,-h/2,w,h)}c.fillStyle=cc;c.fill();
          c.globalAlpha*=.5;c.fillStyle=shade(cc,-90);for(let k=0;k<5;k++){const yy=-h/2+h*(.18+k*.15);c.fillRect(-w/2+w*.08,yy,w*(.5+r()*.35),h*.05)}c.restore()}break}
      case'fitas_adesivas':{for(let i=0;i<(L.quantidade||6);i++){const w=W*ri(L.largura_pct_min,L.largura_pct_max)/100,h=H*ri(L.altura_pct_min,L.altura_pct_max)/100;c.save();c.translate(r()*W,r()*H);c.rotate((r()-.5)*1.4);c.fillStyle=pick(L.cores);c.fillRect(-w/2,-h/2,w,h);c.restore()}break}
      case'respingo_spray':{for(let i=0;i<(L.quantidade||10);i++)respingo(c,r()*W,r()*H,W*ri(L.raio_pct_min||1,L.raio_pct_max||3)/100,pick(L.cores),r);break}
      case'ripas_verticais':{const n=L.quantidade||10,w=W/n,gap=(L.espacamento_px||4)*1.5;for(let i=0;i<n;i++){const cc=pick(L.cores),g=c.createLinearGradient(i*w,0,i*w+w,0);g.addColorStop(0,shade(cc,18));g.addColorStop(.5,cc);g.addColorStop(1,shade(cc,-22));c.fillStyle=g;c.fillRect(i*w+gap/2,0,w-gap,H);c.fillStyle='rgba(0,0,0,.55)';c.fillRect(i*w-gap/2,0,gap,H)}break}
      case'veios_madeira':{c.strokeStyle=L.cor;for(let i=0;i<(L.quantidade||40);i++){c.lineWidth=ri(L.espessura_px_min||1,L.espessura_px_max||3);let x=r()*W,y=-20;c.beginPath();c.moveTo(x,y);while(y<H+20){y+=30;x+=(r()-.5)*6;c.lineTo(x,y)}c.stroke()}break}
      case'faixas_spray_diagonais':{const a=(L.angulo_graus||-20)*Math.PI/180;c.translate(W/2,H/2);c.rotate(a);c.lineCap='round';for(let i=0;i<(L.quantidade||5);i++){const y=(r()-.5)*H*1.3,lw=W*ri(L.largura_pct_min||8,L.largura_pct_max||14)/100,cc=pick(L.cores);c.strokeStyle=cc;c.lineWidth=lw;c.beginPath();c.moveTo(-W,y);c.lineTo(W,y+(r()-.5)*80);c.stroke();c.fillStyle=cc;for(let k=0;k<250;k++)c.fillRect(-W+r()*2*W,y+(r()-.5)*lw*1.6,2,2)}break}
      case'arranhoes':{c.strokeStyle=L.cor;c.lineWidth=1.5;for(let i=0;i<(L.quantidade||20);i++){const x=r()*W,y=r()*H,len=W*ri(L.comprimento_pct_min||2,L.comprimento_pct_max||8)/100,a=(r()-.5)*1.2;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*len,y+Math.sin(a)*len);c.stroke()}break}
      case'nevoa':{c.globalCompositeOperation='screen';for(let i=0;i<(L.quantidade||6);i++){const x=r()*W,y=r()*H,R=W*ri(L.raio_pct_min||10,L.raio_pct_max||24)/100,cc=pick(L.cores),g=c.createRadialGradient(x,y,0,x,y,R);g.addColorStop(0,cc);g.addColorStop(1,rgba(cc,0));c.fillStyle=g;c.fillRect(x-R,y-R,R*2,R*2)}break}
      case'bokeh_luzes':{c.globalCompositeOperation='screen';for(let i=0;i<(L.quantidade||12);i++){const x=r()*W,y=r()*H,R=W*ri(L.raio_pct_min||1,L.raio_pct_max||3)/100*2.5,cc=pick(L.cores),g=c.createRadialGradient(x,y,0,x,y,R);g.addColorStop(0,cc);g.addColorStop(.5,rgba(cc,.5));g.addColorStop(1,rgba(cc,0));c.fillStyle=g;c.beginPath();c.arc(x,y,R,0,7);c.fill()}break}
    }c.restore()}
}
const MUROS={
  noite:{nome:'Noite neon (concreto escuro)',fn:bgNoite,grupo:'Clássicos'},
  porta:{nome:'Porta de aço',fn:bgPorta,grupo:'Clássicos'},
  tijolo:{nome:'Tijolo',fn:bgTijolo,grupo:'Clássicos'},
  concreto:{nome:'Concreto',fn:bgConcreto,grupo:'Clássicos'},
  colorido:{nome:'Muro pintado',fn:bgColorido,grupo:'Clássicos'},
  pordosol:{nome:'Pôr do sol da quebrada',fn:bgPorDoSol,grupo:'Clássicos'}
};
Object.entries(MUROS_CAMADAS).forEach(([k,m])=>{MUROS[k]={nome:{azulejo_pichado:'Azulejo pichado',lambe_lambe_rasgado:'Lambe-lambe rasgado',tapume_madeira_spray:'Tapume de madeira',grade_noite_neblina:'Grade na neblina'}[k]||k,fn:(c,W,H,r)=>bgCamadas(c,W,H,r,m),grupo:'Novos',escurecer:k==='azulejo_pichado'?.42:k==='lambe_lambe_rasgado'?.18:.1}});

/* ===================== EFEITOS DE TINTA ===================== */
function respingo(c,x,y,s,col,r){c.fillStyle=col;c.beginPath();c.arc(x,y,s,0,7);c.fill();for(let i=0;i<14;i++){const a=r()*6.283,d=s*(1+r()*1.8);c.beginPath();c.arc(x+Math.cos(a)*d,y+Math.sin(a)*d,s*(.06+r()*.28),0,7);c.fill()}
  for(let i=0;i<3;i++){const dx=x+(r()-.5)*s*1.2,len=s*(1+r()*3);c.fillRect(dx-s*.07,y,s*.14,len);c.beginPath();c.arc(dx,y+len,s*.13,0,7);c.fill()}}
function fumaca(c,x,y,R,col,r){c.save();c.globalCompositeOperation='screen';for(let i=0;i<16;i++){const px=x+(r()-.5)*R*1.1,py=y+(r()-.5)*R*.9,rad=R*(.25+r()*.55),g=c.createRadialGradient(px,py,0,px,py,rad);g.addColorStop(0,rgba(col,.32));g.addColorStop(.55,rgba(col,.12));g.addColorStop(1,rgba(col,0));c.fillStyle=g;c.fillRect(px-rad,py-rad,rad*2,rad*2)}
  c.fillStyle=rgba(col,.55);for(let k=0;k<260;k++){const a=r()*6.283,d=R*(.2+r()*.6);c.fillRect(x+Math.cos(a)*d,y+Math.sin(a)*d*.8,1.5+r()*2,1.5+r()*2)}c.restore()}
function vinheta(c,W,H,a){const vg=c.createRadialGradient(W/2,H*.45,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.78);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,`rgba(0,0,0,${a})`);c.fillStyle=vg;c.fillRect(0,0,W,H)}
function tagsFundo(c,W,H,r,p,words){for(let i=0;i<12;i++){c.save();c.translate(r()*W,r()*H);c.rotate((r()-.5)*.7);c.font=`${40+r()*80|0}px ${r()<.5?FONTES.tag:FONTES.wild}`;c.fillStyle=rgba(r()<.5?p.hi:p.fog[r()*3|0],.07+r()*.1);c.fillText(words[r()*words.length|0],0,0);c.restore()}}

/* ===================== PAPEL, PINCELADA, FITA ===================== */
/* tira de papel rasgado (faixas de informação) */
function papel(c,x,y,w,h,r,o={}){c.save();c.translate(x+w/2,y+h/2);c.rotate(o.rot||0);const col=o.cor||'#ebe5d6';
  c.shadowColor='rgba(0,0,0,.55)';c.shadowBlur=h*.35;c.shadowOffsetY=h*.1;tornPath(c,-w/2,-h/2,w,h,r,h*.12,h*.18);c.fillStyle=col;c.fill();c.shadowColor='transparent';
  c.save();c.clip();const g=c.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(0,0,0,.12)');c.fillStyle=g;c.fillRect(-w/2,-h/2,w,h);
  for(let i=0;i<w*h/90;i++){c.fillStyle=r()<.5?'rgba(0,0,0,.07)':'rgba(255,255,255,.12)';c.fillRect(-w/2+r()*w,-h/2+r()*h,1.5,1.5)}
  c.strokeStyle='rgba(0,0,0,.08)';for(let i=0;i<6;i++){c.lineWidth=1;c.beginPath();const yy=-h/2+r()*h;c.moveTo(-w/2,yy);c.lineTo(w/2,yy+(r()-.5)*6);c.stroke()}c.restore();c.restore()}
/* pincelada de tinta atrás de textos (selos, local, prêmio, frase) */
function pincelada(c,x,y,w,h,col,r,o={}){c.save();c.translate(x+w/2,y+h/2);c.rotate(o.rot||0);const hw=w/2,hh=h/2,N=Math.max(10,w/30|0);
  c.beginPath();c.moveTo(-hw,-hh+(r()-.5)*h*.1);for(let i=1;i<=N;i++)c.lineTo(-hw+w*i/N,-hh+(r()-.5)*h*.12);
  for(let i=1;i<=9;i++)c.lineTo(hw+(i%2?r()*h*.5:-r()*h*.12),-hh+h*i/9);
  for(let i=N-1;i>=0;i--)c.lineTo(-hw+w*i/N,hh+(r()-.5)*h*.12);
  for(let i=8;i>=1;i--)c.lineTo(-hw-(i%2?r()*h*.5:-r()*h*.12),-hh+h*i/9);c.closePath();
  c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=h*.3;c.shadowOffsetY=h*.08;c.fillStyle=col;c.fill();c.shadowColor='transparent';
  c.save();c.clip();for(let i=0;i<16;i++){const yy=-hh+r()*h;c.strokeStyle=r()<.5?'rgba(255,255,255,.16)':'rgba(0,0,0,.16)';c.lineWidth=1+r()*h*.05;c.beginPath();c.moveTo(-hw-10+r()*w*.2,yy);c.lineTo(hw-r()*w*.3,yy+(r()-.5)*4);c.stroke()}c.restore();
  if(o.pingos){c.fillStyle=col;c.strokeStyle=col;c.lineCap='round';for(let i=0;i<(o.pingos|0||3);i++){const px=-hw+w*(.1+r()*.8),len=h*(.3+r()*.9),lw=h*(.05+r()*.05);c.lineWidth=lw;c.beginPath();c.moveTo(px,hh-2);c.lineTo(px,hh+len);c.stroke();c.beginPath();c.arc(px,hh+len,lw*.85,0,7);c.fill()}}
  for(let i=0;i<10;i++){c.fillStyle=col;c.beginPath();c.arc((r()<.5?-1:1)*(hw+r()*h*.8),(r()-.5)*h*1.3,1+r()*h*.05,0,7);c.fill()}
  c.restore()}
function fita(c,x,y,w,h,ang,cc){c.save();c.translate(x,y);c.rotate(ang);c.fillStyle=cc||'rgba(240,232,200,.82)';c.beginPath();c.moveTo(-w/2,-h/2);for(let i=0;i<=5;i++)c.lineTo(-w/2+w*i/5,-h/2+(i%2?2:-1));c.lineTo(w/2+3,0);c.lineTo(w/2,h/2);for(let i=5;i>=0;i--)c.lineTo(-w/2+w*i/5,h/2+(i%2?1:-2));c.lineTo(-w/2-3,0);c.closePath();c.fill();c.restore()}
function estouro(c,cx,cy,R,col,out,rot,pontas){c.save();c.translate(cx,cy);c.rotate(rot||0);const n=pontas||14;c.beginPath();for(let i=0;i<n*2;i++){const q=i%2?R*.74:R,a=i*Math.PI/n;c.lineTo(Math.cos(a)*q*1.18,Math.sin(a)*q*.82)}c.closePath();
  c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=R*.15;c.lineJoin='round';c.lineWidth=R*.08;c.strokeStyle=out;c.stroke();c.shadowColor='transparent';c.fillStyle=col;c.fill();c.restore()}

/* ===================== MOTOR DE LETRAS ===================== */
/* Tratamentos de letra. Cores com "$" vêm da paleta escolhida. */
const LETRAS={
  throwup:{nome:'Throw-up (bolha)',base:'bubble',fill:{tipo:'gradiente',angulo:90,cores:['$hi','$f1','$f2']},contornos:[{cor:'$out',esp:.1},{cor:'$hi',esp:.035}],extrusao:{prof:.13,cor:'$sh'},efeitos:['reflexo','pingos','glow'],glow:'$acc'},
  throwup_duas:{nome:'Throw-up duas cores (linha de baixo colorida)',base:'bubble',fill:{linhas:[{tipo:'gradiente',angulo:90,cores:['#ffffff','#e6e6ee']},{tipo:'gradiente',angulo:90,cores:['$f1','$f2']}]},contornos:[{cor:'$out',esp:.1},{cor:'$acc',esp:.04}],extrusao:{prof:.12,cor:'$sh'},efeitos:['reflexo','pingos','glow'],glow:'$acc'},
  wild_cromo:{nome:'Wildstyle cromado',base:'wild',fill:{tipo:'cromo'},contornos:[{cor:'$out',esp:.09},{cor:'$f2',esp:.052},{cor:'#ffffff',esp:.014}],extrusao:{prof:.14,cor:'$f2'},efeitos:['setas','brilhos','pingos','glow','cortes_internos'],glow:'$f2'},
  wild_tinta:{nome:'Wildstyle tinta',base:'wild',fill:{tipo:'gradiente',angulo:60,cores:['$f1','$f2']},contornos:[{cor:'$out',esp:.1},{cor:'$hi',esp:.03}],extrusao:{prof:.11,cor:'$sh'},efeitos:['setas','pingos','faixas','brilhos']},
  bloco_3d:{nome:'Bloco 3D (blockbuster)',base:'block',fill:{tipo:'gradiente',angulo:90,cores:['#ffffff','$f1','$f2']},contornos:[{cor:'$out',esp:.07},{cor:'$acc',esp:.025}],extrusao:{prof:.2,cor:'$sh'},efeitos:['textura_spray','rachaduras','glow'],glow:'$acc'},
  pincel:{nome:'Pincel (handstyle)',base:'brush',fill:{palavras:[{tipo:'solido',cor:'#ffffff'},{tipo:'gradiente',angulo:90,cores:['$f1','$f2']}]},contornos:[{cor:'$out',esp:.075}],extrusao:{prof:.05,cor:'$sh'},efeitos:['pingos','sublinhado']},
  tag:{nome:'Tag de marcador',base:'tag',fill:{tipo:'solido',cor:'$hi'},contornos:[{cor:'$out',esp:.06}],extrusao:{prof:0},efeitos:['glow','pingos'],glow:'$acc'}
};
/* tratamentos vindos do JSON (opcoes-ia.json) */
(function(){const baseMap={bloco_3d:'block',wildstyle:'wild',throw_up:'bubble'},efMap={brilho_superior_branco:'reflexo',reflexo_branco_no_topo:'reflexo',arranhoes_leves:'arranhoes',pingos_controlados:'pingos',escorridos_em_pontos:'pingos',setas_finas:'setas',cortes_internos:'cortes_internos',corte_interno_diagonal:'cortes_internos',bolhas_internas:'bolhas',halo_suave:'glow',glow_externo:'glow',micro_textura_granulada:'textura_spray'};
  LETRAS_IA.forEach(L=>{const f=L.preenchimento,fill=f.tipo==='solido'?{tipo:'solido',cor:f.cor}:f.tipo==='radial'?{tipo:'radial',cores:f.cores,centro:f.centro_pct}:f.tipo==='faixas_diagonais'?{tipo:'faixas',cores:f.cores,largura:(f.largura_faixa_pct||12)/100}:{tipo:'gradiente',angulo:f.angulo_graus??90,cores:f.cores};
    if(L.nome==='cromo_sujo')fill.tipo='gradiente';
    let prof=.1;const ef=[];L.efeitos.forEach(e=>{if(e==='sombra_3d_curta')prof=.06;else if(e==='sombra_3d_media'||e==='extrusao_3d_media')prof=.11;else if(e==='sombra_3d_lateral')prof=-.11;else if(e==='sem_3d_longo')prof=.02;else if(efMap[e])ef.push(efMap[e])});
    const cont=L.contorno.map(k=>({cor:k.cor,esp:k.espessura_pct_altura/100,off:k.deslocamento_px}));
    if(L.efeitos.includes('adesivo_com_borda_grossa'))cont.unshift({cor:'#ffffff',esp:cont[0].esp+.05});
    const nomes={cromo_sujo:'Cromo sujo',wildstyle_duas_tintas:'Wildstyle duas tintas',throwup_espumado:'Throw-up espumado',neon_recortado:'Neon recortado',bloco_fosco_adesivado:'Bloco adesivado'};
    LETRAS['ia_'+L.nome]={nome:(nomes[L.nome]||L.nome)+' (novo)',base:baseMap[L.estilo_base]||'block',fill,contornos:cont,extrusao:{prof:Math.abs(prof),cor:shade(cont[0].cor,40),lateral:prof<0},efeitos:ef.concat(L.estilo_base==='wildstyle'?['setas']:[]),glow:cont[cont.length-1].cor,ia:true}})})();

function brilho(c,x,y,R,col){c.fillStyle=col;c.beginPath();c.moveTo(x,y-R);c.quadraticCurveTo(x,y,x+R,y);c.quadraticCurveTo(x,y,x,y+R);c.quadraticCurveTo(x,y,x-R,y);c.quadraticCurveTo(x,y,x,y-R);c.fill()}
function faisca(c,x,y,R){c.save();c.shadowColor='#ffffff';c.shadowBlur=R*1.4;brilho(c,x,y,R,'#ffffff');brilho(c,x,y,R*.45,'#ffffff');c.restore()}

/* Desenha um texto em grafite dentro de uma caixa. Retorna os limites usados. */
function letreiro(c,text,box,spec,p,r,opt={}){
  const base=spec.base,fam=FONTES[base],t=(base==='tag'?String(text):String(text).toUpperCase()).trim()||' ';
  const kern=base==='bubble'?-.06:base==='block'?.01:0,lhK=base==='brush'?.92:base==='tag'?1:.95;
  const conts=spec.contornos||[{cor:'$out',esp:.08}],O=Math.max(...conts.map(k=>k.esp)),E=(spec.extrusao&&spec.extrusao.prof)||0;
  const meas=(s)=>{c.font=`100px ${fam}`;return(c.measureText(s).width+kern*100*Math.max(0,[...s].length-1))/100};
  const words=t.split(/\s+/).filter(Boolean),cands=[{lines:[t],sc:[1]}];
  if(words.length>=2){let best=null;for(let i=1;i<words.length;i++){const a=words.slice(0,i).join(' '),b=words.slice(i).join(' '),d=Math.abs(meas(a)-meas(b));if(!best||d<best.d)best={d,a,b}}cands.push({lines:[best.a,best.b],sc:[1,1]});
    if(opt.destaque){const a=words.slice(0,-1).join(' '),b=words[words.length-1];cands.push({lines:[a,b],sc:[.74,1.3],pref:1.12})}}
  if(words.length>=4){const n=Math.ceil(words.length/3);cands.push({lines:[words.slice(0,n).join(' '),words.slice(n,2*n).join(' '),words.slice(2*n).join(' ')],sc:[1,1,1],pref:.9})}
  let best=null;cands.forEach(cd=>{const wmax=Math.max(...cd.lines.map((l,i)=>meas(l)*cd.sc[i]))+2*O+E*.6+.1,hsum=cd.sc.reduce((a,b)=>a+b,0)*lhK+2*O+E+.1;
    const s=Math.min(box.w/wmax,box.h/hsum,opt.max||9999)*(cd.pref||1);if(!best||s>best.s)best={...cd,s:s/(cd.pref||1),wmax,hsum}});
  const size=best.s,lines=best.lines,sc=best.sc,dir=r()<.5?1:-1;
  const amp={wild:.22,bubble:.08,block:0,brush:.05,tag:.08}[base],dyA={wild:.1,bubble:.04,block:0,brush:.05,tag:.05}[base],scA={wild:.16,bubble:.06,block:0,brush:.04,tag:.04}[base];
  const totalH=sc.reduce((a,b)=>a+b,0)*lhK*size;let yy=box.y+(box.h-totalH)/2+ (E*size*.35);
  const letters=[];let wordIdx=0;
  lines.forEach((ln,li)=>{const fs=size*sc[li],chs=[...ln];c.font=`${fs}px ${fam}`;const tw=c.measureText(ln).width+kern*fs*(chs.length-1);
    const al=opt.align||'centro',x0=al==='esquerda'?box.x+O*size+2:al==='direita'?box.x+box.w-tw-O*size-2:box.x+(box.w-tw)/2,cy=yy+fs*lhK/2;let acc='';
    chs.forEach((ch,i)=>{const x=x0+c.measureText(acc).width+kern*fs*i;acc+=ch;const w=c.measureText(ch).width;if(ch===' '){wordIdx++;return}
      letters.push({ch,x:x+w/2,y:cy+(r()-.5)*fs*dyA,rot:(r()-.5)*amp,sc:1+(r()-.5)*scA,w,fs,line:li,word:wordIdx})});
    yy+=fs*lhK;wordIdx++});
  const skew=base==='brush'?-.14:0;
  const each=(cx,fn)=>letters.forEach(l=>{cx.save();cx.translate(l.x,l.y);cx.rotate(l.rot);if(skew)cx.transform(1,0,skew,1,0,0);cx.scale(l.sc,l.sc);cx.font=`${l.fs}px ${fam}`;fn(l);cx.restore()});
  c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.miterLimit=2;
  const ef=new Set(spec.efeitos||[]),outer=conts[0],outC=cor(outer.cor,p);
  const ext=E>0?{prof:E,cor:cor(spec.extrusao.cor||'$sh',p)}:null,lat=spec.extrusao&&spec.extrusao.lateral;
  const steps=ext?Math.max(2,Math.round(E*size/3)):0,off=(s,fs)=>ext?(lat?[dir*E*fs*s/steps,E*fs*.3*s/steps]:[dir*.5*E*fs*s/steps,E*fs*s/steps]):[0,0];
  /* setas (wildstyle) */
  const spikes=[];if(ef.has('setas'))letters.forEach(l=>{if(r()<.5){const up=r()<.5,a=(up?-Math.PI/2:Math.PI/2)+(r()-.5)*1.4;spikes.push({bx:l.x+(r()-.5)*l.w*.5,by:l.y+(up?-1:1)*l.fs*.3,a,len:l.fs*(.3+r()*.32),w:l.fs*.14})}});
  const spk=(cx,q)=>{const px=Math.cos(q.a+Math.PI/2)*q.w/2,py=Math.sin(q.a+Math.PI/2)*q.w/2;cx.beginPath();cx.moveTo(q.bx+px,q.by+py);cx.lineTo(q.bx+Math.cos(q.a)*q.len,q.by+Math.sin(q.a)*q.len);cx.lineTo(q.bx-px,q.by-py);cx.closePath()};
  /* sublinhado (pincel) */
  if(ef.has('sublinhado')){const L=letters.filter(l=>l.line===lines.length-1);if(L.length){const x1=L[0].x-L[0].w*.4,x2=L[L.length-1].x+L[L.length-1].w*.6,y=L[0].y+L[0].fs*.42,lw=L[0].fs*.09;c.save();c.lineCap='round';
      [[outC,lw*2.2],[cor('$acc',p),lw]].forEach(([cc,w])=>{c.strokeStyle=cc;c.lineWidth=w;c.beginPath();c.moveTo(x1,y+lw*.6);c.quadraticCurveTo((x1+x2)/2,y-lw*1.2,x2,y+lw*.2);c.stroke()});c.restore()}}
  /* brilho/halo */
  if(ef.has('glow')){const gc=cor(spec.glow||'$acc',p);c.save();c.shadowColor=gc;c.shadowBlur=size*.45;each(c,l=>{c.lineWidth=2*O*l.fs;c.strokeStyle=gc;c.strokeText(l.ch,0,0)});c.restore()}
  /* sombra no muro */
  c.save();c.shadowColor='rgba(0,0,0,.7)';c.shadowBlur=size*.28;c.shadowOffsetY=size*.08;each(c,l=>{const[ox,oy]=off(steps,l.fs);c.lineWidth=2*O*l.fs;c.strokeStyle=outC;c.strokeText(l.ch,ox,oy)});c.restore();
  /* contorno externo + extrusão */
  for(let s=steps;s>=0;s--)each(c,l=>{const[ox,oy]=off(s,l.fs);c.lineWidth=2*outer.esp*l.fs;c.strokeStyle=outC;c.strokeText(l.ch,ox,oy)});
  spikes.forEach(q=>{spk(c,q);c.lineWidth=2*outer.esp*size;c.strokeStyle=outC;c.stroke();c.fillStyle=outC;c.fill()});
  if(ext)for(let s=steps;s>=1;s--)each(c,l=>{const[ox,oy]=off(s,l.fs);c.fillStyle=s===1?shade(ext.cor,35):mix(ext.cor,outC,.25*(s/steps));c.fillText(l.ch,ox,oy)});
  /* contornos internos */
  conts.slice(1).forEach(k=>{const kc=cor(k.cor,p),o=k.off||[0,0];each(c,l=>{c.lineWidth=2*k.esp*l.fs;c.strokeStyle=kc;c.strokeText(l.ch,o[0]*1.5,o[1]*1.5)});spikes.forEach(q=>{spk(c,q);c.lineWidth=2*k.esp*size;c.strokeStyle=kc;c.stroke()})});
  /* preenchimento numa camada separada (permite texturas por dentro) */
  const L2=document.createElement('canvas');L2.width=c.canvas.width;L2.height=c.canvas.height;const x=L2.getContext('2d');x.textAlign='center';x.textBaseline='middle';
  const fillOf=l=>{const f=spec.fill;if(f.linhas)return f.linhas[Math.min(l.line,f.linhas.length-1)];if(f.palavras)return f.palavras[Math.min(l.word,f.palavras.length-1)];return f};
  let corBaixo=cor('$f2',p);
  each(x,l=>{const f=fillOf(l),h=l.fs*.48,w=l.w*.6;let st;
    if(f.tipo==='solido')st=cor(f.cor,p);
    else if(f.tipo==='cromo'){const g=x.createLinearGradient(0,-h,0,h);g.addColorStop(0,'#ffffff');g.addColorStop(.3,'#dfe3ea');g.addColorStop(.47,'#8a8f9c');g.addColorStop(.53,'#f4f6fa');g.addColorStop(.78,'#b9bdc8');g.addColorStop(1,'#ffffff');st=g}
    else if(f.tipo==='radial'){const cc=(f.cores||['#fff','$f1','$f2']).map(v=>cor(v,p)),ct=f.centro||[50,35],g=x.createRadialGradient(-w+2*w*ct[0]/100,-h+2*h*ct[1]/100,0,0,0,h*1.3);cc.forEach((v,i)=>g.addColorStop(i/(cc.length-1),v));st=g}
    else if(f.tipo==='faixas')st=cor(f.cores[0],p);
    else{const cc=(f.cores||['$f1','$f2']).map(v=>cor(v,p)),a=(f.angulo??90)*Math.PI/180,dx=Math.cos(a)*h,dy=Math.sin(a)*h,g=x.createLinearGradient(-dx,-dy,dx,dy);cc.forEach((v,i)=>g.addColorStop(i/(cc.length-1),v));st=g;corBaixo=cc[cc.length-1]}
    x.fillStyle=st;x.fillText(l.ch,0,0)});
  spikes.forEach(q=>{spk(x,q);x.fillStyle=corBaixo;x.fill()});
  const xs=letters.map(l=>l.x),L0=Math.min(...xs)-size,R0=Math.max(...xs)+size,T0=box.y-size*.2,B0=box.y+box.h+size*.2;
  x.globalCompositeOperation='source-atop';
  const f0=spec.fill;if(f0.tipo==='faixas'){const cc=f0.cores.map(v=>cor(v,p)),bw=size*(f0.largura||.12);let k=0;for(let q=L0-size*2;q<R0+size;q+=bw){x.fillStyle=cc[k++%cc.length];x.beginPath();x.moveTo(q,B0);x.lineTo(q+bw,B0);x.lineTo(q+bw+(B0-T0)*.6,T0);x.lineTo(q+(B0-T0)*.6,T0);x.fill()}}
  if(f0.tipo==='cromo'){x.fillStyle='rgba(255,255,255,.55)';for(let k=0;k<4;k++){const q=L0+r()*(R0-L0);x.beginPath();x.moveTo(q,B0);x.lineTo(q+size*.08,B0);x.lineTo(q+size*.5,T0);x.lineTo(q+size*.42,T0);x.fill()}
    x.fillStyle=rgba(cor('$f2',p),.22);x.fillRect(L0,box.y+box.h*.62,R0-L0,box.h)}
  if(ef.has('faixas')){x.fillStyle=rgba(cor('$hi',p),.28);const sw=size*.09;for(let q=L0-400;q<R0;q+=sw*3){x.beginPath();x.moveTo(q,B0);x.lineTo(q+sw,B0);x.lineTo(q+sw+300,T0);x.lineTo(q+300,T0);x.fill()}}
  if(ef.has('bolhas'))for(let k=0;k<letters.length*4;k++){x.beginPath();x.arc(L0+r()*(R0-L0),T0+r()*(B0-T0),size*(.02+r()*.06),0,7);x.fillStyle='rgba(255,255,255,.35)';x.fill()}
  if(ef.has('textura_spray'))for(let k=0;k<letters.length*260;k++){x.fillStyle=r()<.5?'rgba(255,255,255,.35)':rgba(cor('$sh',p),.35);x.fillRect(L0+r()*(R0-L0),T0+r()*(B0-T0),1.5+r()*2,1.5+r()*2)}
  if(ef.has('arranhoes')){x.strokeStyle='rgba(30,30,35,.45)';x.lineWidth=1.2;for(let k=0;k<letters.length*6;k++){const q=L0+r()*(R0-L0),w2=T0+r()*(B0-T0);x.beginPath();x.moveTo(q,w2);x.lineTo(q+(r()-.5)*size*.3,w2+(r()-.5)*size*.15);x.stroke()}}
  if(ef.has('rachaduras')){x.strokeStyle=rgba(outC,.75);x.lineWidth=Math.max(1.5,size*.012);letters.forEach(l=>{if(r()<.6){let px=l.x+(r()-.5)*l.w*.4,py=l.y-l.fs*.3;x.beginPath();x.moveTo(px,py);for(let k=0;k<5;k++){px+=(r()-.5)*l.fs*.12;py+=l.fs*.1;x.lineTo(px,py)}x.stroke()}})}
  if(ef.has('cortes_internos')){letters.forEach(l=>{if(r()<.55){const yy=l.y+(r()-.5)*l.fs*.3,a=-.5+(r()-.5)*.4;x.save();x.translate(l.x,yy);x.rotate(a);x.fillStyle=rgba(outC,.85);x.fillRect(-l.w,-l.fs*.015,l.w*2,l.fs*.03);x.fillStyle='rgba(255,255,255,.6)';x.fillRect(-l.w,l.fs*.018,l.w*2,l.fs*.012);x.restore()}})}
  if(ef.has('reflexo'))each(x,l=>{const h=l.fs*.48;const g=x.createLinearGradient(0,-h,0,-h*.1);g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(-l.w,-h*1.2,l.w*2,h*1.1);
    x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.ellipse(-l.w*.16,-l.fs*.21,l.fs*.075,l.fs*.03,-.6,0,7);x.fill();x.beginPath();x.arc(l.w*.02,-l.fs*.28,l.fs*.02,0,7);x.fill()});
  c.drawImage(L2,0,0);
  /* escorridos */
  if(ef.has('pingos')){c.lineCap='round';const dc=ef.has('setas')||spec.fill.tipo==='cromo'?cor('$f2',p):corBaixo;letters.forEach(l=>{let k=base==='bubble'?.55:.42;while(r()<k){k-=.6;const dx=l.x+(r()-.5)*l.w*.55,y0=l.y+l.fs*.3,len=l.fs*(.14+r()*.38),lw=l.fs*(.035+r()*.04);
      c.strokeStyle=outC;c.lineWidth=lw+2*outer.esp*l.fs*.55;c.beginPath();c.moveTo(dx,y0);c.lineTo(dx,y0+len);c.stroke();c.strokeStyle=dc;c.lineWidth=lw;c.beginPath();c.moveTo(dx,y0);c.lineTo(dx,y0+len);c.stroke();c.fillStyle=dc;c.beginPath();c.arc(dx,y0+len+lw*.3,lw*.85,0,7);c.fill()}})}
  if(ef.has('brilhos')){const n=Math.min(4,1+(letters.length/3|0));for(let k=0;k<n;k++){const l=letters[r()*letters.length|0];faisca(c,l.x+(r()-.5)*l.w*.6,l.y-l.fs*(.2+r()*.25),l.fs*(.08+r()*.06))}}
  const lefts=letters.map(l=>l.x-l.w/2),rights=letters.map(l=>l.x+l.w/2);
  return{top:Math.min(...letters.map(l=>l.y-l.fs*.45)),bot:Math.max(...letters.map(l=>l.y+l.fs*.45))+E*size,left:Math.min(...lefts),right:Math.max(...rights),size,linhas:lines.length};
}
