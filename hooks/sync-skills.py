#!/usr/bin/env python3
"""
SKILLS SYNC: one set of skills for every coding agent.

Claude Code reads skills from .claude/skills/. Codex, Antigravity CLI and
Gemini CLI read them from .agents/skills/. Grok Build reads the Claude Code
folder. So the repo keeps the skills in two places, and this script keeps
the second in step with the first:

  .claude/skills/<name>/   the source. Edit skills here, on any agent.
                           Claude Code and Grok Build: type /session-2
  .agents/skills/<name>/   a copy, made by this script. Do not edit.
                           Codex: type $session-2 (or pick from /skills)
                           Antigravity CLI: type /session-2
                           Gemini CLI: picked when a request matches

Tested 1 Nov 2026, on that day's version of the skills: $session-2 on Codex 0.166 and /session-2 on Antigravity
CLI 1.4.12 both ran the copy. Grok Build and Gemini CLI: from their
documentation, untested. docs/tools.md has the full map.

Run it from the repo root after you add or change a skill:

  python3 hooks/sync-skills.py          update the copies in .agents/skills/
  python3 hooks/sync-skills.py --check  change nothing; list what is out of
                                        step and exit 1 if anything is

install.sh runs the check. Every copied SKILL.md gets one comment line
under its frontmatter that names its source, so anyone who opens the copy
knows where the real file is.

Why .claude/skills/ is the source: the track is driven on Claude Code, and
every exercise, the design-system viewer and AGENTS.md already point at
.claude/skills/. Claude Code users never see a change. On the other agents
AGENTS.md tells the agent to edit the source and run this script.

Why copies and not a symlink: Git on Windows checks a symlink out as a
small text file holding the link's path, unless Developer Mode and a Git
setting are both on. A copy works on every machine.

Three cases are handled so nobody loses work:

  - A skill that exists only in .agents/skills/ (an agent other than Claude
    Code made it there) is adopted: copied into .claude/skills/ as the new
    source, then copied back with the comment line.
  - A copy someone edited by hand is left alone and named, with what to do.
    The comment line carries a short fingerprint of the source it was made
    from; that is how the script tells an edited copy from an old one.
  - A copy whose source was deleted is removed.

The frontmatter is copied almost as it is: Claude Code, Codex and
Antigravity all read `name` and `description`. Two changes are made in
the copy:

  - Codex needs `name`, so a source without one gets `name: <folder name>`.
  - `disable-model-invocation: true` is a Claude Code setting: the skill
    runs only when typed, never on the agent's own initiative. The other
    agents do not know the key and may reject a file that has it, so the
    copy leaves that line out. On those agents the description's last
    sentence ("Only runs when typed") does the same job in words.

A source without `description` is reported; no agent can decide when to
use it. The fingerprint in the comment line is taken from the copy as the
other agents see it, so these two changes never make a copy look edited
or out of step.

Standard library only; Python 3.8 or newer.
"""
import argparse
import hashlib
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / ".claude" / "skills"
COPY = ROOT / ".agents" / "skills"
SKILL_FILE = "SKILL.md"

# Frontmatter lines only Claude Code understands. The copy leaves them out.
CLAUDE_ONLY_KEYS = [b"disable-model-invocation"]

MARK = re.compile(rb"^<!-- Copy of \.claude/skills/.*sync:([0-9a-f]{12}) -->\r?\n", re.M)
MARK_TEXT = (
    "<!-- Copy of .claude/skills/{name}/SKILL.md, made by hooks/sync-skills.py."
    " Edit that file, then run: python3 hooks/sync-skills.py."
    " On Codex a skill written /name below is typed $name. sync:{fp} -->"
)


def rel(path):
    return path.relative_to(ROOT).as_posix()


def files_in(folder):
    """Every file under a skill folder, as {relative path: bytes}."""
    return {
        p.relative_to(folder).as_posix(): p.read_bytes()
        for p in sorted(folder.rglob("*"))
        if p.is_file() and p.name != ".DS_Store"
    }


def fingerprint(files):
    """Short hash of a skill folder. Line endings are ignored, so a Windows
    checkout (CRLF) and a Mac checkout (LF) give the same fingerprint."""
    h = hashlib.sha256()
    for name in sorted(files):
        h.update(name.encode() + b"\0" + files[name].replace(b"\r\n", b"\n") + b"\0")
    return h.hexdigest()[:12]


def split_frontmatter(data):
    """(frontmatter including both --- lines, body) or (None, data)."""
    m = re.match(rb"---\r?\n.*?^---[ \t]*(?:\r?\n|$)", data, re.S | re.M)
    if not m:
        return None, data
    return data[: m.end()], data[m.end():]


