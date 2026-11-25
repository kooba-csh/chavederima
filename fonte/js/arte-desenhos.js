/* =====================================================================
   Chave de Rima · arte-desenhos.js
   Desenhos de grafite/hip-hop em Canvas 2D (estilo adesivo: contorno
   grosso, cores chapadas, brilho de um lado).
   Todos recebem (c, caixa ou x/y, paleta p, sorteio r).
   ===================================================================== */
const PRETO='#101014';
function contornar(c,lw,col){c.lineJoin='round';c.lineCap='round';c.lineWidth=lw;c.strokeStyle=col||PRETO;c.stroke()}

function coroa(c,cx,cy,w,p,rot){const h=w*.62;c.save();c.translate(cx,cy);c.rotate(rot||0);c.beginPath();c.moveTo(-w/2,h/2);c.lineTo(-w/2,-h*.15);c.lineTo(-w*.25,h*.12);c.lineTo(0,-h/2);c.lineTo(w*.25,h*.12);c.lineTo(w/2,-h*.15);c.lineTo(w/2,h/2);c.closePath();
  c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=w*.12;contornar(c,w*.1,p?p.out:PRETO);c.shadowColor='transparent';const g=c.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'#fff6c2');g.addColorStop(.5,'#f3c330');g.addColorStop(1,'#b07a00');c.fillStyle=g;c.fill();
  c.fillStyle='#8a5c00';c.fillRect(-w/2,h*.3,w,h*.2);c.lineWidth=w*.03;[[-w/2,-h*.15],[0,-h/2],[w/2,-h*.15]].forEach(([x,y])=>{c.beginPath();c.arc(x,y,w*.075,0,7);c.fillStyle=p?p.acc:'#ff4fa3';c.fill();c.strokeStyle=PRETO;c.stroke()});
  c.fillStyle='rgba(255,255,255,.7)';c.beginPath();c.ellipse(-w*.22,-h*.02,w*.05,h*.12,.4,0,7);c.fill();c.restore()}
/* coroinha de rabisco (só traço) */
function coroaRabisco(c,cx,cy,w,col,rot){const h=w*.6;c.save();c.translate(cx,cy);c.rotate(rot||0);c.beginPath();c.moveTo(-w/2,h/2);c.lineTo(-w/2,-h*.3);c.lineTo(-w*.22,h*.08);c.lineTo(0,-h/2);c.lineTo(w*.22,h*.08);c.lineTo(w/2,-h*.3);c.lineTo(w/2,h/2);c.closePath();c.moveTo(-w/2,h*.25);c.lineTo(w/2,h*.25);
  c.lineJoin='round';c.lineCap='round';c.lineWidth=w*.07;c.strokeStyle=col;c.stroke();c.restore()}
/* traços de "brilho" (aqueles riscos em volta de objetos) */
function raios(c,cx,cy,R,ang,col,n){c.save();c.strokeStyle=col;c.lineCap='round';c.lineWidth=Math.max(3,R*.12);const k=n||3;for(let i=0;i<k;i++){const a=ang+(i-(k-1)/2)*.42;c.beginPath();c.moveTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);c.lineTo(cx+Math.cos(a)*R*1.6,cy+Math.sin(a)*R*1.6);c.stroke()}c.restore()}
function laurel(c,cx,cy,h,lado,col){c.save();c.translate(cx,cy);c.scale(lado,1);c.strokeStyle=col;c.fillStyle=col;c.lineWidth=h*.05;c.lineCap='round';c.beginPath();c.moveTo(0,h*.5);c.quadraticCurveTo(-h*.45,h*.1,-h*.2,-h*.5);c.stroke();
  for(let i=0;i<6;i++){const t=i/6,x=-h*.33*Math.sin(t*Math.PI)-h*.05*t,y=h*.45-t*h*.9;c.save();c.translate(x,y);c.rotate(-.9+t*.6);c.beginPath();c.ellipse(-h*.08,0,h*.1,h*.04,0,0,7);c.fill();c.restore()}c.restore()}
