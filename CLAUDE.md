# PHILIP KWONG — DIGITAL ARTIFACT v3.0
## Next.js Project — Claude Code Session Instructions
### Regenerated from source: 2026-07-23

Every technical claim in this file was derived from the repo as it exists today. If code and this file disagree, the code is right — fix this file.

---

## 1. CRITICAL RULES — READ BEFORE TOUCHING ANYTHING

1. **Client names are never abbreviated in rendered copy.** "ExtractionTek Stainless" is never "ETS". The lowercase record keys in `lib/cases.ts` (`ets`, `ul-ulc`, `iso-iwa`, …) are internal object keys only — they are not a client roster and are never rendered.
2. **All copy is verbatim.** Never rewrite or paraphrase. Edit copy only when a brief supplies the exact replacement string.
3. **Exact-string rule for copy edits.** Before replacing any copy string, confirm the old string appears in the target file verbatim and exactly once. If it is absent, differs, or appears more than once — stop and report. Do not approximate or edit "similar" text.
4. **No em dashes anywhere** — not in copy, not in JSX, not in CSS comments.
5. **Zero rounded corners, zero box shadows.** The global reset enforces `border-radius: 0 !important` on every element. Chips, stamps, borders: sharp corners, hairlines at `0.5px` (`--border-hairline` / `--border-hairline-dark`).
6. **Orange `#B34700` (`--accent`) is the registry-bracket accent plus a small fixed set of marker/interaction states.** See the derived list in §4. It never appears on body copy, section labels, nav links at rest, or as a fill except Stamp hover. When adding orange, it must be one of the listed patterns or it is a new design decision (flag it).
7. **Commit is not done until pushed.** `git push origin main`, then confirm the ref-update line (`<old>..<new>  main -> main`) in the output. Production deploys from `main`. **There is no preview environment** — verify the rendered output on philipkwong.com after the deploy lands.
8. **One scoped change per commit.** CSS and structural/JSX changes are never combined in one blind pass.
9. **Formspree endpoint `xdaypbrk` is never modified.** (`components/Contact/Contact.tsx`.)
10. **`SmoothScrollProvider.tsx` is load-bearing.** Lenis, the ScrollTrigger scroller proxy, `getLenis()`, and the nav dark-state computation all live here. Breaking the proxy cascades to every scroll animation. Do not edit without understanding the whole chain.
11. **External services get two attempts, then fall back.** No retry loops. The schema.org validator in particular rate-limits after ~14 requests; the fallback is direct JSON-LD parsing of fetched HTML.

---

## 2. ARCHITECTURE

### Stack (from `package.json`)
- **next 14.2.15** — App Router, TypeScript (`typescript ^5`)
- **gsap 3.12.5** + **lenis 1.1.14** — smooth scroll and all scroll animations
- **framer-motion 12.40.0** — page transitions only (`PageTransition`)
- **gray-matter 4.0.3** + **reading-time 1.5.0** — article `.md` parsing / read-time
- **next-sitemap 4.2.3** — `postbuild` sitemap/robots generation (see §6 note on the dual mechanism)
- **@vercel/analytics 2.0.1** — `<Analytics/>` in the root layout
- No Tailwind. CSS Modules throughout. Inline styles only for CSS custom properties (`as React.CSSProperties`).

Scripts: `dev`, `build`, `postbuild` (`next-sitemap`), `start`, `lint`. There is no `tsc` script — typecheck with `npx tsc --noEmit`.

### Deployment
- Deploys from branch **`main`** to Vercel on push. Live at philipkwong.com (apex) and www (www 308s to apex — handled at the Vercel/DNS layer, **not** in repo code). No GitHub Pages, no preview environment in the workflow.

### File structure (actual)
```
app/
  layout.tsx              Root layout — font preloads, Person+WebSite JSON-LD, metadata, layout tree
  globals.css             Tokens, reset, utilities, reveal system, card-scroll CSS
  page.tsx                Home metadata → renders <HomeClient/>
  about/page.tsx          ProfessionalService JSON-LD + <SubpageWithContact><AboutPageContent/></>
  work/page.tsx           BreadcrumbList + Person(hasCredential) JSON-LD + Work index
  writing/page.tsx        BreadcrumbList JSON-LD + writing index
  writing/[slug]/page.tsx Server component — Article + BreadcrumbList JSON-LD, generateMetadata
  api/article/[slug]/route.ts
  sitemap.ts  robots.ts  opengraph-image.tsx  icon.svg
components/
  Hero/ DrawIn/ Work/ About/ Writing/ Services/ Contact/ CtaBand/
  Nav/ Cursor/ Stamp/ PageTransition/ Home/ CardScroll/
providers/SmoothScrollProvider.tsx
hooks/useScramble.ts
lib/cases.ts  lib/articles.ts  lib/getArticle.ts
content/writing/*.md        (10 files)
public/fonts/               Dharma Gothic E, DM Mono, PP Neue York
public/llms.txt public/llms-full.txt  favicon.svg  sagard-panel.png.png
```

