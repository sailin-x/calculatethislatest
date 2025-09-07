import { DeferredAnnuityInputs } from './types';

export function validateDeferredAnnuityInputs(inputs: DeferredAnnuityInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Account Information Validation
  if (inputs.initialInvestment !== undefined && inputs.initialInvestment < 0) {
    errors.push('Initial investment cannot be negative');
  }

  if (inputs.monthlyContribution !== undefined && inputs.monthlyContribution < 0) {
    errors.push('Monthly contribution cannot be negative');
  }

  if (inputs.annualContribution !== undefined && inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (inputs.currentAccountValue !== undefined && inputs.currentAccountValue < 0) {
    errors.push('Current account value cannot be negative');
  }

  // Age Validation
  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 80) {
    errors.push('Current age must be between 18 and 80');
  }

  if (!inputs.retirementAge || inputs.retirementAge <= inputs.currentAge || inputs.retirementAge > 100) {
    errors.push('Retirement age must be greater than current age and less than 100');
  }

  if (!inputs.annuityStartAge || inputs.annuityStartAge < inputs.retirementAge || inputs.annuityStartAge > 100) {
    errors.push('Annuity start age must be at or after retirement age');
  }

  if (!inputs.lifeExpectancy || inputs.lifeExpectancy <= inputs.annuityStartAge || inputs.lifeExpectancy > 120) {
    errors.push('Life expectancy must be greater than annuity start age');
  }

  // Investment Information Validation
  if (!inputs.expectedReturnRate || inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.2) {
    errors.push('Expected return rate must be between -10% and 20%');
  }

  if (!inputs.riskTolerance || !['conservative', 'moderate', 'aggressive'].includes(inputs.riskTolerance)) {
    errors.push('Valid risk tolerance must be selected');
  }

  if (!inputs.investmentType || !['fixed', 'variable', 'indexed'].includes(inputs.investmentType)) {
    errors.push('Valid investment type must be selected');
  }

  // Annuity Information Validation
  if (!inputs.annuityType || !['fixed', 'variable', 'immediate', 'deferred'].includes(inputs.annuityType)) {
    errors.push('Valid annuity type must be selected');
  }

  if (!inputs.payoutType || !['lifetime', 'period_certain', 'joint_survivor', 'lump_sum'].includes(inputs.payoutType)) {
    errors.push('Valid payout type must be selected');
  }

  if (!inputs.payoutFrequency || !['monthly', 'quarterly', 'annually'].includes(inputs.payoutFrequency)) {
    errors.push('Valid payout frequency must be selected');
  }

  // Tax Information Validation
  if (inputs.taxBracket !== undefined && (inputs.taxBracket < 0 || inputs.taxBracket > 0.5)) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (!inputs.accountType || !['traditional', 'roth', 'non_qualified'].includes(inputs.accountType)) {
    errors.push('Valid account type must be selected');
  }

  if (inputs.stateTaxRate !== undefined && (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 0.2)) {
    errors.push('State tax rate must be between 0% and 20%');
  }

  // Fees and Expenses Validation
  if (inputs.annualFees !== undefined && inputs.annualFees < 0) {
    errors.push('Annual fees cannot be negative');
  }

  if (inputs.expenseRatio !== undefined && (inputs.expenseRatio < 0 || inputs.expenseRatio > 0.1)) {
    errors.push('Expense ratio must be between 0% and 10%');
  }

  if (inputs.surrenderCharges !== undefined && inputs.surrenderCharges < 0) {
    errors.push('Surrender charges cannot be negative');
  }

  // Inflation and Assumptions Validation
  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -0.05 || inputs.inflationRate > 0.1)) {
    errors.push('Inflation rate must be between -5% and 10%');
  }

  if (inputs.annuityGrowthRate !== undefined && (inputs.annuityGrowthRate < -0.1 || inputs.annuityGrowthRate > 0.2)) {
    errors.push('Annuity growth rate must be between -10% and 20%');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  if (inputs.socialSecurityBenefit !== undefined && inputs.socialSecurityBenefit < 0) {
    errors.push('Social Security benefit cannot be negative');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateDeferredAnnuityBusinessRules(inputs: DeferredAnnuityInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.currentAge && inputs.retirementAge) {
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
    if (yearsToRetirement < 5) {
      warnings.push('Short time to retirement - consider immediate annuity options');
    }
    if (yearsToRetirement > 30) {
      warnings.push('Long time to retirement - focus on accumulation phase');
    }
  }

  // Contribution adequacy warnings
  const totalAnnualContribution = (inputs.monthlyContribution || 0) * 12 + (inputs.annualContribution || 0);
  if (totalAnnualContribution < 2000) {
    warnings.push('Low annual contribution may not meet retirement goals');
  }

  // Risk tolerance warnings
  if (inputs.expectedReturnRate && inputs.expectedReturnRate > 0.12 && inputs.riskTolerance === 'conservative') {
    warnings.push('High expected return may not align with conservative risk tolerance');
  }

  // Annuity type warnings
  if (inputs.annuityType === 'variable' && inputs.riskTolerance === 'conservative') {
    warnings.push('Variable annuity may be too risky for conservative investors');
  }

  // Tax strategy warnings
  if (inputs.accountType === 'traditional' && inputs.currentAge && inputs.currentAge > 70) {
    warnings.push('Required minimum distributions may affect annuity strategy');
  }

  // Fee warnings
  if (inputs.expenseRatio && inputs.expenseRatio > 0.02) {
    warnings.push('High expense ratio may reduce investment returns significantly');
  }

  // Surrender charge warnings
  if (inputs.surrenderCharges && inputs.surrenderCharges > 0.1) {
    warnings.push('High surrender charges may limit access to funds');
  }

  // Life expectancy warnings
  if (inputs.lifeExpectancy && inputs.annuityStartAge) {
    const payoutYears = inputs.lifeExpectancy - inputs.annuityStartAge;
    if (payoutYears < 10) {
      warnings.push('Short payout period - consider lump sum or period certain options');
    }
  }

  // Social Security integration warnings
  if (inputs.includeSocialSecurity && (!inputs.socialSecurityBenefit || inputs.socialSecurityBenefit < 10000)) {
    warnings.push('Low Social Security benefit - annuity may be more critical');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}