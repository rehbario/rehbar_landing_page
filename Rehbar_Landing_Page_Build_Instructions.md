# Rehbar — Landing Page Build Instructions

> **For:** Claude Code (Opus 4.8) building the public marketing/landing site.
> **Stack:** Next.js 15 (App Router, React 19, TypeScript, Tailwind). **Non-negotiables:** top-tier SEO, fast loads on cheap Android over slow networks, and proper loading **skeletons** for any deferred section.
> **Centerpiece:** an **animated "Rehbar Journey" demo** that walks the *complete* user journey and shows a student's score rising from low to high as they pass through each Rehbar layer, ending at their target university. It is config-driven so it can be edited later.

---

## 0. How to use these instructions (agent)

- Build in the order in **§13**. Each section in **§9** gives you the **copy**, the **component**, the **skeleton**, and the **acceptance criteria** — implement them as written.
- **Performance and SEO are hard gates** (§6, §7). A section that regresses the budget is not done.
- Centralize all user-facing text in `content/copy.ts` (one edit point, i18n-ready). Copy below is final-draft; use it verbatim unless noted.
- **Honesty rule:** the journey demo and any figures are **illustrative** and must be labeled as such. No fabricated metrics, no "live" claims for things that aren't.

### Assumed design direction (explicit so it can be changed)
1. **One student-first page** + a `/vision` route (investor depth) linked from nav and footer.
2. **Visual tone: "confident calm"** — premium, warm, hopeful; not childish, not cold-corporate.
3. **Hero is product-UI-led** (app screens in a phone frame) with an optional authentic-photography slot reserved.
4. **Primary CTA:** student **"Start free"** (loud); secondary **"See how it works"** / **"See the vision"** (quiet).

---

## 1. Objectives & audiences

The page serves two readers with one story (a talented student → a real product → at business scale):
- **Students (and teachers/parents):** instantly understand "this is for me, it's real, it's free," with one obvious CTA. Plain language, no jargon.
- **Investors:** grasp the **mission, the product, the moat (compounding data/AI), and the expandability/scalability** by scrolling top-to-bottom; go deeper via `/vision`.

---

## 2. Tech stack & the Next.js 15 features to use ("full potential")

- **App Router + React Server Components by default.** Only interactive pieces are Client Components (`"use client"`): the nav toggle and the journey demo's animation layer. Everything else renders on the server.
- **Static rendering (SSG).** The page uses no request-time data, so it must be **fully statically prerendered**. Do not introduce dynamic APIs that opt it out of static.
- **Streaming + `<Suspense>`** around any deferred/heavy island, with skeleton fallbacks (§11). Add `app/loading.tsx`.
- **Metadata API** (`export const metadata` / `generateMetadata`) for title/description/canonical/OG/Twitter (§6).
- **File-based SEO conventions:** `app/sitemap.ts`, `app/robots.ts`, and a dynamic **`app/opengraph-image.tsx`** via `next/og` `ImageResponse`.
- **`next/font`** — self-hosted, one variable font, `display: swap`, preloaded; zero layout shift.
- **`next/image`** — AVIF/WebP, explicit width/height, `priority` only on the hero image, `placeholder="blur"` for the rest, responsive `sizes`.
- **Code-splitting:** the demo's animation logic is split and **started only on scroll-into-view** (Intersection Observer). Keep the demo's *text/SVG content server-rendered* for SEO/no-JS; only the animation hydrates.
- **Turbopack** for dev (`next dev --turbopack`).
- *(Optional enhancement, not required):* Partial Prerendering (`experimental.ppr`) — skip unless stable in your version; the page is already static.

---

## 3. Project setup (Step 1)

```bash
npx create-next-app@latest rehbar-landing --typescript --tailwind --app --eslint --src-dir
```
- Configure `next/font` (variable font, e.g. Inter or similar), Tailwind to read CSS-variable tokens (§5), Prettier, and `eslint-plugin-jsx-a11y`.
- Add `content/copy.ts`, `lib/seo.ts`, and the folder tree in §8.
- Set a `metadataBase` and site constants (name, url, description, OG image path) in one config module.

