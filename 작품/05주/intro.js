/* 낭독형 첫 화면 열기 (2026-10-19 학생 요청 — neutomni.com 시작 부분 참고 · 10-20 수정: 먹 번짐 → 블러로 서서히 사라짐)
   먹색 덮개 위에 이름 · 가운데 점선 → 가위가 점선을 따라 자르고 → 덮개가 위아래로 살짝 벌어지며
   흐려지고(블러) 서서히 사라진다. 글자는 index.html의 이름을 그대로 빌려 온다(새 문구 없음).
   움직임 0(--my-motion: 0)이나 '동작 줄이기' 설정이면 건너뛴다. 클릭하거나 키를 누르면 바로 열린다. */
(function () {
  var root = document.documentElement;
  var motion = parseFloat(getComputedStyle(root).getPropertyValue("--my-motion")) || 0;
  if (motion === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var nameEl = document.querySelector(".mc-hero__name .mc-name") || document.querySelector(".mc-hero__name");
  var name = nameEl ? nameEl.textContent.trim() : "";

  var box = document.createElement("div");
  box.className = "ink-intro";
  box.setAttribute("aria-hidden", "true");
  box.innerHTML =
    '<div class="ink-half ink-half--top"><span class="ink-name"></span></div>' +
    '<div class="ink-half ink-half--bottom"></div>' +
    '<div class="ink-line"><span class="ink-line__cut"></span><span class="ink-scissors">✂</span></div>';
  box.querySelector(".ink-name").textContent = name;
  document.body.appendChild(box);
  root.classList.add("ink-lock");

  var CUT = 1300, OPEN = 1400, start = null, done = false;
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function frame(now) {
    if (done) return;
    if (start === null) start = now;
    var t = now - start;
    var c = Math.min(Math.max((t - 250) / CUT, 0), 1);            // 가위 진행
    box.style.setProperty("--cut", (ease(c) * 100).toFixed(2) + "%");
    var o = Math.min(Math.max((t - 250 - CUT - 120) / OPEN, 0), 1); // 흐려지며 사라짐 진행
    if (o > 0) box.classList.add("is-open");
    box.style.setProperty("--open", ease(o).toFixed(4));
    if (o >= 1) return finish();
    requestAnimationFrame(frame);
  }
  function finish() {
    if (done) return; done = true;
    root.classList.remove("ink-lock");
    if (box.parentNode) box.parentNode.removeChild(box);
  }
  function skip() { box.classList.add("is-skip"); setTimeout(finish, 400); }
  box.addEventListener("click", skip);
  window.addEventListener("keydown", function k() { skip(); window.removeEventListener("keydown", k); });
  requestAnimationFrame(frame);
})();
