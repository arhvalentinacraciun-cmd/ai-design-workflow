---
name: exercise-notes
description: What happened in each BRW ticket, one short block per ticket, and how each week's twin is going; the material for show and tell and for the three-beat demo
updated: 2026-11-02
---
# Exercise notes

`/vault-save` adds to the block for the ticket in play when a session
closes. Keep each block short: what was built, the moment the system pushed
back, what you would do differently. The first two lines feed the demo's
first two beats: the thing, and the moment the system did its job.

## BRW-101 · First task

Built a "Clear all" that empties the in-memory log behind a confirmation:
a secondary button beside Add entry, a warning Alert with Clear/Cancel, an
info Alert as the empty state, all from the component inventory — secondary
not danger, because a reload brings the seeds back.

The system pushed back twice. First the no-hardcoding rule, when asked for
a literal `10px` gap: the agent refused on the rule and offered the nearest
token before being told it was a deliberate test. Then the hook itself
caught `gap: 10px` in `app.css:122`, reported file and line, and blocked
the write; the fix was `var(--space-3)`. That is the two-beat demo: the
feature, then the guardrail doing its job.

What I'd do differently: check the `hidden`-attribute-vs-component-`display`
clash up front. `.alert` and `.entry-list` set `display`, so `el.hidden`
did nothing until a base `[hidden] { display: none !important; }` reset
went into `app.css`. Caught it in the browser, not on paper.

## BRW-102 · Teach it, then try to break it

Not started.

## BRW-103 · Build a feature spec-first

Not started.

## BRW-104 · Critique

Not started. The review itself is saved in `exercises/BRW-104-notes.md`.

## BRW-105 · Demo day

Not started.

## Your own tickets (BRW-2NN)

None yet. `/new-ticket` creates them.

## Twins

The session open asks how this week's twin is going and writes the answer
here, one line per week.

- Pre-Session 1 (2026-11-08): done — agent installed on the laptop, opener
  run; nothing reported as failed.
