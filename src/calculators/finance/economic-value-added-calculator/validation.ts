import { EconomicValueAddedInputs } from './types';

export function validateEconomicValueAddedInputs(inputs: EconomicValueAddedInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate NOPAT
  if (!inputs.netOperatingProfitAfterTax || inputs.netOperatingProfitAfterTax < 0) {
    errors.push({ field: 'netOperatingProfitAfterTax', message: 'NOPAT cannot be negative' });
  }

  // Validate capital employed
  if (!inputs.capitalEmployed || inputs.capitalEmployed <= 0) {
    errors.push({ field: 'capitalEmployed', message: 'Capital employed must be greater than 0' });
  }

  // Validate cost of capital
  if (!inputs.costOfCapital || inputs.costOfCapital <= 0 || inputs.costOfCapital > 1) {
    errors.push({ field: 'costOfCapital', message: 'Cost of capital must be between 0 and 100%' });
  }

  // Validate tax rate
  if (inputs.taxRate === undefined || inputs.taxRate < 0 || inputs.taxRate > 1) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be between 0 and 100%' });
  }

  // Validate company information
  if (inputs.totalAssets && inputs.totalAssets < 0) {
    errors.push({ field: 'totalAssets', message: 'Total assets cannot be negative' });
  }

  if (inputs.currentLiabilities && inputs.currentLiabilities < 0) {
    errors.push({ field: 'currentLiabilities', message: 'Current liabilities cannot be negative' });
  }

  if (inputs.totalEquity && inputs.totalEquity < 0) {
    errors.push({ field: 'totalEquity', message: 'Total equity cannot be negative' });
  }

  return errors;
}

export function validateEconomicValueAddedBusinessRules(inputs: EconomicValueAddedInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business rule validations
  if (inputs.costOfCapital && inputs.costOfCapital > 0.25) {
    warnings.push({
      field: 'costOfCapital',
      message: 'Cost of capital >25% may indicate high financial risk'
    });
  }

  if (inputs.netOperatingProfitAfterTax && inputs.capitalEmployed &&
      (inputs.netOperatingProfitAfterTax / inputs.capitalEmployed) < 0.02) {
    warnings.push({
      field: 'netOperatingProfitAfterTax',
      message: 'NOPAT to capital ratio <2% indicates low profitability'
    });
  }

  return warnings;
}