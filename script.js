(function(){
  var TOTAL=23, routes=['accueil','cv','portfolio','contact'];
  var views={}, links=document.querySelectorAll('nav a');
  routes.forEach(function(r){views[r]=document.getElementById(r)});
  document.getElementById('y').textContent=new Date().getFullYear();

  function show(){
    var r=location.hash.replace('#','');
    if(routes.indexOf(r)<0) r='accueil';
    routes.forEach(function(k){views[k].classList.toggle('on',k===r)});
    links.forEach(function(a){a.classList.toggle('on',a.dataset.route===r)});
    document.title=(r==='accueil'?'':views[r].dataset.title+' – ')+'FERREIRA BRITES Dario';
    if(r==='portfolio') build();
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange',show); show();

  /* Portfolio : pages JPEG haute définition, chargement différé */
  var built=false, srcs=[];
  for(var i=1;i<=TOTAL;i++) srcs.push('assets/portfolio/p-'+(i<10?'0':'')+i+'.jpg');
  function build(){
    if(built) return; built=true;
    var box=document.getElementById('pages');
    srcs.forEach(function(s,i){
      var b=document.createElement('button'), im=new Image();
      b.setAttribute('aria-label','Agrandir la page '+(i+1));
      im.loading='lazy'; im.decoding='async'; im.alt='Portfolio, page '+(i+1)+' sur '+TOTAL; im.src=s;
      im.onload=function(){im.classList.add('ok')};
      b.appendChild(im); b.onclick=function(){open(i)}; box.appendChild(b);
    });
  }

  /* Visionneuse */
  var lb=document.getElementById('lb'), li=document.getElementById('lb-img'),
      lc=document.getElementById('lb-c'), st=lb.querySelector('.lb-stage'), cur=0;
  function open(i){cur=i;lb.hidden=false;document.body.style.overflow='hidden';draw()}
  function draw(){st.classList.remove('zoom');li.src=srcs[cur];lc.textContent=(cur+1)+' / '+TOTAL;st.scrollTo(0,0)}
  function go(d){cur=(cur+d+TOTAL)%TOTAL;draw()}
  function close(){lb.hidden=true;document.body.style.overflow=''}
  lb.querySelector('.lb-x').onclick=close;
  lb.querySelector('.lb-p').onclick=function(){go(-1)};
  lb.querySelector('.lb-n').onclick=function(){go(1)};
  li.onclick=function(){st.classList.toggle('zoom')};
  document.addEventListener('keydown',function(e){
    if(lb.hidden) return;
    if(e.key==='Escape') close(); if(e.key==='ArrowLeft') go(-1); if(e.key==='ArrowRight') go(1);
  });
  var x0=null;
  st.addEventListener('touchstart',function(e){x0=e.touches.length===1&&!st.classList.contains('zoom')?e.touches[0].clientX:null},{passive:true});
  st.addEventListener('touchend',function(e){
    if(x0===null) return; var d=e.changedTouches[0].clientX-x0;
    if(Math.abs(d)>60) go(d<0?1:-1); x0=null;
  });
})();
