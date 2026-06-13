# PHILIP KWONG — DIGITAL ARTIFACT v3.0
## Next.js Project — Claude Code Session Instructions
### Last updated: June 2026

---

## 1. CRITICAL RULES — READ BEFORE TOUCHING ANYTHING

1. **Client names are never abbreviated in rendered copy.** "ExtractionTek Stainless" is never "ETS". Lowercase record IDs in `lib/cases.ts` are internal keys only.
2. **All copy is verbatim.** Never rewrite or paraphrase unless the brief supplies replacement copy.
3. **No em dashes anywhere** — not in copy, not in JSX, not in CSS comments.
4. **Zero rounded corners, zero box shadows.** All chips, stamps, and borders: sharp corners, hairlines at 0.5px. The global reset enforces `border-radius: 0 !important` on all elements.
5. **Orange `#B34700` is restricted to exactly five uses:**
   - Registry tag brackets — `.t-registry strong`
   - Clock city labels — `.clockCity` in Hero
   - Hero "NO" — `.t-accent` on the `NO` span
   - `[ROLE:]` bracket inside CaseOverlay
   - Stamp hover (paper text color against dark background)
   - Nowhere else. Not on section labels, not on hover states, not on form labels, not on nav.
6. **Commit is not complete until pushed.** Always `git push origin v3` and confirm the ref-update line in the output.
7. **One scoped change per commit.** CSS and structural changes are never combined in one blind pass.
8. **Branch v3 only.** `main` is never touched until the launch merge.
9. **Formspree endpoint `xdaypbrk` is never modified.**
10. **`display: none` on CaseOverlay at rest.** Do not change to `visibility: hidden`, `opacity: 0`, or `clip-path`. The current approach was chosen specifically to avoid scroll lag.
11. **Do not modify `SmoothScrollProvider.tsx` without full understanding.** Lenis, ScrollTrigger proxy, nav dark state, and `getLenis()` are all wired here. Breaking the scroll proxy cascades to every animation on the site.
12. **CSS pass first, HTML/JSX pass second — never combined.**

---

## 2. ARCHITECTURE

### Stack
- **Next.js 14.2.15** — App Router, TypeScript strict
- **GSAP 3.12.5 + Lenis 1.1.14** — smooth scroll and all animations
- **framer-motion 12.40.0** — page transitions only (`PageTransition` component)
- **gray-matter + reading-time** — article `.md` parsing
- **next-sitemap** — sitemap generation
- No Tailwind. CSS Modules throughout. No inline styles except CSS custom properties via `as React.CSSProperties`.

### Deployment
- Branch: `v3`
- Vercel (not GitHub Pages)
- `main` is the live vanilla v2 site — never touch it during v3 work

### File Structure

```
/
├── app/
│   ├── layout.tsx                   Root layout — font preloads, schema.org JSON-LD, layout tree
│   ├── globals.css                  Tokens, reset, shared utilities, card-scroll, reveal system
│   ├── page.tsx                     Home — Hero, DrawIn, Work, Contact (card-scroll structure)
│   ├── about/page.tsx
│   ├── work/page.tsx
│   ├── writing/page.tsx
│   └── writing/[slug]/
│       ├── page.tsx                 Server component — reads content/writing/*.md
│       └── Article.module.css
├── components/
│   ├── Hero/                        Hero.tsx + Hero.module.css
│   ├── DrawIn/                      DrawIn.tsx + DrawIn.module.css
│   ├── Work/
│   │   ├── Work.tsx                 Home section — renders WorkTeaser
│   │   ├── WorkTeaser.tsx           4 featured entries + FULL RECORD Stamp
│   │   ├── WorkIndex.tsx            Registry table (home teaser + /work page)
│   │   ├── WorkPageContent.tsx      Filter tabs (ALL/STANDARDS/ENGAGEMENTS) + CaseOverlay
│   │   ├── CaseOverlay.tsx
│   │   ├── Work.module.css
│   │   ├── WorkTeaser.module.css
│   │   ├── WorkPageContent.module.css
│   │   └── CaseOverlay.module.css
│   ├── About/                       AboutPageContent.tsx + AboutPageContent.module.css
│   ├── Writing/                     WritingPage.tsx + WritingPage.module.css
│   ├── Contact/                     Contact.tsx + Contact.module.css
│   ├── Nav/                         Nav.tsx + Nav.module.css
│   ├── Cursor/                      Cursor.tsx + Cursor.module.css
│   ├── Stamp/                       Stamp.tsx + Stamp.module.css
│   ├── PageTransition/              PageTransition.tsx
│   └── CardScroll/
│       ├── CardScroll.tsx           Null render — ScrollTrigger only
│       └── SubpageWithContact.tsx   Replicates card-scroll on subpages
├── providers/
│   └── SmoothScrollProvider.tsx
├── hooks/
│   └── useScramble.ts
├── lib/
│   ├── cases.ts                     CASES object (13 entries), WORK_ENTRIES, types
│   ├── articles.ts                  ARTICLES array (3 entries), Article type
│   └── getArticle.ts                Reads content/writing/*.md, gray-matter + markdown-to-HTML
├── content/
│   └── writing/                     *.md article files
└── public/
    └── fonts/                       Dharma Gothic E, DM Mono, PP Neue Montreal
```

