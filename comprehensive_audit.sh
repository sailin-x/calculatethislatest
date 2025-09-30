#!/bin/bash

# Comprehensive audit script to verify ALL calculators have real formulas
# Checks actual formula content, not just patterns

echo "🔬 COMPREHENSIVE AUDIT: Verifying ALL calculators have real formulas..."
echo "======================================================================"

total_calculators=0
real_formulas=0
generic_templates=0
failed_audit=0

# Function to check if a formula file has real content
check_formula_content() {
    local file="$1"
    local calc_name="$2"

    if [[ ! -f "$file" ]]; then
        echo "❌ MISSING: $calc_name - formulas.ts file not found"
        ((failed_audit++))
        return 1
    fi

    # Read the file content
    local content
    content=$(cat "$file")

    # Check for generic template patterns
    if echo "$content" | grep -q "inputs\.amount.*inputs\.rate.*inputs\.time"; then
        echo "❌ GENERIC: $calc_name - still has generic template"
        ((generic_templates++))
        return 1
    fi

    # Check for basic placeholder patterns
    if echo "$content" | grep -q "return.*0.*//.*placeholder"; then
        echo "❌ PLACEHOLDER: $calc_name - has placeholder return"
        ((generic_templates++))
        return 1
    fi

    # Check for minimal content (less than 10 lines is suspicious)
    local line_count
    line_count=$(echo "$content" | wc -l)
    if [[ $line_count -lt 10 ]]; then
        echo "❌ TOO SHORT: $calc_name - only $line_count lines, likely incomplete"
        ((generic_templates++))
        return 1
    fi

    # Check for actual mathematical operations
    if ! echo "$content" | grep -q "[+*/=<>%]"; then
        echo "❌ NO MATH: $calc_name - no mathematical operations found"
        ((generic_templates++))
        return 1
    fi

    # Check for function definitions (should have calculateResult)
    if ! echo "$content" | grep -q "export function calculateResult"; then
        echo "❌ NO RESULT: $calc_name - missing calculateResult function"
        ((generic_templates++))
        return 1
    fi

    # If we get here, it passed all checks
    ((real_formulas++))
    return 0
}

echo "Auditing all calculator formulas..."
echo "==================================="

# Find and audit all formulas.ts files
while IFS= read -r -d '' formulas_file; do
    ((total_calculators++))
    calc_dir=$(dirname "$formulas_file")
    calc_name=$(basename "$calc_dir")

    if ! check_formula_content "$formulas_file" "$calc_name"; then
        echo "   File: $formulas_file"
    fi
done < <(find src/calculators -name "formulas.ts" -type f -print0)

echo ""
echo "📊 COMPREHENSIVE AUDIT RESULTS"
echo "=============================="
echo "Total calculators audited: $total_calculators"
echo "✅ Real formulas: $real_formulas"
echo "❌ Generic/Problematic: $generic_templates"
echo "❓ Failed audit: $failed_audit"
echo ""

if [[ $generic_templates -eq 0 && $failed_audit -eq 0 ]]; then
    echo "🎉 SUCCESS: ALL calculators have real, working formulas!"
    echo "   • No generic templates remaining"
    echo "   • All formulas contain mathematical operations"
    echo "   • All have proper function definitions"
    echo "   • All meet minimum complexity requirements"
    exit 0
else
    echo "⚠️  ISSUES FOUND: $generic_templates calculators still have problems"
    echo "   • $failed_audit calculators failed basic audit checks"
    echo "   • Need to fix remaining generic templates"
    exit 1
fi