/* =====================================================================
   Chave de Rima · arte.js
   Layouts (posição de cada elemento em % da largura/altura), elementos
   do cartaz, chave da arte, geração de imagem, banco .zip e controles.
   ===================================================================== */

/* ---------- layouts da casa (inspirados nas referências) ---------- */
const LAYOUTS_CASA={
  div:{
    cartaz_quebrada:{nome:'Cartaz da quebrada (título gigante, faixas e skyline)',fundo:'pordosol',letras:{titulo:'throwup_duas'},formatos:{
      feed:{elementos:{logo:{area:[3,2.5,13,9]},selo_edicao:{area:[26,2.6,48,6.2]},nome_batalha:{area:[7,9,86,28]},data_hora:{area:[12,38,76,9]},local:{area:[15,48,70,7]},premio:{area:[19,56,62,10.5]},infos:{area:[24,68,52,5.5]},fotos_mcs:{area:[22,75,56,14],fallback:'nada'},rodape:{area:[8,92.5,84,5.5]},
        desenhos_decorativos:[{nome:'spray',area:[2,12,15,20],rotacao:-14},{nome:'mao_com_microfone',area:[81,10,17,25],rotacao:12},{nome:'silhueta_esquerda',area:[-6,57,34,43]},{nome:'silhueta_direita',area:[72,57,34,43]},{nome:'skyline',area:[0,83,100,17]},{nome:'coroa_rabisco',area:[78,4,10,6]}]}},
      story:{elementos:{logo:{area:[3,2,13,6]},selo_edicao:{area:[24,3.5,52,4.6]},nome_batalha:{area:[6,8.6,88,22]},data_hora:{area:[10,31.5,80,7]},local:{area:[13,39.5,74,5.6]},premio:{area:[17,46,66,8.5]},infos:{area:[22,56,56,4.5]},fotos_mcs:{area:[16,62,68,17],fallback:'nada'},rodape:{area:[8,93,84,4.2]},
        desenhos_decorativos:[{nome:'spray',area:[2,10,15,14],rotacao:-14},{nome:'mao_com_microfone',area:[81,9,17,17],rotacao:12},{nome:'silhueta_esquerda',area:[-8,63,38,37]},{nome:'silhueta_direita',area:[70,63,38,37]},{nome:'skyline',area:[0,85,100,15]},{nome:'coroa_rabisco',area:[78,4,10,4]}]}},
      quadrado:{elementos:{logo:{area:[3,2,12,10]},selo_edicao:{area:[28,2.5,44,7.2]},nome_batalha:{area:[9,10.5,82,27]},data_hora:{area:[14,38.5,72,9.5]},local:{area:[17,49,66,8]},premio:{area:[21,58.5,58,12]},infos:{area:[26,72,48,6.5]},rodape:{area:[10,91.5,80,6.5]},
        desenhos_decorativos:[{nome:'spray',area:[1,14,15,21],rotacao:-14},{nome:'mao_com_microfone',area:[83,12,16,26],rotacao:12},{nome:'silhueta_esquerda',area:[-7,58,30,42]},{nome:'silhueta_direita',area:[77,58,30,42]},{nome:'skyline',area:[0,84,100,16]}]}}}},
    colagem_lambe:{nome:'Colagem lambe-lambe (fotos na lateral)',fundo:'lambe_lambe_rasgado',letras:{titulo:'wild_tinta'},formatos:{
      feed:{elementos:{fotos_mcs:{area:[2,3,25,86],fallback:'silhueta'},selo_edicao:{area:[30,2.6,32,7]},logo:{area:[88,1.5,10,8]},nome_batalha:{area:[29,10,69,27]},data_hora:{area:[30,38,67,8.5]},local:{area:[30,47.5,67,7]},premio:{area:[33,55.5,61,11]},infos:{area:[30,68,67,5]},mcs_lista:{area:[30,73.5,67,5]},estouro:{area:[55,79,42,13]},rodape:{area:[28,94,70,4.6]},
        desenhos_decorativos:[{nome:'megafone',area:[64,1,22,12],rotacao:-30},{nome:'toca_discos',area:[0,84,29,15],rotacao:-8},{nome:'spray',area:[86,77,12,20],rotacao:16}]}},
      story:{elementos:{fotos_mcs:{area:[2,3,27,80],fallback:'silhueta'},selo_edicao:{area:[32,2.5,34,5]},logo:{area:[88,1.5,10,6]},nome_batalha:{area:[31,8.5,67,22]},data_hora:{area:[32,31.5,65,6.5]},local:{area:[32,38.5,65,5.5]},premio:{area:[34,45,61,8.5]},infos:{area:[32,55,65,4]},mcs_lista:{area:[32,60,65,4]},estouro:{area:[50,66,46,11]},rodape:{area:[36,94,62,3.6]},
        desenhos_decorativos:[{nome:'megafone',area:[66,1.5,22,8],rotacao:-30},{nome:'toca_discos',area:[0,84,35,13],rotacao:-8},{nome:'spray',area:[84,80,13,16],rotacao:16}]}},
      quadrado:{elementos:{fotos_mcs:{area:[2,3,24,84],fallback:'silhueta'},selo_edicao:{area:[30,2.5,30,7.5]},logo:{area:[88,1.5,10,9]},nome_batalha:{area:[28,10.5,70,27]},data_hora:{area:[29,39,69,9]},local:{area:[29,49,69,7.5]},premio:{area:[32,57.5,63,11.5]},infos:{area:[29,70,69,5.5]},estouro:{area:[58,77,38,14]},rodape:{area:[28,93,70,5.5]},
        desenhos_decorativos:[{nome:'megafone',area:[66,1,22,13],rotacao:-30},{nome:'toca_discos',area:[0,86,25,13],rotacao:-8},{nome:'spray',area:[88,76,10,19],rotacao:16}]}}}}
  },
  campeao:{
    campeao_neon:{nome:'Campeão neon (nome cromado e chave em painel)',fundo:'noite',letras:{titulo:'pincel',campeao:'wild_cromo'},formatos:{
      feed:{elementos:{logo:{area:[3,2,12,9]},nome_batalha:{area:[14,1.4,72,8.6]},faixa_info:{area:[10,10.6,80,4.8]},titulo_campeao:{area:[28,16.6,44,6.8]},nome_campeao:{area:[9,23.4,82,21]},frase_resultado:{area:[14,44.6,72,6]},chave:{area:[4,51.6,92,37],painel:true},repescagem:{area:[20,89.4,60,4.6]},rodape:{area:[4,95.4,92,3.6]},
        desenhos_decorativos:[{nome:'mao_com_microfone',area:[81,12,18,27],rotacao:12},{nome:'corrente',area:[-2,19,22,15]}]}},
      story:{elementos:{logo:{area:[3,1.5,12,6]},nome_batalha:{area:[12,1.8,76,6.6]},faixa_info:{area:[8,8.9,84,3.6]},titulo_campeao:{area:[27,13.6,46,5.2]},nome_campeao:{area:[7,19.2,86,17]},frase_resultado:{area:[12,36.6,76,4.6]},chave:{area:[3,42.6,94,44],painel:true},repescagem:{area:[18,88,64,3.6]},rodape:{area:[4,93.8,92,2.8]},
        desenhos_decorativos:[{nome:'mao_com_microfone',area:[84,8.6,15,13],rotacao:12},{nome:'corrente',area:[-2,15,22,11]}]}},
      quadrado:{elementos:{logo:{area:[3,2,11,10]},nome_batalha:{area:[14,1.4,72,9]},faixa_info:{area:[10,11,80,5.4]},titulo_campeao:{area:[30,17.4,40,7]},nome_campeao:{area:[11,24.2,78,20]},frase_resultado:{area:[16,44.2,68,6.4]},chave:{area:[4,51.2,92,37],painel:false},repescagem:{area:[22,89,56,5]},rodape:{area:[4,95,92,4]},
        desenhos_decorativos:[{nome:'mao_com_microfone',area:[83,13,16,27],rotacao:12},{nome:'corrente',area:[-2,20,20,15]}]}}}},
    campeao_foto:{nome:'Campeão com foto (polaroid ao lado do nome)',fundo:'porta',letras:{titulo:'pincel',campeao:'bloco_3d'},formatos:{
      feed:{elementos:{logo:{area:[3,2,12,9]},nome_batalha:{area:[14,1.4,72,8.6]},faixa_info:{area:[10,10.6,80,4.8]},foto_campeao:{area:[4,16,31,33],fallback:'mic'},titulo_campeao:{area:[40,16.8,50,6.4]},nome_campeao:{area:[37,23.4,60,18.6]},frase_resultado:{area:[37,42.6,60,5.8]},chave:{area:[4,51.6,92,37],painel:true},repescagem:{area:[20,89.4,60,4.6]},rodape:{area:[4,95.4,92,3.6]},desenhos_decorativos:[]}},
      story:{elementos:{logo:{area:[3,1.5,12,6]},nome_batalha:{area:[12,1.8,76,6.6]},faixa_info:{area:[8,8.9,84,3.6]},foto_campeao:{area:[5,13.6,42,23],fallback:'mic'},titulo_campeao:{area:[50,14.2,46,4.6]},nome_campeao:{area:[47,19.6,51,12.6]},frase_resultado:{area:[47,32.8,51,4.4]},chave:{area:[3,40.2,94,46],painel:true},repescagem:{area:[18,87.8,64,3.6]},rodape:{area:[4,93.8,92,2.8]},desenhos_decorativos:[{nome:'caixa_de_som_empilhada',area:[80,90,18,9]}]}},
      quadrado:{elementos:{logo:{area:[3,2,11,10]},nome_batalha:{area:[14,1.4,72,9]},faixa_info:{area:[10,11,80,5.4]},foto_campeao:{area:[4,16.5,27,32],fallback:'mic'},titulo_campeao:{area:[36,17.4,54,7]},nome_campeao:{area:[33,24.6,64,17]},frase_resultado:{area:[33,42.6,64,6]},chave:{area:[4,51,92,37.4],painel:false},repescagem:{area:[22,89,56,5]},rodape:{area:[4,95,92,4]},desenhos_decorativos:[]}}}}
  }
};
LAYOUTS_CASA.chave={
  chave_painel:{nome:'Chave grande em painel',fundo:'noite',letras:{titulo:'pincel'},formatos:{
    feed:{elementos:{logo:{area:[3,2,12,9]},nome_batalha:{area:[14,1.6,72,10]},faixa_info:{area:[10,12.4,80,4.8]},titulo_chave:{area:[26,18.2,48,6.2]},chave:{area:[3,25.4,94,63.4],painel:true},repescagem:{area:[20,89.6,60,4.4]},rodape:{area:[4,95,92,4]},
      desenhos_decorativos:[{nome:'mao_com_microfone',area:[85,13,13,12],rotacao:12},{nome:'spray',area:[2,13,10,12],rotacao:-14}]}},
    story:{elementos:{logo:{area:[3,1.5,12,6]},nome_batalha:{area:[12,2,76,7.5]},faixa_info:{area:[8,10,84,3.6]},titulo_chave:{area:[26,14.6,48,4.6]},chave:{area:[3,20.2,94,67.8],painel:true},repescagem:{area:[18,89,64,3.6]},rodape:{area:[4,94,92,3]},
      desenhos_decorativos:[{nome:'mao_com_microfone',area:[85,9,13,9],rotacao:12},{nome:'spray',area:[2,9,10,9],rotacao:-14}]}},
    quadrado:{elementos:{logo:{area:[3,2,11,10]},nome_batalha:{area:[14,1.6,72,10]},faixa_info:{area:[10,12.6,80,5.4]},titulo_chave:{area:[28,18.8,44,6.4]},chave:{area:[3,26,94,62.4],painel:true},repescagem:{area:[22,89,56,5]},rodape:{area:[4,95,92,4]},
      desenhos_decorativos:[{nome:'mao_com_microfone',area:[86,13,12,12],rotacao:12},{nome:'spray',area:[2,13,10,12],rotacao:-14}]}}}},
  chave_aberta:{nome:'Chave aberta no muro (sem painel)',fundo:'porta',letras:{titulo:'throwup_duas'},formatos:{
    feed:{elementos:{logo:{area:[3,2,12,9]},nome_batalha:{area:[10,2,80,14]},faixa_info:{area:[10,16.6,80,4.8]},titulo_chave:{area:[30,22.4,40,5.8]},chave:{area:[2,29,96,59],painel:false},repescagem:{area:[20,89.4,60,4.4]},rodape:{area:[4,95,92,4]},desenhos_decorativos:[]}},
    story:{elementos:{logo:{area:[3,1.5,12,6]},nome_batalha:{area:[8,2.4,84,11]},faixa_info:{area:[8,14,84,3.6]},titulo_chave:{area:[30,18.6,40,4.4]},chave:{area:[2,24,96,64],painel:false},repescagem:{area:[18,89,64,3.6]},rodape:{area:[4,94,92,3]},desenhos_decorativos:[{nome:'skyline',area:[0,90,100,10]}]}},
    quadrado:{elementos:{logo:{area:[3,2,11,10]},nome_batalha:{area:[12,2,76,13]},faixa_info:{area:[10,15.6,80,5.4]},titulo_chave:{area:[30,21.6,40,6.2]},chave:{area:[2,28.6,96,60],painel:false},repescagem:{area:[22,89,56,5]},rodape:{area:[4,95,92,4]},desenhos_decorativos:[]}}}}
};
/* junta com os layouts do JSON (opcoes-ia.json) */
const LAYOUTS={div:{},campeao:{},chave:LAYOUTS_CASA.chave};
Object.entries(LAYOUTS_CASA.div).forEach(([k,v])=>LAYOUTS.div[k]=v);
(LAYOUTS_IA.divulgacao||[]).forEach(L=>LAYOUTS.div['ia_'+L.nome]={nome:({topo_peso_base_limpa:'Topo pesado, fotos na base',coluna_esquerda_fotos_direita:'Informações à esquerda, fotos à direita',cartaz_central_colado:'Cartaz central colado no muro',duelo_inferior:'Duelo na base'}[L.nome]||L.nome)+' (novo)',formatos:L.formatos,ia:true,fundo:{cartaz_central_colado:'lambe_lambe_rasgado',duelo_inferior:'grade_noite_neblina',coluna_esquerda_fotos_direita:'tapume_madeira_spray',topo_peso_base_limpa:'azulejo_pichado'}[L.nome],letras:{titulo:{topo_peso_base_limpa:'ia_throwup_espumado',coluna_esquerda_fotos_direita:'ia_bloco_fosco_adesivado',cartaz_central_colado:'ia_cromo_sujo',duelo_inferior:'bloco_3d'}[L.nome]}});
Object.entries(LAYOUTS_CASA.campeao).forEach(([k,v])=>LAYOUTS.campeao[k]=v);
(LAYOUTS_IA.campeao||[]).forEach(L=>LAYOUTS.campeao['ia_'+L.nome]={nome:({campeao_foto_esquerda_chave_direita:'Foto à esquerda, chave embaixo',campeao_topo_chave_central:'Campeão no topo, chave central'}[L.nome]||L.nome)+' (novo)',formatos:L.formatos,ia:true,fundo:'grade_noite_neblina',letras:{campeao:{campeao_foto_esquerda_chave_direita:'ia_wildstyle_duas_tintas',campeao_topo_chave_central:'wild_cromo'}[L.nome]}});

