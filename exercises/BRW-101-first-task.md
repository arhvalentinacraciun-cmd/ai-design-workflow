# BRW-101 · First task

| | |
|---|---|
| **Type** | Feature (small) |
| **Session** | S1 — Setup day |
| **Goal** | Prove your environment works end to end: session open → change → guardrail → session close |

## Story

As a Brewlog user, I want a **"Clear all"** action next to "Add entry" so I
can empty my log and start fresh, without doing it by accident.

## Acceptance criteria

- [ ] A "Clear all" button appears next to "Add entry", using the
      **secondary** button variant (this is not the page's primary action).
- [ ] After confirming with Clear, the list is empty and the count reads
      "0 brews".
- [ ] When the list is empty, an **info alert** appears in place of the list:
      "No brews yet. Your next great coffee goes here."
- [ ] "Clear all" asks before it acts: a **warning alert** with the text
      "Are you sure you want to clear your list?" and two actions in it,
      "Clear" (secondary) and "Cancel" (ghost). Cancel closes the alert and
      changes nothing; Clear empties the list.
- [ ] No new CSS contains a literal style value (the hook will tell you).

## See the guardrail once

When the criteria above are met, and before you close the session:

1. Ask the agent for a gap of exactly `10px` between "Add entry" and
   "Clear all", written as a literal. It may refuse on the No-Hardcoding
   Rule alone; that is the memory doing its job. Tell it this is a
   deliberate test of the hook, and it writes the value.
2. Watch the hook report the literal straight back into the session, with
   the file and the line. The agent fixes it. (On Antigravity the hook
   blocks the write instead, so the literal never lands.)
3. Now ask for the same gap through a spacing token. The scale has no
   10px step, so the agent should say so and offer the nearest one, or
   propose a new token. Either answer is fine; a literal is not.

The hook reads CSS and HTML files under `product/`. It does not read
JavaScript, so a style value written from `app.js` gets past it.

## Constraints

- Use only components from the design-system skill inventory.
- Do not add persistence. That is an open question in
  `memory/_continuity.md`.
- Why secondary: danger is for actions that cannot be undone. Here the
  entries live in memory only, and a reload brings the three seed entries
  back.

## If you're new to this

Open the session exactly like the protocol says, then give the kick-off
line: *"Today we're doing BRW-101. The goal is to prove the environment
works end to end."* If the agent does not open this file by itself, point
it at `exercises/BRW-101-first-task.md`. Watch what it reads before it
writes. That order (memory, skills, then code) is the whole method.

A hint for the build: "Clear all" sits inside the add-entry form, so it
needs `type="button"`. Without it, a click submits the form.

## Stretch (optional)

Make "Clear all" recoverable: after clearing, the alert offers an "Undo"
ghost button for the current page view. An Undo that survives a reload
would need storage, which is the open persistence question in
`memory/_continuity.md`. Notice how the agent handles that.

## Twin (at home, optional)

The stretch above, or one small task of your own in the repo. Bring it to
Session 2's show and tell.
