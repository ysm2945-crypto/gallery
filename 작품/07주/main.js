(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 첫 화면 — 방 사진이 영상처럼 차례로 바뀐다(장면마다 2.8초) */
  var reel = $$('.reel img'), k = 0;
  function shot() { reel.forEach(function (im, j) { im.classList.toggle('is-on', j === k); }); }
  if (reel.length) { shot(); if (!still) setInterval(function () { k = (k + 1) % reel.length; shot(); }, 2800); }

  /* 흐르는 글자 — 같은 문장이 두 번 들어 있어, 한 번 길이만큼 흐르면 처음으로 돌아가 끊김 없이 이어진다 */
  var tps = $$(".rb-tp"), half = 0, x = 0;
  function measure() { var t = $(".rb-raw"); half = t ? t.getComputedTextLength() / 2 : 0; }
  if (tps.length && !still) {
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () {
      measure();
      (function loop() { x -= 0.9; if (half && -x >= half) x += half; tps.forEach(function (tp) { tp.setAttribute("startOffset", x); }); requestAnimationFrame(loop); })();
    });
  }

  /* 들여다보기 — 왼쪽 탭을 누르거나 4.5초마다 다음 장면 */
  $$('[data-steps]').forEach(function (box) {
    var tabs = $$('.step-tabs li', box), imgs = $$('.step-media img', box), texts = $$('.step-text > div', box), bar = $('.step-bar i', box), cur = 0, timer, DUR = 4500;
    function go(i) {
      cur = i;
      [tabs, imgs, texts].forEach(function (list) { list.forEach(function (el, j) { el.classList.toggle('is-on', j === i); }); });
      if (bar) { bar.style.transition = 'none'; bar.style.width = '0'; void bar.offsetWidth; if (!still) { bar.style.transition = 'width ' + DUR + 'ms linear'; bar.style.width = '100%'; } }
      clearTimeout(timer); if (!still) timer = setTimeout(function () { go((cur + 1) % tabs.length); }, DUR);
    }
    tabs.forEach(function (t, i) { $('button', t).addEventListener('click', function () { go(i); }); });
    go(0);
  });

  /* 메뉴 가운데 알약 — 지금 보고 있는 구역을 표시 */
  var segs = $$('.seg a');
  function onScroll() {
    var y = window.scrollY + window.innerHeight * .4, on = -1;
    segs.forEach(function (a, i) { var t = $(a.getAttribute('href')); if (t && t.offsetTop <= y) on = i; });
    segs.forEach(function (a, i) { a.classList.toggle('is-on', i === Math.max(on, 0)); });
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* 가까이 — 탭과 + 표식 */
  var tabs = $$('.tabs button'), scenes = $$('.scene');
  function closeSpots() { $$('.spot.is-open').forEach(function (s) { s.classList.remove('is-open'); }); }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      closeSpots();
      tabs.forEach(function (x, j) { x.classList.toggle('is-on', j === i); x.setAttribute('aria-selected', j === i); });
      scenes.forEach(function (s, j) { s.classList.toggle('is-on', j === i); });
    });
  });
  $$('.spot > button').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var s = b.parentNode, open = s.classList.contains('is-open');
      closeSpots(); if (!open) s.classList.add('is-open');
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.card')) closeSpots(); });

  /* 스티커 — 자기 자리가 화면 아래쪽 88% 선에 닿으면 하나씩 뿅 (스크롤 위치로 직접 확인) */
  var stks = $$(".stk");
  function popCheck() {
    var line = window.innerHeight * 0.88;
    stks = stks.filter(function (k) {
      if (k.getBoundingClientRect().top < line) { k.classList.add("is-in"); return false; }
      return true;
    });
    if (!stks.length) window.removeEventListener("scroll", popCheck);
  }
  if (stks.length) {
    if (still) stks.forEach(function (k) { k.classList.add("is-in"); });
    else { window.addEventListener("scroll", popCheck, { passive: true }); window.addEventListener("resize", popCheck); popCheck(); }
  }

  /* 사진 크게 보기 */
  var lb = $('.lb'), lbImg = $('img', lb);
  $$('.intro-fig img, .step-media img, .room img, .scene > img, .gz-grid img').forEach(function (im) {
    im.addEventListener('click', function () { lbImg.src = im.src; lbImg.alt = im.alt; lb.hidden = false; });
  });
  lb.addEventListener('click', function (e) { if (e.target !== lbImg) lb.hidden = true; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { lb.hidden = true; closeSpots(); } });

  /* 스크롤 등장 */
  if ('IntersectionObserver' in window && !still) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.sec > h2, .panel > h2, .sub, .intro-grid > *, .steps, .room, .box, .finale-in, .gz-group, .objs, .crit, .arc-take').forEach(function (el, i) {
      el.classList.add('rv'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el);
    });
  }
})();

/* 마우스 — 움직이면 일정 거리마다 작은 하트가 떠오른다 (커서 모양은 CSS의 픽셀 화살표) */
(function () {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var last = 0, lx = 0, ly = 0;
  window.addEventListener("mousemove", function (e) {
    var now = performance.now(), d = Math.hypot(e.clientX - lx, e.clientY - ly);
    if (now - last > 110 && d > 46) {
      last = now; lx = e.clientX; ly = e.clientY;
      var h = document.createElement("i"); h.className = "cur-heart";
      h.style.left = (e.clientX + 10) + "px"; h.style.top = (e.clientY + 14) + "px"; h.style.setProperty("--dx", (Math.random() * 20 - 10).toFixed(0) + "px");
      document.body.appendChild(h); setTimeout(function () { h.remove(); }, 900);
    }
  }, { passive: true });
})();

/* 4장 물건 — 카드를 누르면 상세가 열린다. Esc · 닫기 단추 · 바깥 누르기로 닫히고, 닫히면 누른 카드로 돌아간다 */
(function () {
  var opener = null;
  Array.prototype.forEach.call(document.querySelectorAll('.obj-open'), function (b) {
    b.addEventListener('click', function () {
      var d = document.getElementById(b.getAttribute('data-dlg'));
      if (!d) return;
      opener = b;
      if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
      var x = d.querySelector('.obj-x'); if (x) x.focus();
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('.obj-dlg'), function (d) {
    function shut() { if (typeof d.close === 'function') d.close(); else { d.removeAttribute('open'); if (opener) opener.focus(); } }
    d.querySelector('.obj-x').addEventListener('click', shut);
    d.addEventListener('click', function (e) { if (e.target !== d) return; var r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) shut(); });
    d.addEventListener('close', function () { if (opener) opener.focus(); });
  });
})();