---

## 4. Design tokens & theme (Step 2)

Define tokens as CSS variables in `globals.css` and expose them through Tailwind (`colors.bg`, `colors.primary`, etc.) so components never use raw hex.

```css
:root {
  --color-bg: #FFFFFF;
  --color-surface: #F2F4F7;
  --color-fg: #1F2D3D;          /* near-navy ink */
  --color-muted: #5B6B7B;
  --color-primary: #1B3A57;     /* navy — trust, authority */
  --color-accent: #2A9D8F;      /* teal — guidance, action */
  --color-highlight: #E9A23B;   /* gold — aspiration, "the light" */
  --color-border: #E1E7EE;
  --radius: 14px;
  --maxw: 1120px;               /* content container */
}
```
- **Type scale:** large, confident headline sizes (clamp-based, fluid); body ≥ 16px; generous line-height. One font family, 2–3 weights max.
- **Spacing:** whitespace-driven. Sections use consistent vertical rhythm (e.g. `py-20 md:py-28`).
- **Motion:** subtle fade/slide-up on scroll; **respect `prefers-reduced-motion`** (no motion → show final state). No animation libraries unless approved; prefer CSS + small Intersection-Observer hooks.

---

## 5. SEO requirements (Step 3) — must all be present

- **Per-page metadata:** unique `<title>` (~55 chars), meta description (~150 chars), canonical URL, `lang="en"`.
- **Open Graph + Twitter** card tags; generate the OG image with `app/opengraph-image.tsx`.
- **Structured data (JSON-LD)** in a `<script type="application/ld+json">`: `Organization` (name, url, logo, description) and `SoftwareApplication`/`Product` (Rehbar, category Education, offers: free). Add a `FAQPage` block if a FAQ section is included.
- **`app/sitemap.ts`** and **`app/robots.ts`** (allow all, point to sitemap).
- **Semantic HTML:** one `<h1>` (hero), logical `<h2>`/`<h3>` per section, `<nav>`, `<main>`, `<section>` with `aria-labelledby`, descriptive `alt` on every image, real `<a>`/`<button>`.
- **Core Web Vitals are part of SEO** — see §7.

---

## 6. Performance & loading requirements (Step pervasive)

**Budget (Lighthouse mobile, Slow 4G, mid-tier Android) — hard gate:**
- Performance ≥ **90**, SEO **100**, Accessibility ≥ **95**, Best Practices ≥ **95**.
- **LCP ≤ 2.5s**, **CLS ≈ 0**, initial JS (gzip) **≤ 130 KB**.

**How to hit it:**
- Server Components for all static content → near-zero JS for most of the page.
- Hero image `priority`; everything else lazy with blur placeholders.
- The journey demo is **below the fold**, code-split, and animates only on scroll-into-view — it must **not** affect hero LCP. Reserve its layout box to avoid CLS.
- One font, subset, preloaded. No icon font — inline SVG icons.
- No heavy client libs. If charts/motion need a lib, lazy-load it inside the demo island only.
- Compress/serve modern image formats; cap image dimensions to what's displayed.

---

## 7. Skeleton / loading strategy (Step, applies to deferred parts)

- Add **`app/loading.tsx`** with a lightweight page skeleton (header bar + hero block placeholders).
- Wrap any deferred island in **`<Suspense fallback={<XSkeleton/>}>`**.
- Build reusable skeletons in `components/ui/Skeleton.tsx` (shimmer via CSS, respects reduced-motion).
- **Journey demo:** while its client animation layer hydrates, show a **chart/phone skeleton** in the reserved box (so users see structure, not a blank). The semantic text content is server-rendered and visible immediately underneath/around it.
- Use `next/image` `placeholder="blur"` as the image-level skeleton.
- Note: static text sections render instantly (SSG) and need no skeleton; skeletons are for the demo island and images.

---

