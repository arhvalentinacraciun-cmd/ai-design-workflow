---
name: vault-load
description: Rebuilds the project's working memory at session open. Reads AGENTS.md, memory/MEMORY.md and memory/_continuity.md, then only the on-demand memory files that match a topic the designer gives. Run by the session protocol's open; the designer can also type /vault-load <topic> to pull one topic into the session.
---
<!-- Copy of .claude/skills/vault-load/SKILL.md, made by hooks/sync-skills.py. Edit that file, then run: python3 hooks/sync-skills.py. On Codex a skill written /name below is typed $name. sync:e80bf8da91c9 -->

# Vault load

Memory in this repo has two tiers, and this skill is the reader for both.

- **Always read:** `AGENTS.md`, `memory/MEMORY.md`, `memory/_continuity.md`.
  Short on purpose. This is what the agent knows before the designer says
  a word.
- **On demand:** every other file in `memory/`. Read one when its index
  line matches the work, or when the designer names a topic. Never read
  them all; the split exists so the always-read tier stays short and the
  context window stays free for the actual work.

## Steps

1. Read `AGENTS.md` completely. Decisions, rules, the session protocol,
   Track phase and Current State live there.
2. Read `memory/MEMORY.md`. It lists every on-demand file with one line
   each; that line is how you decide whether a file matters today.
3. Read `memory/_continuity.md` in full. Where the work is, open questions,
   anything in flight, how to resume.
4. **If a topic was given** (`/vault-load tokens`, `/vault-load the form`):
   search `memory/` for it, in file names, descriptions and bodies, and
   read every match in full. **If no topic was given:** read nothing else.
5. Run `git status` and note uncommitted work.

## Report

Then brief, do not dump:

- The project state in three sentences.
- Where in the track this session is and what this week's twin is, from
  Track phase in `AGENTS.md`.
- Open questions and anything in flight, from `_continuity.md`.
- Which on-demand files exist and were **not** read, in one line, so the
  designer can ask for one.
- If a topic was given: what the matching files said, briefly.

Then wait for the kick-off line. Do not start building.

## Rules

- Never summarise a file you did not read. If a memory file is missing or
  empty, say so; do not invent its content.
- Reading an on-demand file mid-session is normal: before changing
  something a memory file covers, read it first. Say that you did.
- The hand-run version of this skill is the Session 1 ritual: "Read
  AGENTS.md, then give me the state of the project in three sentences."
  `AGENTS.md` points at the two always-read memory files, so the hand-run
  version reaches them too. This skill is that ritual written down.
