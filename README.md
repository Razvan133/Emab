# Emab Bowling Bacău

Single-page site for Emab Bowling in Bacău — bowling, darts, foosball, restaurant & bar.

## Stack

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, CSS-first config in `src/index.css`)
- **framer-motion** for scroll and load animations
- **lucide-react** for icons
- shadcn-compatible layout (`components.json`, `@/*` alias, `src/components/ui`, `src/lib/utils`)

## Scripts

```bash
npm run dev        # dev server on http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
npm run typecheck  # tsc -b
npm run lint       # oxlint
```

## Structure

```
src/
  App.tsx                       page composition
  index.css                     Tailwind v4 theme + custom utilities
  assets/bowling-ball.svg       local fallback for the hero ball
  lib/site.ts                   phone, address, map embed, social links
  lib/utils.ts                  cn() helper
  components/
    Navbar.tsx
    SectionHeading.tsx
    sections/{Hero,Activities,Team,Contact,Footer}.tsx
    ui/spotlight-card.tsx       GlowCard (vendored, unmodified)
```

## Venue data

Phone, address, map embed and social URLs live in `src/lib/site.ts`. Social links are
placeholders (`#`) until the real profile URLs are available.

## Hero image

`src/components/sections/Hero.tsx` points at an Unsplash photo as a placeholder. If it
fails to load, the component falls back to `src/assets/bowling-ball.svg` so the hero
never renders empty. Replace `UNSPLASH_BALL` with the venue's own photo before launch.

## Known issue

`npm run typecheck` reports two `TS2339` errors in `src/components/ui/spotlight-card.tsx`
(`width` / `height` assigned to an object literal that doesn't declare them). The file is
vendored verbatim and the errors are type-only — Vite builds and runs it fine. To clear
them, annotate the object in `getInlineStyles()`:

```ts
const baseStyles: Record<string, string | number> = { /* ... */ }
```
