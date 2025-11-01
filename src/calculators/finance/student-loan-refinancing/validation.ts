import { StudentLoanRefinancingInputs } from './types';

export function validateStudentLoanRefinancingInputs(inputs: StudentLoanRefinancingInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Current loan balance validation
  if (!inputs.currentLoanBalance || inputs.currentLoanBalance <= 0) {
    errors.push({ field: 'currentLoanBalance', message: 'Current loan balance must be greater than 0' });
  }
  if (inputs.currentLoanBalance && inputs.currentLoanBalance > 500000) {
    errors.push({ field: 'currentLoanBalance', message: 'Loan balance cannot exceed $500,000' });
  }

  // Current interest rate validation
  if (!inputs.currentInterestRate || inputs.currentInterestRate < 0) {
    errors.push({ field: 'currentInterestRate', message: 'Current interest rate must be 0 or greater' });
  }
  if (inputs.currentInterestRate && inputs.currentInterestRate > 15) {
    errors.push({ field: 'currentInterestRate', message: 'Interest rate cannot exceed 15%' });
  }

  // Current monthly payment validation
  if (!inputs.currentMonthlyPayment || inputs.currentMonthlyPayment <= 0) {
    errors.push({ field: 'currentMonthlyPayment', message: 'Current monthly payment must be greater than 0' });
  }

  // Remaining term validation
  if (!inputs.remainingTermMonths || inputs.remainingTermMonths < 1) {
    errors.push({ field: 'remainingTermMonths', message: 'Remaining term must be at least 1 month' });
  }
  if (inputs.remainingTermMonths && inputs.remainingTermMonths > 360) {
    errors.push({ field: 'remainingTermMonths', message: 'Remaining term cannot exceed 30 years (360 months)' });
  }

  // Credit score validation
  if (!inputs.creditScore || inputs.creditScore < 300) {
    errors.push({ field: 'creditScore', message: 'Credit score must be at least 300' });
  }
  if (inputs.creditScore && inputs.creditScore > 850) {
    errors.push({ field: 'creditScore', message: 'Credit score cannot exceed 850' });
  }

  // Annual income validation
  if (!inputs.annualIncome || inputs.annualIncome <= 0) {
    errors.push({ field: 'annualIncome', message: 'Annual income must be greater than 0' });
  }
  if (inputs.annualIncome && inputs.annualIncome > 1000000) {
    errors.push({ field: 'annualIncome', message: 'Annual income cannot exceed $1,000,000' });
  }

  // Debt-to-income ratio validation
  if (inputs.debtToIncomeRatio && inputs.debtToIncomeRatio < 0) {
    errors.push({ field: 'debtToIncomeRatio', message: 'DTI ratio cannot be negative' });
  }
  if (inputs.debtToIncomeRatio && inputs.debtToIncomeRatio > 100) {
    errors.push({ field: 'debtToIncomeRatio', message: 'DTI ratio cannot exceed 100%' });
  }

  // Cosigner validation
  if (inputs.cosignerAvailable) {
    if (inputs.cosignerCreditScore && (inputs.cosignerCreditScore < 300 || inputs.cosignerCreditScore > 850)) {
      errors.push({ field: 'cosignerCreditScore', message: 'Cosigner credit score must be between 300 and 850' });
    }
    if (inputs.cosignerIncome && inputs.cosignerIncome <= 0) {
      errors.push({ field: 'cosignerIncome', message: 'Cosigner income must be greater than 0' });
    }
  }

  // Target interest rate validation
  if (inputs.targetInterestRate && (inputs.targetInterestRate < 0 || inputs.targetInterestRate > 15)) {
    errors.push({ field: 'targetInterestRate', message: 'Target interest rate must be between 0% and 15%' });
  }

  // Target term validation
  if (inputs.targetTermYears && (inputs.targetTermYears < 1 || inputs.targetTermYears > 30)) {
    errors.push({ field: 'targetTermYears', message: 'Target term must be between 1 and 30 years' });
  }

  // Closing costs validation
  if (inputs.closingCosts && inputs.closingCosts < 0) {
    errors.push({ field: 'closingCosts', message: 'Closing costs cannot be negative' });
  }

  // Monthly income validation
  if (inputs.monthlyIncome && inputs.monthlyIncome <= 0) {
    errors.push({ field: 'monthlyIncome', message: 'Monthly income must be greater than 0' });
  }

  // Monthly debts validation
  if (inputs.monthlyDebts && inputs.monthlyDebts < 0) {
    errors.push({ field: 'monthlyDebts', message: 'Monthly debts cannot be negative' });
  }

  return errors;
}

export function validateStudentLoanRefinancingBusinessRules(inputs: StudentLoanRefinancingInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Credit score warnings
  if (inputs.creditScore && inputs.creditScore < 620) {
    warnings.push({ field: 'creditScore', message: 'Credit score below 620 may limit refinancing options' });
  } else if (inputs.creditScore && inputs.creditScore < 680) {
    warnings.push({ field: 'creditScore', message: 'Credit score below 680 may result in higher interest rates' });
  }

  // DTI ratio warnings
  if (inputs.debtToIncomeRatio && inputs.debtToIncomeRatio > 43) {
    warnings.push({ field: 'debtToIncomeRatio', message: 'DTI ratio above 43% may affect refinancing approval' });
  }
  if (inputs.debtToIncomeRatio && inputs.debtToIncomeRatio > 50) {
    warnings.push({ field: 'debtToIncomeRatio', message: 'DTI ratio above 50% is considered high risk' });
  }

  // Employment status warnings
  if (inputs.employmentStatus === 'unemployed') {
    warnings.push({ field: 'employmentStatus', message: 'Unemployed status may significantly impact refinancing options' });
  } else if (inputs.employmentStatus === 'self_employed') {
    warnings.push({ field: 'employmentStatus', message: 'Self-employed borrowers may need additional documentation' });
  }

  // Loan balance warnings
  if (inputs.currentLoanBalance && inputs.currentLoanBalance > 200000) {
    warnings.push({ field: 'currentLoanBalance', message: 'High loan balance may limit refinancing options' });
  }

  // Interest rate warnings
  if (inputs.currentInterestRate && inputs.currentInterestRate > 8) {
    warnings.push({ field: 'currentInterestRate', message: 'High current interest rate makes refinancing more beneficial' });
  }

  // Remaining term warnings
  if (inputs.remainingTermMonths && inputs.remainingTermMonths < 12) {
    warnings.push({ field: 'remainingTermMonths', message: 'Short remaining term may not justify refinancing costs' });
  }

  // Cosigner recommendations
  if (!inputs.cosignerAvailable && inputs.creditScore && inputs.creditScore < 700) {
    warnings.push({ field: 'cosignerAvailable', message: 'Consider getting a cosigner to improve refinancing terms' });
  }

  // Income warnings
  if (inputs.annualIncome && inputs.annualIncome < 30000) {
    warnings.push({ field: 'annualIncome', message: 'Low income may limit refinancing options' });
  }

  return warnings;
}