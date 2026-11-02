# Which coding agent

The repo runs on four terminal agents. The track is driven on Claude Code,
and every exercise is built there first. Codex and Antigravity CLI were
tested live on 1 November 2026: the memory file loads, the guardrail
reports the violation back to the agent, and `/session-2` runs from the
skills copy on both. Grok Build is wired from the documentation, untested.
If something behaves differently on your tool, bring it to the track's
WhatsApp group (the link is in the pre-work email) or open a GitHub issue:
it is session material.

| | Claude Code | Codex | Antigravity CLI | Grok Build |
|---|---|---|---|---|
| Made by | Anthropic | OpenAI | Google | xAI |
| Account | Claude Pro or above | ChatGPT (Free included) | Google account (free) | X Plus or above, or an API key |
| Install | `npm install -g @anthropic-ai/claude-code` (needs Node.js) | `npm install -g @openai/codex` | `curl -fsSL https://antigravity.google/cli/install.sh \| bash` | `curl -fsSL https://x.ai/cli/install.sh \| bash` |
| Start in the repo | `claude` | `codex` | `agy` | `grok` |
| Windows | native; run `install.sh` in Git Bash or WSL | native | native | native |
| Reads the memory file | `CLAUDE.md`, which imports `AGENTS.md` | `AGENTS.md` | `AGENTS.md` | `AGENTS.md` and `CLAUDE.md` |
| Guardrail config | `.claude/settings.json` | `.codex/hooks.json` | `.agents/hooks.json` | reads `.claude/settings.json` |
| One-time trust step | accept the folder dialog | trust the folder; at first start a "Hooks need review" dialog lists the guardrail, choose "Trust all and continue" (later: `/hooks`) | accept the folder dialog | `/hooks-trust` |
| Skills | `.claude/skills/` (the source), typed `/name` | `.agents/skills/` (a copy), typed `$name` or picked from `/skills` | `.agents/skills/` (a copy), typed `/name` | reads `.claude/skills/`, typed `/name`; untested |

"Gemini" the app is not a coding agent. Google's terminal agent for personal
accounts is Antigravity CLI; the older Gemini CLI now needs a paid Code
Assist licence, but the repo carries its config too (`.gemini/settings.json`,
wired from the documentation, untested). Its documentation says it also
reads skills from `.agents/skills/`; untested too.

## One memory file for every tool

`AGENTS.md` is the project memory. Codex, Antigravity and Grok Build read a
file of that name; Claude Code reads `CLAUDE.md`, which here is three lines
that import `AGENTS.md`. Write decisions in `AGENTS.md` only.

## One guardrail, one adapter per tool

`hooks/scan-hardcoded.sh` is the entry point every config above runs after
(or, on Antigravity, before) a file edit. It hands the tool's payload to
`hooks/scan-hardcoded.py`, which holds the scanner and reads each tool's
shape:

| Tool | Event | What the payload carries | How the violation reaches the agent |
|---|---|---|---|
| Claude Code | `PostToolUse` on `Write\|Edit` | the file path | exit code 2, message on stderr |
| Gemini CLI | `AfterTool` on `write_file\|replace` | the file path | same, on paper: wired from the documentation, untested |
| Codex | `PostToolUse` on `Edit\|Write` | the patch text; the script pulls the file paths out of it | same; the file is written first, the violation comes back as the tool result (tested 1 Nov 2026) |
| Grok Build | through the Claude Code config | the file path, camelCase fields | same, on paper: wired from the documentation, never run. If you use Grok Build, run the test below and report what came back |
| Antigravity | `PreToolUse` on `write_file\|edit_file` (the CLI's tools) and the IDE's `write_to_file\|replace_file_content\|multi_replace_file_content` | the proposed content, before it is written (`toolCall.args`: `Path` + `Content` or `Replacement` in the CLI, `TargetFile` + `CodeContent` in the IDE) | the hook answers `deny` with the reason; the write never happens (tested 1 Nov 2026). The CLI runs the command from `.agents/`, so the config steps up one folder first |

The test, on any tool: ask for a button with `color: #333` in a new CSS
file under `product/` and watch the violation come back into the session.
The agent will usually refuse on the memory rule alone before any write;
say it is a deliberate test of the hook and that the exception is granted,
and it writes. On Codex the file lands and the hook's message replaces the
tool result; on Antigravity the write is denied and the file never exists.

## Skills: one source, one copy

The skills live in `.claude/skills/`, the source. Claude Code and Grok
Build read them there. Codex, Antigravity CLI and Gemini CLI read
`.agents/skills/` instead, which holds a copy of each skill made by
`hooks/sync-skills.py`. The Claude Code folder is the source because most
of the room runs Claude Code and every exercise already points there, so
on Claude Code nothing changes. The copy is a real file, not a link,
because Git on Windows checks links out as small text files.

| Tool | Reads | Run a skill | Status |
|---|---|---|---|
| Claude Code | `.claude/skills/` | `/session-2` | the track tool; the copy changes nothing here |
| Codex | `.agents/skills/` | `$session-2`, or `/skills` to pick from a list | tested 1 Nov 2026 (Codex 0.166) |
| Antigravity CLI | `.agents/skills/` | `/session-2`; after adding a skill mid-session, `/skills reload` | tested 1 Nov 2026 (agy 1.4.12) |
| Grok Build | `.claude/skills/` | `/session-2` | from the documentation, untested |
| Gemini CLI | `.agents/skills/` | it picks the skill and asks you to allow it; `/skills list` shows them | from the documentation, untested |

Every tool also picks a skill on its own when your request matches the
skill's description. The skills' text writes other skills as `/vault-load`;
on Codex, type `$vault-load`. The test on 1 November: `$session-2` on Codex
and `/session-2` on Antigravity each loaded the copy in `.agents/skills/`,
read the three memory files, and gave BRW-102's kick-off line.

**When you add or change a skill, on any agent:** edit
`.claude/skills/<name>/SKILL.md`, then run `python3 hooks/sync-skills.py`
from the repo root to update the copy. `install.sh` runs the same script
with `--check`, which changes nothing and lists what is out of step. If
your agent wrote a new skill into `.agents/skills/`, the script moves it to
`.claude/skills/` and makes it the source. If someone edited a copy by
hand, the script leaves it alone and says how to move the change.

## Cursor, Copilot, opencode

All three read `AGENTS.md`, so the memory works. Hooks and skills are not
configured for them; `hooks/scan-hardcoded.py` is the place to add an
adapter, and a verified port is the most useful pull request this repo can
receive.

Checked against the tools' documentation on 1 November 2026; versions move
fast, so confirm in your install.
