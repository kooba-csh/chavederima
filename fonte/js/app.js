/* ---------- formatos ---------- */
const T=s=>({tipo:'tempo',s}),BV=s=>({tipo:'bv',s}),RM=txt=>({tipo:'rimas',txt});
const normR=t=>String(t||'').trim().replace(/\s*[xX×]\s*/g,'×').replace(/\s*[-–]\s*/g,' - ');
const BASE={
  'm1':{nome:'Modelo 1 · 4×4-2×2-2×2 · 3º 2×2×2×2',grupo:'casa',rounds:[RM('4×4 - 2×2 - 2×2'),RM('4×4 - 2×2 - 2×2')],des:RM('2×2×2×2')},
  'm2':{nome:'Modelo 2 · 30×30 · 3º 4×4-2×2-2×2-2×2',grupo:'casa',rounds:[T(30),T(30)],des:RM('4×4 - 2×2 - 2×2 - 2×2')},
  'm3':{nome:'Modelo 3 · 45×45 · 3º 4×4-2×2-2×2-2×2',grupo:'casa',rounds:[T(45),T(45)],des:RM('4×4 - 2×2 - 2×2 - 2×2')},
  '30x30':{nome:'30×30 · 3º 2×2×2×2',rounds:[T(30),T(30)],des:RM('2×2×2×2')},
  '45x45':{nome:'45×45 · 3º bate-volta 45s',rounds:[T(45),T(45)],des:BV(45)},
  '40x40':{nome:'40×40 · 3º 4×4',rounds:[T(40),T(40)],des:RM('4×4')},
  '1min':{nome:'1 min × 1 min · 3º 30×30',rounds:[T(60),T(60)],des:T(30)},
  'bv45':{nome:'Bate-volta 45s',rounds:[BV(45),BV(45)],des:BV(45)},
  'bv60':{nome:'Bate-volta 1 min',rounds:[BV(60),BV(60)],des:BV(60)},
  'bv4':{nome:'Bate-volta 4×4 (sem tempo)',rounds:[RM('4×4'),RM('4×4')],des:RM('4×4')},
  'misto':{nome:'Misto: 30×30, bate-volta 45s · 3º 4×4',rounds:[T(30),BV(45)],des:RM('4×4')},
  'conhec':{nome:'Conhecimento (tema) 45×45 · 3º bate-volta',rounds:[T(45),T(45)],des:BV(45),tema:true},
  'unico':{nome:'Round único: bate-volta 1 min',rounds:[BV(60)],des:BV(30)},
  'md3':{nome:'Melhor de 3: três rounds de 45×45',rounds:[T(45),T(45),T(45)],des:null}
};
const clone=o=>JSON.parse(JSON.stringify(o));
function allFmts(){const o=Object.assign({},BASE);Object.entries(S.meus||{}).forEach(([id,f])=>{o['u:'+id]=Object.assign({grupo:'meus'},f)});o.custom={nome:'Personalizado (monte abaixo)',grupo:'custom',rounds:S.custom.rounds,des:S.custom.des};return o}
const FORMATS=new Proxy({},{get:(_,k)=>allFmts()[k]});
const TEMAS=['Favela','Futebol','Política','Amor','Racismo','Educação','Redes sociais','Dinheiro','Fé','Natureza','Família','Trabalho','Tecnologia','Saúde mental','Cultura hip-hop','Desigualdade','Meio ambiente','Amizade','Sonhos','Infância','Música','Cidade grande','Interior','Mídia','Fome','Juventude','Esporte','História do rap','Inveja','Fama','Liberdade','Respeito','Superação','Escola','Ônibus lotado','Internet','Inteligência artificial','Eleição','Mãe','Rua'];
const dR=rd=>rd.tipo==='tempo'?rd.s+'×'+rd.s:rd.tipo==='bv'?'bate-volta '+rd.s+'s':'bate-volta '+rd.txt;
function getFmt(key){return allFmts()[key]||BASE.m1}
function descFmt(f){const rs=f.rounds;let t=rs.map((r,i)=>(i+1)+'º round: '+dR(r)).join(' · ');
  if(f.des)t+=' · '+(rs.length+1)+'º round (se empatar): '+dR(f.des)+'.';else t+='. Sem desempate.';return t}
function fasesDe(f,A,B){const lab=(rd,a,b)=>rd.tipo==='tempo'?[{t:a,s:rd.s},{t:b,s:rd.s}]:rd.tipo==='bv'?[{t:'Bate-volta '+rd.s+'s · '+a+' começa',s:rd.s}]:[{t:'Bate-volta '+rd.txt+' · '+a+' começa',s:null}];
  const out=f.rounds.map((rd,i)=>{const[a,b]=i%2?[B,A]:[A,B];return{r:'Round '+(i+1),f:lab(rd,a,b)}});
  if(f.des){const[a,b]=f.rounds.length%2?[B,A]:[A,B];out.push({r:(f.rounds.length+1)+'º · desempate',f:lab(f.des,a,b)})}return out}

/* ---------- estado ---------- */
const hoje=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const EX=['Kaio','Duda','Lírico','Vênus','Tico','Rafa','Zé Cria','Nina','Breno MC','Jhow'];
let S={modo:'solo',formato:'m1',final:'',custom:clone({rounds:BASE.m1.rounds,des:BASE.m1.des}),meus:{},usaTema:false,
  nomes:EX.join('\n'),prontos:false,sorteio:true,naoFecha:'interna',E:[],chaveModo:'interna',draws:{},picks:{},placar:{},inv:{},temas:{},repJur:[],cur:null,exemplo:true,aviso:''};
