import { PortfolioCompanyEbitdaGrowthCalculatorInputs } from './types';

export function validatePortfolioCompanyEbitdaGrowthCalculatorInputs(inputs: PortfolioCompanyEbitdaGrowthCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Primary Input Validation
  if (!inputs.primaryInput || inputs.primaryInput <= 0) {
    errors.push({ field: 'primaryInput', message: 'Primary input must be greater than 0' });
  }
  if (inputs.primaryInput && inputs.primaryInput > 1000000) {
    errors.push({ field: 'primaryInput', message: 'Primary input cannot exceed 1,000,000' });
  }

  // Secondary Input Validation (if provided)
  if (inputs.secondaryInput !== undefined && inputs.secondaryInput < 0) {
    errors.push({ field: 'secondaryInput', message: 'Secondary input cannot be negative' });
  }

  // Select Input Validation
  const validOptions = ['option1', 'option2'];
  if (!inputs.selectInput || !validOptions.includes(inputs.selectInput)) {
    errors.push({ field: 'selectInput', message: 'Please select a valid option' });
  }

  // Cross-field Validation
  if (inputs.secondaryInput && inputs.primaryInput && inputs.secondaryInput > inputs.primaryInput) {
    errors.push({ field: 'secondaryInput', message: 'Secondary input cannot exceed primary input' });
  }

  // Optional Parameter Validation
  if (inputs.optionalParameter && inputs.optionalParameter.length > 100) {
    errors.push({ field: 'optionalParameter', message: 'Optional parameter cannot exceed 100 characters' });
  }

  return errors;
}

export function validatePortfolioCompanyEbitdaGrowthCalculatorBusinessRules(inputs: PortfolioCompanyEbitdaGrowthCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business Rule Warnings
  if (inputs.primaryInput && inputs.primaryInput > 500000) {
    warnings.push({ field: 'primaryInput', message: 'High primary input values may require additional review' });
  }

  // Ratio-based Warnings
  if (inputs.secondaryInput && inputs.primaryInput) {
    const ratio = inputs.secondaryInput / inputs.primaryInput;
    if (ratio > 0.8) {
      warnings.push({ field: 'secondaryInput', message: 'Secondary input is very high relative to primary input' });
    }
  }

  // Option-specific Warnings
  if (inputs.selectInput === 'option2' && inputs.primaryInput && inputs.primaryInput < 100) {
    warnings.push({ field: 'selectInput', message: 'Option 2 may not be suitable for low primary input values' });
  }

  // Threshold Warnings
  if (inputs.primaryInput && inputs.primaryInput > 10000) {
    warnings.push({ field: 'primaryInput', message: 'Consider consulting with financial experts for high-value calculations' });
  }

  return warnings;
}