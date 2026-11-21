## 2026-11-21 — Homepage story selection and category accuracy

- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION.
- **Priority:** P1 — correct misleading homepage sections and remove stale fallback content.
- **Files changed:** `assets/js/home-latest-final.js`, `index.html`, `README.md`, `CHANGELOG.md`.
- **Change:** Featured Story selects an article with `featured: true`, with newest-story fallback. Latest Stories remain newest-first. Most Popular uses numeric `views`, `viewCount`, or `viewsCount` when present; because current article records have no view counts, it currently falls back to newest-first and does not invent popularity data. Category navigation is built from the categories in `articles.json`. Removed the hardcoded Lady Gaga story from initial homepage fallback markup; loading and fetch-error states are now explicit.
- **Reason:** Make homepage content accurate and data-driven while retaining the existing single-loader architecture.
- **Preserved:** Article Schema v1 and `articles.json` are unchanged. Admin Panel, AI Writer, ads, analytics, static article generation, and mobile CSS are untouched.
- **Implementation commits:** `832f5e782e64382fe31db15e1d89f9176453d160`; `5502e41d5fceee10f7c1d92547095bc807ec4553`.
- **README documentation commit:** `40297fc5ee92a0571809f6aa6dcb63f3019c4a78`.
- **Verification:** JavaScript syntax parsing and mocked-data tests passed for featured selection, views ranking, dynamic category links, latest ordering, and stale-content removal. Live browser/mobile verification is pending.
- **Deployment:** GitHub Pages deployment and live-site verification pending.

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

## 2026-11-21 — Add Monetag OnClick alongside In-Page Push and Vignette

- **Status:** CODE COMMITTED / GITHUB PAGES DEPLOYMENT QUEUED / LIVE AD DELIVERY NOT YET VERIFIED.
- **User-provided zone:** OnClick (Popunder), zone ID `12310947`, script URL `https://al5sm.com/tag.min.js`.
- **Shared loader:** Updated `assets/js/jaziel-ads.js` to load three distinct Monetag formats, each guarded against duplicate loading: In-Page Push `12310830`, Vignette `12310939`, and OnClick `12310947`.
- **Page references:** Updated `index.html`, `article.html`, and `.github/scripts/generate-static-articles.mjs` to use the refreshed cache key `20261121-monetag-vignette-onclick`; generated article pages inherit the shared loader path.
- **Preserved:** Monetag `sw.js` verification file was not changed. Existing In-Page Push and Vignette zone IDs/scripts were retained. No Adsterra script was reintroduced. Article Schema v1 and article content were not changed.
- **Implementation commits:** Loader `3c1ebca774f43a27baffcf11df3e6fc8981b2a72`; homepage `d7be2887122ef23fcf49c23f8c92bb5962e5343e`; article template `f6b9e719b155c51fe51318492e29fcf843a7dcb5`; generator `5d8e48468cca7f6d26e5680852ef17327984b870`.
- **Workflow status at documentation time:** GitHub Pages run `44795235406` and static article generation run `44795235010` were queued. Confirm completion before declaring the new format live.
- **Verification still required:** Check the deployed homepage and an article, confirm the loader is fetched once, test with ad blocking disabled, and inspect Monetag statistics. A successful repository commit does not guarantee ad impressions or revenue.
- **Maintenance rule:** Record every future advertising change in both `README.md` and `CHANGELOG.md`, including provider, format, zone ID, script URL, files changed, commit SHA, deployment status, and live verification status.
 
## 2026-11-20 — Connect Jaziel Story to Google Analytics 4

- Installed GA4 `gtag.js` with measurement ID `G-HC6NTTN5KP` on 9 public root pages and 5 generated article pages.
- Future generated articles inherit the tag from `article.html`; generator logic and Article Schema v1 unchanged.
- Updated `privacy.html` to disclose analytics, cookies, and Google privacy/opt-out information.
- Admin, advertising, pagination, and SEO logic unchanged. Live event receipt must be checked in GA4 Realtime after deployment.

## 2026-11-20

### P1 — Fix banner loading across homepage slots and article pagination
- **Status:** IMPLEMENTED / DEPLOYMENT AND LIVE BROWSER VERIFICATION PENDING.
- **Files changed:** `assets/js/jaziel-ads.js`, 9 root public HTML pages, `.github/scripts/generate-static-articles.mjs`, 5 generated `articles/*.html` pages, `README.md`, `CHANGELOG.md`.
- **Homepage:** Banner slots are initialized as they approach the viewport. Adsterra zone scripts are serialized so each slot receives its own `atOptions` assignment before its invoke script runs, avoiding concurrent requests racing over the shared global configuration.
- **Article pagination:** Slots inside hidden article pages are deferred until their page is visible and the slot approaches the viewport. The first article slot retains the single fixed-ID Native Banner; additional slots use the responsive banner unit.
- **Responsive behavior:** Existing banner slots are refreshed when the mobile/desktop banner size changes. Failed or blocked requests do not stall the remaining slots.
- **Preserved:** Popunder, Social Bar, article content, SEO metadata, pagination markup, and Article Schema v1.
- **Cache refresh:** Bumped the public loader URL to `jaziel-ads.js?v=20261120-2` in the article template, all 9 root public pages, the generator, and all 5 generated article pages.
- **Implementation commits:** `8ebcc813746b33090b815a7cd85591b6f0010fa2` (slot-loading logic) and `e27b17c936f80acf90f063af77f3f47fdc1bbe31` (public-page cache refresh).
- **Verification:** JavaScript syntax checks passed for the loader and generator; all 14 public HTML files now reference `jaziel-ads.js?v=20261120-2`. GitHub Pages push workflow completed successfully. Actual ad rendering still requires live browser confirmation.
- **User approval:** Explicitly approved before implementation.