### Routes
| Route | Renders | Notes |
|-------|---------|-------|
| `/` | `HomeClient` | card-scroll structure |
| `/about` | `AboutPageContent` via `SubpageWithContact` | |
| `/work` | `WorkPageContent` via `SubpageWithContact` | filter tabs + CaseOverlay |
| `/writing` | `WritingPage` via `SubpageWithContact` | category-grouped index |
| `/writing/[slug]` | server component | reads `content/writing/{slug}.md` |

### Layout tree (`app/layout.tsx`)
```
<html><head> font preloads + JSON-LD (Person, WebSite) </head><body>
  SmoothScrollProvider
    Nav (id="site-nav")
    PageTransition            framer-motion AnimatePresence
      {children}
    Cursor
  Analytics
```

### Home structure (`components/Home/HomeClient.tsx`)
```
<div class="scroll-stage">
  <div class="card-wrap" id="card-hero">     <Hero/>
  <div class="card-wrap" id="card-drawin">   <DrawIn/>
  <div class="card-wrap" id="card-work">     <Work/> + <CtaBand/>   ← CtaBand lives INSIDE #card-work
  <div class="card-wrap" id="card-contact">  <Contact/>
<CaseOverlay/>   (outside scroll-stage, state in HomeClient)
<CardScroll/>    (null render — ScrollTrigger only)
```
`SubpageWithContact` replicates `#card-work` + `#card-contact` + `CardScroll` so card-scroll and nav dark state behave identically on subpages.

---

## 3. MECHANISMS (verified against current source)

### Lenis smooth scroll (`providers/SmoothScrollProvider.tsx`)
- Module-level singleton `_lenis`; `getLenis()` returns it for imperative use anywhere.
- Options: `smoothWheel: true`, `duration: 1.2` desktop / `0.9` mobile (`window.innerWidth < 768`), `touchMultiplier: 2.5`, custom `easing`. No `lerp`/`smoothing` key — pacing is `duration` + `easing`.
- GSAP wiring: `gsap.ticker.add((t) => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`, `ScrollTrigger.scrollerProxy(document.body, …)` (scrollTop delegates to `lenis.scrollTo(v, {immediate:true})` / returns `lenis.scroll`).
- On every Lenis `scroll`: `ScrollTrigger.update()` then `checkNavDark()`.
- Setup effect runs once (`[]`); a `usePathname()` effect resets nav dark to `false` on route change. The singleton lives for the app lifetime; no per-route `ScrollTrigger.refresh()` or scroll-to-top. Full teardown on unmount.

### Nav dark state
- **Computed in the provider's `checkNavDark()`**, driven by the Lenis scroll listener (not IntersectionObserver). Exposed via `NavDarkContext`; `Nav` consumes it read-only with `useNavDark()` and toggles the `styles.isDark` class on `<nav id="site-nav">`.
- Dark when `#card-work` `getBoundingClientRect().bottom <= 80` (contact rolled under the 80px nav zone) OR a `[data-nav-dark]` element straddles the 80px line.
- **Why in the provider, not Nav:** child effects fire before parents, so `getLenis()` was `null` on Nav's first mount. The provider guarantees Lenis access.

### Card-scroll contact reveal
- Pure CSS layout + one geometry-only ScrollTrigger. Desktop (`globals.css`): `#card-work { position:relative; z-index:2; margin-bottom:100vh }`, `#card-contact { position:fixed; bottom:0; height:100vh; z-index:1 }`. Contact is uncovered as work scrolls away.
- `CardScroll.tsx` early-returns below 768px, else creates ONE `ScrollTrigger` on `#card-work` (`start:'bottom bottom'`, `end:'+=100%'`, `scrub:true`, `invalidateOnRefresh:true`) with **no tween/onUpdate** — it exists only to keep layout geometry (which `checkNavDark` reads) refreshed. Renders null.
- **CtaBand sits inside `#card-work`** (after `<Work/>`), so it is part of the work card's boundaries — the card-scroll mechanism, the fixed `#card-contact`, and the nav dark threshold all key on `#card-work` and stay untouched. A new sibling card-wrap would break this; do not restructure.
- Mobile (`globals.css`): contact reverts to normal flow (`position:relative`), `#card-work` margin-bottom 0.

