# Exercises

One ticket per session, four sessions. BRW-104 runs at home between S3
and S4 and is discussed in S4; BRW-105 is the demo brief for S4's second
half. Each one is written the way a real ticket should be, with a story,
acceptance criteria and constraints, because that format is part of the
lesson. **A ticket is finished when every acceptance criterion is checked.
How the work feels at the end does not count.**

## How to run one

1. Open the ticket. Read it fully before opening a session.
2. Open the session: `/vault-load` reads `AGENTS.md` and the two memory
   files and gives you the state of the project. In Session 1 you do it by
   hand: *"Read AGENTS.md, then give me the state of the project in three
   sentences."*
3. Kick off: *"Today we're doing BRW-1XX. The goal is [the story's goal]."*
   From Session 2 on, typing `/session-2`, `/session-3` or `/session-4`
   (on Claude Code and Antigravity; on Codex it is `$session-2` and so on;
   other tools are in [docs/tools.md](../docs/tools.md)) does steps 2 and 3
   for you and shows the evening's hands-on agenda, so the whole room
   starts in the same state.
4. Work with the agent until every acceptance criterion is checked.
5. Say **"Session done."** and let the close protocol run: it writes the
   session's memory (`/vault-save`) and moves Track phase forward. To save
   without closing, say **"Checkpoint."** instead (BRW-102 uses it).
6. Commit.

Most tickets have a **stretch** section for experienced mentees: same
theme, harder cut. Do the base first; the stretch is optional, not a
status symbol.

Each session also has a **twin**: your own version of the evening's work,
done at home, never mandatory, shown at the next session's show and tell.
The ticket names it at the end.

| Ticket | Session | Theme | Twin (at home, optional) |
|---|---|---|---|
| [BRW-101](BRW-101-first-task.md) | S1 | First task: prove the environment works | The BRW-101 stretch, or one small task of your own |
| [BRW-102](BRW-102-teach-it-memory.md) | S2 | Teach the project a decision, then try to break it | A skill of your own; optionally a roadmap file |
| [BRW-103](BRW-103-spec-first-feature.md) | S3 | Build a feature spec-first | The capstone brief: finish the feature, critique it (BRW-104), prepare the demo (BRW-105) |
| [BRW-104](BRW-104-critique.md) | At home, after S3 | Critique the output against the rubric; discussed in S4 | None: this is the at-home work |
| [BRW-105](BRW-105-demo-day.md) | S4 | Demo day, the second half of the last session | None: the track ends here |
