## 2026-11-21 — George Orwell, poverty, work, and human dignity article draft

- **Status:** DRAFT SAVED / NOT PUBLISHED.
- **Draft file:** `admin/drafts/when-working-is-no-longer-enough-george-orwell-poverty-human-dignity.json`.
- **Slug:** `when-working-is-no-longer-enough-george-orwell-poverty-human-dignity`.
- **Change:** Added the English Jaziel Story article adapted from the Indonesian version reviewed and approved by the user. It explores Orwell's experiences in Paris and London, poverty beyond income, the cycle of low-wage survival, decent work, modern inequality, and human dignity.
- **Editorial accuracy:** The social-media poster's wording is not presented as a verified direct Orwell quotation. The article refers to *Down and Out in Paris and London* (1933) and distinguishes thematic inspiration from a documented quotation.
- **Images:** Cover and body image fields remain empty for later editorial selection.
- **Article Schema v1:** Unchanged. `articles.json`, public article pages, and publication status were not modified.
- **Draft commit:** `02f61452ea795d34ed8d491f56d70b7fdc78aaf0`.
- **Verification:** Draft was fetched back from GitHub, parsed as JSON, and checked for draft status, slug, and all 6 article sections. Live Admin Panel display and deployment were not checked.

## Google Analytics 4 — 2026-11-20

- GA4 Measurement ID: `G-HC6NTTN5KP` (Jaziel Story property).
- GA4 `gtag.js` installed in the `<head>` of all 9 public root HTML pages and 5 generated article pages. `admin/index.html` intentionally excluded.
- Future generated articles inherit the GA4 tag from `article.html` via `.github/scripts/generate-static-articles.mjs`. Do not add another tag in the generator to avoid duplicate page views.
- Privacy Policy updated to disclose Google Analytics and cookies. Article Schema v1, pagination, SEO metadata, and ad loader unchanged.
- Verify after deployment: visit public pages with browser tracking enabled, then check GA4 Realtime. Tag presence does not guarantee events are received.

## 2026-11-20 — Banner slot loading and article pagination fix

- Public HTML templates and generated article pages use the bumped `jaziel-ads.js?v=20261120-2` cache key so visitors do not keep the previous loader from browser/CDN cache.
- Banner slots now load one at a time so the shared Adsterra `atOptions` configuration is not overwritten by parallel zone-script requests.
- Homepage banner slots are initialized as they approach the viewport, rather than firing every zone script at once.
- Article-page banner slots in hidden pagination sections wait until their page is displayed and the slot approaches the viewport.
- The first article Native Banner keeps its provider-required fixed container ID; additional article slots use the responsive 300×250 / 320×50 banner unit.
- Responsive banner slots are refreshed when the viewport crosses the mobile/desktop breakpoint. Popunder and Social Bar loading remain independent.
- No article content, SEO metadata, pagination structure, or Article Schema v1 fields were changed.
- **Implementation commits:** `8ebcc813746b33090b815a7cd85591b6f0010fa2` (slot-loading logic) and `e27b17c936f80acf90f063af77f3f47fdc1bbe31` (public-page cache refresh).

# Jaziel — Trending Stories

## 2026-11-20 — Admin Popunder control

- Added a dedicated ON/OFF control in Admin Panel → Settings for Adsterra Popunder.
- The public loader reads `assets/data/ads-config.json`; a missing, invalid, or disabled configuration leaves Popunder OFF.
- Only HTTPS Adsterra JavaScript URLs on `*.profitableratecpmnetwork.com` are accepted. Arbitrary inline script snippets are not stored.
- Social Bar, Native Banner, and responsive banner placements remain independent and unchanged.
- The configuration file is public and contains no credentials. GitHub tokens remain in the browser session and are never written to repository files.
- Save requires a GitHub token with repository Contents read/write permission; changes apply after GitHub Pages deployment.

A static, GitHub Pages–hosted trending-stories site, plus an Admin Panel
for creating and managing articles without hand-editing `articles.json`.

Live site: https://jazielstory.site/

## 2026-11-20 — Fire Rescue article draft revised and English slug adopted

