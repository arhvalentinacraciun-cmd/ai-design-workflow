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

- [ ] A "Clear all" button appears to the right of "Add entry", using the
      **secondary** button variant (this is not the page's primary action).
- [ ] Clicking it empties the entry list and the brew count reads "0 brews".
- [ ] When the list is empty, an **info alert** appears in place of the list:
      "No brews yet. Your next great coffee goes here."
- [ ] "Clear all" asks before it acts: a **warning alert** with the text
      "Are you sure you want to clear your list?" and two actions in it,
      "Clear" (secondary) and "Cancel" (ghost). Cancel closes the alert and
      changes nothing; Clear empties the list.
- [ ] No new CSS contains a literal style value (the hook will tell you).

## Constraints

- Use only components from the design-system skill inventory.
- Do not add persistence — that's an open question in `AGENTS.md`.

## If you're new to this

Open the session exactly like the protocol says, then hand Claude this file:
*"Today we're doing BRW-101 — read exercises/BRW-101-first-task.md and
implement it."* Watch what it reads before it writes. That order — memory,
skills, then code — is the whole method.

## Stretch (optional)

Make "Clear all" recoverable: after clearing, the alert offers an "Undo"
ghost button for the current page view. Notice which recorded decision this
brushes against, and how Claude handles it.