/* ---------- estado de imagens e ajudantes ---------- */
let LOGO=null,CAPA=null,LAST=null,DL=null,FOTOS=[],CAMPFOTO=null;
(async()=>{try{DL=await window.claude?.use?.('downloads')}catch(e){DL=null}artState(build())})();
function guardaImg(key,img){try{const cv=document.createElement('canvas'),s=Math.min(1,1400/Math.max(img.width,img.height));cv.width=Math.round(img.width*s);cv.height=Math.round(img.height*s);cv.getContext('2d').drawImage(img,0,0,cv.width,cv.height);localStorage.setItem(key,cv.toDataURL(key==='cr-logo'?'image/png':'image/jpeg',.86))}catch(e){}}
function carregaImg(key,cb){try{const d=localStorage.getItem(key);if(d){const im=new Image();im.onload=()=>cb(im);im.src=d}}catch(e){}}
function leArquivo(file,cb){const rd=new FileReader();rd.onload=()=>{const im=new Image();im.onload=()=>cb(im);im.src=rd.result};rd.readAsDataURL(file)}
const DOW=['DOM','SEG','TER','QUA','QUI','SEX','SÁB'];
function diaHora(){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(A.data||'');let dia='';if(m){const d=new Date(+m[1],m[2]-1,+m[3]);dia=DOW[d.getDay()]+' '+m[3]+'/'+m[2]}
  const h=/^(\d{2}):(\d{2})/.exec(A.hora||'');return{dia,hora:h?(+h[1])+'H'+(h[2]!=='00'?h[2]:''):''}}
const slug=t=>String(t||'arte').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase()||'arte';
const fotoDe=nome=>CAMPFOTO||(FOTOS.find(f=>f.img&&f.nome.trim().toLowerCase()===String(nome||'').trim().toLowerCase())||{}).img||null;
function fundoCapa(c,W,H,img){const s=Math.max(W/img.width,H/img.height),w=img.width*s,h=img.height*s;c.drawImage(img,(W-w)/2,(H-h)/2,w,h);c.fillStyle='rgba(0,0,0,.4)';c.fillRect(0,0,W,H)}
const modalidadeTxt=()=>({solo:'Individual',dupla:'Dupla',trio:'Trio'}[S.modo]);
/* cor escura da paleta pra faixas com texto branco */
function corFaixa(p){let k=p.f2;for(let i=0;i<8&&lum(k)>.12;i++)k=shade(k,-22);return k}
const DES_PADRAO={silhuetas:true,microfone:true,spray:true,caixa:true,toca:true,corrente:true,megafone:true,roupas:true,skyline:true,papeis:true,fumaca:true,rabiscos:true};
const desOn=k=>(A.des||DES_PADRAO)[k]!==false;
const DECOR_GRUPO={spray:'spray',lata:'spray',silhueta_esquerda:'silhuetas',silhueta_direita:'silhuetas',mao_com_microfone:'microfone',microfone:'microfone',caixa_de_som_empilhada:'caixa',toca_discos:'toca',corrente:'corrente',corrente_medalhao:'corrente',megafone:'megafone',bone:'roupas',tenis:'roupas',skyline:'skyline',coroa_rabisco:'rabiscos'};
const DECOR_FUNDO=new Set(['silhueta_esquerda','silhueta_direita','skyline','caixa_de_som_empilhada','toca_discos']);

