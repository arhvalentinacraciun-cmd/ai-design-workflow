---
name: critique
description: Use when asked to critique UI work — AI-generated or human — against the cohort rubric. Produces a structured, scored review with evidence, not vibes.
---
<!-- Copy of .claude/skills/critique/SKILL.md, made by hooks/sync-skills.py. Edit that file, then run: python3 hooks/sync-skills.py. On Codex a skill written /name below is typed $name. sync:3a75513a3c1c -->

# Critique Rubric — v1

Taste, written down. Score each trait 0–2 (0 = fails, 1 = partial,
2 = passes) and cite **evidence** — a file, a line, an element — for every
score. No evidence, no score.

| # | Trait | What "2" looks like |
|---|---|---|
| 1 | Token compliance | Zero literal style values outside `tokens.css`; breakpoints in `@media` are the one exception |
| 2 | Component discipline | Only inventory components used; no one-off styles |
| 3 | Hierarchy | One clear primary action; type sizes/weights encode importance |
| 4 | Spacing rhythm | All gaps on the 4px scale; siblings spaced via layout, not ad-hoc margins |
| 5 | States | Hover, focus-visible, empty, and error states exist where relevant |
| 6 | Accessibility floor | Labels on inputs, visible focus, contrast holds, meaningful aria where needed |
| 7 | Copy | Controls say what they do; no filler ("Submit" → "Add entry") |
| 8 | Scope honesty | Only what the ticket asked for; extras flagged, not smuggled |

## Output format

1. **Verdict line** — ship / fix-then-ship / rework, in one sentence.
2. **Score table** — the 8 traits with evidence per row.
3. **Top three fixes** — ordered by impact, each with the concrete change.

## Rules

- Critique the work, never the author.
- A high score needs evidence as much as a low one.
- If the ticket itself was ambiguous, say so — a spec problem is not a
  craft problem, and mixing them up teaches the wrong lesson.
