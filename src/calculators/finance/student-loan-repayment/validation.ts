import { StudentLoanRepaymentInputs } from './types';

export function validateStudentLoanRepaymentInputs(inputs: StudentLoanRepaymentInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Loan balance validation
  if (!inputs.loanBalance || inputs.loanBalance <= 0) {
    errors.push({ field: 'loanBalance', message: 'Loan balance must be greater than 0' });
  }
  if (inputs.loanBalance && inputs.loanBalance > 500000) {
    errors.push({ field: 'loanBalance', message: 'Loan balance cannot exceed $500,000' });
  }

  // Interest rate validation
  if (!inputs.interestRate || inputs.interestRate < 0) {
    errors.push({ field: 'interestRate', message: 'Interest rate must be 0 or greater' });
  }
  if (inputs.interestRate && inputs.interestRate > 15) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot exceed 15%' });
  }

  // Loan term validation
  if (!inputs.loanTermYears || inputs.loanTermYears < 1) {
    errors.push({ field: 'loanTermYears', message: 'Loan term must be at least 1 year' });
  }
  if (inputs.loanTermYears && inputs.loanTermYears > 30) {
    errors.push({ field: 'loanTermYears', message: 'Loan term cannot exceed 30 years' });
  }

  // Monthly income validation
  if (!inputs.monthlyIncome || inputs.monthlyIncome <= 0) {
    errors.push({ field: 'monthlyIncome', message: 'Monthly income must be greater than 0' });
  }
  if (inputs.monthlyIncome && inputs.monthlyIncome > 50000) {
    errors.push({ field: 'monthlyIncome', message: 'Monthly income cannot exceed $50,000' });
  }

  // Monthly expenses validation
  if (inputs.monthlyExpenses && inputs.monthlyExpenses < 0) {
    errors.push({ field: 'monthlyExpenses', message: 'Monthly expenses cannot be negative' });
  }
  if (inputs.monthlyExpenses && inputs.monthlyIncome && inputs.monthlyExpenses >= inputs.monthlyIncome) {
    errors.push({ field: 'monthlyExpenses', message: 'Monthly expenses cannot be greater than or equal to income' });
  }

  // Family size validation
  if (!inputs.familySize || inputs.familySize < 1) {
    errors.push({ field: 'familySize', message: 'Family size must be at least 1' });
  }
  if (inputs.familySize && inputs.familySize > 10) {
    errors.push({ field: 'familySize', message: 'Family size cannot exceed 10' });
  }

  // Dependents validation
  if (inputs.dependents && inputs.dependents < 0) {
    errors.push({ field: 'dependents', message: 'Number of dependents cannot be negative' });
  }
  if (inputs.dependents && inputs.dependents > 10) {
    errors.push({ field: 'dependents', message: 'Number of dependents cannot exceed 10' });
  }

  // Current age validation
  if (!inputs.currentAge || inputs.currentAge < 18) {
    errors.push({ field: 'currentAge', message: 'Current age must be at least 18' });
  }
  if (inputs.currentAge && inputs.currentAge > 100) {
    errors.push({ field: 'currentAge', message: 'Current age cannot exceed 100' });
  }

  // Spouse income validation
  if (inputs.spouseIncome && inputs.spouseIncome < 0) {
    errors.push({ field: 'spouseIncome', message: 'Spouse income cannot be negative' });
  }

  // Expected income growth validation
  if (inputs.expectedIncomeGrowth && (inputs.expectedIncomeGrowth < -20 || inputs.expectedIncomeGrowth > 50)) {
    errors.push({ field: 'expectedIncomeGrowth', message: 'Expected income growth must be between -20% and 50%' });
  }

  // Inflation rate validation
  if (inputs.inflationRate && (inputs.inflationRate < -5 || inputs.inflationRate > 20)) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -5% and 20%' });
  }

  // Tax rate validation
  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be between 0% and 50%' });
  }

  return errors;
}

export function validateStudentLoanRepaymentBusinessRules(inputs: StudentLoanRepaymentInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Affordability warnings
  if (inputs.monthlyIncome && inputs.monthlyExpenses) {
    const disposableIncome = inputs.monthlyIncome - inputs.monthlyExpenses;
    if (disposableIncome < 500) {
      warnings.push({ field: 'monthlyExpenses', message: 'Very low disposable income may affect repayment ability' });
    }
  }

  // Debt-to-income ratio warnings
  if (inputs.monthlyIncome && inputs.monthlyExpenses) {
    const dti = (inputs.monthlyExpenses / inputs.monthlyIncome) * 100;
    if (dti > 50) {
      warnings.push({ field: 'monthlyExpenses', message: 'High debt-to-income ratio may limit repayment options' });
    }
  }

  // Income-based repayment eligibility
  if (inputs.repaymentPlan === 'income_based' || inputs.repaymentPlan === 'pay_as_you_earn' || inputs.repaymentPlan === 'revised_pay_as_you_earn') {
    if (inputs.loanBalance && inputs.loanBalance < 10000) {
      warnings.push({ field: 'repaymentPlan', message: 'Income-driven plans may not be beneficial for small loan balances' });
    }
  }

  // Age warnings for extended repayment
  if (inputs.repaymentPlan === 'extended' && inputs.currentAge) {
    if (inputs.currentAge + inputs.loanTermYears > 75) {
      warnings.push({ field: 'repaymentPlan', message: 'Extended repayment may extend past typical retirement age' });
    }
  }

  // Employment status warnings
  if (inputs.employmentStatus === 'unemployed') {
    warnings.push({ field: 'employmentStatus', message: 'Unemployed status may affect repayment plan eligibility' });
  } else if (inputs.employmentStatus === 'self_employed') {
    warnings.push({ field: 'employmentStatus', message: 'Self-employed borrowers may need to provide additional documentation' });
  }

  // Family size and income warnings
  if (inputs.familySize > 4 && inputs.monthlyIncome < 5000) {
    warnings.push({ field: 'familySize', message: 'Large family size with low income may qualify for additional assistance' });
  }

  // Interest rate warnings
  if (inputs.interestRate && inputs.interestRate > 8) {
    warnings.push({ field: 'interestRate', message: 'High interest rate makes refinancing or income-driven plans more attractive' });
  }

  // Loan balance warnings
  if (inputs.loanBalance && inputs.loanBalance > 100000) {
    warnings.push({ field: 'loanBalance', message: 'High loan balance may benefit from extended repayment options' });
  }

  return warnings;
}