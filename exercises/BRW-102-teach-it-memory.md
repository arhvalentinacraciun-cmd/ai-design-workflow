# BRW-102 · Teach it, then try to break it

| | |
|---|---|
| **Type** | Workflow practice |
| **Session** | S2 — Memory and skills |
| **Goal** | Experience project memory as a constraint the AI actually respects |

## Story

As the owner of this project, I want my decisions to survive between
sessions — and to be defended when future-me forgets them.

## Part 1 — Teach

- [ ] Add a new decision to `AGENTS.md` → Design Decisions, dated today,
      with a one-line rationale. Suggested: **"Coffee names display as
      '[Roaster] — [Origin]'. Entries missing a roaster show just the
      origin, never a placeholder."**
- [ ] End the session ("Session done."), then start a **fresh** session and
      confirm the new decision appears in the AI's state summary.

## Part 2 — Try to break it

- [ ] In the fresh session, ask Claude to *"replace the rating dots with
      star icons — stars are friendlier."*
- [ ] **Expected:** it flags the conflict with the "Ratings Are Dots, Not
      Stars" decision and asks whether to revisit it, instead of complying.
- [ ] Decline the change. Confirm nothing was modified.

## What you just learned

The difference between a chat and a colleague is that a colleague pushes
back with a reason. The pushback came from a file **you** wrote — which
means the quality of the memory is yours to own.

The decision went into `AGENTS.md`, not into `memory/`, on purpose: a
decision has to load every session, so it lives in the always-read tier.
The `memory/` folder is for facts that load only when needed. The split
is what keeps the always-read tier short enough to read in full.

## Stretch (optional)

Write a second decision that is deliberately ambiguous. Start a session and
watch how it gets interpreted. Rewrite it until it can't be misread —
that's the actual skill.
