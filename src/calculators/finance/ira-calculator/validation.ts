import { IRAInputs } from './types';

/**
 * Validate IRA inputs
 */
export function validateIRAInputs(inputs: IRAInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Basic validation
  if (inputs.currentBalance < 0) {
    errors.push('Current balance cannot be negative');
  }

  if (inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (inputs.expectedReturnRate < -10 || inputs.expectedReturnRate > 25) {
    errors.push('Expected return rate must be between -10% and 25%');
  }

  // Age validation
  if (inputs.currentAge < 18 || inputs.currentAge > 70) {
    errors.push('Current age must be between 18 and 70');
  }

  if (inputs.retirementAge <= inputs.currentAge || inputs.retirementAge > 100) {
    errors.push('Retirement age must be greater than current age and less than 100');
  }

  // Contribution years validation
  if (inputs.yearsToContribute < 0 || inputs.yearsToContribute > 50) {
    errors.push('Years to contribute must be between 0 and 50');
  }

  // Tax rate validation
  if (inputs.currentTaxRate !== undefined && (inputs.currentTaxRate < 0 || inputs.currentTaxRate > 50)) {
    errors.push('Current tax rate must be between 0% and 50%');
  }

  if (inputs.expectedRetirementTaxRate !== undefined && (inputs.expectedRetirementTaxRate < 0 || inputs.expectedRetirementTaxRate > 50)) {
    errors.push('Expected retirement tax rate must be between 0% and 50%');
  }

  // Roth IRA specific validation
  if (inputs.iraType === 'roth') {
    if (inputs.currentIncome !== undefined && inputs.currentIncome < 0) {
      errors.push('Current income cannot be negative');
    }

    if (inputs.contributionLimit !== undefined && inputs.contributionLimit < 0) {
      errors.push('Contribution limit cannot be negative');
    }
  }

  // Inflation rate validation
  if (inputs.inflationRate !== undefined && (inputs.inflationRate < 0 || inputs.inflationRate > 10)) {
    errors.push('Inflation rate must be between 0% and 10%');
  }

  // Business logic validation
  const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
  if (inputs.yearsToContribute > yearsToRetirement) {
    errors.push('Years to contribute cannot exceed years to retirement');
  }

  // IRA type specific validation
  if (inputs.iraType === 'traditional' && inputs.includeRequiredMinimumDistributions) {
    if (inputs.currentAge >= 72) {
      // RMD rules apply
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Get validation rules for the IRA calculator
 */
export function getIRAValidationRules() {
  return [
    {
      field: 'currentBalance',
      type: 'range' as const,
      message: 'Current balance must be non-negative',
      validator: (value: any) => value >= 0
    },
    {
      field: 'annualContribution',
      type: 'range' as const,
      message: 'Annual contribution must be non-negative',
      validator: (value: any) => value >= 0
    },
    {
      field: 'expectedReturnRate',
      type: 'range' as const,
      message: 'Expected return rate must be between -10% and 25%',
      validator: (value: any) => value >= -10 && value <= 25
    },
    {
      field: 'currentAge',
      type: 'range' as const,
      message: 'Current age must be between 18 and 70',
      validator: (value: any) => value >= 18 && value <= 70
    },
    {
      field: 'retirementAge',
      type: 'business' as const,
      message: 'Retirement age must be greater than current age',
      validator: (retirementAge: any, allInputs: any) =>
        retirementAge > (allInputs?.currentAge || 0)
    },
    {
      field: 'yearsToContribute',
      type: 'business' as const,
      message: 'Years to contribute cannot exceed years to retirement',
      validator: (yearsToContribute: any, allInputs: any) => {
        const yearsToRetirement = (allInputs?.retirementAge || 0) - (allInputs?.currentAge || 0);
        return yearsToContribute <= yearsToRetirement;
      }
    }
  ];
}