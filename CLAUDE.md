# CLAUDE.md — Brewlog
**Last updated:** 2026-10-06 (rev 2)
**Maintained by:** whoever is in the session — that's the point

> Read this entire file before doing anything. This is the project memory.
> Every decision, every rule, every open question lives here.

<!--
  TEACHING NOTE (delete these comments when you adapt this file to your own
  project): each section below has a job. The AI reads this file at session
  start, so what's written here is what it "knows" before you say a word.
  The file is only as good as its last update — closing a session without
  updating it is how projects lose their memory.
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

## Session Protocol

- **Open:** read this file → check `git status` → summarise project state in
  three sentences → wait for the kick-off line.
- **Kick-off:** the designer sends one line: *"Today we're doing [ticket].
  The goal is [goal]."* The ticket's acceptance criteria are the session's
  definition of done.
- **Close:** on "Session done." → update this file (decisions, state, open
  questions) → `git status` → remind the designer to commit.

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
- Exercises BRW-101 → BRW-105 are unstarted.

---

## Open Questions

- [ ] Should entries persist (localStorage)? Not decided — do not build it
      unprompted.

---

## How to Resume This Project

If you are Claude reading this in a new session:
1. Read this file completely.
2. Summarise the project state in three sentences.
3. Ask which ticket is in play. Do not start building without one.
4. Do not re-open decided questions unless the designer explicitly asks.
