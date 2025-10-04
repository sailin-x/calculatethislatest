#!/bin/bash

md_file='calculator-list-CORRECTED.md'

lines_to_change=()

while IFS= read -r line; do
  line_num=$(echo "$line" | cut -d: -f1)
  content=$(echo "$line" | cut -d: -f2-)
  name=$(echo "$content" | sed 's/.*\[x\] \*\*\([^**]*\)\*\*.*/\1/')
  base_name=$(echo "$name" | sed 's/ Calculator$//')
  dir_name=$(echo "$base_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
  dir_path="src/calculators/finance/$dir_name"
  incomplete=0
  if [ ! -d "$dir_path" ]; then
    incomplete=1
  else
    if ! ls "$dir_path"/*Calculator.ts 1> /dev/null 2>&1; then
      incomplete=1
    fi
    if ! ls "$dir_path"/*Calculator.test.ts 1> /dev/null 2>&1; then
      incomplete=1
    fi
    for file in formulas.ts validation.ts quickValidation.ts register.ts index.ts; do
      if [ ! -f "$dir_path/$file" ]; then
        incomplete=1
        break
      fi
    done
  fi
  if [ $incomplete -eq 1 ]; then
    lines_to_change+=("$line_num")
  fi
done < <(grep -n "\[x\]" "$md_file")

for line_num in "${lines_to_change[@]}"; do
  sed -i "${line_num}s/\[x\]/[ ]/" "$md_file"
done

echo "Changed lines: ${lines_to_change[*]}"