/* ---------- elementos do cartaz ---------- */
function bx(a,W,H){return{x:a[0]*W/100,y:a[1]*H/100,w:a[2]*W/100,h:a[3]*H/100}}
function alinhaX(b,w,al){return al&&al.startsWith('esquerda')?b.x:al&&al.startsWith('direita')?b.x+b.w-w:b.x+(b.w-w)/2}
function seloTexto(r){if(A.selo==='edicao')return(A.edicao||'TEM BATALHA!').toUpperCase();if(A.selo&&A.selo!=='auto')return A.selo.toUpperCase();return(A.edicao||SELOS[r()*SELOS.length|0]).toUpperCase()}

const EL={
  logo(c,b){if(!LOGO)return;const s=Math.min(b.w/LOGO.width,b.h/LOGO.height);c.save();c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=16;c.drawImage(LOGO,b.x+(b.w-LOGO.width*s)/2,b.y+(b.h-LOGO.height*s)/2,LOGO.width*s,LOGO.height*s);c.restore()},
  selo_edicao(c,b,X){const t=seloTexto(X.r);const fs=tamanhoQueCabe(c,t,s=>`${s}px ${FONTES.cond}`,b.w*.78,b.h*.62);c.font=`${fs}px ${FONTES.cond}`;const w=Math.min(b.w,c.measureText(t).width+fs*1.3),x=alinhaX(b,w,X.al);
    const col=corAmarela(X.p);pincelada(c,x,b.y+b.h*.08,w,b.h*.84,col,X.r,{rot:(X.r()-.5)*.05});c.fillStyle=textoSobre(col);c.textAlign='center';c.textBaseline='middle';c.fillText(t,x+w/2,b.y+b.h/2+2);
    if(desOn('rabiscos')){raios(c,x-fs*.2,b.y+b.h*.3,fs*.45,Math.PI*1.1,X.p.hi,3);raios(c,x+w+fs*.2,b.y+b.h*.3,fs*.45,-.1,X.p.hi,3)}},
  nome_batalha(c,b,X){const res=letreiro(c,A.evento||'Batalha de Rima',b,X.letraTitulo,X.p,X.r,{destaque:true,align:X.al});
    if(desOn('rabiscos')&&!X.tipoCamp)coroaRabisco(c,Math.min(res.right+res.size*.1,X.W-60),res.top-res.size*.05,res.size*.55,X.p.acc,.25)},
  data_hora(c,b,X){const dh=diaHora(),t=[dh.dia,dh.hora].filter(Boolean).join('  •  ');if(!t)return;
    if(X.letraData){letreiro(c,t,b,X.letraData,Object.assign({},X.p,{f1:'#ffffff',f2:X.p.acc}),X.r,{align:X.al});return}
    const fs=tamanhoQueCabe(c,t,s=>`${s}px ${FONTES.cond}`,b.w*.86,b.h*.68);c.font=`${fs}px ${FONTES.cond}`;const w=Math.min(b.w,c.measureText(t).width+fs*1.1),h=Math.min(b.h,fs*1.4),x=alinhaX(b,w,X.al),y=b.y+(b.h-h)/2;
    papel(c,x,y,w,h,X.r,{rot:(X.r()-.5)*.03});c.fillStyle='#111114';c.textAlign='center';c.textBaseline='middle';c.font=`${fs}px ${FONTES.cond}`;c.fillText(t,x+w/2,y+h/2+fs*.04);
    pincelada(c,x+w*.18,y+h*.9,w*.64,Math.max(6,h*.11),X.p.acc,X.r)},
  local(c,b,X){if(!A.local)return;const t=A.local.toUpperCase();const fs=tamanhoQueCabe(c,t,s=>`${s}px ${FONTES.cond}`,b.w*.8,b.h*.56);c.font=`${fs}px ${FONTES.cond}`;const tw=c.measureText(t).width,w=Math.min(b.w,tw+fs*2.3),x=alinhaX(b,w,X.al),h=b.h*.92,y=b.y+(b.h-h)/2;
    pincelada(c,x,y,w,h,corFaixa(X.p),X.r,{rot:(X.r()-.5)*.03});pin(c,x+fs*.85,y+h/2,fs*1.05,corAmarela(X.p),'#111114');c.textAlign='left';c.textBaseline='middle';txtContorno(c,fit(c,t,w-fs*2),x+fs*1.6,y+h/2+fs*.03,'#ffffff',4,'#111114')},
  premio(c,b,X){if(!A.premio)return;const col=corAmarela(X.p),ink=textoSobre(col),val=A.premio.toUpperCase(),dois=b.h/b.w>.13;
    const fsV=tamanhoQueCabe(c,val,s=>`${s}px ${FONTES.cond}`,b.w*.66,b.h*(dois?.5:.6));c.font=`${fsV}px ${FONTES.cond}`;const wv=c.measureText(val).width,fsL=dois?fsV*.46:fsV*.62;c.font=`${fsL}px ${FONTES.brush}`;const wl=c.measureText('PRÊMIO').width;
    const w=Math.min(b.w,(dois?Math.max(wv,wl):wv+wl+fsL*.6)+fsV*2.1),x=alinhaX(b,w,X.al),h=b.h*.94,y=b.y+(b.h-h)/2;pincelada(c,x,y,w,h,col,X.r,{rot:(X.r()-.5)*.04});
    trofeu(c,x+fsV*.85,y+h/2,fsV*1.25,ink===PRETO||ink==='#111114'?'#111114':'#ffffff',col);
    c.textBaseline='middle';const tx=x+fsV*1.75;c.fillStyle=ink;
    if(dois){c.textAlign='left';c.font=`${fsL}px ${FONTES.brush}`;c.fillText('PRÊMIO',tx+fsV*.25,y+h*.26);c.font=`${fsV}px ${FONTES.cond}`;c.fillText(fit(c,val,w-fsV*2),tx,y+h*.7)}
    else{c.textAlign='left';c.font=`${fsL}px ${FONTES.brush}`;c.fillText('PRÊMIO',tx,y+h/2);c.font=`${fsV}px ${FONTES.cond}`;c.fillText(fit(c,val,w-fsV*2-wl),tx+wl+fsL*.5,y+h/2)}},
  infos(c,b,X){if(!A.infos)return;const t=A.infos.toUpperCase();const fs=tamanhoQueCabe(c,t,s=>`${s}px ${FONTES.cond}`,b.w*.86,b.h*.55);c.font=`${fs}px ${FONTES.cond}`;const w=Math.min(b.w,c.measureText(t).width+fs*1.6),h=Math.min(b.h,fs*1.75),x=alinhaX(b,w,X.al),y=b.y+(b.h-h)/2;
    c.save();rr(c,x,y,w,h,h*.25);c.shadowColor='rgba(0,0,0,.5)';c.shadowBlur=14;c.fillStyle='rgba(14,12,20,.9)';c.fill();c.shadowColor='transparent';c.lineWidth=Math.max(3,h*.07);c.strokeStyle=X.p.f2;c.stroke();c.restore();
    c.fillStyle='#ffffff';c.textAlign='center';c.textBaseline='middle';c.font=`${fs}px ${FONTES.cond}`;c.fillText(fit(c,t,w-fs),x+w/2,y+h/2+fs*.04)},
  mcs_lista(c,b,X){const nomes=(FOTOS.length?FOTOS.map(f=>f.nome):(!S.exemplo&&S.E.length<=16?S.E:[])).filter(Boolean);if(!nomes.length)return;const t='MCS: '+nomes.map(n=>n.toUpperCase()).join(' • ');
    const fs=tamanhoQueCabe(c,t,s=>`${s}px ${FONTES.cond}`,b.w*.96,b.h*.62,b.h*.62);c.font=`${fs}px ${FONTES.cond}`;const w=Math.min(b.w,c.measureText(t).width),x=alinhaX(b,w,X.al);
    pincelada(c,x+w*.05,b.y+b.h*.72,w*.9,Math.max(5,b.h*.14),X.p.acc,X.r);c.textAlign='left';c.textBaseline='middle';txtContorno(c,fit(c,t,b.w),x,b.y+b.h*.42,'#ffffff',5,'#111114')},
  estouro(c,b,X){const sel=seloTexto(X.r),op=SELOS.filter(s=>s!==sel),t=(op[X.r()*op.length|0]||'COLA NA RODA').toUpperCase();const R=Math.min(b.w/2.4,b.h/1.7),cx=b.x+b.w/2,cy=b.y+b.h/2;
    estouro(c,cx,cy,R,X.p.f2==='#ffffff'?X.p.acc:X.p.f2,'#111114',(X.r()-.5)*.2);const ws=t.split(' '),l1=ws.slice(0,Math.ceil(ws.length/2)).join(' '),l2=ws.slice(Math.ceil(ws.length/2)).join(' ');
    const fs=Math.min(tamanhoQueCabe(c,l1,s=>`${s}px ${FONTES.brush}`,R*1.9,R*.62),l2?tamanhoQueCabe(c,l2,s=>`${s}px ${FONTES.brush}`,R*1.9,R*.62):999);c.font=`${fs}px ${FONTES.brush}`;c.textAlign='center';c.textBaseline='middle';
    const ink=textoSobre(X.p.f2==='#ffffff'?X.p.acc:X.p.f2);c.save();c.translate(cx,cy);c.rotate(-.08);c.fillStyle=ink;if(l2){c.fillText(l1,0,-fs*.48);c.fillText(l2,0,fs*.5)}else c.fillText(l1,0,0);c.restore()},
  fotos_mcs(c,b,X){const fotos=FOTOS.filter(f=>f.img).slice(0,8);
    if(fotos.length){const n=fotos.length;let best=null;for(let cols=1;cols<=n;cols++){const rows=Math.ceil(n/cols),cw=b.w/cols,ch=b.h/rows,pw=Math.min(cw*.9,ch/1.1*.9);if(!best||pw>best.pw)best={cols,rows,cw,ch,pw}}
      fotos.forEach((f,i)=>{const row=Math.floor(i/best.cols),col=i%best.cols,inRow=Math.min(best.cols,n-row*best.cols);const cx=b.x+b.w/2+(col-(inRow-1)/2)*best.cw,cy=b.y+(row+.5)*best.ch+(b.h-best.rows*best.ch)/2;
        polaroid(c,f.img,cx,cy,best.pw,(X.r()-.5)*.14,f.nome,X.r,{pb:A.pb})});return}
    if(CAPA&&A.capaUso==='cartaz'){cartazCapa(c,CAPA,b.x+b.w/2,b.y+b.h/2,b.w*.9,b.h*.9,X.r);return}
    const fb=X.el.fallback||'duelo';if(!desOn('silhuetas')||fb==='nada')return;
    if(fb==='silhueta'){silhueta(c,b.x+b.w*.45,b.y+b.h,Math.min(b.h,b.w*2.6),1,'rgba(8,8,12,.95)',X.p.acc);return}
    const h=Math.min(b.h,b.w*.75);silhueta(c,b.x+b.w*.22,b.y+b.h,h,1,'rgba(8,8,12,.95)',X.p.acc);silhueta(c,b.x+b.w*.78,b.y+b.h,h*.98,-1,'rgba(8,8,12,.95)',X.p.f2);
    const fs=Math.min(b.h*.3,b.w*.14);c.font=`${fs}px ${FONTES.brush}`;c.textAlign='center';c.textBaseline='middle';txtContorno(c,'VS',b.x+b.w/2,b.y+b.h*.45,corAmarela(X.p),fs*.16,'#111114')},
  cartaz_principal(c,b,X){c.save();c.translate(b.x+b.w/2,b.y+b.h/2);c.rotate((X.r()-.5)*.03);c.shadowColor='rgba(0,0,0,.7)';c.shadowBlur=40;c.shadowOffsetY=14;tornPath(c,-b.w/2,-b.h/2,b.w,b.h,X.r,b.w*.012,b.w*.02);c.fillStyle='#17161c';c.fill();c.shadowColor='transparent';
    c.save();c.clip();for(let i=0;i<2500;i++){c.fillStyle=X.r()<.5?'rgba(255,255,255,.05)':'rgba(0,0,0,.25)';c.fillRect(-b.w/2+X.r()*b.w,-b.h/2+X.r()*b.h,2,2)}const g=c.createRadialGradient(0,-b.h*.2,0,0,0,b.w*.8);g.addColorStop(0,rgba(X.p.f2,.25));g.addColorStop(1,rgba(X.p.f2,0));c.fillStyle=g;c.fillRect(-b.w/2,-b.h/2,b.w,b.h);c.restore();c.restore()},
  rodape(c,b,X){const l1=A.rodape||'',l2=(modalidadeTxt()+' · '+getFmt(S.formato).nome).toUpperCase();c.textAlign='center';c.textBaseline='middle';
    if(l1){const f1=tamanhoQueCabe(c,l1,s=>`900 ${s}px ${FONTES.corpo}`,b.w,b.h*.46,b.h*.46);c.font=`900 ${f1}px ${FONTES.corpo}`;txtContorno(c,l1,b.x+b.w/2,b.y+b.h*.3,X.p.acc,6,'#111114');
      const f2=Math.min(f1*.62,tamanhoQueCabe(c,l2,s=>`700 ${s}px ${FONTES.corpo}`,b.w,b.h*.3));c.font=`700 ${f2}px ${FONTES.corpo}`;txtContorno(c,fit(c,l2,b.w),b.x+b.w/2,b.y+b.h*.76,'rgba(255,255,255,.85)',5,'#111114')}
    else{const f2=tamanhoQueCabe(c,l2,s=>`700 ${s}px ${FONTES.corpo}`,b.w,b.h*.42,26);c.font=`700 ${f2}px ${FONTES.corpo}`;txtContorno(c,fit(c,l2,b.w),b.x+b.w/2,b.y+b.h/2,'rgba(255,255,255,.85)',5,'#111114')}},
  titulo_chave(c,b,X){const t=X.B.champ?'RESULTADO FINAL':Object.keys(S.picks).length?'CHAVE ATUALIZADA':'CONFRONTOS',fs=tamanhoQueCabe(c,t,s=>`${s}px ${FONTES.brush}`,b.w*.7,b.h*.66);c.font=`${fs}px ${FONTES.brush}`;
    const w=Math.min(b.w,c.measureText(t).width+fs*1.3),x=alinhaX(b,w,X.al),h=b.h*.9,y=b.y+(b.h-h)/2,col=corAmarela(X.p);pincelada(c,x,y,w,h,col,X.r,{rot:(X.r()-.5)*.04,pingos:2});
    c.fillStyle=textoSobre(col);c.textAlign='center';c.textBaseline='middle';c.fillText(t,x+w/2,y+h/2+fs*.05);if(desOn('rabiscos')){raios(c,x-fs*.2,y+h*.3,fs*.45,Math.PI*1.1,X.p.hi,3);raios(c,x+w+fs*.2,y+h*.3,fs*.45,-.1,X.p.hi,3)}},
  /* ---- campeão ---- */
  faixa_info(c,b,X){const dh=diaHora(),it=[X.semTitulo?A.evento:null,A.edicao,dh.dia,dh.hora,A.local].filter(Boolean).map(s=>s.toUpperCase());if(!it.length)return;const t=it.join('  •  ');
    const fs=tamanhoQueCabe(c,t,s=>`${s}px ${FONTES.cond}`,b.w*.92,b.h*.64);c.font=`${fs}px ${FONTES.cond}`;const w=Math.min(b.w,c.measureText(t).width+fs*1.2),h=Math.min(b.h,fs*1.45),x=alinhaX(b,w,X.al),y=b.y+(b.h-h)/2;
    papel(c,x,y,w,h,X.r,{rot:(X.r()-.5)*.02});c.fillStyle='#111114';c.textAlign='center';c.textBaseline='middle';c.fillText(t,x+w/2,y+h/2+fs*.04)},
  titulo_campeao(c,b,X){const t=tituloAuto().toUpperCase(),fs=tamanhoQueCabe(c,t,s=>`${s}px ${FONTES.brush}`,b.w*.62,b.h*.66);c.font=`${fs}px ${FONTES.brush}`;const w=Math.min(b.w*.8,c.measureText(t).width+fs*1.3),x=alinhaX(b,w,X.al),h=b.h*.9,y=b.y+(b.h-h)/2;
    laurel(c,x-fs*.15,y+h/2,h*1.05,1,'#e7b622');laurel(c,x+w+fs*.15,y+h/2,h*1.05,-1,'#e7b622');pincelada(c,x,y,w,h,'#f3c330',X.r,{rot:(X.r()-.5)*.04,pingos:2});
    c.fillStyle='#111114';c.textAlign='center';c.textBaseline='middle';c.fillText(t,x+w/2,y+h/2+fs*.05)},
  nome_campeao(c,b,X){const res=letreiro(c,X.B.champ,b,X.letraCamp,X.p,X.r,{align:X.al});X.resCamp=res;
    if(!X.temCoroa)coroa(c,res.left+res.size*.22,res.top-res.size*.04,res.size*.62,X.p,-.35+(X.r()-.5)*.2)},
  foto_campeao(c,b,X){const foto=fotoDe(X.B.champ);if(foto){const w=Math.min(b.w*.92,b.h/1.12*.92),h=polaroid(c,foto,b.x+b.w/2,b.y+b.h/2,w,-.05+(X.r()-.5)*.05,X.B.champ,X.r,{pb:A.pb});coroa(c,b.x+b.w/2-w*.28,b.y+b.h/2-h/2-w*.02,w*.36,X.p,-.4);X.temCoroa=true;return}
    if(X.el.fallback==='mic'&&desOn('microfone'))maoMic(c,{x:b.x+b.w*.18,y:b.y+b.h*.3,w:b.w*.64,h:b.h*.7},X.p,X.r,.12)},
  frase_resultado(c,b,X){const pl=S.placar[X.B.fin.k],vice=String(X.B.vice||'').toUpperCase(),pt=(S.placarTxt||{})[X.B.fin.k],parts=[['VENCEU ','#ffffff'],[vice,corAmarela(X.p)],[' NA FINAL'+(pt?' ('+pt+')':pl==='desempate'?' NO DESEMPATE':''),'#ffffff']],full=parts.map(q=>q[0]).join('');
    const fs=tamanhoQueCabe(c,full,s=>`${s}px ${FONTES.cond}`,b.w*.84,b.h*.58);c.font=`${fs}px ${FONTES.cond}`;const tw=c.measureText(full).width,w=Math.min(b.w,tw+fs*1.4),x=alinhaX(b,w,X.al),h=b.h*.92,y=b.y+(b.h-h)/2;
    pincelada(c,x,y,w,h,corFaixa(X.p),X.r,{rot:(X.r()-.5)*.03,pingos:3});let xx=x+(w-tw)/2;c.textAlign='left';c.textBaseline='middle';parts.forEach(([t,cc])=>{txtContorno(c,t,xx,y+h/2+fs*.04,cc,4,'#111114');xx+=c.measureText(t).width})},
  chave(c,b,X){chaveArte(c,b,X.B,X.p,X.r,{painel:X.el.painel!==false&&!X.ia||X.el.painel===true})},
  repescagem(c,b,X){if(!X.B.rep||!X.B.rep.length)return;const t='REPESCAGEM: '+X.B.rep.map(n=>n.toUpperCase()).join(', ');const fs=tamanhoQueCabe(c,t,s=>`${s}px ${FONTES.cond}`,b.w*.92,b.h*.6);c.font=`${fs}px ${FONTES.cond}`;
    const w=Math.min(b.w,c.measureText(t).width+fs*1.2),h=Math.min(b.h,fs*1.45),x=alinhaX(b,w,X.al),y=b.y+(b.h-h)/2;papel(c,x,y,w,h,X.r,{rot:(X.r()-.5)*.03});c.fillStyle='#111114';c.textAlign='center';c.textBaseline='middle';c.fillText(fit(c,t,w-fs*.6),x+w/2,y+h/2+fs*.04);
    pincelada(c,x+w*.25,y+h*.92,w*.5,Math.max(5,h*.12),X.p.f2,X.r)}
};
/* desenhos posicionados pelo layout */
function desenhaDecor(c,d,X){const b=bx(d.area,X.W,X.H),rot=(d.rotacao||0)*Math.PI/180,p=X.p,r=X.r;
  switch(d.nome){
    case'spray':case'lata':lata(c,b.x+b.w/2,b.y+b.h*.6,Math.min(b.h*.8,b.w*1.9),rot,p,r);break;
    case'silhueta_esquerda':silhueta(c,b.x+b.w*.5,b.y+b.h,b.h,1,'rgba(8,8,12,.95)',p.acc);break;
    case'silhueta_direita':silhueta(c,b.x+b.w*.5,b.y+b.h,b.h*.97,-1,'rgba(8,8,12,.95)',p.f2);break;
    case'mao_com_microfone':maoMic(c,b,p,r,rot);break;
    case'microfone':microfone(c,b.x,b.y+b.h,Math.hypot(b.w,b.h)*.9,rot||-.8,p);break;
    case'caixa_de_som_empilhada':caixaSom(c,b,p,r);break;
    case'toca_discos':tocaDiscos(c,b,p,r,rot);break;
    case'corrente':corrente(c,b.x,b.y+b.h*.1,b.x+b.w,b.y+b.h*.55,Math.max(14,b.w*.07),p,false);break;
    case'corrente_medalhao':corrente(c,b.x,b.y+b.h*.1,b.x+b.w,b.y+b.h*.1,Math.max(10,b.w*.06),p,true);break;
    case'megafone':megafone(c,b,p,r,rot);break;
    case'bone':bone(c,b,p,r,rot);break;
    case'tenis':tenis(c,b,p,r,rot);break;
    case'skyline':skyline(c,b,p,r);break;
    case'coroa':coroa(c,b.x+b.w/2,b.y+b.h/2,Math.min(b.w,b.h*1.5),p,rot);X.temCoroa=true;break;
    case'coroa_rabisco':coroaRabisco(c,b.x+b.w/2,b.y+b.h/2,Math.min(b.w,b.h*1.6),p.acc,rot||.2);break;
    default:if(d.nome.startsWith('fita_adesiva'))fita(c,b.x+b.w/2,b.y+b.h/2,b.w,b.h,rot)}}