function pin(c,x,y,s,col,out){c.save();c.translate(x,y);c.beginPath();c.arc(0,-s*.18,s*.36,Math.PI*.8,Math.PI*2.2);c.lineTo(0,s*.5);c.closePath();c.lineJoin='round';c.lineWidth=s*.14;c.strokeStyle=out;c.stroke();c.fillStyle=col;c.fill();c.beginPath();c.arc(0,-s*.18,s*.13,0,7);c.fillStyle=out;c.fill();c.restore()}
function trofeu(c,x,y,s,col,out){c.save();c.translate(x,y);c.beginPath();c.moveTo(-s*.32,-s*.45);c.lineTo(s*.32,-s*.45);c.quadraticCurveTo(s*.32,s*.05,0,s*.1);c.quadraticCurveTo(-s*.32,s*.05,-s*.32,-s*.45);c.closePath();
  c.moveTo(-s*.32,-s*.35);c.quadraticCurveTo(-s*.55,-s*.35,-s*.45,-s*.15);c.quadraticCurveTo(-s*.4,-s*.05,-s*.25,-s*.08);c.moveTo(s*.32,-s*.35);c.quadraticCurveTo(s*.55,-s*.35,s*.45,-s*.15);c.quadraticCurveTo(s*.4,-s*.05,s*.25,-s*.08);
  c.lineWidth=s*.09;c.lineJoin='round';c.strokeStyle=out;c.stroke();c.fillStyle=col;c.fill();c.fillRect(-s*.05,s*.1,s*.1,s*.18);c.fillRect(-s*.22,s*.28,s*.44,s*.12);c.strokeRect(-s*.22,s*.28,s*.44,s*.12);
  c.fillStyle=out;estrelaMini(c,0,-s*.2,s*.11);c.restore()}
function estrelaMini(c,x,y,R){c.beginPath();for(let i=0;i<10;i++){const q=i%2?R*.45:R,a=i*Math.PI/5-Math.PI/2;c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}c.closePath();c.fill()}

function microfone(c,x,y,len,ang,p){c.save();c.translate(x,y);c.rotate(ang);c.lineJoin='round';c.lineCap='round';const o=len*.045;
  c.strokeStyle=PRETO;c.lineWidth=len*.05;c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-len*.3,len*.05,-len*.4,len*.35,-len*.75,len*.3);c.stroke();
  const body=()=>{c.beginPath();c.moveTo(0,-len*.06);c.lineTo(len*.7,-len*.1);c.lineTo(len*.7,len*.1);c.lineTo(0,len*.06);c.closePath()};
  body();c.lineWidth=o*2;c.stroke();const g=c.createLinearGradient(0,-len*.1,0,len*.1);g.addColorStop(0,'#4a4d56');g.addColorStop(.35,'#c9ccd4');g.addColorStop(1,'#1d1f24');c.fillStyle=g;body();c.fill();
  c.fillStyle=p.acc;c.fillRect(len*.57,-len*.095,len*.09,len*.19);c.lineWidth=o*.6;c.strokeRect(len*.57,-len*.095,len*.09,len*.19);
  const R=len*.2,hx=len*.86;c.beginPath();c.arc(hx,0,R,0,7);c.lineWidth=o*2;c.stroke();const hg=c.createRadialGradient(hx-R*.35,-R*.35,R*.1,hx,0,R);hg.addColorStop(0,'#ffffff');hg.addColorStop(.5,'#b9bcc4');hg.addColorStop(1,'#43464e');c.fillStyle=hg;c.fill();
  c.save();c.beginPath();c.arc(hx,0,R,0,7);c.clip();c.strokeStyle='rgba(20,20,25,.45)';c.lineWidth=len*.008;for(let k=-R*2;k<R*2;k+=R*.22){c.beginPath();c.moveTo(hx+k-R,-R);c.lineTo(hx+k+R,R);c.stroke();c.beginPath();c.moveTo(hx+k+R,-R);c.lineTo(hx+k-R,R);c.stroke()}c.restore();
  c.beginPath();c.arc(hx,0,R,0,7);c.lineWidth=o;c.strokeStyle=PRETO;c.stroke();c.restore()}

