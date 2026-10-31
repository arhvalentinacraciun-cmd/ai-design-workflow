# AGENTS.md — Brewlog
**Last updated:** 2026-11-01 (rev 5)
**Maintained by:** whoever is in the session — that's the point

> Read this entire file before doing anything, then `memory/MEMORY.md` and
> `memory/_continuity.md`. This file is the always-read core of the project
> memory: every decision and every rule lives here. Where the work is, and
> the facts you only need sometimes, live in `memory/`.

<!--
  TEACHING NOTE (delete these comments when you adapt this file to your own
  project): each section below has a job. The AI reads this file at session
  start, so what's written here is what it "knows" before you say a word.
  The file is only as good as its last update — closing a session without
  updating it is how projects lose their memory.
  Why this file is called AGENTS.md: Codex, Antigravity, Grok Build, Cursor
  and Copilot all read a file of that name. Claude Code reads CLAUDE.md,
  which here is three lines that import this one. One memory, every tool.
-->

---

## Project Brief

**Brewlog** is a small coffee-tasting journal: log a brew, rate it, find it
again. One page, no backend, no build step — `product/index.html` opens
straight in a browser.

It exists to be practiced on. It is deliberately small enough to understand
in five minutes and real enough that sloppy work shows.

**Stack:** plain HTML + CSS + a little vanilla JS. The design system lives in
`product/design-system/` and is the only source of style values.

---

## Design Decisions

<!--
  TEACHING NOTE: this is the most important section in the file. Decisions
  recorded here are constraints, not suggestions. If you ask the AI to build
  something that contradicts one, it must flag the conflict and ask before
  proceeding — that behaviour is what turns a chat into a colleague.
-->

Every significant decision, with rationale. Do not re-open these unless the
designer explicitly asks.

### No-Hardcoding Rule
**Decided:** 2026-08-31 · **Status:** absolute, enforced by hook
Every spacing, colour, typography, radius, shadow, or motion value in
`product/` must use `var(--token-name)`. If no suitable token exists: stop,
say so, and propose adding one — never invent a literal value.
**Why:** one literal value is invisible to the token system and breaks
theming for that element everywhere. The hook in
`hooks/scan-hardcoded.sh` scans every write; violations come back to the
session automatically.