### P1 — Add Admin ON/OFF control for Adsterra Popunder
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION.
- **Files changed:** `assets/js/jaziel-ads.js`, `assets/data/ads-config.json`, `admin/admin.js`, `admin/index.html`, `README.md`, `CHANGELOG.md`, 9 root public HTML pages, `.github/scripts/generate-static-articles.mjs`, and 5 generated `articles/*.html` pages.
- **Change:** Added an Admin Panel → Settings control to enable or disable Popunder and update its Adsterra JavaScript URL. The public loader fetches the central configuration and loads Popunder only when explicitly enabled.
- **Default and safety:** The checked-in configuration starts OFF; missing, invalid, or unavailable configuration also fails closed (OFF). The Admin accepts only HTTPS `.js` URLs hosted on `*.profitableratecpmnetwork.com`; it does not store arbitrary inline script snippets.
- **Ad isolation:** Social Bar, Native Banner, and existing responsive banner placements continue independently and were not changed.
- **Credentials:** The configuration is public and contains no secrets. GitHub tokens remain in browser memory/sessionStorage and are never committed.
- **Commits:** `c59fe79d428343067d578f6aace3a14335856c54` (feature), `ffa832ec07eb1d762d3bd6883a97dac408886eca` (JavaScript escape correction), and `84f701d3a848102c6d77ef1a665af6ea58758a62` (README documentation), `3c9bd1a8738c88ddcae459db5af4675424e492d1` (verification notes), `da7d0bb3c8c5e55d1da2d28eb7d74eaaf909b3f9` (cache-bust root public pages), `005204c1b062753c39c818a32d4bd40a40805e32` (correct generated-page relative path), and `b388b20ef1ae14cafe5f4832353e2c0397337a41` (static article regeneration).
- **Verification:** `new Function` syntax parsing passed for both modified JavaScript files. Source checks confirmed default OFF, the Popunder-only control, URL validation, and independent Social Bar/banner initialization. JavaScript syntax parsing passed for both modified JavaScript files. GitHub Actions static-article generation succeeded (run `44722513132`); all 5 generated pages were read back and confirmed to use the correct relative, versioned loader URL. Live Admin ON/OFF behavior still requires browser verification.
- **Deployment:** GitHub Pages deployment is running for the generated article commit; live Admin ON/OFF test remains pending.

### P2 — Document editorial separation for headings, body text, image alt text, and captions
- **Status:** DOCUMENTATION UPDATED / NO APPLICATION CODE CHANGED.
- **Files changed:** README.md, CHANGELOG.md.
- **Change:** Added a standing Jaziel Story editorial standard: headings introduce the topic; body text provides the full explanation; alt text objectively describes the visible image for accessibility; captions add optional, distinct supporting context.
- **Quality rule:** Avoid repeating the same information across heading, body, alt text, and caption. Alt text must describe the actual image without promotional hooks or keyword stuffing. Captions should be omitted when they add no distinct value.
- **Future content instruction:** Apply this separation automatically to all future Jaziel Story articles and AI-generated content.
- **Safety:** No Admin Panel, AI Writer, Article Schema v1, articles.json, existing article, draft, image, or publication status was changed.
- **Verification:** README and CHANGELOG content read back after commit; documentation changes do not require a website deployment.


### P2 — Replace Fire Rescue draft with complete English article and English slug
- **Status:** DRAFT SAVED / NOT PUBLISHED.
- **Files changed:** `admin/drafts/a-fire-rescue-gift-for-my-child-papua.json` (created), `admin/drafts/sebuah-hadiah-fire-rescue-untuk-anakku.json` (removed), `README.md`, `CHANGELOG.md`.
- **New slug:** `a-fire-rescue-gift-for-my-child-papua`.
- **Change:** Rewrote the complete draft in English. The Fire Rescue toy remains the central father-to-child gift, but its meaning now directly reflects Papua's need for accessible fire and rescue services, trained personnel, suitable vehicles and equipment, and better emergency coverage. The article also covers forest fires, environmental protection, Indigenous communities, Papua's history, self-determination, and criticism of government policies that fail to protect people and land.
- **Images:** Retained the existing cover asset path; body image list remains empty. No image files were changed.
- **Safety:** Kept the article as a draft. Did not modify `articles.json`, publish the article, or change Article Schema v1.
- **Commits:** New draft `c6da18b68157f6ce1d569b5d7b5abda21c022760`; old draft removal `5122b5a6e72f032fd2cdd00b7ce8cc8889acf6c5`; documentation commits recorded in the current repository history.
- **Verification:** Final JSON and slug read-back pending; live Admin deployment not yet verified.

