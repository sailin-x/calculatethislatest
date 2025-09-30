#!/bin/bash

# COMPREHENSIVE STRICT AUDIT - MD Criteria Compliance Check
# Verifies ALL calculators meet strict requirements

echo "🔬 COMPREHENSIVE STRICT AUDIT - MD CRITERIA COMPLIANCE"
echo "===================================================="
echo ""

TOTAL_CALCULATORS=0
PASSING_CALCULATORS=0
FAILING_CALCULATORS=0

# Initialize failure counters
FAIL_missing_files=0
FAIL_generic_formulas=0
FAIL_syntax_errors=0
FAIL_no_types=0
FAIL_no_validation=0
FAIL_no_tests=0
FAIL_no_registration=0
FAIL_broken_imports=0

audit_calculator() {
    local calc_dir="$1"
    local calc_name=$(basename "$calc_dir")
    ((TOTAL_CALCULATORS++))

    echo "Auditing: $calc_name"

    local passed=true
    local failure_reasons=""

    # Check 1: All mandatory files exist
    # Convert kebab-case to PascalCase for file names
    local pascal_name=$(echo "$calc_name" | sed 's/-/ /g' | sed 's/\b\w/\U&/g' | sed 's/ //g')
    local required_files=("types.ts" "formulas.ts" "validation.ts" "quickValidation.ts" "${pascal_name}Calculator.ts" "${pascal_name}Calculator.test.ts" "register.ts" "index.ts")
    for file in "${required_files[@]}"; do
        if [[ ! -f "$calc_dir/$file" ]]; then
            passed=false
            failure_reasons+="❌ MISSING: $file"$'\n'
            ((FAIL_missing_files++))
        fi
    done

    # Check 2: Formulas are NOT generic (must contain domain-specific calculations)
    if [[ -f "$calc_dir/formulas.ts" ]]; then
        local formula_content=$(cat "$calc_dir/formulas.ts")

        # Check for generic patterns that indicate placeholder code
        if grep -q "Basic calculation - customize based on calculator type" "$calc_dir/formulas.ts" || \
           grep -q "inputs.value \*\ inputs.rate" "$calc_dir/formulas.ts" || \
           grep -q "inputs.amount \*\ inputs.quantity" "$calc_dir/formulas.ts" || \
           ! grep -q "export function [a-zA-Z_][a-zA-Z0-9_]*(" "$calc_dir/formulas.ts"; then
            passed=false
            failure_reasons+="❌ GENERIC: Formulas contain placeholder/generic code"$'\n'
            ((FAIL_generic_formulas++))
        fi

        # Check for actual mathematical operations
        if ! grep -q "Math\." "$calc_dir/formulas.ts" && \
           ! grep -q "[+\-*/^]" "$calc_dir/formulas.ts" && \
           ! grep -q "calculate[A-Z]" "$calc_dir/formulas.ts"; then
            passed=false
            failure_reasons+="❌ NO MATH: No mathematical operations found"$'\n'
            ((FAIL_generic_formulas++))
        fi
    fi

    # Check 3: TypeScript syntax is valid
    for ts_file in "$calc_dir"/*.ts; do
        if [[ -f "$ts_file" ]]; then
            # Basic syntax check - look for common TypeScript errors
            if grep -q "import.*from.*;" "$ts_file" && ! grep -q "export" "$ts_file"; then
                # Allow files that are just imports/exports
                continue
            fi

            # Check for unbalanced braces, missing semicolons, etc.
            local brace_count=$(grep -o '{' "$ts_file" | wc -l)
            local close_brace_count=$(grep -o '}' "$ts_file" | wc -l)
            if [[ $brace_count -ne $close_brace_count ]]; then
                passed=false
                failure_reasons+="❌ SYNTAX: Unbalanced braces in $(basename "$ts_file")"$'\n'
                ((FAIL_syntax_errors++))
            fi

            # Check for TypeScript interface definitions
            if [[ "$ts_file" == *"types.ts" ]] && ! grep -q "export interface.*{" "$ts_file"; then
                passed=false
                failure_reasons+="❌ TYPES: No TypeScript interfaces in types.ts"$'\n'
                ((FAIL_no_types++))
            fi
        fi
    done

    # Check 4: Validation logic exists
    if [[ -f "$calc_dir/validation.ts" ]]; then
        local validation_content=$(cat "$calc_dir/validation.ts")
        if ! grep -q "validate\|error\|invalid" "$calc_dir/validation.ts"; then
            passed=false
            failure_reasons+="❌ VALIDATION: No validation logic found"$'\n'
            ((FAIL_no_validation++))
        fi
    fi

    # Check 5: Unit tests exist and are meaningful
    if [[ -f "$calc_dir/${calc_name}Calculator.test.ts" ]]; then
        local test_content=$(cat "$calc_dir/${calc_name}Calculator.test.ts")
        if ! grep -q "describe\|it\|test\|expect" "$calc_dir/${calc_name}Calculator.test.ts"; then
            passed=false
            failure_reasons+="❌ TESTS: No proper test structure"$'\n'
            ((FAIL_no_tests++))
        fi
    fi

    # Check 6: Calculator is registered in index.ts
    # Check if the import path exists in index.ts
    if ! grep -q "$calc_name" src/calculators/index.ts 2>/dev/null; then
        passed=false
        failure_reasons+="❌ REGISTRATION: Not registered in index.ts"$'\n'
        ((FAIL_no_registration++))
    fi

    # Check 7: Import statements are valid
    if [[ -f "$calc_dir/${calc_name}Calculator.ts" ]]; then
        local import_lines=$(grep "^import" "$calc_dir/${calc_name}Calculator.ts" 2>/dev/null || true)
        if [[ -n "$import_lines" ]]; then
            while IFS= read -r line; do
                # Check for malformed imports
                if echo "$line" | grep -q "from ['./\"]" && ! echo "$line" | sed "s|.*from ['\"]\./||;s|['\"].*||" | xargs -I {} test -f "$calc_dir/{}"; then
                    passed=false
                    failure_reasons="${failure_reasons}❌ IMPORTS: Broken relative import: $line
"
                    ((FAIL_broken_imports++))
                fi
            done <<< "$import_lines"
        fi
    fi

    # Result
    if [[ "$passed" == "true" ]]; then
        echo "  ✅ PASS: Complete and valid calculator"
        ((PASSING_CALCULATORS++))
    else
        echo "  ❌ FAIL: Issues found"
        echo "$failure_reasons"
        ((FAILING_CALCULATORS++))
    fi
    echo ""
}

# Main audit process
echo "📊 PHASE 1: COMPREHENSIVE CALCULATOR AUDIT (ALL CALCULATORS)"
echo "-----------------------------------------------------------"

# Track seen calculator names to detect duplicates
seen_calculators_file="/tmp/seen_calculators_$$.txt"
touch "$seen_calculators_file"

# Find ALL calculator directories (not just imported ones)
find src/calculators -name "*Calculator.ts" -type f | while read -r calc_file; do
    calc_dir=$(dirname "$calc_file")
    calc_name=$(basename "$calc_dir")

    # Check for duplicates
    if grep -q "^$calc_name:" "$seen_calculators_file"; then
        original_dir=$(grep "^$calc_name:" "$seen_calculators_file" | cut -d: -f2)
        echo "Auditing: $calc_name"
        echo "  ❌ FAIL: DUPLICATE calculator name found!"
        echo "    Original: $original_dir"
        echo "    Duplicate: $calc_dir"
        ((FAILING_CALCULATORS++))
        echo ""
        continue
    else
        echo "$calc_name:$calc_dir" >> "$seen_calculators_file"
    fi

    audit_calculator "$calc_dir"
done

# Clean up
rm -f "$seen_calculators_file"

echo ""
echo "📊 AUDIT RESULTS"
echo "================"
echo "Total calculators audited: $TOTAL_CALCULATORS"
echo "✅ Passed audit: $PASSING_CALCULATORS"
echo "❌ Failed audit: $FAILING_CALCULATORS"
echo ""

if [[ $TOTAL_CALCULATORS -gt 0 ]]; then
    success_rate=$((PASSING_CALCULATORS * 100 / TOTAL_CALCULATORS))
    echo "🎯 SUCCESS RATE: ${success_rate}%"
else
    echo "🎯 SUCCESS RATE: 0% (no calculators found)"
fi

echo ""
echo "⚠️  FAILURE BREAKDOWN:"
if [[ $FAIL_missing_files -gt 0 ]]; then
    echo "   Missing mandatory files: $FAIL_missing_files calculators"
fi
if [[ $FAIL_generic_formulas -gt 0 ]]; then
    echo "   Generic/placeholder formulas: $FAIL_generic_formulas calculators"
fi
if [[ $FAIL_syntax_errors -gt 0 ]]; then
    echo "   TypeScript syntax errors: $FAIL_syntax_errors calculators"
fi
if [[ $FAIL_no_types -gt 0 ]]; then
    echo "   Missing type definitions: $FAIL_no_types calculators"
fi
if [[ $FAIL_no_validation -gt 0 ]]; then
    echo "   Missing validation logic: $FAIL_no_validation calculators"
fi
if [[ $FAIL_no_tests -gt 0 ]]; then
    echo "   Missing unit tests: $FAIL_no_tests calculators"
fi
if [[ $FAIL_no_registration -gt 0 ]]; then
    echo "   Not registered in index.ts: $FAIL_no_registration calculators"
fi
if [[ $FAIL_broken_imports -gt 0 ]]; then
    echo "   Broken import statements: $FAIL_broken_imports calculators"
fi

echo ""
if [[ $FAILING_CALCULATORS -eq 0 ]]; then
    echo "🏆 ALL CALCULATORS PASS STRICT MD CRITERIA!"
    echo "   You are indeed a fucking king! 👑"
else
    echo "💥 CALCULATORS FAIL TO MEET STRICT MD CRITERIA"
    echo "   $FAILING_CALCULATORS calculators need fixes"
fi

echo ""
echo "📋 AUDIT COMPLETE - $(date)"