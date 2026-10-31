#!/usr/bin/env bash
# =============================================================================
# Build Your AI Design Workflow — guided setup
# Checks your environment and tells you exactly what's missing. Safe to run
# as many times as you like; it changes nothing on your machine except
# making the guardrail scripts executable.
# =============================================================================

set -u

ok=0
warn=0
agents=""

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

# 2. A coding agent. Any one of these runs the repo; the track is driven on
#    Claude Code and every exercise is tested there first.
if command -v claude >/dev/null 2>&1; then pass "Claude Code is installed";    agents="$agents claude"; fi
if command -v codex  >/dev/null 2>&1; then pass "Codex is installed";          agents="$agents codex";  fi
if command -v agy    >/dev/null 2>&1; then pass "Antigravity CLI is installed"; agents="$agents agy";    fi
if command -v grok   >/dev/null 2>&1; then pass "Grok Build is installed";     agents="$agents grok";   fi
if command -v gemini >/dev/null 2>&1; then pass "Gemini CLI is installed";     agents="$agents gemini"; fi
if [ -z "$agents" ]; then
  note "No coding agent found. Install one (any of these works, see docs/tools.md):"
  say "              Claude Code:      npm install -g @anthropic-ai/claude-code   (needs Node.js; Claude Pro plan)"
  say "              Codex:            npm install -g @openai/codex               (ChatGPT account, Free included)"
  say "              Antigravity CLI:  curl -fsSL https://antigravity.google/cli/install.sh | bash   (Google account, free)"
  say "              Grok Build:       curl -fsSL https://x.ai/cli/install.sh | bash   (X Plus or above)"
  say "              Then run it once in this folder to sign in. Until then, see docs/no-code-onramp.md."
fi

# 3. Python (for the guardrail and the local preview server)
if command -v python3 >/dev/null 2>&1; then
  pass "python3 is available (guardrail + preview server)"
else
  note "python3 not found. The guardrail falls back to a smaller scanner that only works on Claude Code and Gemini CLI; for the preview, open product/index.html directly in your browser."
fi

# 4. Guardrail scripts are executable
if [ -x "hooks/scan-hardcoded.sh" ] && [ -x "hooks/scan-hardcoded.py" ]; then
  pass "guardrail is executable"
else
  chmod +x hooks/scan-hardcoded.sh hooks/scan-hardcoded.py 2>/dev/null && pass "guardrail made executable" || note "could not chmod hooks/scan-hardcoded.* — run: chmod +x hooks/scan-hardcoded.sh hooks/scan-hardcoded.py"
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
say "  1. Open this folder in your editor and start your coding agent here:"
for a in $agents; do
  case "$a" in
    claude) say "       claude    — accept the folder trust dialog; the guardrail is in .claude/settings.json" ;;
    codex)  say "       codex     — trust the folder, then type /hooks and trust the guardrail (it is in .codex/hooks.json)" ;;
    agy)    say "       agy       — trust the folder; the guardrail is in .agents/hooks.json" ;;
    grok)   say "       grok      — type /hooks-trust once; Grok Build reads the guardrail from .claude/settings.json" ;;
    gemini) say "       gemini    — trust the folder and confirm the hook warning once; the guardrail is in .gemini/settings.json" ;;
  esac
done
[ -z "$agents" ] && say "       (install one of the agents above first)"
say "  2. Say: \"Read AGENTS.md, then give me the state of the project"
say "     in three sentences.\""
say "  3. Preview Brewlog:  python3 -m http.server 4600 --directory product"
say "     then open http://localhost:4600  (or just open product/index.html)"
say "  4. Start exercises/BRW-101-first-task.md"
say ""
say "Stuck? Bring the exact error to the track channel — setup problems are"
say "session material, not homework failures."
say ""