let A={layoutDiv:'auto',layoutCamp:'auto',letraTitulo:'auto',letraCamp:'auto',letraData:'papel',selo:'auto',recorte:'auto',pb:false,des:null,premio:'',tipo:'div',evento:'Batalha de Rima',edicao:'',local:'',data:hoje(),hora:'19:00',infos:'',rodape:'',titulo:'',fmt:'feed',estilo:'auto',fundo:'auto',cores:'auto',capaUso:'fundo',seed:(Math.random()*1e9)|0};
try{const s=JSON.parse(localStorage.getItem('chave-rima-v2'));if(s&&s.S){S=Object.assign(S,s.S);A=Object.assign(A,s.A||{})}}catch(e){}
if(!S.custom||!Array.isArray(S.custom.rounds))S.custom=clone({rounds:BASE.m1.rounds,des:BASE.m1.des});
S.meus=S.meus||{};S.draws=S.draws||{};S.hist=S.hist||[];S.ausentes=S.ausentes||[];S.rounds=S.rounds||{};S.placarTxt=S.placarTxt||{};if(S.naoFecha==='batalha')S.naoFecha='interna';if(!allFmts()[S.formato])S.formato='m1';if(S.final&&!allFmts()[S.final])S.final='';
const save=()=>{try{localStorage.setItem('chave-rima-v2',JSON.stringify({S,A}))}catch(e){}};
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const isP2=n=>n>0&&(n&(n-1))===0, np2=n=>{let p=1;while(p<n)p*=2;return p};
const nomeFase=n=>n===1?'Final':n===2?'Semifinal':n===4?'Quartas':n===8?'Oitavas':n===16?'16 avos':'Fase de '+n*2;
const tam=()=>({solo:1,dupla:2,trio:3}[S.modo]);
const linhas=()=>S.nomes.split('\n').map(s=>s.trim()).filter(Boolean);
const qtd=()=>{const n=linhas().length;return tam()===1||S.prontos?n:Math.ceil(n/tam())};
const und=()=>tam()===1?'MCs':(S.modo==='dupla'?'duplas':'trios');

function plano(N,modo){
  if(N<2)return'Coloque pelo menos 2 '+und()+'.';
  if(isP2(N))return`${N} ${und()} → chave de ${N} fechada, sem repescagem.`;
  if(modo==='folga'){const P=np2(N);return`${N} ${und()} → chave de ${P}: ${P-N} passa${P-N>1?'m':''} direto na 1ª fase.`}
  if(modo==='interna'){const P=np2(N),M=P/2,f=Math.max(N-M,Math.min(N>>1,M/2)),g=N-2*f,h=M-f-g,pl=(n,a,b)=>n+' '+(n>1?b:a);
    return`${N} ${und()} → chave de ${P}, 1ª fase com ${M} batalhas: ${pl(f,'batalha','batalhas')} entre quem ainda não rimou`+(g?`, ${pl(g,'batalha','batalhas')} de quem ainda não rimou contra perdedor sorteado`:'')+(h?` e ${pl(h,'batalha','batalhas')} entre perdedores sorteados`:'')+`. A repescagem preenche ${P-N} vaga${P-N>1?'s':''}. Depois segue normal até a final.`}
  const nm=N>>1,W=Math.ceil(N/2),P=np2(W),k=P-W;
  let t=`${N} ${und()} → 1ª fase com ${nm} batalha${nm>1?'s':''}${N%2?' (1 passa direto)':''}. ${W} classificado${W>1?'s':''}`;
  if(!k)return t+` fecham a chave de ${P}.`;
  t+=` + ${k} da repescagem = ${P}. `;
  return t+(modo==='jurados'?`Jurados ou plateia escolhem ${k} entre os ${nm} perdedores.`:`Repescagem: os ${nm} perdedores disputam ${k} vaga${k>1?'s':''} em ${nm-k} batalha${nm-k>1?'s':''}.`)}

function montar(){
  const ls=linhas(),t=tam();const base=S.sorteio?shuffle(ls):ls.slice();let times,aviso='';
  if(t===1||S.prontos)times=base;
  else{times=[];for(let i=0;i<base.length;i+=t)times.push(base.slice(i,i+t).join(' & '));const sb=base.length%t;if(sb)aviso=`Sobrou ${sb} MC, que ficou num time incompleto: ${times[times.length-1]}.`}
  if(times.length<2){S.aviso='Coloque pelo menos 2 '+und()+'.';render();return}
  S.E=times;S.chaveModo=S.naoFecha;S.draws={};S.ausentes=[];S.hist=[];S.rounds={};S.placarTxt={};TROCA.sel=null;S.picks={};S.placar={};S.inv={};S.temas={};S.repJur=[];S.cur=null;S.aviso=aviso;stop();T_.i=null;save();render();
}

/* ---------- chave ---------- */
function build(){
  const E=S.E,N=E.length,out={fases:[],losers:[],repNeed:0,needJur:false,rep:null,main:[]};
  if(N<2)return out;
  const pk=(k,a,b)=>{const p=S.picks[k];return a&&b&&p&&(p===a||p===b)?p:null};
  const mk=(k,a,b,bye)=>({k,a,b,bye:!!bye,w:bye?a:pk(k,a,b)});
  let first,P,pre=null;const useRep=S.chaveModo!=='folga'&&!isP2(N);
  if(useRep&&S.chaveModo==='interna'){P=np2(N);const M=P/2,f=Math.max(N-M,Math.min(N>>1,M/2)),g=N-2*f,pool=[],rep=[],ms=[];let ok=true;
    const take=(n,k)=>{const d=S.draws[k];if(!d||d.length!==n||new Set(d).size!==n||!d.every(x=>pool.includes(x)))return null;d.forEach(x=>pool.splice(pool.indexOf(x),1));return d};
    for(let j=0;j<M;j++){const k='p-'+j,ready=ok;let a=null,b=null,need=0;
      if(j<f){a=E[2*j];b=E[2*j+1]}
      else if(j<f+g){a=E[2*f+(j-f)];const d=ready&&take(1,k);if(d)b=d[0];else need=1}
      else{const d=ready&&take(2,k);if(d){a=d[0];b=d[1]}else need=2}
      const m=mk(k,a,b);m.repNames=j<f?[]:(j<f+g?[b]:[a,b]).filter(Boolean);rep.push(...m.repNames);
      if(need){const cnt={};ms.forEach(x=>[x.a,x.b].forEach(q=>{if(q)cnt[q]=(cnt[q]||0)+1}));const aus=new Set(S.ausentes||[]);m.needDraw={n:need,pool:ready?pool.filter(x=>!aus.has(x)):null,cnt,fora:ready?pool.filter(x=>aus.has(x)):[]}}
      if(m.w)pool.push(m.w===a?b:a);else ok=false;ms.push(m)}
    out.rep=[...new Set(rep)];pre=ms;first=[]}
  else if(!useRep){P=np2(N);const m=P/2,b=P-N,bs=new Set();for(let i=0;i<b;i++)bs.add(Math.floor(i*m/b));let q=0;first=[];
    for(let j=0;j<m;j++)first.push(bs.has(j)?[E[q++],null,true]:[E[q++],E[q++]])}
  else{
    const nm=N>>1,f1=[];for(let i=0;i<nm;i++)f1.push(mk('p-'+i,E[2*i],E[2*i+1]));if(N%2)f1.push(mk('p-'+nm,E[N-1],null,true));
    out.fases.push({nome:'1ª fase',tipo:'p',ms:f1});
    const done=f1.every(m=>m.w),W=f1.map(m=>m.w),beat={},losers=[];
    f1.forEach(m=>{if(m.bye||!m.w)return;const l=m.w===m.a?m.b:m.a;losers.push(l);beat[l]=m.w});
    P=np2(W.length);const k=P-W.length;out.repNeed=k;out.losers=losers;let rp=null;
    if(!k)rp=[];
    else if(S.chaveModo==='jurados'){const sel=done?(S.repJur||[]).filter(x=>losers.includes(x)).slice(0,k):[];if(done&&sel.length===k)rp=sel;
      out.needJur=done&&!rp;out.fases.push({nome:'Repescagem · escolhidos',tipo:'j',ms:[],sel,need:k,done})}
    else if(!done)out.fases.push({nome:'Repescagem',tipo:'r',ms:[],ph:`${k} vaga${k>1?'s':''} pros perdedores da 1ª fase`});
    else{let pool=losers.slice(),t=0;
      while(pool&&pool.length>k){const n=Math.min(pool.length-k,pool.length>>1),ms=[];for(let i=0;i<n;i++)ms.push(mk(`r${t}-${i}`,pool[2*i],pool[2*i+1]));
        const rest=pool.slice(2*n);out.fases.push({nome:t?'Repescagem '+(t+1):'Repescagem',tipo:'r',ms:ms.concat(rest.map((x,i)=>mk(`r${t}-x${i}`,x,null,true)))});
        pool=ms.every(m=>m.w)?ms.map(m=>m.w).concat(rest):null;t++}
      if(pool)rp=pool}
    out.rep=rp;
    if(done&&rp){const av=W.slice(),pr=rp.map(x=>{let i=av.findIndex(w=>beat[x]!==w);if(i<0)i=0;return[av.splice(i,1)[0],x]});
      const pw=[];for(let i=0;i<av.length;i+=2)pw.push([av[i],av[i+1]]);const M=P/2,pos=new Set();for(let j=0;j<pr.length;j++)pos.add(Math.floor(j*M/pr.length));
      first=[];let a=0,b=0;for(let j=0;j<M;j++)first.push(pos.has(j)?pr[a++]:pw[b++])}
    else first=Array.from({length:Math.max(1,P/2)},()=>[null,null]);
  }
  let pairs=first,r=0;
  while(pre||pairs.length){const ms=pre||pairs.map((p,i)=>mk(`m${r}-${i}`,p[0],p[1],p[2]));pre=null;if(ms.length===1)ms[0].final=true;
    out.fases.push({nome:nomeFase(ms.length),tipo:'m',ms});out.main.push(ms);if(ms.length===1)break;
    const nx=[];for(let i=0;i<ms.length;i+=2)nx.push([ms[i].w,ms[i+1].w]);pairs=nx;r++}
  const fin=out.main.length?out.main[out.main.length-1][0]:null;out.fin=fin;out.champ=fin&&fin.w;out.vice=out.champ?(fin.w===fin.a?fin.b:fin.a):null;
  return out}
