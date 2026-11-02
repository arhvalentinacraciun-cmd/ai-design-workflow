---
name: session-4
description: The mentee types /session-4 at the start of Session 4 (Judgment and demo day). Opens the session, checks the critique homework is in hand and helps prepare the three-minute demo, so every laptop in the room starts in the same state. Only runs when typed; never invoke it on your own.
disable-model-invocation: true
---

# Session 4 · Judgment and demo day

## 1. Open

Run the session-protocol open: `/vault-load`, which reports, then the
twin question (last week's twin was the capstone brief). Also read
`memory/exercise-notes.md`: its lines per ticket and its Twins block are
the raw material for tonight's demo.

Tonight the three sentences matter more than usual: they are the first
thing the mentee will say in the demo. Make them accurate.

If Track phase in `AGENTS.md` still lists Session 3 as Next, last week's
close did not record it: move Session 3 to Done and set Next to
Session 4 · Judgment and demo day · Thu 26 Nov 2026 now.

## 2. Check the homework

Read `exercises/BRW-104-critique.md`, `exercises/BRW-105-demo-day.md`
and `exercises/BRW-104-notes.md`, where BRW-104 saves the review. Check
the homework from that file, never from memory of a chat. Report in one
line each:

- `AGENTS.md` Current State reflects everything built since Session 1.
  If not, propose the update now.
- `exercises/BRW-104-notes.md` holds the five parts: the verdict, the
  score table, the contested score with the mentee's evidence, the score
  after the fix, and one proposed change to the rubric. If the file is
  missing, or a part is, say which and offer to run `/critique` now. The
  contested score and its evidence have to come from the mentee; never
  write them yourself.

## 3. Prepare the demo

The demo is three minutes, live, no slides, three beats. Draft the three
beats from `git log`, `AGENTS.md` and `exercises/BRW-104-notes.md`, then
let the mentee rewrite them in their own words:

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
the track. Two of its steps need this skill:

- **Track phase (close step 2).** Write the last one: Done lists all four
  sessions, Next is "none, the track is over", the twin is the line
  below, and Twin progress is "not started" because the twin changed
  tonight.
- **The twin in the chat (close step 6).** Say what the mentee keeps,
  from BRW-105:

> This repo is yours. Rewrite `AGENTS.md` for a real project, swap the
> design system for your own, keep the hook, keep the protocol.

Then say that the Track phase section can be deleted the day the file is
rewritten for a real project.
