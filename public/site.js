// ONE OF ONE — shared site behaviour: theme persistence, scroll reveals, parallax.
(function () {
  var root = document.documentElement;
  try { var saved = localStorage.getItem("ofo-theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}

  // Rect-based (not IntersectionObserver): clip-path:inset(100%) makes IO report 0 intersection.
  var pending = [];
  function show(el) {
    el.setAttribute("data-shown", "1");
    if (el.hasAttribute("data-reveal")) {
      el.style.clipPath = "inset(0 0 0 0)";
      var img = el.querySelector("img");
      if (img) img.style.transform = "scale(1)";
    }
    if (el.hasAttribute("data-rise")) {
      el.style.opacity = "1";
      el.style.transform = "none";
    }
  }
  function check() {
    var h = window.innerHeight;
    pending = pending.filter(function (el) {
      if (!el.isConnected) return false;
      if (el.closest("[data-hold]")) return true;
      var r = el.getBoundingClientRect();
      if (r.top < h * 0.94 && r.bottom > 0) { show(el); return false; }
      return true;
    });
  }
  function scan() {
    document.querySelectorAll("[data-reveal]:not([data-seen]),[data-rise]:not([data-seen])").forEach(function (el) {
      el.setAttribute("data-seen", "1");
      pending.push(el);
    });
    check();
  }
  function parallax() {
    var h = window.innerHeight;
    document.querySelectorAll("[data-parallax]").forEach(function (el) {
      var box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -200 || box.top > h + 200) return;
      var f = parseFloat(el.getAttribute("data-parallax")) || 0;
      var off = (box.top + box.height / 2 - h / 2) * f;
      el.style.transform = "translate3d(0," + off.toFixed(1) + "px,0)";
    });
  }
  function tick() { check(); parallax(); }
  function init() {
    var scheduled = false;
    function schedule() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () { scheduled = false; scan(); });
    }
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; tick(); });
    }, { passive: true });
    window.addEventListener("resize", tick);
    scan();
    parallax();
  }
  if (document.body) init(); else document.addEventListener("DOMContentLoaded", init);

  window.OFO = {
    setTheme: function (name) {
      root.setAttribute("data-theme", name);
      try { localStorage.setItem("ofo-theme", name); } catch (e) {}
    },
    release: function () {
      document.querySelectorAll("[data-hold]").forEach(function (el) { el.removeAttribute("data-hold"); });
      check();
    }
  };
})();