/* mão segurando microfone (cinza, estilo adesivo) */
function maoMic(c,b,p,r,rot){const s=Math.min(b.w,b.h*.62);c.save();c.translate(b.x+b.w/2,b.y+b.h*.55);c.rotate(rot||0);const o=s*.05;
  /* cabo */
  c.strokeStyle=PRETO;c.lineWidth=s*.07;c.lineCap='round';c.beginPath();c.moveTo(0,s*.75);c.bezierCurveTo(s*.05,s*1.05,s*.45,s*.95,s*.5,s*1.4);c.stroke();
  /* corpo */
  const corpo=()=>{c.beginPath();c.moveTo(-s*.1,-s*.35);c.lineTo(s*.1,-s*.35);c.lineTo(s*.07,s*.8);c.lineTo(-s*.07,s*.8);c.closePath()};corpo();contornar(c,o*2);const g=c.createLinearGradient(-s*.1,0,s*.1,0);g.addColorStop(0,'#1c1d22');g.addColorStop(.4,'#5c606a');g.addColorStop(1,'#141519');c.fillStyle=g;corpo();c.fill();
  c.fillStyle=p.acc;c.fillRect(-s*.1,-s*.37,s*.2,s*.07);
  /* cabeça */
  const R=s*.24;c.beginPath();c.arc(0,-s*.55,R,0,7);contornar(c,o*2);const hg=c.createRadialGradient(-R*.35,-s*.55-R*.35,R*.1,0,-s*.55,R);hg.addColorStop(0,'#ffffff');hg.addColorStop(.5,p.f1&&lum(p.f1)>.3?mix('#b9bcc4',p.f2,.35):'#b9bcc4');hg.addColorStop(1,'#3b3e46');c.fillStyle=hg;c.fill();
  c.save();c.beginPath();c.arc(0,-s*.55,R,0,7);c.clip();c.strokeStyle='rgba(20,20,25,.5)';c.lineWidth=s*.008;for(let k=-R*2;k<R*2;k+=R*.2){c.beginPath();c.moveTo(k-R,-s*.55-R);c.lineTo(k+R,-s*.55+R);c.stroke();c.beginPath();c.moveTo(k+R,-s*.55-R);c.lineTo(k-R,-s*.55+R);c.stroke()}c.restore();
  /* manga e punho */
  c.beginPath();c.moveTo(-s*.42,s*.95);c.lineTo(-s*.3,s*.35);c.lineTo(s*.3,s*.35);c.lineTo(s*.42,s*.95);c.closePath();contornar(c,o*2);c.fillStyle='#2a2b31';c.fill();
  c.beginPath();rr(c,-s*.3,-s*.05,s*.6,s*.48,s*.14);contornar(c,o*2);const pg=c.createLinearGradient(-s*.3,0,s*.3,0);pg.addColorStop(0,'#8d9098');pg.addColorStop(.5,'#c9ccd2');pg.addColorStop(1,'#7b7e86');c.fillStyle=pg;c.fill();
  /* dedos */
  for(let i=0;i<4;i++){const fy=-s*.06+i*s*.115;c.beginPath();rr(c,-s*.24,fy,s*.36,s*.12,s*.06);c.fillStyle='#b8bbc2';c.fill();contornar(c,o*1.1)}
  c.beginPath();c.moveTo(s*.16,s*.05);c.quadraticCurveTo(s*.36,s*.02,s*.3,s*.26);c.lineWidth=s*.09;c.strokeStyle=PRETO;c.stroke();c.lineWidth=s*.06;c.strokeStyle='#c3c6cc';c.stroke();
  raios(c,-s*.05,-s*.55,R*1.35,-2.4,p.hi,3);c.restore()}

