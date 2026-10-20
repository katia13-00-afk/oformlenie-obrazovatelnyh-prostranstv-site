/* Навигация: прячется при прокрутке вниз, подсвечивает текущий раздел */
(function(){
  var h=document.querySelector('header'); if(!h) return;
  var last=window.scrollY||0, ticking=false;
  function onScroll(){
    var y=window.scrollY||0;
    if(document.body.classList.contains('menu-open')){ h.classList.remove('is-hidden'); last=y; return; }
    if(y>220 && y>last+6) h.classList.add('is-hidden'); else if(y<last-6 || y<120) h.classList.remove('is-hidden');
    last=y;
  }
  var links=[].slice.call(document.querySelectorAll('#siteNav a[data-spy]')).filter(function(a){ return document.getElementById(a.getAttribute('data-spy')); });
  var secs=links.map(function(a){ return document.getElementById(a.getAttribute('data-spy')); });
  function spy(){
    if(!secs.length) return;
    var cur=-1, line=window.innerHeight*.35;
    secs.forEach(function(s,i){ var r=s.getBoundingClientRect(); if(r.top<=line && r.bottom>line) cur=i; });
    links.forEach(function(a,i){ var on=i===cur; a.classList.toggle('is-active',on); if(on) a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current'); });
  }
  window.addEventListener('scroll',function(){ if(ticking) return; ticking=true; requestAnimationFrame(function(){ onScroll(); spy(); ticking=false; }); },{passive:true});
  spy();
})();
