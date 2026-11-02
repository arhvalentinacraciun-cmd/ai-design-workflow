#!/usr/bin/env bash
# =============================================================================
# Build Your AI Design Workflow — guided setup
# Checks your environment and tells you exactly what's missing. Safe to run
# as many times as you like; it changes nothing on your machine except
# making the guardrail scripts executable. It checks that the skills copy in
# .agents/skills/ matches .claude/skills/, and tells you how to fix it if not.
# =============================================================================

set -u

# Work from the repo folder, wherever this script was started from.
cd "$(dirname "$0")" || exit 1

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
#    Claude Code and every exercise is built there first.
if command -v claude >/dev/null 2>&1; then pass "Claude Code is installed";    agents="$agents claude"; fi
if command -v codex  >/dev/null 2>&1; then pass "Codex is installed";          agents="$agents codex";  fi
if command -v agy    >/dev/null 2>&1; then pass "Antigravity CLI is installed"; agents="$agents agy";    fi
if command -v grok   >/dev/null 2>&1; then pass "Grok Build is installed (wired from the documentation, untested)";     agents="$agents grok";   fi
if command -v gemini >/dev/null 2>&1; then pass "Gemini CLI is installed (wired from the documentation, untested)";     agents="$agents gemini"; fi
if [ -z "$agents" ]; then
  note "No coding agent found. Install one (any of these works, see docs/tools.md):"
  say "              Claude Code:      npm install -g @anthropic-ai/claude-code   (needs Node.js; Claude Pro or above)"
  say "              Codex:            npm install -g @openai/codex               (ChatGPT account, Free included)"
  say "              Antigravity CLI:  curl -fsSL https://antigravity.google/cli/install.sh | bash   (Google account, free)"
  say "              Grok Build:       curl -fsSL https://x.ai/cli/install.sh | bash   (X Plus or above, or an API key; wired from the documentation, untested)"
  say "              Then run it once in this folder to sign in. Until then, see docs/no-code-onramp.md."
fi

# 3. Node.js and npm. Claude Code and Codex install with npm, which comes
#    with Node.js. Once an agent is installed, Node.js can wait.
if command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
  pass "Node.js and npm are installed ($(node --version 2>/dev/null))"
elif [ -z "$agents" ]; then
  note "Node.js not found. Claude Code and Codex install with npm, which comes with Node.js."
  say "              Get the LTS version from https://nodejs.org, then open a new terminal and run this again."
else
  say "  [info]    Node.js not found. You only need it to install Claude Code or Codex with npm;"
  say "            your agent is already installed, so this can wait."
fi

# 4. Python 3, for the guardrail on every agent, the skills check and the
#    preview server. Tested for real: on Windows, "python3" is often a
#    Microsoft Store shortcut that only prints a message.
py=""
for candidate in "python3" "python" "py -3"; do
  if $candidate -c 'import sys; sys.exit(sys.version_info < (3,8))' >/dev/null 2>&1; then
    py="$candidate"
    break
  fi
done
if [ -n "$py" ]; then
  pass "Python 3 works as '$py' ($($py --version 2>&1))"
else
  note "Python 3 is not really installed. Typing python3 may find a command that does not run."
  say "              Get Python 3 from https://www.python.org/downloads/"
  say "              On Windows, tick \"Add python.exe to PATH\" on the first screen of the installer."
  say "              Until then the guardrail only works on Claude Code and Gemini CLI, and the"
  say "              skills check below is skipped."
fi

# 5. Guardrail scripts are executable
if [ -x "hooks/scan-hardcoded.sh" ] && [ -x "hooks/scan-hardcoded.py" ]; then
  pass "guardrail is executable"
else
  chmod +x hooks/scan-hardcoded.sh hooks/scan-hardcoded.py 2>/dev/null && pass "guardrail made executable" || note "could not chmod hooks/scan-hardcoded.* — run: chmod +x hooks/scan-hardcoded.sh hooks/scan-hardcoded.py"
fi

# 6. Skills: .claude/skills/ is the source, .agents/skills/ the copy that
#    Codex, Antigravity CLI and Gemini CLI read. Check only; nothing changes.
if [ -n "$py" ] && [ -f "hooks/sync-skills.py" ]; then
  if $py hooks/sync-skills.py --check >/dev/null 2>&1; then
    pass "skills copy is in step (.claude/skills/ -> .agents/skills/)"
  else
    note "skills copy is out of step. Run: $py hooks/sync-skills.py   (it says what it changed)"
  fi
fi

# 7. The product renders?
if [ -f "product/index.html" ]; then
  pass "Brewlog is present (product/index.html)"
else
  note "product/index.html is missing. The download may be incomplete: clone the repo again."
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
    claude) say "       claude    — accept the folder trust dialog; the guardrail is in .claude/settings.json"
            say "                   skills: type /session-2 (they live in .claude/skills/)" ;;
    codex)  say "       codex     — trust the folder, then in the 'Hooks need review' dialog choose 'Trust all and continue' (later: /hooks); the guardrail is in .codex/hooks.json"
            say "                   skills: type \$session-2, or /skills to pick one (read from .agents/skills/)" ;;
    agy)    say "       agy       — trust the folder; the guardrail is in .agents/hooks.json"
            say "                   skills: type /session-2 (read from .agents/skills/)" ;;
    grok)   say "       grok      — type /hooks-trust once; Grok Build reads the guardrail from .claude/settings.json. Wired from the documentation, untested: report what the hook says in the track's WhatsApp group (for mentees of the track) or as a GitHub issue"
            say "                   skills: type /session-2 (read from .claude/skills/; untested)" ;;
    gemini) say "       gemini    — trust the folder and confirm the hook warning once; the guardrail is in .gemini/settings.json. Wired from the documentation, untested: report what the hook says in the track's WhatsApp group (for mentees of the track) or as a GitHub issue"
            say "                   skills: picked when your request matches, after you allow it (read from .agents/skills/; untested)" ;;
  esac
done
[ -z "$agents" ] && say "       (install one of the agents above first)"
say "  2. Say: \"Read AGENTS.md, then give me the state of the project"
say "     in three sentences.\""
if [ -n "$py" ]; then
  say "  3. Preview Brewlog:  $py -m http.server 4600 --directory product"
  say "     then open http://localhost:4600  (or just open product/index.html)"
else
  say "  3. Preview Brewlog: open product/index.html in your browser"
fi
say "  4. Start exercises/BRW-101-first-task.md"
if [ -n "$py" ]; then
  say ""
  say "  Any time: $py hooks/scan-hardcoded.py --all"
  say "  checks every file in product/ for hard-coded style values at once."
fi
say ""
say "Stuck? Mentees: bring the exact error to the track's WhatsApp group (the link is"
say "in the pre-work email). Everyone else: open a GitHub issue. Setup problems are session material."
say ""

# Exit 1 when anything above is missing, so a script or an agent can tell.
[ "$warn" -eq 0 ] || exit 1
exit 0
