import { HsaTripleTaxAdvantageCalculatorInputs } from './types';

export function validateHsaTripleTaxAdvantageCalculatorInputs(inputs: HsaTripleTaxAdvantageCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  if (!inputs.annualContribution || inputs.annualContribution <= 0) {
    errors.push({ field: 'annualContribution', message: 'Annual contribution must be greater than 0' });
  }
  if (inputs.annualContribution && inputs.annualContribution > 100000) {
    errors.push({ field: 'annualContribution', message: 'Annual contribution cannot exceed $100,000' });
  }

  if (!inputs.taxRate || inputs.taxRate <= 0) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be greater than 0' });
  }
  if (inputs.taxRate && inputs.taxRate > 50) {
    errors.push({ field: 'taxRate', message: 'Tax rate cannot exceed 50%' });
  }

  if (!inputs.yearsOfContributions || inputs.yearsOfContributions <= 0) {
    errors.push({ field: 'yearsOfContributions', message: 'Years of contributions must be greater than 0' });
  }
  if (inputs.yearsOfContributions && inputs.yearsOfContributions > 50) {
    errors.push({ field: 'yearsOfContributions', message: 'Years of contributions cannot exceed 50' });
  }

  if (inputs.expectedGrowthRate < -50 || inputs.expectedGrowthRate > 50) {
    errors.push({ field: 'expectedGrowthRate', message: 'Expected growth rate must be between -50% and 50%' });
  }

  if (inputs.qualifiedWithdrawals < 0) {
    errors.push({ field: 'qualifiedWithdrawals', message: 'Qualified withdrawals cannot be negative' });
  }

  if (inputs.nonQualifiedWithdrawals < 0) {
    errors.push({ field: 'nonQualifiedWithdrawals', message: 'Non-qualified withdrawals cannot be negative' });
  }

  return errors;
}

export function validateHsaTripleTaxAdvantageCalculatorBusinessRules(inputs: HsaTripleTaxAdvantageCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  if (inputs.annualContribution > 8000) {
    warnings.push({
      field: 'annualContribution',
      message: 'Contribution exceeds typical HSA limit - verify eligibility and limits'
    });
  }

  if (inputs.expectedGrowthRate > 15) {
    warnings.push({
      field: 'expectedGrowthRate',
      message: 'High growth rate assumption may be unrealistic for HSA investments'
    });
  }

  if (inputs.nonQualifiedWithdrawals > 0 && inputs.yearsOfContributions < 10) {
    warnings.push({
      field: 'nonQualifiedWithdrawals',
      message: 'Early non-qualified withdrawals incur 20% penalty plus income tax'
    });
  }

  if (inputs.qualifiedWithdrawals === 0 && inputs.yearsOfContributions > 5) {
    warnings.push({
      field: 'qualifiedWithdrawals',
      message: 'Consider using HSA funds for qualified medical expenses to maximize tax benefits'
    });
  }

  return warnings;
}