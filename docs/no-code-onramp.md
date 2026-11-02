# The no-code on-ramp

No coding agent installed yet? You can run Sessions 1 and 2 from a
[claude.ai](https://claude.ai) Project or a ChatGPT Project, and install
later. You'll miss the hook and the live preview, but memory, recorded
decisions and skills work the same. From Session 3 the install is required.

## Get the files (2 minutes)

1. Open the repo on GitHub:
   [github.com/mihaipet/ai-design-workflow](https://github.com/mihaipet/ai-design-workflow).
2. Click the green **Code** button, then **Download ZIP**.
3. Unzip it anywhere. The skills sit in a folder called `.claude`, which
   macOS hides because its name starts with a dot: in Finder, press
   Cmd + Shift + . (full stop) to show it.

## Setup (5 minutes)

1. On claude.ai or ChatGPT, create a **Project** called "Brewlog".
2. Add these files to the project's knowledge:
   - `AGENTS.md`
   - `memory/MEMORY.md` and `memory/_continuity.md`
   - six skills from `.claude/skills/`: `design-system`,
     `session-protocol`, `session-2`, `new-ticket`, `vault-load` and
     `vault-save`. Each
     one is a file called `SKILL.md`, so rename it to its folder name when
     you upload it: `.claude/skills/design-system/SKILL.md` becomes
     `design-system.md`.
   - from `product/`: `index.html`, `app.js`, `app.css`, and from
     `product/design-system/`: `tokens.css`, `component-tokens.css` and
     `components.css`.

   The other files in `memory/` go in only when an exercise needs them. If
   the upload refuses a file type, add `.txt` to the name (`app.css.txt`).
3. Set the project's instructions to: *"Follow AGENTS.md as project memory
   and the session protocol for every conversation. The design-system skill
   defines the only components that exist. Skip any step that needs a
   terminal, such as git status, and say that you skipped it."*

## Running an exercise

Paste the exercise file into a new conversation and open with the kick-off
line, exactly as the protocol says. For UI work, ask for the changed files
in full. Copy them over the same files in your unzipped folder, open
`product/index.html` in your browser to see the result, and upload the new
versions to the project so the next conversation works from them. You can
also ask for a preview as an artifact (Claude) or a canvas (ChatGPT). It is
clumsier than a coding agent, but every concept transfers.

In BRW-102 you teach the project a decision and then check it in a fresh
conversation. A fresh conversation reads the project's files, not the
earlier chat, so re-upload AGENTS.md and `memory/_continuity.md` before
the fresh conversation in BRW-102 (the continuity file is what tells
`session-2` to pick up at part 2).

## What you can't practise here

- The **hook**: nothing enforces the no-hardcoding rule, so you are the
  hook. Before you accept output, look through the CSS and HTML for hex
  colours (`#3B3FBF`), `px`, `rgb(` and `hsl(` values. Only `tokens.css`
  may hold them, plus the condition of an `@media` line.
- **Session close** can't run `git status`. At the end of each session, ask
  for the memory files the close changed (`AGENTS.md`, `memory/_continuity.md`
  and any other) in full, save them in your folder, and replace them in the
  project's knowledge.

## Before Session 3

Install a coding agent before Session 3: [docs/tools.md](tools.md) has the
steps. Then clone the repo and copy the files you changed here
(`AGENTS.md`, the `memory/` files and any `product/` files) over the cloned
ones, so the project remembers what you did. If the
installer gives you trouble, ask in the track's WhatsApp group (for mentees
of the track; the link is in the pre-work email).
