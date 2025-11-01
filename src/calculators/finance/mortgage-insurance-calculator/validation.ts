import { MortgageInsuranceInputs } from './types';

export function validateMortgageInsuranceInputs(inputs: MortgageInsuranceInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Loan Amount Validation
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan amount must be greater than 0' });
  }
  if (inputs.loanAmount && inputs.loanAmount > 10000000) {
    errors.push({ field: 'loanAmount', message: 'Loan amount cannot exceed $10,000,000' });
  }

  // Property Value Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }

  // Down Payment Validation
  if (inputs.downPayment < 0) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot be negative' });
  }
  if (inputs.downPayment > inputs.propertyValue) {
    errors.push({ field: 'downPayment', message: 'Down payment cannot exceed property value' });
  }

  // Credit Score Validation
  if (!inputs.creditScore || inputs.creditScore < 300) {
    errors.push({ field: 'creditScore', message: 'Credit score must be at least 300' });
  }
  if (inputs.creditScore && inputs.creditScore > 850) {
    errors.push({ field: 'creditScore', message: 'Credit score cannot exceed 850' });
  }

  // Loan Term Validation
  if (!inputs.loanTerm || inputs.loanTerm < 1) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be at least 1 year' });
  }
  if (inputs.loanTerm && inputs.loanTerm > 50) {
    errors.push({ field: 'loanTerm', message: 'Loan term cannot exceed 50 years' });
  }

  // Borrower Age Validation
  if (!inputs.borrowerAge || inputs.borrowerAge < 18) {
    errors.push({ field: 'borrowerAge', message: 'Borrower must be at least 18 years old' });
  }
  if (inputs.borrowerAge && inputs.borrowerAge > 100) {
    errors.push({ field: 'borrowerAge', message: 'Borrower age cannot exceed 100 years' });
  }

  // Income and Debt Validation
  if (!inputs.monthlyIncome || inputs.monthlyIncome <= 0) {
    errors.push({ field: 'monthlyIncome', message: 'Monthly income must be greater than 0' });
  }
  if (inputs.monthlyDebts < 0) {
    errors.push({ field: 'monthlyDebts', message: 'Monthly debts cannot be negative' });
  }

  // Insurance Coverage Validation
  if (!inputs.insuranceCoverage.dwelling || inputs.insuranceCoverage.dwelling <= 0) {
    errors.push({ field: 'insuranceCoverage.dwelling', message: 'Dwelling coverage must be greater than 0' });
  }
  if (inputs.insuranceCoverage.dwelling > inputs.propertyValue * 2) {
    errors.push({ field: 'insuranceCoverage.dwelling', message: 'Dwelling coverage cannot exceed 200% of property value' });
  }

  if (inputs.insuranceCoverage.personalProperty < 0) {
    errors.push({ field: 'insuranceCoverage.personalProperty', message: 'Personal property coverage cannot be negative' });
  }
  if (inputs.insuranceCoverage.personalProperty > inputs.insuranceCoverage.dwelling * 0.5) {
    errors.push({ field: 'insuranceCoverage.personalProperty', message: 'Personal property coverage typically ≤ 50% of dwelling coverage' });
  }

  if (!inputs.insuranceCoverage.liability || inputs.insuranceCoverage.liability <= 0) {
    errors.push({ field: 'insuranceCoverage.liability', message: 'Liability coverage must be greater than 0' });
  }

  // Deductible Validation
  if (!inputs.deductible || inputs.deductible < 0) {
    errors.push({ field: 'deductible', message: 'Deductible must be 0 or greater' });
  }
  if (inputs.deductible > 10000) {
    errors.push({ field: 'deductible', message: 'Deductible cannot exceed $10,000' });
  }

  // Late Payments Validation
  if (inputs.latePayments < 0) {
    errors.push({ field: 'latePayments', message: 'Late payments count cannot be negative' });
  }
  if (inputs.latePayments > 12) {
    errors.push({ field: 'latePayments', message: 'Late payments count cannot exceed 12' });
  }

  // Location Validation
  if (!inputs.propertyState || inputs.propertyState.trim().length === 0) {
    errors.push({ field: 'propertyState', message: 'Property state is required' });
  }
  if (!inputs.propertyCounty || inputs.propertyCounty.trim().length === 0) {
    errors.push({ field: 'propertyCounty', message: 'Property county is required' });
  }
  if (!inputs.propertyZipCode || inputs.propertyZipCode.trim().length === 0) {
    errors.push({ field: 'propertyZipCode', message: 'Property ZIP code is required' });
  } else {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(inputs.propertyZipCode.trim())) {
      errors.push({ field: 'propertyZipCode', message: 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)' });
    }
  }

  return errors;
}