### Reveal system (`globals.css` + Hero)
- `.reveal` (clip: `.reveal__inner` translateY(105%)→0, 0.9s) and `.reveal--fade` (opacity 0→1, 0.7s). Delay via `--reveal-delay` custom prop on the `.reveal` element.
- The initializer is a `useEffect` **in `Hero.tsx`**: it `querySelectorAll('.reveal')` and creates a `ScrollTrigger` per element (`start:'top 100%'`, `once:true`, `onEnter → classList.add('is-visible')`). Because it only runs where Hero mounts (home), subpages never initialize it — hence the mobile CSS override forcing `#card-contact` reveals visible.

### CaseOverlay (`components/Work/CaseOverlay.tsx`)
- Always mounted; driven by `caseId` prop. GSAP timelines, not display toggling.
- Open: add `styles.isOpen`, `body.style.overflow='hidden'`, `html[data-panel-open]="true"`, `getLenis()?.stop()`, timeline slides `y:100%→0%` (`expo.out`, 0.6s desktop / 0.4s mobile), stagger topBar+content opacity in.
- Close: reverse timeline (`expo.in`); on complete remove `isOpen`/`data-panel-open`, restore overflow, `getLenis()?.start()`, `onClose()`.
- Scroll lock = `body.overflow` + Lenis stop/start; content is `data-lenis-prevent`; root div `data-theme="dark"` (cursor inversion).
- Close triggers: `[ CLOSE ]`, ESC, backdrop click (`e.target === overlayRef.current`), mobile swipe-down (>80px), and a `nav-contact-click` CustomEvent.
- Z-index note: `#card-work { z-index:2 }` caps the overlay below the nav, so `html[data-panel-open="true"] #site-nav { opacity:0 }` hides the nav while open.

### Cursor (`components/Cursor/Cursor.tsx`)
- Single dot, `(hover:hover) and (pointer:fine)` only; positioned by `gsap.set` on `mousemove`.
- Per-move border color: `.closest('.work-entry')` → `#B34700`; else `.closest('[data-theme="dark"]')` → `#F9F9F9`; else `#0A0A0A`. Grows on hover of `a, button, [role="button"], input, textarea` (static snapshot at mount).
- **KNOWN BUG (still live):** no rendered element has the plain `work-entry` class — Work rows carry hashed CSS-module classes plus `data-row`/`role="button"`. The orange work-entry cursor state never fires. Fix: add a plain `work-entry` className alongside the module class on `WorkTeaser` and `WorkIndex` rows.

### Clock engine (`Hero.tsx`)
- Two `Intl.DateTimeFormat('en-GB', {hour/minute:'2-digit'})` cached once at mount (`fmtVan` America/Vancouver, `fmtBkk` Asia/Bangkok). `tick()` writes `textContent` + `datetime` on the two `<time>` refs; `setInterval(…, 1000)`.

### Scramble (`hooks/useScramble.ts`)
- `display` initialized to `finalText` (SSR/first paint shows real text). After `delay` ms (pre-roll only), a RAF loop settles characters left-to-right (`CHAR_DELAY` 40ms; random A–Z0–9 before each resolves), then hard-sets `finalText` at `len*40+120` ms. Bails entirely under `prefers-reduced-motion`. Used by `ScrambledMasthead` (swaps to JSX with orange `NO` once resolved) and `ScrambledBracket`.

### Markdown pipeline (`lib/getArticle.ts`)
- Exported `getArticleContent(slug)`: reads `content/writing/{slug}.md`, `gray-matter` strips frontmatter, `markdownToHtml` converts. Missing file → `'<p>Article coming soon.</p>'`. Article metadata comes from `lib/articles.ts`, **not** frontmatter.
- `markdownToHtml` handles `##`/`###`, `**bold**`, `*em*`, `- lists`, paragraphs, and links. **Link rule:** `[text](url)` where url is `http(s)` → `<a target="_blank" rel="noopener">`; internal paths get a bare `<a href>` (no target/rel). Internal article-to-article links live in the markdown itself.

---

## 4. DESIGN SYSTEM