- **Status:** DRAFT SAVED / NOT PUBLISHED.
- **Draft file:** `admin/drafts/a-fire-rescue-gift-for-my-child-papua.json`.
- **Previous file removed:** `admin/drafts/sebuah-hadiah-fire-rescue-untuk-anakku.json`.
- **New slug:** `a-fire-rescue-gift-for-my-child-papua`.
- **Change:** Replaced the earlier draft with a complete English-language article. The story keeps the father's Fire Rescue gift at its centre and explains Papua's need for accessible, equipped, trained fire and rescue services; it also discusses forest fires, environmental protection, Indigenous communities, Papua's history, political self-determination, and the author's criticism of policies that fail to protect Papuans.
- **Images:** Existing cover path retained; body images remain empty and were not changed.
- **Publishing:** No changes to `articles.json`, public article pages, or publication status. The article remains an unpublished draft.
- **Commits:** Draft replacement `c6da18b68157f6ce1d569b5d7b5abda21c022760`; old draft removal `5122b5a6e72f032fd2cdd00b7ce8cc8889acf6c5`.
- **Verification:** Draft JSON was written successfully; final read-back verification pending.

## 2026-11-19 — Static article 404 and custom-domain SEO fix

- **Status:** IMPLEMENTED / GENERATOR VERIFIED / LIVE DEPLOYMENT PENDING.
- **Files changed:** `.github/scripts/generate-static-articles.mjs`, `.github/workflows/generate-static-articles.yml`, `index.html`, `article.html`, `README.md`, `CHANGELOG.md`.
- **Root cause:** The generator created new article pages as untracked files. The workflow checked `git diff --quiet -- articles/` before staging them; Git does not include untracked files in that diff, so it incorrectly reported “already up to date” and skipped committing newly created pages.
- **Fix:** The workflow now force-stages newly generated pages before checking the diff, verifies that every article in `articles.json` has a generated HTML file, and commits all changed/new pages.
- **SEO:** The generator, homepage canonical/OG/Twitter metadata, and legacy article template now use `https://jazielstory.site`. The repository `CNAME` remains unchanged.
- **Safety:** Article Schema v1, article content, draft files, and the CNAME record were not changed.
- **Verification:** GitHub Actions run `44514670193` completed successfully. Its output verification confirmed all 4 article pages; generated page `articles/first-baby-facts-mother-childbirth.html` was committed in `a7e316bc9951fd5bd815e67cb89c3fc8eac1ae69`. Source inspection confirmed the new page uses the custom-domain canonical and OG URLs. GitHub Pages live deployment is the remaining check.

## Editorial standard — article headings, body text, image alt text, and captions (2026-11-20)

Use this standard whenever creating, editing, or generating Jaziel Story articles. The four elements have different jobs and must not repeat one another.

1. **Heading:** A concise, informative label that introduces the section's subject. It is not a summary paragraph and should not repeat the full body text.
2. **Body text:** The main explanation and source of the article's value. Explain the fact with context, how/why it happens, relevant details, and accurate qualifications. Prefer clear, natural paragraphs; do not use the image caption as a substitute for article content.
3. **Image alt text:** A concise, objective description of what is visibly present in that specific image, written for accessibility and readers who cannot see it. Describe the actual subject, action, and relevant visual details. Do not write promotional language, “Did you know?” hooks, keyword lists, or repeat the article paragraph. Do not claim visual details that are not shown.
4. **Image caption:** Optional short supporting context for readers who can see the image. Add a useful visual explanation, label, or detail that complements the body text. Do not simply copy the body paragraph or restate the heading. If the caption adds no new value, leave it empty rather than forcing repetition.

### Required editorial workflow for image-based fact articles

- Write the heading and body text first; the body text carries the complete explanation.
- Then write alt text from the actual image, not from the article paragraph alone.
- Add a caption only when it contributes distinct context or helps interpret the image.
- Check each section for duplication: heading = topic; body = explanation; alt = visual description; caption = supplementary context.
- Keep medical/scientific claims accurate, appropriately qualified, and supported by reliable sources. Do not invent precision or imply that an illustrative image is a clinical photograph.
- For a series of body images, keep the visual style consistent while ensuring each image and its alt text match the correct article section.

**AI content-generation instruction:** When asked to create Jaziel Story content, apply this separation automatically. Never make the alt text, caption, heading, and body paragraph four paraphrases of the same sentence.

**Scope:** Editorial guidance only. This entry does not change the Admin Panel, AI Writer implementation, Article Schema v1, articles.json, existing articles, or publication status.

## Site structure

```
index.html         Homepage
article.html       Single article view (?slug=…)
search.html        Search
category.html      Category browsing
about.html, contact.html, privacy.html, terms.html
articles.json      All article data (root of the repo — do not move)
assets/css/style.css  Shared stylesheet
assets/css/article-pagination.css  Article pagination UI
assets/js/main.js     Shared frontend logic (reads articles.json)
assets/js/article-pagination.js  Article pagination helper (max 2 sections/page)
assets/js/home-featured-minimal.js  Lightweight homepage presentation helper
assets/js/home-latest-final.js      Single homepage data/render loader
assets/images/articles/  Article images (cover + body), uploaded via the Admin Panel
assets/images/og/         Website Open Graph cover image
```