function lata(c,x,y,h,ang,p,r){const w=h*.42,o=h*.025,col=p.fog[r()*3|0];c.save();c.translate(x,y);c.rotate(ang);c.lineJoin='round';
  const ny=-h/2-h*.12,mist=c.createRadialGradient(0,ny-h*.45,0,0,ny-h*.45,h*.6);mist.addColorStop(0,rgba(col,.55));mist.addColorStop(1,rgba(col,0));
  c.fillStyle=mist;c.beginPath();c.moveTo(0,ny);c.lineTo(-h*.5,ny-h*.95);c.lineTo(h*.5,ny-h*.95);c.closePath();c.fill();
  c.fillStyle=rgba(col,.75);for(let k=0;k<180;k++){const t=r(),yy=ny-t*h*.95,xx=(r()-.5)*t*h;c.fillRect(xx,yy,2+r()*2.5,2+r()*2.5)}
  const corpo=()=>rr(c,-w/2,-h/2+h*.1,w,h*.9,w*.08),ombro=()=>{c.beginPath();c.moveTo(-w/2,-h/2+h*.14);c.quadraticCurveTo(-w/2,-h/2,0,-h/2-h*.02);c.quadraticCurveTo(w/2,-h/2,w/2,-h/2+h*.14);c.closePath()};
  c.lineWidth=o*2;c.strokeStyle=PRETO;corpo();c.stroke();ombro();c.stroke();
  const g=c.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,shade(p.f2,-70));g.addColorStop(.38,shade(p.f2,45));g.addColorStop(.55,p.f2);g.addColorStop(1,shade(p.f2,-90));c.fillStyle=g;corpo();c.fill();
  const sg=c.createLinearGradient(-w/2,0,w/2,0);sg.addColorStop(0,'#55585f');sg.addColorStop(.4,'#e6e8ec');sg.addColorStop(1,'#393b41');c.fillStyle=sg;ombro();c.fill();
  c.fillStyle=PRETO;c.fillRect(-w/2,-h*.04,w,h*.24);coroaRabisco(c,0,h*.08,w*.5,'#ffffff',0);
  c.fillStyle='#f2f2f2';c.strokeStyle=PRETO;c.lineWidth=o;rr(c,-w*.14,-h/2-h*.12,w*.28,h*.12,w*.04);c.fill();c.stroke();
  c.fillStyle='rgba(255,255,255,.35)';c.fillRect(-w*.22,-h*.32,w*.08,h*.72);
  c.fillStyle=p.f2;for(let i=0;i<2;i++){const dx=-w/2+w*(.2+r()*.6);c.fillRect(dx,h/2-2,w*.05,h*(.1+r()*.15))}c.restore()}

function silhueta(c,x,y,h,face,col,rim){c.save();c.translate(x,y);c.scale(face*h,h);
  const draw=(fill,ex)=>{c.fillStyle=c.strokeStyle=fill;c.lineCap='round';c.lineJoin='round';
    const limb=(pts,w)=>{c.lineWidth=w+ex;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.stroke()};
    const shape=fn=>{fn();c.fill();if(ex){c.lineWidth=ex;c.stroke()}};
    limb([[-.06,-.48],[-.09,-.25],[-.12,-.03]],.11);limb([[.06,-.48],[.11,-.25],[.15,-.03]],.11);
    shape(()=>{c.beginPath();c.ellipse(-.1,-.02,.075,.03,0,0,7)});shape(()=>{c.beginPath();c.ellipse(.18,-.02,.075,.03,0,0,7)});
    shape(()=>{c.beginPath();c.moveTo(-.15,-.79);c.quadraticCurveTo(0,-.83,.15,-.79);c.lineTo(.15,-.62);c.lineTo(.13,-.45);c.lineTo(-.13,-.45);c.lineTo(-.15,-.62);c.closePath()});
    shape(()=>{c.beginPath();c.arc(-.03,-.85,.075,0,7)});shape(()=>{c.beginPath();c.arc(.015,-.89,.065,0,7)});
    shape(()=>{c.beginPath();c.ellipse(.08,-.935,.075,.017,-.1,0,7)});shape(()=>{c.beginPath();c.arc(.01,-.915,.068,Math.PI,0)});
    limb([[-.12,-.77],[.04,-.64],[.27,-.71]],.065);shape(()=>{c.beginPath();c.arc(.28,-.71,.032,0,7)});
    limb([[.12,-.77],[.23,-.68],[.15,-.82]],.07);limb([[.15,-.82],[.125,-.87]],.028);shape(()=>{c.beginPath();c.arc(.118,-.885,.027,0,7)})};
  if(rim){c.save();c.shadowColor=rim;c.shadowBlur=.06*h;draw(rim,.02);c.restore()}draw(col,0);c.restore()}

/* foto em P&B com contraste (cache por imagem) */
const _pb=new WeakMap();
function fotoPB(img){if(_pb.has(img))return _pb.get(img);const cv=document.createElement('canvas');cv.width=img.naturalWidth||img.width;cv.height=img.naturalHeight||img.height;const x=cv.getContext('2d');x.drawImage(img,0,0);
  try{const d=x.getImageData(0,0,cv.width,cv.height),a=d.data;for(let i=0;i<a.length;i+=4){let v=.3*a[i]+.59*a[i+1]+.11*a[i+2];v=Math.max(0,Math.min(255,(v-128)*1.25+128));a[i]=a[i+1]=a[i+2]=v}x.putImageData(d,0,0)}catch(e){}
  _pb.set(img,cv);return cv}