## 8. File / component structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, metadataBase, Header, Footer
│   ├── page.tsx              # composes sections (Server Component)
│   ├── loading.tsx           # page skeleton
│   ├── globals.css           # tokens + Tailwind layers
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx
│   └── vision/page.tsx       # investor depth (separate route)
├── components/
│   ├── layout/ Header.tsx ("use client" for menu) · Footer.tsx
│   ├── ui/ Button.tsx · Container.tsx · Section.tsx · Skeleton.tsx · PhoneFrame.tsx · Eyebrow.tsx
│   ├── sections/ Hero.tsx · Problem.tsx · HowItWorks.tsx · Moat.tsx · Scale.tsx · Impact.tsx · FinalCta.tsx
│   └── journey/
│       ├── JourneyDemo.tsx   # section wrapper (server: renders semantic content + mounts client layer)
│       ├── JourneyAnimation.tsx ("use client") # scroll/step animation + ScoreArc
│       ├── ScoreArc.tsx      # SVG line + target reference line
│       ├── StageCard.tsx
│       ├── JourneySkeleton.tsx
│       └── journey.config.ts # the editable journey data (see §10)
├── content/ copy.ts          # all user-facing text
├── lib/ seo.ts · site.ts
└── public/ screenshots/, og/, logo
```

---

## 9. Section-by-section build (copy + spec)

> Render order on `/`. All copy lives in `content/copy.ts`. Each section is a Server Component unless noted.

### 9.0 Header (Client — menu toggle)
- Logo "Rehbar" (with رہبر mark), links: How it works · Why Rehbar · Built to scale · **Vision** (→ `/vision`), and a prominent **"Start free"** button.
- Sticky, slim, high-contrast. Mobile: hamburger → simple sheet. Skeleton: a thin bar.

### 9.1 Hero (`<h1>`)
- **Eyebrow:** `Rehbar · رہبر — the guide who leads from the front`
- **Headline:** `You have the ability. We'll show you the way.`
- **Subhead:** `Rehbar helps every student find the right university, see exactly where they stand, and reach it — for free.`
- **Primary CTA:** `Start free` · **Secondary:** `See how it works` (smooth-scroll to the journey demo)
- **Visual:** product UI in a `PhoneFrame` (dashboard screen). Reserve an optional authentic-photo slot beside it. Hero image `priority`.
- **Acceptance:** single `<h1>`; LCP element is the hero text/image; no CLS.

### 9.2 Problem
- **Headline:** `Ability doesn't decide who gets in. Access does.`
- **Body:** `In a big city, a student has counselors, connected parents, and a map through the maze of entry tests and deadlines. An equally talented student in a small town has rumor and luck. Every year, thousands who had earned their place are quietly locked out — not because they couldn't succeed, but because no one showed them how.`
- **Scale line (for investors):** `Millions of students. A handful of elite seats. A guidance gap measured in lives.`

### 9.3 The Rehbar Journey — animated demo ⭐ (see §10 for full spec)
- **Headline:** `Watch a student go from lost to admitted.`
- **Subhead:** `Pick a goal, find your universities, see where you stand — then watch the gap close, step by step.`
- **Label (small, muted):** `An illustrative journey.`
- This is the centerpiece. Build per §10.

### 9.4 How it works (the system / the loop)
- **Headline:** `One guided journey — not a test-prep app, not a forum.`
- Three cards (icon + label + one line):
  - **Find your path (Counseling):** `Understand what suits you, and where you can realistically get in.`
  - **See where you stand (Assessment):** `Real practice tests show your exact gap to your target.`
  - **Close the gap (Prep):** `The teaching layer that gets you there.` — tag **"Coming soon."**
- **Caption:** `Counseling sets your target → Assessment shows the gap → Prep closes it.`

### 9.5 Why it's different / the moat (investor-critical)
- **Headline:** `The more students use Rehbar, the smarter it gets.`
- **Body:** `Every counseling conversation and every test result deepens a proprietary understanding of students, programs, and outcomes — guidance that improves over time and can't be easily copied. The integrated journey, powered by AI, has never been built for these students.`

