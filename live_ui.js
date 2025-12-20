/* Small UI helpers: active nav + scroll reveal
   - Adds 'active' class to the nav link matching the current pathname
   - Uses IntersectionObserver to add 'in-view' for subtle reveal
   - Respects prefers-reduced-motion
*/
(function(){
  if (typeof window === 'undefined') return;

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Active nav link
  function setActiveNav(){
    try{
      var links = document.querySelectorAll('.nav a');
      var path = location.pathname.split('/').pop() || 'index.html';
      links.forEach(function(a){
        var href = (a.getAttribute('href')||'').split('/').pop();
        if (href === path) a.classList.add('active');
        else a.classList.remove('active');
      });
    }catch(e){/* silent */}
  }

  // Scroll reveal using IntersectionObserver
  function initReveal(){
    if (prefersReduced) return;
    var elems = document.querySelectorAll('.main-content section, .project-card, .timeline-item');
    elems.forEach(function(el){
      // Don't set inline opacity/transform which can hide content if
      // the observer doesn't fire. Only ensure a transition is present.
      el.style.transition = el.style.transition || 'opacity 420ms ease, transform 420ms ease';
    });

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) e.target.classList.add('in-view');
      });
    }, { root:null, rootMargin:'0px 0px -6% 0px', threshold:0.06 });

    elems.forEach(function(el){ io.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    setActiveNav();
    initReveal();
  });

})();