/* polaroid com fita e nome escrito (o nome vai numa fita rasgada, como lambe) */
function polaroid(c,img,cx,cy,w,rot,cap,r,o={}){const pad=w*.06,iw=w-2*pad,h=iw+pad+w*.16;c.save();c.translate(cx,cy);c.rotate(rot);
  c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=w*.09;c.shadowOffsetY=w*.03;c.fillStyle='#f3f1ea';c.fillRect(-w/2,-h/2,w,h);c.shadowColor='transparent';
  const src=o.pb?fotoPB(img):img,IW=src.naturalWidth||src.width,IH=src.naturalHeight||src.height,s=Math.max(iw/IW,iw/IH),sw=iw/s,sh=iw/s;c.drawImage(src,(IW-sw)/2,(IH-sh)*.3,sw,sh,-w/2+pad,-h/2+pad,iw,iw);
  c.fillStyle='rgba(240,232,200,.85)';c.save();c.translate(0,-h/2);c.rotate((r()-.5)*.3);c.fillRect(-w*.2,-w*.05,w*.4,w*.1);c.restore();
  if(cap){const fs=w*.13;c.font=`${fs}px ${FONTES.mao}`;const tw=Math.min(c.measureText(cap).width+fs,w*.95);c.save();c.translate((r()-.5)*w*.1,h/2-w*.07);c.rotate((r()-.5)*.08);
    papel(c,-tw/2,-fs*.75,tw,fs*1.5,r,{cor:'#e2d6b8'});c.fillStyle='#141414';c.textAlign='center';c.textBaseline='middle';c.fillText(fit(c,cap,tw-fs*.5),0,2);c.restore()}
  c.restore();return h}
function cartazCapa(c,img,cx,cy,maxW,maxH,r){const s=Math.min(maxW/img.width,maxH/img.height),w=img.width*s,h=img.height*s,b=Math.max(8,Math.min(w,h)*.035);
  c.save();c.translate(cx,cy);c.rotate((r()-.5)*.08);c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=30;c.shadowOffsetY=10;c.fillStyle='#f3f0e6';c.fillRect(-w/2-b,-h/2-b,w+2*b,h+2*b);c.shadowColor='transparent';c.drawImage(img,-w/2,-h/2,w,h);
  const tl=Math.min(90,w*.3);[[-w/2,-h/2,-.7],[w/2,-h/2,.7],[-w/2,h/2,.7],[w/2,h/2,-.7]].forEach(([x,y,a])=>fita(c,x,y,tl,tl*.3,a));c.restore()}

/* caixa de som empilhada */
function caixaSom(c,b,p,r){const w=Math.min(b.w,b.h*.9),h=w*1.08,x0=b.x+(b.w-w)/2,y0=b.y+b.h-h,o=w*.03;
  const caixa=(y,hh,n)=>{rr(c,x0,y,w,hh,w*.05);c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=w*.08;c.fillStyle='#1d1e23';c.fill();c.shadowColor='transparent';contornar(c,o*2);
    c.fillStyle='rgba(255,255,255,.08)';c.fillRect(x0+o,y+o,w*.06,hh-2*o);
    const R=Math.min(w/(n*2.3),hh*.36);for(let i=0;i<n;i++){const cx=x0+w*(i+.5)/n,cy=y+hh/2;c.beginPath();c.arc(cx,cy,R,0,7);c.fillStyle='#0b0b0e';c.fill();contornar(c,o*1.2);
      const g=c.createRadialGradient(cx-R*.3,cy-R*.3,R*.1,cx,cy,R*.85);g.addColorStop(0,'#5b5f68');g.addColorStop(1,'#16171b');c.beginPath();c.arc(cx,cy,R*.82,0,7);c.fillStyle=g;c.fill();
      c.beginPath();c.arc(cx,cy,R*.82,0,7);c.strokeStyle=p.acc;c.lineWidth=o*.8;c.stroke();c.beginPath();c.arc(cx,cy,R*.25,0,7);c.fillStyle='#2b2d33';c.fill();contornar(c,o*.8)}
    [[x0+w*.05,y+hh*.08],[x0+w*.95,y+hh*.08],[x0+w*.05,y+hh*.92],[x0+w*.95,y+hh*.92]].forEach(([sx,sy])=>{c.beginPath();c.arc(sx,sy,w*.012,0,7);c.fillStyle='#8a8d95';c.fill()})};
  caixa(y0,h*.52,2);caixa(y0+h*.55,h*.45,3);c.fillStyle='#2b2d33';rr(c,x0+w*.35,y0-w*.06,w*.3,w*.07,w*.02);c.fill();contornar(c,o)}
