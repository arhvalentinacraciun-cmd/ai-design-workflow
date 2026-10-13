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
Why each version is the way it is: `memory/design-system-history.md`
(read it before changing tokens, the palette or component states).

| Component | Classes | Variants, sizes, states |
|---|---|---|
| Button | `.btn` + variant | `.btn-primary` `.btn-secondary` `.btn-ghost` `.btn-danger` · sizes `.btn-sm` `.btn-lg` · `.btn-block` `.btn-icon` (square, needs `aria-label`) · `.btn__icon` for an inline SVG · states: hover, active, focus-visible, `:disabled`, `.is-loading` (set `aria-busy`) |
| Field | `.field` wraps a label and a control | `.field-label` (+ `.field-label__required`), `.field__hint`, `.field__error` (wire with `aria-describedby`) |
| Input | `.input` inside `.field` | states: hover, focus, `aria-invalid="true"`, `:disabled`; placeholder is a hint, never the label |
| Select | `.select-wrap` > `.select` | same states as Input; the wrapper draws the chevron, so always use the wrapper |
| Badge | `.badge` + variant | `neutral` `primary` `success` `warning` `danger` · `.badge--dot` for a leading dot |
| Tag | `.tag` | `.tag__remove` button inside for a removable tag |
| Card | `.card` | `.card--muted` `.card--interactive` (focusable, needs `tabindex="0"` or to be a link) · sections `.card__header` `.card__body` `.card__footer` · `.card__title` `.card__meta` |
| Alert | `.alert` + variant | `info` `success` `warning` `danger` · `.alert__content` > `.alert__title` + text · `.alert__actions` · `.alert__close` |
| Rating | `.rating` > `.rating__dot(--filled)` | `.rating--lg` · `.rating__label` for the score in words · dots only, never stars (recorded design decision) |

## Usage guidance

- Primary button: one per view, for the single main action. Everything else
  is secondary or ghost.
- Danger button: destructive and hard to undo only. Destructive-but-
  recoverable actions use secondary + confirmation.
- Badges communicate status; tags communicate metadata. Don't swap them.
- Every interactive element keeps a visible `:focus-visible` state — the
  components ship with one; don't remove it.
- Disabled is a last resort: a control that cannot be used yet should say
  why (hint or alert) rather than sit greyed out without explanation.
- A Select always sits in `.select-wrap`; a bare `.select` has no chevron.