const sorteiaRep=nd=>shuffle(nd.pool).sort((x,y)=>(nd.cnt[x]||0)-(nd.cnt[y]||0)).slice(0,nd.n);
const pendentes=B=>B.fases.flatMap(f=>f.ms).filter(m=>(m.a&&m.b&&!m.w&&!m.bye)||(m.needDraw&&m.needDraw.pool));
function limpar(){for(let g=0;g<30;g++){const B=build();let ch=false;B.fases.forEach(f=>f.ms.forEach(m=>{const p=S.picks[m.k];if(p&&!m.bye&&!(m.a&&m.b&&(p===m.a||p===m.b))){delete S.picks[m.k];ch=true}}));if(!ch)break}}
function pick(k,name,placar){S.hist=(S.hist||[]).filter(x=>x!==k);if(S.picks[k]===name&&placar===undefined){delete S.picks[k];delete S.placar[k];delete S.placarTxt[k]}else{S.picks[k]=name;if(placar)S.placar[k]=placar;else delete S.placar[k];S.hist.push(k)}
  limpar();S.cur=null;T_.i=null;stop();save();render()}
/* desfaz o resultado de uma batalha (ou o último marcado) e volta pra ela */
function desfazer(k){S.hist=(S.hist||[]).filter(x=>S.picks[x]);if(!k)k=S.hist.pop();else S.hist=S.hist.filter(x=>x!==k);if(!k||!S.picks[k])return;
  delete S.picks[k];delete S.placar[k];delete S.placarTxt[k];limpar();S.cur=k;T_.i=null;stop();save();render();$('secBat').scrollIntoView({behavior:'smooth',block:'start'})}
/* repescado foi embora: tira ele dos sorteios e sorteia outro no lugar */
function sorteiaDeNovo(k,nome){S.ausentes=[...new Set([...(S.ausentes||[]),nome])];const antes=S.draws[k]||[];delete S.draws[k];delete S.picks[k];delete S.placar[k];if(S.rounds)delete S.rounds[k];if(S.placarTxt)delete S.placarTxt[k];limpar();
  const m=build().fases.flatMap(f=>f.ms).find(x=>x.k===k);S.cur=k;T_.i=null;stop();
  if(m&&m.needDraw&&m.needDraw.pool){const fica=antes.filter(x=>x!==nome&&m.needDraw.pool.includes(x)),op=m.needDraw.pool.filter(x=>!fica.includes(x));
    if(op.length){const novo=sorteiaRep({n:1,pool:op,cnt:m.needDraw.cnt})[0];S.draws[k]=antes.map(x=>x===nome?novo:x).filter(x=>x===novo||fica.includes(x));msgRep(`${nome} saiu do sorteio. Novo sorteado: ${novo}.`)}
    else{S.draws[k]=fica;msgRep(`${nome} saiu do sorteio, mas não sobrou outro perdedor disponível.`)}}
  save();render()}