/* toca-discos visto de cima */
function tocaDiscos(c,b,p,r,rot){const w=Math.min(b.w,b.h*1.3),h=w*.72;c.save();c.translate(b.x+b.w/2,b.y+b.h/2);c.rotate(rot||0);const o=w*.018;
  rr(c,-w/2,-h/2,w,h,w*.04);c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=w*.06;c.shadowOffsetY=w*.02;c.fillStyle='#2a2b30';c.fill();c.shadowColor='transparent';contornar(c,o*2);
  const g=c.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'rgba(255,255,255,.12)');g.addColorStop(1,'rgba(0,0,0,.2)');c.fillStyle=g;rr(c,-w/2,-h/2,w,h,w*.04);c.fill();
  const R=h*.42,cx=-w*.1;c.beginPath();c.arc(cx,0,R,0,7);c.fillStyle='#09090b';c.fill();contornar(c,o*1.4);c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=1;for(let k=R*.42;k<R*.97;k+=R*.06){c.beginPath();c.arc(cx,0,k,0,7);c.stroke()}
  c.fillStyle='rgba(255,255,255,.15)';c.beginPath();c.moveTo(cx,0);c.arc(cx,0,R*.95,-1.1,-.6);c.closePath();c.fill();
  c.beginPath();c.arc(cx,0,R*.33,0,7);c.fillStyle=p.acc;c.fill();contornar(c,o*.8);coroaRabisco(c,cx,0,R*.3,PRETO,0);c.beginPath();c.arc(cx,0,R*.04,0,7);c.fillStyle='#ddd';c.fill();
  const px=w*.38,py=-h*.32;c.beginPath();c.arc(px,py,w*.05,0,7);c.fillStyle='#9a9da5';c.fill();contornar(c,o);c.strokeStyle='#d3d5da';c.lineWidth=w*.022;c.lineCap='round';c.beginPath();c.moveTo(px,py);c.lineTo(px-w*.04,h*.18);c.lineTo(cx+R*.55,h*.2);c.stroke();
  c.fillStyle='#111';c.fillRect(cx+R*.45,h*.17,w*.07,w*.035);
  for(let i=0;i<2;i++){c.fillStyle='#16171a';c.fillRect(w*.3+i*w*.07,-h*.05,w*.03,h*.36);c.fillStyle=i?p.f2:p.acc;c.fillRect(w*.29+i*w*.07,h*.05+i*h*.06,w*.05,w*.03)}
  c.beginPath();c.arc(-w*.42,h*.38,w*.018,0,7);c.fillStyle='#7CFF6A';c.fill();c.restore()}
/* corrente com medalhão (de x1 a x2, caindo em curva) */
function corrente(c,x1,y1,x2,y2,elo,p,med){const n=Math.max(4,Math.round(Math.hypot(x2-x1,y2-y1)/(elo*1.25))),sag=Math.hypot(x2-x1,y2-y1)*.18;
  for(let i=0;i<=n;i++){const t=i/n,x=x1+(x2-x1)*t,y=y1+(y2-y1)*t+Math.sin(t*Math.PI)*sag,ang=Math.atan2(y2-y1+Math.cos(t*Math.PI)*Math.PI*sag/1.0,x2-x1);c.save();c.translate(x,y);c.rotate(ang);
    c.beginPath();if(i%2)c.ellipse(0,0,elo*.62,elo*.16,0,0,7);else c.ellipse(0,0,elo*.62,elo*.36,0,0,7);c.lineWidth=elo*.3;c.strokeStyle=PRETO;c.stroke();const g=c.createLinearGradient(0,-elo*.4,0,elo*.4);g.addColorStop(0,'#ffffff');g.addColorStop(.5,'#9ca0aa');g.addColorStop(1,'#e6e8ee');c.lineWidth=elo*.16;c.strokeStyle=g;c.stroke();c.restore()}
  if(med){const x=(x1+x2)/2,y=(y1+y2)/2+sag+elo*1.6,R=elo*1.4;c.beginPath();c.arc(x,y,R,0,7);c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=R*.4;c.fillStyle='#f3c330';c.fill();c.shadowColor='transparent';contornar(c,R*.14);coroaRabisco(c,x,y,R*1.1,PRETO,0)}}
