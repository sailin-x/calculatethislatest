#!/bin/bash

echo "🔍 Simple Calculator Audit - Counting Real vs Generic Formulas"
echo "============================================================"

# Count total calculators
total=$(find src/calculators -name "formulas.ts" -type f | wc -l)
echo "Total calculators: $total"

# Count calculators with generic templates (amount * rate * time)
generic=$(grep -l "inputs.amount.*inputs.rate.*inputs.time" src/calculators/*/formulas.ts src/calculators/*/*/formulas.ts src/calculators/*/*/*/formulas.ts src/calculators/*/*/*/*/formulas.ts 2>/dev/null | wc -l)
echo "Generic templates: $generic"

# Count calculators with real formulas (have domain-specific functions)
real_finance=$(grep -l "calculateMonthlyPayment\|calculateLTC\|calculateAdvanceRate\|calculateBMI\|calculateAverageGlucose\|factorial\|calculatePermutations\|calculateCombinations" src/calculators/*/formulas.ts src/calculators/*/*/formulas.ts src/calculators/*/*/*/formulas.ts src/calculators/*/*/*/*/formulas.ts 2>/dev/null | wc -l)

real_math=$(grep -l "Math\.|sqrt\(|pow\(|log\(|exp\(|sin\(|cos\(|tan\(" src/calculators/*/formulas.ts src/calculators/*/*/formulas.ts src/calculators/*/*/*/formulas.ts src/calculators/*/*/*/*/formulas.ts 2>/dev/null | wc -l)

real_business=$(grep -l "if.*riskLevel|recommendation.*=|category.*=|analysis.*=|borrowingBase|advanceRate|amortization|hemoglobin|glucose|permutations|combinations" src/calculators/*/formulas.ts src/calculators/*/*/formulas.ts src/calculators/*/*/*/formulas.ts src/calculators/*/*/*/*/formulas.ts 2>/dev/null | wc -l)

# Avoid double-counting by using sort/uniq
real_total=$(echo "$real_finance $real_math $real_business" | tr ' ' '\n' | sort -n | uniq | paste -sd+ | bc)
echo "Real formulas: $real_total"

unknown=$((total - generic - real_total))
echo "Unknown/cannot determine: $unknown"

echo ""
echo "📊 SUMMARY"
echo "=========="
echo "Total calculators: $total"
echo "✅ Real domain-specific: $real_total"
echo "❌ Generic templates: $generic"
echo "❓ Unknown: $unknown"

if [[ $real_total -gt 0 ]]; then
    real_percentage=$((real_total * 100 / total))
    echo "Success rate: ${real_percentage}% have real formulas"
fi

if [[ $generic -eq 0 ]]; then
    echo "🎉 ALL calculators have real domain-specific formulas!"
elif [[ $real_total -gt $generic ]]; then
    echo "👍 Most calculators have real formulas"
else
    echo "⚠️ Most calculators still have generic templates"
fi