/* ---------- chave da arte ---------- */
function chaveArte(c,b,B,p,r,o={}){
  const main=B.main,Rall=main.length;if(!Rall)return;let s0=0;const rec=A.recorte||'auto';
  if(rec==='quartas')s0=Math.max(0,Rall-3);else if(rec==='semis')s0=Math.max(0,Rall-2);else if(rec==='auto'&&main[0].length>8)s0=Math.max(0,Rall-3);
  if(rec==='auto'&&Rall>=3&&s0===0&&(b.h*.78)/main[0].length<26)s0=Rall-3;
  const M=main.slice(s0),R=M.length,champC=corCampeao(p),dist=(a,q)=>{const X=hx(a),Y=hx(q);return Math.hypot(X[0]-Y[0],X[1]-Y[1],X[2]-Y[2])};let winC=[p.acc,p.f1,'#3ee6ff','#ffd21f','#ff4fa3','#7cff6a'].filter(k=>lum(k)>.18).sort((a,q)=>dist(q,champC)-dist(a,champC))[0];if(dist(p.acc,champC)>150&&lum(p.acc)>.18)winC=p.acc;
  let {x,y,w,h}=b;
  if(o.painel){c.save();rr(c,x,y,w,h,Math.min(30,w*.03));c.fillStyle='rgba(10,10,16,.82)';c.shadowColor=champC;c.shadowBlur=26;c.fill();c.shadowBlur=0;const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,champC);g.addColorStop(1,winC);c.lineWidth=4;c.strokeStyle=g;c.stroke();
    rr(c,x+10,y+10,w-20,h-20,Math.min(22,w*.02));c.lineWidth=1.5;c.strokeStyle='rgba(255,255,255,.1)';c.stroke();c.restore();x+=w*.025;w-=w*.05;y+=h*.02;h-=h*.04}
  const headH=Math.min(h*.085,44),legH=Math.min(h*.075,38),ax=x,aw=w,ay=y+headH+4,ah=h-headH-legH-8;
  const cols=R>1?2*(R-1)+1:1,colW=aw/cols,names=R>1?M[0].length:2,slot=ah/names;
  const bh=Math.max(18,Math.min(slot*.78,colW*.4,64)),bw=colW*.88,g=Math.max(3,bh*.14),fsBase=bh*.52;
  /* cabeçalho de fases */
  c.textAlign='center';c.textBaseline='middle';const lf=Math.max(12,Math.min(headH*.5,colW*.16));c.font=`${lf}px ${FONTES.cond}`;
  for(let t=0;t<R-1;t++){const lb=nomeFase(M[t].length).toUpperCase();c.fillStyle='rgba(255,255,255,.78)';c.fillText(fit(c,lb,colW-6),ax+colW*(t+.5),y+headH/2);c.fillText(fit(c,lb,colW-6),ax+colW*(cols-1-t+.5),y+headH/2)}
  {const fx=ax+colW*((cols-1)/2+.5),fw=Math.min(colW*.95,lf*5);pincelada(c,fx-fw/2,y+headH*.12,fw,headH*.76,'#f3c330',r);c.fillStyle='#111114';c.font=`${lf*1.05}px ${FONTES.brush}`;c.fillText('FINAL',fx,y+headH/2+1)}
  /* caixa de nome */
  const caixa=(cx,top,ww,hh,nome,st,rep)=>{const fill=st==='champ'?champC:st==='win'?winC:st==='lose'?'#17171d':'#24252c';c.save();rr(c,cx-ww/2,top,ww,hh,hh*.26);
    if(st==='champ'){c.shadowColor=champC;c.shadowBlur=hh*.6}c.fillStyle=fill;c.fill();c.shadowBlur=0;c.lineWidth=st==='champ'?Math.max(3,hh*.07):Math.max(2,hh*.05);c.strokeStyle=st==='champ'?'#ffffff':st==='win'?mix(winC,'#ffffff',.55):st==='lose'?'rgba(255,255,255,.4)':'rgba(255,255,255,.8)';c.stroke();c.restore();
    const txt=nome?String(nome).toUpperCase():'—';let fs=hh*.52;c.font=`${fs}px ${FONTES.cond}`;const m=c.measureText(txt).width,maxw=ww-hh*.5;if(m>maxw)fs=Math.max(fs*.7,fs*maxw/m);c.font=`${fs}px ${FONTES.cond}`;
    c.fillStyle=st==='champ'||st==='win'?textoSobre(fill):st==='lose'?'rgba(255,255,255,.5)':'#ffffff';c.textAlign='center';c.textBaseline='middle';c.fillText(fit(c,txt,maxw),cx,top+hh/2+fs*.05);
    if(rep&&nome){const rr2=hh*.2;c.beginPath();c.arc(cx+ww/2-rr2*.4,top+rr2*.4,rr2,0,7);c.fillStyle=corAmarela(p);c.fill();c.lineWidth=2;c.strokeStyle='#111114';c.stroke();c.fillStyle='#111114';c.font=`${rr2*1.3}px ${FONTES.cond}`;c.fillText('R',cx+ww/2-rr2*.4,top+rr2*.45)}};
  const st=(m,n)=>!n?'vazio':m.w?(m.w===n?'win':'lose'):'n',py=(cnt,j)=>ay+(j+.5)*ah/cnt,fy=ay+ah/2,fcx=ax+colW*((cols-1)/2+.5);
  const fbw=Math.min(colW*1.0,bw*1.18),fbh=bh*1.3;
  for(let side=0;side<2&&R>1;side++)for(let t=0;t<R-1;t++){const list=M[t],half=list.length/2,ms=side?list.slice(half):list.slice(0,half),col=side?cols-1-t:t,cx=ax+colW*(col+.5);
    ms.forEach((m,j)=>{const my=py(ms.length,j),ny=t<R-2?py(ms.length/2,j>>1):fy,edge=side?cx-bw/2:cx+bw/2,nEdge=t<R-2?ax+colW*((side?col-1:col+1)+.5)+(side?bw/2:-bw/2):fcx+(side?fbw/2:-fbw/2),mx=(edge+nEdge)/2;
      c.save();c.lineJoin='round';c.strokeStyle=m.w?winC:'rgba(255,255,255,.7)';c.lineWidth=m.w?4:2.5;if(m.w){c.shadowColor=winC;c.shadowBlur=8}c.beginPath();c.moveTo(edge,my);c.lineTo(mx,my);c.lineTo(mx,ny);c.lineTo(nEdge,ny);c.stroke();c.restore();
      const rp=m.repNames||[],nd=m.needDraw&&!m.a?'REPESCAGEM':null,nd2=m.needDraw&&!m.b?'REPESCAGEM':null;caixa(cx,my-bh-g/2,bw,bh,m.a||nd,m.a?st(m,m.a):'vazio',rp.includes(m.a));caixa(cx,my+g/2,bw,bh,m.bye?null:(m.b||nd2),m.bye?'vazio':m.b?st(m,m.b):'vazio',rp.includes(m.b))})}
  const f=M[R-1][0];
  if(R>1&&f.w){caixa(fcx,fy-fbh/2,fbw,fbh,f.w,'champ');const vice=f.w===f.a?f.b:f.a;caixa(fcx,fy+fbh/2+g*1.4,fbw*.82,bh*.85,vice,'lose')}
  else if(R>1){caixa(fcx,fy-bh-g/2,fbw,bh,f.a,f.a?'n':'vazio');caixa(fcx,fy+g/2,fbw,bh,f.b,f.b?'n':'vazio')}
  else{caixa(fcx,fy-fbh-g/2,fbw,fbh,f.a,f.w?(f.w===f.a?'champ':'lose'):'n');caixa(fcx,fy+g/2,fbw,fbh,f.b,f.w?(f.w===f.b?'champ':'lose'):'n')}
  coroa(c,fcx,fy-fbh/2-fbh*.62,fbh*.95,p,0);raios(c,fcx-fbh*.6,fy-fbh/2-fbh*.7,fbh*.35,Math.PI*1.15,'#f3c330',3);raios(c,fcx+fbh*.6,fy-fbh/2-fbh*.7,fbh*.35,-.05,'#f3c330',3);
  /* legenda */
  const itens=[[champC,tituloAuto().toUpperCase()],[winC,'AVANÇOU'],['#17171d','ELIMINADO']];if(B.rep&&B.rep.length)itens.push([corAmarela(p),'R = REPESCAGEM']);
  const lfs=Math.max(11,Math.min(legH*.48,aw*.024));c.font=`${lfs}px ${FONTES.cond}`;const sw=lfs*1.8,gap=lfs*1.4,tot=itens.reduce((a,[,t])=>a+sw+lfs*.5+c.measureText(t).width+gap,-gap);let lx=x+(w-tot)/2;const ly=y+h-legH/2;
  itens.forEach(([cc,t])=>{rr(c,lx,ly-lfs*.55,sw,lfs*1.1,lfs*.3);c.fillStyle=cc;c.fill();c.lineWidth=2;c.strokeStyle='rgba(255,255,255,.7)';c.stroke();c.fillStyle='rgba(255,255,255,.88)';c.textAlign='left';c.fillText(t,lx+sw+lfs*.5,ly+1);lx+=sw+lfs*.5+c.measureText(t).width+gap});
  if(s0>0){c.font=`${Math.max(11,lfs*.85)}px ${FONTES.corpo}`;c.fillStyle='rgba(255,255,255,.6)';c.textAlign='right';c.fillText(`Mostrando a partir das ${nomeFase(M[0].length).toLowerCase()}`,x+w-6,y+headH/2)}
}