export function validateMortgageInsuranceBusinessRules(inputs: MortgageInsuranceInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // LTV Ratio Warnings
  const ltv = (inputs.loanAmount / inputs.propertyValue) * 100;
  if (ltv > 97) {
    warnings.push({ field: 'loanAmount', message: 'High LTV ratio may require additional insurance requirements' });
  }

  // Credit Score Warnings
  if (inputs.creditScore < 620) {
    warnings.push({ field: 'creditScore', message: 'Low credit score may result in higher insurance rates' });
  } else if (inputs.creditScore < 680) {
    warnings.push({ field: 'creditScore', message: 'Credit score below 680 may limit insurance options' });
  }

  // DTI Ratio Warnings
  const dti = (inputs.monthlyDebts / inputs.monthlyIncome) * 100;
  if (dti > 43) {
    warnings.push({ field: 'monthlyDebts', message: 'High DTI ratio may affect insurance approval' });
  }

  // Insurance Coverage Warnings
  const totalCoverage = inputs.insuranceCoverage.dwelling +
                       inputs.insuranceCoverage.personalProperty +
                       inputs.insuranceCoverage.liability;

  if (totalCoverage < inputs.propertyValue) {
    warnings.push({ field: 'insuranceCoverage.dwelling', message: 'Total coverage may be insufficient for property value' });
  }

  if (inputs.insuranceCoverage.liability < 100000) {
    warnings.push({ field: 'insuranceCoverage.liability', message: 'Liability coverage may be too low for adequate protection' });
  }

  // Flood Zone Warnings
  if (inputs.floodZone === 'A' || inputs.floodZone === 'V') {
    warnings.push({ field: 'floodZone', message: 'Property in high-risk flood zone - flood insurance required' });
  }

  // Deductible Warnings
  if (inputs.deductible > 2500) {
    warnings.push({ field: 'deductible', message: 'High deductible may result in higher out-of-pocket costs' });
  }

  // Age Warnings
  if (inputs.borrowerAge > 65) {
    warnings.push({ field: 'borrowerAge', message: 'Older borrowers may face higher insurance rates' });
  }

  // Employment Status Warnings
  if (inputs.employmentType === 'unemployed') {
    warnings.push({ field: 'employmentType', message: 'Unemployed status may affect insurance eligibility' });
  }

  // Credit History Warnings
  if (inputs.latePayments > 2) {
    warnings.push({ field: 'latePayments', message: 'Multiple late payments may increase insurance costs' });
  }
  if (inputs.bankruptcyHistory) {
    warnings.push({ field: 'bankruptcyHistory', message: 'Bankruptcy history may affect insurance rates and eligibility' });
  }
  if (inputs.foreclosureHistory) {
    warnings.push({ field: 'foreclosureHistory', message: 'Foreclosure history may affect insurance rates and eligibility' });
  }

  // Loan Type Specific Warnings
  if (inputs.loanType === 'fha' && inputs.creditScore < 580) {
    warnings.push({ field: 'creditScore', message: 'FHA loans require minimum credit score of 580' });
  }
  if (inputs.loanType === 'va') {
    warnings.push({ field: 'loanType', message: 'VA loans require veteran status - confirm eligibility' });
  }

  return warnings;
}