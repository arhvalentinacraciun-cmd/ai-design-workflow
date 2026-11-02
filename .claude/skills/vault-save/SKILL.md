---
name: vault-save
description: Writes what this session decided and learned into the project's memory, runs a full scan of product/ for literal style values, then overwrites memory/_continuity.md with where the work is. Run by the session protocol's close on "Session done." and by its checkpoint on "Checkpoint."; the designer can also type /vault-save mid-session to checkpoint.
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
| A decision made (with its reason) | `AGENTS.md` → Design Decisions, dated today, with a one-line **Why**. Decisions are always-read, so they never go in `memory/` |
| What works now that did not before | `AGENTS.md` → Current State, one line, dated |
| A fact about the project a later session will need (how something is built, why a value is what it is, what was tried and dropped) | The matching on-demand file in `memory/`. No match? Propose a new file: name and one-line description, wait for a yes, then create it and add its line to `memory/MEMORY.md` |
| What happened in the ticket in play | `memory/exercise-notes.md`, under that ticket: what was built, the moment the system pushed back, what you would do differently |
| A question nobody answered | `memory/_continuity.md` → Open questions |

Do **not** save: code and file contents (git has them), the conversation
itself, anything that mattered only today.

## 2. Run a full scan of `product/`

The hook checks each file as the agent writes it. A file changed another
way (a shell command, an editor, a merge) is never checked. So run a full
scan of `product/`:

```
python3 hooks/scan-hardcoded.py --all
```

Clean: say so in one line. Hits: list each one (file, line, value) in the
chat and put them under In flight in step 3. Do not fix them here unless
the designer asks; a fix is work, and work needs a ticket. If the command
fails, say what it printed and carry on with the save.

## 3. Overwrite `memory/_continuity.md`

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
<uncommitted or half-done work, scan hits, or "Nothing">

# How to resume
<numbered: what to read first, the immediate next step, any gotcha>
```

At a checkpoint, the first line under Where the work is says where the
session stopped and what is next (in Session 2: *"Session 2 part 1 done,
part 2 next."*). The close overwrites it, so the line is gone once the
session is really over.

Continuity is overwritten, never appended. Its history is in git.

## 4. Report

List every file you changed and, for each, what went in. If you created a
file, say so. If a decision was recorded, quote it. Give the scan result.
Then hand back to the session protocol for Track phase and the commit.

## The Last updated line (close only)

The **Last updated** line at the top of `AGENTS.md` goes stale unless
every close updates it: today's date, rev one higher than it was. The
session protocol does this at its close, right after Track phase, so one
bump covers every change to the file that evening. A checkpoint leaves
the line alone.

## Rules

- **Propose before creating.** A new memory file is a new place a future
  session has to know about. Name it, describe it in one line, wait.
- **Never rewrite a recorded decision.** A change of mind is a dated
  revision under the original, with its reason.
- **One fact per file.** If a file starts covering two topics, split it
  and fix the index.
- **Keep the always-read tier short.** If `AGENTS.md` grows a section that
  is only sometimes needed, propose moving it to `memory/`.
- **Say what you did not save**, in one line, if something was borderline.
  The designer decides.