/* ---------- montagem da arte ---------- */
const tipoArte=()=>A.tipo==='div'||A.tipo==='chave'?A.tipo:'campeao';
const CAMPO_LAYOUT={div:'layoutDiv',campeao:'layoutCamp',chave:'layoutChave'};
function escolheLayout(tipo,r){const L=LAYOUTS[tipo],ks=Object.keys(L);let k=A[CAMPO_LAYOUT[tipo]];if(!k||k==='auto'||!L[k])k=ks[r()*ks.length|0];return{k,L:L[k]}}
function escolheLetra(sel,padrao,r,lista){if(sel&&sel!=='auto'&&sel!=='variar'&&LETRAS[sel])return LETRAS[sel];if(sel==='variar'){const op=lista.filter(k=>LETRAS[k]);return LETRAS[op[r()*op.length|0]]}return LETRAS[padrao]||LETRAS[lista[0]]}
const LETRAS_TITULO=['throwup_duas','throwup','pincel','bloco_3d','wild_tinta','ia_throwup_espumado','ia_cromo_sujo','ia_bloco_fosco_adesivado','ia_neon_recortado'];
const LETRAS_CAMP=['wild_cromo','wild_tinta','bloco_3d','throwup','ia_wildstyle_duas_tintas','ia_cromo_sujo','ia_neon_recortado'];
function desenharArte(c,W,H,r,p,B){
  const tipo=tipoArte(),fk=A.fmt==='quad'?'quadrado':A.fmt,{k:layK,L:lay}=escolheLayout(tipo,r),spec=lay.formatos[fk]||lay.formatos.feed,els=spec.elementos;
  const muroKeys=Object.keys(MUROS);let muro=A.fundo;if(!muro||muro==='auto'||!MUROS[muro])muro=lay.fundo&&r()<.6&&MUROS[lay.fundo]?lay.fundo:muroKeys[r()*muroKeys.length|0];
  if(CAPA&&A.capaUso==='fundo'){fundoCapa(c,W,H,CAPA)}else{MUROS[muro].fn(c,W,H,r,p);if(MUROS[muro].escurecer){c.fillStyle=`rgba(8,8,12,${MUROS[muro].escurecer})`;c.fillRect(0,0,W,H)}}
  ruido(c,W,H,r,30);tagsFundo(c,W,H,r,p,['RIMA','FLOW','RAP','RUA','CYPHER','VERSO','MC','HIP HOP','FREESTYLE']);
  if(desOn('fumaca')){fumaca(c,W*(.05+r()*.1),H*(.75+r()*.2),W*.32,p.fog[0],r);fumaca(c,W*(.85+r()*.1),H*(.7+r()*.25),W*.3,p.fog[1]||p.acc,r);if(r()<.6)fumaca(c,W*r(),H*(.2+r()*.3),W*.22,p.fog[2]||p.f2,r)}
  vinheta(c,W,H,.55);
  const X={W,H,p,r,B,tipo,fk,ia:!!lay.ia,semTitulo:tipo!=='div'&&!els.nome_batalha,tipoCamp:tipo!=='div'};
  X.letraTitulo=escolheLetra(A.letraTitulo,(lay.letras||{}).titulo||(tipo==='div'?'throwup_duas':'pincel'),r,LETRAS_TITULO);
  X.letraCamp=escolheLetra(A.letraCamp,(lay.letras||{}).campeao||'wild_cromo',r,LETRAS_CAMP);
  X.letraData=A.letraData&&A.letraData!=='papel'&&LETRAS[A.letraData]?LETRAS[A.letraData]:null;
  const decs=(els.desenhos_decorativos||[]).filter(d=>d.nome!=='coroa'&&desOn(DECOR_GRUPO[d.nome]||'rabiscos'));
  X.temCoroa=decs.some(d=>d.nome==='coroa');
  decs.filter(d=>DECOR_FUNDO.has(d.nome)).forEach(d=>{c.save();desenhaDecor(c,d,X);c.restore()});
  if(desOn('papeis')){const cantos=['td','be','bd'].filter(k=>!(k==='td'&&els.logo&&els.logo.area[0]>60));cantoPapel(c,W,H,cantos[0],r,['RAP','RIMA','CULTURA','RUA']);if(r()<.6)cantoPapel(c,W,H,cantos[1+(r()*2|0)]||'be',r,null)}
  const ordem=['cartaz_principal','nome_batalha','faixa_info','titulo_chave','foto_campeao','titulo_campeao','nome_campeao','frase_resultado','selo_edicao','data_hora','local','premio','infos','mcs_lista','fotos_mcs','chave','repescagem','estouro','rodape','logo'];
  ordem.forEach(k=>{const el=els[k];if(!el||!EL[k])return;const b=bx(el.area,W,H);X.el=el;X.al=el.alinhamento||'centro';c.save();try{EL[k](c,b,X)}catch(e){console.warn('elemento',k,e)}c.restore()});
  decs.filter(d=>!DECOR_FUNDO.has(d.nome)).forEach(d=>{c.save();desenhaDecor(c,d,X);c.restore()});
  return{layout:layK,muro:CAPA&&A.capaUso==='fundo'?'capa':muro,paleta:p.n,letraTitulo:Object.keys(LETRAS).find(k=>LETRAS[k]===X.letraTitulo),letraCampeao:Object.keys(LETRAS).find(k=>LETRAS[k]===X.letraCamp)};
}

