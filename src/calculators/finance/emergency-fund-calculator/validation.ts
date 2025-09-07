import { EmergencyFundCalculatorInputs } from './types';

export function validateEmergencyFundCalculatorInputs(inputs: EmergencyFundCalculatorInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Income validation
  if (!inputs.monthlyIncome || inputs.monthlyIncome <= 0) {
    errors.push('Monthly income must be greater than 0');
  }

  if (inputs.monthlyIncome > 100000) {
    errors.push('Monthly income seems unusually high - please verify');
  }

  // Expense validation
  if (!inputs.monthlyExpenses || inputs.monthlyExpenses <= 0) {
    errors.push('Monthly expenses must be greater than 0');
  }

  if (inputs.monthlyExpenses > inputs.monthlyIncome * 2) {
    errors.push('Monthly expenses are more than 2x income - this may indicate data entry error');
  }

  // Emergency fund validation
  if (inputs.currentEmergencyFund !== undefined && inputs.currentEmergencyFund < 0) {
    errors.push('Current emergency fund cannot be negative');
  }

  // Debt validation
  if (inputs.monthlyDebtPayments !== undefined && inputs.monthlyDebtPayments < 0) {
    errors.push('Monthly debt payments cannot be negative');
  }

  if (inputs.monthlyDebtPayments > inputs.monthlyIncome * 0.8) {
    errors.push('Debt payments exceed 80% of income - this may be unsustainable');
  }

  // Credit score validation
  if (inputs.creditScore !== undefined && (inputs.creditScore < 300 || inputs.creditScore > 850)) {
    errors.push('Credit score must be between 300 and 850');
  }

  // Dependents validation
  if (inputs.dependents !== undefined && (inputs.dependents < 0 || inputs.dependents > 15)) {
    errors.push('Number of dependents must be between 0 and 15');
  }

  // Time factors validation
  if (!inputs.timeToFindNewJob || inputs.timeToFindNewJob < 1 || inputs.timeToFindNewJob > 24) {
    errors.push('Time to find new job must be between 1 and 24 months');
  }

  if (!inputs.desiredCoveragePeriod || inputs.desiredCoveragePeriod < 1 || inputs.desiredCoveragePeriod > 24) {
    errors.push('Desired coverage period must be between 1 and 24 months');
  }

  // Rate validation
  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -0.05 || inputs.inflationRate > 0.1)) {
    errors.push('Inflation rate must be between -5% and 10%');
  }

  if (inputs.expectedReturnRate !== undefined && (inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.1)) {
    errors.push('Expected return rate for emergency funds should be between -10% and 10%');
  }

  // Geographic factors validation
  if (inputs.costOfLivingIndex !== undefined && (inputs.costOfLivingIndex < 50 || inputs.costOfLivingIndex > 300)) {
    errors.push('Cost of living index must be between 50 and 300');
  }

  if (inputs.localUnemploymentRate !== undefined && (inputs.localUnemploymentRate < 0 || inputs.localUnemploymentRate > 50)) {
    errors.push('Local unemployment rate must be between 0% and 50%');
  }

  // Analysis period validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 120) {
    errors.push('Analysis period must be between 1 and 120 months');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateEmergencyFundCalculatorBusinessRules(inputs: EmergencyFundCalculatorInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.monthlyExpenses > inputs.monthlyIncome * 1.5) {
    warnings.push('Your expenses are very high relative to income. Consider expense reduction strategies.');
  }

  if (inputs.currentEmergencyFund < inputs.monthlyExpenses * 1) {
    warnings.push('Your emergency fund covers less than 1 month of expenses. This is critically low.');
  }

  if (inputs.monthlyDebtPayments > inputs.monthlyIncome * 0.4) {
    warnings.push('High debt payments may limit your ability to build an emergency fund.');
  }

  if (inputs.jobStability === 'very_unstable' && inputs.timeToFindNewJob > 6) {
    warnings.push('With unstable employment, consider a larger emergency fund for extended job search periods.');
  }

  if (inputs.healthStatus === 'poor' || inputs.healthStatus === 'critical') {
    warnings.push('Poor health status increases the need for a robust emergency fund.');
  }

  if (inputs.dependents > 3) {
    warnings.push('Multiple dependents increase emergency fund requirements significantly.');
  }

  if (inputs.employmentType === 'self_employed' && inputs.currentEmergencyFund < inputs.monthlyExpenses * 6) {
    warnings.push('Self-employed individuals typically need 6+ months of expenses in emergency funds.');
  }

  if (inputs.expectedReturnRate > 0.05) {
    warnings.push('Emergency funds should prioritize liquidity over high returns. Consider lower-risk options.');
  }

  if (inputs.locationRisk === 'very_high' && inputs.currentEmergencyFund < inputs.monthlyExpenses * 8) {
    warnings.push('High location risk requires a larger emergency fund for natural disasters and other emergencies.');
  }

  if (inputs.industryRisk === 'very_high') {
    warnings.push('High industry risk may lead to employment instability. Consider larger emergency fund.');
  }

  if (inputs.costOfLivingIndex > 150 && inputs.currentEmergencyFund < inputs.monthlyExpenses * 4) {
    warnings.push('High cost of living areas require larger emergency funds.');
  }

  if (inputs.localUnemploymentRate > 10) {
    warnings.push('High local unemployment rate increases job loss risk and emergency fund needs.');
  }

  if (inputs.desiredCoveragePeriod < 3) {
    warnings.push('3 months is the minimum recommended emergency fund coverage.');
  }

  if (inputs.analysisPeriod < 12) {
    warnings.push('Consider a longer analysis period for more comprehensive emergency fund planning.');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}