The homepage intentionally uses one dedicated data/render loader so
`main.js` does not initialize the same homepage twice. Article Schema v1
remains unchanged and locked.

## Article URL routing and social previews

Newly published and shared articles use generated static pages at `articles/{slug}.html`. Each page contains its own server-readable Open Graph and Twitter metadata in the initial HTML response.

- Canonical article route: `https://jazielstory.site/articles/{slug}.html`.
- The generator reads the existing `articles.json` Article Schema v1 and uses the article's OG title, OG description, OG image, and cover fallback.
- OG image URLs are absolute HTTPS URLs; missing article covers fall back to the site OG cover.
- Pagination remains UI-compatible: static pages contain the existing page sections and `article-pagination.js` controls `?page=N`.
- Homepage, featured/latest, search/category, and related-story links point to static article pages.
- Legacy `article.html?slug={slug}` URLs remain available as a fallback, but new Facebook shares should use the static `/articles/{slug}.html` URL.
- `.github/workflows/generate-static-articles.yml` regenerates pages whenever `articles.json` or the generator/template changes.
- `.github/scripts/generate-static-articles.mjs` generates one HTML page per article; old generated files are not automatically deleted.
- Article Schema v1 and `articles.json` structure are unchanged.

**Change record:** 2026-11-16 — P1 automatic static article pages and social metadata. Files: `.github/scripts/generate-static-articles.mjs`, `.github/workflows/generate-static-articles.yml`, `assets/js/main.js`, `assets/js/home-latest-final.js`, `assets/js/related-articles.js`, `README.md`, `CHANGELOG.md`. Commits: `f038c12c43c13fd23d9c8e9bdbd50a4ccba5592d`, `ef253d754d46a51c9109b9b3e1fecfcbeff4bae4`, `d536af6e2e97c87e408dfa90a5debc2b6ebed0f9`, `de5543aab426d1f28c47c01cb8f553ac7558c67e`, `fdea6da6d9562632da39947d3b3f8e13c9632aff`. Verification: GitHub Actions ran successfully and generated all 3 current article pages in commit `48368e2db6db7b567eaa68ed65da5e8d6298dc66`. All 3 generated pages were checked for absolute HTTPS OG images, canonical URLs, Twitter large-image metadata, existing cover files, and retained 2-page pagination. Live GitHub Pages and Facebook Sharing Debugger verification remain pending. Status: IMPLEMENTED / NEEDS LIVE VERIFICATION.

## Article pagination

Articles now use a UI-only pagination layer without changing Article Schema v1.
When an article has more than two sections, the article is split into pages with
a maximum of **2 sections per page**. The first page is the default when no
`page` query parameter is present.

- 1–2 sections → 1 page, no pagination.
- 3–4 sections → 2 pages.
- 5–6 sections → 3 pages.
- 7–8 sections → 4 pages.
- Page URLs use `?page=1`, `?page=2`, `?page=3`, etc.
- Each non-final page provides a **Continue Reading** button.
- Numbered page links show **Page X of Y**.
- Section images remain mapped sequentially: Section 1 → Image 1, Section 2 → Image 2, and so on.
- Static generated article pages and the dynamic article view use the same pagination rule.
- The article cover appears only on Page 1. Page 2 and later retain the article title but do not repeat the dek/read-time metadata.

## Admin Panel

```
admin/index.html      Admin Panel UI (Dashboard, Articles, Editor, Settings, Help)
admin/admin.css        Admin-only styles (reuses the site's design tokens)
admin/admin.js         Admin logic, including GitHub publishing and Popunder controls
admin/ai-requests/     AI Writer request files (created/cleared automatically)
admin/ai-results/      AI Writer result files (created automatically)
```

Open `admin/index.html` on the deployed site (e.g.
`https://jazielstory.site/admin/`) to use it. See **Settings → GitHub
Access Token** inside the panel for what permissions you need, and **Help**
inside the panel for an honest description of what is and isn't secure about
this setup on static GitHub Pages hosting.

### How it works, in short

- The Admin Panel is a static page. It has no backend of its own.
- To publish, edit, or delete an article, it calls the GitHub REST API directly
  from your browser using a Personal Access Token you provide at runtime
  (Settings tab). That token is kept in memory, or in `sessionStorage` for the
  current tab only if you opt in — it is never written to any file in this
  repository.