/* ---------- geração ---------- */
function artState(B){const tipo=tipoArte(),div=tipo==='div',ok=div||(tipo==='chave'?!!S.E.length:!!B.champ);$('aGerar').disabled=!ok;$('aOutra').disabled=!ok;
  ['tituloBox','campBox','letraCampBox'].forEach(id=>$(id).hidden=tipo!=='campeao');$('recorteBox').hidden=div;['premioBox','fotosBox','seloBox'].forEach(id=>$(id).hidden=!div);setSeg('aTipo',tipo);
  $('arteHint').textContent=tipo==='chave'?'Chave com os confrontos e resultados até agora. Dá pra gerar antes, durante ou depois da batalha.':div?'Cartaz pra divulgar a batalha. Cada "Outra variação" troca o que estiver em "Variar".':ok?'Arte do campeão com a chave completa. Cada "Outra variação" troca o que estiver em "Variar".':'A arte do campeão libera quando você marcar o vencedor da final. Pra testar agora, use "Simular resultados" na chave.';
  $('aSalvar').hidden=$('arteOut').hidden;$('aTitulo').placeholder=({solo:'CAMPEÃO',dupla:'DUPLA CAMPEÃ',trio:'TRIO CAMPEÃO'}[S.modo])+' (ou CAMPEÃ)';preencheLayouts()}
