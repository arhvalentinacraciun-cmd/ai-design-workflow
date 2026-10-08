---
name: session-3
description: The mentee types /session-3 at the start of Session 3 (Design system, spec-first). Opens the session, loads BRW-103 and sets the spec-first rule for tonight, so every laptop in the room starts in the same state. Only runs when typed; never invoke it on your own.
---

# Session 3 · Design system, spec-first

## 1. Open

Run the session-protocol open: read `CLAUDE.md` completely, run
`git status`, summarise the project state in three sentences.

If there is uncommitted work, say so and offer to commit it first.

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