- The **AI Writer** (Google Gemini) never sees your Gemini key from the browser.
  The panel commits your raw text to `admin/ai-requests/`, then triggers the
  `.github/workflows/ai-writer.yml` GitHub Actions workflow, which holds
  `GEMINI_API_KEY` as a GitHub Actions secret, calls Gemini on GitHub's servers,
  and writes the structured result to `admin/ai-results/` for the panel to pick
  up. You always review the generated draft before publishing — nothing is
  auto-published.

### One-time setup for the AI Writer

1. Get a Gemini API key from Google AI Studio.
2. In this repository: **Settings → Secrets and variables → Actions → New
   repository secret**, name it `GEMINI_API_KEY`, and paste the key.
3. In the Admin Panel's Settings tab, add a GitHub Personal Access Token scoped
   to this repository with `Contents: Read and write` and `Actions: Read and write`.

The Gemini model used is configured in one place:
`GEMINI_MODEL` at the top of `.github/scripts/generate-article.mjs`
(currently `gemini-3.8-flash`). If Google recommends a different model later,
update that single constant — no other file needs to change.

### GitHub Actions in this repo

- `.github/workflows/validate-articles.yml` — validates `articles.json`.
- `.github/workflows/validate-javascript.yml` — checks JavaScript syntax with
  Node.js on JavaScript changes.
- `.github/workflows/ai-writer.yml` — runs on demand, triggered by the Admin
  Panel, to turn raw text into a structured article draft with Gemini.

## Repository Change Log

### 2026-11-19 — Admin draft image URL domain fix

- **Priority:** P1 / restore Cover and Body Image thumbnails in the Admin Drafts list and editor on the custom domain.
- **File changed:** `admin/admin.js`.
- **Change:** Updated `coverUrlFor()` so repository-relative image paths resolve against the current Admin site's origin (`window.location.origin`) instead of the old hard-coded/default `siteUrl` setting. Absolute external image URLs remain unchanged.
- **Reason:** The Admin Panel is accessed through `jazielstory.site`, while the previous resolver built preview URLs from the legacy `jazielstory.github.io` setting, causing broken image previews.
- **Commit:** `b7c34090d8530139866c0f153d8e0f9cf4139e7a`.
- **Verification:** GitHub source confirms the resolver now uses the current origin. Live browser thumbnail verification is still required after GitHub Pages deploys; Body Image 1 has no saved `src` in its draft JSON and therefore still needs its image file uploaded/saved separately.
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION.

**Important rule:** Every repository change must be recorded here and in
`CHANGELOG.md`. Before making another fix, check these logs and the recent Git
commits first. Do not repeat a change that is already marked DONE unless a
regression is confirmed.

### 2026-09-13 — Article pagination display refinement

- **Priority:** P2 / refine the visual continuation flow after live review without changing pagination behavior.
- **Files changed:** `assets/js/article-pagination.js`.
- **Change:** Kept the article title visible on every pagination page, while showing the dek and read-time/date metadata only on Page 1. The cover remains Page-1-only.
- **Reason:** User approved the cleaner Page 2 presentation: title retained for context, repeated dek/metadata removed.
- **Commits:** `d23190ddec29c1b1cfbd735a3a43ced8a177e137`, `41d9920695782654ac0b7e066544f770a2c8816a`, `67f423b6edb6ffb24e29b8daaab970945cb47e65`.
- **Verification:** Source audit confirmed Page 2 contains only continuation sections/images/closing content; user visually confirmed the cover is no longer repeated on Page 2. Pagination controls were not changed.
- **Deployment:** User live screenshot confirmed the Page-2 cover removal; the latest dek/metadata refinement needs live browser confirmation after deployment.
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION.

### 2026-09-13 — Article pagination implemented