let MSG_REP='';const msgRep=t=>{MSG_REP=t};
/* trocar MCs de lugar: toca em um nome e depois em outro */
const TROCA={on:false,sel:null};
function msgTroca(t){const el=$('trocaMsg');el.textContent=t;el.hidden=!t}
function trocaClique(m,n){const rep=(m.repNames||[]).includes(n),novo=!rep&&(m.k.startsWith('p-')||m.k.startsWith('m0-'))&&S.E.includes(n);
  if(!rep&&!novo){msgTroca('Só dá pra trocar na 1ª fase: MC com MC, ou repescado com repescado.');return}
  const it={k:m.k,n,rep};if(!TROCA.sel){TROCA.sel=it;msgTroca(`${n} selecionado. Agora toque em quem vai trocar de lugar com ele.`);render();return}
  const a=TROCA.sel;TROCA.sel=null;if(a.n===n){msgTroca('Troca cancelada.');render();return}
  if(a.rep!==it.rep){msgTroca('Troque MC novo com MC novo, ou repescado com repescado.');render();return}
  const tinha=[a.k,it.k].some(k=>S.picks[k]);
  if(!a.rep){const i=S.E.indexOf(a.n),j=S.E.indexOf(n);[S.E[i],S.E[j]]=[S.E[j],S.E[i]]}
  else{S.draws[a.k]=(S.draws[a.k]||[]).map(x=>x===a.n?n:x===n?a.n:x);if(it.k!==a.k)S.draws[it.k]=(S.draws[it.k]||[]).map(x=>x===n?a.n:x)}
  [a.k,it.k].forEach(k=>{delete S.picks[k];delete S.placar[k];delete S.placarTxt[k];if(S.rounds)delete S.rounds[k]});limpar();
  msgTroca(`${a.n} e ${n} trocaram de lugar.`+(tinha?' O resultado dessas batalhas foi apagado.':''));save();render()}
function simular(){for(let g=0;g<400;g++){const B=build();if(B.needJur){S.repJur=shuffle(B.losers).slice(0,B.repNeed);continue}
  const p=pendentes(B);if(!p.length)break;const m=p[0];if(m.needDraw){S.draws[m.k]=sorteiaRep(m.needDraw);continue}S.picks[m.k]=Math.random()<.5?m.a:m.b;S.placar[m.k]=Math.random()<.65?'direto':'desempate';S.hist=(S.hist||[]).concat(m.k)}
  S.cur=null;T_.i=null;stop();save();render()}

/* ---------- cronômetro ---------- */
const T_={i:null,left:0,int:null,tot:0,fim:0};
/* ---------- som do cronômetro ----------
   O celular só deixa tocar som depois de um toque na tela. Por isso os sons
   são "destravados" no toque em Começar / Testar som e tocados por <audio>
   (que no iPhone toca mesmo com o botão de silencioso). Web Audio fica de reserva. */
function wav(partes){const sr=22050,amostras=[];partes.forEach(([f,dur,vol,tipo,f2])=>{const n=Math.round(sr*dur);for(let i=0;i<n;i++){const t=i/sr,env=Math.min(1,i/(sr*.008),(n-i)/(sr*.02));let v=0;
    if(f){const ph=x=>(t*x)%1;const onda=x=>tipo==='saw'?2*ph(x)-1:tipo==='sq'?(ph(x)<.5?1:-1):Math.sin(2*Math.PI*x*t);v=onda(f);if(f2)v=(v+onda(f2))/2}amostras.push(v*vol*env)}});
  const buf=new ArrayBuffer(44+amostras.length*2),d=new DataView(buf),w=(o,t)=>[...t].forEach((ch,i)=>d.setUint8(o+i,ch.charCodeAt(0)));
  w(0,'RIFF');d.setUint32(4,36+amostras.length*2,true);w(8,'WAVE');w(12,'fmt ');d.setUint32(16,16,true);d.setUint16(20,1,true);d.setUint16(22,1,true);d.setUint32(24,sr,true);d.setUint32(28,sr*2,true);d.setUint16(32,2,true);d.setUint16(34,16,true);w(36,'data');d.setUint32(40,amostras.length*2,true);
  amostras.forEach((v,i)=>d.setInt16(44+i*2,Math.max(-1,Math.min(1,v))*32767,true));return URL.createObjectURL(new Blob([buf],{type:'audio/wav'}))}
const SONS={};
function criaSons(){if(SONS.fim)return;try{
  SONS.tick=new Audio(wav([[1046,.13,.8,'sq']]));
  SONS.dez=new Audio(wav([[880,.12,.8,'sq'],[0,.08,0],[880,.12,.8,'sq']]));
  SONS.fim=new Audio(wav([[466,.45,.95,'saw',587],[0,.1,0],[466,.45,.95,'saw',587],[0,.1,0],[466,.9,.95,'saw',587]]));
  Object.values(SONS).forEach(a=>{a.preload='auto'})}catch(e){}}
let actx;
function destravaSom(){criaSons();Object.values(SONS).forEach(a=>{try{a.muted=true;const pr=a.play();if(pr)pr.then(()=>{a.pause();a.currentTime=0;a.muted=false}).catch(()=>{a.muted=false})}catch(e){}});
  try{actx=actx||new(window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume();const o=actx.createOscillator(),g=actx.createGain();g.gain.value=0;o.connect(g);g.connect(actx.destination);o.start();o.stop(actx.currentTime+.01)}catch(e){}}
function beepWA(nome){try{if(!actx)return;const seq=nome==='fim'?[[466,0,.45],[466,.55,.45],[466,1.1,.9]]:nome==='dez'?[[880,0,.12],[880,.2,.12]]:[[1046,0,.13]];
  seq.forEach(([f,t0,dur])=>{[f,f*1.26].forEach(ff=>{const o=actx.createOscillator(),g=actx.createGain();o.type=nome==='fim'?'sawtooth':'square';o.frequency.value=ff;o.connect(g);g.connect(actx.destination);const t=actx.currentTime+t0;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.35,t+.01);g.gain.setValueAtTime(.35,t+dur-.03);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.start(t);o.stop(t+dur+.02)})})}catch(e){}}
function toca(nome){if(S.somOff)return;const a=SONS[nome];if(!a){beepWA(nome);return}try{a.currentTime=0;a.muted=false;const pr=a.play();if(pr)pr.catch(()=>beepWA(nome))}catch(e){beepWA(nome)}}
function vibra(padrao){if(S.vibrarOff)return;try{navigator.vibrate&&navigator.vibrate(padrao)}catch(e){}}
let WL=null;async function telaAcesa(on){try{if(on){if(!WL&&navigator.wakeLock)WL=await navigator.wakeLock.request('screen')}else if(WL){await WL.release();WL=null}}catch(e){WL=null}}
function stop(){clearInterval(T_.int);T_.int=null;telaAcesa(false)}
const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
function fimTempo(){toca('fim');vibra([500,150,500,150,800]);const t=document.querySelector('.timer');if(t){t.classList.remove('piscar');void t.offsetWidth;t.classList.add('piscar')}}
function tick(){const l=Math.max(0,Math.ceil((T_.fim-Date.now())/1000));if(l===T_.left)return;T_.left=l;
  if(l===0){stop();fimTempo()}else if(l<=3){toca('tick');vibra(80)}else if(l===10&&T_.tot>15&&!S.aviso10Off){toca('dez');vibra([120,80,120])}drawClock()}
