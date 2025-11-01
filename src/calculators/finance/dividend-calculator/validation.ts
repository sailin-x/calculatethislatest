import { DividendCalculatorInputs } from './types';

export function validateDividendCalculatorInputs(inputs: DividendCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate stock price
  if (!inputs.stockPrice || inputs.stockPrice <= 0) {
    errors.push({ field: 'stockPrice', message: 'Stock price must be greater than 0' });
  }

  // Validate annual dividend
  if (inputs.annualDividend === undefined || inputs.annualDividend < 0) {
    errors.push({ field: 'annualDividend', message: 'Annual dividend cannot be negative' });
  }

  // Validate dividend frequency
  const validFrequencies = ['annual', 'semi-annual', 'quarterly', 'monthly'];
  if (!inputs.dividendFrequency || !validFrequencies.includes(inputs.dividendFrequency)) {
    errors.push({ field: 'dividendFrequency', message: 'Dividend frequency must be annual, semi-annual, quarterly, or monthly' });
  }

  // Validate holding period if provided
  if (inputs.holdingPeriod !== undefined && (inputs.holdingPeriod <= 0 || inputs.holdingPeriod > 100)) {
    errors.push({ field: 'holdingPeriod', message: 'Holding period must be between 0 and 100 years' });
  }

  return errors;
}

export function validateDividendCalculatorBusinessRules(inputs: DividendCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business rule validations
  if (inputs.annualDividend && inputs.stockPrice && (inputs.annualDividend / inputs.stockPrice) > 0.15) {
    warnings.push({
      field: 'annualDividend',
      message: 'Dividend yield >15% may indicate unsustainable payout or special situation'
    });
  }

  if (inputs.annualDividend && inputs.annualDividend < 0.01) {
    warnings.push({
      field: 'annualDividend',
      message: 'Very low dividend amount - verify dividend payment history'
    });
  }

  return warnings;
}
