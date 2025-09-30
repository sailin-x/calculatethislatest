import { HealthSavingsAccountHsaCalculatorInputs } from './types';

export function validateHealthSavingsAccountHsaCalculatorInputs(inputs: HealthSavingsAccountHsaCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  if (!inputs.age || inputs.age <= 0) {
    errors.push({ field: 'age', message: 'Age must be greater than 0' });
  }
  if (inputs.age && inputs.age > 120) {
    errors.push({ field: 'age', message: 'Age cannot exceed 120' });
  }

  if (inputs.currentBalance < 0) {
    errors.push({ field: 'currentBalance', message: 'Current balance cannot be negative' });
  }

  if (!inputs.annualContribution || inputs.annualContribution < 0) {
    errors.push({ field: 'annualContribution', message: 'Annual contribution cannot be negative' });
  }

  if (inputs.expectedGrowthRate < -50 || inputs.expectedGrowthRate > 50) {
    errors.push({ field: 'expectedGrowthRate', message: 'Expected growth rate must be between -50% and 50%' });
  }

  if (!inputs.yearsToRetirement || inputs.yearsToRetirement < 0) {
    errors.push({ field: 'yearsToRetirement', message: 'Years to retirement cannot be negative' });
  }
  if (inputs.yearsToRetirement && inputs.yearsToRetirement > 100) {
    errors.push({ field: 'yearsToRetirement', message: 'Years to retirement cannot exceed 100' });
  }

  if (inputs.qualifiedWithdrawals < 0) {
    errors.push({ field: 'qualifiedWithdrawals', message: 'Qualified withdrawals cannot be negative' });
  }

  if (inputs.nonQualifiedWithdrawals < 0) {
    errors.push({ field: 'nonQualifiedWithdrawals', message: 'Non-qualified withdrawals cannot be negative' });
  }

  return errors;
}

export function validateHealthSavingsAccountHsaCalculatorBusinessRules(inputs: HealthSavingsAccountHsaCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  const contributionLimit = inputs.coverageType === 'family' ? 8200 : 4100;
  const catchUpLimit = inputs.age >= 55 ? 1000 : 0;
  const totalLimit = contributionLimit + catchUpLimit;

  if (inputs.annualContribution > totalLimit) {
    warnings.push({
      field: 'annualContribution',
      message: `Contribution exceeds annual limit of $${totalLimit.toLocaleString()}`
    });
  }

  if (inputs.age < 65 && inputs.nonQualifiedWithdrawals > 0) {
    warnings.push({
      field: 'nonQualifiedWithdrawals',
      message: 'Non-qualified withdrawals before age 65 incur 20% penalty plus income tax'
    });
  }

  if (inputs.expectedGrowthRate > 15) {
    warnings.push({
      field: 'expectedGrowthRate',
      message: 'High growth rate assumption may be unrealistic for HSA investments'
    });
  }

  if (inputs.yearsToRetirement < 5 && inputs.expectedGrowthRate > 10) {
    warnings.push({
      field: 'expectedGrowthRate',
      message: 'Conservative investing recommended for short time horizons'
    });
  }

  return warnings;
}