# Which coding agent

The repo runs on any of four terminal agents. The track is driven on Claude
Code, and every exercise is tested there first; on the other three the
memory file and the guardrail are wired and were tested once each. If
something behaves differently on your tool, bring it to the track channel:
it is session material.

| | Claude Code | Codex | Antigravity CLI | Grok Build |
|---|---|---|---|---|
| Made by | Anthropic | OpenAI | Google | xAI |
| Account | Claude Pro or above | ChatGPT (Free included) | Google account (free) | X Plus or above, or an API key |
| Install | `npm install -g @anthropic-ai/claude-code` (needs Node.js) | `npm install -g @openai/codex` | `curl -fsSL https://antigravity.google/cli/install.sh \| bash` | `curl -fsSL https://x.ai/cli/install.sh \| bash` |
| Start in the repo | `claude` | `codex` | `agy` | `grok` |
| Windows | native | native | native | native |
| Reads the memory file | `CLAUDE.md`, which imports `AGENTS.md` | `AGENTS.md` | `AGENTS.md` | `AGENTS.md` and `CLAUDE.md` |
| Guardrail config | `.claude/settings.json` | `.codex/hooks.json` | `.agents/hooks.json` | reads `.claude/settings.json` |
| One-time trust step | accept the folder dialog | trust the folder, then `/hooks` to trust the guardrail | accept the folder dialog | `/hooks-trust` |
| Skills | `.claude/skills/`, typed `/name` | ported before Session 2 | ported before Session 2 | ported before Session 2 |

"Gemini" the app is not a coding agent. Google's terminal agent for personal
accounts is Antigravity CLI; the older Gemini CLI now needs a paid Code
Assist licence, but the repo carries its config too (`.gemini/settings.json`).

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
| Gemini CLI | `AfterTool` on `write_file\|replace` | the file path | same |
| Codex | `PostToolUse` on `Edit\|Write` | the patch text; the script pulls the file paths out of it | same |
| Grok Build | through the Claude Code config | the file path, camelCase fields | same; documented loosely, verified on a real install |
| Antigravity | `PreToolUse` on the three write tools | the proposed content, before it is written | the hook answers `deny` with the reason; the write never happens |

The test, on any tool: ask for a button with `color: #333` in a new CSS
file under `product/` and watch the violation come back into the session.

## Skills, until Session 2

The skills live in `.claude/skills/` and are typed as `/vault-load`,
`/session-2` and so on in Claude Code. Codex and Antigravity scan
`.agents/skills/` instead, Codex invokes with `$name`; that port lands
before Session 2, where skills are taught. Until then, on another tool,
open and close the session by hand: read `AGENTS.md`, `memory/MEMORY.md`
and `memory/_continuity.md` at open; at close write the session's
decisions into `AGENTS.md` and rewrite `memory/_continuity.md`.

## Cursor, Copilot, opencode

All three read `AGENTS.md`, so the memory works. Hooks and skills are not
configured for them; `hooks/scan-hardcoded.py` is the place to add an
adapter, and a verified port is the most useful pull request this repo can
receive.

Checked against the tools' documentation on 1 November 2026; versions move
fast, so confirm in your install.
