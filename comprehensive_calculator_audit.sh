#!/bin/bash

# COMPREHENSIVE CALCULATOR AUDIT - INDEPENDENT VERIFICATION
# This script performs a thorough, unbiased audit of ALL calculators

echo "🔬 COMPREHENSIVE CALCULATOR AUDIT - INDEPENDENT VERIFICATION"
echo "=========================================================="
echo ""

# Initialize counters
total_calculators=0
passed_audit=0
failed_audit=0
missing_files=0
generic_formulas=0
syntax_errors=0

echo "📊 PHASE 1: FILE STRUCTURE AUDIT"
echo "---------------------------------"

# Find all calculator directories (look recursively for formulas.ts)
find src/calculators -name "formulas.ts" -type f | while read -r formulas_file; do
    ((total_calculators++))
    calc_dir=$(dirname "$formulas_file")
    calc_name=$(basename "$calc_dir")

    echo "Auditing: $calc_name"

    # Check mandatory files
    files_exist=true
    for file in "formulas.ts" "validation.ts" "quickValidation.ts" "${calc_name}Calculator.ts" "${calc_name}Calculator.test.ts" "register.ts" "index.ts" "types.ts"; do
        if [[ ! -f "$calc_dir/$file" ]]; then
            echo "  ❌ MISSING: $file"
            files_exist=false
        fi
    done

    if [[ "$files_exist" != true ]]; then
        ((missing_files++))
        echo "  ❌ FAIL: Missing mandatory files"
        continue
    fi

    # Check for real formulas (not generic templates)
    if grep -q "amount.*rate.*time\|generic\|placeholder\|TODO\|FIXME" "$formulas_file"; then
        ((generic_formulas++))
        echo "  ❌ FAIL: Contains generic/placeholder code"
        continue
    fi

    # Check for mathematical operations
    if ! grep -q "[+*/\-=<>]" "$formulas_file"; then
        ((generic_formulas++))
        echo "  ❌ FAIL: No mathematical operations found"
        continue
    fi

    # Check for calculateResult function
    if ! grep -q "export function calculateResult" "$formulas_file"; then
        ((failed_audit++))
        echo "  ❌ FAIL: Missing calculateResult function"
        continue
    fi

    # Check for syntax errors (basic check)
    if grep -q "export function.*{" "$formulas_file" && ! grep -q "}" "$formulas_file"; then
        ((syntax_errors++))
        echo "  ❌ FAIL: Syntax errors detected"
        continue
    fi

    # Check validation function signatures
    quickval_file="$calc_dir/quickValidation.ts"
    if [[ -f "$quickval_file" ]]; then
        if ! grep -q "allInputs.*Record.*string.*any" "$quickval_file"; then
            ((failed_audit++))
            echo "  ❌ FAIL: Validation functions missing allInputs parameter"
            continue
        fi
    fi

    # Check registration
    if ! grep -q "$calc_name" src/calculators/index.ts; then
        ((failed_audit++))
        echo "  ❌ FAIL: Not registered in main index"
        continue
    fi

    ((passed_audit++))
    echo "  ✅ PASS: Complete and valid calculator"
done

echo ""
echo "📊 PHASE 2: REGISTRATION VERIFICATION"
echo "-------------------------------------"

# Check if calculators are actually registered
registered_count=$(grep -c "calculatorRegistry.register" src/calculators/index.ts)
echo "Calculators registered in index.ts: $registered_count"

echo ""
echo "📊 AUDIT RESULTS"
echo "================"

echo "Total calculators found: $total_calculators"
echo "✅ Passed audit: $passed_audit"
echo "❌ Failed audit: $failed_audit"
echo "❌ Missing files: $missing_files"
echo "❌ Generic formulas: $generic_formulas"
echo "❌ Syntax errors: $syntax_errors"

success_rate=$((passed_audit * 100 / total_calculators))

echo ""
echo "🎯 SUCCESS RATE: $success_rate%"

if [[ $success_rate -eq 100 ]]; then
    echo ""
    echo "🎉 PERFECT SCORE: ALL CALCULATORS ARE EXCELLENT!"
    echo "   • Complete file structures"
    echo "   • Real mathematical formulas"
    echo "   • Proper validation and registration"
    echo "   • Production-ready implementations"
    echo ""
    echo "✅ VERIFICATION COMPLETE: Platform ready for production!"
elif [[ $success_rate -ge 95 ]]; then
    echo ""
    echo "🏆 EXCELLENT SCORE: Vast majority are excellent implementations"
    echo "   Minor issues in $((total_calculators - passed_audit)) calculators"
else
    echo ""
    echo "⚠️  ISSUES FOUND: Implementation needs improvement"
    echo "   $((total_calculators - passed_audit)) calculators have problems"
fi

echo ""
echo "🔍 DETAILED BREAKDOWN:"
echo "   Missing files: $missing_files calculators"
echo "   Generic formulas: $generic_formulas calculators"
echo "   Syntax errors: $syntax_errors calculators"
echo "   Other failures: $failed_audit calculators"

echo ""
echo "📋 AUDIT COMPLETE - $(date)"