## 2026-11-19

### P1 — Fix missing generated article pages and custom-domain SEO
- **Status:** IMPLEMENTED / GENERATOR VERIFIED / LIVE DEPLOYMENT PENDING
- **Files changed:** `.github/scripts/generate-static-articles.mjs`, `.github/workflows/generate-static-articles.yml`, `index.html`, `article.html`, `README.md`, `CHANGELOG.md`.
- **Root cause:** The generator created a new article HTML file as an untracked file. The workflow used `git diff --quiet -- articles/` before staging it; untracked files are invisible to that check, so the workflow incorrectly exited with “Static article pages are already up to date” and never committed the new page.
- **Fix:** The workflow now force-stages newly generated pages before the diff check. A verification step fails the workflow if any article in `articles.json` lacks its corresponding `articles/{slug}.html` output.
- **SEO:** Changed the generator's production base URL, homepage canonical/OG/Twitter URLs, and legacy article template metadata to `https://jazielstory.site`. The existing `CNAME` was preserved.
- **Safety:** Article Schema v1, article body/content, existing draft JSON files, and CNAME were not modified.
- **Verification:** GitHub Actions run `44514670193` completed successfully and verified all 4 generated article pages. The missing page was committed in `a7e316bc9951fd5bd815e67cb89c3fc8eac1ae69`. The generated page's canonical and OG URL both point to `https://jazielstory.site/articles/first-baby-facts-mother-childbirth.html`. GitHub Pages live deployment remains the final check.

### P1 — Persist and preview images in saved drafts
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION
- **Files changed:** `admin/admin.js`, `admin/admin.css`, `admin/index.html`, `CHANGELOG.md`.
- **Change:** Saving a GitHub draft now uploads selected cover and body image files to `assets/images/articles/` and stores their repository paths in the draft JSON. The editor shows saved body-image thumbnails again when a draft is reopened. The Drafts page displays the cover and available body-image thumbnails on each draft card.
- **Safety:** Existing draft JSON structure and article schema remain unchanged; existing source notes are preserved. No published article data, public article pages, AI Writer, or publishing workflow was changed. Browser-local drafts still cannot permanently store newly selected image files; the admin now explains that a GitHub token is required for this.
- **Cache:** Admin script query advanced to `admin.js?v=20261119-1`.
- **Verification:** GitHub source checks confirm the upload and preview logic is present. Live upload/reopen behavior and GitHub Pages deployment still require verification.

## 2026-11-17

### P1 — Dedicated Admin Drafts page
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION
- **Scope:** Admin draft discovery and selection only. AI Writer behavior was not changed.
- **Files changed:** `admin/index.html`, `admin/admin.js`, `admin/admin.css`, `README.md`, `CHANGELOG.md`.
- **Change:** Added a dedicated Drafts navigation page. It lists GitHub repository drafts and browser-local drafts, supports search and storage-source filtering, displays saved timestamps, and opens only the selected draft in the existing editor. Draft collection is shared with the existing Load Draft action. A pending selection is passed safely into the editor route rather than overwriting the current form before selection.
- **Safety:** No changes to Save Draft storage format, Publish, Clear Draft, `articles.json`, Article Schema v1, image handling, OG generation, pagination, or public pages. AI Writer files and workflow were not changed.
- **Cache:** Admin script query advanced to `admin.js?v=20261117-1`.
- **Verification:** Source-level checks completed for route, navigation, selection flow, and preservation boundaries. Live mobile/desktop interaction and GitHub Pages deployment still require verification.

## 2026-11-16

### P1 — Searchable Admin saved-draft picker
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION
- **Reason:** Choosing among many saved drafts using a numbered browser prompt is difficult on mobile and becomes inconvenient as the draft collection grows.
- **Files changed:** `admin/admin.js`, `admin/index.html`, `README.md`, `CHANGELOG.md`.
- **Change:** Load Draft now builds a searchable selection dialog for multiple GitHub and browser-local drafts. Each entry displays its title, filename/key, saved timestamp when available, and storage source. Selecting an entry loads it into the existing editor. If exactly one draft is available, it still loads automatically.
- **Safety scope:** No intentional changes to Save Draft, Publish, Clear Draft, article schema/data, image handling, GitHub token/settings, or public website pages.
- **Cache:** Admin script query advanced to `admin.js?v=20261116-4`.
- **Commit:** Admin picker `df0dbef36b6f7a91126ed4eda1b332f599049a46`; subsequent cache/documentation commits are in repository history.
- **Verification:** Static source review completed. Automated JavaScript validation and live mobile/desktop testing remain pending; do not mark as fully verified until those checks pass.
- **Deployment:** Awaiting GitHub Pages deployment and user confirmation.

