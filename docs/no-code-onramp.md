# The no-code on-ramp

No coding agent installed yet? You can run Sessions 1–2 from
a [claude.ai](https://claude.ai) Project or a ChatGPT Project, and install later. You'll miss the hook and
the live preview, but the core skills — memory, decisions, spec-first —
work the same.

## Setup (5 minutes)

1. On claude.ai or ChatGPT, create a **Project** called "Brewlog".
2. Add to the project's knowledge: `AGENTS.md`, `memory/MEMORY.md` and
   `memory/_continuity.md`, three of the skills,
   `.claude/skills/design-system/SKILL.md`, `session-protocol/SKILL.md` and
   `critique/SKILL.md` (all three are called SKILL.md, so rename each to its
   folder name when you upload it), and
   `product/design-system/component-tokens.css`. The other files in
   `memory/` go in only when an exercise needs them.
3. Set the project's instructions to: *"Follow AGENTS.md as project memory
   and the session protocol for every conversation. The design-system skill
   defines the only components that exist."*

## Running an exercise

Paste the exercise file into a new conversation and open with the kick-off
line, exactly as the protocol says. For UI work, ask for the changed files
in full and paste them into the repo by hand (or view the result as an
artifact) — clumsier than a coding agent, but every concept transfers.

## What you can't practice here

- The **hook**: nothing enforces the no-hardcoding rule — you are the hook.
  Scan for `#hex` and `px` yourself before accepting output.
- **Session close** can't run `git status` — update `AGENTS.md` in the
  project knowledge manually after each session.

Install a coding agent (see docs/tools.md) before Session 3 if you can —
BRW-103 onward is much better with the real loop. Ask in the track's WhatsApp group (the link is in
the pre-work email) if the installer gives you trouble; that's what it's for.
