#!/bin/bash

# Comprehensive audit script to verify all calculators have real domain-specific formulas
# Checks for generic templates vs actual mathematical/business logic

echo "🔍 Starting comprehensive calculator formula audit..."
echo "=================================================="

# Initialize counters
total_calculators=0
real_calculators=0
generic_calculators=0
unknown_calculators=0

# Arrays to track results
real_list=()
generic_list=()
unknown_list=()

# Function to check if a calculator has real formulas
check_calculator_formulas() {
    local formulas_file="$1"
    local calc_name="$2"

    ((total_calculators++))

    # Check if file exists
    if [[ ! -f "$formulas_file" ]]; then
        echo "❌ MISSING: $calc_name (no formulas.ts file)"
        unknown_list+=("$calc_name:MISSING")
        ((unknown_calculators++))
        return
    fi

    # Read the formulas file
    local content
    content=$(cat "$formulas_file")

    # Check for generic template pattern
    if echo "$content" | grep -q "inputs.amount.*inputs.rate.*inputs.time"; then
        echo "❌ GENERIC: $calc_name (still has amount * rate * time template)"
        generic_list+=("$calc_name")
        ((generic_calculators++))
        return
    fi

    # Check for real domain-specific formulas
    local has_real_formulas=false

    # Finance formulas
    if echo "$content" | grep -q -E "(calculateMonthlyPayment|calculateLTC|calculateAdvanceRate|calculateBMI|calculateAverageGlucose|factorial|calculatePermutations|calculateCombinations)"; then
        has_real_formulas=true
    fi

    # Math operations
    if echo "$content" | grep -q -E "(Math\.|sqrt\(|pow\(|log\(|exp\(|sin\(|cos\(|tan\()"; then
        has_real_formulas=true
    fi

    # Business logic patterns
    if echo "$content" | grep -q -E "(if.*riskLevel|recommendation.*=|category.*=|analysis.*=|metrics.*)"; then
        has_real_formulas=true
    fi

    # Domain-specific keywords
    if echo "$content" | grep -q -E "(borrowingBase|advanceRate|amortization|hemoglobin|glucose|permutations|combinations|factorial)"; then
        has_real_formulas=true
    fi

    if [[ "$has_real_formulas" == true ]]; then
        echo "✅ REAL: $calc_name"
        real_list+=("$calc_name")
        ((real_calculators++))
    else
        echo "❓ UNKNOWN: $calc_name (no clear domain-specific patterns detected)"
        unknown_list+=("$calc_name:UNKNOWN")
        ((unknown_calculators++))
    fi
}

# Audit all calculators
echo "Auditing all calculator formulas..."
echo ""

find src/calculators -name "formulas.ts" -type f | sort | while read -r formulas_file; do
    # Extract calculator name from path
    calc_name=$(echo "$formulas_file" | sed 's|.*/calculators/||' | sed 's|/formulas.ts||' | sed 's|/| -> |g')
    check_calculator_formulas "$formulas_file" "$calc_name"
done

echo ""
echo "=================================================="
echo "📊 AUDIT RESULTS SUMMARY"
echo "=================================================="
echo "Total calculators audited: $total_calculators"
echo "✅ Real domain-specific formulas: $real_calculators"
echo "❌ Still generic templates: $generic_calculators"
echo "❓ Unknown/cannot determine: $unknown_calculators"
echo ""

# Calculate percentages
if [[ $total_calculators -gt 0 ]]; then
    real_percentage=$((real_calculators * 100 / total_calculators))
    generic_percentage=$((generic_calculators * 100 / total_calculators))
    unknown_percentage=$((unknown_calculators * 100 / total_calculators))

    echo "📈 Success Rate: ${real_percentage}% have real formulas"
    echo "📉 Generic Rate: ${generic_percentage}% still have templates"
    echo "🤔 Unknown Rate: ${unknown_percentage}% undetermined"
    echo ""
fi

# Show detailed results if requested
if [[ "${1:-}" == "--detailed" ]]; then
    echo "=================================================="
    echo "📋 DETAILED RESULTS"
    echo "=================================================="

    if [[ ${#real_list[@]} -gt 0 ]]; then
        echo "✅ CALCULATORS WITH REAL FORMULAS (${#real_list[@]}):"
        printf '%s\n' "${real_list[@]}"
        echo ""
    fi

    if [[ ${#generic_list[@]} -gt 0 ]]; then
        echo "❌ CALCULATORS WITH GENERIC TEMPLATES (${#generic_list[@]}):"
        printf '%s\n' "${generic_list[@]}"
        echo ""
    fi

    if [[ ${#unknown_list[@]} -gt 0 ]]; then
        echo "❓ CALCULATORS WITH UNKNOWN STATUS (${#unknown_list[@]}):"
        printf '%s\n' "${unknown_list[@]}"
        echo ""
    fi
fi

echo "=================================================="
echo "🎯 CONCLUSION"
echo "=================================================="

if [[ $generic_calculators -eq 0 ]]; then
    echo "🎉 SUCCESS: All calculators have real domain-specific formulas!"
elif [[ $real_calculators -gt $generic_calculators ]]; then
    echo "👍 GOOD: Majority have real formulas, but $generic_calculators still need implementation"
else
    echo "⚠️  INCOMPLETE: Most calculators still have generic templates ($generic_calculators generic vs $real_calculators real)"
fi

echo ""
echo "Run with --detailed flag for full list: ./audit_calculator_formulas.sh --detailed"