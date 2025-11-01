import { SimpleIRAInputs } from './types';

export function validateSimpleIRAInputs(inputs: SimpleIRAInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Annual Salary Validation
  if (!inputs.annualSalary || inputs.annualSalary <= 0) {
    errors.push({ field: 'annualSalary', message: 'Annual salary must be greater than 0' });
  }
  if (inputs.annualSalary && inputs.annualSalary > 10000000) {
    errors.push({ field: 'annualSalary', message: 'Annual salary cannot exceed $10,000,000' });
  }

  // Employee Contribution Validation
  if (inputs.employeeContribution < 0) {
    errors.push({ field: 'employeeContribution', message: 'Employee contribution cannot be negative' });
  }
  if (inputs.employeeContribution > 19500) { // 2024 limit + catch-up
    errors.push({ field: 'employeeContribution', message: 'Employee contribution cannot exceed $19,500 for 2024' });
  }

  // Employer Match Validation
  if (inputs.employerMatch < 0) {
    errors.push({ field: 'employerMatch', message: 'Employer match percentage cannot be negative' });
  }
  if (inputs.employerMatch > 100) {
    errors.push({ field: 'employerMatch', message: 'Employer match percentage cannot exceed 100%' });
  }

  // Expected Annual Return Validation
  if (inputs.expectedAnnualReturn < -10 || inputs.expectedAnnualReturn > 50) {
    errors.push({ field: 'expectedAnnualReturn', message: 'Expected annual return must be between -10% and 50%' });
  }

  // Years to Contribute Validation
  if (!inputs.yearsToContribute || inputs.yearsToContribute < 1) {
    errors.push({ field: 'yearsToContribute', message: 'Years to contribute must be at least 1' });
  }
  if (inputs.yearsToContribute > 50) {
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

  // Number of Employees Validation
  if (inputs.numberOfEmployees < 0) {
    errors.push({ field: 'numberOfEmployees', message: 'Number of employees cannot be negative' });
  }
  if (inputs.numberOfEmployees > 100) {
    errors.push({ field: 'numberOfEmployees', message: 'SIMPLE IRAs are limited to businesses with 100 or fewer employees' });
  }

  return errors;
}

export function validateSimpleIRABusinessRules(inputs: SimpleIRAInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Contribution Limit Warnings
  const maxContribution = 16000 + (inputs.annualSalary >= 50 ? 3500 : 0);
  if (inputs.employeeContribution > maxContribution) {
    warnings.push({ field: 'employeeContribution', message: `Contribution exceeds 2024 limit of $${maxContribution.toLocaleString()}` });
  }

  // Employer Match Warnings
  if (inputs.employerMatch > 0 && inputs.employeeContribution === 0) {
    warnings.push({ field: 'employerMatch', message: 'Employer match requires employee contribution' });
  }

  // Tax Bracket Warnings
  if (inputs.taxBracket > 37) {
    warnings.push({ field: 'taxBracket', message: 'High tax bracket may indicate need for tax planning' });
  }

  // Employee Count Warnings
  if (inputs.numberOfEmployees > 50) {
    warnings.push({ field: 'numberOfEmployees', message: 'Large employee count may affect eligibility for SIMPLE IRA' });
  }

  // Vesting Schedule Warnings
  if (inputs.vestingSchedule === 'cliff' && inputs.yearsToContribute < 3) {
    warnings.push({ field: 'vestingSchedule', message: 'Cliff vesting may delay access to employer contributions' });
  }

  return warnings;
}