### Routes

| Route | Component | Note |
|-------|-----------|------|
| `/` | `app/page.tsx` | Home — card-scroll structure |
| `/about` | `AboutPageContent` via `SubpageWithContact` | |
| `/work` | `WorkPageContent` via `SubpageWithContact` | Filter + full CaseOverlay |
| `/writing` | `WritingPage` via `SubpageWithContact` | Category-grouped article index |
| `/writing/[slug]` | `app/writing/[slug]/page.tsx` | Server component |

### Layout Tree

```
SmoothScrollProvider
  Nav (id="site-nav")
  PageTransition (framer-motion AnimatePresence — opacity/y, 0.4s, ease [0.16,1,0.3,1])
    {children}
  Cursor
```

### Home Page Structure (`app/page.tsx`)

```
<div class="scroll-stage">
  <div class="card-wrap" id="card-hero">     Hero
  <div class="card-wrap" id="card-drawin">   DrawIn
  <div class="card-wrap" id="card-work">     Work
  <div class="card-wrap" id="card-contact">  Contact
CaseOverlay  (positioned outside scroll-stage)
CardScroll   (null render — manages ScrollTrigger)
```

### Subpage Structure (`SubpageWithContact`)

Used on `/about`, `/work`, `/writing`. Replicates card-work/card-contact IDs so card-scroll and nav dark state work identically on all routes.

```
<div class="scroll-stage">
  <div class="card-wrap" id="card-work">     {children}
  <div class="card-wrap" id="card-contact">  Contact
CardScroll
```

---

## 3. MECHANISMS

### Lenis Smooth Scroll (`providers/SmoothScrollProvider.tsx`)

- Module-level singleton: `let _lenis: Lenis | null = null`
- Exported: `getLenis()` returns `_lenis`. Use this anywhere a component needs to call Lenis imperatively.
- Options: `smoothWheel: true`, `duration: 1.2` desktop / `0.9` mobile (threshold: `window.innerWidth < 768`), `touchMultiplier: 2.5`
- GSAP integration: `gsap.ticker.add((time) => lenis.raf(time * 1000))`, `gsap.ticker.lagSmoothing(0)`
- `ScrollTrigger.scrollerProxy(document.body, ...)` — wired to Lenis scroll position. Keeps ScrollTrigger in sync with smooth scroll.
- Cleanup: `lenis.destroy()`, `gsap.ticker.remove(rafHandler)`, `_lenis = null`

### Nav Dark State

- Computed inside `lenis.on('scroll', onScroll)` in `SmoothScrollProvider` — not in Nav.
- Rule: `document.getElementById('card-work').getBoundingClientRect().bottom <= 80` → dark
- Route change resets dark state to `false` via `useEffect([pathname])`
- Exposed via `NavDarkContext`: `export function useNavDark() { return useContext(NavDarkContext); }`
- Nav reads it: `const isDark = useNavDark();` — applies `styles.isDark` class
- **Why not in Nav:** React `useEffect` fires bottom-up (children before parents). Nav mounted before `SmoothScrollProvider` is ready, so `getLenis()` returned `null` on first mount. Moving logic to the provider guaranteed Lenis access.

