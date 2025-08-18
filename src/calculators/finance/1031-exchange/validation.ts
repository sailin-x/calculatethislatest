import { ValidationRule } from '../../../types/Calculator';

export const exchange1031ValidationRules: ValidationRule[] = [
  {
    field: 'originalPropertyValue',
    type: 'required',
    message: 'Original property value is required'
  },
  {
    field: 'originalPropertyValue',
    type: 'min',
    value: 1000,
    message: 'Original property value must be at least $1,000'
  },
  {
    field: 'originalPropertyValue',
    type: 'max',
    value: 1000000000,
    message: 'Original property value cannot exceed $1 billion'
  },
  {
    field: 'originalBasis',
    type: 'required',
    message: 'Original property basis is required'
  },
  {
    field: 'originalBasis',
    type: 'min',
    value: 0,
    message: 'Original basis cannot be negative'
  },
  {
    field: 'originalBasis',
    type: 'custom',
    validator: (value, allInputs) => {
      const basis = Number(value);
      const propertyValue = Number(allInputs.originalPropertyValue);
      return basis <= propertyValue * 2;
    },
    message: 'Original basis seems unusually high compared to property value'
  },
  {
    field: 'replacementPropertyValue',
    type: 'required',
    message: 'Replacement property value is required'
  },
  {
    field: 'replacementPropertyValue',
    type: 'min',
    value: 1000,
    message: 'Replacement property value must be at least $1,000'
  },
  {
    field: 'replacementPropertyValue',
    type: 'max',
    value: 1000000000,
    message: 'Replacement property value cannot exceed $1 billion'
  },
  {
    field: 'exchangeExpenses',
    type: 'min',
    value: 0,
    message: 'Exchange expenses cannot be negative'
  },
  {
    field: 'exchangeExpenses',
    type: 'custom',
    validator: (value, allInputs) => {
      const expenses = Number(value) || 0;
      const propertyValue = Number(allInputs.originalPropertyValue) || 0;
      return expenses <= propertyValue * 0.1;
    },
    message: 'Exchange expenses seem unusually high (>10% of property value)'
  },
  {
    field: 'capitalGainsTaxRate',
    type: 'min',
    value: 0,
    message: 'Tax rate cannot be negative'
  },
  {
    field: 'capitalGainsTaxRate',
    type: 'max',
    value: 50,
    message: 'Tax rate cannot exceed 50%'
  },
  {
    field: 'depreciationRecapture',
    type: 'min',
    value: 0,
    message: 'Depreciation recapture cannot be negative'
  },
  {
    field: 'depreciationRecapture',
    type: 'custom',
    validator: (value, allInputs) => {
      const recapture = Number(value) || 0;
      const basis = Number(allInputs.originalBasis) || 0;
      const propertyValue = Number(allInputs.originalPropertyValue) || 0;
      const capitalGain = propertyValue - basis;
      return recapture <= Math.max(capitalGain, basis);
    },
    message: 'Depreciation recapture cannot exceed the lower of capital gain or original basis'
  },
  {
    field: 'bootReceived',
    type: 'min',
    value: 0,
    message: 'Boot received cannot be negative'
  },
  {
    field: 'bootReceived',
    type: 'custom',
    validator: (value, allInputs) => {
      const boot = Number(value) || 0;
      const originalValue = Number(allInputs.originalPropertyValue) || 0;
      const replacementValue = Number(allInputs.replacementPropertyValue) || 0;
      
      // Boot should not exceed the difference in property values
      return boot <= Math.abs(originalValue - replacementValue);
    },
    message: 'Boot received seems inconsistent with property values'
  },
  // Cross-field validations
  {
    field: 'replacementPropertyValue',
    type: 'custom',
    validator: (value, allInputs) => {
      const replacementValue = Number(value) || 0;
      const originalValue = Number(allInputs.originalPropertyValue) || 0;
      const boot = Number(allInputs.bootReceived) || 0;
      
      // For full tax deferral, replacement value should be >= original value - boot
      if (boot === 0) {
        return replacementValue >= originalValue;
      }
      return replacementValue >= (originalValue - boot);
    },
    message: 'For full tax deferral, replacement property value should equal or exceed original property value minus boot'
  },
  {
    field: 'originalBasis',
    type: 'custom',
    validator: (value, allInputs) => {
      const basis = Number(value) || 0;
      const propertyValue = Number(allInputs.originalPropertyValue) || 0;
      
      // Basis should not exceed property value by too much (unless significant improvements)
      return basis <= propertyValue * 1.5;
    },
    message: 'Original basis significantly exceeds property value - verify basis calculation'
  }
];

