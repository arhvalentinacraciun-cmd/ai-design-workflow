# How this actually works

A ten-minute read before Session 1. Four pictures and a glossary. Nothing to
install here; the install check is in your pre-work email.

In Session 1 you will type an instruction to an AI, watch it edit files in
this repo, and see a rule push back on it. All of that is easier to follow
if you know four things about what is going on underneath. None of them
need a technical background, and you will hear all four words again on the
evening.

---

## 1. It writes one piece at a time

The model behind Claude Code does one thing: given everything written so
far, it predicts the next small piece of text and adds it. Then it does it
again. A piece is called a **token**. In English a token is about three
quarters of a word, so "guardrail" may be two tokens and a comma is one.
Romanian splits into more pieces per word.

![A sentence written so far, an empty slot for the next piece, and three candidate pieces ranked by likelihood](img/primer-1-next-piece.svg)

Three things follow from this:

- **It does not look things up; it continues text.** When the continuation
  is right it reads as knowledge. When it is wrong it reads exactly the
  same. Fluent and wrong at the same time is normal, not a glitch, which is
  why Session 4 is about checking.
- **Wording changes what comes next.** Your words are the start of the
  sequence it continues, so a clear instruction and a vague one lead to
  different places. This is not magic words; it is the mechanism.
- **It picks one of several likely next pieces**, usually the likeliest,
  sometimes not. Ask twice, get two answers. Saved instructions, in files,
  are how you make the start of the sequence the same every time.

## 2. Everything it knows right now fits in one box

There are two kinds of knowledge. **Training** is what the model learned
before you ever opened it: language, general knowledge, fixed. The
**context window** is everything in front of it in this session: the files
it was given at the start, the files it has read since, your messages, its
own answers and the results of what it did. That box has a fixed size,
measured in tokens. When it fills, the oldest parts are summarised or
dropped and the model works from what is left.

![The context window as one box with a fixed size, filled from the top by start-up files, files read, your messages and its own answers; training sits outside the box](img/primer-2-context-window.svg)

So:

- **A session has a start and an end.** Finish a task, then start a new
  session for the next one. Long sessions get worse, not better.
- **What is loaded at the start matters most.** In this repo, `CLAUDE.md`
  and the memory index are read first, every session. That is why "teach
  it a decision" means writing the decision in a file, not saying it in
  chat: chat is gone next session, the file is back in the box.
- **Memory**, in this track, means files the AI reads at the start of a
  session. Nothing more mysterious than that.

## 3. An agent is the model in a loop with tools

A chat answers. An **agent** acts: the model decides, uses a **tool** (read
this file, run this command, edit that file), the result comes back into
the context window, and it decides again, until it answers you. Claude Code
is that loop, running in your project folder. Everything you install in
this track sits on this loop.

![The agent loop: your request goes to the model, which decides, uses a tool, gets the result back into the window and decides again until it answers; a skill loads into the window, memory files are read at start, and a hook runs after the tool and can reject its edit](img/primer-3-agent-loop.svg)

- **Skill**: a saved instruction file with a name. Typing `/session-2`
  loads that file into the window and the agent follows it. A process you
  repeat becomes a skill.
- **Hook**: a small program that runs by itself when something happens, for
  example after every file edit. It can reject the edit and tell the agent
  why. This is the difference between a rule written down and a rule
  enforced; you meet it in the first hour of Session 1.
- **Memory files and `CLAUDE.md`**: read at the start, as in section 2.
- **Agent definition** (Session 2): a file that gives the loop a role,
  constraints and reference material for one specific job. A persona line
  on its own ("you are a senior designer") barely changes the output; the
  constraints and the material do.

## 4. "Token" means two things on Thursday

An **AI token** is a piece of text, as in section 1. A **design token** is
a named value in a design system, such as `--color-primary-600`, that
components point at instead of writing the colour directly. In this repo
every colour, spacing and radius must go through a token; a hook checks
every file the AI writes and rejects a raw value such as `#85573a`.

![Left: an AI token is a piece of text, shown as the word literal split into pieces. Right: a design token is a named value, shown as a button token pointing to a colour token pointing to a hex value, with the hook rejecting the raw hex](img/primer-4-two-tokens.svg)

So the word you hear at the start of the evening and the word in the
hook's rejection an hour later are different things that share a name.
Nobody chose this; both fields got there first.

---

## Glossary

Three short lists. Skip the one you already live in.

### From the AI side

- **Model**: the thing that predicts the next token. Claude is a family of
  models; Claude Code runs one of them in the loop above.
- **Prompt**: whatever you write to it. In this track, the saved files
  count as prompt too; they are just written once.
- **Token**: a piece of text, about three quarters of a word. The unit it
  writes in and the unit the context window is measured in.
- **Context window**: everything it has in front of it right now. Fixed
  size. Fills up.
- **Session**: one context window, from open to close. "Session done." is
  the close in this repo; it writes the memory files for the next one.
- **Agent**: the model in a loop with tools. Claude Code is one.
- **Tool**: an action the agent can take: read a file, edit a file, run a
  command, search.
- **Skill**: a saved instruction file with a name, run by typing it
  (`/session-2`, `/new-ticket`, `/critique`).
- **Hook**: a small program that runs by itself on an event, such as after
  every file edit, and can reject the result.
- **Memory**: files the agent reads at the start of a session
  (`CLAUDE.md`, `memory/`).
- **`CLAUDE.md`**: the one file this project always loads first: the brief,
  the decisions, the rules, the session protocol.
- **Hallucination**: a fluent continuation that is wrong, stated with the
  same confidence as a right one. Session 4 sorts output into verified,
  derived and invented.
- **Terminal**: the text window where you type commands. Claude Code runs
  there.
- **Repo, clone, commit**: a repo is a project folder with its history;
  cloning copies it to your machine; a commit is a saved snapshot with a
  message. `install.sh` checks you have what you need.

### From the delivery side (if you are a designer)

- **Ticket**: one unit of work, written down. Every exercise here is one
  (`BRW-101` to `BRW-105`).
- **Story**: the ticket's one-sentence purpose: "As a [who], I want [what],
  so that [why]."
- **Acceptance criteria**: the checklist that defines done, written before
  the work starts. The agent is held to it; so are you.
- **Spec**: what to build, decided before building. Session 3 is spec first.
- **Definition of done**: the acceptance criteria, met, and nothing invented
  along the way.

### From the design side (if you are not a designer)

- **Design system**: the shared set of components, tokens and rules a
  product is built from, so that ten screens look like one product.
- **Design token**: a named value (`--color-primary-600`, `--space-4`) that
  components point at. This repo has three layers: primitives, component
  tokens, components.
- **Component**: a reusable piece of interface with its own rules: Button,
  Input, Badge, Card.
- **Variant**: a deliberate version of a component: primary, secondary,
  ghost.
- **State**: how a component looks in a situation: hover, focus, disabled,
  error.
- **Component story**: a short spec for a component before it exists. In
  this repo, a markdown file in `product/design-system/stories/`.
- **Accessibility**: usable by everyone, including with a keyboard or a
  screen reader. Contrast is the part you can measure: text needs at least
  4.5:1 against its background.

---

## Before Thursday

Do the install check from your pre-work email, run the opening line once
("Read CLAUDE.md, then give me the state of the project in three
sentences"), and send the three sentences back. If anything in this page
did not land, bring the question; the first twenty minutes of Session 1 are
these four pictures, live.
