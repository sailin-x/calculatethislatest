#!/bin/bash

# FIX REGISTRY MALFORMATIONS
# Convert malformed registrations like:
# calculatorRegistry.register(_calculator);some_name
# to proper registrations like:
# calculatorRegistry.register(some_name_calculator);

echo "🔧 FIXING REGISTRY MALFORMATIONS..."

# Create a backup
cp src/calculators/index.ts src/calculators/index.ts.backup

# Fix the malformed registrations
# Pattern: calculatorRegistry.register(_calculator);something
# Should become: calculatorRegistry.register(something_calculator);

# Use sed to fix the malformed lines (handle multiline properly)
sed -i ':a;N;$!ba;s/calculatorRegistry\.register(_calculator);\([a-zA-Z0-9_-]*\)/calculatorRegistry.register(\1_calculator);/g' src/calculators/index.ts

echo "✅ REGISTRY MALFORMATIONS FIXED!"

# Verify the fix
malformed_count=$(grep -c "calculatorRegistry\.register(_calculator);" src/calculators/index.ts)
if [ "$malformed_count" -eq 0 ]; then
    echo "🎉 All malformations fixed! No malformed registrations remaining."
else
    echo "⚠️  Still $malformed_count malformed registrations remaining."
fi

# Count total registrations
total_regs=$(grep -c "calculatorRegistry\.register(" src/calculators/index.ts)
echo "📊 Total calculator registrations: $total_regs"