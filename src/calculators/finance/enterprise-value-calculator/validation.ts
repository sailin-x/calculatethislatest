import { EnterpriseValueCalculatorInputs } from './types';

export function validateEnterpriseValueCalculatorInputs(inputs: EnterpriseValueCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate market cap
  if (!inputs.marketCap || inputs.marketCap <= 0) {
    errors.push({ field: 'marketCap', message: 'Market capitalization must be greater than 0' });
  }

  // Validate total debt
  if (inputs.totalDebt === undefined || inputs.totalDebt < 0) {
    errors.push({ field: 'totalDebt', message: 'Total debt cannot be negative' });
  }

  // Validate cash and equivalents
  if (inputs.cashAndEquivalents === undefined || inputs.cashAndEquivalents < 0) {
    errors.push({ field: 'cashAndEquivalents', message: 'Cash and equivalents cannot be negative' });
  }

  // Validate preferred stock if provided
  if (inputs.preferredStock !== undefined && inputs.preferredStock < 0) {
    errors.push({ field: 'preferredStock', message: 'Preferred stock cannot be negative' });
  }

  // Validate minority interest if provided
  if (inputs.minorityInterest !== undefined && inputs.minorityInterest < 0) {
    errors.push({ field: 'minorityInterest', message: 'Minority interest cannot be negative' });
  }

  return errors;
}

export function validateEnterpriseValueCalculatorBusinessRules(inputs: EnterpriseValueCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Business rule validations
  if (inputs.cashAndEquivalents && inputs.totalDebt && inputs.cashAndEquivalents > inputs.totalDebt) {
    warnings.push({
      field: 'cashAndEquivalents',
      message: 'Cash exceeds total debt - company has net cash position'
    });
  }

  if (inputs.marketCap && inputs.marketCap < 1000000) {
    warnings.push({
      field: 'marketCap',
      message: 'Very low market capitalization - verify company data'
    });
  }

  return warnings;
}
