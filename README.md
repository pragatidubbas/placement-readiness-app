# KodNest Premium Build System

A calm, intentional design system for serious B2C products.

## Design Philosophy

- Calm, Intentional, Coherent, Confident
- Not flashy, not loud, not playful, not hackathon-style
- No gradients, no glassmorphism, no neon colors, no animation noise

## Color System

Maximum 4 colors across entire system:

- Background: `#F7F6F3` (off-white)
- Primary text: `#111111`
- Accent: `#8B0000` (deep red)
- Success: `#2D5016` (muted green)
- Warning: `#8B6914` (muted amber)

## Typography

- Headings: Crimson Pro (serif), large, confident, generous spacing
- Body: Inter (sans-serif), 16–18px, line-height 1.6–1.8
- Max width for text blocks: 720px
- No decorative fonts, no random sizes

## Spacing System

Consistent scale only:
- 8px (xs)
- 16px (sm)
- 24px (md)
- 40px (lg)
- 64px (xl)

Never use random spacing like 13px, 27px, etc.

## Global Layout Structure

Every page follows:
1. Top Bar
2. Context Header
3. Primary Workspace + Secondary Panel
4. Proof Footer

### Top Bar
- Left: Project name
- Center: Progress indicator (Step X / Y)
- Right: Status badge (Not Started / In Progress / Shipped)

### Context Header
- Large serif headline
- 1-line subtext
- Clear purpose, no hype language

### Primary Workspace (70% width)
- Main product interaction area
- Clean cards, predictable components
- No crowding

### Secondary Panel (30% width)
- Step explanation (short)
- Copyable prompt box
- Action buttons: Copy, Build in Lovable, It Worked, Error, Add Screenshot
- Calm styling

### Proof Footer
Persistent bottom section with checklist:
- □ UI Built
- □ Logic Working
- □ Test Passed
- □ Deployed

Each checkbox requires user proof input.

## Component Rules

- Primary button: solid deep red
- Secondary button: outlined
- Same hover effect and border radius everywhere
- Inputs: clean borders, no heavy shadows, clear focus state
- Cards: subtle border, no drop shadows, balanced padding

## Interaction Rules

- Transitions: 150–200ms, ease-in-out
- No bounce, no parallax

## Error & Empty States

- Errors: explain what went wrong + how to fix, never blame user
- Empty states: provide next action, never feel dead

## Files

- `design-system.css` — Complete design system stylesheet
- `index.html` — Reference implementation showing all components

Everything must feel like one mind designed it. No visual drift.
