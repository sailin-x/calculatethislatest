import { VariableAnnuityInputs } from './types';

export function validateVariableAnnuityInputs(inputs: VariableAnnuityInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Initial Investment Validation
  if (!inputs.initialInvestment || inputs.initialInvestment < 0) {
    errors.push({ field: 'initialInvestment', message: 'Initial investment must be 0 or greater' });
  }
  if (inputs.initialInvestment && inputs.initialInvestment > 10000000) {
    errors.push({ field: 'initialInvestment', message: 'Initial investment cannot exceed $10,000,000' });
  }

  // Monthly Contribution Validation
  if (inputs.monthlyContribution < 0) {
    errors.push({ field: 'monthlyContribution', message: 'Monthly contribution cannot be negative' });
  }
  if (inputs.monthlyContribution > 50000) {
    errors.push({ field: 'monthlyContribution', message: 'Monthly contribution cannot exceed $50,000' });
  }

  // Investment Horizon Validation
  if (!inputs.investmentHorizon || inputs.investmentHorizon < 1) {
    errors.push({ field: 'investmentHorizon', message: 'Investment horizon must be at least 1 year' });
  }
  if (inputs.investmentHorizon && inputs.investmentHorizon > 50) {
    errors.push({ field: 'investmentHorizon', message: 'Investment horizon cannot exceed 50 years' });
  }

  // Age Validation
  if (!inputs.currentAge || inputs.currentAge < 18) {
    errors.push({ field: 'currentAge', message: 'Current age must be at least 18' });
  }
  if (inputs.currentAge && inputs.currentAge > 100) {
    errors.push({ field: 'currentAge', message: 'Current age cannot exceed 100' });
  }

  if (!inputs.annuityStartAge || inputs.annuityStartAge < inputs.currentAge) {
    errors.push({ field: 'annuityStartAge', message: 'Annuity start age must be greater than or equal to current age' });
  }
  if (inputs.annuityStartAge && inputs.annuityStartAge > 100) {
    errors.push({ field: 'annuityStartAge', message: 'Annuity start age cannot exceed 100' });
  }

  // Return Rate Validation
  if (inputs.expectedReturnRate < -10 || inputs.expectedReturnRate > 25) {
    errors.push({ field: 'expectedReturnRate', message: 'Expected return rate must be between -10% and 25%' });
  }

  // Volatility Validation
  if (inputs.volatility < 0 || inputs.volatility > 50) {
    errors.push({ field: 'volatility', message: 'Volatility must be between 0% and 50%' });
  }

  // Annuity Payout Rate Validation
  if (!inputs.annuityPayoutRate || inputs.annuityPayoutRate < 1) {
    errors.push({ field: 'annuityPayoutRate', message: 'Annuity payout rate must be at least 1%' });
  }
  if (inputs.annuityPayoutRate && inputs.annuityPayoutRate > 15) {
    errors.push({ field: 'annuityPayoutRate', message: 'Annuity payout rate cannot exceed 15%' });
  }

  // Inflation Rate Validation
  if (inputs.inflationRate < -5 || inputs.inflationRate > 10) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -5% and 10%' });
  }

  // Tax Bracket Validation
  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push({ field: 'taxBracket', message: 'Tax bracket must be between 0% and 50%' });
  }

  // Annuity Type Validation
  if (!inputs.annuityType || !['immediate', 'deferred'].includes(inputs.annuityType)) {
    errors.push({ field: 'annuityType', message: 'Annuity type must be immediate or deferred' });
  }

  // Payout Type Validation
  if (!inputs.payoutType || !['lifetime', 'period_certain', 'joint_survivor'].includes(inputs.payoutType)) {
    errors.push({ field: 'payoutType', message: 'Payout type must be lifetime, period_certain, or joint_survivor' });
  }

  // Fee Validation
  if (inputs.riderFees < 0 || inputs.riderFees > 5) {
    errors.push({ field: 'riderFees', message: 'Rider fees must be between 0% and 5%' });
  }

  if (inputs.managementFees < 0 || inputs.managementFees > 3) {
    errors.push({ field: 'managementFees', message: 'Management fees must be between 0% and 3%' });
  }

  return errors;
}

export function validateVariableAnnuityBusinessRules(inputs: VariableAnnuityInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Age Warnings
  const yearsToAnnuity = inputs.annuityStartAge - inputs.currentAge;
  if (yearsToAnnuity < 5) {
    warnings.push({ field: 'annuityStartAge', message: 'Short time to annuity start may limit growth potential' });
  }

  // Investment Horizon Warnings
  if (inputs.investmentHorizon < 10) {
    warnings.push({ field: 'investmentHorizon', message: 'Short investment horizon increases risk of loss' });
  }

  // Volatility Warnings
  if (inputs.volatility > 25) {
    warnings.push({ field: 'volatility', message: 'High volatility may result in significant value fluctuations' });
  }

  // Return Rate Warnings
  if (inputs.expectedReturnRate > 12) {
    warnings.push({ field: 'expectedReturnRate', message: 'High expected return may be unrealistic' });
  }

  // Contribution Warnings
  const totalContributions = inputs.initialInvestment + (inputs.monthlyContribution * inputs.investmentHorizon * 12);
  if (totalContributions < 50000) {
    warnings.push({ field: 'initialInvestment', message: 'Low total contributions may result in insufficient annuity income' });
  }

  // Tax Bracket Warnings
  if (inputs.taxBracket > 35) {
    warnings.push({ field: 'taxBracket', message: 'High tax bracket reduces annuity efficiency' });
  }

  // Fee Warnings
  const totalFees = inputs.riderFees + inputs.managementFees;
  if (totalFees > 3) {
    warnings.push({ field: 'riderFees', message: 'High fees may significantly reduce returns' });
  }

  // Age Suitability Warnings
  if (inputs.currentAge < 50 && inputs.annuityType === 'immediate') {
    warnings.push({ field: 'annuityType', message: 'Immediate annuities are typically more suitable for those over 50' });
  }

  return warnings;
}