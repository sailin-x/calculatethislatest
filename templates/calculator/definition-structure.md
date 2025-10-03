# Calculator Definition Structure

This document outlines the comprehensive structure for implementing calculators in the CalculateThis system.

## Core Components

### 1. Calculator Metadata
```typescript
interface CalculatorDefinition {
  id: string;                    // kebab-case identifier
  title: string;                 // Human-readable title
  category: string;              // Main category (e.g., 'finance', 'math', 'health')
  subcategory: string;           // Specific subcategory
  description: string;           // Detailed description
  usageInstructions: string[];   // Array of usage steps
}
```

### 2. Input Definitions
```typescript
interface InputDefinition {
  id: string;                    // camelCase identifier
  label: string;                 // Display label
  type: 'number' | 'currency' | 'percentage' | 'select' | 'date' | 'boolean' | 'text';
  required: boolean;
  min?: number;                  // Minimum value
  max?: number;                  // Maximum value
  step?: number;                 // Step increment
  defaultValue?: any;            // Default value
  tooltip?: string;              // Help text
  options?: Array<{              // For select inputs
    value: string;
    label: string;
  }>;
}
```

### 3. Output Definitions
```typescript
interface OutputDefinition {
  id: string;                    // camelCase identifier
  label: string;                 // Display label
  type: 'number' | 'currency' | 'percentage' | 'date' | 'text';
  explanation: string;           // Detailed explanation of what this output represents
}
```

### 4. Formula Functions
```typescript
interface FormulaFunction {
  name: string;                  // Function name
  parameters: string[];          // Parameter names
  returnType: string;            // Return type
  description: string;           // What it calculates
  implementation: string;        // Actual formula/logic
}
```

### 5. Validation Rules
```typescript
interface ValidationRule {
  field: string;                 // Input field ID
  rule: string;                  // Validation rule description
  errorMessage: string;          // Error message if validation fails
  severity: 'error' | 'warning'; // Severity level
}
```

### 6. Examples
```typescript
interface CalculatorExample {
  title: string;                 // Example title
  description: string;           // Example description
  inputs: Record<string, any>;   // Input values for this example
  expectedOutputs: Record<string, any>; // Expected output values
}
```

## File Structure Template

```
calculator-name/
├── CalculatorNameCalculator.ts    # Main calculator definition
├── types.ts                       # TypeScript interfaces
├── formulas.ts                    # Calculation functions
├── validation.ts                  # Input validation logic
├── quickValidation.ts             # Field-level validation functions
├── CalculatorNameCalculator.test.ts # Test suite
├── index.ts                       # Module exports
└── register.ts                    # Calculator registration
```

## Implementation Patterns

### Common Calculator Patterns

1. **Financial Calculators**
   - Loan/mortgage calculations
   - Investment analysis
   - Tax calculations
   - Retirement planning

2. **Mathematical Calculators**
   - Basic arithmetic
   - Statistical analysis
   - Unit conversions
   - Geometric calculations

3. **Health & Fitness Calculators**
   - BMI calculations
   - Calorie tracking
   - Body fat percentage
   - Fitness metrics

4. **Business Calculators**
   - ROI analysis
   - Break-even analysis
   - Profit margin calculations
   - Cost analysis

### Reusable Components

1. **Validation Patterns**
   - Required field validation
   - Range validation
   - Cross-field validation
   - Business rule validation

2. **Formula Patterns**
   - Basic arithmetic operations
   - Percentage calculations
   - Compound calculations
   - Statistical aggregations

3. **Input Patterns**
   - Currency inputs
   - Percentage inputs
   - Date inputs
   - Select dropdowns

4. **Output Patterns**
   - Formatted currency display
   - Percentage display
   - Number formatting
   - Text explanations