- **Priority:** P1 / improve long-article readability and continuation flow while keeping Article Schema v1 unchanged.
- **Files changed:** `assets/js/article-pagination.js`, `assets/css/article-pagination.css`, `article.html`, `.github/workflows/generate-static-articles.yml`.
- **Change:** Added max-2-sections-per-page pagination, default Page 1 behavior, numbered page navigation, Page X of Y status, Continue Reading CTA, sequential section/image mapping, and static-page generation support.
- **URL behavior:** Static article pages use `articles/{slug}.html?page=N`; Page 1 is also the default when `page` is absent. The dynamic fallback uses `article.html?slug={slug}&page=N`.
- **SEO:** Static generated pages retain the base article canonical at generation time; the pagination helper updates the canonical/OG URL for the active page in the browser.
- **Important cleanup:** Removed the stale `assets/js/link-fix.js` script reference from `article.html`; the obsolete helper remains deleted and is not restored.
- **Reason:** User approved pagination design A+B+C and the recommendation that missing `page` defaults to Page 1.
- **Commits:** `b6c2362564b9f405618b5411219d9f2c791d1251`, `ba70730c3ed0cdea69751206f15b96d1d48feca1`, `6eacf514d273c20c6785d9fed2f0b446126663ce`, `35962fc55d94eaad8bb999511648bc355a1accf8`, `bf8d4609cf17b22b695d493e4e4b86d55e6bdfba`.
- **Verification:** `node --check` passed for the pagination helper and generator test script. A local fixture generator test confirmed 5 sections produce 3 page containers, Continue Reading controls, Page 1 of 3, and sequential images 1–5. Fresh GitHub Actions and live Pages verification remain pending.
- **Deployment:** GitHub Actions/static-page regeneration and live browser verification pending.
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION.

### 2026-09-13 — Website OG cover metadata

- **Priority:** P2 / add the website Open Graph/social sharing cover.
- **Files changed:** `assets/images/og/jaziel-og-cover.png`, `index.html`.
- **Change:** Added the Jaziel OG cover image and website-level Open Graph/Twitter metadata pointing to it.
- **Reason:** User requested a website OG cover.
- **Commit:** `afcfa4ad5f7301fc319c6f0c722792268393cbb2` for the metadata update; image rename/addition was committed immediately before it in `99f919e87a390aeeb266942a9472f0102f9cc4c1`.
- **Verification:** User confirmed the OG image appears successfully. Source metadata was also checked against the repository file path.
- **Deployment:** User confirmed the image appears; broader social-platform cache verification is not claimed.
- **Status:** DONE / USER VERIFIED.

### 2026-09-13 — Contact email updated

- **Priority:** P2 / replace the public placeholder contact address with the real site-owner email supplied by the user.
- **File changed:** `contact.html`.
- **Change:** Replaced `hello@jaziel-story.example` with `michaelgilroyjitmau2@gmail.com` in both the visible email link and its `mailto:` target; removed the placeholder instruction.
- **Reason:** The user confirmed the correct contact email.
- **Commit:** `59069f9ccd8d97bde1dead9fa5859aa3e2d681a6`.
- **Verification:** Source update committed successfully. No Article Schema or application JavaScript was changed.
- **Deployment:** GitHub Pages deployment/live rendering still requires confirmation after the commit.
- **Status:** DONE / NEEDS LIVE DEPLOYMENT VERIFICATION.

### 2026-09-13 — Admin P1–P2 audit hardening

- **Priority:** P1–P2 / prevent known regressions, observer feedback loops, stale browser code, and image/draft inconsistencies.
- **P1:** `.github/workflows/generate-static-articles.yml` no longer creates or injects the obsolete `link-fix.js`, preventing future article generation from restoring the removed global observer.
- **P1:** `assets/js/admin-section-labels.js` no longer uses a persistent `MutationObserver`. It uses bounded event-driven refreshes after editor navigation/add/remove actions, covering dynamic editor rendering without an observer feedback loop.
- **P1:** `assets/js/admin-preview-order-fix.js` now targets `#btnPreview` and retries for a few animation frames so asynchronous Preview rendering is handled without a persistent observer or interval.
- **P1/P2:** `assets/js/ai-writer-category-fix.js` no longer observes the whole document. Its temporary observer is scoped to the active AI status/view and disconnects after success or failure.
- **P2:** `assets/js/image-manager.js` now accepts safe Jaziel repository image paths as well as HTTP(S) URLs, while retaining the existing 10 MB/type guard.
- **P2:** draft image persistence now clears stale body-image IndexedDB entries by draft-key prefix before saving the current selection.
- **Cache protection:** audited Admin helper scripts are cache-busted in `admin/index.html`.
- **Schema:** Article Schema v1 was not changed.
- **Files changed:** `.github/workflows/generate-static-articles.yml`, `assets/js/admin-section-labels.js`, `assets/js/ai-writer-category-fix.js`, `assets/js/image-manager.js`, `assets/js/admin-preview-order-fix.js`, `admin/index.html`.
- **Commits:** `09cb3be8d3373c69ff70d84bac692f690d473ab0`, `4d111022dda3645763322d7970f47b07a785193e`, `75b5322707d2b6633497b24a56695c6807faf93e`, `e8d43ef9541105c131ade130b2027f4705d8b999`, `b6da7f8bf41f125300549f2d983a12248db1449f`, `b215a6488313b57637758587d40f242cf3a8b50a`, `8b80a7dccc7c59c10a86c363dfdfa27d6f2e4d60`.
- **Verification:** The JavaScript workflow successfully passed on earlier hardening commits `e8d43ef...`, `b6da7f8...`, and `b215a648...`. The latest section-label refinement was additionally checked with `node --check`. Full fresh workflow and live Admin E2E verification remain pending.
- **Deployment:** GitHub Pages/live verification pending.
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION.

