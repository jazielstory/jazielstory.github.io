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
  const ADS_SCRIPT_URL = document.currentScript && document.currentScript.src;
  const ADS_CONFIG_URL = ADS_SCRIPT_URL
    ? new URL("../data/ads-config.json", ADS_SCRIPT_URL).href
    : "/assets/data/ads-config.json";
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

  function isAllowedPopunderUrl(value) {
    try {
      const url = new URL(String(value || "").trim());
      return url.protocol === "https:" &&
        (url.hostname === "profitableratecpmnetwork.com" ||
          url.hostname.endsWith(".profitableratecpmnetwork.com")) &&
        url.pathname.toLowerCase().endsWith(".js");
    } catch {
      return false;
    }
  }

  async function initPopunder() {
    /* Popunder is opt-in. Missing, unreadable, or invalid config means OFF. */
    try {
      const response = await fetch(ADS_CONFIG_URL, { cache: "no-store" });
      if (!response.ok) return;
      const config = await response.json();
      const popunder = config && config.popunder;
      if (!popunder || popunder.enabled !== true ||
          !isAllowedPopunderUrl(popunder.scriptUrl)) return;
      loadScriptOnce("jaziel-ad-popunder", new URL(popunder.scriptUrl).href);
    } catch {
      /* A config/network error must never block Social Bar or banner ads. */
    }
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

  /*
   * Adsterra's banner loader reads the global atOptions object. Loading
   * several copies of the same zone script in parallel can make them race
   * over that shared object, leaving some slots empty. Serialize each slot:
   * set its options, load the zone, then move to the next slot.
   */
  let bannerLoadQueue = Promise.resolve();

  function initBanner(slot) {
    const label = bannerWidthLabel();
    if (slot.dataset.jazielAd === label) return;

    slot.innerHTML = "";
    slot.dataset.jazielAd = label;

    const isMobile = label === "mobile";
    const key = isMobile ? MOBILE_BANNER_KEY : DESKTOP_BANNER_KEY;
    const width = isMobile ? 320 : 300;
    const height = isMobile ? 50 : 250;

    bannerLoadQueue = bannerLoadQueue.then(() => new Promise(resolve => {
      /* A resize may have superseded this queued request. */
      if (!slot.isConnected || slot.dataset.jazielAd !== label) {
        resolve();
        return;
      }

      const configScript = document.createElement("script");
      configScript.text =
        "atOptions = " +
        JSON.stringify({ key, format: "iframe", height, width, params: {} }) +
        ";";
      slot.appendChild(configScript);

      const invokeScript = document.createElement("script");
      invokeScript.async = false;
      invokeScript.src = `https://www.highrevenueformat.com/${key}/invoke.js`;

      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };
      invokeScript.onload = finish;
      invokeScript.onerror = finish;
      /* Do not let one blocked ad request stall every later slot. */
      setTimeout(finish, 15000);
      slot.appendChild(invokeScript);
    })).catch(() => {
      /* One failed banner must not prevent the remaining slots from loading. */
    });
  }

  let adSlotObserver = null;
  const observedAdSlots = new WeakSet();

  function hydrateAdSlot(slot) {
    if (!slot || !slot.isConnected || slot.dataset.jazielAd) return;

    if (slot.classList.contains("article-ad-slot")) {
      const firstArticleSlot = document.querySelector(".article-ad-slot");
      if (slot === firstArticleSlot) {
        /* This provider snippet uses one fixed container ID per document. */
        initNativeBanner(slot);
      } else {
        initBanner(slot);
      }
      return;
    }

    initBanner(slot);
  }

  function fillAdSlots() {
    const slots = document.querySelectorAll(".ad-slot");

    if ("IntersectionObserver" in window) {
      if (!adSlotObserver) {
        adSlotObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            adSlotObserver.unobserve(entry.target);
            observedAdSlots.delete(entry.target);
            hydrateAdSlot(entry.target);
          });
        }, { rootMargin: "300px 0px" });
      }

      slots.forEach(slot => {
        if (slot.dataset.jazielAd || observedAdSlots.has(slot)) return;
        observedAdSlots.add(slot);
        adSlotObserver.observe(slot);
      });
      return;
    }

    /* Older browsers: load all slots immediately as a compatibility fallback. */
    slots.forEach(hydrateAdSlot);
  }

  /* ---------- Responsive swap between 300x250 / 320x50 ---------- */

  let resizeTimer;
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      /* Rebuild already-initialized responsive banners after a size change. */
      document.querySelectorAll(".ad-slot").forEach(slot => {
        if (slot.dataset.jazielAd && slot.dataset.jazielAd !== "native") {
          initBanner(slot);
        }
      });
      fillAdSlots();
    }, 200);
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
