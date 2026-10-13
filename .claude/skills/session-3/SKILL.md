---
name: session-3
description: The mentee types /session-3 at the start of Session 3 (Design system, spec-first). Opens the session, loads BRW-103 and sets the spec-first rule for tonight, so every laptop in the room starts in the same state. Only runs when typed; never invoke it on your own.
---

# Session 3 · Design system, spec-first

## 1. Open

Run the session-protocol open: `/vault-load`, then `git status`, then the
project state in three sentences. Tonight's topic is the design system, so
also load `/vault-load design system` and say what its history file adds.

If there is uncommitted work, say so and offer to commit it first.

If Track phase in `CLAUDE.md` still lists Session 2 as Next, last week's
close did not record it: move Session 2 to Done and set Next to
Session 3 · Design system, spec-first · Thu 19 Nov 2026 now.

## 2. Load the ticket

Read `exercises/BRW-103-spec-first-feature.md` in full, then the
design-system skill. Say the kick-off line:

*"Today we're doing BRW-103. The goal is to go ticket → spec → build, and
feel why the spec step earns its keep."*

## 3. Tonight's rule: no code before the spec

Tonight you write nothing in `product/` until the mentee says
*"Implement exactly this spec."* Before that line, the work is:

1. **Spec.** Propose a short spec: which inventory component the filter
   uses, the exact wording of the filtered count, and what happens when a
   new entry is added while a filter is active. The ticket leaves that
   last one open on purpose; the spec has to close it.
2. **Inventory check.** The inventory has no filter or segmented control.
   Say so, then read `product/design-system/stories/segmented-control.md`:
   that is the component's story, already reviewed. Summarise it in four
   lines (what it is, its tokens, its states, how it stays accessible) and
   wait for approval before building it.
3. **Review.** Expect pushback on at least one line. Change the spec, not
   the mentee's mind.

## 4. Tonight's hands-on, in order

| Block | About | What happens |
|---|---|---|
| Spec | 10 min | Draft the feature spec, read the component story; the mentee reviews both |
| The component | 15 min | Build the segmented control from its story: tokens in `component-tokens.css`, styles in `components.css`, inventory row in the design-system skill, the story's acceptance criteria checked |
| The feature | 20 min | "Implement exactly this spec." Then every criterion checked by hand |
| Critique round | 10 min | The mentor reviews one build with the room. Log the feedback, change nothing until asked |

Show this table, then wait for the mentee to start the spec.

## 5. Close

On "Session done." run the session-protocol close. Then name the capstone
brief for the last week:

> Finish the feature. Run `/critique` on it and disagree with at least one
> score, with evidence (that is BRW-104, done at home). Prepare a
> three-minute demo in three beats: the thing, the system moment, the
> transplant.

Write it into Track phase in `CLAUDE.md`: Done gains Session 3, Next
becomes Session 4 · Judgment and demo day · Thu 26 Nov 2026, the twin is
the brief above, Twin progress is "not started".