/* megafone */
function megafone(c,b,p,r,rot){const s=Math.min(b.w,b.h*1.2);c.save();c.translate(b.x+b.w/2,b.y+b.h/2);c.rotate(rot||-.5);const o=s*.03;
  c.beginPath();c.moveTo(-s*.35,-s*.1);c.lineTo(s*.25,-s*.32);c.lineTo(s*.25,s*.32);c.lineTo(-s*.35,s*.1);c.closePath();contornar(c,o*2);const g=c.createLinearGradient(0,-s*.3,0,s*.3);g.addColorStop(0,'#e8e9ed');g.addColorStop(.6,'#9a9ea8');g.addColorStop(1,'#5a5d66');c.fillStyle=g;c.fill();
  c.beginPath();c.ellipse(s*.25,0,s*.07,s*.32,0,0,7);c.fillStyle='#2a2b30';c.fill();contornar(c,o*1.5);
  rr(c,-s*.47,-s*.11,s*.14,s*.22,s*.03);c.fillStyle='#2a2b30';c.fill();contornar(c,o*1.5);c.beginPath();c.moveTo(-s*.2,s*.08);c.lineTo(-s*.22,s*.3);c.lineTo(-s*.12,s*.3);c.lineTo(-s*.1,s*.06);c.fillStyle='#2a2b30';c.fill();contornar(c,o*1.2);
  c.fillStyle=p.acc;c.fillRect(-s*.05,-s*.2,s*.06,s*.4);raios(c,s*.3,0,s*.36,0,p.acc,3);c.restore()}
function bone(c,b,p,r,rot){const s=Math.min(b.w,b.h*1.3);c.save();c.translate(b.x+b.w/2,b.y+b.h*.6);c.rotate(rot||0);const o=s*.03;
  c.beginPath();c.moveTo(-s*.1,s*.02);c.lineTo(s*.48,-s*.04);c.lineTo(s*.52,s*.1);c.lineTo(-s*.05,s*.18);c.closePath();c.fillStyle=shade(p.f2,-30);c.fill();contornar(c,o*2);
  c.beginPath();c.moveTo(-s*.42,s*.1);c.quadraticCurveTo(-s*.42,-s*.42,0,-s*.42);c.quadraticCurveTo(s*.3,-s*.42,s*.3,s*.05);c.closePath();const g=c.createLinearGradient(-s*.4,0,s*.3,0);g.addColorStop(0,shade(p.f2,-60));g.addColorStop(.5,p.f2);g.addColorStop(1,shade(p.f2,-40));c.fillStyle=g;c.fill();contornar(c,o*2);
  c.strokeStyle='rgba(0,0,0,.4)';c.lineWidth=o*.6;c.beginPath();c.moveTo(-s*.05,-s*.42);c.quadraticCurveTo(-s*.12,-s*.1,-s*.08,s*.12);c.stroke();c.beginPath();c.arc(-s*.05,-s*.42,s*.035,0,7);c.fillStyle=shade(p.f2,-50);c.fill();
  c.beginPath();c.arc(s*.32,s*.06,s*.05,0,7);c.fillStyle='#f3c330';c.fill();contornar(c,o*.6);c.restore()}