## 2026-11-16

### P1 — Follow-up fix: Admin remote draft discovery on mobile
- **Cause addressed:** A browser prompt was used even when there was only one repository draft. Some mobile browser/webview contexts suppress or make prompts difficult to notice.
- **Fix:** When exactly one JSON draft exists in `admin/drafts/`, Load Draft now selects and loads it automatically. A prompt is retained only when multiple drafts exist.
- **Cache:** Admin script query version advanced to `20261116-3` to force clients to fetch the latest code.
- **Verification:** GitHub REST directory listing confirmed the Miguel Ángel Félix Gallardo draft exists on `main`; final Admin JavaScript syntax check passed. Live browser interaction still requires user confirmation.
- **Commit:** `300c40826faa90d89a486b250b5ebe5d1b78b18d`; cache commit follows.

## 2026-11-16

### P1 — Admin Panel GitHub repository draft integration
- **Status:** IMPLEMENTED / NEEDS LIVE ADMIN VERIFICATION
- **Files changed:** `admin/admin.js`, `admin/index.html`, `README.md`, `CHANGELOG.md`.
- **Load Draft:** Lists JSON draft files from the configured branch's `admin/drafts/` folder and loads the selected `article` payload into the editor. Browser-local drafts remain a fallback.
- **Save Draft:** With an active GitHub token, writes/updates `admin/drafts/{slug}.json` using the existing GitHub Contents API. Without a token, it safely falls back to browser-local storage and tells the user that the draft is local only.
- **Security:** No token is hardcoded or exposed in repository JavaScript. Remote writes require the user's own token with Contents read/write access; the existing Settings flow keeps it in tab-scoped `sessionStorage`.
- **Clear Draft:** Clears only the local browser draft and explicitly does not delete repository files.
- **Publishing safety:** Drafts remain outside `articles.json`; only the existing Publish action adds an article to the public feed. Article Schema v1 is unchanged.
- **Cache:** Updated the Admin script query version so browsers fetch the new code.
- **Commits:** `23ca09aa4f348473e38de027955f9ecce169ddaa`, `3d03276da21a3d74e364424d7d07c10cf1631986`, `3c075ecce356197ffe5694a3afd740d618b1a071` (Admin implementation/escaping correction/source-note preservation); cache update `f9f13b4f8e4a0c16c32a46cada82c2cdd71c3594`; README `d84fa2a117537789f3c6788ec66c8dae9194b80b`.
- **Verification:** JavaScript syntax validation passed with the final `admin/admin.js` source. The remote draft file was confirmed to exist in the repository. Live Admin browser/E2E test and GitHub Pages deployment confirmation remain pending.


## 2026-11-16

### P2 — Save Miguel Ángel Félix Gallardo article as an unpublished repository draft
- **Status:** SAVED / UNPUBLISHED; Admin Panel remote-draft loading is not implemented.
- **File added:** `admin/drafts/miguel-angel-felix-gallardo-dies-guadalajara-cartel-legacy.json`.
- **Change:** Added an English original article draft using the existing Article Schema v1 fields, wrapped in Draft Contract v1 metadata. The article is stored only under `admin/drafts/` and was not added to `articles.json`; therefore it is not published in the public article feed.
- **Research:** User-provided BBC report cross-checked against Reuters and Anadolu Agency. The draft notes that Félix Gallardo denied responsibility for the Camarena killings.
- **Images:** No cover or body images added; image production remains pending.
- **Commits:** Draft `9966c47d8c1c55dcde02935002a7252b4f91daaf`; README documentation `586b22aa6db02f9f18826ce52336e5878fe1ba8f`; the CHANGELOG entry is included in the current documentation commit.
- **Admin limitation:** The current Admin Panel Save Draft / Load Draft functions use browser `localStorage`; they do not read files from `admin/drafts/`. README documents this limitation. No Admin JavaScript was changed.
- **Schema:** Article Schema v1 unchanged.
- **Verification:** Draft JSON was serialized and committed through GitHub Contents API. Public-feed exclusion is ensured by not modifying `articles.json`. Live Admin integration and publication were not attempted.
# Jaziel — Change Log

## 2026-11-16

