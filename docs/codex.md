# Using this repo with Codex, Cursor or Copilot

The track is driven on Claude Code, and every exercise is tested there.
If you use another agent, the method transfers and most of the files do
too. What does not transfer is wired for Claude Code and would need a
small port, described at the end. Nothing here is tested on the other
tools; treat it as a map, not a guarantee.

## What works as-is

| Piece | File | On another tool |
|---|---|---|
| Project memory | `CLAUDE.md` | `AGENTS.md` at the root points at it. Codex, Cursor and Copilot all read `AGENTS.md`. |
| Exercises | `exercises/` | Tool-neutral. The kick-off line and "Session done." work anywhere the memory file is read. |
| Design system | `product/design-system/` | Plain CSS and HTML; the viewer opens in any browser. |
| Brewlog | `product/` | Same. |
| No-code on-ramp | `docs/no-code-onramp.md` | Written for a claude.ai Project; the same approach works in a ChatGPT Project. |

## What is wired for Claude Code

| Piece | File | Why it is tool-specific |
|---|---|---|
| The guardrail | `.claude/settings.json` registers `hooks/scan-hardcoded.sh` to run after every Write or Edit | The script reads Claude Code's hook payload and prints violations as plain text, which Claude Code feeds back into the session. Other tools have hooks with a different payload and a different output shape. |
| The skills | `.claude/skills/*/SKILL.md`, typed as `/critique`, `/new-ticket`, `/session-2`… | The `SKILL.md` format is shared, but the folder and the way you invoke a skill differ per tool. |
| The installer | `install.sh` | Checks for Claude Code and installs nothing for other tools. |

Without the hook, the no-hardcoding rule in `CLAUDE.md` is still read and
usually followed, but nothing catches the literal value when it slips
through. That catch is the point of Session 1, so on another tool you
will have to play the hook yourself: search `product/` for `#`, `px` and
`rgb(` after every change.

## The map, per tool

Checked against the tools' documentation in October 2026; versions move
fast, so confirm in your install.

**Codex**
- Memory: reads `AGENTS.md`.
- Hooks: `hooks.json` next to your config, events `PreToolUse` and
  `PostToolUse`; file edits are the `apply_patch` tool. Hooks must be
  enabled in config and each hook trusted once via `/hooks` before it
  runs. A `PostToolUse` hook returns JSON, with the text for the model
  under `hookSpecificOutput.additionalContext`; plain text is ignored.
  One field report says the model sometimes ignores injected notices, so
  verify the guardrail moment before relying on it.
- Skills: same `SKILL.md` format. Invoke with `$skill-name` or the
  `/skills` menu; there is no `/skill-name`. Run `/skills` to see which
  folder your version scans. Codex may also pick a skill on its own when
  the task matches its description; the session skills say "only runs
  when typed", so turn implicit invocation off if you port them.

**Cursor**
- Memory: reads `AGENTS.md`.
- Hooks: `hooks.json`, event `afterFileEdit`; JSON in on stdin, JSON out.
- Skills: check Cursor's docs for the skills folder in your version.

**Copilot**
- Memory: reads `AGENTS.md`.
- Hooks: `.github/hooks/*.json`, event `postToolUse`; a "VS Code
  compatible" input mode maps tool names to `Edit` and `Write`.
- Skills: check Copilot's docs for the skills folder in your version.

## Porting the guardrail: a good first project after the track

The script is forty lines. The port is:

1. A hook config for your tool that runs `hooks/scan-hardcoded.sh` after
   every file edit.
2. A second branch in the script that reads your tool's payload. Claude
   Code sends the edited file's path; Codex sends the patch, so the script
   has to pull the file paths out of it.
3. Output in your tool's shape, so the violations reach the model and not
   only your terminal.
4. The test: ask for a button with `color: #333` in a new CSS file and
   watch the violation come back into the session.

Do it in a fresh session, with "Today we're doing the hook port" as the
kick-off line, and record the decision in `CLAUDE.md` when it works. If
you get it running, open a pull request; a verified port for a second tool
is the most useful contribution this repo can receive.
