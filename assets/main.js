/* PERHAPI Kalsel — interaksi bersama. Semua blok aman dijalankan di halaman yang tidak memuat elemennya. */
(function(){
  var root=document.documentElement; root.classList.add('js');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hdr=document.getElementById('hdr'),bar=document.getElementById('progress');
  var isHome=!!document.querySelector('.hero');
  var bgs=[].slice.call(document.querySelectorAll('.band .bg'));
  var ticking=false;

  function onScroll(){
    var y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
    hdr.classList.toggle('solid',y>(isHome?innerHeight*0.6:40));
    bar.style.transform='scaleX('+(h>0?y/h:0)+')';
    if(!reduce){bgs.forEach(function(b){
      var r=b.parentElement.getBoundingClientRect();
      if(r.bottom<0||r.top>innerHeight)return;
      var lim=r.height*0.14,off=(r.top+r.height/2-innerHeight/2)*parseFloat(b.dataset.par||.2);
      off=Math.max(-lim,Math.min(lim,off));
      b.style.transform='translate3d(0,'+(-off).toFixed(1)+'px,0)';
    });}
    if(isHome&&y<120){[].forEach.call(document.querySelectorAll('.menu a.on'),function(a){a.classList.remove('on')})}
    ticking=false;
  }
  addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(onScroll);ticking=true}},{passive:true});
  addEventListener('resize',onScroll);onScroll();

  /* reveal */
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    rv.forEach(function(el){io.observe(el)});
  } else rv.forEach(function(el){el.classList.add('in')});

  /* menu: tandai bagian aktif (hanya tautan #anchor di halaman ini) + menu mobile */
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  if('IntersectionObserver' in window&&links.length){
    var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))}).filter(Boolean);
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&scrollY>=120){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){so.observe(s)});
  }
  var burger=document.getElementById('burger'),menu=document.getElementById('menu');
  if(burger&&menu){
    burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);hdr.classList.add('solid')});
    menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded','false')}});
  }

  /* filter berita */
  var chips=document.querySelectorAll('.chip'),posts=document.querySelectorAll('#news .post');
  chips.forEach(function(c){c.addEventListener('click',function(){
    chips.forEach(function(x){x.setAttribute('aria-pressed',x===c)});
    var f=c.dataset.f;
    posts.forEach(function(p){p.classList.toggle('hide',f!=='all'&&p.dataset.c!==f)});
  })});

  /* tab agenda */
  var tabs=[].slice.call(document.querySelectorAll('.tab'));
  function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on})}
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){sel(t)});
    t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){var n=tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];sel(n);n.focus()}});
  });

  /* form pendaftaran (prototipe: belum mengirim email) */
  var form=document.getElementById('joinForm'),done=document.getElementById('done');
  if(form&&done){
    var rules={
      nama:function(v){return v.trim().length>=3||'Tulis nama lengkap, minimal 3 huruf.'},
      email:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())||'Periksa format email, contoh nama@domain.com.'},
      wa:function(v){return !v.trim()||/^(\+62|62|0)8\d{7,11}$/.test(v.replace(/[\s-]/g,''))||'Nomor WhatsApp belum sesuai, contoh 0812xxxxxxx.'},
      instansi:function(v){return v.trim().length>=2||'Isi nama perusahaan atau kampus.'},
      bidang:function(v){return !!v||'Pilih salah satu bidang.'}
    };
    var check=function(id){var el=document.getElementById(id),f=el.closest('.f'),r=rules[id](el.value);
      f.classList.toggle('bad',r!==true);f.querySelector('.err').textContent=r===true?'':r;
      r===true?el.removeAttribute('aria-invalid'):el.setAttribute('aria-invalid','true');return r===true};
    Object.keys(rules).forEach(function(id){var el=document.getElementById(id);
      el.addEventListener('blur',function(){if(el.value)check(id)});
      el.addEventListener('input',function(){if(el.closest('.f').classList.contains('bad'))check(id)});
      el.addEventListener('change',function(){if(el.tagName==='SELECT')check(id)});
    });
    var cw=document.getElementById('consentWrap'),cb=document.getElementById('setuju');
    cb.addEventListener('change',function(){cw.classList.remove('bad')});
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(document.getElementById('website').value)return; /* honeypot anti-spam */
      var ok=Object.keys(rules).map(check).every(Boolean);
      if(!ok){form.querySelector('[aria-invalid]').focus();return}
      if(!cb.checked){cw.classList.add('bad');cb.focus();return}
      var j=form.querySelector('input[name=jenis]:checked').value;
      document.getElementById('subj').textContent='[Pendaftaran '+j+'] '+document.getElementById('nama').value.trim()+' – '+document.getElementById('instansi').value.trim();
      form.style.display='none';done.classList.add('show');done.focus();
    });
    document.getElementById('ulang').addEventListener('click',function(){done.classList.remove('show');form.style.display='';form.reset();document.getElementById('nama').focus()});
  }
})();
