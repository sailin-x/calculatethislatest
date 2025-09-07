import { CollegeSavingsInputs } from './types';

export function validateCollegeSavingsInputs(inputs: CollegeSavingsInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Child Information Validation
  if (!inputs.childAge || inputs.childAge < 0 || inputs.childAge > 18) {
    errors.push('Child age must be between 0 and 18');
  }

  if (!inputs.childName || inputs.childName.trim().length === 0) {
    errors.push('Child name is required');
  }

  if (!inputs.yearsUntilCollege || inputs.yearsUntilCollege < 0 || inputs.yearsUntilCollege > 20) {
    errors.push('Years until college must be between 0 and 20');
  }

  // Savings Information Validation
  if (inputs.currentSavings !== undefined && inputs.currentSavings < 0) {
    errors.push('Current savings cannot be negative');
  }

  if (inputs.monthlyContribution !== undefined && inputs.monthlyContribution < 0) {
    errors.push('Monthly contribution cannot be negative');
  }

  if (inputs.annualContribution !== undefined && inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (inputs.oneTimeContributions !== undefined && inputs.oneTimeContributions < 0) {
    errors.push('One-time contributions cannot be negative');
  }

  // Investment Information Validation
  if (!inputs.expectedReturnRate || inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.2) {
    errors.push('Expected return rate must be between -10% and 20%');
  }

  if (inputs.inflationRate !== undefined && (inputs.inflationRate < -0.05 || inputs.inflationRate > 0.1)) {
    errors.push('Inflation rate must be between -5% and 10%');
  }

  if (!inputs.riskTolerance || !['conservative', 'moderate', 'aggressive'].includes(inputs.riskTolerance)) {
    errors.push('Valid risk tolerance must be selected');
  }

  // College Cost Information Validation
  if (!inputs.expectedCollegeCost || inputs.expectedCollegeCost <= 0) {
    errors.push('Expected college cost must be greater than 0');
  }

  if (!inputs.yearsInCollege || inputs.yearsInCollege < 2 || inputs.yearsInCollege > 8) {
    errors.push('Years in college must be between 2 and 8');
  }

  if (inputs.costIncreaseRate !== undefined && (inputs.costIncreaseRate < -0.05 || inputs.costIncreaseRate > 0.15)) {
    errors.push('Cost increase rate must be between -5% and 15%');
  }

  // Tax Information Validation
  if (inputs.taxBracket !== undefined && (inputs.taxBracket < 0 || inputs.taxBracket > 0.5)) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.stateTaxRate !== undefined && (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 0.2)) {
    errors.push('State tax rate must be between 0% and 20%');
  }

  // Financial Aid Information Validation
  if (inputs.expectedFinancialAid !== undefined && inputs.expectedFinancialAid < 0) {
    errors.push('Expected financial aid cannot be negative');
  }

  if (inputs.expectedScholarships !== undefined && inputs.expectedScholarships < 0) {
    errors.push('Expected scholarships cannot be negative');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 30) {
    errors.push('Analysis period must be between 1 and 30 years');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCollegeSavingsBusinessRules(inputs: CollegeSavingsInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.childAge && inputs.yearsUntilCollege) {
    const collegeAge = inputs.childAge + inputs.yearsUntilCollege;
    if (collegeAge < 17) {
      warnings.push('Child may be too young for college - consider delaying savings start');
    }
    if (collegeAge > 25) {
      warnings.push('Child may be too old for traditional college - consider alternative paths');
    }
  }

  // Savings adequacy warnings
  const totalCurrentSavings = (inputs.currentSavings || 0) +
                             (inputs.monthlyContribution || 0) * 12 * (inputs.yearsUntilCollege || 1) +
                             (inputs.annualContribution || 0) * (inputs.yearsUntilCollege || 1) +
                             (inputs.oneTimeContributions || 0);

  if (totalCurrentSavings < (inputs.expectedCollegeCost || 0) * 0.1) {
    warnings.push('Current savings plan may be insufficient for expected college costs');
  }

  // Investment risk warnings
  if (inputs.expectedReturnRate > 0.12 && inputs.riskTolerance === 'conservative') {
    warnings.push('High expected return may not align with conservative risk tolerance');
  }

  if (inputs.expectedReturnRate < 0.04 && inputs.riskTolerance === 'aggressive') {
    warnings.push('Low expected return may not align with aggressive risk tolerance');
  }

  // Time horizon warnings
  if ((inputs.yearsUntilCollege || 0) < 5) {
    warnings.push('Short time horizon - consider more conservative investment approach');
  }

  if ((inputs.yearsUntilCollege || 0) > 15) {
    warnings.push('Long time horizon - can afford more aggressive investment approach');
  }

  // Tax strategy warnings
  if (!inputs.use529Plan && !inputs.useCoverdellESA) {
    warnings.push('Consider tax-advantaged savings options like 529 plans');
  }

  if (inputs.use529Plan && inputs.useCoverdellESA) {
    warnings.push('Both 529 and Coverdell ESA selected - review contribution limits');
  }

  // Cost increase warnings
  if ((inputs.costIncreaseRate || 0) > (inputs.inflationRate || 0) + 0.03) {
    warnings.push('College cost increases significantly outpace inflation');
  }

  // Financial aid warnings
  const totalAid = (inputs.expectedFinancialAid || 0) + (inputs.expectedScholarships || 0);
  if (totalAid > (inputs.expectedCollegeCost || 0) * 0.8) {
    warnings.push('High expected aid - verify realistic expectations');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}