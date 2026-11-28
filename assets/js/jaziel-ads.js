/* =========================================================
   JAZIEL — Monetag and Adsterra advertising integration
   Existing In-Page Push and Vignette zones remain independent.
   Popunder providers are controlled separately by ads-config.json.
   ========================================================= */
(() => {
  "use strict";

  // Existing Monetag In-Page Push zone — unchanged.
  if (!window.__jazielMonetagInPagePushLoaded) {
    window.__jazielMonetagInPagePushLoaded = true;
    const inPagePush = document.createElement("script");
    inPagePush.dataset.zone = "12310830";
    inPagePush.src = "https://nap5k.com/tag.min.js";
    inPagePush.async = true;
    (document.body || document.documentElement).appendChild(inPagePush);
  }

  // Existing Monetag Vignette zone — unchanged.
  if (!window.__jazielMonetagVignetteLoaded) {
    window.__jazielMonetagVignetteLoaded = true;
    const vignette = document.createElement("script");
    vignette.dataset.zone = "12310939";
    vignette.src = "https://n6wxm.com/vignette.min.js";
    vignette.async = true;
    (document.head || document.documentElement).appendChild(vignette);
  }

  function allowedAdsterraUrl(value) {
    try {
      const url = new URL(String(value || ""));
      return url.protocol === "https:" &&
        (url.hostname === "profitableratecpmnetwork.com" ||
          url.hostname.endsWith(".profitableratecpmnetwork.com")) &&
        url.pathname.toLowerCase().endsWith(".js");
    } catch {
      return false;
    }
  }

  function loadMonetagPopunder(settings) {
    if (window.__jazielMonetagOnClickLoaded || settings?.enabled !== true) return;
    const zone = String(settings.zoneId || "12310947");
    if (!/^\d+$/.test(zone)) return;
    window.__jazielMonetagOnClickLoaded = true;
    const script = document.createElement("script");
    script.dataset.zone = zone;
    script.src = "https://al5sm.com/tag.min.js";
    script.async = true;
    (document.head || document.documentElement).appendChild(script);
  }

  function loadAdsterraPopunder(settings) {
    if (window.__jazielAdsterraPopunderLoaded || settings?.enabled !== true) return;
    const src = String(settings.scriptUrl || "");
    if (!allowedAdsterraUrl(src)) return;
    window.__jazielAdsterraPopunderLoaded = true;
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    (document.head || document.documentElement).appendChild(script);
  }

  async function initializePopunders() {
    const scriptElement = document.currentScript;
    const configUrl = scriptElement?.src
      ? new URL("../data/ads-config.json", scriptElement.src).href
      : new URL("/assets/data/ads-config.json", window.location.origin).href;
    try {
      const response = await fetch(configUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("Ad configuration unavailable");
      const config = await response.json();
      if (config?.version >= 3) {
        loadMonetagPopunder(config.popunder?.monetag);
        loadAdsterraPopunder(config.popunder?.adsterra);
        return;
      }
      // Backward compatibility: v2's single toggle represented Monetag OnClick.
      if (config?.version === 2 && config.popunder?.enabled === true) {
        loadMonetagPopunder({ enabled: true, zoneId: "12310947" });
      }
      // Legacy v1 was the former Admin-controlled Adsterra toggle.
      if (config?.version === 1 && config.popunder?.enabled === true) {
        loadAdsterraPopunder({ enabled: true, scriptUrl: config.popunder.scriptUrl });
      }
    } catch (error) {
      console.warn("Jaziel Popunder configuration:", error);
    }
  }

  initializePopunders();
})();
