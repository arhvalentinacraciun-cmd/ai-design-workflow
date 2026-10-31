#!/usr/bin/env python3
"""
GUARDRAIL: the no-hardcoding scan, run by your coding agent after (or before)
every file edit. One scanner, one adapter per agent.

The rule in AGENTS.md asks: every style value in product/ goes through
var(--token-name). This script enforces it. When a written file contains a
literal colour, px size or rgb(), the violations go back into the session
so the agent fixes them at once.

How it reaches the agent differs per tool, so the last part of this file
reads the tool's payload and answers in the tool's shape:

  Claude Code   PostToolUse, Write|Edit     path in tool_input.file_path
  Gemini CLI    AfterTool, write_file|replace same shape as Claude Code
  Codex         PostToolUse, Edit|Write     the patch text in tool_input.command
  Grok Build    reads .claude/settings.json camelCase: toolInput
  Antigravity   PreToolUse, write/replace   camelCase toolCall.args, the
                                            proposed content, not a file;
                                            answers {"decision": "deny"}

Claude Code, Gemini CLI and Codex all take "exit 2 + the message on stderr"
as feedback for the agent. Antigravity blocks the write before it happens
and shows the reason to the agent. Grok Build is wired through the Claude
Code settings file; its feedback path is documented loosely, test it.
"""
import json
import os
import re
import sys

LITERAL = re.compile(r"#[0-9a-fA-F]{3,8}\b|[0-9]+px|rgba?\(")


def is_ui_file(path):
    """Only product UI files, never the primitives file: that is WHERE literals live."""
    p = path.replace("\\", "/")
    if not ("/product/" in p or p.startswith("product/")):
        return False
    if p.endswith("design-system/tokens.css"):
        return False
    return p.endswith(".css") or p.endswith(".html")


def scan(lines):
    """Lines that hold a literal style value. @media lines are exempt: custom
    properties do not work in media query conditions, so breakpoint literals
    are legitimate there."""
    hits = []
    for n, line in enumerate(lines, 1):
        if "var(--" in line or "@media" in line:
            continue
        if LITERAL.search(line):
            hits.append(f"{n}:{line.rstrip()}")
    return hits


def message(path, hits):
    return "\n".join([
        f"NO-HARDCODING RULE VIOLATION in {path}:",
        *hits,
        "",
        "Every style value must flow through var(--token-name).",
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
    call = payload.get("toolCall")
    if isinstance(call, dict):
        args = call.get("args") or {}
        target = args.get("TargetFile", "")
        chunks = [args.get("CodeContent", ""), args.get("ReplacementContent", "")]
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


def main():
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
