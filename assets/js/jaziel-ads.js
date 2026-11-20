/* =========================================================
   JAZIEL — Monetag advertising integration
   Loads the approved In-Page Push zone once on every public
   page that includes this shared file.
   ========================================================= */
(() => {
  "use strict";

  if (window.__jazielMonetagInPagePushLoaded) return;
  window.__jazielMonetagInPagePushLoaded = true;

  const script = document.createElement("script");
  script.dataset.zone = "12310830";
  script.src = "https://nap5k.com/tag.min.js";
  script.async = true;

  (document.body || document.documentElement).appendChild(script);
})();