### P1 — Automatic static article pages and Facebook-ready Open Graph metadata
- **Status:** IMPLEMENTED / NEEDS VERIFICATION
- **Reason:** Facebook's crawler cannot rely on metadata inserted by JavaScript after page load. The dynamic `article.html?slug=...` template initially exposed generic metadata and an empty OG image.
- **Files changed:** `.github/scripts/generate-static-articles.mjs`, `.github/workflows/generate-static-articles.yml`, `assets/js/main.js`, `assets/js/home-latest-final.js`, `assets/js/related-articles.js`, `README.md`, `CHANGELOG.md`.
- **Change:** Added a Node.js generator that creates `articles/{slug}.html` for every article in `articles.json`. Each generated page has its own title, description, canonical URL, absolute HTTPS `og:image`, `og:image:alt`, image type/dimensions, and Twitter large-image metadata in the initial HTML. Article cover is used as the OG image; the site OG cover is the fallback when an article has no cover.
- **Automation:** Added a GitHub Actions workflow triggered by changes to `articles.json`, the article template, or generator, plus manual dispatch. It regenerates pages and commits only when generated files change.
- **Routing:** Homepage/search/category and related-story cards now link to generated static article URLs. Legacy dynamic `article.html?slug=...` routes remain as fallback. Existing pagination behavior is preserved through the static page containers and `article-pagination.js`.
- **Schema/data safety:** Article Schema v1 and `articles.json` are unchanged. The generator does not delete older static article files.
- **Commits:** `f038c12c43c13fd23d9c8e9bdbd50a4ccba5592d`, `ef253d754d46a51c9109b9b3e1fecfcbeff4bae4`, `d536af6e2e97c87e408dfa90a5debc2b6ebed0f9`, `de5543aab426d1f28c47c01cb8f553ac7558c67e`, `fdea6da6d9562632da39947d3b3f8e13c9632aff`, and README/CHANGELOG documentation commits.
- **Verification:** Generator execution, JavaScript syntax validation, generated HTML inspection, GitHub Actions result, and live Facebook Sharing Debugger test are pending. Do not claim Facebook thumbnail success until tested.
- **Deployment:** Pending successful workflow run and GitHub Pages deployment.

## 2026-11-16

### P1 — Article URL routing fallback repair
- **Status:** IMPLEMENTED / NEEDS VERIFICATION
- **Reason:** Newly published articles can exist in `articles.json` without a generated `articles/{slug}.html` file. Homepage and shared links previously pointed directly to that missing static path.
- **Files changed:** `assets/js/main.js`, `assets/js/home-latest-final.js`, `assets/js/related-articles.js`, `README.md`.
- **Change:** Shared article URLs now use `article.html?slug={slug}`. The dynamic article page's canonical and Open Graph URL are aligned to that route. Related-story links on dynamic article pages use the root dynamic route; links inside existing generated static article pages retain their relative static route.
- **Additional correction:** A first related-link update used an incorrect parent-directory prefix for the dynamic viewer; it was corrected in a follow-up commit before verification.
- **Article Schema v1:** Unchanged. `articles.json` unchanged. Existing generated article HTML files were not deleted or rewritten.
- **Commits:** `726cc235412fcd704206e2d75bb551c974476c39`, `b4a80252d0e2fa1fd716d35cd8200cc82ed849ee`, `63af6bddc5429f53cd8ffc6331336514e3ce22a3`, `22a799fc5b75b1d61c5ea5ed587841e50ea30d32`, and this documentation update.
- **Verification:** Source-level URL checks and `node --check` are pending. Live GitHub Pages checks for an older static article and the newly added Santa Claus article are pending.
- **Deployment:** Not yet confirmed.


This file is the project memory for repository changes. Read it before making a new change.

## Project rules

- **Article Schema v1 is LOCKED.** Do not change its structure unless the user explicitly approves a schema change.
- Before proposing or implementing a fix, inspect the current repository and recent commits first.
- Do not repeat a fix that is already marked **DONE** unless a new regression is confirmed.
- Prefer the smallest safe change. Do not rewrite or minify a large file when a targeted change is sufficient.
- After every code change, verify syntax/build/workflow status before declaring success.
- Record every repository change here with its purpose, files, commit, verification, and status.
- If a previous fix is later reverted or superseded, record that explicitly instead of treating the old fix as still active.

## 2026-09-13

### Article pagination display refinement
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION
- **Priority:** P2 / refine Page 2 readability after live visual review without changing pagination behavior.
- **Files:** `assets/js/article-pagination.js`.
- **Change:** Kept the article title visible on every pagination page, while showing the dek and read-time/date metadata only on Page 1. The article cover remains Page-1-only.
- **Reason:** User approved the cleaner continuation design: Page 2 should retain the title for context but avoid repeating the dek and metadata.
- **Commits:** `d23190ddec29c1b1cfbd735a3a43ced8a177e137`, `41d9920695782654ac0b7e066544f770a2c8816a`, `67f423b6edb6ffb24e29b8daaab970945cb47e65`.
- **Verification:** Repository audit confirmed Page 2 contains continuation sections/images/closing content and no cover; user visually confirmed the cover is gone from Page 2. Pagination controls were not changed.
- **Deployment:** User live screenshot verified the Page-2 cover removal. Latest dek/metadata refinement still needs user live-browser confirmation after deployment.