### Contact Nav Link

All routes use the same pattern for the Contact link:
```tsx
<a href="#" onClick={(e) => { e.preventDefault(); getLenis()?.scrollTo(document.body.scrollHeight); }}>
  Contact
</a>
```
Do NOT use `href="/#contact"` — this broke programmatic scrolling on subpages.

### Card-Scroll Contact Reveal

Desktop CSS (in `app/globals.css`):
```css
#card-work    { position: relative; z-index: 2; margin-bottom: 100vh; }
#card-contact { position: fixed; bottom: 0; z-index: 1; }
```

Mobile CSS overrides:
```css
#card-contact { position: relative; bottom: auto; height: auto; z-index: auto; }
#card-work    { margin-bottom: 0; }
```

`CardScroll.tsx` creates a `ScrollTrigger` tracking `#card-work` bottom to `+=100%` with `scrub: true`. This component renders null — it exists only to register and clean up the ScrollTrigger.

### Reveal System (in `app/globals.css`)

Two variants, both triggered by `ScrollTrigger.create({ once: true, onEnter: () => el.classList.add('is-visible') })`:

**`.reveal`** — clip reveal:
- `.reveal { overflow: hidden; display: block; }`
- `.reveal__inner { transform: translateY(105%); transition: 0.9s cubic-bezier(0.16, 1, 0.3, 1); }`
- `.reveal.is-visible .reveal__inner { transform: translateY(0); }`

**`.reveal--fade`** — opacity only:
- `.reveal--fade .reveal__inner { transform: none; opacity: 0; transition: opacity 0.7s ease; }`
- `.reveal--fade.is-visible .reveal__inner { opacity: 1; }`

Delay: set via CSS custom property on the `.reveal` element:
```tsx
<span className="reveal reveal--fade" style={{ '--reveal-delay': '0.15s' } as React.CSSProperties}>
```

**Important:** Each component registers its own ScrollTrigger instances for reveals in its `useEffect`. There is no global reveal observer.

### CaseOverlay

- State held by parent: `caseId: string | null`
- Home: state in `app/page.tsx`, passed to `<CaseOverlay caseId={activeCaseId} onClose={...} />`
- Work page: state in `WorkPageContent.tsx`

**Open sequence:**
1. `overlay.classList.add(styles.isOpen)` → `display: grid`
2. `document.body.style.overflow = 'hidden'`
3. `document.documentElement.setAttribute('data-panel-open', 'true')`
4. `getLenis()?.stop()`
5. GSAP timeline: `y: '100%' → '0%'` (expo.out, 0.6s desktop / 0.4s mobile), then topBar + content fade in (stagger 0.1s)

**Close sequence:**
1. GSAP timeline: content/topBar fade out, then `y: '0%' → '100%'` (expo.in)
2. On complete: `classList.remove(styles.isOpen)`, `document.body.style.overflow = ''`, `removeAttribute('data-panel-open')`, `getLenis()?.start()`, `onClose()`

**Close triggers:** `[ CLOSE ]` button, ESC key, swipe down >80px on mobile, clicking the overlay backdrop (`e.target === overlayRef.current`)

**Key attributes:**
- `data-lenis-prevent` on `#case-content` — prevents Lenis consuming wheel events inside overlay
- `data-theme="dark"` on root div — cursor inversion detection
- `id="case-overlay"` on root div

**Panel z-index note:** `#card-work { z-index: 2 }` creates a stacking context that caps overlay descendants below nav's `z-index: 10`. The overlay's `z-index: 50` is relative to the card-work stacking context, not root. Fix in `app/globals.css`:
```css
html[data-panel-open="true"] #site-nav {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
}
```

### Cursor (`components/Cursor/Cursor.tsx`)

- Renders only on pointer devices: `window.matchMedia('(hover: hover) and (pointer: fine)')`
- Position and color via `onMove` (no observers):
```tsx
const inWorkEntry = !!target.closest?.('.work-entry');
const inDark = !!target.closest?.('[data-theme="dark"]');
borderColor: inWorkEntry ? '#B34700' : inDark ? '#F9F9F9' : '#0A0A0A'
```
- **Known discrepancy:** `.work-entry` is checked but no element in the codebase has this class (CSS Modules generate hashed names). The orange cursor state on work entries does not currently fire.
- Size grows on `mouseenter` of `a, button, [role="button"], input, textarea`

