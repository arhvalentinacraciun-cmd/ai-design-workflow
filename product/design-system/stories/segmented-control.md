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
inputs are visually hidden; the `<span>` is the visible option. The
`aria-label` on the fieldset names the group.

## Variants

None in version one. Size and icon variants are out of scope until a
second use of the component asks for them.

## States

| State | What changes |
|---|---|
| Default | Group has a neutral background and a border; options are text only |
| Hover on an option | Option background lightens |
| Selected | Option gets a raised background, stronger text colour, a small shadow |
| Focus-visible | The focused option shows the shared focus ring, inside the group |
| Disabled (optional) | Whole group at reduced opacity, no hover; not needed for BRW-103 |

## Tokens

Layer 2 names, each pointing at a Layer 1 primitive. Add them to
`product/design-system/component-tokens.css` next to the Button tokens.
Every colour and radius goes through these; shared scales may be used
directly in the CSS as the design-system skill allows.

```css
/* Segmented control */
--segmented-bg:                var(--color-neutral-100);
--segmented-border-color:      var(--color-neutral-200);
--segmented-radius:            var(--radius-md);
--segmented-padding:           var(--space-1);
--segmented-option-text:       var(--color-neutral-700);
--segmented-option-padding-x:  var(--space-3);
--segmented-option-padding-y:  var(--space-1);
--segmented-option-radius:     var(--radius-sm);
--segmented-option-hover-bg:   var(--color-neutral-200);
--segmented-selected-bg:       var(--color-white);
--segmented-selected-text:     var(--color-neutral-900);
--segmented-selected-shadow:   var(--shadow-sm);
--segmented-focus-ring-color:  var(--color-primary-500);
```

## Accessibility

- The group is a `fieldset` with an `aria-label`; the options are native
  radios, so the pattern needs no JavaScript for keyboard or announcements.
- Hiding the input must keep it focusable: clip it, do not `display:none`.
- The selected state is not colour alone: the raised background and
  shadow carry it, and the radio's checked state carries it for assistive
  technology.
- Focus ring uses the shared `--focus-ring-*` scale, same as Button.

## Acceptance criteria for building it

- [ ] The tokens above exist in `component-tokens.css`, each pointing at a
      primitive (the hook rejects a literal).
- [ ] `.segmented` and `.segmented__option` exist in `components.css`,
      using only the tokens above and the shared scales.
- [ ] Arrow keys move the selection; Tab enters and leaves the group.
- [ ] The focus ring is visible on the focused option.
- [ ] The design-system skill's inventory lists the component with its
      classes and "single-select, 2–5 options".
- [ ] No literal style values anywhere.

## Stories

Named states to check by hand now, and to render in the design-system
viewer when it exists:

1. **Default**: four options, "All" selected.
2. **Middle selected**: "Medium" selected.
3. **Focused**: "Light" focused by keyboard, ring visible.
4. **Two options**: the smallest valid group.