### Article pagination implemented
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION
- **Priority:** P1 / improve long-article readability and continuation flow while keeping Article Schema v1 unchanged.
- **Files:** `assets/js/article-pagination.js`, `assets/css/article-pagination.css`, `article.html`, `.github/workflows/generate-static-articles.yml`.
- **Change:** Added a UI-only pagination layer with a maximum of 2 sections per page, default Page 1 behavior, numbered page links, Page X of Y status, Continue Reading CTA, and sequential section/image mapping. Static generation now emits page containers and pagination controls without creating extra HTML files.
- **URL behavior:** Static pages use `articles/{slug}.html?page=N`; missing `page` means Page 1. Dynamic fallback uses `article.html?slug={slug}&page=N`.
- **Schema:** Article Schema v1 and `articles.json` structure were not changed.
- **Cleanup:** Removed the stale `assets/js/link-fix.js` script reference from `article.html`; the deleted obsolete helper was not restored.
- **Reason:** User approved pagination design A+B+C and the recommendation that an absent `page` parameter defaults to Page 1.
- **Commits:** `b6c2362564b9f405618b5411219d9f2c791d1251`, `ba70730c3ed0cdea69751206f15b96d1d48feca1`, `6eacf514d273c20c6785d9fed2f0b446126663ce`, `35962fc55d94eaad8bb999511648bc355a1accf8`, `bf8d4609cf17b22b695d493e4e4b86d55e6bdfba`.
- **Verification:** `node --check` passed for `article-pagination.js` and the extracted static generator script. A local fixture test confirmed 5 sections produce 3 page containers, Continue Reading controls, Page 1 of 3, and images 1–5 in order. Fresh GitHub Actions and live Pages verification remain pending.
- **Deployment:** Pending GitHub Actions regeneration and live browser verification.

### Website OG cover metadata
- **Status:** DONE / USER VERIFIED
- **Priority:** P2 / add the website Open Graph/social sharing cover.
- **Files:** `assets/images/og/jaziel-og-cover.png`, `index.html`.
- **Change:** Added the Jaziel OG cover and website-level Open Graph/Twitter metadata pointing to the cover.
- **Reason:** User requested a website OG cover.
- **Commits:** `99f919e87a390aeeb266942a9472f0102f9cc4c1` for the image file/rename and `afcfa4ad5f7301fc319c6f0c722792268393cbb2` for metadata.
- **Verification:** User confirmed the OG image appears successfully; repository source metadata was also checked.
- **Deployment:** User-confirmed image visibility; broader social-platform cache verification is not claimed.

### Contact email updated
- **Status:** DONE / NEEDS LIVE DEPLOYMENT VERIFICATION
- **Priority:** P2 / replace the public placeholder contact address with the real site-owner email supplied by the user.
- **File:** `contact.html`
- **Change:** Replaced `hello@jaziel-story.example` with `michaelgilroyjitmau2@gmail.com` in both the visible email link and its `mailto:` target, and removed the placeholder instruction.
- **Reason:** The user confirmed the correct contact email.
- **Commit:** `59069f9ccd8d97bde1dead9fa5859aa3e2d681a6`.
- **Verification:** GitHub contents update succeeded. No JavaScript, article data, or Article Schema v1 structure was changed.
- **Deployment:** GitHub Pages/live rendering requires confirmation after deployment.

### Admin P1–P2 audit hardening
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION
- **Priority:** P1–P2 / prevent known regressions, observer feedback loops, stale browser code, and image/draft inconsistencies.
- **P1 — static generator regression guard:** `.github/workflows/generate-static-articles.yml` no longer creates or injects obsolete `link-fix.js`. A future `articles.json` generation therefore cannot silently restore the removed global link-fixing observer.
- **P1 — section labels:** `assets/js/admin-section-labels.js` no longer uses a persistent `MutationObserver`. It now uses bounded event-driven refreshes after editor navigation and section add/remove actions, including delayed refreshes for dynamically rendered editor content.
- **P1 — Preview timing:** `assets/js/admin-preview-order-fix.js` now targets `#btnPreview` and retries for a bounded number of animation frames so asynchronous Preview rendering is handled without a permanent observer or interval.
- **P1/P2 — AI category watcher:** `assets/js/ai-writer-category-fix.js` no longer observes the whole document. Its temporary observer is scoped to the active AI status/view and disconnects after success or failure.
- **P2 — image URL compatibility:** `assets/js/image-manager.js` now accepts safe Jaziel repository image paths as well as HTTP(S) URLs while retaining the existing 10 MB/type guard.
- **P2 — draft image cleanup:** `assets/js/image-manager.js` now removes stale body-image IndexedDB entries by draft-key prefix before saving the current selection, preventing removed/reordered images from surviving into a later draft restore.
- **Cache protection:** `admin/index.html` received cache-busted versions for the audited helper scripts.
- **Article Schema v1:** unchanged and locked.
- **Files changed:** `.github/workflows/generate-static-articles.yml`, `assets/js/admin-section-labels.js`, `assets/js/ai-writer-category-fix.js`, `assets/js/image-manager.js`, `assets/js/admin-preview-order-fix.js`, `admin/index.html`.
- **Commits:** `09cb3be8d3373c69ff70d84bac692f690d473ab0`, `4d111022dda3645763322d7970f47b07a785193e`, `75b5322707d2b6633497b24a56695c6807faf93e`, `e8d43ef9541105c131ade130b2027f4705d8b999`, `b6da7f8bf41f125300549f2d983a12248db1449f`, `b215a6488313b57637758587d40f242cf3a8b50a`, `8b80a7dccc7c59c10a86c363dfdfa27d6f2e4d60`.
- **Verification:** JavaScript validation successfully passed on hardening commits `e8d43ef...`, `b6da7f8...`, and `b215a648...`. The latest section-label refinement `75b53227...` was also checked with `node --check`. Fresh full workflow and live Admin E2E testing remain pending.
- **Deployment:** GitHub Pages/live verification pending.