### Clock Engine (`components/Hero/Hero.tsx`)

- Two `Intl.DateTimeFormat` instances cached at mount: `fmtVan` (America/Vancouver), `fmtBkk` (Asia/Bangkok)
- `setInterval(tick, 1000)` updates `clockVanRef` and `clockBkkRef` (both `<time>` elements)
- IDs/refs: `clockVanRef`, `clockBkkRef`

### Scramble Effect (`hooks/useScramble.ts`)

- Randomizes characters left-to-right on mount via `requestAnimationFrame`
- Respects `prefers-reduced-motion` (skips animation, returns final text immediately)
- Used in Hero: `ScrambledMasthead` (resolves full string, then swaps to JSX with orange `NO`), `ScrambledBracket` (delays per bracket)

### Data — Cases (`lib/cases.ts`)

```ts
interface Case {
  client: string;
  subsection: string;
  type: string;
  descriptors: string;
  significance: string;
  chips: string[];
  writeup: string;
  image?: string;
}

interface WorkEntry {
  id: string;
  client: string;
  scope: string;
  tag: string;
  teaserLabel?: string;
}

const CASES: Record<string, Case> = { ... }       // 13 entries
const WORK_ENTRIES: {
  strategy: WorkEntry[];     // 3 entries
  engagements: WorkEntry[];  // 10 entries
}
```

Case IDs (lowercase, internal): `iso-iwa`, `ul-canada-tg`, `aurora`, `grant-leisure`, `extraction-tek`, `farma`, `lift`, `cannapharma`, `green-standard`, `bc-dental`, `heal-bc`, `apex`, `urban-leaf`

### Data — Articles (`lib/articles.ts`)

```ts
interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;  // uppercase: 'TECHNOLOGY', 'COMPLIANCE', 'STANDARDS'
}
const ARTICLES: Article[] = [...]  // 3 entries
```

Article content lives in `content/writing/{slug}.md`. `getArticle.ts` reads, parses front matter via gray-matter, converts markdown to HTML. Returns `'<p>Article coming soon.</p>'` if file missing.

WritingPage uses `toTitleCase(category)` for display only — stored values remain uppercase.

---

## 4. DESIGN SYSTEM

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#F9F9F9` | Paper-white. All light backgrounds. |
| `--bg-warm` | `#F5F0E8` | Defined in tokens, not yet actively used. |
| `--text-main` | `#0A0A0A` | Deep ink. All primary text. |
| `--accent` | `#B34700` | Burnt orange. See orange restriction above. |
| `--bg-dark` | `#111111` | DrawIn + Contact backgrounds. |
| `--border-light` | `#E5E5E5` | Hairlines on light sections. |
| `--border-dark` | `#333333` | Hairlines on dark sections. |

Shorthand tokens:
- `--border-hairline: 0.5px solid #E5E5E5`
- `--border-hairline-dark: 0.5px solid #333333`

### Typography — Three Voices

**Voice 1: Dharma Gothic E** (`var(--font-display)`) — Declaration

| Weight | File | Usage |
|--------|------|-------|
| 900 | DharmaGothicE_Heavy_R.woff | Hero masthead, About/Work/Writing page headings |
| 800 | DharmaGothicE_ExBold_R.woff | CaseOverlay client name, service titles, mobile nav links |
| 700 | DharmaGothicE_Bold_R.otf | WorkIndex client names |

- Hero masthead: `font-size: 11.75vw` (fixed vw — sized to fill viewport width at 1440), `line-height: var(--leading-hero)` (0.82), `letter-spacing: var(--tracking-hero)` (-0.01em)
- Page headings: `font-size: var(--text-display-xl)` (clamp(3.5rem, 10vw, 14rem))
- CaseOverlay client: `clamp(4rem, 10vw, 9rem)`, `line-height: 0.88`, `letter-spacing: -0.01em`

**Voice 2: DM Mono** (`var(--font-body)`) — Machine

