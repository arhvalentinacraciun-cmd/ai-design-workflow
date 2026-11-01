---
name: brewlog-data-model
description: What a Brewlog entry is made of, the three seed entries, and what survives a reload; read before changing the form, the list or the seed data
updated: 2026-11-01
---
# Brewlog data model

An **entry** is one brew, held in memory in `product/app.js`:

| Field | Type | Values today |
|---|---|---|
| `name` | text | Free text. The seeds follow "Roaster — Origin", for example "Origo — Ethiopia Guji". This is a seed convention, **not a recorded decision**; nothing enforces it |
| `roast` | one of three | `light`, `medium`, `dark`; rendered as a plain roast Tag (dot filled to the level) with a capitalised label |
| `rating` | 1 to 5 | Rendered as filled dots, never stars (decision in `AGENTS.md`) |
| `date` | short text | Day first, short month: "28 Aug". Set at save time from the browser's clock |
| `photo` | path, optional | A square photo in `product/img/`; the three seeds have one. The form has no photo field, so an entry added by hand has none and shows the cup mark on a soft tile. Adding a photo field is not decided; do not build it unprompted |

Seed entries, in display order: Origo — Ethiopia Guji (light, 5), Boiler —
Colombia Huila (medium, 4), M60 — House Blend (dark, 3). Their photos and
the header photo are Unsplash, credited in the page footer.

What survives a reload: nothing. Entries live in a JavaScript array, so a
refresh resets the list to the three seeds. This is intentional for now;
persistence is an open question in `memory/_continuity.md`, not a bug.

The add-entry form is `novalidate`: an empty name shows the Field error
message under the control instead of the browser's bubble, so the message
never moves the controls.