### Protected-fix baseline
- **Purpose:** prevent future debugging from accidentally undoing fixes that already solved known regressions.
- Protected fixes include homepage loader/observer consolidation, bounded Admin section-label refreshes, scoped AI category watching, bounded Preview ordering repair, image validation/preview compatibility, the generator prohibition on recreating `link-fix.js`, and locked `articles.json` / Schema v1.
- **Rule:** A future bug must first be reproduced and classified as a regression or an independent defect. Inspect the current protected version and its commit before changing anything. Do not restore removed observers/loaders or change Schema v1 merely because the affected area is nearby.

## 2026-09-12

### Admin Preview image order fix
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION
- **Priority:** P1 / user screenshot confirmed existing body images were rendered after Section 3 instead of in section order.
- **Finding:** The live Preview screenshot showed both existing `figure.article-figure` elements after the third section. The missing Section 3 image is intentionally postponed. Desired behavior is therefore image 1 after Section 1, image 2 after Section 2, and no image after Section 3 until a third image is added.
- **Fix:** Added `assets/js/admin-preview-order-fix.js`, loaded from `admin/index.html`. The helper is UI-only and does not change article data or Schema v1.
- **Original commits:** `8e8c3af2288eac967a47452fd5ae6f5e96c017f0`, `d134c30290e30a3fa285b54899812145f659c47a`.
- **Later hardening:** `b215a6488313b57637758587d40f242cf3a8b50a` added bounded animation-frame retries for asynchronous Preview rendering.

### Admin Preview stability + Body Image relative-path fix
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION
- **Priority:** P1 / Preview refresh/stuck behavior and missing Body Image previews for repository-relative paths.
- **Fix:** Removed the persistent `admin-preview-section-mapping.js` observer approach and kept `admin/admin.js` untouched. Updated `body-image-preview.js` to resolve relative repository paths.
- **Commits:** `3bc626b6f7521f1bf96512f5585dd28cc4b1836d`, `9bac5ef22f98f850c97079df431ea0c63be4da90`, `56e7a982294e438464c4f0a91a26a147fc228753`.

### Admin Preview section/image mapping — superseded
- **Status:** SUPERSEDED / REVERTED
- **Original commits:** `1dffe6892795eae230f4cb390a3e5d584d1d379f`, `89428821e921f3ddea6d8c90e70843f38b5dbc25`.
- **Original approach:** Persistent DOM observer to move body images after matching headings.
- **Why superseded:** Observer-based DOM repair was unstable and unnecessary as a permanent mechanism.
- **Replacement:** `admin-preview-order-fix.js` uses a bounded animation-frame repair tied only to the Preview action.

### Homepage performance consolidation — duplicate loaders and observers removed
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION
- **Priority:** P1 / user-reported homepage performance problem.
- **Fix:** Homepage now uses one dedicated data/render path; obsolete loaders and observers were removed.
- **Commits:** `aa690bb0658960d0d3b0871e2e7452b73db3f10b`, `184a89b922fb860079dcd80efadfd87bbc97122b`, `f58ab89ccda1b0183ef636b76b4da46ed0de67cd`, `83bb01c1d20d82de509a4467d2906675fe8a7580`.

### Live verification — Admin Panel recovered
- **Status:** VERIFIED LIVE
- **Evidence:** User screenshot showed the deployed Admin Dashboard rendering successfully; the previous loading state was gone.

### Cleanup — one-time admin repair workflow
- **Status:** DONE / REMOVED
- **File:** `.github/workflows/one-time-admin-source-repair.yml`
- **Removal commit:** `93c8332bd088464677d7f10eb9bf12a54c1ae3b6`.

### Most Popular metadata
- **Status:** DONE
- **File:** `assets/css/popular-fix.css`
- **Commits:** `04628df976399e4435b6cdff4880dcf0669e42ee`, `85dcca3367804cac57ab6fff58eaceae05db5f94`.

### Related Stories static image path
- **Status:** DONE / VERIFY IN DEPLOYMENT
- **File:** `assets/js/related-articles.js`
- **Commit:** `0516ea890c61b43041925bb980a94c2aaeab1f3f`.

### JavaScript syntax validation safeguard
- **Status:** ADDED / MUST PASS
- **File:** `.github/workflows/validate-javascript.yml`
- **Commit:** `ab238b9e1bd09bb8c772dd8c52833b12e9194117`.

