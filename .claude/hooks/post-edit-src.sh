#!/usr/bin/env bash
# PostToolUse hook for Write/Edit on src/**.
# Reads tool input JSON from stdin and, if the edited file is under src/,
# emits a reminder that nudges the agent to run the proactive review skills.

set -euo pipefail

payload="$(cat)"

# Extract file path. Works for Write (file_path) and Edit (file_path).
file_path="$(printf '%s' "$payload" | node -e "
let s='';process.stdin.on('data',c=>s+=c).on('end',()=>{
  try{const j=JSON.parse(s);const p=j.tool_input?.file_path||'';process.stdout.write(p);}catch{process.stdout.write('');}
});")"

if [[ -z "$file_path" ]]; then exit 0; fi

# Only fire for files under src/ in this project
case "$file_path" in
  */src/*) ;;
  *) exit 0 ;;
esac

# Skip generated, test, and config files
case "$file_path" in
  *.test.ts|*.test.tsx|*.spec.ts|*.spec.tsx) exit 0 ;;
  *.d.ts) exit 0 ;;
esac

cat <<EOF
[post-edit-src] Edited: $file_path
Before continuing, run the proactive review skills against this file:
  1. Invoke the \`clean-arch-check\` skill on $file_path — confirm no layer-boundary violations.
  2. Invoke the \`pattern-review\` skill on $file_path — only act if a high-confidence pattern smell exists; silence is the default.
Stay terse. If both skills are silent, say "clean" in one word and move on.
EOF
