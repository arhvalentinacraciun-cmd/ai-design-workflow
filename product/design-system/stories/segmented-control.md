# Segmented control · component story

**Status:** not in the inventory yet. Session 3 builds it from this story,
and the design-system skill gains a row when it ships. Until then, it does
not exist: the agent must not use it or improvise it.

## What it is

A single-select group of two to five short options shown side by side.
One option is always selected. Choosing another switches the view at
once; there is no submit step. In Brewlog it filters the entry list by
roast: All / Light / Medium / Dark.

## When to use it, and when not

| Use it when | Use something else when |
|---|---|
| Two to five options, each one or two words | More than five options → Select |
| Exactly one option is active at a time | Several can be active → Tags as toggles |
| Switching is instant and reversible | The choice needs confirming → Select plus a Button |
| The options filter or switch what is shown | The options navigate to another page → links |

## Anatomy

```html
<fieldset class="segmented" aria-label="Filter by roast">
  <label class="segmented__option">
    <input type="radio" name="roast" value="all" checked>
    <span>All</span>
  </label>
  <label class="segmented__option">
    <input type="radio" name="roast" value="light">
    <span>Light</span>
  </label>
  <!-- one label per option -->
</fieldset>
```

Native radio inputs do the work: single selection, arrow-key movement
between options, and a checked state that screen readers announce. The
inputs are visually hidden; the label is the visible option. The
`aria-label` on the fieldset names the group.

The group is a pill with a 2px border. The options share its width
equally, so the bold label on the selected option never pushes its
neighbours. Each option is at least `--size-control` tall, the same 48px
as Button, Input and Select.

## Variants

None in version one. Size and icon variants are out of scope until a
second use of the component asks for them.

## States

| State | What changes |
|---|---|
| Default | Group has a neutral background and a 2px neutral border, pill-shaped; options are text only |
| Hover on an option | Option background darkens one step (neutral-100 to neutral-200). The selected option does not change on hover |
| Selected | Option is filled with the primary colour, its text turns white and bold. No shadow |
| Focus-visible | The focused option shows the shared focus ring in `--color-primary-600`, the same as Button |
| Disabled (optional) | Whole group at `--opacity-disabled`, no hover; not needed for BRW-103 |

## Tokens

Layer 2 names, each pointing at a Layer 1 primitive. Add them to
`product/design-system/component-tokens.css` next to the Button tokens.
Every colour and radius goes through these; shared scales (border width,
font weight, size, focus ring, opacity) may be used directly in the CSS as
the design-system skill allows.

```css
/* Segmented control */
--segmented-bg:                var(--color-neutral-100);
--segmented-border-color:      var(--color-neutral-300);
--segmented-radius:            var(--radius-full);
--segmented-padding:           var(--space-1);
--segmented-option-text:       var(--color-neutral-700);
--segmented-option-padding-x:  var(--space-4);
--segmented-option-radius:     var(--radius-full);
--segmented-option-hover-bg:   var(--color-neutral-200);
--segmented-selected-bg:       var(--color-primary-600);
--segmented-selected-text:     var(--color-white);
--segmented-focus-ring-color:  var(--focus-ring-color);
```

From the shared scales: the group border is `--border-width-sm` (2px),
the selected label is `--font-weight-bold`, each option's `min-height` is
`--size-control`, and the focus ring is `--focus-ring-width` with an
offset of `--space-1`, as on Button.

## Accessibility

- The group is a `fieldset` with an `aria-label`; the options are native
  radios, so the pattern needs no JavaScript for keyboard or announcements.
- Hiding the input must keep it focusable and clickable. Give the label
  `position: relative` and the input `position: absolute; inset: 0;
  opacity: 0`, so it covers its option and stays in the tab order. Do not
  use `display: none`, which removes it from the keyboard, or a clip
  pattern built from pixel sizes, which the hook flags.
- Style the states from the input with `:has()`, for example
  `.segmented__option:has(input:checked)` and
  `.segmented__option:has(input:focus-visible)`.
- The selected state is not colour alone: the fill contrasts strongly
  with the group, the label turns bold, and the radio's checked state
  carries it for assistive technology.
- Focus ring uses the shared `--focus-ring-*` scale, same as Button. The
  offset keeps it visible on the filled option, which is the same colour.

## Acceptance criteria for building it

- [ ] The tokens above exist in `component-tokens.css`, each pointing at a
      primitive (the hook flags a literal).
- [ ] `.segmented` and `.segmented__option` exist in `components.css`,
      using only the tokens above and the shared scales.
- [ ] Arrow keys move the selection; Tab enters and leaves the group.
- [ ] The focus ring is visible on the focused option, selected or not.
- [ ] No literal style values anywhere.
- [ ] The viewer's Segmented control block replaces its Planned
      placeholder with the same five tabs as every other component
      (preview with the four stories below, tokens, usage, accessibility
      with its contrast pairs, code), and its nav link leaves the planned
      style. The steps are on the viewer's "Adding a component" page.
- [ ] The viewer's Changelog has a dated row for the component in place
      of the Planned row, and `memory/design-system-history.md` has the
      same row with the why.
- [ ] The design-system skill's inventory lists the component with its
      classes and "single-select, 2–5 options".
- [ ] After the inventory row, run `python3 hooks/sync-skills.py` so the
      copy in `.agents/skills/` matches.

## Stories

Named states to check by hand, and to render in the viewer's preview:

1. **Default**: four options, "All" selected.
2. **Middle selected**: "Medium" selected.
3. **Focused**: "Light" focused by keyboard, ring visible.
4. **Two options**: the smallest valid group.
