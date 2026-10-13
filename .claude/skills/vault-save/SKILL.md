---
name: vault-save
description: Writes what this session decided and learned into the project's memory, then overwrites memory/_continuity.md with where the work is. Run by the session protocol's close on "Session done."; the designer can also type /vault-save mid-session to checkpoint.
---

# Vault save

A session that ends without writing its memory is a session the project
forgets. This skill is the writer. It is selective: it routes the few
things that are durable to the right file and leaves everything else to
git and the chat log.

## 1. Sweep the session

Go through what happened and sort each item:

| What | Where it goes |
|---|---|
| A decision made (with its reason) | `CLAUDE.md` → Design Decisions, dated today, with a one-line **Why**. Decisions are always-read, so they never go in `memory/` |
| What works now that did not before | `CLAUDE.md` → Current State, one line, dated |
| A fact about the project a later session will need (how something is built, why a value is what it is, what was tried and dropped) | The matching on-demand file in `memory/`. No match? Propose a new file: name and one-line description, wait for a yes, then create it and add its line to `memory/MEMORY.md` |
| What happened in the ticket in play | `memory/exercise-notes.md`, under that ticket: what was built, the moment the system pushed back, what you would do differently |
| A question nobody answered | `memory/_continuity.md` → Open questions |

Do **not** save: code and file contents (git has them), the conversation
itself, anything that mattered only today.

## 2. Overwrite `memory/_continuity.md`

Replace the whole file, every time, in this shape:

```
---
name: _continuity
updated: <today, YYYY-MM-DD>
---
# Where the work is
<one or two paragraphs: the state of the work, in plain words>

# Open questions
- [ ] <each one as a checkbox>

# In flight
<uncommitted or half-done work, or "Nothing">

# How to resume
<numbered: what to read first, the immediate next step, any gotcha>
```

Continuity is overwritten, never appended. Its history is in git.

## 3. Report

List every file you changed and, for each, what went in. If you created a
file, say so. If a decision was recorded, quote it. Then hand back to the
session protocol for Track phase and the commit.

## Rules

- **Propose before creating.** A new memory file is a new place a future
  session has to know about. Name it, describe it in one line, wait.
- **Never rewrite a recorded decision.** A change of mind is a dated
  revision under the original, with its reason.
- **One fact per file.** If a file starts covering two topics, split it
  and fix the index.
- **Keep the always-read tier short.** If `CLAUDE.md` grows a section that
  is only sometimes needed, propose moving it to `memory/`.
- **Say what you did not save**, in one line, if something was borderline.
  The designer decides.
