import { DefinedContributionPlanInputs } from './types';

export function validateDefinedContributionPlanInputs(inputs: DefinedContributionPlanInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Personal Information Validation
  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 80) {
    errors.push('Current age must be between 18 and 80');
  }

  if (!inputs.retirementAge || inputs.retirementAge <= inputs.currentAge || inputs.retirementAge > 100) {
    errors.push('Retirement age must be greater than current age and less than 100');
  }

  if (!inputs.lifeExpectancy || inputs.lifeExpectancy <= inputs.retirementAge || inputs.lifeExpectancy > 120) {
    errors.push('Life expectancy must be greater than retirement age');
  }

  if (!inputs.gender || !['male', 'female'].includes(inputs.gender)) {
    errors.push('Please select a valid gender');
  }

  // Account Information Validation
  if (inputs.currentAccountBalance !== undefined && inputs.currentAccountBalance < 0) {
    errors.push('Current account balance cannot be negative');
  }

  if (inputs.monthlyContribution !== undefined && inputs.monthlyContribution < 0) {
    errors.push('Monthly contribution cannot be negative');
  }

  if (inputs.annualContribution !== undefined && inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (inputs.employerMatch !== undefined && (inputs.employerMatch < 0 || inputs.employerMatch > 1)) {
    errors.push('Employer match must be between 0% and 100%');
  }

  if (inputs.employerMatchLimit !== undefined && inputs.employerMatchLimit < 0) {
    errors.push('Employer match limit cannot be negative');
  }

  // Investment Information Validation
  if (!inputs.expectedReturnRate || inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.2) {
    errors.push('Expected return rate must be between -10% and 20%');
  }

  if (!inputs.riskTolerance || !['conservative', 'moderate', 'aggressive'].includes(inputs.riskTolerance)) {
    errors.push('Please select a valid risk tolerance');
  }

  if (!inputs.investmentType || !['target_date', 'balanced', 'aggressive_growth', 'conservative'].includes(inputs.investmentType)) {
    errors.push('Please select a valid investment type');
  }

  // Plan Information Validation
  if (!inputs.planType || !['401k', '403b', '457', 'traditional_ira', 'roth_ira', 'sep_ira', 'simple_ira'].includes(inputs.planType)) {
    errors.push('Please select a valid plan type');
  }

  if (inputs.contributionLimit !== undefined && inputs.contributionLimit < 0) {
    errors.push('Contribution limit cannot be negative');
  }

  if (inputs.catchUpContribution !== undefined && inputs.catchUpContribution < 0) {
    errors.push('Catch-up contribution cannot be negative');
  }

  if (!inputs.vestingSchedule || !['immediate', 'graded', 'cliff'].includes(inputs.vestingSchedule)) {
    errors.push('Please select a valid vesting schedule');
  }

  // Tax Information Validation
  if (inputs.taxBracket !== undefined && (inputs.taxBracket < 0 || inputs.taxBracket > 0.5)) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.stateTaxRate !== undefined && (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 0.2)) {
    errors.push('State tax rate must be between 0% and 20%');
  }

  if (!inputs.accountType || !['traditional', 'roth', 'non_deductible'].includes(inputs.accountType)) {
    errors.push('Please select a valid account type');
  }

  // Time Information Validation
  if (!inputs.yearsToRetirement || inputs.yearsToRetirement < 1 || inputs.yearsToRetirement > 50) {
    errors.push('Years to retirement must be between 1 and 50');
  }

  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  // Fees and Expenses Validation
  if (inputs.annualFees !== undefined && inputs.annualFees < 0) {
    errors.push('Annual fees cannot be negative');
  }

  if (inputs.expenseRatio !== undefined && (inputs.expenseRatio < 0 || inputs.expenseRatio > 0.1)) {
    errors.push('Expense ratio must be between 0% and 10%');
  }

  if (inputs.transactionFees !== undefined && inputs.transactionFees < 0) {
    errors.push('Transaction fees cannot be negative');
  }

  // Inflation and Assumptions Validation
  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -0.05 || inputs.inflationRate > 0.1)) {
    errors.push('Inflation rate must be between -5% and 10%');
  }

  if (inputs.salaryIncreaseRate !== undefined && (inputs.salaryIncreaseRate < -0.1 || inputs.salaryIncreaseRate > 0.2)) {
    errors.push('Salary increase rate must be between -10% and 20%');
  }

  // Social Security Validation
  if (inputs.socialSecurityBenefit !== undefined && inputs.socialSecurityBenefit < 0) {
    errors.push('Social Security benefit cannot be negative');
  }

  if (inputs.socialSecurityStartAge !== undefined && (inputs.socialSecurityStartAge < 62 || inputs.socialSecurityStartAge > 70)) {
    errors.push('Social Security start age must be between 62 and 70');
  }

  // Withdrawal Strategy Validation
  if (inputs.withdrawalRate !== undefined && (inputs.withdrawalRate < 0.02 || inputs.withdrawalRate > 0.1)) {
    errors.push('Withdrawal rate must be between 2% and 10%');
  }

  if (inputs.withdrawalStartAge !== undefined && (inputs.withdrawalStartAge < 50 || inputs.withdrawalStartAge > 100)) {
    errors.push('Withdrawal start age must be between 50 and 100');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateDefinedContributionPlanBusinessRules(inputs: DefinedContributionPlanInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  const totalAnnualContribution = (inputs.monthlyContribution || 0) * 12 + (inputs.annualContribution || 0);
  const contributionLimit = inputs.contributionLimit || 23000;

  if (totalAnnualContribution > contributionLimit) {
    warnings.push(`Total contribution exceeds limit of $${contributionLimit.toLocaleString()}`);
  }

  if (inputs.expectedReturnRate > 0.1) {
    warnings.push('High expected return may be unrealistic');
  }

  if (inputs.expectedReturnRate < 0.03) {
    warnings.push('Low expected return may not keep pace with inflation');
  }

  if (inputs.expenseRatio && inputs.expenseRatio > 0.02) {
    warnings.push('High expense ratio may reduce returns significantly');
  }

  if (inputs.employerMatch && inputs.employerMatch < 0.5) {
    warnings.push('Low employer match - consider maximizing personal contributions');
  }

  if (inputs.withdrawalRate && inputs.withdrawalRate > 0.05) {
    warnings.push('High withdrawal rate may deplete funds prematurely');
  }

  if (inputs.currentAge >= 50 && !inputs.catchUpContribution) {
    warnings.push('Age 50+ eligible for catch-up contributions');
  }

  if (inputs.accountType === 'traditional' && inputs.taxBracket > 0.32) {
    warnings.push('High tax bracket - Roth IRA may be more advantageous');
  }

  if (inputs.accountType === 'roth' && inputs.taxBracket < 0.22) {
    warnings.push('Low tax bracket - Traditional IRA may provide more immediate benefit');
  }

  if (inputs.yearsToRetirement < 10) {
    warnings.push('Short time to retirement - consider conservative investment strategy');
  }

  if (inputs.riskTolerance === 'aggressive' && inputs.yearsToRetirement < 20) {
    warnings.push('Aggressive strategy may not be suitable for short time horizon');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}