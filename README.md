# Build Your AI Design Workflow — Starter Repo

The take-home companion for the **Build Your AI Design Workflow** mentoring track
(Product Makers Romania, Product Mentoring Program — Edition 10, autumn 2026).

This is not a tutorial repo. It is a small, working project wired the way a real
AI-assisted design project should be wired: it has **memory**, **skills**,
**guardrails**, and a **design system the AI can use without inventing things**.
You clone it in Session 1, work in it every session, and keep it forever —
then transplant the pattern into your own projects.

## What's inside

| Piece | File(s) | What it teaches |
|---|---|---|
| Project memory | `CLAUDE.md` | What the AI should never forget: decisions, rules, state |
| Skills | `.claude/skills/` | Encoding your standards so they load when relevant |
| Guardrail | `.claude/settings.json` + `hooks/scan-hardcoded.sh` | Rules that are *enforced*, not just written down |
| Design system | `product/design-system/` | Three token layers an AI can safely build with |
| Practice product | `product/` | **Brewlog** — a small coffee-tasting journal to build on |
| Exercises | `exercises/` | One ticket per session, written with real acceptance criteria |

## Quickstart

```bash
git clone https://github.com/mihaipet/ai-design-workflow.git
cd ai-design-workflow
./install.sh
```

The installer checks your setup and tells you exactly what (if anything) is
missing. Then:

1. Open the folder in VS Code (or your editor) and start **Claude Code**.
2. Say: *"Read CLAUDE.md, then give me the state of the project in three sentences."*
3. Open `product/index.html` in your browser — this is Brewlog, your practice product.
4. Start `exercises/BRW-101-first-task.md`.

No Claude Code yet? See `docs/no-code-onramp.md` — you can run the first two
sessions from a claude.ai Project and install later.

## How the exercises work

Each exercise is written as a **ticket** — story, acceptance criteria,
constraints — because that's the skill being taught: work spec-first, and let
the acceptance criteria (not your memory) define "done."

| Ticket | Session | Theme |
|---|---|---|
| `BRW-101` | S1 | First task — prove your environment works |
| `BRW-102` | S2 | Teach the project a decision, then try to break it |
| `BRW-103` | S3 | Build a feature spec-first |
| `BRW-104` | S4 | Critique the output against the rubric |
| `BRW-105` | S5 | Demo day |

## The one rule that is enforced

**No hardcoded style values.** Every color, spacing, radius, shadow, and
font value in `product/` must flow through `var(--token-name)`. A hook scans
every file the AI writes and pushes violations back to it automatically.
Read `hooks/scan-hardcoded.sh` — it's ~40 lines, and it's the difference
between a guideline and a guardrail.

## Using this beyond the program

Everything here is a pattern, not a framework. To adapt it to your own
project: copy `CLAUDE.md` and rewrite every section truthfully, copy
`.claude/` and edit the skills to match *your* design system and standards,
and keep the hook. If you'd like help adapting the workflow to your team,
open an issue or reach out — that conversation is exactly what this repo
exists to start.

## License

MIT — see `LICENSE`. Built by [Mihai Petică](https://mihaipetica.com) for the
Product Makers community.
