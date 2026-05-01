# Awesome Design Reference — Catalyst Labs

Design intelligence compiled from ui-ux-pro-max, 21st.dev, shadcn/ui, and curated awesome-design sources.
Use this file as the design bible when updating the Catalyst Labs site.

---

## Product Type: Biotech/Pharma E-Commerce (Dark Luxury)

**Category**: Premium science-first e-commerce  
**Audience**: Researchers, biohackers, performance athletes, advanced practitioners  
**Tone**: Authoritative, precise, clinical — not cold. Confident, not aggressive.  
**Visual Direction**: Dark luxury with scientific credibility signals

---

## Design System Tokens

### Color Palette

```css
:root {
  /* Primary — Deep navy (trust, science) */
  --color-base:       #020f18;   /* deep navy — main background */
  --color-base-2:     #040e17;   /* slightly lighter surface */
  --color-surface:    #071825;   /* card backgrounds */
  --color-surface-2:  #0a1e2e;   /* elevated cards */

  /* Accent — Cyan (science, precision, tech) */
  --color-accent:     #38bdf8;   /* sky-400 — primary accent */
  --color-accent-dim: rgba(56,189,248,0.12); /* accent tint */
  --color-accent-glow:rgba(56,189,248,0.06); /* subtle glow */

  /* Gold — Premium, results, performance */
  --color-gold:       #c9a96e;   /* warm gold — secondary accent */
  --color-gold-dim:   rgba(201,169,110,0.12);

  /* Semantic */
  --color-success:    #4ade80;   /* green-400 */
  --color-danger:     #f87171;   /* red-400 */
  --color-warning:    #fbbf24;   /* amber-400 */

  /* Text */
  --color-text-primary:   #e8edf2;  /* near-white */
  --color-text-secondary: #7a8294;  /* muted */
  --color-text-tertiary:  #3d424e;  /* very muted */

  /* Borders */
  --color-border:         rgba(255,255,255,0.06);
  --color-border-accent:  rgba(56,189,248,0.15);
}
```

### Typography Pairing

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Hero | Space Grotesk | 800 | Geometric, technical, confident |
| Editorial / Accent | Cormorant Garamond | 400–600 italic | Premium, scientific journal feel |
| Body / UI | Inter | 300–500 | Neutral, readable, professional |

**Scale (rem):**
- xs: 0.6rem · sm: 0.7rem · base: 0.875rem · lg: 1rem · xl: 1.125rem
- 2xl: 1.375rem · 3xl: 1.75rem · 4xl: 2.5rem · hero: clamp(3rem, 6vw, 5rem)

### Spacing (8pt grid)
```
4px · 8px · 12px · 16px · 24px · 32px · 48px · 64px · 96px · 128px
```

### Border Radius
```
sm: 2px · md: 4px · lg: 8px · xl: 12px · full: 9999px
```
(Use sparingly — this brand is angular/precise, not rounded/friendly)

### Shadow / Glow System
```css
--shadow-card:    0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4);
--glow-accent:    0 0 20px rgba(56,189,248,0.08), 0 0 40px rgba(56,189,248,0.04);
--glow-gold:      0 0 20px rgba(201,169,110,0.08);
```

---

## Component Patterns (from shadcn/ui + 21st.dev)

### Product Card
- Dark surface with 1px border (`rgba(255,255,255,0.06)`)
- Animated molecule visual in header (already implemented)
- Purity badge top-right in accent green
- Star rating + review count
- Urgency signal (stock count + viewer count)
- Price with one-time/subscribe toggle
- CTA: "Add to Cart" — full width, accent-colored on hover
- Citation drawer (peer-reviewed studies) — already implemented

### Hero Section
- Split layout: text left, interactive visual right
- Badge chip: `Pharmaceutical-Grade · Research Peptides`
- Headline: large Space Grotesk 800 with italic Cormorant Garamond accent
- Sub: Inter 300, muted gray, max 60ch
- Stats row: 4 KPIs with dividers
- CTA pair: primary (solid accent) + ghost (outline)
- Background: particle canvas + grid overlay

### Trust Bar
- Horizontal scroll of trust signals with SVG icons
- Items: Lab Verified · 48hr Dispatch · Worldwide Shipping · 99%+ Purity · Discreet Packaging
- Subtle dividers, muted text

