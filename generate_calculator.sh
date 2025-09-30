#!/bin/bash

# Script to generate calculator structure
# Usage: ./generate_calculator.sh category calculator-name "Calculator Title" "Calculator Description"

CATEGORY=$1
CALCULATOR_NAME=$2
TITLE=$3
DESCRIPTION=$4

if [ -z "$CATEGORY" ] || [ -z "$CALCULATOR_NAME" ] || [ -z "$TITLE" ] || [ -z "$DESCRIPTION" ]; then
    echo "Usage: $0 category calculator-name \"Calculator Title\" \"Calculator Description\""
    exit 1
fi

DIR="src/calculators/$CATEGORY/$CALCULATOR_NAME"
# Convert calculator-name to CalculatorName format
CLASS_NAME=$(echo $CALCULATOR_NAME | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' | sed 's/ //g')

echo "Creating calculator: $CALCULATOR_NAME in category: $CATEGORY"

# Create directory
mkdir -p "$DIR"

# Create types.ts
cat > "$DIR/types.ts" << EOF
export interface ${CLASS_NAME}Inputs {
  // Add input fields here
}

export interface ${CLASS_NAME}Metrics {
  // Add metric fields here
}

export interface ${CLASS_NAME}Analysis {
  // Add analysis fields here
}

export interface ${CLASS_NAME}Outputs {
  // Add output fields here
}
EOF

# Create formulas.ts
cat > "$DIR/formulas.ts" << EOF
import { ${CLASS_NAME}Inputs, ${CLASS_NAME}Metrics, ${CLASS_NAME}Analysis } from './types';

export function calculateResult(inputs: ${CLASS_NAME}Inputs): number {
  // Add calculation logic here
  return 0;
}

export function generateAnalysis(inputs: ${CLASS_NAME}Inputs, metrics: ${CLASS_NAME}Metrics): ${CLASS_NAME}Analysis {
  // Add analysis logic here
  return {
    // Add analysis fields
  };
}
EOF

# Create validation.ts
cat > "$DIR/validation.ts" << EOF
import { ${CLASS_NAME}Inputs } from './types';

export function validate${CLASS_NAME}Inputs(inputs: ${CLASS_NAME}Inputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];
  // Add validation logic here
  return errors;
}

export function validate${CLASS_NAME}BusinessRules(inputs: ${CLASS_NAME}Inputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];
  // Add business rule validation here
  return warnings;
}
EOF

# Create quickValidation.ts
cat > "$DIR/quickValidation.ts" << EOF
import { ${CLASS_NAME}Inputs } from './types';

export function validateField(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  // Add field validation logic here
  return { isValid: true };
}

// Additional validation functions with allInputs parameter
export function validateInputField(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Value must be greater than 0' };
  }
  return { isValid: true };
}
EOF

# Create main calculator file
cat > "$DIR/${CLASS_NAME}.ts" << EOF
import { Calculator } from '../../../types/calculator';
import { ${CLASS_NAME}Inputs, ${CLASS_NAME}Outputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validate${CLASS_NAME}Inputs } from './validation';

export const ${CLASS_NAME}: Calculator = {
  id: '$CALCULATOR_NAME',
  title: '$TITLE',
  category: '$CATEGORY',
  subcategory: 'General',
  description: '$DESCRIPTION',
  usageInstructions: [
    'Add usage instructions here'
  ],

  inputs: [
    // Add input definitions here
  ],

  outputs: [
    // Add output definitions here
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    // Add examples here
  ]
};
EOF

# Create register.ts
cat > "$DIR/register.ts" << EOF
import { ${CLASS_NAME} } from './${CLASS_NAME}';

export { ${CLASS_NAME} };

export function register${CLASS_NAME}(): void {
  // Registration logic if needed
}
EOF

# Create index.ts
cat > "$DIR/index.ts" << EOF
export { ${CLASS_NAME} } from './${CLASS_NAME}';
export * from './types';
export * from './formulas';
export * from './validation';
export * from './quickValidation';
EOF

# Create test file
cat > "$DIR/${CLASS_NAME}.test.ts" << EOF
import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validate${CLASS_NAME}Inputs } from './validation';

describe('$TITLE', () => {
  const mockInputs = {
    // Add mock inputs here
  };

  describe('Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validate${CLASS_NAME}Inputs(mockInputs);
      expect(result.length).toBe(0);
    });
  });
});
EOF

# Auto-register in main index.ts
INDEX_FILE="src/calculators/index.ts"

# Add import statement
IMPORT_LINE="import { $CLASS_NAME } from './$CATEGORY/$CALCULATOR_NAME';"
IMPORT_REGISTER_LINE="import { register${CLASS_NAME} } from './$CATEGORY/$CALCULATOR_NAME/register';"

# Find the appropriate section and add after it
if [ "$CATEGORY" = "finance" ]; then
    sed -i "/import { HealthSavingsAccountHsaCalculator } from '\.\/finance\/health-savings-account-hsa-calculator\/HealthSavingsAccountHsaCalculator';/a\\
$IMPORT_LINE\\
$IMPORT_REGISTER_LINE" "$INDEX_FILE"
elif [ "$CATEGORY" = "legal" ]; then
    # Add after the last legal import, or after finance if no legal yet
    if grep -q "from '\./legal/" "$INDEX_FILE"; then
        sed -i "/import { PersonalInjurySettlementCalculator } from '\.\/legal\/personal-injury-settlement-calculator\/PersonalInjurySettlementCalculator';/a\\
$IMPORT_LINE\\
$IMPORT_REGISTER_LINE" "$INDEX_FILE"
    else
        sed -i "/import { HealthSavingsAccountHsaCalculator } from '\.\/finance\/health-savings-account-hsa-calculator\/HealthSavingsAccountHsaCalculator';/a\\
$IMPORT_LINE\\
$IMPORT_REGISTER_LINE" "$INDEX_FILE"
    fi
fi

# Add to registration function
REGISTER_LINE="calculatorRegistry.register($CLASS_NAME);"
REGISTER_FUNCTION_LINE="register${CLASS_NAME}();"

# Find the registration section and add
if [ "$CATEGORY" = "finance" ]; then
    sed -i "/calculatorRegistry.register(HealthSavingsAccountHsaCalculator);/a\\
calculatorRegistry.register($CLASS_NAME);" "$INDEX_FILE"

    sed -i "/registerHealthSavingsAccountHsaCalculator();/a\\
register${CLASS_NAME}();" "$INDEX_FILE"
elif [ "$CATEGORY" = "legal" ]; then
    if grep -q "calculatorRegistry.register(PersonalInjurySettlementCalculator);" "$INDEX_FILE"; then
        sed -i "/calculatorRegistry.register(PersonalInjurySettlementCalculator);/a\\
calculatorRegistry.register($CLASS_NAME);" "$INDEX_FILE"

        sed -i "/registerPersonalInjurySettlementCalculator();/a\\
register${CLASS_NAME}();" "$INDEX_FILE"
    else
        sed -i "/calculatorRegistry.register(HealthSavingsAccountHsaCalculator);/a\\
calculatorRegistry.register($CLASS_NAME);" "$INDEX_FILE"

        sed -i "/registerHealthSavingsAccountHsaCalculator();/a\\
register${CLASS_NAME}();" "$INDEX_FILE"
    fi
fi

echo "Calculator structure created in $DIR"
echo "Automatically registered in src/calculators/index.ts"
echo "Update calculator-list-CORRECTED.md to mark as completed"