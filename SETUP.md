# Philip Kwong — Digital Artifact v3.0 Setup

## First-time setup

Node.js is required. Install via https://nodejs.org (LTS) or:
```
winget install OpenJS.NodeJS.LTS
```

Then restart your terminal, then:

```
cd "C:\Users\owner\OneDrive\Documents\GitHub\philipkwong-next"
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this directory as a new GitHub repo
2. Import the repo in Vercel (vercel.com/new)
3. Vercel auto-detects Next.js — no config needed
4. Add custom domain: philipkwong.com

## Build order (complete)

- Design tokens: app/globals.css
- Providers: providers/SmoothScrollProvider.tsx (Lenis + GSAP)
- Layout: app/layout.tsx (Nav, Cursor, schema markup, font preloads)
- Home page: app/page.tsx (Hero, About, Services, Work, Contact, CaseOverlay)
- Writing index: app/writing/page.tsx
- Article pages: app/writing/[slug]/page.tsx
- Article content: content/writing/*.md

## What's wired

- Lenis v5 smooth scroll + GSAP ScrollTrigger proxy
- Kinetic headline (mousemove, elastic snap-back)
- Hero parallax (3 elements, data-scroll-speed)
- Section entrance animations (desktop only)
- Clip reveal system (.reveal / .reveal--fade)
- Nav dark state (IntersectionObserver on #contact)
- Mobile nav overlay
- Case study overlay (13 entries, all editorial copy)
- Custom cursor (desktop only)
- Contact form → Formspree xdaypbrk
- Live clocks (Vancouver + Bangkok)
- Writing index + 3 articles
- Schema markup (Person + ProfessionalService)
- Sitemap auto-generation

## Font files (already copied to /public/fonts)

- DharmaGothicE_Heavy_R.woff (weight 900)
- DharmaGothicE_ExBold_R.woff (weight 800)
- DharmaGothicE_Bold_R.otf (weight 700)
- DMMono-Medium.ttf (weight 500)
- DMMono-Regular.ttf (weight 400)
- PPNeueMontreal-Semibold.otf (weight 600)
- PPNeueMontreal-Regular.otf (weight 400)
