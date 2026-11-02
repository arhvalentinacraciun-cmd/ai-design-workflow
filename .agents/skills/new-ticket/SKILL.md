---
name: new-ticket
description: Turns one sentence into a ticket an agent can build from, in the same shape as the BRW exercises. Use when the designer types /new-ticket followed by an idea, or asks for a ticket from a sentence. Writes the ticket; never implements it.
---
<!-- Copy of .claude/skills/new-ticket/SKILL.md, made by hooks/sync-skills.py. Edit that file, then run: python3 hooks/sync-skills.py. On Codex a skill written /name below is typed $name. sync:85e97df0f089 -->

# New ticket

One sentence in, a ticket out. The ticket is the handoff: a developer or
an agent should be able to build from it without this conversation.

This skill is rebuilt live in Session 2 on the mentor's screen, as the
worked example of "a process you repeat becomes a skill". This file is
the answer key. A version you write yourself can differ from it, and
that is fine.

## Input

`/new-ticket <one sentence>`. Examples:

- `/new-ticket let people sort entries by rating`
- `/new-ticket the empty state should suggest a first coffee to log`

No sentence given? Ask for one. Do not guess a feature.

## Output

A file at `exercises/BRW-2NN-<slug>.md`, where NN is the next free number
from 01 (`BRW-201`, `BRW-202`, ...). The 100s are the track's own tickets;
the 200s are the designer's. Then show the file in full and end with the
kick-off line ready to paste:

*"Today we're doing BRW-2NN. The goal is [the story's goal]."*

## Shape

Use the shape below:

```
# BRW-2NN · <Title in five words or fewer>

| | |
|---|---|
| **Type** | Feature / Feature (small) / Workflow practice / Review practice |
| **Owner** | the designer, <today's date> |
| **Goal** | One line: what is true when this is done |

## Story

As a <who>, I want <what> so I can <why>.

## Acceptance criteria

- [ ] three to six lines, one check each, each checkable by hand in the browser
- [ ] the last one is always: No literal style values; inventory components only.

## Constraints

- What it must not touch, and what it must not invent.

## Open question

The one decision the sentence did not make. Name it; do not answer it.
The spec step answers it, before any code.

## Stretch (optional)

Same theme, harder cut. One or two lines.
```

## Rules

- **Draft first, ask at most one question.** A thin sentence still gets a
  full draft; the gaps become the open question.
- **The story has a who and a why.** If the sentence has neither, write
  the most likely ones and mark them *(assumed)* so the designer can fix
  them.
- **Acceptance criteria are checks, not wishes.** "Looks good" is not a
  criterion; "the count reads '2 of 5 brews'" is.
- **Always one open question.** Every ticket has a decision nobody made.
  Finding it is the skill. If you truly cannot find one, say so, and say
  why the ticket is unusually complete.
- **Scope honesty.** The ticket covers the sentence, nothing more. Ideas
  beyond it go in one line under Stretch, or nowhere.
- **Never implement.** This skill ends when the file exists. Building
  starts with the kick-off line, in a session, under the session protocol.