### 9.6 Built to scale (expandability — investor-critical)
- **Headline:** `Pakistan is the starting line, not the ceiling.`
- **Body:** `Rehbar is one engine. Only the knowledge base changes per market. The same system expands across more verticals, more universities, partner institutions and white-label deployments, and — eventually — more countries that share the same problem.`
- **Visual:** a clean "shape of growth" graphic (engine in the center; swappable knowledge bases; a rising vertical stack Counseling → Assessment → Prep). Keep it light SVG. *(Not a system/architecture diagram — the shape of growth.)*

### 9.7 Impact / mission
- **Headline:** `A student from a small town getting into LUMS changes a family — and inspires a town.`
- **Body:** `That's the point. Rehbar exists to turn ability into admission for the students opportunity usually skips.`
- One **representative student story** (clearly illustrative). Reserve a slot to swap in a **real** story/metrics after beta.

### 9.8 Final CTA (dual)
- **Student:** `Find your university — free.` → **`Start free`**
- **Investor/partner:** `Building the guidance layer for the developing world.` → **`See the vision`** (→ `/vision`) · `Talk to us`

### 9.9 Footer
- Links (How it works, Why Rehbar, Built to scale, Vision, Contact, Privacy), the Rehbar mark + tagline, copyright. Plain, calm.

### 9.10 `/vision` route (investor depth)
- Longer-form: the problem at scale, the three-vertical platform, the moat, the growth axes (verticals/universities/partners/countries), the team, and a contact CTA. Same tokens; denser text is acceptable here. Static, SEO-indexed.

---

## 10. The animated Journey Demo — detailed spec

**Goal:** in one component, show the **complete user journey** and a **score rising from low to high** through each Rehbar layer, ending by crossing the target university's bar. Config-driven so it's easy to modify later.

### 10.1 Data (config-driven) — `journey.config.ts`
```ts
export const journey = {
  student: { name: "Ayesha", goal: "Engineer", target: "NUST", targetScore: 140 },
  stages: [
    { id: "goal",       label: "Picks a goal",            screen: "/screenshots/quickstart.png", score: null, note: "I want to be an engineer." },
    { id: "shortlist",  label: "Finds her universities",  screen: "/screenshots/shortlist.png",  score: null, note: "Target: NUST (NET ≈ 140)." },
    { id: "diagnostic", label: "Takes a short test",      screen: "/screenshots/diagnostic.png", score: 95,   note: "Big gap — mostly in Maths." },
    { id: "guidance",   label: "Gets a clear plan",       screen: "/screenshots/counselor.png",  score: 104,  note: "Knows exactly what to fix." },
    { id: "practice",   label: "Practices, focused",      screen: "/screenshots/practice.png",   score: 128,  note: "Targeted mocks close the gap." },
    { id: "prep",       label: "Prep (coming soon)",      screen: "/screenshots/prep.png",       score: 138,  note: "Teaching layer accelerates.", future: true },
    { id: "final",      label: "Final mock",              screen: "/screenshots/result.png",     score: 146,  note: "Crosses the bar." },
    { id: "destination",label: "Reaches her goal",        screen: "/screenshots/admitted.png",   score: 146,  note: "Admitted to NUST.", celebrate: true },
  ],
} as const;
```
Editing this array changes the whole demo — no code changes.

### 10.2 Layout
- Two synchronized halves (stacked on mobile, side-by-side on desktop):
  - **Left — `PhoneFrame`** showing the current stage's screen + its short `note`.
  - **Right — `ScoreArc`** (SVG): a rising line of `score` across stages, with a **horizontal dashed target line** at `targetScore`. The line draws upward and **crosses** the target at `final`, with a gold celebration marker at `destination`. The `prep` stage segment is **dashed/"future"** styled.
- A slim **stage progress rail** (labels) so the user always knows where they are.

### 10.3 Interaction & animation
- **Primary:** scroll-driven — as the section scrolls through the viewport, advance stages and draw the arc (Intersection Observer + scroll progress). Also provide **step buttons** (Prev/Next) and an auto-advance on first view.
- **Animation tech:** SVG path draw via `stroke-dashoffset`; CSS `transform`/`opacity` for stage/screen transitions. Avoid heavy libraries; if motion lib is used, lazy-load it inside this island only.
- **Curve shape:** not a straight diagonal — fast early gains, a small plateau, then crossing the bar (reads as credible, not glib).

