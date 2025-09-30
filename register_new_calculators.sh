#!/bin/bash

# Script to register all newly created calculators in src/calculators/index.ts

echo "🔄 Generating import and registration statements for new calculators..."

# Create temporary files for imports and registrations
IMPORTS_FILE="/tmp/new_calculator_imports.txt"
REGISTRATIONS_FILE="/tmp/new_calculator_registrations.txt"

# Clear temp files
> "$IMPORTS_FILE"
> "$REGISTRATIONS_FILE"

# Find all register.ts files and generate import/registration statements
find src/calculators -name "register.ts" -type f | while read -r register_file; do
    # Get the directory path
    calc_dir=$(dirname "$register_file")
    calc_name=$(basename "$calc_dir")

    # Extract category path
    category_path=$(echo "$calc_dir" | sed 's|src/calculators/||')

    # Convert to proper naming
    calc_var="${calc_name//-/_}"

    # Generate import statement
    echo "import { ${calc_var}Calculator } from './${category_path}/${calc_name}';" >> "$IMPORTS_FILE"

    # Generate registration statement
    echo "calculatorRegistry.register(${calc_var}Calculator);" >> "$REGISTRATIONS_FILE"
done

echo "📝 Generated $(wc -l < "$IMPORTS_FILE") import statements"
echo "📝 Generated $(wc -l < "$REGISTRATIONS_FILE") registration statements"

# Backup original file
cp src/calculators/index.ts src/calculators/index.ts.backup

# Create new index.ts with imports and registrations added
awk '
BEGIN { in_register_function = 0 }
/^export function registerAllCalculators\(\): void \{$/ {
    in_register_function = 1
    print
    # Add new imports at the top
    system("cat '"$IMPORTS_FILE"'")
    print ""
    next
}
/^}/ && in_register_function {
    # Add registrations before closing brace
    print ""
    system("cat '"$REGISTRATIONS_FILE"'")
    print
    in_register_function = 0
    next
}
{ print }
' src/calculators/index.ts > src/calculators/index.ts.new

# Replace original file
mv src/calculators/index.ts.new src/calculators/index.ts

# Clean up
rm -f "$IMPORTS_FILE" "$REGISTRATIONS_FILE"

echo "✅ Successfully registered all new calculators!"
echo "📊 Total calculators now registered: $(grep -c "calculatorRegistry.register" src/calculators/index.ts)"