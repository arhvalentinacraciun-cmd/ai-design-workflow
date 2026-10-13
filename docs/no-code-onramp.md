# The no-code on-ramp

No Claude Code installed yet? You can run Sessions 1–2 from
[claude.ai](https://claude.ai) and install later. You'll miss the hook and
the live preview, but the core skills — memory, decisions, spec-first —
work the same.

## Setup (5 minutes)

1. On claude.ai, create a **Project** called "Brewlog".
2. Add to the project's knowledge: `CLAUDE.md`, `memory/MEMORY.md` and
   `memory/_continuity.md`, the three files from `.claude/skills/`
   (design-system, session-protocol, critique), and
   `product/design-system/component-tokens.css`. The other files in
   `memory/` go in only when an exercise needs them.
3. Set the project's instructions to: *"Follow CLAUDE.md as project memory
   and the session protocol for every conversation. The design-system skill
   defines the only components that exist."*

## Running an exercise

Paste the exercise file into a new conversation and open with the kick-off
line, exactly as the protocol says. For UI work, ask for the changed files
in full and paste them into the repo by hand (or view the result as an
artifact) — clumsier than Claude Code, but every concept transfers.

## What you can't practice here

- The **hook**: nothing enforces the no-hardcoding rule — you are the hook.
  Scan for `#hex` and `px` yourself before accepting output.
- **Session close** can't run `git status` — update `CLAUDE.md` in the
  project knowledge manually after each session.

Install Claude Code before Session 3 if you can — BRW-103 onward is much
better with the real loop. Ask in the track channel if the installer gives
you trouble; that's what it's for.
