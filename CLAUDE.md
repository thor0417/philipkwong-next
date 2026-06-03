# PHILIP KWONG — DIGITAL ARTIFACT v3.0
## Next.js Project — Claude Code Session Instructions

Carry CLAUDE.md rules from the v2.0 project forward. Design system is identical.
New constraints specific to the Next.js rebuild:

1. `'use client'` directive required on any component using hooks, GSAP, or browser APIs.
2. Server components (no `'use client'`) for static pages and metadata only.
3. CSS Modules for all component styles. Global utilities (.t-registry, .section-label, .reveal etc.) live in app/globals.css.
4. Never modify the Lenis + GSAP proxy setup in providers/SmoothScrollProvider.tsx without testing.
5. All 13 case studies are in lib/cases.ts — source of truth.
6. Article content is in content/writing/*.md — Markdown only, no MDX.
7. Deploy target: Vercel (not GitHub Pages).
8. No backdrop-filter on nav — solid background only.
9. display: none on case overlay at rest — do not change to visibility: hidden or opacity: 0.
10. Orange restriction (CLAUDE.md v2.0) still applies.
