---
name: session-2
description: The mentee types /session-2 at the start of Session 2 (Memory and skills), and again in the fresh session after the part 1 checkpoint. Opens the session, loads BRW-102 and sets tonight's hands-on agenda, so every laptop in the room starts in the same state. Only runs when typed; never invoke it on your own.
---
<!-- Copy of .claude/skills/session-2/SKILL.md, made by hooks/sync-skills.py. Edit that file, then run: python3 hooks/sync-skills.py. On Codex a skill written /name below is typed $name. sync:e87fed237444 -->

# Session 2 · Memory and skills

This file is tonight's first lesson. Last week everyone opened the session
by hand: read `AGENTS.md` and the two memory files it points at, check
git, three sentences, wait for a ticket. That is a process you repeat
every session, so it became a skill: `/vault-load` does the reading, and
typing `/session-2` runs it with tonight's ticket. Everything you repeat
often enough can be written down the same way.

## 1. Open

Run the session-protocol open, starting with `/vault-load`, which reports.

**Resumed after the checkpoint?** If `memory/_continuity.md` says
*"Session 2 part 1 done, part 2 next."*, this is the fresh session that
part 1 asks for. The twin question was answered earlier tonight, so skip
it, skip the rest of this section and section 2, and go to section 5.

Otherwise, carry on with the protocol's twin question (last week's twin
was the BRW-101 stretch). Make sure the report's line on the on-demand
files you did not read is there; tonight is the night the mentee learns
why.

If there is uncommitted work from BRW-101, say so and offer to commit it
before anything else. Last week's work should be safe before tonight's
starts.

If Track phase in `AGENTS.md` still lists Session 1 as Next, last week's
close did not record it: move Session 1 to Done and set Next to
Session 2 · Memory and skills · Thu 12 Nov 2026 now, so the file is
right before tonight's work begins.

## 2. Load the ticket

Read `exercises/BRW-102-teach-it-memory.md` in full. Tonight the skill
supplies the kick-off line so the room starts together; the rest of the
protocol is unchanged. Say:

*"Today we're doing BRW-102. The goal is to experience project memory as
a constraint the AI actually respects."*

## 3. Tonight's hands-on, in order

| Block | About | What happens |
|---|---|---|
| Show and tell (last week's twin) | 10 min | The mentor runs it: a few mentees show what they did at home. Nothing to build; wait |
| BRW-102, part 1 | 15 min | Add a decision to `AGENTS.md`, say "Checkpoint.", start a fresh session, type `/session-2` again and ask "Which decisions are recorded?" |
| BRW-102, part 2 | 10 min | In the fresh session, ask for the thing the decision forbids (numeric dates, with the suggested decision), then for star ratings as a second check. The refusal is the point |
| Build a skill together: `/new-ticket` | 20 min | The mentor rebuilds `/new-ticket` live on their own screen from a blank file, and the room suggests the steps. Then run the shipped one once, and start a skill of your own: that is this week's twin |
| Agent definitions, a demo | 7 min | The mentor shows one on their own screen: a file that gives the loop a role, constraints and material for one job. Nothing to build; wait |

Show this table, then wait. Do not start part 1 until the mentee says so.

## 4. The checkpoint at the end of part 1

Part 1 ends with the word "Checkpoint.", not with "Session done." Run the
session-protocol checkpoint: `/vault-save` only, and the continuity it
writes says *"Session 2 part 1 done, part 2 next."* No twin, no Track
phase change, no commit reminder. Then tell the mentee: start a fresh
session and type `/session-2` (on Codex, `$session-2`). The real close
comes once, at the end of the evening.

## 5. Part 2, in the fresh session

1. Say the kick-off line again, so a ticket is in play in this session:
   *"Today we're doing BRW-102, part 2. The goal is to see the memory
   defend a decision."*
2. Part 1's check: the mentee asks *"Which decisions are recorded?"*
   List every decision in Design Decisions in `AGENTS.md`, each with its
   date. Tonight's decision should be there with today's date. If it is
   not, say so plainly and look at where it was written: a decision saved
   in a `memory/` file instead of `AGENTS.md` loads only on demand.
3. Part 2: wait for the mentee's requests. With the suggested decision
   (dates day first with the month as a word, never as numbers), the
   first is numeric dates such as 28/08; the second, as a check on an
   older decision, is star ratings in place of the dots. Each one
   contradicts a recorded decision, and the session protocol says what
   to do: name the decision and its date, ask whether to revisit it, and
   change nothing until the mentee answers. When the mentee declines, run
   `git status` so they can see nothing under `product/` changed.
4. **The skill block.** The mentor builds `/new-ticket` on their own
   screen. Do not rebuild, edit or overwrite
   `.claude/skills/new-ticket/SKILL.md` in this repo: the shipped file is
   the answer key, and the mentee's own version can differ from it. While
   the mentor builds, wait.
5. When the mentor says so, run the shipped skill once on a one-sentence
   request, so the mentee sees the shape of what it writes:
   `/new-ticket let people sort entries by rating` (on Codex,
   `$new-ticket let people sort entries by rating`). It writes a ticket
   file in `exercises/`; nothing gets built.
6. Then help the mentee start a skill of their own for a process they
   repeat. It gets its own name and its own folder,
   `.claude/skills/<their-name>/SKILL.md`, with a `name` and a
   `description` in its frontmatter. Never name it `new-ticket`. When the
   file is saved, run `python3 hooks/sync-skills.py`, so Codex,
   Antigravity and Gemini get the copy.

## 6. Close

On "Session done." run the session-protocol close, once, at the end of
the evening. Two of its steps need this skill:

- **Track phase (close step 2).** Done gains Session 2, Next becomes
  Session 3 · Design system, spec-first · Thu 19 Nov 2026, the twin is
  the text below, and Twin progress is "not started" because the twin
  changed tonight. If the mentee already started their own skill in the
  room, write *"started in Session 2: <skill name>"* instead.
- **The twin in the chat (close step 6).** Say it, so it is in the chat
  before anyone leaves:

> Keep building the skill you started tonight, for a process you repeat
> a lot. Give it its own name and folder in `.claude/skills/`, and run
> `python3 hooks/sync-skills.py` after every change. Bring it to
> Session 3 for show and tell. Optional: ask the agent to keep a roadmap
> file for your project.

Any session opened at home this week will then start from there.