def make_copy(name, files):
    """The files of the .agents/skills/<name>/ copy, or an error string."""
    skill = files.get(SKILL_FILE)
    if skill is None:
        return f".claude/skills/{name}/ has no SKILL.md"
    front, body = split_frontmatter(skill)
    if front is None:
        return f".claude/skills/{name}/SKILL.md has no frontmatter: start it with name and description between --- lines"
    if not re.search(rb"^description:", front, re.M):
        return f".claude/skills/{name}/SKILL.md has no description: every agent uses it to decide when the skill applies"
    nl = b"\r\n" if b"\r\n" in front else b"\n"
    # Codex needs a name: use the folder name when the source has none.
    if not re.search(rb"^name:", front, re.M):
        front = b"---" + nl + b"name: " + name.encode() + nl + front.split(nl, 1)[1]
    # Leave out the lines only Claude Code understands.
    for key in CLAUDE_ONLY_KEYS:
        front = re.sub(rb"^" + re.escape(key) + rb":.*(?:\r?\n|$)", b"", front, flags=re.M)
    # The copy without its comment line: what the other agents read. Its
    # fingerprint goes in the comment line, so a later run can tell whether
    # someone edited the copy by hand.
    plain = dict(files)
    plain[SKILL_FILE] = front + body
    mark = MARK_TEXT.format(name=name, fp=fingerprint(plain)).encode() + nl
    out = dict(files)
    out[SKILL_FILE] = front + mark + body
    return out


def unmarked(files):
    """A copy's files with the comment line taken out, and the fingerprint
    that line recorded (None when there is no comment line)."""
    skill = files.get(SKILL_FILE, b"")
    m = MARK.search(skill)
    if not m:
        return files, None
    out = dict(files)
    out[SKILL_FILE] = skill[: m.start()] + skill[m.end():]
    return out, m.group(1).decode()


def same(a, b):
    norm = lambda fs: {k: v.replace(b"\r\n", b"\n") for k, v in fs.items()}
    return norm(a) == norm(b)


def write_folder(folder, files):
    if folder.exists():
        shutil.rmtree(folder)
    for name, data in files.items():
        path = folder / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)


def edited_copy(folder):
    """True when a copy was changed by hand after the script made it."""
    files, fp = unmarked(files_in(folder))
    return fp is not None and fingerprint(files) != fp


def main():
    parser = argparse.ArgumentParser(description="Copy .claude/skills/ to .agents/skills/.")
    parser.add_argument("--check", action="store_true", help="change nothing; exit 1 if out of step")
    check = parser.parse_args().check

    sources = sorted(p.name for p in SOURCE.iterdir() if p.is_dir()) if SOURCE.is_dir() else []
    copies = sorted(p.name for p in COPY.iterdir() if p.is_dir()) if COPY.is_dir() else []
    todo, problems, done = [], [], []

    # 1. Skills made outside Claude Code: adopt them as sources.
    for name in copies:
        folder = COPY / name
        files, fp = unmarked(files_in(folder))
        if fp is not None:
            continue
        if name in sources:
            problems.append(
                f"{rel(folder)}/ is not a copy made by this script, and .claude/skills/{name}/ also exists. "
                f"Keep one: merge your changes into .claude/skills/{name}/SKILL.md, delete {rel(folder)}/, then run the script."
            )
            continue
        if check:
            todo.append(f"new skill {rel(folder)}/ will move to .claude/skills/{name}/ (run: python3 hooks/sync-skills.py)")
            continue
        write_folder(SOURCE / name, files)
        sources.append(name)
        done.append(f"adopted {rel(folder)}/ as .claude/skills/{name}/, the source from now on")

    # 2. Every source gets an up-to-date copy.
    for name in sorted(set(sources)):
        src_files = files_in(SOURCE / name)
        wanted = make_copy(name, src_files)
        if isinstance(wanted, str):
            problems.append(wanted)
            continue
        folder = COPY / name
        if folder.is_dir():
            current = files_in(folder)
            if same(current, wanted):
                continue
            # An edited copy is kept, unless the edit already matches what the
            # copy should say (someone made the same change in both places).
            if edited_copy(folder) and not same(unmarked(current)[0], unmarked(wanted)[0]):
                problems.append(
                    f"{rel(folder)}/SKILL.md was edited by hand, so the script will not overwrite it. "
                    f"Move the change into .claude/skills/{name}/SKILL.md (the source), "
                    f"delete {rel(folder)}/, then run the script."
                )
                continue
        if check:
            state = "is out of date" if folder.is_dir() else "is missing"
            todo.append(f"{rel(folder)}/ {state} (run: python3 hooks/sync-skills.py)")
            continue
        write_folder(folder, wanted)
        done.append(f"copied .claude/skills/{name}/ to {rel(folder)}/")

    # 3. Copies whose source is gone.
    for name in copies:
        folder = COPY / name
        if name in sources or not folder.is_dir() or unmarked(files_in(folder))[1] is None:
            continue  # unmarked folders were handled in step 1
        if edited_copy(folder):
            problems.append(f"{rel(folder)}/ has no source any more and was edited by hand; delete it or move it to .claude/skills/{name}/")
            continue
        if check:
            todo.append(f"{rel(folder)}/ has no source in .claude/skills/ and will be removed (run: python3 hooks/sync-skills.py)")
            continue
        shutil.rmtree(folder)
        done.append(f"removed {rel(folder)}/: its source is gone")

    for line in done:
        print(f"  [synced]  {line}")
    for line in todo:
        print(f"  [stale]   {line}")
    for line in problems:
        print(f"  [fix]     {line}")
    if not (done or todo or problems):
        print(f"  [ok]      skills in step: {len(set(sources))} in .claude/skills/, copied to .agents/skills/")
    return 1 if (todo or problems) else 0


if __name__ == "__main__":
    sys.exit(main())
