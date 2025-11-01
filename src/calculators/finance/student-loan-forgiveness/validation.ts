import { StudentLoanForgivenessInputs } from './types';

export function validateStudentLoanForgivenessInputs(inputs: StudentLoanForgivenessInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Loan Balance Validation
  if (!inputs.loanBalance || inputs.loanBalance <= 0) {
    errors.push({ field: 'loanBalance', message: 'Loan balance must be greater than 0' });
  }
  if (inputs.loanBalance && inputs.loanBalance > 5000000) {
    errors.push({ field: 'loanBalance', message: 'Loan balance cannot exceed $5,000,000' });
  }

  // Interest Rate Validation
  if (inputs.interestRate < 0 || inputs.interestRate > 15) {
    errors.push({ field: 'interestRate', message: 'Interest rate must be between 0% and 15%' });
  }

  // Monthly Payment Validation
  if (!inputs.monthlyPayment || inputs.monthlyPayment <= 0) {
    errors.push({ field: 'monthlyPayment', message: 'Monthly payment must be greater than 0' });
  }
  if (inputs.monthlyPayment && inputs.loanBalance && inputs.monthlyPayment > inputs.loanBalance * 0.1) {
    errors.push({ field: 'monthlyPayment', message: 'Monthly payment seems unusually high for the loan balance' });
  }

  // Years of Service Validation
  if (inputs.yearsOfService < 0) {
    errors.push({ field: 'yearsOfService', message: 'Years of service cannot be negative' });
  }
  if (inputs.yearsOfService > 50) {
    errors.push({ field: 'yearsOfService', message: 'Years of service cannot exceed 50' });
  }

  // Required Years for Forgiveness Validation
  if (!inputs.requiredYearsForForgiveness || inputs.requiredYearsForForgiveness < 1) {
    errors.push({ field: 'requiredYearsForForgiveness', message: 'Required years for forgiveness must be at least 1' });
  }
  if (inputs.requiredYearsForForgiveness && inputs.requiredYearsForForgiveness > 30) {
    errors.push({ field: 'requiredYearsForForgiveness', message: 'Required years for forgiveness cannot exceed 30' });
  }

  // Income Validation
  if (inputs.income < 0) {
    errors.push({ field: 'income', message: 'Income cannot be negative' });
  }
  if (inputs.income > 10000000) {
    errors.push({ field: 'income', message: 'Income cannot exceed $10,000,000' });
  }

  // Family Size Validation
  if (!inputs.familySize || inputs.familySize < 1) {
    errors.push({ field: 'familySize', message: 'Family size must be at least 1' });
  }
  if (inputs.familySize > 20) {
    errors.push({ field: 'familySize', message: 'Family size cannot exceed 20' });
  }

  // Current Age Validation
  if (!inputs.currentAge || inputs.currentAge < 18) {
    errors.push({ field: 'currentAge', message: 'Current age must be at least 18' });
  }
  if (inputs.currentAge > 100) {
    errors.push({ field: 'currentAge', message: 'Current age cannot exceed 100' });
  }

  // Expected Salary Growth Validation
  if (inputs.expectedSalaryGrowth < -10 || inputs.expectedSalaryGrowth > 20) {
    errors.push({ field: 'expectedSalaryGrowth', message: 'Expected salary growth must be between -10% and 20%' });
  }

  // Tax Bracket Validation
  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push({ field: 'taxBracket', message: 'Tax bracket must be between 0% and 50%' });
  }

  // Alternative Payment Validation
  if (inputs.alternativePayment < 0) {
    errors.push({ field: 'alternativePayment', message: 'Alternative payment cannot be negative' });
  }

  return errors;
}

export function validateStudentLoanForgivenessBusinessRules(inputs: StudentLoanForgivenessInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Forgiveness Program Specific Warnings
  if (inputs.forgivenessProgram === 'public_service' && !['government', 'nonprofit', 'military'].includes(inputs.employmentType)) {
    warnings.push({ field: 'employmentType', message: 'Public Service Loan Forgiveness requires qualifying employment' });
  }

  if (inputs.forgivenessProgram === 'teacher' && inputs.employmentType !== 'teacher') {
    warnings.push({ field: 'employmentType', message: 'Teacher Loan Forgiveness requires teaching employment' });
  }

  if (inputs.forgivenessProgram === 'nurse' && inputs.employmentType !== 'nurse') {
    warnings.push({ field: 'employmentType', message: 'Nurse Loan Forgiveness requires nursing employment' });
  }

  // Years of Service Warnings
  if (inputs.yearsOfService > inputs.requiredYearsForForgiveness) {
    warnings.push({ field: 'yearsOfService', message: 'You may already be eligible for forgiveness' });
  }

  // Payment Amount Warnings
  if (inputs.monthlyPayment < 50) {
    warnings.push({ field: 'monthlyPayment', message: 'Payment amount seems low - verify with loan servicer' });
  }

  // Interest Rate Warnings
  if (inputs.interestRate > 8) {
    warnings.push({ field: 'interestRate', message: 'High interest rate increases total cost of borrowing' });
  }

  // Age Warnings
  if (inputs.currentAge > 50) {
    warnings.push({ field: 'currentAge', message: 'Age may affect eligibility for certain forgiveness programs' });
  }

  // Income Warnings
  if (inputs.income > 150000 && inputs.forgivenessProgram === 'income_driven') {
    warnings.push({ field: 'income', message: 'High income may reduce IDR payment benefits' });
  }

  // Tax Bracket Warnings
  if (inputs.taxBracket > 35) {
    warnings.push({ field: 'taxBracket', message: 'High tax bracket increases tax liability on forgiven amounts' });
  }

  // Loan Balance Warnings
  if (inputs.loanBalance > 100000) {
    warnings.push({ field: 'loanBalance', message: 'Large loan balance may qualify for different forgiveness programs' });
  }

  return warnings;
}