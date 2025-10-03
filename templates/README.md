# Calculator Implementation Template

This template provides a comprehensive framework for implementing calculators in the CalculateThis system. Based on the mortgage calculator reference implementation, it includes all necessary components for creating robust, testable, and maintainable calculator modules.

## Overview

The template generates a complete calculator implementation with the following structure:

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

## Quick Start

### Using the Generator Script

```bash
# Generate a new calculator
node templates/generate-calculator.js "Investment Return" finance "Investment Analysis" "Calculate return on investment"

# Or with custom description
node templates/generate-calculator.js "BMI Calculator" health "Body Metrics" "Calculate Body Mass Index and health insights"
```

### Manual Implementation

1. Copy the template files from `templates/calculator/`
2. Rename files and update placeholders
3. Customize the implementation for your specific calculator

## Template Components

### 1. Calculator Definition (`CalculatorNameCalculator.ts`)

The main calculator object that defines:
- **Metadata**: id, title, category, description
- **Inputs**: Field definitions with validation rules
- **Outputs**: Result definitions with explanations
- **Examples**: Sample calculations with expected results

```typescript
export const CalculatorNameCalculator: Calculator = {
  id: 'calculator-name-calculator',
  title: 'Calculator Name Calculator',
  category: 'category',
  subcategory: 'Subcategory Name',
  // ... inputs, outputs, examples
};
```

### 2. Type Definitions (`types.ts`)

TypeScript interfaces for:
- **Inputs**: Properties the calculator accepts
- **Outputs**: Results the calculator produces
- **Metrics**: Intermediate calculation results
- **Analysis**: Risk assessment and recommendations

### 3. Formulas (`formulas.ts`)

Core calculation functions:
- **Primary calculations**: Main result functions
- **Secondary calculations**: Supporting computations
- **Analysis functions**: Risk assessment and insights
- **Utility functions**: Common mathematical operations

### 4. Validation (`validation.ts`)

Input validation with two levels:
- **Input validation**: Required field and range checks
- **Business rules**: Warning-level validations for best practices

### 5. Quick Validation (`quickValidation.ts`)

Field-level validation functions for real-time UI feedback:
- Individual field validators
- Cross-field validation
- Immediate validation results

### 6. Tests (`CalculatorNameCalculator.test.ts`)

Comprehensive test suite covering:
- Core calculation accuracy
- Validation rules
- Edge cases
- Error handling

## Implementation Guide

### Step 1: Define Calculator Requirements

Before implementing, define:
- **Purpose**: What does this calculator solve?
- **Inputs**: What data does it need?
- **Outputs**: What results does it provide?
- **Formulas**: What calculations are involved?
- **Validation**: What constraints apply?

### Step 2: Customize the Template

1. **Update metadata** in `CalculatorNameCalculator.ts`
2. **Define inputs and outputs** with proper types and validation
3. **Implement formulas** in `formulas.ts`
4. **Add validation rules** in `validation.ts` and `quickValidation.ts`
5. **Write comprehensive tests** in the test file

### Step 3: Implement Core Logic

#### Basic Formula Implementation

```typescript
export function calculateResult(inputs: CalculatorInputs): number {
  // Implement your calculation logic
  return inputs.value * inputs.rate;
}
```

#### Advanced Analysis

```typescript
export function generateAnalysis(inputs: CalculatorInputs, metrics: CalculatorMetrics): CalculatorAnalysis {
  const result = calculateResult(inputs);

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > threshold) riskLevel = 'High';

  return {
    recommendation: 'Analysis-based recommendation',
    riskLevel,
    insights: ['Key insights'],
    warnings: ['Important warnings']
  };
}
```

### Step 4: Add Validation

#### Input Validation

```typescript
export function validateCalculatorInputs(inputs: CalculatorInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  if (inputs.value <= 0) {
    errors.push({ field: 'value', message: 'Value must be greater than 0' });
  }

  return errors;
}
```

#### Business Rules

```typescript
export function validateCalculatorBusinessRules(inputs: CalculatorInputs): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  if (inputs.value > 100000) {
    warnings.push({ field: 'value', message: 'High values may require additional review' });
  }

  return warnings;
}
```

### Step 5: Write Tests

```typescript
describe('Calculator Tests', () => {
  it('calculates result correctly', () => {
    const result = calculateResult(mockInputs);
    expect(result).toBe(expectedValue);
  });

  it('validates inputs', () => {
    const errors = validateCalculatorInputs(invalidInputs);
    expect(errors.length).toBeGreaterThan(0);
  });
});
```

## Calculator Categories

### Finance Calculators
- Loan and mortgage calculations
- Investment analysis
- Tax calculations
- Retirement planning

### Mathematical Calculators
- Basic arithmetic
- Statistical analysis
- Unit conversions
- Geometric calculations

### Health & Fitness Calculators
- BMI and body metrics
- Calorie calculations
- Fitness assessments
- Health risk analysis

### Business Calculators
- ROI analysis
- Break-even calculations
- Profit margin analysis
- Cost analysis

## Best Practices

### Code Organization
- Keep formulas pure and testable
- Separate validation from calculation logic
- Use descriptive variable and function names
- Add comprehensive comments

### Validation Strategy
- Validate inputs at multiple levels
- Provide clear error messages
- Include business rule warnings
- Support real-time validation

### Testing Approach
- Test all calculation paths
- Include edge cases
- Test validation rules
- Mock external dependencies

### Documentation
- Document all public functions
- Include usage examples
- Explain complex formulas
- Provide validation rules

## Integration

### Adding to Registry

After implementation, add your calculator to `src/data/calculatorRegistry.ts`:

```typescript
import { CalculatorNameCalculator } from '../calculators/category/calculator-name';

export const calculatorRegistry: Calculator[] = [
  // ... existing calculators
  CalculatorNameCalculator
];
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific calculator tests
npm test CalculatorNameCalculator
```

### Building and Deployment

```bash
# Build the application
npm run build

# Start development server
npm run dev
```

## Examples

### Simple Calculator: Percentage Calculator

```bash
node templates/generate-calculator.js "Percentage Calculator" math "Basic Math" "Calculate percentages and ratios"
```

### Complex Calculator: Investment Portfolio

```bash
node templates/generate-calculator.js "Portfolio Analyzer" finance "Investment Analysis" "Analyze investment portfolio performance and risk"
```

## Troubleshooting

### Common Issues

1. **Template not found**: Ensure you're running from the project root
2. **Import errors**: Check that all file paths are correct
3. **Type errors**: Verify TypeScript interfaces match implementation
4. **Test failures**: Check calculation logic and test expectations

### Getting Help

- Review the mortgage calculator implementation as reference
- Check existing calculators for patterns
- Run tests to identify issues
- Use TypeScript compiler for type checking

## Contributing

When adding new calculator types or improving the template:

1. Update template files with new patterns
2. Add examples for new calculator types
3. Update this documentation
4. Test the generator with new calculator types

## License

This template is part of the CalculateThis project.