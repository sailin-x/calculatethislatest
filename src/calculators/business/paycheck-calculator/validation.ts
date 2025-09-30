import { PaycheckCalculatorInputs } from './types';

export function validatePaycheckCalculatorInputs(inputs: PaycheckCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Gross Pay Validation
  if (!inputs.grossPay || inputs.grossPay <= 0) {
    errors.push({ field: 'grossPay', message: 'Gross pay must be greater than 0' });
  }
  if (inputs.grossPay && inputs.grossPay > 10000000) {
    errors.push({ field: 'grossPay', message: 'Gross pay cannot exceed $10,000,000' });
  }

  // Pay Frequency Validation
  if (!inputs.payFrequency) {
    errors.push({ field: 'payFrequency', message: 'Pay frequency is required' });
  }

  // Filing Status Validation
  if (!inputs.filingStatus) {
    errors.push({ field: 'filingStatus', message: 'Filing status is required' });
  }

  // Dependents Validation
  if (inputs.dependents && inputs.dependents < 0) {
    errors.push({ field: 'dependents', message: 'Number of dependents cannot be negative' });
  }
  if (inputs.dependents && inputs.dependents > 10) {
    errors.push({ field: 'dependents', message: 'Number of dependents cannot exceed 10' });
  }

  // Deductions Validation
  if (inputs.preTaxDeductions && inputs.preTaxDeductions < 0) {
    errors.push({ field: 'preTaxDeductions', message: 'Pre-tax deductions cannot be negative' });
  }
  if (inputs.retirementContributions && inputs.retirementContributions < 0) {
    errors.push({ field: 'retirementContributions', message: 'Retirement contributions cannot be negative' });
  }
  if (inputs.healthInsurance && inputs.healthInsurance < 0) {
    errors.push({ field: 'healthInsurance', message: 'Health insurance cannot be negative' });
  }
  if (inputs.additionalDeductions && inputs.additionalDeductions < 0) {
    errors.push({ field: 'additionalDeductions', message: 'Additional deductions cannot be negative' });
  }

  // Total deductions validation
  const totalDeductions = (inputs.preTaxDeductions || 0) +
                         (inputs.retirementContributions || 0) +
                         (inputs.healthInsurance || 0) +
                         (inputs.additionalDeductions || 0);

  if (inputs.grossPay && totalDeductions > inputs.grossPay) {
    errors.push({ field: 'preTaxDeductions', message: 'Total deductions cannot exceed gross pay' });
  }

  return errors;
}

export function validatePaycheckCalculatorBusinessRules(inputs: PaycheckCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // High deduction warnings
  const totalDeductions = (inputs.preTaxDeductions || 0) +
                         (inputs.retirementContributions || 0) +
                         (inputs.healthInsurance || 0) +
                         (inputs.additionalDeductions || 0);

  if (inputs.grossPay && (totalDeductions / inputs.grossPay) > 0.5) {
    warnings.push({ field: 'preTaxDeductions', message: 'Total deductions exceed 50% of gross pay' });
  }

  // Retirement contribution limits
  const annualRetirement = (inputs.retirementContributions || 0) * getPayPeriodsPerYear(inputs.payFrequency);
  if (annualRetirement > 23000) { // 2024 401k limit
    warnings.push({ field: 'retirementContributions', message: 'Retirement contributions may exceed annual IRS limits' });
  }

  // Low take-home pay warnings
  const estimatedNetPay = inputs.grossPay - totalDeductions;
  if (inputs.grossPay && (estimatedNetPay / inputs.grossPay) < 0.6) {
    warnings.push({ field: 'grossPay', message: 'Take-home pay is less than 60% of gross pay' });
  }

  return warnings;
}

function getPayPeriodsPerYear(frequency: string): number {
  switch (frequency) {
    case 'weekly': return 52;
    case 'biweekly': return 26;
    case 'semimonthly': return 24;
    case 'monthly': return 12;
    case 'annually': return 1;
    default: return 12;
  }
}