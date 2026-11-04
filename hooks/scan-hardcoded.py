#!/usr/bin/env python3
"""
GUARDRAIL: the no-hardcoding scan, run by your coding agent after (or before)
every file edit. One scanner, one adapter per agent.

The rule in AGENTS.md asks: every style value in product/ goes through
var(--token-name). This script enforces it. When a written file contains a
literal colour or px size, the violations go back into the session
so the agent fixes them at once.

How it reaches the agent differs per tool, so the last part of this file
reads the tool's payload and answers in the tool's shape:

  Claude Code   PostToolUse, Write|Edit     path in tool_input.file_path
  Gemini CLI    AfterTool, write_file|replace same shape as Claude Code
  Codex         PostToolUse, Edit|Write     the patch text in tool_input.command
  Grok Build    reads .claude/settings.json camelCase: toolInput
  Antigravity   PreToolUse, write_file|     camelCase toolCall.args, the
                edit_file (CLI) and the     proposed content, not a file;
                IDE's write/replace tools   answers {"decision": "deny"}

Claude Code, Gemini CLI and Codex all take "exit 2 + the message on stderr"
as feedback for the agent. Antigravity blocks the write before it happens
and shows the reason to the agent. Grok Build is wired through the Claude
Code settings file. Grok Build and Gemini CLI: wired from the documentation,
untested as of 1 Nov 2026.

What it looks for, in .css and .html files under product/ (never .js, and
never tokens.css, the one file where literal values belong):

  hex colours (#3B3FBF), px sizes (12px), rgb()/rgba() and hsl()/hsla()

A line that holds a token is still scanned: the token names are taken out
first, so "padding: 4px var(--space-2)" is caught on its 4px. Three things
look like a colour and are not one, so they are ignored: an HTML entity
(&#215;), a link to an id on the page (href="#fade") and an SVG reference
(url(#glow)). On an @media line, only the condition before the first { is
allowed to hold literals; anything inside the braces is scanned.

Full scan, at the end of a session or any time:

  python3 hooks/scan-hardcoded.py --all            scans product/
  python3 hooks/scan-hardcoded.py --all some/dir   scans that folder

It applies the same rules to every file, prints each violation, and exits
with 2 when it finds any (0 when the folder is clean).
"""
import json
import os
import re
import sys

LITERAL = re.compile(r"#[0-9a-fA-F]{3,8}\b|[0-9]+px|rgba?\(|hsla?\(")

# Taken out of a line before it is checked (scan-hardcoded.sh does the same):
TOKEN_NAME = re.compile(r"var\([ \t]*--[A-Za-z0-9_-]+")       # var(--space-2) leaves ")"
NOT_A_COLOUR = re.compile(r"(&|href=[\"']|url\([\"']?)#")     # &#215;  href="#fade"  url(#glow)


def is_ui_file(path):
    """Only product UI files, never the primitives file: that is WHERE literals live."""
    p = path.replace("\\", "/")
    if not ("/product/" in p or p.startswith("product/")):
        return False
    if p.endswith("design-system/tokens.css"):
        return False
    return p.endswith(".css") or p.endswith(".html")


def scan(lines):
    """Lines that hold a literal style value, as "line number:line"."""
    hits = []
    for n, line in enumerate(lines, 1):
        text = line
        # Custom properties do not work in a media query condition, so a
        # breakpoint is a literal by necessity. Only the condition is exempt.
        if "@media" in text:
            brace = text.find("{")
            text = text[brace:] if brace >= 0 else ""
        text = TOKEN_NAME.sub("", text)
        text = NOT_A_COLOUR.sub(r"\1", text)
        if LITERAL.search(text):
            hits.append(f"{n}:{line.rstrip()}")
    return hits


def message(path, hits):
    return "\n".join([
        f"NO-HARDCODING RULE VIOLATION in {path}:",
        *hits,
        "",
        "Style values in product/ come from var(--token-name) only.",
        "Use an existing token from product/design-system/, or propose a new",
        "one, never a literal. See AGENTS.md > Design Decisions.",
    ])