### Protected fixes register — do not revert without a confirmed regression

These are protected baseline fixes. If a future bug appears, **do not immediately modify or remove these files because they look related**. First reproduce the bug, inspect the current version, check this README and `CHANGELOG.md`, and compare the relevant commit.

- `index.html` + `home-featured-minimal.js` + `home-latest-final.js` — homepage loader/observer consolidation. Do not restore deleted competing loaders.
- `assets/js/admin-section-labels.js` — bounded event-driven labels; do not restore a persistent DOM observer without a reproduced regression.
- `assets/js/ai-writer-category-fix.js` — scoped active-generation watch; do not restore a document-wide observer.
- `assets/js/admin-preview-order-fix.js` — bounded animation-frame Preview repair; do not replace it with a permanent observer/interval without proof.
- `assets/js/image-manager.js` + `assets/js/body-image-preview.js` — image validation/preview compatibility for repository paths and local files.
- `.github/workflows/generate-static-articles.yml` — must not recreate `assets/js/link-fix.js` or inject it into pages.
- `articles.json` — single source of truth and Article Schema v1; do not change its structure as a workaround for an Admin UI bug.

**Bug investigation rule:** For a new bug, first classify it as a regression in a protected fix or an independent defect. Use the smallest targeted fix. Record the affected protected commit, the new commit, verification, deployment result, and whether the old fix remains intact. Never "clean up" a protected fix merely because it is nearby code.

### 2026-09-12 — Admin Preview image order fix

- **Priority:** P1 / user screenshot confirmed Body Images were rendered after Section 3 instead of in section order.
- **Finding:** The live Preview showed both existing body figures at the end. The missing Section 3 image is intentionally postponed. Required behavior: Body Image 1 after Section 1, Body Image 2 after Section 2, and no image after Section 3 until one is added.
- **Fix:** Added `assets/js/admin-preview-order-fix.js` and loaded it with a cache-busted script reference. Article data and Schema v1 were untouched.
- **Commits:** `8e8c3af2288eac967a47452fd5ae6f5e96c017f0`, `d134c30290e30a3fa285b54899812145f659c47a`.
- **Later hardening:** `b215a6488313b57637758587d40f242cf3a8b50a` added bounded animation-frame retries for asynchronous Preview rendering.
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION.

### 2026-09-12 — Admin Preview stability + Body Image relative-path fix

- **Priority:** P1 / Preview refresh/stuck behavior and missing Body Image previews for repository-relative paths.
- **Fix:** Removed the persistent `admin-preview-section-mapping.js` observer approach and kept `admin/admin.js` untouched. Updated `body-image-preview.js` to resolve relative repository paths.
- **Commits:** `3bc626b6f7521f1bf96512f5585dd28cc4b1836d`, `9bac5ef22f98f850c97079df431ea0c63be4da90`, `56e7a982294e438464c4f0a91a26a147fc228753`.
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION.

### 2026-09-12 — Homepage performance consolidation

- **Priority:** P1 / user-reported homepage performance problem.
- **Fix:** Homepage now uses one dedicated data/render path; obsolete loaders and observers were removed.
- **Commits:** `aa690bb0658960d0d3b0871e2e7452b73db3f10b`, `184a89b922fb860079dcd80efadfd87bbc97122b`, `f58ab89ccda1b0183ef636b76b4da46ed0de67cd`, `83bb01c1d20d82de509a4467d2906675fe8a7580`.
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION.

### 2026-09-12 — Admin Panel recovery & audit

- Fixed the Admin Panel JavaScript parser issue.
- Restored a clean `admin/admin.js` source and avoided another broad rewrite.
- Removed obsolete runtime/one-time repair mechanisms.
- Added permanent JavaScript syntax validation.
- The deployed Admin Panel was verified working by user screenshot.

## Current Audit Status

### 🟢 Verified / do not repeat

- Admin Panel loads successfully on the live site.
- Most Popular metadata fix is complete.
- Related Stories static image-path fix is implemented.
- Article Schema v1 is locked and unchanged.
- Admin Preview has been checked by the user and confirmed safe.
- Public Contact email is now set to the user-confirmed email address.
- Website OG cover image was confirmed visible by the user.