function drawClock(){const c=$('clock');if(!c)return;c.textContent=fmt(T_.left);c.classList.toggle('end',T_.left===0&&T_.tot>0);
  const b=$('play');if(b)b.textContent=T_.int?'Pausar':(T_.left===T_.tot?'Começar':T_.left===0?'De novo':'Continuar')}

/* ---------- interface ---------- */
function setSeg(id,v){document.querySelectorAll('#'+id+' button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===String(v)))}
function render(){
  setSeg('modo',S.modo);setSeg('sorteio',S.sorteio?1:0);setSeg('naoFecha',S.naoFecha);
  $('formato').value=S.formato;$('fdesc').textContent=descFmt(getFmt(S.formato));$('customBox').hidden=S.formato!=='custom';
  $('fDelBox').hidden=!S.formato.startsWith('u:');
  $('final').value=S.final;$('usaTema').checked=S.usaTema||!!getFmt(S.formato).tema;$('usaTema').disabled=!!getFmt(S.formato).tema;
  if(document.activeElement!==$('nomes'))$('nomes').value=S.nomes;
  $('prontosBox').hidden=S.modo==='solo';$('prontos').checked=S.prontos;
  contar();
  $('sorteioHint').textContent=S.sorteio?'O app embaralha a lista ao gerar a chave.':'Sorteou fora do app? Digite na ordem: o 1º enfrenta o 2º, o 3º enfrenta o 4º, e assim por diante.';
  $('aviso').hidden=!S.aviso;$('aviso').textContent=S.aviso;

  const lista=S.ver?S.ver==='lista':window.innerWidth<640;setSeg('verChave',lista?'lista':'chave');$('bracket').classList.toggle('lista',lista);
  const B=build();const pend=pendentes(B);
  let cur=pend.find(m=>m.k===S.cur)||pend[0]||null;
  /* chave */
  const br=$('bracket');br.innerHTML='';let num=0;const numOf={};
  if(!S.E.length)br.innerHTML='<p class="hint">Gere a chave pra ver os confrontos.</p>';
  B.fases.forEach(f=>{const col=document.createElement('div');col.className='col'+(f.tipo==='r'||f.tipo==='j'?' rep':'');col.innerHTML='<h3>'+esc(f.nome)+'</h3>';
    if(f.tipo==='j'){const d=document.createElement('div');d.className='match';
      d.innerHTML=`<div class="mh"><span>Voltam ${f.need}</span>${f.sel.length?'<button data-refaz>Refazer</button>':''}</div>`+
        (f.sel.length?f.sel.map(n=>`<button class="slot w" disabled style="color:var(--spray-ink);font-style:normal;font-weight:600">${esc(n)}</button>`).join(''):`<div class="ph">${f.done?'Jurados escolhendo…':'Depois da 1ª fase'}</div>`);
      col.appendChild(d)}
    else if(f.ph){const d=document.createElement('div');d.className='match';d.innerHTML=`<div class="ph">${esc(f.ph)}</div>`;col.appendChild(d)}
    f.ms.forEach(m=>{const d=document.createElement('div');const isCur=cur&&cur.k===m.k;d.className='match'+(isCur?' cur':'');
      let head;if(m.bye)head='<span>'+(f.tipo==='m'?'Folga':'Passa direto')+'</span>';else{num++;numOf[m.k]=num;const pt=S.placarTxt&&S.placarTxt[m.k];head=`<span>Batalha ${num}${m.w&&pt?' · '+pt:S.placar[m.k]==='desempate'&&m.w?' · 3º':''}</span><span style="display:flex;gap:10px">`+(m.w?`<button data-desf="${m.k}">Desfazer</button>`:'')+(!m.w&&(m.repNames||[]).length&&S.draws[m.k]?`<button data-tsort="${m.k}">Trocar sorteio</button>`:'')+(m.a&&m.b&&!m.w&&!isCur?`<button data-cur="${m.k}">Chamar</button>`:'')+'</span>'}
      d.innerHTML=`<div class="mh">${head}</div>`+(m.bye?`<button class="slot w" disabled style="color:var(--spray-ink);font-style:normal;font-weight:600">${esc(m.a)}</button>`:
        [m.a,m.b].map(x=>x?`<button class="slot${m.w?(m.w===x?' w':' l'):''}${TROCA.on?' troca':''}${TROCA.sel&&TROCA.sel.k===m.k&&TROCA.sel.n===x?' sel':''}" data-k="${m.k}" data-n="${esc(x)}">${esc(x)}${(m.repNames||[]).includes(x)?' <small>· repescado</small>':''}</button>`:`<button class="slot" disabled>${m.needDraw?'perdedor sorteado':'a definir'}</button>`).join(''));
      col.appendChild(d)});
    br.appendChild(col)});
  br.querySelectorAll('.slot[data-k]').forEach(b=>b.onclick=()=>{const m=B.fases.flatMap(f=>f.ms).find(x=>x.k===b.dataset.k);if(!m)return;if(TROCA.on){trocaClique(m,b.dataset.n);return}if(m.a&&m.b)pick(b.dataset.k,b.dataset.n)});
  br.querySelectorAll('[data-desf]').forEach(b=>b.onclick=()=>desfazer(b.dataset.desf));
  br.querySelectorAll('[data-tsort]').forEach(b=>b.onclick=()=>{delete S.draws[b.dataset.tsort];limpar();S.cur=b.dataset.tsort;save();render();$('secBat').scrollIntoView({behavior:'smooth',block:'start'})});
  $('desfazer').disabled=!(S.hist||[]).some(k=>S.picks[k]);$('trocaBtn').setAttribute('aria-pressed',TROCA.on);$('trocaBtn').textContent=TROCA.on?'Terminar trocas':'Trocar MCs de lugar';
  br.querySelectorAll('[data-cur]').forEach(b=>b.onclick=()=>{S.cur=b.dataset.cur;T_.i=null;stop();save();render();$('secBat').scrollIntoView({behavior:'smooth',block:'start'})});
  br.querySelectorAll('[data-refaz]').forEach(b=>b.onclick=()=>{S.repJur=[];limpar();save();render()});
  $('champ').innerHTML=B.champ?`<div class="champ"><span class="lbl">${esc(tituloAuto())}</span><div class="n"><span>${esc(B.champ)}</span></div><div class="row" style="justify-content:center"><button class="btn main sm" id="irArte">Gerar arte do campeão</button></div></div>`:'';
  if(B.champ)$('irArte').onclick=()=>{$('secArte').scrollIntoView({behavior:'smooth',block:'start'});gerarArte(false)};

  /* batalha atual */
  const bb=$('batBody');
  if(B.needJur){const sel=S.repJur.filter(x=>B.losers.includes(x));
    bb.innerHTML=`<div style="display:grid;gap:10px"><span class="eyebrow">Repescagem · escolhidos</span><p style="margin:0">A 1ª fase acabou. Toque nos <b>${B.repNeed}</b> perdedores escolhidos (pelos jurados ou pela plateia) pra voltar:</p>
      <div class="row">${B.losers.map(n=>`<button class="fase" data-j="${esc(n)}" aria-pressed="${sel.includes(n)}">${esc(n)}</button>`).join('')}</div>
      <p class="hint">${sel.length} de ${B.repNeed} escolhido${B.repNeed>1?'s':''}</p></div>`;
    bb.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{const n=b.dataset.j;let s=S.repJur.filter(x=>B.losers.includes(x));
      if(s.includes(n))s=s.filter(x=>x!==n);else if(s.length<B.repNeed)s.push(n);S.repJur=s;save();render()});
    artState(B);return}
  const podeDesf=(S.hist||[]).some(k=>S.picks[k]),btnDesf=podeDesf?'<button class="btn sm" data-desfult>↩ Desfazer último resultado</button>':'';
  if(!cur){bb.innerHTML='<div style="display:grid;gap:10px"><p class="hint">'+(S.E.length?(B.champ?'Chave encerrada. Gere a arte do campeão lá embaixo.':'Nenhuma batalha pendente.'):'Gere a chave primeiro.')+'</p><div class="row">'+btnDesf+'</div></div>';bb.querySelectorAll('[data-desfult]').forEach(b=>b.onclick=()=>desfazer());artState(B);return}
  const fase=B.fases.find(f=>f.ms.includes(cur));
  if(cur.needDraw){const nd=cur.needDraw,sel=(S.draws[cur.k]||[]).filter(x=>nd.pool.includes(x)),num=B.fases.flatMap(f=>f.ms).filter(m=>!m.bye).indexOf(cur)+1;
    bb.innerHTML=`<div style="display:grid;gap:12px"><span class="eyebrow">${esc(fase.nome)} · Batalha ${num} · repescagem</span>
      <p style="margin:0">${nd.n===1?`<b>${esc(cur.a)}</b> ainda não rimou e enfrenta um perdedor sorteado.`:'Batalha entre dois perdedores sorteados.'}</p>
      <p class="hint" style="margin:0">O sorteio do app dá preferência a quem ainda não voltou pela repescagem.</p><div class="row"><button class="btn main" id="sortRep">Sortear ${nd.n===1?'perdedor':'os dois perdedores'}</button></div>
      <div><span class="lbl">Ou toque ${nd.n===1?'no perdedor sorteado':'nos 2 perdedores sorteados'} fora do app</span><div class="row">${nd.pool.map(n=>`<button class="fase" data-d="${esc(n)}" aria-pressed="${sel.includes(n)}">${esc(n)}</button>`).join('')}</div></div>
      ${nd.pool.length<nd.n?'<p class="warn">Não sobrou perdedor disponível pra sortear. Se alguém voltou, devolva ao sorteio abaixo.</p>':''}
      <details class="manual"${(nd.fora||[]).length?' open':''}><summary>Alguém foi embora? Tire do sorteio</summary><div class="row" style="margin-top:8px">${nd.pool.map(n=>`<button class="fase" data-fora="${esc(n)}">${esc(n)} foi embora</button>`).join('')}</div>
        ${(nd.fora||[]).length?`<p class="hint" style="margin:8px 0 4px">Fora do sorteio (toque pra devolver):</p><div class="row">${nd.fora.map(n=>`<button class="fase" aria-pressed="true" data-volta="${esc(n)}">${esc(n)}</button>`).join('')}</div>`:''}</details></div>`;
    bb.querySelectorAll('[data-fora]').forEach(b=>b.onclick=()=>{S.ausentes=[...new Set([...(S.ausentes||[]),b.dataset.fora])];if(S.draws[cur.k])S.draws[cur.k]=S.draws[cur.k].filter(x=>x!==b.dataset.fora);save();render()});
    bb.querySelectorAll('[data-volta]').forEach(b=>b.onclick=()=>{S.ausentes=(S.ausentes||[]).filter(x=>x!==b.dataset.volta);save();render()});
    $('sortRep').onclick=()=>{S.draws[cur.k]=sorteiaRep(nd);T_.i=null;save();render()};
    bb.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const n=b.dataset.d;let s=sel.slice();if(s.includes(n))s=s.filter(x=>x!==n);else if(s.length<nd.n)s.push(n);S.draws[cur.k]=s;T_.i=null;save();render()});
    artState(B);return}
  let[Am,Bm]=[cur.a,cur.b];if(S.inv[cur.k])[Am,Bm]=[Bm,Am];
  const f=getFmt(cur.final&&S.final?S.final:S.formato);const rounds=fasesDe(f,Am,Bm);const flat=[];
  const usaTema=S.usaTema||!!f.tema;
  const rv=(S.rounds&&S.rounds[cur.k])||[],nN=f.rounds.length,need=Math.floor(nN/2)+1;let wa=0,wbb=0;for(let i=0;i<nN;i++){if(rv[i]===Am)wa++;else if(rv[i]===Bm)wbb++}
  const empate=f.des&&wa+wbb===nN&&wa===wbb;let res=null;
  if(wa>=need)res={w:Am,pl:'direto',txt:wa+'×'+wbb};else if(wbb>=need)res={w:Bm,pl:'direto',txt:wbb+'×'+wa};else if(empate&&(rv[nN]===Am||rv[nN]===Bm))res={w:rv[nN],pl:'desempate',txt:(wa+1)+'×'+wa};
  const rvBtns=ri=>{const ehDes=f.des&&ri===nN;if(ehDes&&!empate)return'<p class="hint" style="margin:0">Só se empatar.</p>';return`<div class="row" style="gap:6px"><span class="hint">Venceu o round:</span>${[Am,Bm].map(n=>`<button class="fase" data-rv="${ri}" data-n="${esc(n)}" aria-pressed="${rv[ri]===n}">${esc(n)}</button>`).join('')}</div>`};
  const wb=n=>f.des?`<button class="btn" data-w="${esc(n)}" data-p="direto">Venceu direto</button><button class="btn" data-w="${esc(n)}" data-p="desempate">Venceu no ${f.rounds.length+1}º</button>`:`<button class="btn" data-w="${esc(n)}" data-p="direto">Venceu</button>`;
  bb.innerHTML=`<div style="display:grid;gap:14px">
    <span class="eyebrow">${esc(fase.nome)} · Batalha ${numOf[cur.k]||''}${cur.final&&S.final?' · '+esc(getFmt(S.final).nome):''}</span>
    <div class="vs"><div class="mc">${esc(Am)}</div><div class="x">VS</div><div class="mc">${esc(Bm)}</div></div>
    ${MSG_REP?`<p class="warn">${esc(MSG_REP)}</p>`:''}
    ${(cur.repNames||[]).length&&S.draws[cur.k]?`<div><span class="lbl">Repescado não está mais aí?</span><div class="row">${cur.repNames.map(n=>`<button class="btn sm" data-aus="${esc(n)}">${esc(n)} foi embora · sortear outro</button>`).join('')}</div></div>`:''}
    <div><span class="lbl">Quem começa</span><div class="row"><div class="seg" style="flex:1 1 220px"><button data-ini="a" aria-pressed="true">${esc(Am)}</button><button data-ini="b" aria-pressed="false">${esc(Bm)}</button></div><button class="btn sm" id="sortCome">Sortear</button></div></div>
    ${usaTema?`<div class="tema"><div><label class="lbl" for="temaIn">Tema</label><input id="temaIn" type="text" placeholder="Digite ou sorteie" value="${esc(S.temas[cur.k]||'')}"></div><button class="btn" id="sortTema">Sortear tema</button></div>`:''}
    <div class="fases">${rounds.map((rd,ri)=>`<div class="rd"><b>${rd.r}</b><div class="row">${rd.f.map(x=>{flat.push(x);const i=flat.length-1;
      return`<button class="fase" data-i="${i}">${esc(x.t)} · ${x.s?x.s+'s':'sem tempo'}</button>`}).join('')}</div>${rvBtns(ri)}</div>`).join('')}</div>
    <div class="timer"><div class="who" id="who"></div><div class="clock" id="clock">0:00</div>
      <div class="row" style="justify-content:center"><button class="btn main" id="play">Começar</button><button class="btn" id="zera">Zerar</button><button class="btn" id="prox">Próximo</button></div>
      <div class="row" style="justify-content:center;gap:14px"><label class="chk"><input type="checkbox" id="somOff"> Som</label><label class="chk"><input type="checkbox" id="vibrarOff"> Vibrar</label><label class="chk"><input type="checkbox" id="aviso10Off"> Aviso nos 10 s</label><button class="btn sm" id="testeSom">Testar som</button></div></div>
    ${res?`<div class="resultado"><span><b>${esc(res.w)}</b> venceu ${res.txt}${res.pl==='desempate'?' no desempate':''}</span><button class="btn main" id="confirmaRes">Confirmar resultado</button></div>`:''}
    <details class="manual"${res?'':' open'}><summary>Marcar o vencedor direto (sem os rounds)</summary><div class="wins" style="margin-top:10px"><div><b>${esc(Am)}</b>${wb(Am)}</div><div><b>${esc(Bm)}</b>${wb(Bm)}</div></div></details>
    <div class="row">${btnDesf}</div></div>`;
  const setFase=i=>{stop();T_.i=i;const x=flat[i];T_.tot=T_.left=x.s||0;
    bb.querySelectorAll('.fase[data-i]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.i===i));
    $('who').textContent=x.t+(x.s?'':' · sem cronômetro, conte as rimas');$('play').disabled=!x.s;drawClock()};
  bb.querySelectorAll('.fase[data-i]').forEach(b=>b.onclick=()=>setFase(+b.dataset.i));
  if(T_.int&&T_.i!=null&&T_.i<flat.length){bb.querySelectorAll('.fase[data-i]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.i===T_.i));$('who').textContent=flat[T_.i].t;drawClock()}else setFase(T_.i!=null&&T_.i<flat.length?T_.i:0);
  bb.querySelectorAll('[data-rv]').forEach(b=>b.onclick=()=>{S.rounds=S.rounds||{};const arr=S.rounds[cur.k]=S.rounds[cur.k]||[],i=+b.dataset.rv;arr[i]=arr[i]===b.dataset.n?null:b.dataset.n;S.cur=cur.k;save();render()});
  if(res)$('confirmaRes').onclick=()=>{S.placarTxt=S.placarTxt||{};S.placarTxt[cur.k]=res.txt;pick(cur.k,res.w,res.pl)};
  bb.querySelectorAll('[data-desfult]').forEach(b=>b.onclick=()=>desfazer());
  bb.querySelectorAll('[data-aus]').forEach(b=>b.onclick=()=>sorteiaDeNovo(cur.k,b.dataset.aus));MSG_REP='';
  $('play').onclick=()=>{destravaSom();if(T_.int)stop();else{if(T_.left===0)T_.left=T_.tot;if(!T_.tot)return;const t=document.querySelector('.timer');if(t)t.classList.remove('piscar');T_.fim=Date.now()+T_.left*1000;T_.int=setInterval(tick,200);telaAcesa(true)}drawClock()};
  $('testeSom').onclick=()=>{destravaSom();setTimeout(()=>fimTempo(),150)};
  ['somOff','vibrarOff','aviso10Off'].forEach(k=>{const el=$(k);el.checked=!S[k];el.onchange=()=>{S[k]=!el.checked;save()}});
  $('zera').onclick=()=>{stop();T_.left=T_.tot;drawClock()};
  $('prox').onclick=()=>setFase(Math.min(T_.i+1,flat.length-1));
  const setIni=quem=>{const inv=!!S.inv[cur.k];const atualA=inv?cur.b:cur.a;const alvo=quem==='a'?Am:Bm;if(alvo!==atualA){S.inv[cur.k]=!inv}S.cur=cur.k;T_.i=null;stop();save();render()};
  bb.querySelectorAll('[data-ini]').forEach(b=>b.onclick=()=>setIni(b.dataset.ini));
  $('sortCome').onclick=()=>{S.inv[cur.k]=Math.random()<.5;S.cur=cur.k;T_.i=null;stop();save();render()};
  if(usaTema){$('temaIn').oninput=e=>{S.temas[cur.k]=e.target.value;save()};$('sortTema').onclick=()=>{const usados=Object.values(S.temas);let op=TEMAS.filter(t=>!usados.includes(t));if(!op.length)op=TEMAS;S.temas[cur.k]=op[Math.random()*op.length|0];$('temaIn').value=S.temas[cur.k];save()}}
  bb.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{if(S.placarTxt)delete S.placarTxt[cur.k];pick(cur.k,b.dataset.w,b.dataset.p)});
  artState(B);
}
function contar(){const n=qtd();$('cont').textContent=n+' '+und()+(S.exemplo?' · nomes de exemplo, troque pelos seus':'');$('plano').textContent=plano(n,S.naoFecha)}
const tituloAuto=()=>A.titulo.trim()||({solo:'CAMPEÃO',dupla:'DUPLA CAMPEÃ',trio:'TRIO CAMPEÃO'}[S.modo]);

/* ---------- eventos da configuração ---------- */
function fillSelects(){const all=Object.entries(allFmts()),og=(lab,list)=>list.length?`<optgroup label="${lab}">${list.map(([k,f])=>`<option value="${k}">${esc(f.nome)}</option>`).join('')}</optgroup>`:'';
  const casa=all.filter(([,f])=>f.grupo==='casa'),outros=all.filter(([,f])=>!f.grupo),meus=all.filter(([,f])=>f.grupo==='meus'),cus=all.filter(([,f])=>f.grupo==='custom');
  $('formato').innerHTML=og('Modelos da batalha',casa)+og('Meus modelos',meus)+og('Outros formatos',outros)+og('Montar',cus);
  $('final').innerHTML='<option value="">Igual às outras fases</option>'+og('Modelos da batalha',casa)+og('Meus modelos',meus)+og('Outros formatos',outros)+og('Montar',cus);
  $('cBase').innerHTML='<option value="">Escolha um modelo pra copiar…</option>'+og('Modelos da batalha',casa)+og('Meus modelos',meus)+og('Outros formatos',outros)}
fillSelects();
/* editor do personalizado */
const DEF={tempo:30,bv:45,rimas:'4×4 - 2×2 - 2×2'};
function rowHTML(rd,i,des){const v=rd.tipo==='rimas'?rd.txt:rd.s;
  return`<div class="rrow" data-i="${i}"${des?' data-des="1"':''}><b>${des?'Desempate':(i+1)+'º round'}</b><select class="rt" aria-label="Tipo do round"><option value="tempo"${rd.tipo==='tempo'?' selected':''}>Tempo pra cada</option><option value="bv"${rd.tipo==='bv'?' selected':''}>Bate-volta com tempo</option><option value="rimas"${rd.tipo==='rimas'?' selected':''}>Rimas</option></select><input class="rv" type="text" aria-label="Valor" value="${esc(v)}"${rd.tipo==='rimas'?'':' inputmode="numeric"'}>${des?'':`<button class="btn sm rx" aria-label="Remover round"${S.custom.rounds.length<2?' disabled':''}>Remover</button>`}</div>`}
function editor(){const c=S.custom;$('cRows').innerHTML=c.rounds.map((rd,i)=>rowHTML(rd,i)).join('');$('cDesOn').checked=!!c.des;$('cDes').innerHTML=c.des?rowHTML(c.des,0,true):'';}
const lerRow=(el)=>{let t=el.querySelector('.rt').value;const v=el.querySelector('.rv').value;if(t!=='rimas'&&/\d\s*[xX×]\s*\d/.test(v))t='rimas';return t==='rimas'?RM(normR(v)||'4×4'):(t==='tempo'?T:BV)(clamp(parseInt(v),5,300,DEF[t]))};
function lerEditor(){S.custom={rounds:[...$('cRows').querySelectorAll('.rrow')].map(lerRow),des:$('cDesOn').checked&&$('cDes').firstElementChild?lerRow($('cDes').firstElementChild):null};save();
  $('fdesc').textContent=descFmt(getFmt(S.formato))}
['cRows','cDes'].forEach(id=>{const box=$(id);
  box.addEventListener('input',e=>{if(e.target.classList.contains('rv'))lerEditor()});
  box.addEventListener('change',e=>{if(e.target.classList.contains('rt')){e.target.parentElement.querySelector('.rv').value=DEF[e.target.value];lerEditor();editor()}else if(e.target.classList.contains('rv')){lerEditor();editor()}});
  box.addEventListener('click',e=>{if(e.target.classList.contains('rx')){S.custom.rounds.splice(+e.target.parentElement.dataset.i,1);save();editor();render()}})});
$('cAdd').onclick=()=>{const l=S.custom.rounds[S.custom.rounds.length-1]||T(30);S.custom.rounds.push(clone(l));save();editor();render()};
$('cDesOn').onchange=e=>{S.custom.des=e.target.checked?RM('2×2×2×2'):null;save();editor();render()};
$('cBase').onchange=e=>{if(!e.target.value)return;const f=getFmt(e.target.value);S.custom=clone({rounds:f.rounds,des:f.des});e.target.value='';save();editor();render()};
$('cSalvar').onclick=()=>{const nome=$('cNome').value.trim();if(!nome){$('cNome').focus();$('cNome').placeholder='Dê um nome pro modelo antes de salvar';return}
  const id=Date.now().toString(36);S.meus[id]=clone({nome,rounds:S.custom.rounds,des:S.custom.des});S.formato='u:'+id;$('cNome').value='';save();fillSelects();render()};
$('fDel').onclick=()=>{const id=S.formato.slice(2);delete S.meus[id];if(S.final===S.formato)S.final='';S.formato='m1';save();fillSelects();render()};
editor();
document.querySelectorAll('#modo button').forEach(b=>b.onclick=()=>{S.modo=b.dataset.v;save();render()});
document.querySelectorAll('#sorteio button').forEach(b=>b.onclick=()=>{S.sorteio=b.dataset.v==='1';save();render()});
document.querySelectorAll('#naoFecha button').forEach(b=>b.onclick=()=>{S.naoFecha=b.dataset.v;save();render()});
$('formato').onchange=e=>{S.formato=e.target.value;T_.i=null;stop();save();render()};
$('final').onchange=e=>{S.final=e.target.value;T_.i=null;stop();save();render()};
$('usaTema').onchange=e=>{S.usaTema=e.target.checked;save();render()};
const clamp=(v,a,b,d)=>{v=+v;return isFinite(v)&&v>0?Math.min(b,Math.max(a,v)):d};
$('nomes').oninput=e=>{S.nomes=e.target.value;S.exemplo=false;save();contar()};
$('prontos').onchange=e=>{S.prontos=e.target.checked;save();render()};
$('gerar').onclick=()=>{S.exemplo=S.exemplo&&S.nomes===EX.join('\n');montar()};
$('simular').onclick=simular;
$('desfazer').onclick=()=>desfazer();
$('trocaBtn').onclick=()=>{TROCA.on=!TROCA.on;TROCA.sel=null;msgTroca(TROCA.on?'Toque em um MC e depois em outro pra trocar os dois de lugar. Funciona na 1ª fase.':'');render()};
document.querySelectorAll('#verChave button').forEach(b=>b.onclick=()=>{S.ver=b.dataset.v;save();render()});