### Tokens (`app/globals.css`)
```css
--bg-primary:#F9F9F9;  --bg-warm:#F5F0E8;  --text-main:#0A0A0A;
--accent:#B34700;      --bg-dark:#111111;
--border-light:#E5E5E5; --border-dark:#333333;
--border-hairline:0.5px solid #E5E5E5;  --border-hairline-dark:0.5px solid #333333;

--font-display:'Dharma Gothic E';  --font-body:'DM Mono';  --font-readable:'PPNeueYork';

--text-display-2xl:clamp(5rem,15vw,20rem);  --text-display-xl:clamp(3.5rem,10vw,14rem);
--text-display-lg:clamp(2rem,5vw,8rem);     --text-display-md:clamp(1.5rem,3vw,4rem);
--text-body-lg:clamp(1.35rem,1.8vw,1.75rem); --text-body-md:clamp(1.15rem,1.4vw,1.4rem);
--text-body-sm:clamp(1rem,1.2vw,1.15rem);
--text-meta-lg:15px; --text-meta-md:13px; --text-meta-sm:12px;

--tracking-display:0.01em; --tracking-hero:-0.01em; --tracking-label:0.25em; --tracking-body:0.04em;
--leading-display:0.92; --leading-hero:0.82; --leading-body:1.6;

--space-1..--space-32 (0.25rem→8rem);  --section-block:clamp(6rem,12vw,12rem);
--grid-template:repeat(12,1fr); --grid-gutter:clamp(0.75rem,1.5vw,1.25rem); --grid-margin:5vw;
--z-content:1; --z-nav:10; --z-overlay:50; --z-cursor:9998; --z-grain:9999;
```
Mobile (≤767px) overrides: `--grid-template:repeat(4,1fr)`, `--grid-gutter:0.75rem`, `--section-block:clamp(3.5rem,10vw,5rem)`.

### The three font voices (as loaded in `public/fonts` + `@font-face` in globals.css)
- **Voice 1 — Dharma Gothic E** (`--font-display`, Declaration): 900 Heavy, 800 ExBold, 700 Bold. Hero masthead, page headings, CaseOverlay client name, service titles.
- **Voice 2 — DM Mono** (`--font-body`, Machine): 500 Medium, 400 Regular. Registry tags, section labels, clock labels, metadata, nav mono UI, body default.
- **Voice 3 — PP Neue York** (`--font-readable`, Human): 400 (NormalRegular), 500 (NormalMedium), 600 (CondensedMedium). About/DrawIn body copy, case significance/writeup, article body, writing descriptions.

### Global utilities (safe anywhere)
`.grid-stage` (12-col grid), `.t-accent`, `.t-registry` (+ `.t-registry strong` = the orange bracket), `.section-label` (DM Mono 500, 16px, 0.2em, ink `#0A0A0A`), `.reveal`/`.reveal--fade`, `.sr-only`, `.divider`, `.scroll-stage`, `.card-wrap`.

### Orange — the derived actual uses (`--accent` / `#B34700`)
Every occurrence in globals + components:
1. **Registry-tag brackets — `.t-registry strong`** (globals). This one rule covers: Hero classification tags, mobile nav overlay tags, About dossier data rows, the **Contact BOOK line**, the **CtaBand BOOK line**, CaseOverlay `[ROLE:]` bracket (`.overlay .t-registry strong`), Work page `.metaTag strong`.
2. **Hero "NO"** — `.t-accent` span.
3. **Clock city labels** (Vancouver/Bangkok) — `.clockCity`.
4. **Stamp hover fill** — `.stamp:hover { background-color:var(--accent) }` (both themes).
5. **Contact form focus states** — input/textarea focus underline + submit `:focus-visible` outline.
6. **Article back-link hover** — `.back:hover`.
7. **OG image brackets** — orange `[` `]` in `opengraph-image.tsx`.
8. **Work-entry cursor state** — `#B34700` in `Cursor.tsx` (currently non-firing; see §3 bug).
Not orange: section labels, nav links at rest, form labels, body copy, any other fill.

---

## 5. DATA

### Cases (`lib/cases.ts`) — 13 records
`interface Case { client; subsection; type; descriptors; significance; chips: string[]; writeup; image?: }`
`interface WorkEntry { id; client; scope; tag; teaserLabel?: }`
- `CASES: Record<string, Case>` — 13 entries. `WORK_ENTRIES: { strategy: WorkEntry[3]; engagements: WorkEntry[10] }`.
- **The record keys are internal object identifiers, not a client history and never rendered:**
  `strategy`: `iso-iwa`, `ul-canada-tg`, `ul-ulc`
  `engagements`: `ul-canada`, `bc-pharmacy`, `grant-leisure`, `aurora`, `ets`, `valens`, `organigram`, `veritas`, `embark`, `adastra`
