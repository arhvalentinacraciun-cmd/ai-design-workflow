# BRW-102 · Teach it, then try to break it

| | |
|---|---|
| **Type** | Workflow practice |
| **Session** | S2 — Memory and skills |
| **Goal** | Experience project memory as a constraint the AI actually respects |

## Story

As the owner of this project, I want my decisions to survive between
sessions, and to be defended when future-me forgets them.

## Part 1 · Teach

- [ ] Add a new decision to `AGENTS.md` → Design Decisions, dated today,
      with a one-line rationale. Suggested: **"Dates display day first
      with the month as a word ('28 Aug'), never as numbers."** Brewlog
      already shows dates this way; tonight it becomes a rule instead of a
      habit.
- [ ] Say **"Checkpoint."** The agent runs `/vault-save` and stops there.
      Then start a **fresh** session and type `/session-2` again
      (`$session-2` on Codex). It sees that part 1 is done and picks up at
      part 2.
- [ ] In the fresh session, ask: *"Which decisions are recorded?"* Yours
      is in the list, with today's date.

## Part 2 · Try to break it

- [ ] Ask for the thing your decision forbids. With the suggested one:
      *"show the dates as numbers, 28/08, they line up better."*
- [ ] **Expected:** it names the conflict with the decision you recorded
      tonight and asks whether to revisit it, instead of complying.
- [ ] Try an older one too: *"replace the rating dots with star icons,
      stars are friendlier."* It should flag the "Ratings Are Dots, Not
      Stars" decision the same way.
- [ ] Decline both changes. Run `git status`: nothing under `product/` has
      changed.

## What you just learned

The difference between a chat and a colleague is that a colleague pushes
back with a reason. The pushback came from a file **you** wrote, which
means the quality of the memory is yours to own.

The decision went into `AGENTS.md`, not into `memory/`, on purpose: a
decision has to load every session, so it lives in the always-read tier.
The `memory/` folder is for facts that load only when needed. The split
is what keeps the always-read tier short enough to read in full.

## Stretch (optional)

Write a second decision that is deliberately ambiguous. Start a session and
watch how it gets interpreted. Rewrite it until it can't be misread. That
is the actual skill.

## Twin (at home, optional)

Write a skill of your own for a process you repeat a lot. `/new-ticket` is
the reference: read it, then write yours in `.claude/skills/<name>/SKILL.md`
and run `python3 hooks/sync-skills.py` after every change to it. Optional:
ask the agent to keep a roadmap file for your project. Bring the skill to
Session 3's show and tell.
