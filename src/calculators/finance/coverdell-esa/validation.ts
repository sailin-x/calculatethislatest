import { CoverdellESAInputs } from './types';

export function validateCoverdellESAInputs(inputs: CoverdellESAInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Account Information Validation
  if (inputs.currentBalance !== undefined && inputs.currentBalance < 0) {
    errors.push('Current balance cannot be negative');
  }

  if (inputs.annualContribution !== undefined && inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (inputs.accountAge !== undefined && inputs.accountAge < 0) {
    errors.push('Account age cannot be negative');
  }

  // Beneficiary Information Validation
  if (!inputs.beneficiaryAge || inputs.beneficiaryAge < 0 || inputs.beneficiaryAge > 30) {
    errors.push('Beneficiary age must be between 0 and 30');
  }

  if (!inputs.relationshipToOwner || !['parent', 'grandparent', 'other'].includes(inputs.relationshipToOwner)) {
    errors.push('Valid relationship to owner must be selected');
  }

  // Investment Information Validation
  if (!inputs.expectedReturnRate || inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.2) {
    errors.push('Expected return rate must be between -10% and 20%');
  }

  if (!inputs.riskTolerance || !['conservative', 'moderate', 'aggressive'].includes(inputs.riskTolerance)) {
    errors.push('Valid risk tolerance must be selected');
  }

  // Tax Information Validation
  if (inputs.taxBracket !== undefined && (inputs.taxBracket < 0 || inputs.taxBracket > 0.5)) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.stateTaxRate !== undefined && (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 0.2)) {
    errors.push('State tax rate must be between 0% and 20%');
  }

  // Education Planning Validation
  if (!inputs.yearsUntilEducation || inputs.yearsUntilEducation < 0 || inputs.yearsUntilEducation > 25) {
    errors.push('Years until education must be between 0 and 25');
  }

  if (!inputs.expectedEducationCost || inputs.expectedEducationCost <= 0) {
    errors.push('Expected education cost must be greater than 0');
  }

  if (!inputs.educationDuration || inputs.educationDuration < 1 || inputs.educationDuration > 8) {
    errors.push('Education duration must be between 1 and 8 years');
  }

  // Contribution Limits Validation
  if (inputs.numberOfBeneficiaries !== undefined && inputs.numberOfBeneficiaries < 1) {
    errors.push('Number of beneficiaries must be at least 1');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 30) {
    errors.push('Analysis period must be between 1 and 30 years');
  }

  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -0.05 || inputs.inflationRate > 0.1)) {
    errors.push('Inflation rate must be between -5% and 10%');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCoverdellESABusinessRules(inputs: CoverdellESAInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.beneficiaryAge && inputs.beneficiaryAge > 18) {
    warnings.push('Beneficiary is over 18 - limited time for tax-free contributions');
  }

  // Contribution limit warnings
  const maxContribution = 2000 * (inputs.useSpouseAccount ? 2 : 1);
  if (inputs.annualContribution && inputs.annualContribution > maxContribution * 0.9) {
    warnings.push('Approaching annual contribution limit');
  }

  // Time horizon warnings
  if (inputs.yearsUntilEducation && inputs.yearsUntilEducation < 5) {
    warnings.push('Short time horizon - consider conservative investment approach');
  }

  if (inputs.yearsUntilEducation && inputs.yearsUntilEducation > 15) {
    warnings.push('Long time horizon - can afford more aggressive investment approach');
  }

  // Tax strategy warnings
  if (inputs.expectedReturnRate && inputs.expectedReturnRate > 0.12 && inputs.riskTolerance === 'conservative') {
    warnings.push('High expected return may not align with conservative risk tolerance');
  }

  // Education cost warnings
  if (inputs.expectedEducationCost && inputs.expectedEducationCost > 100000) {
    warnings.push('Very high education cost - consider cost-saving strategies');
  }

  // Account age warnings
  if (inputs.accountAge && inputs.accountAge > 10) {
    warnings.push('Account is maturing - plan for qualified withdrawals');
  }

  // Beneficiary relationship warnings
  if (inputs.relationshipToOwner === 'other') {
    warnings.push('Non-family beneficiary - verify eligibility requirements');
  }

  // Multiple beneficiary warnings
  if (inputs.numberOfBeneficiaries && inputs.numberOfBeneficiaries > 1) {
    warnings.push('Multiple beneficiaries - ensure contribution limits are not exceeded');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}