# ---- adapters: payload in, (files to scan, content to scan, reply mode) out


def patch_paths(patch, cwd):
    """Codex sends the apply_patch text; pull the touched file paths out of it."""
    paths = []
    for m in re.finditer(r"^\*\*\* (?:Add|Update) File: (.+)$", patch, re.M):
        p = m.group(1).strip()
        paths.append(p if os.path.isabs(p) else os.path.join(cwd, p))
    return paths


def read_payload(payload):
    cwd = payload.get("cwd") or os.getcwd()

    # Antigravity: PreToolUse, camelCase, the proposed content under PascalCase args.
    # CLI tools: write_file {Path, Content}, edit_file {Path, Target, Replacement}.
    # IDE tools: write_to_file {TargetFile, CodeContent}, replace_file_content
    # {TargetFile, ReplacementContent}, multi_replace_file_content {ReplacementChunks}.
    call = payload.get("toolCall")
    if isinstance(call, dict):
        args = call.get("args") or {}
        target = args.get("Path") or args.get("TargetFile") or ""
        chunks = [args.get("Content", ""), args.get("Replacement", ""),
                  args.get("CodeContent", ""), args.get("ReplacementContent", "")]
        chunks += [c.get("ReplacementContent", "") for c in args.get("ReplacementChunks") or [] if isinstance(c, dict)]
        return [], (target, "\n".join(c for c in chunks if c)), "antigravity"

    # Grok Build (camelCase) or Claude Code / Gemini CLI (snake_case).
    tool_input = payload.get("tool_input")
    if tool_input is None:
        tool_input = payload.get("toolInput")
    tool_input = tool_input or {}

    # Codex: the patch text instead of a path.
    if payload.get("tool_name") == "apply_patch" or ("command" in tool_input and "file_path" not in tool_input):
        return patch_paths(str(tool_input.get("command", "")), cwd), None, "stderr"

    path = tool_input.get("file_path") or tool_input.get("filePath") or tool_input.get("path") or ""
    return ([path] if path else []), None, "stderr"


def shown(path):
    """A path as short as it can be, for the --all report."""
    try:
        return os.path.relpath(path).replace(os.sep, "/")
    except ValueError:  # Windows: another drive
        return path


def scan_all(folder):
    """--all: every file under the folder that the hook would scan."""
    found = 0
    checked = 0
    for dirpath, dirnames, filenames in os.walk(folder):
        dirnames.sort()
        for name in sorted(filenames):
            path = os.path.join(dirpath, name)
            if not is_ui_file(os.path.abspath(path)):
                continue
            checked += 1
            with open(path, encoding="utf-8", errors="replace") as f:
                hits = scan(f.read().splitlines())
            if hits:
                found += len(hits)
                print(message(shown(path), hits) + "\n")
    if found:
        print(f"{found} hard-coded value(s) in {shown(folder)}. Fix each one with a token.")
        return 2
    print(f"No hard-coded values: {checked} file(s) checked in {shown(folder)}.")
    return 0


def main():
    if len(sys.argv) > 1 and sys.argv[1] == "--all":
        here = os.path.dirname(os.path.abspath(__file__))
        folder = sys.argv[2] if len(sys.argv) > 2 else os.path.join(here, "..", "product")
        return scan_all(os.path.normpath(folder))

    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0
    files, content, mode = read_payload(payload)

    if mode == "antigravity":
        target, text = content
        if not is_ui_file(target):
            print(json.dumps({"decision": "allow"}))
            return 0
        hits = scan(text.splitlines())
        if hits:
            print(json.dumps({"decision": "deny", "reason": message(target, hits)}))
        else:
            print(json.dumps({"decision": "allow"}))
        return 0

    for path in files:
        if not is_ui_file(path) or not os.path.isfile(path):
            continue
        with open(path, encoding="utf-8", errors="replace") as f:
            hits = scan(f.read().splitlines())
        if hits:
            sys.stderr.write(message(path, hits) + "\n")
            return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
