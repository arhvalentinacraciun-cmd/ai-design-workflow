---
name: session-protocol
description: Use at the start and end of every working session in this repo. Defines how a session opens, what counts as done, and what must happen before the session closes.
---
<!-- Copy of .claude/skills/session-protocol/SKILL.md, made by hooks/sync-skills.py. Edit that file, then run: python3 hooks/sync-skills.py. On Codex a skill written /name below is typed $name. sync:4bdaccde6945 -->

# Session Protocol

## Open

1. Run `/vault-load`: it reads `AGENTS.md` completely, then
   `memory/MEMORY.md` and `memory/_continuity.md`. In Session 1 the
   designer does this by hand ("Read AGENTS.md, then give me the state of
   the project in three sentences"); `AGENTS.md` points at the two memory
   files, so read them too.
2. Run `git status` and note uncommitted work.
3. Summarise the project state in three sentences.
4. Read the Track phase section of `AGENTS.md` and add one line: which
   session is done, which is next, and what this week's twin is. If the
   designer is here for the twin, offer to start it.
5. Wait for the kick-off line: *"Today we're doing [ticket]. The goal is
   [goal]."* Do not start building without a ticket in play. The twin
   counts as a ticket.

## During

- The active ticket's **acceptance criteria are the definition of done** —
  not the vibe of the conversation.
- Work outside the ticket's scope: flag it, offer to note it as a future
  ticket under Open questions in `memory/_continuity.md`, and stay on
  scope.
- A request that contradicts a recorded Design Decision: stop and say
  *"This conflicts with the decision from [date] — [decision]. Revisit the
  decision, or proceed anyway?"* Never silently comply.

## Close — triggered by the phrase "Session done."

1. Run `/vault-save`: new decisions (with date and rationale) and Current
   State into `AGENTS.md`; facts a later session needs into the matching
   file in `memory/`; the ticket's outcome into `memory/exercise-notes.md`;
   then `memory/_continuity.md` rewritten with open questions, work in
   flight and how to resume.
2. Update Track phase: ask how this week's twin is going and write the
   answer in one line under Twin progress. If tonight's ticket was BRW-101
   and Next still says Session 1, Session 1 is done: move it to Done, set
   Next to Session 2 (12 Nov), and set the twin to *"the BRW-101 stretch,
   or one small task of your own in the repo"*. Sessions 2 to 4 have
   skills that do this step for them.
3. Run `git status` and list what changed.
4. Remind the designer to commit, and propose a commit message.

A session that ends without step 1 loses its memory. That is the failure
this whole repo exists to prevent. `/vault-save` can also be typed
mid-session as a checkpoint; the close still runs it again.
