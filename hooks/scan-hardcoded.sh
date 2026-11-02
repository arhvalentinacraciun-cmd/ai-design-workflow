#!/usr/bin/env bash
# =============================================================================
# GUARDRAIL: entry point for every coding agent's hook config.
#
# Hands the agent's payload (JSON on stdin) to scan-hardcoded.py, which holds
# the scanner and one adapter per tool. Read that file: it is the difference
# between a guideline and a guardrail. The rule in AGENTS.md asks; this
# enforces.
#
# Python 3.8 or newer is tested for real, as python3, then python, then
# py -3. (On Windows, "python3" can be a Microsoft Store shortcut that only
# prints a message, so finding the command is not enough.)
#
# Without a working Python there is a smaller fallback below. It covers less:
#   - only the Claude Code and Gemini CLI payload (a file_path field), so
#     Codex, Antigravity and Grok Build get no check at all;
#   - only macOS and Linux paths (no Windows paths);
#   - if grep itself fails, the edit passes unchecked.
# For what it does cover, it applies the same rules as scan-hardcoded.py.
# Gemini CLI: wired from the documentation, untested.
# =============================================================================

set -u
here="$(cd "$(dirname "$0")" && pwd)"

for py in "python3" "python" "py -3"; do
  if $py -c 'import sys; sys.exit(sys.version_info < (3,8))' >/dev/null 2>&1; then
    exec $py "$here/scan-hardcoded.py"
  fi
done

payload="$(cat)"
file_path="$(printf '%s' "$payload" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)"
[ -z "${file_path}" ] && exit 0
[ -f "${file_path}" ] || exit 0
case "${file_path}" in
  */product/*.css|*/product/*.html|product/*.css|product/*.html) ;;
  *) exit 0 ;;
esac
case "${file_path}" in
  */design-system/tokens.css) exit 0 ;;
esac

# The same clean-up as scan() in scan-hardcoded.py, line by line:
#   on an @media line, drop the condition before the first {
#   take out token names, so var(--space-2) leaves ")"
#   take the # off an HTML entity (&#215;), a link (href="#fade"), url(#glow)
# then look for a literal and print the original line with its number.
cleaned="$(sed -E \
  -e '/@media/s/^[^{]*//' \
  -e 's/var\([[:space:]]*--[A-Za-z0-9_-]+//g' \
  -e "s/(&|href=[\"']|url\\([\"']?)#/\\1/g" \
  "${file_path}")"
numbers="$(printf '%s\n' "${cleaned}" | grep -nE '#[0-9a-fA-F]{3,8}\b|[0-9]+px|rgba?\(|hsla?\(' | cut -d: -f1 || true)"

if [ -n "${numbers}" ]; then
  {
    echo "NO-HARDCODING RULE VIOLATION in ${file_path}:"
    for n in ${numbers}; do
      printf '%s:%s\n' "${n}" "$(sed -n "${n}p" "${file_path}")"
    done
    echo ""
    echo "Style values in product/ come from var(--token-name) only."
    echo "Use an existing token from product/design-system/, or propose a new"
    echo "one, never a literal. See AGENTS.md > Design Decisions."
  } >&2
  exit 2
fi
exit 0
