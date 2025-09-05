import { ValidationResult } from './validation';

export function validateOriginalLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Original loan amount is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Original loan amount must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Original loan amount must be greater than 0'], warnings: [] };
  }

  if (numValue < 50000) {
    return { isValid: true, errors: [], warnings: ['Original loan amount is very low'] };
  }

  if (numValue > 10000000) {
    return { isValid: true, errors: [], warnings: ['Original loan amount is very high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateCurrentLoanBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Current loan balance is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Current loan balance must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Current loan balance must be greater than 0'], warnings: [] };
  }

  if (allInputs?.originalLoanAmount && numValue > allInputs.originalLoanAmount) {
    return { isValid: false, errors: ['Current loan balance cannot exceed original loan amount'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Interest rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Interest rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['Interest rate must be between 0 and 1'], warnings: [] };
  }

  if (numValue > 0.1) {
    return { isValid: true, errors: [], warnings: ['Interest rate is very high'] };
  }

  if (numValue < 0.02) {
    return { isValid: true, errors: [], warnings: ['Interest rate is very low'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Loan term is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Loan term must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Loan term must be greater than 0'], warnings: [] };
  }

  if (numValue < 10) {
    return { isValid: true, errors: [], warnings: ['Loan term is very short'] };
  }

  if (numValue > 40) {
    return { isValid: true, errors: [], warnings: ['Loan term is very long'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateLoanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Loan type is required'], warnings: [] };
  }

  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: ['Loan type must be one of: conventional, fha, va, usda, jumbo'], warnings: [] };
  }

  if (value === 'fha') {
    return { isValid: true, errors: [], warnings: ['FHA loans typically do not allow PMI cancellation'] };
  }

  if (value === 'va') {
    return { isValid: true, errors: [], warnings: ['VA loans typically do not require PMI'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateOriginalPropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Original property value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Original property value must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Original property value must be greater than 0'], warnings: [] };
  }

  if (numValue < 50000) {
    return { isValid: true, errors: [], warnings: ['Original property value is very low'] };
  }

  if (numValue > 50000000) {
    return { isValid: true, errors: [], warnings: ['Original property value is very high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateCurrentPropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Current property value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Current property value must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Current property value must be greater than 0'], warnings: [] };
  }

  if (allInputs?.currentLoanBalance && numValue < allInputs.currentLoanBalance) {
    return { isValid: true, errors: [], warnings: ['Current property value is less than loan balance (underwater loan)'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property address is required'], warnings: [] };
  }

  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, errors: ['Property address must be a non-empty string'], warnings: [] };
  }

  if (value.trim().length < 10) {
    return { isValid: true, errors: [], warnings: ['Property address seems incomplete'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property type is required'], warnings: [] };
  }

  const validTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: ['Property type must be one of: single_family, multi_family, condo, townhouse, commercial'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property size is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property size must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Property size must be greater than 0'], warnings: [] };
  }

  if (numValue < 500) {
    return { isValid: true, errors: [], warnings: ['Property size is very small'] };
  }

  if (numValue > 10000) {
    return { isValid: true, errors: [], warnings: ['Property size is very large'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property age is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property age must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Property age cannot be negative'], warnings: [] };
  }

  if (numValue > 100) {
    return { isValid: true, errors: [], warnings: ['Property age is very high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePMIRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['PMI rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['PMI rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['PMI rate must be between 0 and 1'], warnings: [] };
  }

  if (numValue > 0.05) {
    return { isValid: true, errors: [], warnings: ['PMI rate is unusually high'] };
  }

  if (numValue < 0.001) {
    return { isValid: true, errors: [], warnings: ['PMI rate is unusually low'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePMIMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['PMI monthly payment is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['PMI monthly payment must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['PMI monthly payment cannot be negative'], warnings: [] };
  }

  if (allInputs?.originalLoanAmount && numValue > allInputs.originalLoanAmount * 0.01) {
    return { isValid: true, errors: [], warnings: ['PMI monthly payment seems unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePMIStartDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['PMI start date is required'], warnings: [] };
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: ['PMI start date must be a valid date'], warnings: [] };
  }

  const today = new Date();
  if (date > today) {
    return { isValid: true, errors: [], warnings: ['PMI start date is in the future'] };
  }

  // Check if PMI start date is after loan start date
  if (allInputs?.loanStartDate) {
    const loanStartDate = new Date(allInputs.loanStartDate);
    if (date < loanStartDate) {
      return { isValid: false, errors: ['PMI start date cannot be before loan start date'], warnings: [] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePMICancellationMethod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['PMI cancellation method is required'], warnings: [] };
  }

  const validMethods = ['automatic', 'request', 'refinance', 'appraisal'];
  if (!validMethods.includes(value)) {
    return { isValid: false, errors: ['PMI cancellation method must be one of: automatic, request, refinance, appraisal'], warnings: [] };
  }

  if (value === 'automatic') {
    return { isValid: true, errors: [], warnings: ['Automatic cancellation requires no action but may take longer'] };
  }

  if (value === 'request') {
    return { isValid: true, errors: [], warnings: ['Request cancellation may require appraisal and documentation'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateLoanStartDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Loan start date is required'], warnings: [] };
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: ['Loan start date must be a valid date'], warnings: [] };
  }

  const today = new Date();
  if (date > today) {
    return { isValid: true, errors: [], warnings: ['Loan start date is in the future'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateOriginalDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Original down payment is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Original down payment must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Original down payment cannot be negative'], warnings: [] };
  }

  if (allInputs?.originalPropertyValue && allInputs?.originalLoanAmount) {
    const expectedDownPayment = allInputs.originalPropertyValue - allInputs.originalLoanAmount;
    if (Math.abs(numValue - expectedDownPayment) > 1000) {
      return { isValid: true, errors: [], warnings: ['Down payment does not match property value minus loan amount'] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateOriginalDownPaymentPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Original down payment percentage is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Original down payment percentage must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['Original down payment percentage must be between 0 and 1'], warnings: [] };
  }

  if (numValue < 0.05) {
    return { isValid: true, errors: [], warnings: ['Down payment percentage is very low'] };
  }

  if (numValue > 0.5) {
    return { isValid: true, errors: [], warnings: ['Down payment percentage is very high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePaymentsMade(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Payments made is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Payments made must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Payments made cannot be negative'], warnings: [] };
  }

  if (allInputs?.loanTerm) {
    const maxPayments = allInputs.loanTerm * 12;
    if (numValue > maxPayments) {
      return { isValid: true, errors: [], warnings: ['Payments made exceeds loan term'] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMonthsSinceLoanStart(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Months since loan start is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Months since loan start must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Months since loan start cannot be negative'], warnings: [] };
  }

  if (allInputs?.loanTerm) {
    const maxMonths = allInputs.loanTerm * 12;
    if (numValue > maxMonths) {
      return { isValid: true, errors: [], warnings: ['Months since loan start exceeds loan term'] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateAppraisalValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Appraisal value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Appraisal value must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Appraisal value cannot be negative'], warnings: [] };
  }

  if (allInputs?.currentPropertyValue) {
    const difference = Math.abs(numValue - allInputs.currentPropertyValue) / allInputs.currentPropertyValue;
    if (difference > 0.1) {
      return { isValid: true, errors: [], warnings: ['Appraisal value differs significantly from current property value'] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateAppraisalDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Appraisal date is required'], warnings: [] };
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: ['Appraisal date must be a valid date'], warnings: [] };
  }

  const today = new Date();
  if (date > today) {
    return { isValid: true, errors: [], warnings: ['Appraisal date is in the future'] };
  }

  // Check if appraisal is too old (more than 1 year)
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  if (date < oneYearAgo) {
    return { isValid: true, errors: [], warnings: ['Appraisal date is more than 1 year old'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateAppraisalCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Appraisal cost is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Appraisal cost must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Appraisal cost cannot be negative'], warnings: [] };
  }

  if (numValue > 1000) {
    return { isValid: true, errors: [], warnings: ['Appraisal cost is unusually high'] };
  }

  if (numValue < 200) {
    return { isValid: true, errors: [], warnings: ['Appraisal cost is unusually low'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Market location is required'], warnings: [] };
  }

  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, errors: ['Market location must be a non-empty string'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketCondition(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Market condition is required'], warnings: [] };
  }

  const validConditions = ['declining', 'stable', 'growing', 'hot'];
  if (!validConditions.includes(value)) {
    return { isValid: false, errors: ['Market condition must be one of: declining, stable, growing, hot'], warnings: [] };
  }

  if (value === 'declining') {
    return { isValid: true, errors: [], warnings: ['Declining market may impact PMI cancellation timeline'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Market growth rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Market growth rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Market growth rate cannot be negative'], warnings: [] };
  }

  if (numValue > 0.2) {
    return { isValid: true, errors: [], warnings: ['Market growth rate is very high, may be unrealistic'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower income is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower income must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Borrower income cannot be negative'], warnings: [] };
  }

  if (numValue < 30000) {
    return { isValid: true, errors: [], warnings: ['Borrower income is very low'] };
  }

  if (numValue > 1000000) {
    return { isValid: true, errors: [], warnings: ['Borrower income is very high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower credit score is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower credit score must be a valid number'], warnings: [] };
  }

  if (numValue < 300 || numValue > 850) {
    return { isValid: false, errors: ['Borrower credit score must be between 300 and 850'], warnings: [] };
  }

  if (numValue < 620) {
    return { isValid: true, errors: [], warnings: ['Low credit score may impact PMI cancellation eligibility'] };
  }

  if (numValue > 750) {
    return { isValid: true, errors: [], warnings: ['High credit score may provide better PMI cancellation options'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower debt-to-income ratio is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower debt-to-income ratio must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['Borrower debt-to-income ratio must be between 0 and 1'], warnings: [] };
  }

  if (numValue > 0.5) {
    return { isValid: true, errors: [], warnings: ['High debt-to-income ratio may impact PMI cancellation eligibility'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerEmploymentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower employment type is required'], warnings: [] };
  }

  const validTypes = ['employed', 'self_employed', 'retired', 'business_owner'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: ['Borrower employment type must be one of: employed, self_employed, retired, business_owner'], warnings: [] };
  }

  if (value === 'self_employed') {
    return { isValid: true, errors: [], warnings: ['Self-employed borrowers may need additional documentation'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateLTVThreshold(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['LTV threshold is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['LTV threshold must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['LTV threshold must be between 0 and 1'], warnings: [] };
  }

  if (numValue > 0.8) {
    return { isValid: true, errors: [], warnings: ['LTV threshold is higher than standard 80%'] };
  }

  if (numValue < 0.7) {
    return { isValid: true, errors: [], warnings: ['LTV threshold is lower than standard 80%'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property appreciation rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property appreciation rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Property appreciation rate cannot be negative'], warnings: [] };
  }

  if (numValue > 0.15) {
    return { isValid: true, errors: [], warnings: ['Property appreciation rate is very high, may be unrealistic'] };
  }

  if (numValue < 0.01) {
    return { isValid: true, errors: [], warnings: ['Property appreciation rate is very low'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Discount rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Discount rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Discount rate cannot be negative'], warnings: [] };
  }

  if (numValue > 0.3) {
    return { isValid: true, errors: [], warnings: ['Discount rate is very high'] };
  }

  if (numValue < 0.05) {
    return { isValid: true, errors: [], warnings: ['Discount rate is very low'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}