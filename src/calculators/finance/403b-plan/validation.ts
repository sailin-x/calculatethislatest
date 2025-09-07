import { FourZeroThreeBInputs } from './types';

export function validateFourZeroThreeBInputs(inputs: FourZeroThreeBInputs): { isValid: boolean; errors: string[] } {
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

  if (inputs.employerMatchPercent !== undefined &&
      (inputs.employerMatchPercent < 0 || inputs.employerMatchPercent > 100)) {
    errors.push('Employer match percentage must be between 0 and 100');
  }

  if (inputs.annualContributionLimit !== undefined && inputs.annualContributionLimit <= 0) {
    errors.push('Annual contribution limit must be greater than 0');
  }

  if (inputs.lifetimeContributionLimit !== undefined && inputs.lifetimeContributionLimit <= 0) {
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

export function validateFourZeroThreeBBusinessRules(inputs: FourZeroThreeBInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.currentAge && inputs.retirementAge) {
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
    if (yearsToRetirement < 10) {
      warnings.push('Less than 10 years to retirement - consider aggressive savings strategy');
    }
  }

  if (inputs.employeeContributionPercent && inputs.employeeContributionPercent < 5) {
    warnings.push('Employee contribution is below 5% - missing out on tax benefits and employer match');
  }

  if (inputs.employerMatchPercent && inputs.employerMatchPercent > 0 &&
      inputs.employeeContributionPercent && inputs.employeeContributionPercent < inputs.employerMatchPercent) {
    warnings.push('Not maximizing employer match - increase contributions to match employer percentage');
  }

  if (inputs.currentAge && inputs.currentAge >= 50 && !inputs.catchUpContributions) {
    warnings.push('Age 50+ eligible for catch-up contributions but not enabled');
  }

  if (inputs.expectedAnnualReturn && inputs.expectedAnnualReturn > 12) {
    warnings.push('Expected return above 12% may be unrealistic - consider more conservative assumptions');
  }

  if (inputs.currentTaxRate && inputs.retirementTaxRate &&
      inputs.currentTaxRate < inputs.retirementTaxRate) {
    warnings.push('Retirement tax rate higher than current rate - consider Roth options if available');
  }

  if (inputs.annualSalary && inputs.employeeContributionPercent) {
    const contributionAmount = inputs.annualSalary * (inputs.employeeContributionPercent / 100);
    if (contributionAmount > 22000) {
      warnings.push('Contribution exceeds 2023 annual limit of $22,000');
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

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}