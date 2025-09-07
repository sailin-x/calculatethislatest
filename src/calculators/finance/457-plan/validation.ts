import { FourFiveSevenInputs } from './types';

export function validateFourFiveSevenInputs(inputs: FourFiveSevenInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Personal Information Validation
  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 100) {
    errors.push('Current age must be between 18 and 100');
  }

  if (!inputs.retirementAge || inputs.retirementAge <= inputs.currentAge || inputs.retirementAge > 100) {
    errors.push('Retirement age must be greater than current age and less than or equal to 100');
  }

  if (!inputs.lifeExpectancy || inputs.lifeExpectancy <= inputs.retirementAge || inputs.lifeExpectancy > 120) {
    errors.push('Life expectancy must be greater than retirement age and less than or equal to 120');
  }

  // Account Information Validation
  if (inputs.currentBalance !== undefined && inputs.currentBalance < 0) {
    errors.push('Current balance cannot be negative');
  }

  if (!inputs.yearsOfService || inputs.yearsOfService < 0) {
    errors.push('Years of service cannot be negative');
  }

  // Contribution Information Validation
  if (!inputs.annualSalary || inputs.annualSalary <= 0) {
    errors.push('Annual salary must be greater than 0');
  }

  if (inputs.employeeContributionPercent !== undefined &&
      (inputs.employeeContributionPercent < 0 || inputs.employeeContributionPercent > 100)) {
    errors.push('Employee contribution percentage must be between 0 and 100');
  }

  if (inputs.employerContributionPercent !== undefined &&
      (inputs.employerContributionPercent < 0 || inputs.employerContributionPercent > 100)) {
    errors.push('Employer contribution percentage must be between 0 and 100');
  }

  if (!inputs.contributionLimit || inputs.contributionLimit <= 0) {
    errors.push('Contribution limit must be greater than 0');
  }

  if (inputs.lifetimeLimit !== undefined && inputs.lifetimeLimit <= 0) {
    errors.push('Lifetime contribution limit must be greater than 0');
  }

  // Investment Information Validation
  if (inputs.expectedAnnualReturn !== undefined &&
      (inputs.expectedAnnualReturn < 0 || inputs.expectedAnnualReturn > 20)) {
    errors.push('Expected annual return must be between 0 and 20 percent');
  }

  if (inputs.inflationRate !== undefined &&
      (inputs.inflationRate < -5 || inputs.inflationRate > 15)) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  // Tax Information Validation
  if (inputs.currentTaxRate !== undefined &&
      (inputs.currentTaxRate < 0 || inputs.currentTaxRate > 50)) {
    errors.push('Current tax rate must be between 0 and 50 percent');
  }

  if (inputs.retirementTaxRate !== undefined &&
      (inputs.retirementTaxRate < 0 || inputs.retirementTaxRate > 50)) {
    errors.push('Retirement tax rate must be between 0 and 50 percent');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0 years');
  }

  if (inputs.socialSecurityBenefit !== undefined && inputs.socialSecurityBenefit < 0) {
    errors.push('Social Security benefit cannot be negative');
  }

  if (inputs.otherRetirementIncome !== undefined && inputs.otherRetirementIncome < 0) {
    errors.push('Other retirement income cannot be negative');
  }

  // Withdrawal Strategy Validation
  if (inputs.annualWithdrawalAmount !== undefined && inputs.annualWithdrawalAmount < 0) {
    errors.push('Annual withdrawal amount cannot be negative');
  }

  if (inputs.withdrawalPercentage !== undefined &&
      (inputs.withdrawalPercentage < 0 || inputs.withdrawalPercentage > 100)) {
    errors.push('Withdrawal percentage must be between 0 and 100');
  }

  // Cost Information Validation
  if (inputs.annualFees !== undefined && (inputs.annualFees < 0 || inputs.annualFees > 10)) {
    errors.push('Annual fees must be between 0 and 10 percent');
  }

  if (inputs.administrativeFees !== undefined && inputs.administrativeFees < 0) {
    errors.push('Administrative fees cannot be negative');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateFourFiveSevenBusinessRules(inputs: FourFiveSevenInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.currentAge && inputs.retirementAge) {
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
    if (yearsToRetirement < 10) {
      warnings.push('Less than 10 years to retirement - consider aggressive savings strategy');
    }
  }

  if (inputs.employeeContributionPercent && inputs.employeeContributionPercent < 5) {
    warnings.push('Employee contribution is below 5% - missing out on tax benefits');
  }

  if (inputs.employerContributionPercent && inputs.employerContributionPercent > 0 &&
      inputs.employeeContributionPercent && inputs.employeeContributionPercent < inputs.employerContributionPercent) {
    warnings.push('Employer contribution exceeds employee contribution - consider increasing contributions');
  }

  if (inputs.currentAge && inputs.currentAge >= 50 && !inputs.catchUpContributions) {
    warnings.push('Age 50+ eligible for catch-up contributions but not enabled');
  }

  if (inputs.expectedAnnualReturn && inputs.expectedAnnualReturn > 12) {
    warnings.push('Expected return above 12% may be unrealistic - consider conservative assumptions');
  }

  if (inputs.currentTaxRate && inputs.retirementTaxRate &&
      inputs.currentTaxRate < inputs.retirementTaxRate) {
    warnings.push('Retirement tax rate higher than current rate - consider tax planning strategies');
  }

  if (inputs.annualSalary && inputs.employeeContributionPercent && inputs.contributionLimit) {
    const contributionAmount = Math.min(
      inputs.annualSalary * (inputs.employeeContributionPercent / 100),
      inputs.contributionLimit
    );
    if (contributionAmount > inputs.contributionLimit) {
      warnings.push('Contribution exceeds annual limit - amount will be capped');
    }
  }

  if (inputs.currentBalance && inputs.annualSalary) {
    const balanceToSalaryRatio = inputs.currentBalance / inputs.annualSalary;
    if (balanceToSalaryRatio < 1 && inputs.currentAge && inputs.currentAge > 35) {
      warnings.push('Savings balance is less than 1x annual salary - consider increasing contributions');
    }
  }

  if (inputs.expectedAnnualReturn && inputs.expectedAnnualReturn < 4) {
    warnings.push('Expected return below 4% may not keep pace with inflation');
  }

  if (inputs.annualFees && inputs.annualFees > 1) {
    warnings.push('Annual fees above 1% may significantly impact long-term returns');
  }

  if (inputs.retirementAge && inputs.retirementAge < 59.5) {
    warnings.push('Early retirement before age 59½ may incur penalties on withdrawals');
  }

  if (inputs.contributionLimit && inputs.contributionLimit < 22000) {
    warnings.push('Contribution limit below current IRS limit - verify plan rules');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}