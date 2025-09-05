import { ValidationResult } from './validation';

export function validateCurrentLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Current loan amount is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Current loan amount must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 10000) {
    errors.push('Current loan amount must be at least $10,000');
  }
  if (numValue > 10000000) {
    errors.push('Current loan amount cannot exceed $10,000,000');
  }

  if (allInputs?.propertyValue && numValue > allInputs.propertyValue) {
    warnings.push('Current loan amount exceeds property value');
  }

  if (allInputs?.borrowerIncome && numValue > allInputs.borrowerIncome * 10) {
    warnings.push('Current loan amount is more than 10 times borrower income');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCurrentInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Current interest rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Current interest rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Current interest rate cannot be negative');
  }
  if (numValue > 0.5) {
    errors.push('Current interest rate cannot exceed 50%');
  }

  if (allInputs?.newInterestRate) {
    const rateDifference = Math.abs(numValue - allInputs.newInterestRate);
    if (rateDifference > 0.1) {
      warnings.push('Rate difference between current and new rate is significant');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateNewLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('New loan amount is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('New loan amount must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 10000) {
    errors.push('New loan amount must be at least $10,000');
  }
  if (numValue > 10000000) {
    errors.push('New loan amount cannot exceed $10,000,000');
  }

  if (allInputs?.propertyValue && numValue > allInputs.propertyValue) {
    warnings.push('New loan amount exceeds property value');
  }

  if (allInputs?.borrowerIncome && numValue > allInputs.borrowerIncome * 10) {
    warnings.push('New loan amount is more than 10 times borrower income');
  }

  if (allInputs?.currentLoanAmount) {
    const loanDifference = Math.abs(numValue - allInputs.currentLoanAmount);
    if (loanDifference > allInputs.currentLoanAmount * 0.2) {
      warnings.push('Significant difference between current and new loan amounts');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateNewInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('New interest rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('New interest rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('New interest rate cannot be negative');
  }
  if (numValue > 0.5) {
    errors.push('New interest rate cannot exceed 50%');
  }

  if (allInputs?.currentInterestRate) {
    const rateDifference = Math.abs(numValue - allInputs.currentInterestRate);
    if (rateDifference > 0.1) {
      warnings.push('Rate difference between current and new rate is significant');
    }
  }

  if (allInputs?.targetRate && numValue > allInputs.targetRate) {
    warnings.push('New interest rate exceeds target rate');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCurrentLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Current loan term is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Current loan term must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1) {
    errors.push('Current loan term must be at least 1 year');
  }
  if (numValue > 50) {
    errors.push('Current loan term cannot exceed 50 years');
  }

  if (numValue > 30) {
    warnings.push('Current loan term longer than 30 years may increase total interest paid');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateNewLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('New loan term is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('New loan term must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1) {
    errors.push('New loan term must be at least 1 year');
  }
  if (numValue > 50) {
    errors.push('New loan term cannot exceed 50 years');
  }

  if (numValue > 30) {
    warnings.push('New loan term longer than 30 years may increase total interest paid');
  }

  if (allInputs?.currentLoanTerm && numValue > allInputs.currentLoanTerm) {
    warnings.push('New loan term is longer than current loan term');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCurrentMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Current monthly payment is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Current monthly payment must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 100) {
    errors.push('Current monthly payment must be at least $100');
  }
  if (numValue > 50000) {
    errors.push('Current monthly payment cannot exceed $50,000');
  }

  if (allInputs?.borrowerIncome && numValue > allInputs.borrowerIncome / 12 * 0.5) {
    warnings.push('Current monthly payment is more than 50% of monthly income');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCurrentRemainingTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Current remaining term is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Current remaining term must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1) {
    errors.push('Current remaining term must be at least 1 year');
  }
  if (numValue > 50) {
    errors.push('Current remaining term cannot exceed 50 years');
  }

  if (allInputs?.currentLoanTerm && numValue > allInputs.currentLoanTerm) {
    warnings.push('Current remaining term cannot exceed current loan term');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCurrentPrincipalBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Current principal balance is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Current principal balance must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1000) {
    errors.push('Current principal balance must be at least $1,000');
  }
  if (numValue > 10000000) {
    errors.push('Current principal balance cannot exceed $10,000,000');
  }

  if (allInputs?.currentLoanAmount && numValue > allInputs.currentLoanAmount) {
    warnings.push('Current principal balance cannot exceed current loan amount');
  }

  if (allInputs?.propertyValue && numValue > allInputs.propertyValue) {
    warnings.push('Current principal balance exceeds property value');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Property value is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property value must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 50000) {
    errors.push('Property value must be at least $50,000');
  }
  if (numValue > 50000000) {
    errors.push('Property value cannot exceed $50,000,000');
  }

  if (allInputs?.currentLoanAmount && numValue < allInputs.currentLoanAmount) {
    warnings.push('Property value is less than current loan amount');
  }

  if (allInputs?.newLoanAmount && numValue < allInputs.newLoanAmount) {
    warnings.push('Property value is less than new loan amount');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Property size is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property size must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 100) {
    errors.push('Property size must be at least 100 square feet');
  }
  if (numValue > 50000) {
    errors.push('Property size cannot exceed 50,000 square feet');
  }

  if (allInputs?.propertyValue && numValue > 0) {
    const pricePerSqFt = allInputs.propertyValue / numValue;
    if (pricePerSqFt < 50) {
      warnings.push('Price per square foot seems unusually low');
    }
    if (pricePerSqFt > 2000) {
      warnings.push('Price per square foot seems unusually high');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Property age is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property age must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Property age cannot be negative');
  }
  if (numValue > 200) {
    errors.push('Property age cannot exceed 200 years');
  }

  if (numValue > 50) {
    warnings.push('Property age over 50 years may affect insurance and maintenance costs');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Closing costs are required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Closing costs must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Closing costs cannot be negative');
  }
  if (numValue > 50000) {
    warnings.push('Closing costs seem unusually high');
  }

  if (allInputs?.newLoanAmount && numValue > allInputs.newLoanAmount * 0.1) {
    warnings.push('Closing costs are more than 10% of new loan amount');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Borrower income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Borrower income cannot be negative');
  }
  if (numValue > 10000000) {
    warnings.push('Borrower income seems unusually high');
  }

  if (allInputs?.newLoanAmount && numValue > 0) {
    const incomeRatio = allInputs.newLoanAmount / numValue;
    if (incomeRatio > 10) {
      warnings.push('New loan amount is more than 10 times borrower income');
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Borrower credit score is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower credit score must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 300) {
    errors.push('Borrower credit score must be at least 300');
  }
  if (numValue > 850) {
    errors.push('Borrower credit score cannot exceed 850');
  }

  if (numValue < 620) {
    warnings.push('Credit score below 620 may affect loan approval');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Debt-to-income ratio is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Debt-to-income ratio must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Debt-to-income ratio cannot be negative');
  }
  if (numValue > 1) {
    errors.push('Debt-to-income ratio cannot exceed 1 (100%)');
  }

  if (numValue > 0.43) {
    warnings.push('Debt-to-income ratio above 43% may affect loan approval');
  }
  if (numValue > 0.5) {
    warnings.push('Debt-to-income ratio above 50% may significantly affect loan approval');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Borrower tax rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower tax rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Borrower tax rate cannot be negative');
  }
  if (numValue > 100) {
    errors.push('Borrower tax rate cannot exceed 100%');
  }

  if (numValue > 50) {
    warnings.push('Tax rate above 50% seems unusually high');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Market growth rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Market growth rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < -0.5) {
    errors.push('Market growth rate cannot be less than -50%');
  }
  if (numValue > 1) {
    errors.push('Market growth rate cannot exceed 100%');
  }

  if (numValue > 0.2) {
    warnings.push('High market growth rate may indicate market volatility');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Analysis period is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Analysis period must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1) {
    errors.push('Analysis period must be at least 1 year');
  }
  if (numValue > 30) {
    errors.push('Analysis period cannot exceed 30 years');
  }

  if (numValue > 10) {
    warnings.push('Analysis period longer than 10 years may have high uncertainty');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCashOutAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Cash out amount is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Cash out amount must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Cash out amount cannot be negative');
  }
  if (numValue > 1000000) {
    warnings.push('Cash out amount seems unusually high');
  }

  if (allInputs?.refinanceType === 'cash_out' && numValue === 0) {
    warnings.push('Cash-out refinance selected but no cash-out amount specified');
  }

  if (allInputs?.refinanceType === 'cash_in' && numValue > 0) {
    warnings.push('Cash-in refinance selected but cash-out amount is specified');
  }

  return { isValid: errors.length === 0, errors, warnings };
}