### 🟡 Needs live verification

- Latest Admin P1–P2 hardening.
- Homepage loader/observer cleanup.
- AI Writer P1 workflow fix.
- GitHub Pages deployment of the latest contact email change.
- Article pagination across 1-, 2-, 3-, 4-, 5-, and 6-section articles.
- Latest Page-2 display refinement: title retained; dek/read-time metadata hidden after Page 1.

### 🟠 AI Writer privacy / E2E review pending

- AI request/result JSON remains repository-backed. In a public repository, those contents can be publicly readable. This was not moved during this hardening pass because changing the transport would be a separate architecture decision and could break the working AI flow.
- A fresh end-to-end AI Writer test is still required.

## Change-control rule

For every future repository change:

1. Inspect the current repository and recent commits first.
2. Check this README and `CHANGELOG.md` before making another fix.
3. Make the smallest safe change possible.
4. Do not touch Article Schema v1 unless explicitly approved.
5. Verify syntax/build/workflow status before declaring success.
6. Record the exact files, reason, commit SHA, verification, and deployment status in both this README and `CHANGELOG.md`.
7. If a change is reverted or superseded, record that explicitly so it is never accidentally repeated.

## Monetization

- **Popunder:** Managed from Admin Panel → Settings → Popunder Control. The ON/OFF switch applies to the homepage and article pages.
- **Default:** Popunder is OFF when `assets/data/ads-config.json` is missing or invalid. The checked-in configuration starts OFF.
- **Script configuration:** The panel stores only the HTTPS Adsterra Popunder JavaScript URL (not arbitrary HTML/script snippets). URLs are restricted to `*.profitableratecpmnetwork.com`.
- **Unaffected ads:** Social Bar, Native Banner, and existing responsive banner placements continue to load independently and are not controlled by the Popunder switch.
- **Security:** `assets/data/ads-config.json` is public site configuration. It must never contain GitHub tokens, API keys, or other secrets. GitHub credentials remain in the Admin Panel browser session only.
- **Save workflow:** A GitHub Personal Access Token with repository Contents read/write permission is required to save Popunder settings. The setting takes effect on the public site after GitHub Pages deploys.
- **Implementation commits:** `c59fe79d428343067d578f6aace3a14335856c54` (feature), `ffa832ec07eb1d762d3bd6883a97dac408886eca` (JavaScript escape correction), and `84f701d3a848102c6d77ef1a665af6ea58758a62` (README documentation), `3c9bd1a8738c88ddcae459db5af4675424e492d1` (verification notes), `da7d0bb3c8c5e55d1da2d28eb7d74eaaf909b3f9` (cache-bust the 9 root public pages), `005204c1b062753c39c818a32d4bd40a40805e32` (fix the generated article's relative loader path), and `b388b20ef1ae14cafe5f4832353e2c0397337a41` (regenerated static article pages).
- **Verification:** JavaScript syntax parsing passed for `admin/admin.js` and `assets/js/jaziel-ads.js`. GitHub Actions static-article generation succeeded (run `44722513132`); all 5 generated article pages were read back and confirmed to use `../assets/js/jaziel-ads.js?v=20261120-1`. Live Admin ON/OFF behavior still requires browser verification.


## Unpublished repository drafts

- Article drafts may be stored as JSON files under `admin/drafts/` without adding them to `articles.json`; this keeps them out of the public article feed.
- The Admin Panel's **Load Draft** button lists JSON files in `admin/drafts/` from the configured GitHub branch and loads the selected article into the editor. If exactly one remote draft exists, it loads automatically (no browser prompt required); if multiple drafts exist, it asks for a selection. It also falls back to the browser's local `localStorage` draft when no remote draft is selected/available.
- **Save Draft** writes to `admin/drafts/{slug}.json` on GitHub when a Personal Access Token with repository Contents read/write permission is active in Settings; without a token it saves locally in the current browser only. The token remains in the current tab's `sessionStorage` and is never embedded in public JavaScript.
- **Clear Draft** clears only the local browser draft; it does not delete repository draft files. Repository drafts remain unpublished until the user explicitly presses Publish.
- Article Schema v1 remains unchanged. Draft contract metadata (`draftVersion`, `draftStatus`, `savedAt`, and `sourceNotes`) wraps the article payload without changing its schema.

## Admin saved-draft picker — 2026-11-16

- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION.
- **Scope:** Only the Admin editor's Load Draft selection flow was changed.
- **Behavior:** When more than one GitHub or browser-local draft exists, Load Draft opens a searchable selection dialog showing the article title, filename/key, saved date when available, and storage source. Selecting an item loads it into the existing editor. A single available draft continues to load automatically.
- **Preserved:** Save Draft, Publish, Clear Draft, article fields/schema, image handling, GitHub settings/token handling, and public website files were not intentionally changed.
- **Files:** `admin/admin.js`, `admin/index.html`, `README.md`, `CHANGELOG.md`.
- **Verification:** Source-level review completed; JavaScript syntax/workflow and live mobile/desktop selection still require verification after deployment.
- **Commit:** Admin picker `df0dbef36b6f7a91126ed4eda1b332f599049a46`; cache refresh commit recorded in GitHub history.


### Saved Drafts — dedicated Admin view (2026-11-17)

- Added a separate **Drafts** item in the Admin sidebar at `#/drafts`.
- The Drafts page lists unpublished JSON files from `admin/drafts/` in the configured GitHub repository and browser-local drafts, newest saved first when timestamps are available.
- Search by article title or filename and filter by storage source (GitHub / this browser).
- Choose **Choose & Open Draft** to load only that selected draft into the existing article editor. Other saved drafts remain untouched.
- The existing Save Draft and Load Draft actions remain available; the editor's Load Draft picker now uses the same shared draft collection routine.
- No changes to publishing, `articles.json`, Article Schema v1, OG metadata, pagination, or public pages.


## Monetag ads — permanent publishing and maintenance rule (2026-11-21)

- **Provider:** Monetag only. Do not restore Adsterra scripts or run Adsterra alongside Monetag unless the site owner explicitly requests a provider change.
- **Active formats configured in the shared loader:**
  - In-Page Push: zone ID `12310830`, script `https://nap5k.com/tag.min.js`.
  - Vignette: zone ID `12310939`, script `https://n6wxm.com/vignette.min.js`.
  - OnClick (Popunder): zone ID `12310947`, script `https://al5sm.com/tag.min.js`.
- **Shared loader:** `assets/js/jaziel-ads.js` is the single source for loading the three Monetag formats. Each format has its own once-per-page guard. Do not duplicate these scripts in individual pages or article content.
- **Verification worker:** Keep root `sw.js` unchanged; it is the Monetag site-verification/service-worker file and is separate from the ad-zone scripts.
- **Page templates and cache key:** Public root pages and `article.html` must load the shared file with the current versioned URL. When the loader changes, update its cache-busting query in all public page references and the generator/template flow.
- **New static articles:** `.github/scripts/generate-static-articles.mjs` must rewrite the loader path to `../assets/js/jaziel-ads.js` for generated files inside `/articles/`. Keep `article.html` and the generator in sync, then regenerate and verify generated pages.
- **No duplicate loading:** Do not add a second copy of any zone script to the HTML template, generated pages, or article body. Do not confuse the Monetag verification `sw.js` with the ad loader.
- **Deployment and reporting:** A committed script does not prove an ad is being served. Verify GitHub Actions/Pages deployment, inspect the live page, and check Monetag statistics. Ad serving and revenue depend on Monetag processing, visitor eligibility, browser settings, and traffic.
- **Testing safety:** Test with a clean browser session and ad blocking disabled, but do not repeatedly click ads or generate artificial clicks/impressions.


## 2026-11-21 — Seattle-area earthquake article draft

- **Status:** DRAFT SAVED / NOT PUBLISHED.
- **Draft file:** `admin/drafts/seattle-earthquake-lea-hill-washington-november-2026.json`.
- **Slug:** `seattle-earthquake-lea-hill-washington-november-2026`.
- **Change:** Added an English-language, Schema v1 article about the reviewed magnitude 3.4 earthquake near Lea Hill/Auburn, southeast of Seattle, on November 20, 2026. The article distinguishes the epicentre from Seattle proper and explains the revised USGS magnitude/depth, felt reports, regional seismic context, and earthquake safety.
- **Sources:** USGS event `uw714140682` and the Pacific Northwest Seismic Network. Early automatic parameters were not presented as final; no unsupported claims about injuries, damage, or tsunami were added.
- **Images:** Cover and body images are not uploaded; image fields remain empty for later editorial selection.
- **Publishing:** No changes to `articles.json`, public article pages, or publication status.
- **Commit:** `86a2b364a22f6e0a08be5c1c808081ebdaf1c986`.
- **Verification:** Draft JSON was fetched again from GitHub and parsed successfully; `draftStatus` is `draft`. Live Admin display has not been checked.
