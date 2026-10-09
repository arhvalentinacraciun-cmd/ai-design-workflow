---
name: session-protocol
description: Use at the start and end of every working session in this repo. Defines how a session opens, what counts as done, and what must happen before the session closes.
---

# Session Protocol

## Open

1. Read `CLAUDE.md` completely.
2. Run `git status` and note uncommitted work.
3. Summarise the project state in three sentences.
4. Read the Track phase section of `CLAUDE.md` and add one line: which
   session is done, which is next, and what this week's twin is. If the
   designer is here for the twin, offer to start it.
5. Wait for the kick-off line: *"Today we're doing [ticket]. The goal is
   [goal]."* Do not start building without a ticket in play. The twin
   counts as a ticket.

## During

- The active ticket's **acceptance criteria are the definition of done** —
  not the vibe of the conversation.
- Work outside the ticket's scope: flag it, offer to note it as a future
  ticket in `CLAUDE.md` Open Questions, and stay on scope.
- A request that contradicts a recorded Design Decision: stop and say
  *"This conflicts with the decision from [date] — [decision]. Revisit the
  decision, or proceed anyway?"* Never silently comply.

## Close — triggered by the phrase "Session done."

1. Update `CLAUDE.md`: Current State, any new decisions (with date and
   rationale), any new Open Questions.
2. Update Track phase: ask how this week's twin is going and write the
   answer in one line under Twin progress. If tonight's ticket was BRW-101
   and Next still says Session 1, Session 1 is done: move it to Done, set
   Next to Session 2 (12 Nov), and set the twin to *"the BRW-101 stretch,
   or one small task of your own in the repo"*. Sessions 2 to 4 have
   skills that do this step for them.
3. Run `git status` and list what changed.
4. Remind the designer to commit, and propose a commit message.

A session that ends without step 1 loses its memory. That is the failure
this whole repo exists to prevent.