### 10.4 SEO, no-JS & accessibility (important)
- **Server-render the semantic content**: an ordered list (`<ol>`) of stages with labels, notes, and scores, plus a static final-state `ScoreArc` SVG. This means the full story is in the DOM for search engines and users without JS.
- The client animation layer **enhances** this; it does not replace it.
- **`prefers-reduced-motion`** → render the final state, no animation.
- The chart has an accessible caption summarizing the arc in words (e.g., "Score rises from 95 to 146, crossing NUST's ~140 bar").
- **Label:** persistent small "Illustrative journey — not real student data."

### 10.5 Performance
- Code-split; animation starts only on scroll-into-view. Below the fold — must not touch hero LCP.
- Reserve the box (fixed aspect) to avoid CLS; show `JourneySkeleton` until the client layer mounts.
- Screenshots via `next/image`, lazy, blur placeholder, sized to display.

### 10.6 Acceptance
- Full journey + rising score visible and correct from config.
- Works with scroll **and** step buttons; final state shows with JS off and with reduced-motion.
- Crosses the target line at `final`; `prep` shown as future; celebration at `destination`.
- No CLS; lazy-loaded; budget (§6) holds with the demo on the page.

---

## 11. Accessibility (Step, pervasive)

- Color contrast AA; visible focus rings; full keyboard operability (incl. demo step buttons).
- Tap targets ≥ 44px; body ≥ 16px.
- One `<h1>`; ordered headings; landmarks (`<nav>`, `<main>`, `<footer>`).
- All images have meaningful `alt`; decorative images `alt=""`.
- Respect `prefers-reduced-motion` everywhere.

---

## 12. Definition of Done (acceptance checklist)

- [ ] Lighthouse mobile: Perf ≥ 90, SEO 100, A11y ≥ 95, Best Practices ≥ 95.
- [ ] LCP ≤ 2.5s, CLS ≈ 0, initial JS ≤ 130 KB gzip.
- [ ] Metadata + OG + JSON-LD valid; `sitemap.ts` + `robots.ts` present; OG image renders.
- [ ] All sections built with the §9 copy; copy centralized in `content/copy.ts`.
- [ ] Journey demo: config-driven, scroll + steps, SSR semantic fallback, reduced-motion final state, "illustrative" label, no CLS.
- [ ] Skeletons: `loading.tsx` + Suspense fallbacks + demo skeleton + image blur placeholders.
- [ ] `/vision` route built and indexed.
- [ ] No fabricated metrics or "live" claims; illustrative content labeled.

---

## 13. Build order (steps for the agent)

1. **Setup & foundation** — init Next 15 + TS + Tailwind; fonts; tokens (§4); `layout.tsx` with metadataBase; Header + Footer; `loading.tsx` skeleton.
2. **SEO infra** — `lib/seo.ts`, page metadata, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, JSON-LD.
3. **UI primitives** — Button, Container, Section, Eyebrow, PhoneFrame, Skeleton.
4. **Static sections** — Hero, Problem, HowItWorks, Moat, Scale, Impact, FinalCta (Server Components) with §9 copy. Wire `Start free` / `See the vision`.
5. **Journey demo** — `journey.config.ts` → SSR semantic content + static `ScoreArc` → `JourneyAnimation` ("use client") with scroll + steps → `JourneySkeleton` + Suspense → reduced-motion fallback (§10).
6. **`/vision` route** — investor long-form (§9.10).
7. **Skeletons & streaming pass** — confirm every deferred island has a skeleton; image blur placeholders.
8. **Performance pass** — images, fonts, bundle analysis; hit §6 budget on a throttled mobile profile.
9. **A11y + QA pass** — §11 checklist, then §12 Definition of Done.

> Replaceable later: the journey `screen` images and `journey.config.ts` values, the illustrative student story, and (post-beta) the impact metrics — all editable without touching component code.
