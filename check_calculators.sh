#!/bin/bash

# Script to check which calculator directories are missing files

echo "Checking calculator directories..."

find src/calculators -type d -mindepth 2 | while read dir; do
  # Get calculator name from directory
  calc_name=$(basename "$dir")
  # Remove -calculator suffix
  calc_base=$(echo "$calc_name" | sed 's/-calculator$//')
  # Convert to PascalCase for Calculator file
  calc_class=$(echo "$calc_base" | sed 's/-/\n/g' | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}' | tr -d '\n')Calculator

  files=(
    "index.ts"
    "register.ts"
    "types.ts"
    "formulas.ts"
    "validation.ts"
    "quickValidation.ts"
    "${calc_class}.ts"
    "${calc_class}.test.ts"
  )

  missing=()
  for file in "${files[@]}"; do
    if [ ! -f "$dir/$file" ]; then
      missing+=("$file")
    fi
  done

  if [ ${#missing[@]} -gt 0 ]; then
    echo "$dir missing: ${missing[*]}"
  fi
done

echo "Done."