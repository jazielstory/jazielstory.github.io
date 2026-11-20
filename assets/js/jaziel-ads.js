/* =========================================================
   JAZIEL — Monetag advertising integration
   Loads the approved In-Page Push and Vignette zones once.
   ========================================================= */
(() => {
  "use strict";

  // In-Page Push — existing zone. Keep this separate from Vignette.
  if (!window.__jazielMonetagInPagePushLoaded) {
    window.__jazielMonetagInPagePushLoaded = true;
    const inPagePush = document.createElement("script");
    inPagePush.dataset.zone = "12310830";
    inPagePush.src = "https://nap5k.com/tag.min.js";
    inPagePush.async = true;
    (document.body || document.documentElement).appendChild(inPagePush);
  }

  // Vignette — newly created zone. Load once in the document head.
  if (!window.__jazielMonetagVignetteLoaded) {
    window.__jazielMonetagVignetteLoaded = true;
    const vignette = document.createElement("script");
    vignette.dataset.zone = "12310939";
    vignette.src = "https://n6wxm.com/vignette.min.js";
    vignette.async = true;
    (document.head || document.documentElement).appendChild(vignette);
  }
})();
