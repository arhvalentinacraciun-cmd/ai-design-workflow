# AGENTS.md

This file exists for tools that read `AGENTS.md` (Codex, Cursor, Copilot).
The project memory is **`CLAUDE.md`** plus the **`memory/`** folder: read
`CLAUDE.md` completely before doing anything, then `memory/MEMORY.md` and
`memory/_continuity.md`, and treat everything in them as if it were
written here. The other files in `memory/` are read when their line in
`memory/MEMORY.md` matches the task.

Two things in this repo are wired for Claude Code only: the guardrail hook
in `.claude/settings.json` and the skills in `.claude/skills/`. They are
not configured for your tool yet, so the rules in `CLAUDE.md` are asked
of you, not enforced on you. `docs/codex.md` maps each piece to its
equivalent and describes the port.