- `Case.image?` exists but is currently unpopulated (see open items).

### Articles (`lib/articles.ts`) — 10 entries
`interface Article { slug; title; seoTitle?; description; date; readTime; category; series?: }`
- `title` = visible copy: article H1, writing-index entry, overlay heading. It also populates `Article.headline` and `BreadcrumbList.name` in schema.
- **`seoTitle` is the `<title>` tag ONLY** — consumed in `generateMetadata` (`article.seoTitle ?? article.title`), never in schema or visible copy. Omitted when `title` already leads with the target keyword (e.g. `qms-architecture-for-emerging-regulatory-frameworks`).
- Slugs: `the-foundation-problem`, `the-due-diligence-failure`, `the-liability-transfer`, `the-verification-problem`, `the-competence-illusion` (series `competence-illusion`); `ai-in-regulated-business-operations`, `compliance-program-versus-compliance-architecture`, `what-regulated-market-entry-actually-costs`, `why-compliance-work-requires-strategy`, `qms-architecture-for-emerging-regulatory-frameworks` (series `compliance-architecture`). Categories: TECHNOLOGY / COMPLIANCE / STRATEGY / STANDARDS.

---

## 6. SEO / GEO STATE

- **Titles/meta:** keyword-targeted `<title>` on all routes. `/` uses `title.absolute`; `/about`/`/work`/`/writing` use short keyword titles + the `%s | Philip Kwong` template; `/writing/[slug]` uses `seoTitle ?? title`. Every route sets `alternates.canonical` to the **apex** (`https://philipkwong.com/…`, no www, no trailing slash). `metadataBase` = apex.
- **Schema inventory:**
  - `layout.tsx` (global): **Person** (`@id …/#person`, jobTitle, email `hello@philipkwong.com`, 11 `sameAs`, 8 `knowsAbout` incl. **AI governance / ISO/IEC 42001 / AI management systems**, two `workLocation` Places) + **WebSite**.
  - `/about`: **ProfessionalService** — `founder: {@id …/#person}` (founder, not provider), `areaServed:['Canada','International']`, `hasOfferCatalog` (Compliance/Strategy/Operations/Growth; Compliance & Strategy copy synced to the current positioning).
  - `/work`: **BreadcrumbList** (Home→Work) + **Person** with `hasCredential` (3 EducationalOccupationalCredential: ISO IWA 37-1 WG1 Vice Convener; UL Canada TG 4400-2 Chair; UL/ULC/ANSI/CAN/1389 STP Member).
  - `/writing`: **BreadcrumbList** (Home→Writing).
  - `/writing/[slug]`: **Article** (`headline: title`, `author:{@id …/#person}`, `datePublished: date`) + **BreadcrumbList** (Home→Writing→`title`).
- **Sitemap (`app/sitemap.ts`) — hand-maintained.** Surface routes carry hardcoded `new Date('YYYY-MM-DD')` (not build time). **Bump the relevant date by hand on any visible content change to `/`, `/about`, `/work`, `/writing`.** Current: `/` 2026-07-23, `/about` 2026-07-23, `/work` 2026-06-16, `/writing` 2026-07-15. Article entries derive from `ARTICLES[].date` and need nothing.
- **robots (`app/robots.ts`):** allow all, `sitemap: https://philipkwong.com/sitemap.xml`, no host.
- **www→apex 308:** not in repo code (`next.config.mjs` has no `redirects()`, no `vercel.json`) — handled at Vercel/DNS.
- **GEO:** `public/llms.txt` and `public/llms-full.txt` are AI-crawler briefings (bio, standards leadership, services, engagements, routes). Note: their Services copy has minor drift from the ProfessionalService Offer text — keep in mind if you touch positioning copy.
- **Dual sitemap/robots mechanism (flag):** the app also runs `next-sitemap` via `postbuild` (`next-sitemap.config.js`, generic defaults, `generateRobotsTxt:true`) alongside the native `app/sitemap.ts` + `app/robots.ts` (richer, hand-tuned). They overlap; treat the native App Router routes as the source of truth.

---

## 7. POSITIONING (context for copy work)

