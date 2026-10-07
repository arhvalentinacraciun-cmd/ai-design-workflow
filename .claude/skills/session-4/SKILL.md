---
name: session-4
description: The mentee types /session-4 at the start of Session 4 (Judgment and demo day). Opens the session, checks the critique homework is in hand and helps prepare the three-minute demo, so every laptop in the room starts in the same state. Only runs when typed; never invoke it on your own.
---

# Session 4 · Judgment and demo day

## 1. Open

Run the session-protocol open: read `CLAUDE.md` completely, run
`git status`, summarise the project state in three sentences.

Tonight the three sentences matter more than usual: they are the first
thing the mentee will say in the demo. Make them accurate.

## 2. Check the homework

Read `exercises/BRW-104-critique.md` and `exercises/BRW-105-demo-day.md`.
Then check, and report in one line each:

- `CLAUDE.md` Current State reflects everything built since Session 1.
  If not, propose the update now.
- The BRW-104 critique was run: a verdict, a score table, one contested
  score with evidence, one proposed change to the rubric. If any is
  missing, offer to run `/critique` now; the contested score has to come
  from the mentee, not from you.

## 3. Prepare the demo

The demo is three minutes, live, no slides, three beats. Draft the three
beats from `git log`, `CLAUDE.md` and the critique, then let the mentee
rewrite them in their own words:

1. **The thing.** What is on screen, in one sentence.
2. **The system moment.** One moment the workflow did its job: the hook
   catching a literal, the memory defending a decision, the spec catching
   an ambiguity before code. Name the file and the line if you can.
3. **The transplant.** Which piece of this repo goes into the mentee's real
   work first, starting Monday.

Then a dry run: ask the mentee to say it out loud once, and time it.

## 4. Tonight's agenda

| Block | About | What happens |
|---|---|---|
| Critique, live | 15 min | One build reviewed with the room; which score did you disagree with |
| Provenance | 5 min | Verified, derived, invented, on the same output |
| Security and the law | 10 min | What never goes into a prompt; the EU AI Act as a forward brief |
| Demos | 40 min | Three minutes each, hard timer |

## 5. Close

On "Session done." run the session-protocol close for the last time in
the track. Then say what the mentee keeps, from BRW-105:

> This repo is yours. Rewrite `CLAUDE.md` for a real project, swap the
> design system for your own, keep the hook, keep the protocol.
