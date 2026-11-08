---
name: _continuity
updated: 2026-11-08
---
# Where the work is

Session 1 (Setup day) is done. BRW-101 — Clear all with a confirm alert —
is built, verified in the browser, and committed locally (952ca4e, not
pushed). The hook guardrail was seen once: it caught a deliberate `10px`
literal and was fixed with a token. Next is Session 2 · Memory and skills ·
Thu 12 Nov 2026, whose ticket is BRW-102 (teach it, then try to break it).
`AGENTS.md` Current State says what works today; this file says what is next.

# Open questions

- [ ] Should entries persist (localStorage)? Still undecided; do not build
      it unprompted. BRW-101's stretch (an Undo that survives a reload)
      would need it, so this will come up again.

# In flight

Nothing half-done. One local commit (952ca4e) is unpushed. A scratch HTTP
server was run on :8731 for in-browser checks and is stopped at close.

# How to resume

1. The opener (`/vault-load`, or by hand) has read `AGENTS.md`,
   `memory/MEMORY.md` and this file. Nothing else is needed to start.
2. Push 952ca4e if it has not gone up yet (`git log origin/main..main`).
3. Wait for the kick-off line, then work against that ticket's acceptance
   criteria. Session 2 is about memory and skills; its twin is BRW-101's
   stretch or a small task of your own.
4. Before touching something an on-demand memory file covers, read that
   file first. `/vault-load <topic>` does it.
5. A decided question stays decided until the designer reopens it.
