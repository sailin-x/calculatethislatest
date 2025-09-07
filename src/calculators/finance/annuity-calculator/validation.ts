import { AnnuityCalculatorInputs } from './types';

export function validateAnnuityCalculatorInputs(inputs: AnnuityCalculatorInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Principal validation
  if (!inputs.principal || inputs.principal < 1000 || inputs.principal > 10000000) {
    errors.push('Principal amount must be between $1,000 and $10,000,000');
  }

  // Annual rate validation
  if (inputs.annualRate === undefined || inputs.annualRate < 0 || inputs.annualRate > 20) {
    errors.push('Annual interest rate must be between 0% and 20%');
  }

  // Term validation
  if (!inputs.term || inputs.term < 1 || inputs.term > 50) {
    errors.push('Annuity term must be between 1 and 50 years');
  }

  // Payment frequency validation
  if (!inputs.paymentFrequency || ![1, 2, 4, 12, 52].includes(inputs.paymentFrequency)) {
    errors.push('Payment frequency must be valid (annually, semi-annually, quarterly, monthly, or weekly)');
  }

  // Tax rate validation
  if (inputs.taxRate === undefined || inputs.taxRate < 0 || inputs.taxRate > 100) {
    errors.push('Tax rate must be between 0% and 100%');
  }

  // Inflation rate validation
  if (inputs.inflationRate === undefined || inputs.inflationRate < -20 || inputs.inflationRate > 50) {
    errors.push('Inflation rate must be between -20% and 50%');
  }

  // Deferral period validation (for deferred annuities)
  if (inputs.annuityType === 'deferred' && (!inputs.deferralPeriod || inputs.deferralPeriod < 0 || inputs.deferralPeriod > 30)) {
    errors.push('Deferral period must be between 0 and 30 years for deferred annuities');
  }

  // Accumulation rate validation (for deferred annuities)
  if (inputs.annuityType === 'deferred' && (inputs.accumulationRate === undefined || inputs.accumulationRate < 0 || inputs.accumulationRate > 20)) {
    errors.push('Accumulation rate must be between 0% and 20% for deferred annuities');
  }

  // Expected return validation (for variable annuities)
  if (inputs.annuityType === 'variable' && (inputs.expectedReturn === undefined || inputs.expectedReturn < -50 || inputs.expectedReturn > 50)) {
    errors.push('Expected return must be between -50% and 50% for variable annuities');
  }

  // Volatility validation (for variable annuities)
  if (inputs.annuityType === 'variable' && (inputs.volatility === undefined || inputs.volatility < 0 || inputs.volatility > 100)) {
    errors.push('Volatility must be between 0% and 100% for variable annuities');
  }

  // Death benefit validation
  if (inputs.includeDeathBenefit && (!inputs.deathBenefitAmount || inputs.deathBenefitAmount < 0 || inputs.deathBenefitAmount > 10000000)) {
    errors.push('Death benefit amount must be between $0 and $10,000,000');
  }

  // Monte Carlo samples validation
  if (inputs.monteCarloSamples && (inputs.monteCarloSamples < 1000 || inputs.monteCarloSamples > 100000)) {
    errors.push('Monte Carlo samples must be between 1,000 and 100,000');
  }

  // Confidence level validation
  if (inputs.confidenceLevel && (inputs.confidenceLevel < 50 || inputs.confidenceLevel > 99)) {
    errors.push('Confidence level must be between 50% and 99%');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateAnnuityCalculatorBusinessRules(inputs: AnnuityCalculatorInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.annuityType === 'immediate' && inputs.term > 30) {
    warnings.push('Immediate annuities with terms over 30 years may have lower payment amounts');
  }

  if (inputs.annuityType === 'deferred' && inputs.deferralPeriod && inputs.deferralPeriod > 20) {
    warnings.push('Long deferral periods may reduce the impact of inflation on payments');
  }

  if (inputs.annuityType === 'variable' && inputs.volatility && inputs.volatility > 25) {
    warnings.push('High volatility may result in significant payment fluctuations');
  }

  if (inputs.annualRate < 2) {
    warnings.push('Low interest rates may result in lower annuity payments');
  }

  if (inputs.annualRate > 10) {
    warnings.push('High interest rates may indicate higher risk or limited availability');
  }

  if (inputs.term < 5) {
    warnings.push('Short annuity terms may not provide sufficient retirement income');
  }

  if (inputs.term > 40) {
    warnings.push('Long annuity terms may result in lower periodic payments');
  }

  if (inputs.taxRate > 35) {
    warnings.push('High tax rates may significantly reduce after-tax annuity income');
  }

  if (inputs.inflationRate > 4) {
    warnings.push('High inflation may erode the purchasing power of fixed annuity payments');
  }

  if (inputs.principal < 50000) {
    warnings.push('Low principal amounts may result in modest annuity payments');
  }

  if (inputs.principal > 1000000) {
    warnings.push('High principal amounts may qualify for premium annuity products');
  }

  if (inputs.includeSurrenderCharges && inputs.term < 10) {
    warnings.push('Surrender charges with short terms may limit liquidity');
  }

  if (inputs.annuityType === 'variable' && !inputs.monteCarloSamples) {
    warnings.push('Variable annuities benefit from Monte Carlo risk analysis');
  }

  if (inputs.paymentFrequency === 52 && inputs.term > 20) {
    warnings.push('Weekly payments over long terms may result in complex payment schedules');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}