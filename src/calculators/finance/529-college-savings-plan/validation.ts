import { FiveTwoNineInputs } from './types';

export function validateFiveTwoNineInputs(inputs: FiveTwoNineInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Personal Information Validation
  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 100) {
    errors.push('Current age must be between 18 and 100');
  }

  if (!inputs.childAge || inputs.childAge < 0 || inputs.childAge > 25) {
    errors.push('Child age must be between 0 and 25');
  }

  if (!inputs.collegeStartAge || inputs.collegeStartAge <= inputs.childAge || inputs.collegeStartAge > 30) {
    errors.push('College start age must be greater than child age and less than or equal to 30');
  }

  if (!inputs.yearsUntilCollege || inputs.yearsUntilCollege < 0 || inputs.yearsUntilCollege > 25) {
    errors.push('Years until college must be between 0 and 25');
  }

  // Account Information Validation
  if (inputs.currentBalance !== undefined && inputs.currentBalance < 0) {
    errors.push('Current balance cannot be negative');
  }

  if (inputs.monthlyContribution !== undefined && inputs.monthlyContribution < 0) {
    errors.push('Monthly contribution cannot be negative');
  }

  if (inputs.annualContribution !== undefined && inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
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

  // College Cost Information Validation
  if (!inputs.currentAnnualCost || inputs.currentAnnualCost <= 0) {
    errors.push('Current annual cost must be greater than 0');
  }

  if (inputs.costIncreaseRate !== undefined &&
      (inputs.costIncreaseRate < -10 || inputs.costIncreaseRate > 20)) {
    errors.push('Cost increase rate must be between -10% and 20%');
  }

  if (!inputs.yearsOfCollege || inputs.yearsOfCollege < 1 || inputs.yearsOfCollege > 8) {
    errors.push('Years of college must be between 1 and 8');
  }

  // Tax Information Validation
  if (inputs.stateTaxRate !== undefined &&
      (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 50)) {
    errors.push('State tax rate must be between 0 and 50 percent');
  }

  if (inputs.federalTaxRate !== undefined &&
      (inputs.federalTaxRate < 0 || inputs.federalTaxRate > 50)) {
    errors.push('Federal tax rate must be between 0 and 50 percent');
  }

  // Financial Aid Information Validation
  if (inputs.expectedAidPercentage !== undefined &&
      (inputs.expectedAidPercentage < 0 || inputs.expectedAidPercentage > 100)) {
    errors.push('Expected aid percentage must be between 0 and 100');
  }

  if (inputs.scholarshipAmount !== undefined && inputs.scholarshipAmount < 0) {
    errors.push('Scholarship amount cannot be negative');
  }

  if (inputs.workStudyAmount !== undefined && inputs.workStudyAmount < 0) {
    errors.push('Work-study amount cannot be negative');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.push('Analysis period must be greater than 0 years');
  }

  // Cost Information Validation
  if (inputs.accountFees !== undefined && inputs.accountFees < 0) {
    errors.push('Account fees cannot be negative');
  }

  if (inputs.managementFees !== undefined && (inputs.managementFees < 0 || inputs.managementFees > 5)) {
    errors.push('Management fees must be between 0 and 5 percent');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateFiveTwoNineBusinessRules(inputs: FiveTwoNineInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.yearsUntilCollege && inputs.yearsUntilCollege < 5) {
    warnings.push('Less than 5 years until college - consider aggressive savings strategy');
  }

  if (inputs.monthlyContribution && inputs.monthlyContribution < 100) {
    warnings.push('Monthly contribution below $100 may not keep pace with college cost inflation');
  }

  if (inputs.expectedAnnualReturn && inputs.expectedAnnualReturn > 12) {
    warnings.push('Expected return above 12% may be unrealistic - consider conservative assumptions');
  }

  if (inputs.expectedAnnualReturn && inputs.expectedAnnualReturn < 4) {
    warnings.push('Expected return below 4% may not keep pace with inflation');
  }

  if (inputs.costIncreaseRate && inputs.costIncreaseRate > 8) {
    warnings.push('College cost increase above 8% may be aggressive - consider conservative estimates');
  }

  if (inputs.childAge && inputs.childAge > 10 && inputs.currentBalance && inputs.currentBalance < 10000) {
    warnings.push('Low savings balance for older child - consider increasing contributions');
  }

  if (inputs.yearsUntilCollege && inputs.yearsUntilCollege > 15) {
    warnings.push('More than 15 years until college - consider more aggressive investment strategy');
  }

  if (inputs.expectedAidPercentage && inputs.expectedAidPercentage > 80) {
    warnings.push('Expected aid above 80% may be unrealistic - consider conservative estimates');
  }

  if (inputs.managementFees && inputs.managementFees > 1) {
    warnings.push('Management fees above 1% may significantly impact long-term returns');
  }

  if (inputs.annualContribution && inputs.annualContribution > 15000) {
    warnings.push('Annual contribution above $15,000 - verify 529 plan contribution limits');
  }

  if (inputs.stateTaxRate && inputs.federalTaxRate &&
      inputs.stateTaxRate + inputs.federalTaxRate > 40) {
    warnings.push('Combined tax rate above 40% - tax benefits may be less valuable');
  }

  if (inputs.collegeStartAge && inputs.collegeStartAge < 18) {
    warnings.push('College start age below 18 may affect financial aid eligibility');
  }

  if (inputs.yearsOfCollege && inputs.yearsOfCollege > 4) {
    warnings.push('College duration above 4 years - consider additional funding sources');
  }

  if (inputs.currentAnnualCost && inputs.currentAnnualCost > 50000) {
    warnings.push('Current annual cost above $50,000 - consider cost-saving strategies');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}