#!/bin/bash

# Script to register all newly created calculators in src/calculators/index.ts

echo "🔧 Registering all calculators..."

# Create a temporary file for the new imports
temp_file=$(mktemp)

# Find all calculator directories and generate imports
find src/calculators/finance/general -name "*-calculator" -type d | while read -r dir; do
    # Extract calculator name from directory
    calc_name=$(basename "$dir" | sed 's/-calculator$//')
    calc_slug=$(echo "$calc_name" | sed 's/-/_/g')

    # Generate import line
    echo "import { ${calc_slug}_calculator } from './finance/general/${calc_name}-calculator/${calc_slug}_calculator';" >> "$temp_file"

    # Generate registration line
    echo "  calculatorRegistry.register(${calc_slug}_calculator);" >> "$temp_file"
done

# Read the current index.ts file
current_content=$(cat src/calculators/index.ts)

# Find the insertion points
import_marker="// Retirement & Savings calculators"
register_marker="  // Retirement & Savings calculators"

# Insert imports after the import marker
sed -i.bak "/$import_marker/a $(cat "$temp_file" | grep "import {")" src/calculators/index.ts

# Insert registrations after the register marker
sed -i.bak "/$register_marker/a $(cat "$temp_file" | grep "calculatorRegistry.register")" src/calculators/index.ts

# Clean up
rm "$temp_file"

echo "✅ All calculators registered!"
echo "Run 'npm run build' to verify everything compiles"