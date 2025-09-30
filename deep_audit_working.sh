#!/bin/bash

# DEEP AUDIT - Check strict MD criteria for working calculators only

echo "🔬 DEEP AUDIT - STRICT MD CRITERIA FOR WORKING CALCULATORS"
echo "========================================================="

WORKING_COUNT=0
PASSING_COUNT=0
FAILING_COUNT=0

# Only audit calculators that have all required files
find src/calculators -name "*Calculator.ts" -type f | while read -r calc_file; do
    calc_dir=$(dirname "$calc_file")
    calc_name=$(basename "$calc_dir")

    # Quick check - skip if missing any required files
    required_files=("types.ts" "formulas.ts" "validation.ts" "quickValidation.ts" "${calc_name}Calculator.ts" "${calc_name}Calculator.test.ts" "register.ts" "index.ts")
    all_files_exist=true

    for file in "${required_files[@]}"; do
        if [[ ! -f "$calc_dir/$file" ]]; then
            all_files_exist=false
            break
        fi
    done

    if [[ "$all_files_exist" != "true" ]]; then
        continue
    fi

    ((WORKING_COUNT++))
    passed=true
    failure_reasons=""

    echo "Deep auditing: $calc_name"

    # Check 2: Formulas are NOT generic (must contain domain-specific calculations)
    if [[ -f "$calc_dir/formulas.ts" ]]; then
        # Check for generic patterns that indicate placeholder code
        if grep -q "Basic calculation - customize based on calculator type" "$calc_dir/formulas.ts" || \
           grep -q "inputs.value \*\ inputs.rate" "$calc_dir/formulas.ts" || \
           grep -q "inputs.amount \*\ inputs.quantity" "$calc_dir/formulas.ts" || \
           ! grep -q "export function [a-zA-Z_][a-zA-Z0-9_]*(" "$calc_dir/formulas.ts"; then
            passed=false
            failure_reasons="${failure_reasons}❌ GENERIC: Formulas contain placeholder/generic code
"
        fi

        # Check for actual mathematical operations
        if ! grep -q "Math\." "$calc_dir/formulas.ts" && \
           ! grep -q "[+\-*/^]" "$calc_dir/formulas.ts" && \
           ! grep -q "calculate[A-Z]" "$calc_dir/formulas.ts"; then
            passed=false
            failure_reasons="${failure_reasons}❌ NO MATH: No mathematical operations found
"
        fi
    fi

    # Check 3: TypeScript syntax is valid
    for ts_file in "$calc_dir"/*.ts; do
        if [[ -f "$ts_file" ]]; then
            # Check for unbalanced braces
            local brace_count=$(grep -o '{' "$ts_file" | wc -l)
            local close_brace_count=$(grep -o '}' "$ts_file" | wc -l)
            if [[ $brace_count -ne $close_brace_count ]]; then
                passed=false
                failure_reasons="${failure_reasons}❌ SYNTAX: Unbalanced braces in $(basename "$ts_file")
"
            fi

            # Check for TypeScript interface definitions
            if [[ "$ts_file" == *"types.ts" ]] && ! grep -q "export interface.*{" "$ts_file"; then
                passed=false
                failure_reasons="${failure_reasons}❌ TYPES: No TypeScript interfaces in types.ts
"
            fi
        fi
    done

    # Check 4: Validation logic exists
    if [[ -f "$calc_dir/validation.ts" ]]; then
        if ! grep -q "validate\|error\|invalid" "$calc_dir/validation.ts"; then
            passed=false
            failure_reasons="${failure_reasons}❌ VALIDATION: No validation logic found
"
        fi
    fi

    # Check 5: Unit tests exist and are meaningful
    if [[ -f "$calc_dir/${calc_name}Calculator.test.ts" ]]; then
        if ! grep -q "describe\|it\|test\|expect" "$calc_dir/${calc_name}Calculator.test.ts"; then
            passed=false
            failure_reasons="${failure_reasons}❌ TESTS: No proper test structure
"
        fi
    fi

    # Result
    if [[ "$passed" == "true" ]]; then
        echo "  ✅ PASS: Meets strict MD criteria"
        ((PASSING_COUNT++))
    else
        echo "  ❌ FAIL: Issues found"
        echo "$failure_reasons"
        ((FAILING_COUNT++))
    fi
    echo ""
done

echo ""
echo "📊 DEEP AUDIT RESULTS"
echo "===================="
echo "Working calculators audited: $WORKING_COUNT"
echo "✅ Pass strict MD criteria: $PASSING_COUNT"
echo "❌ Fail strict MD criteria: $FAILING_COUNT"

if [[ $WORKING_COUNT -gt 0 ]]; then
    success_rate=$((PASSING_COUNT * 100 / WORKING_COUNT))
    echo "🎯 STRICT MD COMPLIANCE RATE: ${success_rate}%"
fi

echo ""
if [[ $FAILING_COUNT -eq 0 ]]; then
    echo "🏆 ALL WORKING CALCULATORS MEET STRICT MD CRITERIA!"
    echo "   You are indeed a fucking king! 👑"
else
    echo "💥 SOME CALCULATORS FAIL TO MEET STRICT MD CRITERIA"
    echo "   $FAILING_COUNT calculators need fixes"
fi

echo ""
echo "📋 DEEP AUDIT COMPLETE - $(date)"