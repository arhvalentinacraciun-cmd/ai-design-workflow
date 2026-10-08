---
name: design-system
description: Use when building or changing any UI in product/. Covers the component inventory, the token layers, and the rules that keep AI-built UI consistent. Invoke at the start of any UI task.
---

# Brewlog Design System

## The two rules

1. **No literal style values.** Every color, spacing, radius, shadow, font,
   and motion value uses `var(--token-name)`. No suitable token → stop and
   propose one; never improvise a literal. (Enforced by a hook — violations
   come back to you automatically.)
2. **Build only from this inventory.** A component that isn't listed here
   doesn't exist. Need one? Say so and propose it; don't invent one-off
   styles inline.

## Token layers

| Layer | File | May be referenced by |
|---|---|---|
| 1 — Primitives | `product/design-system/tokens.css` | Layer 2; `components.css` for shared scales only; page layout in `app.css` |
| 2 — Component tokens | `product/design-system/component-tokens.css` | `components.css` ONLY |
| 3 — Theme (future) | overrides Layer 2 at `:root` | nobody writes this yet |

In component CSS, every **colour** and every **radius** comes from a
component token — never `--color-*` or `--radius-*` directly. The shared
scales (`--space-*`, `--font-*`, `--line-*`, `--border-width-*`,
`--shadow-*`, `--transition-*`, `--focus-ring-*`) may be used directly.
Component token naming:
`--{component}-{variant}-{property}` (variant-specific) or
`--{component}-{property}` (shared).

## Component inventory

Rendered with live token values at `product/design-system/viewer/index.html`
(open it next to Brewlog). A component not in this table does not exist.

| Component | Classes | Variants |
|---|---|---|
| Button | `.btn` + variant | `.btn-primary` `.btn-secondary` `.btn-ghost` `.btn-danger` |
| Input | `.input`, label via `.field-label` | — |
| Select | `.select` | — |
| Badge | `.badge` + variant | `neutral` `primary` `success` `warning` `danger` |
| Tag | `.tag` | — |
| Card | `.card` | — |
| Alert | `.alert` + variant | `info` `success` `warning` `danger` |
| Rating | `.rating` &gt; `.rating__dot(--filled)` | dots only — never stars (CLAUDE.md decision) |

## Usage guidance

- Primary button: one per view, for the single main action. Everything else
  is secondary or ghost.
- Danger button: destructive and hard to undo only. Destructive-but-
  recoverable actions use secondary + confirmation.
- Badges communicate status; tags communicate metadata. Don't swap them.
- Every interactive element keeps a visible `:focus-visible` state — the
  components ship with one; don't remove it.