- **Umbrella:** emerging and regulated industries — established industries *and* markets where the rulebook is still being written.
- **First competency wave:** AI governance / ISO/IEC 42001 / AI management systems (reflected in Person `knowsAbout`, the Compliance service, and hero tags).
- **Hero classification tags:** `[OPS: SYS]` OPERATIONS · `[STD: INTL]` STANDARDS · `[REG: 08.YRS]` COMPLIANCE (Hero + mobile nav overlay).
- **CTA — Calendly `[ BOOK: 20 MIN INTRO ]`** (`https://calendly.com/hello-philipkwong/introductory-call`): in the Contact section (ships site-wide via `SubpageWithContact`) and in the homepage `CtaBand` (white section, inside `#card-work`). The `<strong>` bracket is the approved orange registry use.

---

## 8. KNOWN ISSUES & OPEN ITEMS (verify before acting)
- **`.work-entry` cursor state never fires** — `Cursor.tsx` checks a plain `work-entry` class no element renders. See §3 for the fix.
- **`/opengraph-image` may fail to prerender on local Windows builds** — `opengraph-image.tsx` uses `next/og` `ImageResponse` and `readFileSync(public/fonts/DMMono-Medium.ttf)`. The failure (when it occurs) is the local `@vercel/og` runtime + font fs read, **not** a URL-construction error. Builds fine on Vercel Linux. (The old "TypeError: Invalid URL" wording was inaccurate to this code.)
- **Favicon is a placeholder** — `app/icon.svg` and `public/favicon.svg` are byte-identical: ink `#0A0A0A` ground with serif "PK" in orange `#B34700`. Correct palette/concept, not a finished custom mark in brand type. Two duplicate files — update both.
- **Work-panel graphics pending** — `Case.image?` is unused; no blueprint/photo assets in the case panels yet.
- **No `/work/[id]` case routes** — cases open only via the `CaseOverlay`. Real per-case routes are queued (would also unblock article-to-case internal links).
- **Positioning copy drift** — `llms.txt` Services text lags the ProfessionalService Offer copy.

---

## 9. SESSION PROTOCOL
1. Read this file completely.
2. Read the specific files you will touch before writing any diff — never edit from memory.
3. `git status` — confirm you are on `main` and the tree state.
4. One scoped change per commit; CSS and JSX/structural changes never combined.
5. `npx tsc --noEmit` must be clean before pushing.
6. `git push origin main` → confirm the ref-update line → confirm the production deploy landed → verify the rendered output on philipkwong.com (there is no preview environment).
7. Copy edits obey the exact-string rule (§1.3). External-service checks: two attempts then fall back, no retry loops.

### PowerShell commit (primary shell is PowerShell; the closing `'@` must be at column 0)
```powershell
git commit -m @'
Short imperative subject.

Optional body.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
'@
```

### Never do
- Rewrite whole files when a targeted diff will do.
- Combine CSS and structural changes in one commit.
- Introduce a design decision without flagging it as `[DESIGN CHAT]`.
- Edit `SmoothScrollProvider.tsx` without understanding the full scroll/animation chain.
- Abbreviate client names in rendered copy, or render the internal case keys.
- Add em dashes, rounded corners, box shadows, or orange outside the §4 list.
- Modify the Formspree endpoint.
- Add a sibling card-wrap between `#card-work` and `#card-contact` (breaks card-scroll).

---

## 10. REJECTED APPROACHES (why the code is shaped this way)
- **PP Neue Montreal** — replaced by PP Neue York and removed. Voice 3 is PP Neue York; there is no other body face and no pending font purchase.
- **`backdrop-filter: blur()` on nav** — caused scroll lag on every composited frame; removed. Nav uses a solid `rgba` background, no blur.
- **`clip-path` / `visibility:hidden` / `opacity:0` for the CaseOverlay at rest** — the overlay stays mounted and is driven by GSAP timelines (`data-panel-open` + Lenis stop) precisely to avoid the scroll lag those approaches caused. Do not "optimize" it back.
- **`href="/#contact"` for the nav Contact link** — broke programmatic scrolling on subpages. The link instead calls `getLenis()?.scrollTo(document.body.scrollHeight)` (or dispatches `nav-contact-click` when a panel is open).
- **IntersectionObserver for nav dark state** — replaced by the Lenis scroll listener in the provider (child effects ran before Lenis existed).
- **Warm background `#F5F0E8` on About** — removed (read as a trick, not a decision); the token remains defined but unused.
- **Orange Cloudflare proxy on the Vercel apex A record** — SSL conflicts; the apex A record must be DNS-only (grey cloud).
