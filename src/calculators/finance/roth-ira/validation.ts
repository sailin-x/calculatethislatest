import { RothIRAInputs } from './types';

export function validateRothIRAInputs(inputs: RothIRAInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Current Age Validation
  if (!inputs.currentAge || inputs.currentAge < 18) {
    errors.push({ field: 'currentAge', message: 'Age must be 18 or older' });
  }
  if (inputs.currentAge && inputs.currentAge > 120) {
    errors.push({ field: 'currentAge', message: 'Age cannot exceed 120' });
  }

  // Annual Contribution Validation
  if (inputs.annualContribution < 0) {
    errors.push({ field: 'annualContribution', message: 'Annual contribution cannot be negative' });
  }
  if (inputs.annualContribution > 100000) {
    errors.push({ field: 'annualContribution', message: 'Annual contribution cannot exceed $100,000' });
  }

  // Expected Annual Return Validation
  if (inputs.expectedAnnualReturn < -10 || inputs.expectedAnnualReturn > 50) {
    errors.push({ field: 'expectedAnnualReturn', message: 'Expected return must be between -10% and 50%' });
  }

  // Years to Contribute Validation
  if (!inputs.yearsToContribute || inputs.yearsToContribute < 1) {
    errors.push({ field: 'yearsToContribute', message: 'Years to contribute must be at least 1' });
  }
  if (inputs.yearsToContribute && inputs.yearsToContribute > 50) {
    errors.push({ field: 'yearsToContribute', message: 'Years to contribute cannot exceed 50' });
  }

  // Current Balance Validation
  if (inputs.currentBalance < 0) {
    errors.push({ field: 'currentBalance', message: 'Current balance cannot be negative' });
  }

  // Tax Bracket Validation
  if (inputs.taxBracket < 0 || inputs.taxBracket > 100) {
    errors.push({ field: 'taxBracket', message: 'Tax bracket must be between 0% and 100%' });
  }

  // Inflation Rate Validation
  if (inputs.inflationRate < -5 || inputs.inflationRate > 20) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -5% and 20%' });
  }

  // Filing Status Validation
  const validStatuses = ['single', 'married_filing_jointly', 'married_filing_separately', 'head_of_household'];
  if (!inputs.filingStatus || !validStatuses.includes(inputs.filingStatus)) {
    errors.push({ field: 'filingStatus', message: 'Please select a valid filing status' });
  }

  // Income Validation
  if (!inputs.income || inputs.income <= 0) {
    errors.push({ field: 'income', message: 'Income must be greater than 0' });
  }
  if (inputs.income && inputs.income > 10000000) {
    errors.push({ field: 'income', message: 'Income cannot exceed $10,000,000' });
  }

  return errors;
}

export function validateRothIRABusinessRules(inputs: RothIRAInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Age Warnings
  if (inputs.currentAge >= 70) {
    warnings.push({
      field: 'currentAge',
      message: 'Roth IRA contributions are not allowed after age 70½. Consider Qualified Charitable Distributions.'
    });
  }

  // Contribution Limit Warnings
  const contributionLimit = inputs.currentAge >= 50 ? 7500 + 1000 : 7500;
  if (inputs.annualContribution > contributionLimit) {
    warnings.push({
      field: 'annualContribution',
      message: `Contribution exceeds 2024 limit of $${contributionLimit.toLocaleString()}`
    });
  }

  // Income Limit Warnings
  const isMarried = inputs.filingStatus.includes('married');
  const incomeLimit = inputs.currentAge >= 50 ?
    (isMarried ? 240000 : 161000) :
    (isMarried ? 230000 : 146000);

  if (inputs.income > incomeLimit) {
    warnings.push({
      field: 'income',
      message: `Income exceeds Roth IRA eligibility limit of $${incomeLimit.toLocaleString()}. Consider Backdoor Roth IRA.`
    });
  }

  // Return Expectation Warnings
  if (inputs.expectedAnnualReturn > 12) {
    warnings.push({
      field: 'expectedAnnualReturn',
      message: 'Returns above 12% are difficult to sustain long-term. Consider more conservative estimates.'
    });
  }

  // Long Contribution Period Warnings
  if (inputs.yearsToContribute > 30) {
    warnings.push({
      field: 'yearsToContribute',
      message: 'Long contribution periods increase risk of market downturns affecting retirement goals.'
    });
  }

  // Low Contribution Warnings
  if (inputs.annualContribution < 1000 && inputs.yearsToContribute > 10) {
    warnings.push({
      field: 'annualContribution',
      message: 'Low annual contributions may not be sufficient for meaningful retirement savings.'
    });
  }

  return warnings;
}