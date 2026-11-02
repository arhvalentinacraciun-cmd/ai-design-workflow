---
name: design-system
description: Use when building or changing any UI in product/. Covers the component inventory, the token layers, and the rules that keep AI-built UI consistent. Invoke at the start of any UI task.
---

# Brewlog Design System

## The two rules

1. **No literal style values.** Every colour, spacing, radius, shadow,
   font and motion value uses `var(--token-name)`. Literals live in two
   places only: `product/design-system/tokens.css` (Layer 1), where every
   value is defined, and `@media` conditions, where custom properties do
   not work. Anywhere else a literal is never the answer: no suitable
   token → stop and propose one. (Enforced by a hook: violations come
   back to you automatically.)
2. **Build only from this inventory.** A component that isn't listed here
   doesn't exist. Need one? Say so and propose it; don't invent one-off
   styles inline.

## Token layers

| Layer | File | May be referenced by |
|---|---|---|
| 1 · Primitives | `product/design-system/tokens.css` | Layer 2; the shared scales in `components.css` and `app.css` (list below) |
| 2 · Component tokens | `product/design-system/component-tokens.css` | `components.css`; `app.css` for the page namespace `--page-*` and for a component part the page styles (such as `--card-meta-text`) |
| 3 · Theme (future) | overrides Layer 2 at `:root` | nobody writes this yet |

Layer 2 has one namespace per component (`--button-*`, `--badge-*`,
`--tag-*` and so on), plus `--page-*` for the page layout in `app.css` and
one shared token, `--focus-ring-color`.

In component CSS, every **colour** and every **radius** comes from Layer 2,
never from `--color-*` or `--radius-*` directly. A component takes them
from its own namespace or from `--focus-ring-color`, never from another
component's namespace. The shared scales may be used directly from
Layer 1: `--space-*`, `--font-*`, `--line-*`, `--border-width-*`,
`--shadow-*`, `--transition-*`, `--duration-*`, `--focus-ring-width`,
`--opacity-*`, `--size-*` and `--letter-spacing-*`.
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
| Badge | `.badge` + variant | `.badge-neutral` `.badge-primary` `.badge-accent` `.badge-success` `.badge-warning` `.badge-danger` · `.badge--dot` for a leading dot · `.badge-accent` is the lime highlighter, one per view (the brew count) |
| Tag | `.tag` | `.tag--plain` (no pill, for a meta line in a card) · `.tag--dot` leading dot · `.tag-roast` + `.tag-roast--light/medium/dark` for the roast level, the only place the coffee brown appears · `.tag__remove` button inside for a removable tag |
| Card | `.card` | `.card--muted` `.card--interactive` (focusable, needs `tabindex="0"` or to be a link) · sections `.card__header` `.card__body` `.card__footer` · `.card__title` `.card__meta` |
| Alert | `.alert` + variant | `.alert-info` `.alert-success` `.alert-warning` `.alert-danger` · `.alert__content` > `.alert__title` + text · `.alert__actions` · `.alert__close` |
| Rating | `.rating` > `.rating__dot(--filled)` | `.rating--lg` · `.rating--top` for a 5 of 5 (the lime band; the page adds it) · `.rating__label` for the score in words · empty dots are outlined · dots only, never stars (recorded design decision) |

## Usage guidance

- Primary button: one per view, for the single main action. Everything else
  is secondary or ghost.
- Danger button: destructive and hard to undo only. Destructive-but-
  recoverable actions use secondary + confirmation.
- Badges communicate status; tags communicate metadata. Don't swap them.
  The roast level is metadata: a plain roast Tag, never a Badge.
- Lime (`accent`) is a highlighter, never a text colour: it fills the brew
  count, a top rating and the info alert, always with the ink on it. Brown
  (`roast`) is the coffee: the roast Tag and nothing else.
- Every interactive element keeps a visible `:focus-visible` state — the
  components ship with one; don't remove it.
- Disabled is a last resort: a control that cannot be used yet should say
  why (hint or alert) rather than sit greyed out without explanation.
- A Select always sits in `.select-wrap`; a bare `.select` has no chevron.
