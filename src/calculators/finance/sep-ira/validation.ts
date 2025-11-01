import { SEPIRAInputs } from './types';

export function validateSEPIRAInputs(inputs: SEPIRAInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Self Employment Income Validation
  if (!inputs.selfEmploymentIncome || inputs.selfEmploymentIncome <= 0) {
    errors.push({ field: 'selfEmploymentIncome', message: 'Self-employment income must be greater than 0' });
  }
  if (inputs.selfEmploymentIncome && inputs.selfEmploymentIncome > 10000000) {
    errors.push({ field: 'selfEmploymentIncome', message: 'Self-employment income cannot exceed $10,000,000' });
  }

  // Contribution Validation
  if (inputs.employerContribution < 0) {
    errors.push({ field: 'employerContribution', message: 'Employer contribution cannot be negative' });
  }
  if (inputs.employeeContribution < 0) {
    errors.push({ field: 'employeeContribution', message: 'Employee contribution cannot be negative' });
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

  // Filing Status Validation
  const validStatuses = ['single', 'married_filing_jointly', 'married_filing_separately'];
  if (!inputs.filingStatus || !validStatuses.includes(inputs.filingStatus)) {
    errors.push({ field: 'filingStatus', message: 'Please select a valid filing status' });
  }

  // Number of Employees Validation
  if (inputs.numberOfEmployees < 0) {
    errors.push({ field: 'numberOfEmployees', message: 'Number of employees cannot be negative' });
  }

  // Business Type Validation
  const validBusinessTypes = ['sole_proprietorship', 'partnership', 'corporation'];
  if (!inputs.businessType || !validBusinessTypes.includes(inputs.businessType)) {
    errors.push({ field: 'businessType', message: 'Please select a valid business type' });
  }

  return errors;
}

export function validateSEPIRABusinessRules(inputs: SEPIRAInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Contribution Limit Warnings
  const maxContribution = Math.min(inputs.selfEmploymentIncome * 0.25, 69000);
  const totalContribution = inputs.employerContribution + inputs.employeeContribution;

  if (totalContribution > maxContribution) {
    warnings.push({
      field: 'employerContribution',
      message: `Total contributions exceed 2024 limit of $${maxContribution.toLocaleString()} (25% of self-employment income)`
    });
  }

  // Business Type Warnings
  if (inputs.businessType === 'corporation') {
    warnings.push({
      field: 'businessType',
      message: 'SEP IRAs are typically for self-employed individuals. Corporations may be better suited for 401(k) plans.'
    });
  }

  // Employee Count Warnings
  if (inputs.businessType !== 'corporation' && inputs.numberOfEmployees > 0) {
    warnings.push({
      field: 'numberOfEmployees',
      message: 'SEP IRAs can be used for businesses with employees, but consider the administrative burden.'
    });
  }

  // High Income Warnings
  if (inputs.selfEmploymentIncome > 300000) {
    warnings.push({
      field: 'selfEmploymentIncome',
      message: 'High self-employment income may benefit from other retirement plan options with higher contribution limits.'
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

  return warnings;
}