### Admin source recovery history
- **Status:** SUPERSEDED HISTORY / FINAL SOURCE WORKING LIVE
- **File:** `admin/admin.js`
- The incomplete manual replacement `517e3d61f5b4fcb4b000478d12e087bfe053ffa5` is invalid and must never be reused.
- The final clean source was restored from the known-good `8c7abfa494d8b8de6de35c576472fb4c896ce473` basis, with final repository commit `5e625f2c4474543b350b14aa3be44b7d616ba2f3`.
- A later targeted repair fixed the missing closing `}` in the `[data-image-url]` listener in `renderBodyImages()`.
- Do not perform another broad rewrite of `admin/admin.js` unless a new regression is reproduced and the current source is inspected first.

### Admin deployment cache bust
- **Status:** DONE / VERIFIED LIVE
- **File:** `admin/index.html`
- **Commit:** `2822ba6a33336f0dea59c206fb5a7e147f98f8c5`.

### Cleanup — obsolete runtime loader
- **Status:** DONE
- **File:** `admin/admin-loader-fix.js`
- **Commit:** `26c58117d3900eca3bee8ee6a744925b4ac105ce`.

### AI Writer P1 — request checkout race fix
- **Status:** IMPLEMENTED / NEEDS END-TO-END VERIFICATION
- **File:** `.github/workflows/ai-writer.yml`
- **Commit:** `4c1f0d561c39b7c82001e6e7584e1ca1749e1a66`.
- **Verification:** Fresh end-to-end AI Writer execution is still required.

### Body Image Add freeze — visual helper loop fix
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION
- **Files:** `assets/js/body-image-preview.js`, `assets/js/body-image-labels.js`
- **Commits:** `2f50a8ccabaef69054490f883be18e51b6c148da`, `b33c07f5dfbd958b910281e264e40e6b1ddcf41d`.
- **Result:** Document-wide observers and repeating interval loops were removed; relevant UI events now refresh the helpers.

## Documentation rule
Every repository change must be recorded in this file and summarized in `README.md`. The record must include:
1. Date
2. Priority/reason
3. Exact files changed
4. What changed
5. Why it changed
6. Commit SHA
7. Verification result
8. Deployment result when applicable
9. Whether the change is DONE, NEEDS VERIFICATION, or REVERTED

## Known remaining audit items

### 🟢 Contact email
- **File:** `contact.html`
- **Value:** `michaelgilroyjitmau2@gmail.com`
- **Status:** UPDATED / NEEDS LIVE DEPLOYMENT VERIFICATION
- **Reason:** User supplied and confirmed the real contact email.

### 🟡 Article pagination
- **Status:** IMPLEMENTED / NEEDS LIVE VERIFICATION
- **Rule:** Maximum 2 sections per page; 1–2 sections stay on one page; longer articles use `?page=N` with numbered navigation and Continue Reading.
- **Reason:** Improve long-story readability without changing Article Schema v1.
- **Pending:** Live verification of 1–2, 3–4, 5–6, and longer section counts, including section/image order and mobile layout.

### 🟡 AI request/result JSON privacy
- **Status:** ARCHITECTURE REVIEW REQUIRED / NOT CHANGED
- **Reason:** AI request/result JSON files are repository-backed in the current static workflow. In a public repository, their contents can be publicly readable. Moving this transport to a private/backend mechanism would be a separate architecture change; it was deliberately not mixed into this hardening pass so the working AI flow is not broken.

### 🟡 Search/category code duplication
- **Status:** NEEDS FURTHER AUDIT
- **Reason:** Search/category behavior appears across multiple JavaScript files. Refactor only after mapping all event listeners and responsibilities.

### 🟡 SEO enhancements
- **Status:** RECOMMENDATION / NOT FIXED
- Potential items include sitemap/robots, JSON-LD Article structured data, and ensuring fallback/dynamic article routes do not create duplicate indexing concerns.


## 2026-11-21 — Seattle-area earthquake article draft

- **Status:** DRAFT SAVED / NOT PUBLISHED.
- **Reason:** User approved the Indonesian article and requested the English Jaziel Story draft.
- **Files changed:** `admin/drafts/seattle-earthquake-lea-hill-washington-november-2026.json`, `README.md`, `CHANGELOG.md`.
- **Change:** Added an English Article Schema v1 draft about the reviewed M3.4 event near Lea Hill/Auburn, Washington, at 11:13 p.m. PST on November 20, 2026. The article uses the updated USGS magnitude 3.4 and depth of approximately 55.5 km, distinguishes the epicentre from Seattle proper, and includes qualified context and safety guidance.
- **Sources:** USGS event ID `uw714140682`; Pacific Northwest Seismic Network. The article avoids a fixed count of felt reports because public submissions change over time, and makes no unsupported claims about injuries, damage, or tsunami.
- **Images:** No cover or body image files were uploaded; image fields remain empty for editorial selection.
- **Article Schema v1:** Unchanged. `articles.json` and public article pages were not modified.
- **Commits:** Draft `86a2b364a22f6e0a08be5c1c808081ebdaf1c986`; README `1e5d65e8bded34bb1238f19691125b639f3d02ce`; CHANGELOG pending.
- **Verification:** Draft was read back from GitHub and parsed successfully; status confirmed as `draft`. Live Admin display and deployment were not checked.