export const exchange1031BusinessRules = {
  // Minimum property values for 1031 exchanges
  minimumPropertyValue: 50000,
  
  // Maximum reasonable expense ratios
  maxExpenseRatio: 0.05, // 5% of property value
  
  // Timing requirements (in days)
  identificationPeriod: 45,
  completionPeriod: 180,
  
  // Tax rates
  depreciationRecaptureRate: 0.25, // 25% federal rate
  maxCapitalGainsRate: 0.238, // 20% + 3.8% NIIT
  
  // Validation thresholds
  maxBootRatio: 0.3, // Boot should not exceed 30% of capital gain for optimal deferral
  minLeverageRatio: 1.0, // Replacement property should be at least equal value
  
  // Property type requirements
  qualifyingPropertyTypes: [
    'investment real estate',
    'business real estate',
    'rental property',
    'commercial property',
    'industrial property',
    'agricultural property'
  ],
  
  // Non-qualifying property types
  nonQualifyingPropertyTypes: [
    'primary residence',
    'vacation home',
    'inventory',
    'securities',
    'partnership interests'
  ]
};

/**
 * Validate 1031 exchange structure for compliance
 */
export function validateExchangeStructure(inputs: any): {
  isValid: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  const originalValue = Number(inputs.originalPropertyValue) || 0;
  const replacementValue = Number(inputs.replacementPropertyValue) || 0;
  const boot = Number(inputs.bootReceived) || 0;
  const expenses = Number(inputs.exchangeExpenses) || 0;
  const basis = Number(inputs.originalBasis) || 0;
  
  // Check minimum property values
  if (originalValue < exchange1031BusinessRules.minimumPropertyValue) {
    warnings.push(`Property value below typical 1031 exchange minimum ($${exchange1031BusinessRules.minimumPropertyValue.toLocaleString()})`);
  }
  
  // Check expense ratios
  const expenseRatio = expenses / originalValue;
  if (expenseRatio > exchange1031BusinessRules.maxExpenseRatio) {
    warnings.push(`Exchange expenses (${(expenseRatio * 100).toFixed(1)}%) exceed typical range (${(exchange1031BusinessRules.maxExpenseRatio * 100)}%)`);
  }
  
  // Check boot ratio
  const capitalGain = Math.max(0, originalValue - basis);
  if (boot > 0 && capitalGain > 0) {
    const bootRatio = boot / capitalGain;
    if (bootRatio > exchange1031BusinessRules.maxBootRatio) {
      warnings.push(`Boot (${(bootRatio * 100).toFixed(1)}% of capital gain) may significantly reduce tax deferral benefits`);
    }
  }
  
  // Check leverage ratio
  const leverageRatio = replacementValue / originalValue;
  if (leverageRatio < exchange1031BusinessRules.minLeverageRatio) {
    warnings.push('Replacement property value is less than original property - may not qualify for full deferral');
  }
  
  // Check for equal or up requirement
  if (replacementValue < (originalValue - boot)) {
    errors.push('Replacement property value must equal or exceed original property value minus boot for tax deferral');
  }
  
  // Check basis reasonableness
  if (basis > originalValue * 1.5) {
    warnings.push('Original basis significantly exceeds property value - verify depreciation and improvement calculations');
  }
  
  return {
    isValid: errors.length === 0,
    warnings,
    errors
  };
}