let ULTIMA=null;
async function renderBlob(B,tipo){const[W,H]={feed:[1080,1350],story:[1080,1920],quad:[1080,1080]}[A.fmt];const cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d'),r=rng(A.seed);
  const p=A.cores==='auto'?PALS[r()*PALS.length|0]:PALS[+A.cores]||PALS[0];ULTIMA=desenharArte(c,W,H,r,p,B);return await new Promise(ok=>cv.toBlob(ok,tipo||'image/png',.9))}
async function gerarArte(nova){const B=build(),tipo=tipoArte(),div=tipo==='div';if(tipo==='campeao'&&!B.champ)return;if(tipo==='chave'&&!S.E.length)return;if(nova)A.seed=(Math.random()*1e9)|0;save();
  $('aGerar').disabled=$('aOutra').disabled=true;$('aGerar').textContent='Gerando…';
  try{await fontsReady();const blob=await renderBlob(B,'image/png');LAST=blob;const img=$('arteImg');if(img.dataset.u)URL.revokeObjectURL(img.dataset.u);const u=URL.createObjectURL(blob);img.dataset.u=u;img.src=u;
    $('arteOut').hidden=false;$('aSalvar').hidden=false;$('salvarMsg').textContent='No celular, você também pode tocar e segurar a imagem pra salvar.';
    if(ULTIMA)$('arteInfo').textContent=`Layout: ${LAYOUTS[tipo][ULTIMA.layout].nome} · Muro: ${ULTIMA.muro==='capa'?'capa':MUROS[ULTIMA.muro].nome} · Cores: ${ULTIMA.paleta}`;
  }catch(e){$('arteHint').textContent='Não deu pra gerar a arte: '+e.message;console.error(e)}
  $('aGerar').textContent='Gerar arte';artState(build())}

/* ---------- banco de artes (.zip) ---------- */
function jobsBanco(B){const J=[],ri=k=>(k*7)%PALS.length;let n=0;
  Object.keys(LAYOUTS.div).forEach((lk,i)=>{[0,1,2].forEach(j=>J.push({tipo:'div',fmt:'feed',layoutDiv:lk,cores:String(ri(i*3+j)),fundo:'auto',seed:1000+n++}));['story','quad'].forEach(fm=>J.push({tipo:'div',fmt:fm,layoutDiv:lk,cores:String(ri(i*3+5)),fundo:'auto',seed:1000+n++}))});
  if(B.champ)Object.keys(LAYOUTS.campeao).forEach((lk,i)=>{[0,1,2].forEach(j=>J.push({tipo:'campeao',fmt:'feed',layoutCamp:lk,cores:String(ri(i*3+j+11)),fundo:'auto',seed:2000+n++}));['story','quad'].forEach(fm=>J.push({tipo:'campeao',fmt:fm,layoutCamp:lk,cores:String(ri(i*3+13)),fundo:'auto',seed:2000+n++}))});
  if(S.E.length)Object.keys(LAYOUTS.chave).forEach((lk,i)=>['feed','story','quad'].forEach((fm,j)=>J.push({tipo:'chave',fmt:fm,layoutChave:lk,cores:String(ri(i*3+j+7)),fundo:'auto',seed:4000+n++})));
  LETRAS_TITULO.forEach((lt,i)=>J.push({tipo:'div',fmt:'feed',layoutDiv:'cartaz_quebrada',letraTitulo:lt,cores:String(ri(i+3)),fundo:'auto',seed:3000+n++}));
  return J.map(j=>Object.assign({letraTitulo:'auto',letraCamp:'auto',layoutDiv:'auto',layoutCamp:'auto',layoutChave:'auto'},j))}
const nomeJob=(o,n,info)=>`${String(n).padStart(3,'0')}_${o.tipo==='div'?'divulgacao':o.tipo==='chave'?'chave':'campeao'}_${o.fmt}_${slug(info.layout)}_${slug(info.paleta)}.jpg`;
async function renderJob(B,o){const salvo=JSON.parse(JSON.stringify(A));Object.assign(A,o);try{const blob=await renderBlob(B,'image/jpeg');return{blob,info:Object.assign({},ULTIMA)}}finally{Object.keys(A).forEach(k=>delete A[k]);Object.assign(A,salvo)}}
function catalogo(B,lista){return{app:'Chave de Rima',versao:3,gerado_em:new Date().toISOString(),
  observacao:'Cada arte foi gerada pelo app. Com as mesmas opções e o mesmo seed, o app repete a mesma arte.',
  dados_usados:{evento:A.evento,edicao:A.edicao,local:A.local,data:A.data,horario:A.hora,premio:A.premio,infos:A.infos,rodape:A.rodape,modalidade:S.modo,formato_batalha:getFmt(S.formato).nome,campeao:B.champ||null,vice:B.vice||null,fotos_mcs:FOTOS.length,tem_capa:!!CAPA,tem_logo:!!LOGO},
  opcoes:{tamanhos:{feed:'1080×1350',story:'1080×1920',quad:'1080×1080'},layouts:{divulgacao:Object.fromEntries(Object.entries(LAYOUTS.div).map(([k,v])=>[k,v.nome])),campeao:Object.fromEntries(Object.entries(LAYOUTS.campeao).map(([k,v])=>[k,v.nome]))},
    muros:Object.fromEntries(Object.entries(MUROS).map(([k,v])=>[k,v.nome])),letras:Object.fromEntries(Object.entries(LETRAS).map(([k,v])=>[k,{nome:v.nome,base:v.base,preenchimento:v.fill,contornos:v.contornos,extrusao:v.extrusao,efeitos:v.efeitos}])),
    paletas:PALS.map(p=>({nome:p.n,fundo:p.bg,preenchimento_1:p.f1,preenchimento_2:p.f2,contorno:p.out,sombra_3d:p.sh,brilho:p.hi,destaque:p.acc,nevoa:p.fog})),selos:SELOS,
    desenhos:['silhuetas de MC','mão com microfone','microfone','lata de spray','caixa de som empilhada','toca-discos','corrente com medalhão','megafone','boné','tênis','skyline da quebrada','papéis rasgados nos cantos','fumaça neon','coroas e rabiscos','troféu','pin de local','laurel do título','estouro (selo estrela)','pinceladas','tiras de papel rasgado','polaroids com fita']},
  artes:lista}}
const LEIAME=`BANCO DE ARTES - CHAVE DE RIMA (versão 3)

Pastas e arquivos
- artes/: as imagens. O nome diz número, tipo, tamanho, layout e paleta.
- catalogo.json: as opções usadas em cada arte (layout, muro, paleta, letras, seed) e a descrição de todas as opções do app.

Como usar com outra IA
Envie o catalogo.json e algumas artes e peça novas paletas, muros, desenhos, letras e layouts no mesmo formato.
`;
async function gerarBanco(){const B=build(),msg=$('bancoMsg');if(!window.JSZip){msg.textContent='O compactador não carregou. Confira a internet e recarregue a página.';return}
  const btn=$('aBanco');btn.disabled=true;try{await fontsReady();const zip=new JSZip(),J=jobsBanco(B),lista=[];
    for(let n=0;n<J.length;n++){msg.textContent=`Gerando arte ${n+1} de ${J.length}…`;const o=J[n],{blob,info}=await renderJob(B,o),nome=nomeJob(o,n+1,info);zip.file('artes/'+nome,blob);
      lista.push(Object.assign({arquivo:'artes/'+nome},o,info));await new Promise(ok=>setTimeout(ok,0))}
    zip.file('catalogo.json',JSON.stringify(catalogo(B,lista),null,2));zip.file('LEIA-ME.txt',LEIAME);msg.textContent='Compactando…';
    const out=await zip.generateAsync({type:'blob'}),fname='banco-artes-'+slug(A.evento)+'.zip';
    if(DL){try{await DL.save({filename:fname,data:out});msg.textContent=`Pronto: ${J.length} artes no .zip.`}catch(e){msg.textContent=e&&e.code==='declined'?'Download cancelado.':'Não deu pra salvar o .zip por aqui.'}}
    else{const a=document.createElement('a');a.href=URL.createObjectURL(out);a.download=fname;document.body.appendChild(a);a.click();a.remove();msg.textContent=`Pronto: ${J.length} artes no .zip.`}
  }catch(e){msg.textContent='Erro ao gerar o banco: '+e.message}btn.disabled=false}

