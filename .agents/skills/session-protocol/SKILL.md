---
name: session-protocol
description: Use at the start and end of every working session in this repo. Defines how a session opens, what counts as done, how to checkpoint mid-session, and what must happen before the session closes.
---
<!-- Copy of .claude/skills/session-protocol/SKILL.md, made by hooks/sync-skills.py. Edit that file, then run: python3 hooks/sync-skills.py. On Codex a skill written /name below is typed $name. sync:f1eb06f72092 -->

# Session Protocol

## Open

1. Run `/vault-load`, which reports. It reads `AGENTS.md` completely, then
   `memory/MEMORY.md` and `memory/_continuity.md`, runs `git status`, and
   gives the project state in three sentences, where the track is and
   what is open. Do not repeat its report. In Session 1 the designer does
   this by hand ("Read AGENTS.md, then give me the state of the project in
   three sentences"); `AGENTS.md` points at the two memory files, so read
   them too, run `git status`, and give the same report.
2. The twin. Read this week's twin in the Track phase section of
   `AGENTS.md`.
   - If opening the session is itself the twin (before Session 1 the twin
     is to install the agent and run the opener once), say that the twin
     is done. Do not offer to start it.
   - Otherwise ask, in one line, how the twin is going.

   Write the answer in `memory/exercise-notes.md` under `## Twins` (add
   the heading at the end of the file if it is missing): one line per
   week, such as *"Before Session 2 (the BRW-101 stretch): Undo works,
   not committed."* Update this week's line; never add a second one for
   the same week. Put the same short answer under Twin progress in Track
   phase. If the designer is here for the twin, offer to start it.
3. Wait for the kick-off line: *"Today we're doing [ticket]. The goal is
   [goal]."* Do not start building without a ticket in play. The twin
   counts as a ticket.

## During

- The active ticket's **acceptance criteria are the definition of done**,
  not the vibe of the conversation.
- Work outside the ticket's scope: flag it, offer to note it as a future
  ticket under Open questions in `memory/_continuity.md`, and stay on
  scope.
- A request that contradicts a recorded Design Decision: stop and say
  *"This conflicts with the decision from [date]: [decision]. Revisit the
  decision, or proceed anyway?"* Never silently comply.

## Checkpoint, triggered by the word "Checkpoint."

A save in the middle of a session. Run `/vault-save` and nothing else. In
the `memory/_continuity.md` it writes, say in one line where the session
stopped and what is next (in Session 2: *"Session 2 part 1 done, part 2
next."*). No Track phase change, no Last updated line, no twin, no commit
reminder. The close still runs once, later, on "Session done." Typing
`/vault-save` mid-session is the same checkpoint.

## Close, triggered by the phrase "Session done."

In this order:

1. Run `/vault-save`: new decisions (with date and rationale) and Current
   State into `AGENTS.md`; facts a later session needs into the matching
   file in `memory/`; the ticket's outcome into `memory/exercise-notes.md`;
   a full scan of `product/`; then `memory/_continuity.md` rewritten with
   open questions, work in flight and how to resume.
2. Update Track phase in `AGENTS.md`. The Session 2, 3 and 4 skills say
   what to write. Otherwise:
   - If tonight's ticket was BRW-101 and Next still says Session 1,
     Session 1 is done: Done gains Session 1, Next becomes
     *Session 2 · Memory and skills · Thu 12 Nov 2026*, the twin becomes
     *"the BRW-101 stretch, or one small task of your own in the repo"*,
     and Twin progress becomes "not started".
   - If tonight's work was the twin, write what was done in one line
     under Twin progress and in this week's line under `## Twins` in
     `memory/exercise-notes.md`.
   - Twin progress goes back to "not started" only when the twin changes.
3. Update the **Last updated** line at the top of `AGENTS.md`: today's
   date, rev one higher. Once per close, after Track phase, so one bump
   covers every change to the file tonight.
4. Run `git status` and list what changed.
5. Remind the designer to commit, and propose a commit message.
6. Name this week's twin in the chat, from Track phase, so it is there
   before anyone leaves.

A session that ends without step 1 loses its memory. That is the failure
this whole repo exists to prevent.
