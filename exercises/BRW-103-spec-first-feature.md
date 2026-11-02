# BRW-103 · Build a feature spec-first

| | |
|---|---|
| **Type** | Feature |
| **Session** | S3 — Design system, spec-first |
| **Goal** | Go ticket → spec → build, and feel why the spec step earns its keep |

## Story

As a Brewlog user with a growing log, I want to **filter entries by roast
level** so I can find the light roasts I keep coming back to.

## Acceptance criteria

- [ ] A filter control appears between the form and the list. All / Light /
      Medium / Dark.
- [ ] Selecting a roast shows only matching entries; the brew count shows
      the filtered count (e.g. "2 of 5 brews").
- [ ] "All" is the default and restores the full list.
- [ ] Adding a new entry while a filter is active behaves sensibly. The
      **spec must say what "sensibly" means** before any code is written.
- [ ] A roast with no entries shows an info alert, reusing the BRW-101
      pattern, with the roast in the text: "No light brews yet." (or
      medium, or dark). The three seeds cover one roast each, so to see
      this state, use Clear all from BRW-101 and add entries of one roast
      only, then pick another roast.
- [ ] No literal style values; inventory components only.

## Process · this is the actual exercise

1. **Do not let the agent write code first.** Ask it to write a short spec:
   chosen component for the filter (from the inventory, and if none fits,
   what it proposes), the filtered-count wording, and the answer to the
   active-filter-plus-new-entry question. The inventory has no filter
   control; the story for the missing one is at
   `product/design-system/stories/segmented-control.md`.
2. Review the spec and the story summary. Push back on at least one
   point, even a small one.
3. When you are happy with the story, say *"Build the component from its
   story."* The agent builds the segmented control in the design system
   and checks the story's own acceptance criteria. It does not touch
   `product/app.js`, `product/index.html` or `product/app.css` yet.
4. Only after you approve the feature spec: *"Implement exactly this
   spec."*
5. Check every criterion yourself before "Session done."

## Stretch (optional)

Have the spec written as a comment-annotated HTML snippet a developer could
implement without the conversation: the handoff-artifact version of the
same thinking.

## Twin (at home, optional)

The capstone brief for the last week: finish the feature, run `/critique`
on it and disagree with at least one score, with evidence (that is
BRW-104), and prepare a three-minute demo in three beats: the thing, the
system moment, the transplant (BRW-105). If you want a second component,
write its story first, using the segmented control story as the template,
then build it from the story.
