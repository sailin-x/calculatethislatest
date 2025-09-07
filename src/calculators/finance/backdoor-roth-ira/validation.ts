import { BackdoorRothIRAInputs } from './types';

export function validateBackdoorRothIRAInputs(inputs: BackdoorRothIRAInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Personal Information Validation
  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 100) {
    errors.push('Current age must be between 18 and 100');
  }

  if (!inputs.modifiedAGILimit || inputs.modifiedAGILimit <= 0) {
    errors.push('Modified AGI limit must be greater than 0');
  }

  // Account Information Validation
  if (inputs.traditionalIRABalance !== undefined && inputs.traditionalIRABalance < 0) {
    errors.push('Traditional IRA balance cannot be negative');
  }

  if (inputs.rothIRABalance !== undefined && inputs.rothIRABalance < 0) {
    errors.push('Roth IRA balance cannot be negative');
  }

  if (inputs.annualContribution !== undefined && inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (!inputs.conversionAmount || inputs.conversionAmount <= 0) {
    errors.push('Conversion amount must be greater than 0');
  }

  // Tax Information Validation
  if (inputs.marginalTaxRate !== undefined &&
      (inputs.marginalTaxRate < 0 || inputs.marginalTaxRate > 50)) {
    errors.push('Marginal tax rate must be between 0 and 50 percent');
  }

  if (inputs.capitalGainsTaxRate !== undefined &&
      (inputs.capitalGainsTaxRate < 0 || inputs.capitalGainsTaxRate > 50)) {
    errors.push('Capital gains tax rate must be between 0 and 50 percent');
  }

  if (inputs.stateTaxRate !== undefined &&
      (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 40)) {
    errors.push('State tax rate must be between 0 and 40 percent');
  }

  // Investment Information Validation
  if (inputs.expectedReturn !== undefined &&
      (inputs.expectedReturn < -20 || inputs.expectedReturn > 30)) {
    errors.push('Expected return must be between -20% and 30%');
  }

  if (inputs.inflationRate !== undefined &&
      (inputs.inflationRate < -5 || inputs.inflationRate > 15)) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  // Cost Information Validation
  if (inputs.conversionFees !== undefined && inputs.conversionFees < 0) {
    errors.push('Conversion fees cannot be negative');
  }

  if (inputs.accountFees !== undefined && inputs.accountFees < 0) {
    errors.push('Account fees cannot be negative');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateBackdoorRothIRABusinessRules(inputs: BackdoorRothIRAInputs): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.currentAge && inputs.currentAge >= 72) {
    warnings.push('Age 72+ triggers Required Minimum Distributions - consider Roth IRA benefits');
  }

  if (inputs.marginalTaxRate && inputs.marginalTaxRate > 35) {
    warnings.push('High marginal tax rate reduces benefits of backdoor Roth conversion');
  }

  if (inputs.expectedReturn && inputs.expectedReturn < 4) {
    warnings.push('Low expected return may not justify conversion costs and taxes');
  }

  if (inputs.expectedReturn && inputs.expectedReturn > 12) {
    warnings.push('High expected return assumptions may be unrealistic');
  }

  if (inputs.conversionAmount && inputs.conversionAmount > 100000) {
    warnings.push('Large conversion amounts may trigger higher tax brackets');
  }

  if (inputs.annualContribution && inputs.annualContribution > 6000) {
    warnings.push('Annual contribution exceeds standard IRA limit - verify eligibility');
  }

  if (inputs.fiveYearRule && inputs.currentAge && inputs.currentAge > 55) {
    warnings.push('5-year rule may not apply if over age 59½');
  }

  if (inputs.recharacterizationStrategy) {
    warnings.push('Recharacterization strategy is no longer available after 2017 tax law changes');
  }

  if (inputs.includeRequiredMinimumDistributions && inputs.currentAge && inputs.currentAge < 70) {
    warnings.push('RMDs not required until age 72 (or 70½ if born before 7/1/1949)');
  }

  if (inputs.stateTaxRate && inputs.stateTaxRate > 10) {
    warnings.push('High state tax rate significantly increases conversion costs');
  }

  if (inputs.inflationRate && inputs.inflationRate > 4) {
    warnings.push('High inflation reduces real returns on traditional IRA');
  }

  if (inputs.analysisPeriod && inputs.analysisPeriod < 10) {
    warnings.push('Short analysis period may not capture long-term tax benefits');
  }

  if (inputs.analysisPeriod && inputs.analysisPeriod > 30) {
    warnings.push('Long analysis period increases uncertainty in projections');
  }

  if (inputs.conversionFees && inputs.conversionFees > 100) {
    warnings.push('High conversion fees may reduce strategy effectiveness');
  }

  if (inputs.accountFees && inputs.accountFees > 200) {
    warnings.push('High account fees may erode tax benefits over time');
  }

  if (inputs.modifiedAGILimit && inputs.modifiedAGILimit < 100000) {
    warnings.push('Low MAGI limit may restrict traditional IRA contributions');
  }

  if (inputs.filingStatus === 'married_filing_separately') {
    warnings.push('Married filing separately has lower contribution limits');
  }

  return {
    isValid: true, // Business rules don't make the input invalid, just warn
    warnings
  };
}