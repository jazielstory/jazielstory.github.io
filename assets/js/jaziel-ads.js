/* =========================================================
   JAZIEL — Advertising integration (Adsterra)
   Loaded on every public page. Responsibilities:
     1. Load Popunder — exactly once per HTML document.
     2. Load Social Bar — exactly once per HTML document.
     3. Fill existing .ad-slot placeholders:
        - .ad-slot.article-ad-slot  -> Native Banner 4:1 for the FIRST
                                       such slot on the page (its
                                       Adsterra snippet uses one fixed
                                       container id, so it can only be
                                       instantiated once per document);
                                       any additional article-ad-slot
                                       positions fall back to the
                                       300x250 / 320x50 banner below
        - .ad-slot (all others)     -> 300x250 (desktop/tablet)
                                       or 320x50 (mobile)
   This file does not touch layout, pagination or article
   data — it only fills the .ad-slot containers that already
   exist in the markup/generator, and never fills the same
   slot twice.
   ========================================================= */
(() => {
  "use strict";

  const MOBILE_QUERY = "(max-width: 759px)";

  const DESKTOP_BANNER_KEY = "86c93233fc95e08e7f3a2b57dd0e2a25";
  const MOBILE_BANNER_KEY = "d839145e8aeac0b0e354df1e1d1194f5";
  const NATIVE_BANNER_CONTAINER_ID = "container-80079ecb01bef79f6a3491bfd4857916";
  const NATIVE_BANNER_SRC =
    "https://pl32296917.profitableratecpmnetwork.com/80079ecb01bef79f6a3491bfd4857916/invoke.js";
  const POPUNDER_SRC =
    "https://pl32296916.profitableratecpmnetwork.com/75/30/fd/7530fd5e296928b88bd3fc7ea6100a04.js";
  const SOCIAL_BAR_SRC =
    "https://pl32296918.profitableratecpmnetwork.com/7d/50/97/7d50973958e288a776e849f6f40dd48f.js";

  /* ---------- Site-wide, once-per-page scripts ---------- */

  function loadScriptOnce(id, src) {
    if (document.getElementById(id)) return;
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    document.head.appendChild(script);
  }

  function initPopunder() {
    loadScriptOnce("jaziel-ad-popunder", POPUNDER_SRC);
  }

  function initSocialBar() {
    loadScriptOnce("jaziel-ad-socialbar", SOCIAL_BAR_SRC);
  }

  /* ---------- .ad-slot filling ---------- */

  function initNativeBanner(slot) {
    if (slot.dataset.jazielAd) return;
    slot.dataset.jazielAd = "native";

    const container = document.createElement("div");
    container.id = NATIVE_BANNER_CONTAINER_ID;
    slot.appendChild(container);

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = NATIVE_BANNER_SRC;
    slot.appendChild(script);
  }

  function bannerWidthLabel() {
    return window.matchMedia(MOBILE_QUERY).matches ? "mobile" : "desktop";
  }

  function initBanner(slot) {
    const label = bannerWidthLabel();
    if (slot.dataset.jazielAd === label) return;

    slot.innerHTML = "";
    slot.dataset.jazielAd = label;

    const isMobile = label === "mobile";
    const key = isMobile ? MOBILE_BANNER_KEY : DESKTOP_BANNER_KEY;
    const width = isMobile ? 320 : 300;
    const height = isMobile ? 50 : 250;

    const configScript = document.createElement("script");
    configScript.text =
      "atOptions = " +
      JSON.stringify({ key, format: "iframe", height, width, params: {} }) +
      ";";
    slot.appendChild(configScript);

    const invokeScript = document.createElement("script");
    invokeScript.src = `https://www.highrevenueformat.com/${key}/invoke.js`;
    slot.appendChild(invokeScript);
  }

  function fillAdSlots() {
    const nativeCandidates = [];
    document.querySelectorAll(".ad-slot").forEach(slot => {
      if (slot.classList.contains("article-ad-slot")) {
        nativeCandidates.push(slot);
      } else {
        initBanner(slot);
      }
    });

    /* The Adsterra Native Banner snippet targets one hardcoded container
       id (NATIVE_BANNER_CONTAINER_ID). That id must never appear twice in
       the same document, so only the first .article-ad-slot on the page
       (in document order) becomes the Native Banner. Any further
       .article-ad-slot positions on the same page reuse the existing
       300x250 / 320x50 banner instead of an invalid duplicate id. */
    nativeCandidates.forEach((slot, index) => {
      if (index === 0) {
        initNativeBanner(slot);
      } else {
        initBanner(slot);
      }
    });
  }

  /* ---------- Responsive swap between 300x250 / 320x50 ---------- */

  let resizeTimer;
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fillAdSlots, 200);
  }

  /* ---------- Watch for ad-slots added after initial load
     (e.g. article.html renders its content asynchronously) ---------- */

  function observeAdSlots() {
    const target = document.body || document.documentElement;
    if (!target) return;
    const observer = new MutationObserver(fillAdSlots);
    observer.observe(target, { childList: true, subtree: true });
  }

  function init() {
    initPopunder();
    initSocialBar();
    fillAdSlots();
    observeAdSlots();
    window.addEventListener("resize", handleResize);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
