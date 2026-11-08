# AGENTS.md — Brewlog
**Last updated:** 2026-11-08 (rev 9)
**Maintained by:** whoever is in the session — that's the point

> Start every session by reading all of this file, then `memory/MEMORY.md` and
> `memory/_continuity.md`. This file is the always-read core of the project
> memory: every decision and every rule lives here. Where the work is, and
> the facts you only need sometimes, live in `memory/`.

<!--
  TEACHING NOTE (delete these comments when you adapt this file to your own
  project): each section below has a job. The AI reads this file at session
  start, so what's written here is what it "knows" before you say a word.
  The file is only as good as its last update — closing a session without
  updating it is how projects lose their memory.
  Why this file is called AGENTS.md: Codex, Antigravity, Gemini CLI and
  Grok Build (those two wired from the documentation, untested), Cursor and
  Copilot all read a file of that name. Claude Code reads CLAUDE.md, which
  here is a short file that imports this one. One memory, every tool.
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
  recorded here are constraints, not suggestions. The flag-and-ask rule
  just below is the behaviour that turns a chat into a colleague.
-->

Every significant decision, with rationale. They stay decided until the
designer reopens one. When a request contradicts a decision, flag the
conflict and ask before going ahead.

### No-Hardcoding Rule
**Decided:** 2026-08-31 · **Status:** absolute, enforced by hook
In `product/`, colours, spacing, type, radii, shadows and motion all come
from `var(--token-name)`. Two places hold literals on purpose:
`product/design-system/tokens.css` (Layer 1), where every value is defined,
and `@media` conditions, where custom properties do not work. When the
token you need is missing, stop, say so and propose a new one; anywhere
else, a literal value is never the answer.
**Why:** the token system cannot see a literal, so that element drops out
of every theme change.
**How it is enforced:** `hooks/scan-hardcoded.sh` runs after every file
edit (on Antigravity, before it). It scans CSS and HTML files under
`product/` for colour, size and spacing literals (hex, `px`, `rgb()`,
`hsl()`), also on a line that holds a token, and flags each one straight
back to the agent, which fixes it; Antigravity blocks the write instead.
JavaScript and edits made through the shell are not scanned. The session
close runs a full scan; what no scan can see is the critique rubric's job.

### Three-Layer Token Architecture
**Decided:** 2026-08-31 · **Revised:** 2026-10-03 (rule brought in line with
what `components.css` had done since day one); 2026-11-02 (page tokens and
the opacity, size and duration scales written in)
Layer 1 `tokens.css` — primitives (palette, spacing, type, radius, shadow,
motion). Layer 2 `component-tokens.css` — per-component namespaces pointing
at primitives. Components take every colour and every radius from Layer 2;
the shared scales (spacing, type, line height, border width, shadow,
motion and duration, opacity, size, letter spacing, focus ring) they may reference from
Layer 1 directly. `app.css` follows the same rule: it takes its page
colours from Layer 2 too, from the `--page-*` namespace, and its layout
from the shared scales. Layer 3 — a future theme file overriding component
tokens at `:root`, zero component changes.
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

### Skills Have One Source
**Decided:** 2026-11-01
Skills are written and edited in `.claude/skills/<name>/SKILL.md`, on every
agent. `.agents/skills/` holds copies for Codex, Antigravity CLI and Gemini
CLI, made by `python3 hooks/sync-skills.py`: after adding or changing a
skill, run it; never edit a file in `.agents/skills/` by hand.
**Why:** Claude Code reads only `.claude/skills/`, and the track is driven
on Claude Code, so making that folder the source means Claude Code users
never see a change. Copies rather than a symlink, because Git on Windows checks a
symlink out as a plain text file; the script's `--check` catches a copy
that has fallen behind.

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

- **Open:** `/vault-load` reads this file, `memory/MEMORY.md` and
  `memory/_continuity.md`, checks `git status`, and reports once: the
  project state in three sentences, where in the track this session is
  (from Track phase), and any uncommitted work. Then the protocol asks
  how the twin went (not before Session 1), writes the answer to
  `memory/exercise-notes.md` and to Twin progress, and waits for the
  kick-off line. Done by hand in Session 1: read this file, then
  the two memory files.
