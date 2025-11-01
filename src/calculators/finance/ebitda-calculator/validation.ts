import { EbitdaCalculatorInputs } from './types';

export function validateEbitdaCalculatorInputs(inputs: EbitdaCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate revenue
  if (!inputs.revenue || inputs.revenue <= 0) {
    errors.push({ field: 'revenue', message: 'Revenue must be greater than 0' });
  }

  // Validate operating expenses (can be 0 but not negative)
  if (inputs.operatingExpenses === undefined || inputs.operatingExpenses < 0) {
    errors.push({ field: 'operatingExpenses', message: 'Operating expenses cannot be negative' });
  }

  // Validate depreciation (can be 0 but not negative)
  if (inputs.depreciation === undefined || inputs.depreciation < 0) {
    errors.push({ field: 'depreciation', message: 'Depreciation cannot be negative' });
  }

  // Validate amortization (can be 0 but not negative)
  if (inputs.amortization === undefined || inputs.amortization < 0) {
    errors.push({ field: 'amortization', message: 'Amortization cannot be negative' });
  }

  // Validate interest expense if provided
  if (inputs.interestExpense !== undefined && inputs.interestExpense < 0) {
    errors.push({ field: 'interestExpense', message: 'Interest expense cannot be negative' });
  }

  // Validate tax rate if provided
  if (inputs.taxRate !== undefined && (inputs.taxRate < 0 || inputs.taxRate > 100)) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be between 0 and 100 percent' });
  }

  return errors;
}

export function validateEbitdaCalculatorBusinessRules(inputs: EbitdaCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business rule validations
  if (inputs.operatingExpenses && inputs.revenue && inputs.operatingExpenses > inputs.revenue) {
    warnings.push({
      field: 'operatingExpenses',
      message: 'Operating expenses exceed revenue - company may have negative EBITDA'
    });
  }

  if (inputs.revenue && inputs.revenue < 1000) {
    warnings.push({
      field: 'revenue',
      message: 'Very low revenue amount - verify financial data accuracy'
    });
  }

  return warnings;
}
