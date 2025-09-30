#!/bin/bash

# Register all working calculators in index.ts

echo "🔧 REGISTERING ALL WORKING CALCULATORS"
echo "======================================"

# Start with clean index.ts
cat > src/calculators/index.ts << 'EOF'
import { calculatorRegistry } from '../data/calculatorRegistry';
EOF

echo "" >> src/calculators/index.ts

# Find all working calculators and add imports/registrations
find src/calculators -name "*Calculator.ts" -type f | while read -r calc_file; do
    calc_dir=$(dirname "$calc_file")
    calc_name=$(basename "$calc_dir")

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
        # Convert kebab-case to PascalCase for import
        pascal_name=$(echo "$calc_name" | sed 's/-/ /g' | sed 's/\b\w/\U&/g' | sed 's/ //g')

        # Add import
        echo "import { ${pascal_name}Calculator as ${calc_name}Calculator } from './${calc_name}';" >> src/calculators/index.ts
    fi
done

# Add registration function
cat >> src/calculators/index.ts << 'EOF'

/**
 * Register all calculators with the system
 */
export function registerAllCalculators(): void {
EOF

# Add registrations
find src/calculators -name "*Calculator.ts" -type f | while read -r calc_file; do
    calc_dir=$(dirname "$calc_file")
    calc_name=$(basename "$calc_dir")

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
        echo "  calculatorRegistry.register(${calc_name}Calculator);" >> src/calculators/index.ts
    fi
done

# Close registration function
cat >> src/calculators/index.ts << 'EOF'
}

// Auto-register calculators when module is imported
Promise.resolve().then(() => {
  registerAllCalculators();
});
EOF

echo "✅ All working calculators registered!"