function tenis(c,b,p,r,rot){const s=Math.min(b.w,b.h*1.8);c.save();c.translate(b.x+b.w/2,b.y+b.h*.6);c.rotate(rot||0);const o=s*.022;
  c.beginPath();c.moveTo(-s*.45,s*.12);c.lineTo(-s*.45,-s*.12);c.quadraticCurveTo(-s*.3,-s*.18,-s*.15,-s*.12);c.lineTo(s*.05,-s*.02);c.quadraticCurveTo(s*.4,s*.0,s*.48,s*.08);c.lineTo(s*.48,s*.12);c.closePath();c.fillStyle='#f2f2f4';c.fill();contornar(c,o*2);
  rr(c,-s*.47,s*.1,s*.97,s*.1,s*.03);c.fillStyle=p.f2;c.fill();contornar(c,o*1.6);c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=o*.7;for(let i=0;i<10;i++){c.beginPath();c.moveTo(-s*.43+i*s*.09,s*.14);c.lineTo(-s*.4+i*s*.09,s*.18);c.stroke()}
  c.fillStyle=p.acc;c.beginPath();c.moveTo(-s*.25,s*.02);c.quadraticCurveTo(0,-s*.04,s*.2,s*.06);c.lineTo(s*.15,s*.09);c.quadraticCurveTo(-s*.05,s*.02,-s*.25,s*.07);c.closePath();c.fill();contornar(c,o*.8);
  c.strokeStyle=PRETO;c.lineWidth=o;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-s*.16+i*s*.06,-s*.1+i*s*.025);c.lineTo(-s*.1+i*s*.06,-s*.06+i*s*.025);c.stroke()}c.restore()}
/* skyline da quebrada: casinhas, caixas d'água, postes e janelas acesas */
function skyline(c,b,p,r){const y0=b.y+b.h,cor='#0d0c12';c.save();let x=b.x-10;const casas=[];
  while(x<b.x+b.w+20){const w=b.w*(.05+r()*.08),h=b.h*(.3+r()*.65);casas.push({x,w,h});x+=w*(.75+r()*.2)}
  casas.forEach(k=>{c.fillStyle=cor;c.fillRect(k.x,y0-k.h,k.w,k.h+2);if(r()<.4){c.fillRect(k.x+k.w*.2,y0-k.h-k.w*.25,k.w*.3,k.w*.25)}
    for(let wy=y0-k.h+k.w*.25;wy<y0-k.w*.2;wy+=k.w*.34)for(let wx=k.x+k.w*.18;wx<k.x+k.w-k.w*.25;wx+=k.w*.32)if(r()<.45){c.fillStyle=r()<.7?'#ffd35a':'#ff9f43';c.shadowColor='#ffcf5a';c.shadowBlur=8;c.fillRect(wx,wy,k.w*.14,k.w*.12);c.shadowBlur=0}});
  c.strokeStyle=cor;c.lineWidth=4;for(let i=0;i<3;i++){const px=b.x+b.w*(.15+i*.33+r()*.1);c.beginPath();c.moveTo(px,y0);c.lineTo(px,y0-b.h*1.15);c.stroke();c.lineWidth=3;c.beginPath();c.moveTo(px-14,y0-b.h*1.1);c.lineTo(px+14,y0-b.h*1.1);c.stroke()}
  c.lineWidth=1.5;c.beginPath();for(let i=0;i<2;i++){c.moveTo(b.x,y0-b.h*(1.05+i*.05));c.quadraticCurveTo(b.x+b.w/2,y0-b.h*(.85+i*.05),b.x+b.w,y0-b.h*(1.05+i*.05))}c.stroke();
  const g=c.createLinearGradient(0,y0-b.h*.3,0,y0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.6)');c.fillStyle=g;c.fillRect(b.x,y0-b.h*.3,b.w,b.h*.3);c.restore()}
/* papel rasgado no canto com escrita estêncil (RAP / RIMA / CULTURA / RUA) */
function cantoPapel(c,W,H,canto,r,textos){const w=W*(.2+r()*.06),h=w*(1+r()*.3);c.save();const sx=canto.includes('d')?W-w*.75:-w*.25,sy=canto.includes('b')?H-h*.78:-h*.22;
  c.translate(sx+w/2,sy+h/2);c.rotate((r()-.5)*.25);c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=18;tornPath(c,-w/2,-h/2,w,h,r,w*.05,w*.04);c.fillStyle=r()<.5?'#bdb8ae':'#8d8a84';c.fill();c.shadowColor='transparent';
  c.save();c.clip();for(let i=0;i<500;i++){c.fillStyle=r()<.5?'rgba(0,0,0,.12)':'rgba(255,255,255,.12)';c.fillRect(-w/2+r()*w,-h/2+r()*h,2,2)}
  if(textos){c.fillStyle='rgba(30,30,32,.75)';const fs=w*.15;c.font=`${fs}px ${FONTES.cond}`;c.textAlign='center';c.textBaseline='middle';textos.forEach((t,i)=>c.fillText(t,(canto.includes('d')?-w*.1:w*.12),-h*.3+i*fs*1.05))}
  c.restore();c.restore()}
