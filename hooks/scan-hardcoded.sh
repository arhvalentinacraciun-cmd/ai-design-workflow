#!/usr/bin/env bash
# =============================================================================
# GUARDRAIL — no-hardcoding scan (PostToolUse hook)
#
# Fires after every Write/Edit. If the written file is part of the product UI
# and contains literal style values (hex colors, px sizes, rgb()), the
# violations are sent back into the session so the AI fixes them immediately.
#
# This ~40-line script is the difference between a guideline and a guardrail:
# the rule in CLAUDE.md asks; this file enforces.
# =============================================================================

set -u

payload="$(cat)"

# Extract file_path from the hook's JSON payload (python3 if available,
# otherwise a best-effort sed).
if command -v python3 >/dev/null 2>&1; then
  file_path="$(printf '%s' "$payload" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null)"
else
  file_path="$(printf '%s' "$payload" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)"
fi

[ -z "${file_path}" ] && exit 0
[ -f "${file_path}" ] || exit 0

# Only scan product UI files...
case "${file_path}" in
  */product/*.css|*/product/*.html) ;;
  *) exit 0 ;;
esac

# ...but never the primitives file — that is WHERE literals live. Component
# tokens are scanned: they must point at primitives, never hold a raw value.
case "${file_path}" in
  */design-system/tokens.css) exit 0 ;;
esac

# Literal style values: hex colors, px numbers, rgb()/rgba().
# @media lines are exempt: custom properties don't work in media query
# conditions, so breakpoint literals are legitimate there.
violations="$(grep -nE '#[0-9a-fA-F]{3,8}\b|[0-9]+px|rgba?\(' "${file_path}" | grep -v 'var(--' | grep -v '@media' || true)"

if [ -n "${violations}" ]; then
  {
    echo "NO-HARDCODING RULE VIOLATION in ${file_path}:"
    echo "${violations}"
    echo ""
    echo "Every style value must flow through var(--token-name)."
    echo "Use an existing token from product/design-system/, or propose a new"
    echo "one — never a literal. See CLAUDE.md > Design Decisions."
  } >&2
  exit 2
fi

exit 0
