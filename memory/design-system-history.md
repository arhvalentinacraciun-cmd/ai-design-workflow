---
name: design-system-history
description: What each version of the Brewlog design system changed and why, 1.0 to 2.0; read before changing tokens, palette or component states
updated: 2026-11-01
---
# Design system history

The viewer's Changelog tab lists *what* changed per version. This file
keeps the *why*, which the files cannot show.

| Version | Date | Change | Why |
|---|---|---|---|
| 1.0 | 31 Aug 2026 | Three token layers; Button, Input, Select, Badge, Tag, Card, Alert, Rating; the no-literal rule and the hook that enforces it | A system small enough to learn in five minutes, real enough that a literal value is visibly wrong |
| 1.1 | 8 Oct 2026 | Full 50–900 scales for five hues; Button sizes and states; Field with hint and error; Select wrapper with its own chevron; Badge dot; Tag remove; Card sections; Alert title, actions, dismiss; Rating large and label; the viewer | A component without its states and sizes is half a component. Nine complete beat twenty slim. Danger button moved to the 600 step because white on 500 failed AA |
| 1.2 | 8 Oct 2026 | Coffee palette: espresso primary, warm stone neutrals, forest green, caramel, warm red, steel-teal accent for info and links; fields share Button's focus ring; dates day first; roast labels capitalised; page greys one step darker | Hues chosen step by step so every one of the thirty live text pairs stays at AA. Greys raised because 14px grey below about 7:1 reads faint on a laptop. The accent is the complement of espresso so links are not mistaken for primary actions |
| 2.0 | 1 Nov 2026 | New palette: indigo primary (900 is the ink), lime accent, a roast hue for the brown, cool neutrals, green, burnt orange, crimson. Atkinson Hyperlegible Next and IBM Plex Mono; type one step up, 14px floor. Pill buttons, rounder inputs and cards, 2px meaningful borders, ink-tinted shadows, 48px controls. Badge accent, Tag plain/dot/roast, Rating outlined empties and the top band. Page: photo header under an ink wash, the form as a Card lifting into it, entries as tickets with a photo tile | The product took the designer's own visual direction (the "workbook" look, indigo and lime) so that everything mentees see is one family; the mockup it was ported from was chosen over five variants. Lime cannot be text, so it became a highlighter with the ink on it, and the info alert joined it because an empty state is the one thing to notice on an empty page. Brown is kept for the coffee alone so the roast reads at a glance without competing with actions. Type went up a step because 14px grey below 7:1 reads faint on a laptop; 2px borders because a hairline that carries meaning disappears at that size. The header photo ships as a file so a clone renders the same offline |

Planned: the segmented control, from `product/design-system/stories/
segmented-control.md`. It is not in the inventory; until it is, the
agent treats it as not existing, which is correct.

Rules that fell out of this history:

- Every colour and radius in a component goes through a Layer 2 token;
  the shared scales may be used directly (decision in `AGENTS.md`).
- A contrast change is checked in the viewer's Accessibility tab, which
  computes the live pairs, not by eye.
- A new version gets a row here *and* in the viewer's Changelog.
- Lime is never a text colour; brown appears only on the roast Tag. A new
  use of either is a system change, not a page change.
