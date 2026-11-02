# Build Your AI Design Workflow — Starter Repo

The take-home companion for the **Build Your AI Design Workflow** mentoring track
(Product Makers Romania, Product Mentoring Program — Edition 10, autumn 2026).

This is not a tutorial repo. It is a small, working project wired the way a real
AI-assisted design project should be wired: it has **memory**, **skills**,
**guardrails**, and a **design system the AI can use without inventing things**.
You clone it before Session 1, work in it every session, and keep it forever —
then transplant the pattern into your own projects.

It runs on Claude Code, Codex and Antigravity CLI. Grok Build and Gemini CLI
are wired from the documentation, untested. One memory file, one guardrail, one adapter per tool.

**Who it's for:** designers and product people who already use AI and want it to remember decisions, follow rules and build on a design system. No coding background needed. **Start:** [Quickstart](#quickstart). **Licence:** MIT, free to copy and adapt.

## What's inside

| Piece | File(s) | What it teaches |
|---|---|---|
| Project memory | `AGENTS.md` + `memory/` | What the AI should never forget. Decisions and rules always load (`AGENTS.md`); facts load on demand (`memory/`); `/vault-load` and `/vault-save` read and write it at every open and close. `CLAUDE.md` is three lines that import it for Claude Code |
| Skills | `.claude/skills/`, copied to `.agents/skills/` by `hooks/sync-skills.py` | Encoding your standards so they load when relevant; `/session-2…4` open each session, `/new-ticket` writes one, `/critique` judges the result. Edit them in `.claude/skills/`. Codex and Antigravity read the copy: type `$session-2` on Codex, `/session-2` on Antigravity |
| Guardrail | `hooks/scan-hardcoded.py`, registered in `.claude/settings.json`, `.codex/hooks.json`, `.agents/hooks.json` | Rules that are *enforced*, not just written down |
| Design system | `product/design-system/` | Three token layers an AI can safely build with; `stories/` hold the spec for a component before it exists; `viewer/` renders every component with its live tokens |
| Practice product | `product/` | **Brewlog** — a small coffee-tasting journal to build on |
| Exercises | `exercises/` | One ticket per session plus a demo brief, written with real acceptance criteria |

## Quickstart

```bash
git clone https://github.com/mihaipet/ai-design-workflow.git
cd ai-design-workflow
./install.sh
```

On Windows, run these lines in Git Bash (it comes with [Git for Windows](https://git-scm.com/download/win)) or in WSL: `install.sh` is a bash script.

The installer checks your setup, finds which coding agent you have, and
prints that agent's start command and its one-time trust step. Then:

1. Open the folder in VS Code (or your editor) and start your coding agent
   in it: `claude`, `codex`, `agy` or `grok`.
2. Say: *"Read AGENTS.md, then give me the state of the project in three sentences."*
3. Open `product/index.html` in your browser — this is Brewlog, your practice product.
   Next to it, `product/design-system/viewer/index.html` is the design system:
   every component, its tokens and the rules, rendered from the same files.
4. Start `exercises/BRW-101-first-task.md`.

Which agent, what it costs, and what differs per tool: `docs/tools.md`. The
track is driven on Claude Code and every exercise is built there first.

New to how AI works underneath? Read `docs/how-this-works.md` first: ten
minutes, four pictures, a glossary of the words the sessions use.

No agent installed yet? See `docs/no-code-onramp.md` — you can run the first
two sessions from a claude.ai or ChatGPT Project and install later.

## How the exercises work

Each exercise is written as a **ticket** — story, acceptance criteria,
constraints — because that's the skill being taught: work spec-first, and let
the acceptance criteria (not your memory) define "done."

| Ticket | Session | Theme |
|---|---|---|
| `BRW-101` | S1 | First task — prove your environment works |
| `BRW-102` | S2 | Teach the project a decision, then try to break it |
| `BRW-103` | S3 | Build a feature spec-first |
| `BRW-104` | At home, after S3 | Critique the output against the rubric; discussed in S4 |
| `BRW-105` | S4 | Demo day, the second half of the last session |

## The one rule that is enforced

**No hardcoded style values.** Every color, spacing, radius, shadow, and
font value in `product/` must come from `var(--token-name)`. A hook scans
every file the AI writes and pushes violations back to it automatically, on
every agent the repo supports. Read `hooks/scan-hardcoded.py` — one scanner
and one short adapter per agent, and it's the difference between a
guideline and a guardrail.

## Using this beyond the program

Everything here is a pattern, not a framework. To adapt it to your own
project: copy `AGENTS.md` (and the three-line `CLAUDE.md`) and rewrite every
section truthfully, copy `memory/` and empty its files (keep the shape), copy
`.claude/` and edit the skills to match *your* design system and standards
(on Codex or Antigravity, copy `hooks/sync-skills.py` too and run it),
and keep the hook with its config for your agent. If you'd like help
adapting the workflow to your team, open an issue or reach out — that
conversation is exactly what this repo exists to start.

## License

MIT — see `LICENSE`. Built by [Mihai Petică](https://mihaipetica.com) for the
Product Makers community.