| Weight | File | Usage |
|--------|------|-------|
| 500 | DMMono-Medium.ttf | Section labels, registry tags brackets, `.t-registry`, Work index scope/role, nav trigger |
| 400 | DMMono-Regular.ttf | Work index numbers, descriptors, dates, article read times |

- Section labels (`.section-label`): `font-size: 16px`, `font-weight: 500`, `letter-spacing: 0.2em`, `text-transform: uppercase`, `color: #0A0A0A`
- Registry tags (`.t-registry`): `font-size: 15px`, `font-weight: 400`, `letter-spacing: 0.06em`, `text-transform: uppercase`; `strong` inside: `font-weight: 700`, `color: var(--accent)`
- WorkIndex scope/role: `font-weight: 500`, `font-size: 15px`
- Nav wordmark: PP Neue Montreal Semibold (see Voice 3)

**Voice 3: PP Neue Montreal** (`var(--font-readable)`) — Human

| Weight | File | Usage |
|--------|------|-------|
| 600 | PPNeueMontreal-Semibold.otf | Nav wordmark |
| 400 | PPNeueMontreal-Regular.otf | About thesis/bio/pullquote, CaseOverlay significance/writeup, DrawIn statement, nav links, writing descriptions |

- Nav wordmark: `font-size: 15px`, `font-weight: 600`, `letter-spacing: 0.08em`, `text-transform: uppercase`
- Nav links: `font-size: 11px`, `font-weight: 500`, `letter-spacing: 0.12em`, `text-transform: uppercase`
- About bio: `font-size: clamp(1.5rem, 2.2vw, 2.25rem)`, `line-height: 1.45`
- About thesis: `font-size: clamp(1.6rem, 2.6vw, 2.75rem)`, `line-height: 1.3`
- Service descriptions: `font-size: clamp(1.2rem, 1.6vw, 1.6rem)`, `line-height: 1.5`
- Writing category headers: `font-size: clamp(2.25rem, 4.5vw, 4.25rem)`, `font-weight: 600`, `line-height: 1.05`
- CaseOverlay writeup: `font-size: clamp(1.125rem, 1.4vw, 1.375rem)`, `line-height: 1.65`, `max-width: min(90ch, 92%)`

### Design Tokens

```css
--tracking-display: 0.01em;
--tracking-hero:   -0.01em;
--tracking-label:   0.25em;
--tracking-body:    0.04em;

--leading-display: 0.92;
--leading-hero:    0.82;
--leading-body:    1.6;

--text-display-2xl: clamp(5rem, 15vw, 20rem);
--text-display-xl:  clamp(3.5rem, 10vw, 14rem);
--text-display-lg:  clamp(2rem, 5vw, 8rem);
--text-display-md:  clamp(1.5rem, 3vw, 4rem);

--section-block: clamp(6rem, 12vw, 12rem);
--grid-margin:   5vw;
--grid-gutter:   clamp(0.75rem, 1.5vw, 1.25rem);

--z-content:  1;
--z-nav:      10;
--z-overlay:  50;
--z-cursor:   9998;
--z-grain:    9999;
```

Mobile overrides (≤767px):
```css
--grid-template: repeat(4, 1fr);
--section-block: clamp(3.5rem, 10vw, 5rem);
```

### Grid

```css
.grid-stage {
  display: grid;
  grid-template-columns: repeat(12, 1fr);   /* 4-col on mobile */
  gap: var(--grid-gutter);
  padding-inline: var(--grid-margin);
  width: 100%;
}
```

Hero does not use `.grid-stage` — it uses flexbox with `padding-inline: 5vw` on each internal zone.

### Global Utilities (live in `app/globals.css`, safe to use anywhere)

- `.t-accent` — `color: var(--accent)` — used for hero "NO" only
- `.t-registry` — DM Mono 400, 15px, 0.06em tracking, uppercase. `strong` inside → accent color, weight 700
- `.section-label` — DM Mono 500, 16px, 0.2em tracking, uppercase, `color: #0A0A0A`
- `.reveal` / `.reveal--fade` — see Reveal System above
- `.sr-only` — accessible visually-hidden
- `.grid-stage` — 12-column grid with margins and gutter
- `.scroll-stage` — flex column container for card-scroll structure
- `.card-wrap` — `position: relative; width: 100%`

