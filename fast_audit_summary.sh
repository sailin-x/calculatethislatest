#!/bin/bash

# FAST AUDIT SUMMARY - Count results without detailed output

echo "⚡ FAST AUDIT SUMMARY - ALL CALCULATORS"
echo "======================================"

TOTAL_CALCULATORS=$(find src/calculators -name "*Calculator.ts" -type f | wc -l)
echo "Total calculators found: $TOTAL_CALCULATORS"

# Count working calculators (those with all required files)
WORKING_CALCULATORS=0
BROKEN_CALCULATORS=0
DUPLICATE_NAMES=0

# Track seen names for duplicates
seen_file="/tmp/seen_names_$$.txt"
touch "$seen_file"

while IFS= read -r calc_file; do
    calc_dir=$(dirname "$calc_file")
    calc_name=$(basename "$calc_dir")

    # Check for duplicates
    if grep -q "^$calc_name$" "$seen_file"; then
        ((DUPLICATE_NAMES++))
    else
        echo "$calc_name" >> "$seen_file"
    fi

    # Check if all required files exist
    required_files=("types.ts" "formulas.ts" "validation.ts" "quickValidation.ts" "${calc_name}Calculator.ts" "${calc_name}Calculator.test.ts" "register.ts" "index.ts")
    all_files_exist=true

    for file in "${required_files[@]}"; do
        if [[ ! -f "$calc_dir/$file" ]]; then
            all_files_exist=false
            break
        fi
    done

    if [[ "$all_files_exist" == "true" ]]; then
        ((WORKING_CALCULATORS++))
    else
        ((BROKEN_CALCULATORS++))
    fi
done < <(find src/calculators -name "*Calculator.ts" -type f)

# Clean up
rm -f "$seen_file"

echo ""
echo "📊 RESULTS:"
echo "✅ Working calculators (all files present): $WORKING_CALCULATORS"
echo "❌ Broken calculators (missing files): $BROKEN_CALCULATORS"
echo "🔄 Duplicate names: $DUPLICATE_NAMES"
echo ""

if [[ $WORKING_CALCULATORS -gt 0 ]]; then
    success_rate=$((WORKING_CALCULATORS * 100 / TOTAL_CALCULATORS))
    echo "🎯 SUCCESS RATE: ${success_rate}%"
fi

echo ""
echo "📋 SUMMARY COMPLETE - $(date)"