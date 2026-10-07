# BRW-103 · Build a feature spec-first

| | |
|---|---|
| **Type** | Feature |
| **Session** | S3 — Spec-first building |
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
- [ ] Adding a new entry while a filter is active behaves sensibly — the
      **spec must say what "sensibly" means** before any code is written.
- [ ] Empty filter result shows an info alert, reusing the BRW-101 pattern.
- [ ] No literal style values; inventory components only.

## Process — this is the actual exercise

1. **Do not let Claude write code first.** Ask it to write a short spec:
   chosen component for the filter (from the inventory — and if none fits,
   what it proposes), the filtered-count wording, and the answer to the
   active-filter-plus-new-entry question.
2. Review the spec. Push back on at least one point — even a small one.
3. Only after you approve the spec: *"Implement exactly this spec."*
4. Check every criterion yourself before "Session done."

## Stretch (optional)

Have the spec written as a comment-annotated HTML snippet a developer could
implement without the conversation — the handoff-artifact version of the
same thinking.
