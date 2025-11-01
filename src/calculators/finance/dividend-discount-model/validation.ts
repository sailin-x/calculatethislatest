import { DividendDiscountModelInputs } from './types';

export function validateDividendDiscountModelInputs(inputs: DividendDiscountModelInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate current dividend
  if (!inputs.currentDividend || inputs.currentDividend <= 0) {
    errors.push({ field: 'currentDividend', message: 'Current dividend must be greater than 0' });
  }

  // Validate growth rate
  if (inputs.expectedGrowthRate === undefined || inputs.expectedGrowthRate < 0) {
    errors.push({ field: 'expectedGrowthRate', message: 'Expected growth rate cannot be negative' });
  }

  if (inputs.expectedGrowthRate && inputs.expectedGrowthRate > 0.5) {
    errors.push({ field: 'expectedGrowthRate', message: 'Expected growth rate seems unusually high (>50%)' });
  }

  // Validate discount rate
  if (!inputs.discountRate || inputs.discountRate <= 0) {
    errors.push({ field: 'discountRate', message: 'Discount rate must be greater than 0' });
  }

  if (inputs.discountRate && inputs.discountRate > 0.5) {
    errors.push({ field: 'discountRate', message: 'Discount rate seems unusually high (>50%)' });
  }

  // Validate relationship between discount rate and growth rate
  if (inputs.discountRate && inputs.expectedGrowthRate && inputs.discountRate <= inputs.expectedGrowthRate) {
    errors.push({ field: 'discountRate', message: 'Discount rate must be greater than growth rate for Gordon Growth Model' });
  }

  // Validate number of years if provided
  if (inputs.numberOfYears !== undefined && (inputs.numberOfYears <= 0 || inputs.numberOfYears > 100)) {
    errors.push({ field: 'numberOfYears', message: 'Number of years must be between 1 and 100' });
  }

  return errors;
}

export function validateDividendDiscountModelBusinessRules(inputs: DividendDiscountModelInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business rule validations
  if (inputs.expectedGrowthRate && inputs.expectedGrowthRate > inputs.discountRate * 0.8) {
    warnings.push({
      field: 'expectedGrowthRate',
      message: 'Growth rate is close to discount rate - model may be sensitive to small changes'
    });
  }

  if (inputs.currentDividend && inputs.currentDividend < 0.01) {
    warnings.push({
      field: 'currentDividend',
      message: 'Very low dividend amount - verify dividend payment history'
    });
  }

  return warnings;
}