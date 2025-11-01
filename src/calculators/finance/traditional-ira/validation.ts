import { TraditionalIRAInputs } from './types';

export function validateTraditionalIRAInputs(inputs: TraditionalIRAInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Current balance validation
  if (inputs.currentBalance && inputs.currentBalance < 0) {
    errors.push({ field: 'currentBalance', message: 'Current balance cannot be negative' });
  }

  // Annual contribution validation
  if (!inputs.annualContribution || inputs.annualContribution <= 0) {
    errors.push({ field: 'annualContribution', message: 'Annual contribution must be greater than 0' });
  }
  if (inputs.annualContribution && inputs.annualContribution > 8000) {
    errors.push({ field: 'annualContribution', message: 'Annual contribution cannot exceed $8,000 (2024 limit)' });
  }

  // Age validation
  if (!inputs.currentAge || inputs.currentAge < 18) {
    errors.push({ field: 'currentAge', message: 'Current age must be at least 18' });
  }
  if (inputs.currentAge && inputs.currentAge > 100) {
    errors.push({ field: 'currentAge', message: 'Current age cannot exceed 100' });
  }

  // Retirement age validation
  if (!inputs.retirementAge || inputs.retirementAge < inputs.currentAge + 1) {
    errors.push({ field: 'retirementAge', message: 'Retirement age must be greater than current age' });
  }
  if (inputs.retirementAge && inputs.retirementAge > 100) {
    errors.push({ field: 'retirementAge', message: 'Retirement age cannot exceed 100' });
  }

  // Expected return validation
  if (inputs.expectedReturn && (inputs.expectedReturn < -10 || inputs.expectedReturn > 30)) {
    errors.push({ field: 'expectedReturn', message: 'Expected return must be between -10% and 30%' });
  }

  // Inflation rate validation
  if (inputs.inflationRate && (inputs.inflationRate < -5 || inputs.inflationRate > 15)) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -5% and 15%' });
  }

  // Tax bracket validation
  if (!inputs.taxBracket || inputs.taxBracket < 0) {
    errors.push({ field: 'taxBracket', message: 'Tax bracket must be 0 or greater' });
  }
  if (inputs.taxBracket && inputs.taxBracket > 50) {
    errors.push({ field: 'taxBracket', message: 'Tax bracket cannot exceed 50%' });
  }

  // Employer match validation
  if (inputs.employerMatch && inputs.employerMatch < 0) {
    errors.push({ field: 'employerMatch', message: 'Employer match cannot be negative' });
  }
  if (inputs.employerMatch && inputs.employerMatch > 100) {
    errors.push({ field: 'employerMatch', message: 'Employer match cannot exceed 100%' });
  }

  // Spousal income validation
  if (inputs.spousalIncome && inputs.spousalIncome < 0) {
    errors.push({ field: 'spousalIncome', message: 'Spousal income cannot be negative' });
  }

  // State tax rate validation
  if (inputs.stateTaxRate && (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 20)) {
    errors.push({ field: 'stateTaxRate', message: 'State tax rate must be between 0% and 20%' });
  }

  // Years until retirement validation
  if (!inputs.yearsUntilRetirement || inputs.yearsUntilRetirement < 0) {
    errors.push({ field: 'yearsUntilRetirement', message: 'Years until retirement must be 0 or greater' });
  }
  if (inputs.yearsUntilRetirement && inputs.yearsUntilRetirement > 80) {
    errors.push({ field: 'yearsUntilRetirement', message: 'Years until retirement cannot exceed 80' });
  }

  return errors;
}

export function validateTraditionalIRABusinessRules(inputs: TraditionalIRAInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Contribution limit warnings
  const maxContribution = inputs.currentAge >= 50 && inputs.catchUpContributions ? 8000 : 7000;
  if (inputs.annualContribution > maxContribution) {
    warnings.push({ field: 'annualContribution', message: `Contribution exceeds 2024 IRA limit of $${maxContribution}` });
  }

  // Age-based warnings
  if (inputs.currentAge >= 50 && !inputs.catchUpContributions) {
    warnings.push({ field: 'catchUpContributions', message: 'You may be eligible for catch-up contributions of $1,000' });
  }

  // Retirement age warnings
  if (inputs.retirementAge < 59.5) {
    warnings.push({ field: 'retirementAge', message: 'Early withdrawal penalties may apply before age 59½' });
  }

  // Required minimum distribution warnings
  if (inputs.retirementAge >= 73) {
    warnings.push({ field: 'retirementAge', message: 'Required minimum distributions will be required starting at age 73' });
  }

  // Income limits for Traditional IRA contributions
  if (inputs.taxFilingStatus === 'single' && inputs.annualContribution > 0) {
    // Simplified MAGI limits - in practice this is more complex
    warnings.push({ field: 'annualContribution', message: 'Ensure your MAGI allows Traditional IRA contributions' });
  }

  // Investment strategy warnings
  if (inputs.investmentStrategy === 'aggressive' && inputs.yearsUntilRetirement < 10) {
    warnings.push({ field: 'investmentStrategy', message: 'Aggressive strategy may not be suitable with short time horizon' });
  }

  if (inputs.investmentStrategy === 'conservative' && inputs.expectedReturn > 8) {
    warnings.push({ field: 'investmentStrategy', message: 'Conservative strategy may not achieve high expected returns' });
  }

  // Tax bracket warnings
  if (inputs.taxBracket > 32) {
    warnings.push({ field: 'taxBracket', message: 'High tax bracket maximizes Traditional IRA tax benefits' });
  }

  if (inputs.taxBracket < 12) {
    warnings.push({ field: 'taxBracket', message: 'Low tax bracket may make Roth IRA more beneficial' });
  }

  // Inflation rate warnings
  if (inputs.inflationRate > 5) {
    warnings.push({ field: 'inflationRate', message: 'High inflation may erode purchasing power in retirement' });
  }

  // Spousal IRA eligibility
  if (inputs.spousalIRA && (!inputs.spousalIncome || inputs.spousalIncome <= 0)) {
    warnings.push({ field: 'spousalIncome', message: 'Spousal IRA requires spousal income for eligibility' });
  }

  // Employer match consideration
  if (inputs.employerMatch && inputs.employerMatch > 0) {
    warnings.push({ field: 'employerMatch', message: 'Consider maximizing employer match before IRA contributions' });
  }

  return warnings;
}