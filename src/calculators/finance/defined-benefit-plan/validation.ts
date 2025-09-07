import { DefinedBenefitPlanInputs } from './types';

export function validateDefinedBenefitPlanInputs(inputs: DefinedBenefitPlanInputs): { isValid: boolean; errors: string[] } {
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

  // Employment Information Validation
  if (!inputs.currentSalary || inputs.currentSalary <= 0) {
    errors.push('Current salary must be greater than 0');
  }

  if (!inputs.yearsOfService || inputs.yearsOfService < 0) {
    errors.push('Years of service cannot be negative');
  }

  if (inputs.expectedSalaryIncrease !== undefined && (inputs.expectedSalaryIncrease < -0.1 || inputs.expectedSalaryIncrease > 0.2)) {
    errors.push('Expected salary increase must be between -10% and 20%');
  }

  if (!inputs.finalAverageSalary || inputs.finalAverageSalary <= 0) {
    errors.push('Final average salary must be greater than 0');
  }

  // Plan Information Validation
  if (!inputs.planType || !['traditional', 'cash_balance', 'hybrid'].includes(inputs.planType)) {
    errors.push('Please select a valid plan type');
  }

  if (!inputs.benefitFormula || !['final_average', 'career_average', 'flat_benefit'].includes(inputs.benefitFormula)) {
    errors.push('Please select a valid benefit formula');
  }

  if (!inputs.vestingSchedule || !['immediate', 'graded', 'cliff'].includes(inputs.vestingSchedule)) {
    errors.push('Please select a valid vesting schedule');
  }

  // Benefit Calculation Validation
  if (!inputs.benefitMultiplier || inputs.benefitMultiplier <= 0) {
    errors.push('Benefit multiplier must be greater than 0');
  }

  if (!inputs.yearsOfServiceRequired || inputs.yearsOfServiceRequired < 1 || inputs.yearsOfServiceRequired > 40) {
    errors.push('Years of service required must be between 1 and 40');
  }

  if (!inputs.minimumRetirementAge || inputs.minimumRetirementAge < 50 || inputs.minimumRetirementAge > 70) {
    errors.push('Minimum retirement age must be between 50 and 70');
  }

  if (inputs.earlyRetirementReduction !== undefined && (inputs.earlyRetirementReduction < 0 || inputs.earlyRetirementReduction > 10)) {
    errors.push('Early retirement reduction must be between 0% and 10%');
  }

  // Financial Information Validation
  if (inputs.currentAccountBalance !== undefined && inputs.currentAccountBalance < 0) {
    errors.push('Current account balance cannot be negative');
  }

  if (inputs.employerContribution !== undefined && inputs.employerContribution < 0) {
    errors.push('Employer contribution cannot be negative');
  }

  if (inputs.employeeContribution !== undefined && inputs.employeeContribution < 0) {
    errors.push('Employee contribution cannot be negative');
  }

  if (inputs.expectedReturnRate !== undefined && (inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.2)) {
    errors.push('Expected return rate must be between -10% and 20%');
  }

  // Cost of Living Adjustments Validation
  if (inputs.colaRate !== undefined && (inputs.colaRate < 0 || inputs.colaRate > 0.1)) {
    errors.push('COLA rate must be between 0% and 10%');
  }

  if (inputs.colaStartAge !== undefined && (inputs.colaStartAge < 50 || inputs.colaStartAge > 100)) {
    errors.push('COLA start age must be between 50 and 100');
  }

  // Spouse/Beneficiary Information Validation
  if (inputs.spouseAge !== undefined && (inputs.spouseAge < 18 || inputs.spouseAge > 100)) {
    errors.push('Spouse age must be between 18 and 100');
  }

  if (inputs.survivorBenefitPercentage !== undefined && (inputs.survivorBenefitPercentage < 0 || inputs.survivorBenefitPercentage > 100)) {
    errors.push('Survivor benefit percentage must be between 0% and 100%');
  }

  // Tax Information Validation
  if (inputs.taxBracket !== undefined && (inputs.taxBracket < 0 || inputs.taxBracket > 0.5)) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.stateTaxRate !== undefined && (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 0.2)) {
    errors.push('State tax rate must be between 0% and 20%');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -0.05 || inputs.inflationRate > 0.1)) {
    errors.push('Inflation rate must be between -5% and 10%');
  }

  if (inputs.discountRate !== undefined && (inputs.discountRate < 0 || inputs.discountRate > 0.2)) {
    errors.push('Discount rate must be between 0% and 20%');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateDefinedBenefitPlanBusinessRules(inputs: DefinedBenefitPlanInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.yearsOfService < inputs.yearsOfServiceRequired) {
    warnings.push(`Only ${inputs.yearsOfService} years of service - need ${inputs.yearsOfServiceRequired} for full benefit`);
  }

  if (inputs.retirementAge < inputs.minimumRetirementAge) {
    const reduction = (inputs.minimumRetirementAge - inputs.retirementAge) * inputs.earlyRetirementReduction;
    warnings.push(`Early retirement will reduce benefit by approximately ${reduction}%`);
  }

  if (inputs.finalAverageSalary < inputs.currentSalary * 0.8) {
    warnings.push('Final average salary significantly lower than current salary');
  }

  if (inputs.colaRate < 0.02) {
    warnings.push('Low COLA rate may not keep pace with inflation');
  }

  if (inputs.expectedReturnRate < 0.03) {
    warnings.push('Low expected return may affect plan funding');
  }

  if (inputs.employeeContribution > inputs.currentSalary * 0.1) {
    warnings.push('High employee contribution may affect take-home pay');
  }

  if (inputs.spouseAge && inputs.spouseAge > inputs.currentAge + 10) {
    warnings.push('Significant age difference may affect survivor benefits');
  }

  if (inputs.survivorBenefitPercentage < 50) {
    warnings.push('Low survivor benefit percentage may leave spouse under-protected');
  }

  if (inputs.taxBracket > 0.35) {
    warnings.push('High tax bracket - consider tax diversification strategies');
  }

  if (inputs.analysisPeriod < 20) {
    warnings.push('Short analysis period may not capture full retirement picture');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}