### COA Card (Certificate of Analysis)
- Floating dark card with header: logo + batch number + PASS badge
- HPLC bar graphs animated on scroll
- Lab badge row: ISO 17025 · GMP Certified · FDA Registered

### Bundle Cards
- Three-column grid
- Featured center card with gold accent border
- "Most Popular" / "Performance" / "Longevity" tags
- Item list with colored dots
- Was/Now pricing with save badge

---

## UX Rules for This Product Type (from ui-ux-pro-max)

### High Priority
1. **Trust before conversion** — every CTA must be near a trust signal
2. **Scientific credibility** — citations, COA, purity numbers must be visible above fold
3. **Urgency without manipulation** — use real stock counts, real viewer counts
4. **Mobile-first** — 375px breakpoint critical (biohacker audience uses phones)
5. **Performance** — LCP < 2.5s despite canvas animations

### Anti-Patterns to Avoid
- Generic "BUY NOW" CTAs without context
- Hiding the research disclaimer (legal + trust)
- Mixing bright colors with the dark palette
- Using emojis as icons (use SVGs only)
- Overly rounded corners (breaks scientific/precise feel)

---

## 21st.dev Component Reference

Key patterns for premium dark e-commerce:

### Hero Variants
- Split hero with interactive 3D/canvas visual (current — keep)
- Full-bleed hero with particle network
- Magazine hero with oversized type

### CTA Sections
- Urgency bar with countdown (for limited drops)
- Newsletter capture with social proof numbers
- Exit-intent modal with offer

### Product Display
- Quick-view modal (current — keep)
- Comparison table (current — keep)
- Subscription toggle (current — keep)
- Bundle cards with "Most Popular" badge (current — keep)

---

## shadcn/ui Integration Notes

The current site is vanilla HTML/CSS/JS. If migrating to a framework:
- Use shadcn/ui for: Dialog (modals), Sheet (cart drawer), Toast, Badge, Button, Card
- Theme: dark mode by default, CSS variables for all colors
- Radix UI primitives for accessibility (focus trap in modals, ARIA)

For now (vanilla): current implementation is solid. Focus on:
1. Converting all USD → PHP
2. Adding PH payment methods to FAQ
3. Brand voice localization

---

## Andrej Karpathy Research Method (Applied to Brand/Product)

Karpathy's "from scratch" philosophy applied to brand building:
1. **Derive from first principles** — don't copy competitors, understand why each choice works
2. **Minimize dependencies** — fewer frameworks = fewer failure points
3. **Empirical validation** — test claims (purity numbers, dispatch times) rather than assuming
4. **Readable > clever** — code/copy that is instantly understandable beats "creative" that needs decoding

Applied to Catalyst Labs:
- Every product claim must be backed by a COA or published data
- Copy should be precise, not poetic (researchers don't respond to fluff)
- UI should be readable at a glance — no visual tricks

---

## RTK (Token Optimization)

GitHub: https://github.com/rtk-ai/rtk  
Rust binary that reduces LLM token consumption 60-90% on dev commands.

**Install** (when needed for Claude Code efficiency):
```bash
# Via cargo
cargo install rtk

# Or download binary from GitHub releases
# Then configure in ~/.claude/settings.json PreToolUse hook
```

**Current priority**: Not needed for the Catalyst Labs HTML/CSS project.

---

## Awesome Design Systems (Reference)

| System | Company | Relevant For |
|---|---|---|
| Shopify Polaris | Shopify | E-commerce UX patterns |
| Astro UXDS | Rocket Communications | Scientific/technical UI |
| PatternFly | Red Hat | Healthcare/pharma enterprise |
| Base Web | Uber | High-volume transaction UI |

---

## Philippines Market Considerations

- Primary payment: GCash, Maya (PayMongo), BDO, UnionBank, GrabPay
- Currency: ₱ (PHP) — Philippine Peso
- Shipping: Metro Manila 1-3 days, provincial 3-7 days
- Language: English primary (educated/researcher audience)
- Trust signals: FDA-PH registration mention, local courier names
- Common price anchor: ₱3,500-₱7,500 range for premium supplements/research compounds
