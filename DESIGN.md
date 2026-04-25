# Design Brief

## Direction

Live AI News Hub — broadcast-grade news experience with continuous scrolling ticker as centerpiece.

## Tone

Authoritative editorial + premium broadcast aesthetic — treating live news as spectacle worthy of attention and trust.

## Differentiation

Scrolling ticker transforms news consumption into a live, urgent experience; gold accents signal exclusive premium information.

## Color Palette

| Token      | OKLCH         | Role                          |
| ---------- | ------------- | ----------------------------- |
| background | 0.11 0.01 240 | Deep navy foundation          |
| foreground | 0.95 0.01 240 | Near-white text              |
| card       | 0.18 0.01 240 | Section row backgrounds      |
| primary    | 0.68 0.18 72  | Gold accent for hierarchy    |
| accent     | 0.68 0.18 72  | Gold for headlines/dividers  |
| muted      | 0.22 0.01 240 | Subtle secondary text        |

## Typography

- Display: Space Grotesk — geometric, tech-forward authority for section titles
- Body: General Sans — neutral, highly legible for news content
- Mono: Geist Mono — for prices/data display
- Scale: h1 3xl display/bold, h2 xl display/semibold, body md body/regular, data sm mono/medium

## Elevation & Depth

Single-layer depth: card backgrounds elevated against deep background, no shadows, gold borders for emphasis over depth.

## Structural Zones

| Zone    | Background      | Border           | Notes                          |
| ------- | --------------- | ---------------- | ------------------------------ |
| Header  | card (0.18)     | Gold bottom line | Title + metadata bar           |
| Ticker  | background      | Card section rows| Continuous scroll area        |
| Section | card alt (0.15) | Gold divider top | Alternating subtle tint       |
| Footer  | muted subtle    | Gold top line    | Update timestamp/metadata     |

## Spacing & Rhythm

Spacious vertical rhythm (24px section gaps, 16px internal padding), tight horizontal spacing for data density, gold dividers create visual breathing room and scan paths.

## Component Patterns

- Section Header: gold text, space-grotesk, semibold, 4px bottom line in gold
- News Row: card background, general-sans, 12px padding, subtle hover lightness shift
- Price Badge: mono, center-aligned, gold text on semi-transparent gold background
- Divider: 2px gold line, full-width, transparent above/below

## Motion

- Entrance: Sections fade in as they scroll into view (opacity 0 to 1, 400ms ease-out)
- Scroll: Continuous 25s upward loop, infinite linear, seamless repeat
- Hover: Row brightens to next card level (0.22 → 0.24 L) with smooth transition

## Constraints

- No shadows or drop effects — gold borders convey hierarchy instead
- Minimum 2px gold borders for section dividers — no hairline rules
- Section titles always gold + space-grotesk — no exceptions
- Only dark mode — broadcast studios are dark environments

## Signature Detail

Gold horizontal rule at top of each section divider — simple, authoritative, unforgettable premium signal.