### Nav

- `id="site-nav"` — targeted by CSS panel-open rule
- Fixed, `height: 4rem` (desktop), `3.5rem` (mobile)
- Background: `rgba(249, 249, 249, 0.97)` — **no `backdrop-filter`** (intentional; v2 had `backdrop-filter: blur(20px)` which caused scroll lag on every frame)
- Dark state (`.isDark`): `background: rgba(17, 17, 17, 0.85)`, white text
- Subpage state (`.isSubpage`): mutes non-active links; active link has `aria-current="page"` and full-ink color + underline
- Mobile: `[ MENU ]` / `[ CLOSE ]` trigger, full-screen overlay with Dharma Gothic 900 links

### About Page — Section Map

| Section | CSS class | Contents |
|---------|-----------|----------|
| A1 | `.titleSection` | "ABOUT" label + "The Operator." h1 |
| A2 | `.thesisSection` | Opening statement (reveal), PP Neue 400, `clamp(1.6rem, 2.6vw, 2.75rem)` |
| A3 | `.photoSection` | Full-bleed photo, `aspect-ratio: 16/7`, `src="/sagard-panel.png.png"` |
| A4 | `.dossierSection` | Two body paragraphs + pullquote, PP Neue 400 |
| A5 | `.servicesSection` | "WHAT I DO" label + 2×2 service grid |

### Work Page — Layout

WorkIndex renders a registry table:
- 4-column grid: `6% 54% 28% 12%` (home teaser) / `6% 50% 30% 14%` (full variant on /work)
- Columns: number | client | scope | role
- Hover: row background → `#0A0A0A`, text → `#F9F9F9`
- Mobile: stacked, `indexNo` and `indexRole` hidden, combined scope·role line on full variant

WorkTeaser (home):
- 4 entries in display order: `['iso-iwa', 'ul-canada-tg', 'aurora', 'grant-leisure']`
- Stamp at bottom: `href="/work"`, `label="FULL RECORD"`, `theme="light"`

---

## 5. CURRENT STATE AND PENDING

### Site Status

Live at philipkwong.com and www.philipkwong.com — both serving the Next.js rebuild.
DNS: Cloudflare. Apex A record 76.76.21.21 (Vercel, DNS only, grey cloud). www CNAME points to Vercel. GoDaddy is registrar only.
Vercel auto-deploys on push to main.

### Completed — Desktop

- Hero: centered headline, clocks left/right, registry tags horizontal, sequential scramble, Framer Motion fade on load
- About: white background, body paragraph + dossier rows [ACTIVE:] [BASE:] [OPS:], warm background removed
- Services: GSAP scroll entrance, number left, title right
- Work: GSAP scroll entrance, right-aligned descriptors, full-screen panels
- Writing index: category ledger, Dharma titles, full-screen panels
- Contact: Dennis Snellenberg reveal — contact fixed underneath, work slides away
- Page transitions: Framer Motion AnimatePresence
- Nav: dark state triggers correctly over contact section
- Writing panels: mouse wheel scroll working via getLenis().stop()/start()
- Panel headers: category label flush left, [ CLOSE ] flush right — all panels
- SEO: meta tags, Open Graph, Twitter cards, schema markup, sitemap, robots.txt

### Completed — Mobile

- Hero: stacked clocks top left, headline dominant, registry tags below, all in one viewport
- About: single column, white background, body paragraph + dossier rows
- Services: DM Mono number label above Dharma title, hairline separated
- Work: large Dharma client names, DM Mono descriptor below, orange border-left on tap
- Work panels: full screen, swipe down to close, drag handle, horizontal swipe conflict fixed
- Writing index: Dharma titles correct, tight category spacing
- Writing panels: touch scroll working, swipe down to close, horizontal swipe fixed
- Contact: full width submit, large tap targets, resize: none on textarea
- Global: 44px minimum touch targets, tap highlight suppressed

### Published Articles

1. `how-ai-changes-regulated-businesses` — TECHNOLOGY — 5 min
2. `why-compliance-requires-strategy` — COMPLIANCE — 5 min
3. `qms-architecture-regulatory-frameworks` — STANDARDS — 5 min

