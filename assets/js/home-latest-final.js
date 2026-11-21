/* JAZIEL — homepage story authority */
(() => {
  "use strict";
  const DATA_URL = new URL("articles.json", document.baseURI).href + `?homepageFinal=${Date.now()}`;
  const dateValue = article => new Date(article.updatedAt || article.updated || article.date || 0).getTime() || 0;
  function esc(value) {
    return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  function url(article) { return `articles/${encodeURIComponent(article.slug || "")}.html`; }
  function newest(articles) { return [...articles].sort((a, b) => dateValue(b) - dateValue(a)); }
  function viewCount(article) {
    const value = article.views ?? article.viewCount ?? article.viewsCount;
    const count = Number(value);
    return Number.isFinite(count) && count >= 0 ? count : 0;
  }
  function renderCategories(articles) {
    const nav = document.querySelector(".category-nav");
    if (!nav) return;
    const categories = [...new Set(articles.map(a => String(a.category || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    nav.innerHTML = [
      '<a class="category-chip active" href="#latest">Latest</a>',
      '<a class="category-chip" href="#popular">Popular</a>',
      ...categories.map(category => `<a class="category-chip" href="category.html?category=${encodeURIComponent(category)}">${esc(category)}</a>`)
    ].join("");
  }
  function renderFeatured(articles) {
    const card = document.querySelector(".featured-card");
    if (!card) return;
    const article = articles.find(item => item.featured === true) || articles[0];
    if (!article) { card.hidden = true; return; }
    card.hidden = false;
    card.href = url(article);
    const category = card.querySelector(".story-category");
    const title = card.querySelector("h2");
    const description = card.querySelector("p");
    const meta = card.querySelector(".story-meta");
    const image = card.querySelector(".featured-image");
    if (category) category.textContent = article.category || "Featured Story";
    if (title) title.textContent = article.title || "";
    if (description) description.textContent = article.description || article.dek || "";
    if (meta) meta.textContent = [article.readTime, article.date].filter(Boolean).join(" · ");
    if (image) {
      image.style.backgroundImage = article.cover ? `url(${JSON.stringify(article.cover)})` : "none";
      image.style.backgroundSize = "cover";
      image.style.backgroundPosition = "center";
    }
  }
  function renderLatest(articles) {
    const list = document.querySelector(".story-list");
    if (!list) return;
    if (!articles.length) { list.innerHTML = '<p class="empty-state">No stories have been published yet.</p>'; return; }
    list.innerHTML = articles.map(article => `
      <a class="story-card" href="${esc(url(article))}">
        <div class="story-thumb" style="${article.cover ? `background-image:url('${esc(article.cover)}');background-size:cover;background-position:center` : ""}" aria-hidden="true"></div>
        <div><div class="story-category">${esc(article.category || "Story")}</div>
          <h3>${esc(article.title || "")}</h3>
          <p class="story-excerpt">${esc(article.description || article.dek || "")}</p>
          <div class="story-meta">${esc(article.readTime || "")}${article.date ? ` · ${esc(article.date)}` : ""}</div>
        </div>
      </a>`).join("");
  }
  function renderPopular(articles) {
    const list = document.querySelector(".popular-list");
    if (!list) return;
    const hasViewData = articles.some(article => ["views", "viewCount", "viewsCount"].some(key =>
      article[key] !== undefined && article[key] !== null && article[key] !== "" && Number.isFinite(Number(article[key]))
    ));
    const ranked = [...articles].sort((a, b) => (hasViewData ? viewCount(b) - viewCount(a) : 0) || dateValue(b) - dateValue(a)).slice(0, 5);
    if (!ranked.length) { list.innerHTML = '<li class="empty-state">Popular stories will appear here.</li>'; return; }
    list.innerHTML = ranked.map(article => `
      <li class="popular-item"><a href="${esc(url(article))}"><h3>${esc(article.title || "")}</h3>
        <div class="story-meta">${esc(article.category || "Trending")}${hasViewData ? ` · ${viewCount(article).toLocaleString()} views` : ` · ${esc(article.readTime || "")}`}</div>
      </a></li>`).join("");
  }
  function render(articles) {
    const valid = articles.filter(article => article && typeof article === "object" && article.slug);
    const sorted = newest(valid);
    renderCategories(sorted); renderFeatured(sorted); renderLatest(sorted); renderPopular(sorted);
  }
  function showLoadError() {
    const card = document.querySelector(".featured-card");
    if (card) card.hidden = true;
    const list = document.querySelector(".story-list");
    const popular = document.querySelector(".popular-list");
    if (list) list.innerHTML = '<p class="empty-state">Stories could not be loaded. Please refresh the page.</p>';
    if (popular) popular.innerHTML = '<li class="empty-state">Popular stories are temporarily unavailable.</li>';
  }
  function init() {
    fetch(DATA_URL, { cache: "no-store" })
      .then(response => { if (!response.ok) throw new Error(`articles.json HTTP ${response.status}`); return response.json(); })
      .then(data => render(Array.isArray(data.articles) ? data.articles : []))
      .catch(error => { console.warn("Jaziel homepage loader:", error); showLoadError(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
