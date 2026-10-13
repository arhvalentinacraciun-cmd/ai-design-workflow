---
name: brewlog-data-model
description: What a Brewlog entry is made of, the three seed entries, and what survives a reload; read before changing the form, the list or the seed data
updated: 2026-10-13
---
# Brewlog data model

An **entry** is one brew, held in memory in `product/app.js`:

| Field | Type | Values today |
|---|---|---|
| `name` | text | Free text. The seeds follow "Roaster — Origin", for example "Origo — Ethiopia Guji". This is a seed convention, **not a recorded decision**; nothing enforces it |
| `roast` | one of three | `light`, `medium`, `dark`; rendered as a Badge with a capitalised label |
| `rating` | 1 to 5 | Rendered as filled dots, never stars (decision in `CLAUDE.md`) |
| `date` | short text | Day first, short month: "28 Aug". Set at save time from the browser's clock |

Seed entries, in display order: Origo — Ethiopia Guji (light, 5), Boiler —
Colombia Huila (medium, 4), M60 — House Blend (dark, 3).

What survives a reload: nothing. Entries live in a JavaScript array, so a
refresh resets the list to the three seeds. This is intentional for now;
persistence is an open question in `memory/_continuity.md`, not a bug.

The add-entry form is `novalidate`: an empty name shows the Field error
message under the control instead of the browser's bubble, so the message
never moves the controls.
