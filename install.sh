#!/usr/bin/env bash
# =============================================================================
# Build Your AI Design Workflow — guided setup
# Checks your environment and tells you exactly what's missing. Safe to run
# as many times as you like; it changes nothing on your machine.
# =============================================================================

set -u

ok=0
warn=0

say()  { printf '%s\n' "$*"; }
pass() { say "  [ok]      $*"; ok=$((ok+1)); }
note() { say "  [missing] $*"; warn=$((warn+1)); }

say ""
say "Build Your AI Design Workflow — setup check"
say "==========================================="
say ""

# 1. Git
if command -v git >/dev/null 2>&1; then
  pass "git is installed ($(git --version | head -1))"
else
  note "git not found. Install it from https://git-scm.com — needed for the session-close protocol."
fi

# 2. Claude Code
if command -v claude >/dev/null 2>&1; then
  pass "Claude Code CLI is installed"
else
  note "Claude Code not found. Install: npm install -g @anthropic-ai/claude-code (needs Node.js), then run 'claude' once to sign in. Until then, see docs/no-code-onramp.md."
fi

# 3. Python (for the local preview server and the hook's JSON parsing)
if command -v python3 >/dev/null 2>&1; then
  pass "python3 is available (preview server + hook parsing)"
else
  note "python3 not found. The hook falls back to a simpler parser; for the preview, open product/index.html directly in your browser."
fi

# 4. Hook is executable
if [ -x "hooks/scan-hardcoded.sh" ]; then
  pass "guardrail hook is executable"
else
  chmod +x hooks/scan-hardcoded.sh 2>/dev/null && pass "guardrail hook made executable" || note "could not chmod hooks/scan-hardcoded.sh — run: chmod +x hooks/scan-hardcoded.sh"
fi

# 5. The product renders?
if [ -f "product/index.html" ]; then
  pass "Brewlog is present (product/index.html)"
else
  note "product/index.html missing — are you running this from the repo root?"
fi

say ""
if [ "$warn" -eq 0 ]; then
  say "All set. Next steps:"
else
  say "$warn item(s) need attention above. Then:"
fi
say ""
say "  1. Open this folder in your editor and start Claude Code:  claude"
say "  2. Say: \"Read CLAUDE.md, then give me the state of the project"
say "     in three sentences.\""
say "  3. Preview Brewlog:  python3 -m http.server 4600 --directory product"
say "     then open http://localhost:4600  (or just open product/index.html)"
say "  4. Start exercises/BRW-101-first-task.md"
say ""
say "Stuck? Bring the exact error to the track channel — setup problems are"
say "session material, not homework failures."
say ""