- **Kick-off:** the designer opens the work with a single line, *"Today
  we're doing [ticket]. The goal is [goal]."* From then on, done means the
  ticket's acceptance criteria are met.
- **Checkpoint:** on "Checkpoint." → `/vault-save` only, plus one line in
  continuity saying where the session stopped. Nothing else changes. Used
  when a session ends early on purpose (Session 2, part 1).
- **Close:** on "Session done." → `/vault-save` (a full scan of
  `product/` for literals, then decisions and state into this file, facts
  into `memory/`, continuity rewritten) → update Track phase → bump the Last updated
  line at the top of this file → `git status` → remind the designer to
  commit → name the twin for the week in the chat.

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

- **Done:** Session 1 · Setup day · Thu 5 Nov 2026 — BRW-101 (Clear all
  with a confirm alert) built and the hook guardrail seen once.
- **Next:** Session 2 · Memory and skills · Thu 12 Nov 2026
- **This week's twin:** BRW-101's twin — the optional stretch (a
  recoverable Clear all with an Undo ghost button for the current view),
  or one small task of your own in the repo. Bring it to Session 2's show
  and tell.
- **Twin progress:** not started

Sessions: 1 Setup day (5 Nov) · 2 Memory and skills (12 Nov) · 3 Design
system, spec-first (19 Nov) · 4 Judgment and demo day (26 Nov), all 2026.

---

## Current State

- Brewlog renders with seeded entries; add-entry form works (in-memory only,
  refreshes reset it — this is intentional for now). Form validation uses
  the Field error, not the browser bubble: the form is `novalidate` and
  `app.js` shows the message.
- Clear all (BRW-101, 2026-11-08): a secondary button beside Add entry
  (`type="button"`) opens a warning Alert that confirms before emptying the
  in-memory log; Cancel changes nothing, Clear sets the count to "0 brews"
  and swaps an info Alert in for the list. Empty state and confirmation are
  static Alerts toggled by `el.hidden`; for that to beat `.alert`/
  `.entry-list` own `display`, `app.css` carries one base reset,
  `[hidden] { display: none !important; }` (token- and literal-free).
- Design system 2.0 (2026-11-01): indigo primary with the ink at 900, lime
  accent as a highlighter (brew count, top rating, info alert), a roast hue
  for the coffee brown (the roast Tag only), cool neutrals. Atkinson
  Hyperlegible Next for text, IBM Plex Mono for labels, counts and dates;
  type one step up, 14px floor. Pill buttons, 48px controls, 2px borders on
  anything that carries meaning. The page has a full-bleed header with a
  photo under an ink wash, the form as a Card lifting into it, entries as
  tickets with a photo tile (seeds ship photos in `product/img/`; a new
  entry shows the cup mark). Components: Button, Input, Field, Select, Badge,
  Tag, Card, Alert, Rating, each with the variants and states listed in the
  design-system skill. Every contrast pair measured in the viewer at
  `product/design-system/viewer/`. How it got here:
  `memory/design-system-history.md`.
- Memory layer added 2026-10-13: `memory/` with an index, a continuity
  file and three on-demand facts (design system history, data model,
  exercise notes); `/vault-load` and `/vault-save` read and write it.
- Skills on every agent, 2026-11-01: the nine skills in `.claude/skills/`
  (critique, design-system, new-ticket, session-2, session-3, session-4,
  session-protocol, vault-load, vault-save) are copied to `.agents/skills/`
  by `hooks/sync-skills.py`; `install.sh` checks the copy. Tested that day,
  on the 1 Nov version of the skills: `$session-2` on Codex and
  `/session-2` on Antigravity CLI both ran the copy. Grok Build and Gemini CLI are wired from their documentation,
  untested.
- BRW-101 is done (2026-11-08); BRW-102 to BRW-105 are unstarted.

---

## Where the Work Is

Open questions, work in flight and how to resume live in
`memory/_continuity.md`, which `/vault-load` reads at every open and
`/vault-save` rewrites at every close. Current State above says what
works; continuity says what is next. A decided question stays decided
until the designer reopens it.
