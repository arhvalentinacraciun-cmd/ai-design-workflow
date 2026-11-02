---
name: session-3
description: The mentee types /session-3 at the start of Session 3 (Design system, spec-first). Opens the session, loads BRW-103 and sets tonight's order of spec, component, feature, so every laptop in the room starts in the same state. Only runs when typed; never invoke it on your own.
disable-model-invocation: true
---

# Session 3 · Design system, spec-first

## 1. Open

Run the session-protocol open with tonight's topic:
`/vault-load design system`, which reports, then the twin question (last
week's twin was a skill of the mentee's own). Say what the design system
history file adds.

If there is uncommitted work, say so and offer to commit it first.

If Track phase in `AGENTS.md` still lists Session 2 as Next, last week's
close did not record it: move Session 2 to Done and set Next to
Session 3 · Design system, spec-first · Thu 19 Nov 2026 now.

## 2. Load the ticket

Read `exercises/BRW-103-spec-first-feature.md` in full, then the
design-system skill. Say the kick-off line:

*"Today we're doing BRW-103. The goal is to go ticket → spec → build, and
feel why the spec step earns its keep."*

## 3. Tonight's rule: spec, then component, then feature

Two go-ahead lines from the mentee open the two builds, in this order:

- *"Build the component from its story."* opens the component files:
  `product/design-system/component-tokens.css`,
  `product/design-system/components.css`, and the inventory row in the
  design-system skill.
- *"Implement exactly this spec."* opens the feature files:
  `product/app.js`, `product/index.html` and `product/app.css`.

Before the first line, write nothing in `product/`. Before the second,
touch no feature file. Until the first line, the work is:

1. **Spec.** Propose a short spec: which inventory component the filter
   uses, the exact wording of the filtered count, and what happens when a
   new entry is added while a filter is active. The ticket leaves that
   last one open on purpose; the spec has to close it.
2. **Inventory check.** The inventory has no filter or segmented control.
   Say so, then read `product/design-system/stories/segmented-control.md`:
   that is the component's story, already reviewed. Summarise it in four
   lines (what it is, its tokens, its states, how it stays accessible) and
   wait for *"Build the component from its story."*
3. **Review.** Expect pushback on at least one line of the spec. When it
   comes, change the spec.

## 4. Tonight's hands-on, in order

| Block | About | What happens |
|---|---|---|
| Show and tell (last week's twin) | 10 min | The mentor runs it: a few mentees show the skill they built at home. Nothing to build; wait |
| Spec | 10 min | Draft the feature spec, read the component story; the mentee reviews both |
| The component | 15 min | "Build the component from its story." Tokens in `component-tokens.css`, styles in `components.css`, the inventory row in the design-system skill, then `python3 hooks/sync-skills.py`; the story's acceptance criteria checked |
| The feature | 20 min | "Implement exactly this spec." Changes in `app.js`, `index.html` and `app.css`, then every criterion checked by hand |
| Critique round | 10 min | The mentor reviews one build with the room. Log the feedback, change nothing until asked |

Show this table, then wait for the mentee to start the spec.

## 5. Close

On "Session done." run the session-protocol close. Two of its steps need
this skill:

- **Track phase (close step 2).** Done gains Session 3, Next becomes
  Session 4 · Judgment and demo day · Thu 26 Nov 2026, the twin is the
  brief below, and Twin progress is "not started" because the twin
  changed tonight.
- **The twin in the chat (close step 6).** Name the capstone brief for
  the last week:

> Finish the feature. Run `/critique` on it and disagree with at least one
> score, with evidence (that is BRW-104, done at home). Prepare a
> three-minute demo in three beats: the thing, the system moment, the
> transplant.