/* ---------- controles ---------- */
const opt=(v,t)=>`<option value="${esc(v)}">${esc(t)}</option>`;
function preencheLayouts(){const tipo=tipoArte(),sel=$('aLayout'),cur=A[CAMPO_LAYOUT[tipo]],L=LAYOUTS[tipo];
  const casa=Object.entries(L).filter(([,v])=>!v.ia),ia=Object.entries(L).filter(([,v])=>v.ia);
  const html=opt('auto','Variar')+`<optgroup label="Da casa">${casa.map(([k,v])=>opt(k,v.nome)).join('')}</optgroup><optgroup label="Novos">${ia.map(([k,v])=>opt(k,v.nome)).join('')}</optgroup>`;if(sel.dataset.tipo!==tipo){sel.innerHTML=html;sel.dataset.tipo=tipo}sel.value=cur&&L[cur]?cur:'auto'}
function preencheControles(){
  $('aCores').innerHTML=opt('auto','Variar')+`<optgroup label="Clássicas">${PALS.map((p,i)=>p.grupo==='classicas'?opt(i,p.n):'').join('')}</optgroup><optgroup label="Novas">${PALS.map((p,i)=>p.grupo==='novas'?opt(i,p.n):'').join('')}</optgroup>`;
  const gm=g=>Object.entries(MUROS).filter(([,m])=>m.grupo===g).map(([k,m])=>opt(k,m.nome)).join('');$('aFundo').innerHTML=opt('auto','Variar (combina com o layout)')+`<optgroup label="Clássicos">${gm('Clássicos')}</optgroup><optgroup label="Novos">${gm('Novos')}</optgroup>`;
  const lt=(lista)=>opt('auto','Automático (o do layout)')+opt('variar','Variar')+lista.filter(k=>LETRAS[k]).map(k=>opt(k,LETRAS[k].nome)).join('');
  $('aLetraTitulo').innerHTML=lt(LETRAS_TITULO);$('aLetraCamp').innerHTML=lt(LETRAS_CAMP);
  $('aLetraData').innerHTML=opt('papel','Tira de papel rasgado')+['bloco_3d','throwup','pincel','ia_neon_recortado','ia_bloco_fosco_adesivado'].map(k=>opt(k,'Letra: '+LETRAS[k].nome)).join('');
  $('aSelo').innerHTML=opt('auto','Edição (ou uma frase sorteada)')+opt('edicao','Só a edição')+SELOS.map(s=>opt(s,s)).join('');
  const D=[['silhuetas','Silhuetas de MC'],['microfone','Microfone / mão'],['spray','Lata de spray'],['caixa','Caixa de som'],['toca','Toca-discos'],['corrente','Corrente'],['megafone','Megafone'],['roupas','Boné e tênis'],['skyline','Skyline da quebrada'],['papeis','Papéis rasgados nos cantos'],['fumaca','Fumaça neon'],['rabiscos','Coroinhas e rabiscos']];
  $('aDes').innerHTML=D.map(([k,t])=>`<label class="chk"><input type="checkbox" data-des="${k}"${desOn(k)?' checked':''}> ${t}</label>`).join('');
  $('aDes').onchange=e=>{const k=e.target.dataset.des;if(!k)return;A.des=Object.assign({},DES_PADRAO,A.des||{});A.des[k]=e.target.checked;save()}}
preencheControles();
['aLayout'].forEach(id=>$(id).onchange=e=>{A[CAMPO_LAYOUT[tipoArte()]]=e.target.value;save()});
const AF={aEvento:'evento',aEdicao:'edicao',aLocal:'local',aData:'data',aHora:'hora',aInfos:'infos',aPremio:'premio',aTitulo:'titulo',aRodape:'rodape',aFundo:'fundo',aCores:'cores',aCapaUso:'capaUso',aLetraTitulo:'letraTitulo',aLetraCamp:'letraCamp',aLetraData:'letraData',aSelo:'selo',aRecorte:'recorte'};
Object.entries(AF).forEach(([id,k])=>{const el=$(id);if(A[k]!=null)el.value=A[k];if(el.tagName==='SELECT'&&el.selectedIndex<0)el.selectedIndex=0;A[k]=el.value;el.addEventListener(el.tagName==='SELECT'?'change':'input',()=>{A[k]=el.value;save();if(k==='titulo')render()})});
$('aPB').checked=!!A.pb;$('aPB').onchange=e=>{A.pb=e.target.checked;save()};
setSeg('aFmt',A.fmt);document.querySelectorAll('#aFmt button').forEach(b=>b.onclick=()=>{A.fmt=b.dataset.v;setSeg('aFmt',A.fmt);save()});
document.querySelectorAll('#aTipo button').forEach(b=>b.onclick=()=>{A.tipo=b.dataset.v;save();artState(build())});
const reduz=(img,max,tipo)=>{const cv=document.createElement('canvas'),s=Math.min(1,max/Math.max(img.width,img.height));cv.width=Math.round(img.width*s);cv.height=Math.round(img.height*s);cv.getContext('2d').drawImage(img,0,0,cv.width,cv.height);return cv.toDataURL(tipo||'image/jpeg',.85)};
const salvaFotos=()=>{try{localStorage.setItem('cr-fotos',JSON.stringify(FOTOS.map(f=>({nome:f.nome,src:f.src}))))}catch(e){$('fotosMsg').textContent='O navegador não tem espaço pra guardar todas as fotos; elas valem até fechar a página.'}};
function listaFotos(){$('fotosList').innerHTML=FOTOS.map((f,i)=>`<div class="foto"><img src="${f.src}" alt="Foto de ${esc(f.nome)}"><input type="text" data-fi="${i}" value="${esc(f.nome)}" aria-label="Nome do MC da foto ${i+1}"><button class="btn sm" data-fx="${i}">Tirar</button></div>`).join('');
  $('aFotos').disabled=FOTOS.length>=8;$('fotosMsg').textContent=FOTOS.length?`${FOTOS.length} de 8 fotos.`:'Nenhuma foto ainda.'}
$('fotosList').addEventListener('input',e=>{const i=e.target.dataset.fi;if(i!=null){FOTOS[i].nome=e.target.value;salvaFotos()}});
$('fotosList').addEventListener('click',e=>{const i=e.target.dataset.fx;if(i!=null){FOTOS.splice(+i,1);salvaFotos();listaFotos()}});
$('aFotos').onchange=e=>{const fs=[...e.target.files].slice(0,8-FOTOS.length);let pend=fs.length;fs.forEach(f=>leArquivo(f,im=>{const base=f.name.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ').trim();
  const achou=S.E.concat(linhas()).find(n=>n.toLowerCase()===base.toLowerCase());const src=reduz(im,700);const im2=new Image();im2.src=src;FOTOS.push({nome:achou||base,src,img:im2});
  if(--pend===0){salvaFotos();listaFotos();e.target.value=''}}))};
try{const fs=JSON.parse(localStorage.getItem('cr-fotos')||'[]');FOTOS=fs.map(f=>{const im=new Image();im.src=f.src;return{nome:f.nome,src:f.src,img:im}})}catch(e){}
listaFotos();
$('aCampFoto').onchange=e=>{const f=e.target.files[0];if(f)leArquivo(f,im=>{CAMPFOTO=im;guardaImg('cr-campfoto',im);$('aCampTira').hidden=false})};
$('aCampTira').onclick=()=>{CAMPFOTO=null;$('aCampFoto').value='';$('aCampTira').hidden=true;try{localStorage.removeItem('cr-campfoto')}catch(e){}};
$('aLogo').onchange=e=>{const f=e.target.files[0];if(f)leArquivo(f,im=>{LOGO=im;guardaImg('cr-logo',im);$('aLogoTira').hidden=false})};
$('aLogoTira').onclick=()=>{LOGO=null;$('aLogo').value='';$('aLogoTira').hidden=true;try{localStorage.removeItem('cr-logo')}catch(e){}};
$('aCapa').onchange=e=>{const f=e.target.files[0];if(f)leArquivo(f,im=>{CAPA=im;guardaImg('cr-capa',im);$('aCapaTira').hidden=false})};
$('aCapaTira').onclick=()=>{CAPA=null;$('aCapa').value='';$('aCapaTira').hidden=true;try{localStorage.removeItem('cr-capa')}catch(e){}};
carregaImg('cr-logo',im=>{LOGO=im;$('aLogoTira').hidden=false});carregaImg('cr-capa',im=>{CAPA=im;$('aCapaTira').hidden=false});carregaImg('cr-campfoto',im=>{CAMPFOTO=im;$('aCampTira').hidden=false});
$('aGerar').onclick=()=>gerarArte(false);$('aOutra').onclick=()=>gerarArte(true);$('aBanco').onclick=gerarBanco;
$('aSalvar').onclick=async()=>{if(!LAST)return;const nome=(A.tipo==='div'?'divulgacao-'+slug(A.evento):A.tipo==='chave'?'chave-'+slug(A.evento):'campeao-'+slug(build().champ))+'.png';
  if(DL){try{await DL.save({filename:nome,data:LAST});$('salvarMsg').textContent='Imagem salva.'}catch(e){$('salvarMsg').textContent=e&&e.code==='declined'?'Download cancelado.':'Não deu pra salvar por aqui. Toque e segure a imagem pra salvar.'}}
  else{const a=document.createElement('a');a.href=$('arteImg').src;a.download=nome;document.body.appendChild(a);a.click();a.remove();$('salvarMsg').textContent='Imagem baixada.'}};

/* ---------- início ---------- */
if(!S.E.length){const ex=S.exemplo;montar();S.exemplo=ex;S.aviso='';save()}
render();