### Three-Layer Token Architecture
**Decided:** 2026-08-31 · **Revised:** 2026-10-03 (rule brought in line with
what `components.css` had done since day one)
Layer 1 `tokens.css` — primitives (palette, spacing, type, radius, shadow,
motion). Layer 2 `component-tokens.css` — per-component namespaces pointing
at primitives. Components take every colour and every radius from Layer 2;
the shared scales (spacing, type, line height, border width, shadow,
motion, focus ring) they may reference from Layer 1 directly. Layer 3 — a
future theme file overriding component tokens at `:root`, zero component
changes.
**Why:** isolation (a button colour can't break a badge), theme safety
where themes actually differ (colour and shape), and the AI always has a
token to reach for instead of a literal. Spacing and type stay shared on
purpose: one rhythm across every component, and no wall of pass-through
tokens to read.
Some systems do tokenize every value at Layer 2 — multi-brand or
white-label products, or ones that ship density themes (compact vs
comfortable). That is the stricter version of this same architecture;
Brewlog has one brand and one density, so it stops at colour and radius.

### Components Come From the System
**Decided:** 2026-08-31
Build UI only from the components documented in
`.claude/skills/design-system/SKILL.md`. If a needed component doesn't
exist, say so and propose it — do not invent one-off styles inline.
**Why:** an AI that invents components produces ten button variants by
Friday. The inventory is the vocabulary.

### Ratings Are Dots, Not Stars
**Decided:** 2026-08-31
Brew ratings display as filled dots (●●●○○), never stars.
**Why:** Brewlog is a private tasting journal. Dots read as "how much I liked
this brew"; stars read as a public review score, and invite comparison with
apps this isn't.

---

## Memory

<!--
  TEACHING NOTE: memory has two tiers because the context window is finite.
  What the AI reads at every open competes with the work for the same
  space, so the always-read tier is kept short and everything else loads
  only when it is needed. AGENTS.md is the always-read core. The memory/
  folder holds the rest. Two skills do the reading and the writing so no
  session forgets to.
-->

| Tier | Files | Read when |
|---|---|---|
| Always | this file, `memory/MEMORY.md`, `memory/_continuity.md` | Every session open |
| On demand | every other file in `memory/` | When its line in `memory/MEMORY.md` matches the task, or on `/vault-load <topic>` |

- `memory/MEMORY.md` is the index: one line per on-demand file.
- `memory/_continuity.md` is where the work is: open questions, work in
  flight, how to resume. Overwritten at every close.
- `/vault-load` reads the always tier (plus a topic, if given).
  `/vault-save` routes what the session decided and learned to the right
  file and rewrites continuity. The session protocol runs both.
- Decisions never move to `memory/`: they must load every time.

---

## Session Protocol

- **Open:** `/vault-load` (reads this file, `memory/MEMORY.md`,
  `memory/_continuity.md`) → check `git status` → summarise project state
  in three sentences → say where in the track this session is, from Track
  phase → wait for the kick-off line. Done by hand in Session 1: read this
  file, then the two memory files.
- **Kick-off:** the designer sends one line: *"Today we're doing [ticket].
  The goal is [goal]."* The ticket's acceptance criteria are the session's
  definition of done.
- **Close:** on "Session done." → `/vault-save` (decisions and state into
  this file, facts into `memory/`, continuity rewritten) → update Track
  phase → `git status` → remind the designer to commit.

---

## Track phase

<!--
  TEACHING NOTE: this section exists because Brewlog is practised on in a
  four-session mentoring track. The session skills move it forward at every
  close, and the opener reads it back, so a session you start at home begins
  with "you are between Session 2 and 3, this week's twin is a skill of your
  own". Every build-along in a session has a twin: your own version at home,
  never mandatory, shown at the next session's show and tell. Delete this
  section when you adapt the file to your own project.
-->

- **Done:** nothing yet. A fresh clone starts here.
- **Next:** Session 1 · Setup day · Thu 5 Nov 2026
- **This week's twin:** install your coding agent, run the opener once, and
  send the three sentences back in your pre-work reply.
- **Twin progress:** not started

Sessions: 1 Setup day (5 Nov) · 2 Memory and skills (12 Nov) · 3 Design
system, spec-first (19 Nov) · 4 Judgment and demo day (26 Nov), all 2026.

---

## Current State

- Brewlog renders with seeded entries; add-entry form works (in-memory only,
  refreshes reset it — this is intentional for now).
- Design system extended on 2026-10-08: full 50–900 colour scales; Button
  sizes, hover/active/disabled/loading states, icon slot; Field with hint
  and error; Select in a wrapper with its own chevron; Badge dot; Tag
  remove; Card sections, muted and interactive; Alert title, actions and
  close; Rating large and label. Viewer at `product/design-system/viewer/`.
- Form validation uses the Field error, not the browser bubble: the form is
  `novalidate` and `app.js` shows the message (2026-10-08).
- 2026-10-08, system 1.2: coffee palette (espresso primary, warm stone
  neutrals, steel-teal accent for info and links, forest green, caramel,
  warm red), fields share Button's focus
  ring, entry rows keep the rating in place, dates day-first, roast labels
  capitalised, page greys one step darker, coffee mark in the header.
- Memory layer added 2026-10-13: `memory/` with an index, a continuity
  file and three on-demand facts (design system history, data model,
  exercise notes); `/vault-load` and `/vault-save` read and write it.
- Exercises BRW-101 → BRW-105 are unstarted.

---

## Where the Work Is

Open questions, work in flight and how to resume live in
`memory/_continuity.md`, which `/vault-load` reads at every open and
`/vault-save` rewrites at every close. Current State above says what
works; continuity says what is next. Do not re-open decided questions
unless the designer explicitly asks.