### Known Issues

- **Scroll lag on desktop** — suspected: Framer Motion re-rendering or GSAP ScrollTrigger instances not cleaned up on unmount. Not critical.
- **`.work-entry` cursor orange state never fires** — `Cursor.tsx` checks plain class `.work-entry` but CSS Modules hash the name. Fix: add `work-entry` as a plain `className` alongside the module class on WorkTeaser and WorkIndex rows.
- **Desktop services, work, about read as flat vertical lists** — creative direction pass queued.
- **No graphics in work panels yet** — ExtractionTek blueprint and Grant Leisure images pending.

### Next Priorities

1. SEO — meta refinement, heading hierarchy audit, internal linking between articles and work entries
2. GEO — deepen all three articles, expand to 8 articles over 8 weeks
3. Agent infrastructure — API routes, lead capture, prospecting workflows, CRM integration
4. Analytics — Vercel Analytics
5. Söhne — buy Söhne Buch + Halbfett web licenses from klim.co.nz, replace PP Neue Montreal
6. Graphics — blueprint PDF into ExtractionTek panel, GL images into Grant Leisure panel
7. Creative direction pass — elevate desktop and mobile layout to $50k tier

### Editorial Calendar

| Week | Title | Category |
|------|-------|----------|
| 1 | What Regulated Market Entry Actually Costs | STRATEGY |
| 2 | What It Means to Chair a Technical Standards Committee | STANDARDS |
| 3 | Why AI Compliance Tools Fail in Regulated Industries | TECHNOLOGY |
| 4 | The Difference Between a Compliance Program and a Compliance Architecture | COMPLIANCE |
| 5 | Operating Across Canadian and Thai Regulatory Frameworks | STRATEGY |
| 6 | What the Cannabis Licensing Wave Taught Us About Regulatory Readiness | COMPLIANCE |
| 7 | Why Founders Treat Compliance as a Cost Centre and Why That's Wrong | STRATEGY |
| 8 | How Technical Standards Shape Product Markets Before Products Exist | STANDARDS |

### What Has Been Tried and Rejected

- **Warm background #F5F0E8 on About** — removed, looked like a design trick not a design decision
- **Inline display text mixed into About body copy** — removed, unreadable on mobile
- **`max-width: 68ch` on writing panel content** — too narrow, replaced with full-width padding
- **IntersectionObserver for nav dark state** — replaced with Lenis scroll listener
- **Orange Cloudflare proxy on Vercel A record** — causes SSL conflicts, must be DNS only (grey cloud)
- **`backdrop-filter: blur()` on nav** — caused scroll lag on every composited frame; removed
- **`clip-path` on CaseOverlay at rest** — caused scroll lag; replaced with `display: none`
- **`href="/#contact"` for nav contact link** — broke programmatic scrolling on subpages; replaced with `getLenis()?.scrollTo(document.body.scrollHeight)`

---

## 6. SESSION PROTOCOL

At the start of every new session:

1. Read this file completely.
2. Read the specific files relevant to the task before writing any diffs. Do not edit from memory.
3. Run `git status` to confirm you are on branch `v3` and understand the current working state.
4. CSS pass first, JSX/HTML pass second — never combined.
5. After changes: `npx tsc --noEmit` (or `./node_modules/.bin/tsc --noEmit`) to confirm no type errors. Then `git commit`, then `git push origin v3`, then confirm the ref-update line before reporting done.
6. Report the Vercel preview URL after each push.

### PowerShell commit syntax (required — bash heredoc syntax does not work in PowerShell)

```powershell
git commit -m @'
Short commit message here.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
'@
```

### TypeScript check

```powershell
cd C:\Users\owner\OneDrive\Documents\GitHub\philipkwong-next
./node_modules/.bin/tsc --noEmit
```

### Never do these

- Rewrite full files — targeted diffs only
- Combine CSS and HTML changes in one commit
- Introduce design decisions without flagging as `[DESIGN CHAT]`
- Modify `SmoothScrollProvider.tsx` without understanding the full scroll/animation chain
- Touch `main` branch
- Abbreviate client names in rendered copy
- Add em dashes
- Add rounded corners or box shadows
- Use orange outside the five approved uses
