#!/usr/bin/env bash
# =============================================================================
# GUARDRAIL — entry point for every coding agent's hook config.
#
# Hands the agent's payload (JSON on stdin) to scan-hardcoded.py, which holds
# the scanner and one adapter per tool. Read that file: it is the difference
# between a guideline and a guardrail. The rule in AGENTS.md asks; this
# enforces.
#
# Without python3 there is a smaller fallback below: it understands only the
# Claude Code / Gemini CLI payload (a file_path field) and prints violations
# the way those two tools expect.
# =============================================================================

set -u
here="$(cd "$(dirname "$0")" && pwd)"

if command -v python3 >/dev/null 2>&1; then
  exec python3 "$here/scan-hardcoded.py"
fi

payload="$(cat)"
file_path="$(printf '%s' "$payload" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)"
[ -z "${file_path}" ] && exit 0
[ -f "${file_path}" ] || exit 0
case "${file_path}" in
  */product/*.css|*/product/*.html) ;;
  *) exit 0 ;;
esac
case "${file_path}" in
  */design-system/tokens.css) exit 0 ;;
esac
violations="$(grep -nE '#[0-9a-fA-F]{3,8}\b|[0-9]+px|rgba?\(' "${file_path}" | grep -v 'var(--' | grep -v '@media' || true)"
if [ -n "${violations}" ]; then
  {
    echo "NO-HARDCODING RULE VIOLATION in ${file_path}:"
    echo "${violations}"
    echo ""
    echo "Every style value must flow through var(--token-name)."
    echo "Use an existing token from product/design-system/, or propose a new"
    echo "one, never a literal. See AGENTS.md > Design Decisions."
  } >&2
  exit 2
fi
exit 0
