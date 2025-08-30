import { PrivateMortgageInsuranceInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof PrivateMortgageInsuranceInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'loanAmount':
      return validateLoanAmount(value, allInputs);
    case 'interestRate':
      return validateInterestRate(value);
    case 'loanTerm':
      return validateLoanTerm(value);
    case 'loanType':
      return validateLoanType(value);
    case 'paymentType':
      return validatePaymentType(value);
    case 'propertyValue':
      return validatePropertyValue(value, allInputs);
    case 'propertyAddress':
      return validatePropertyAddress(value);
    case 'propertyType':
      return validatePropertyType(value);
    case 'propertySize':
      return validatePropertySize(value, allInputs);
    case 'propertyAge':
      return validatePropertyAge(value);
    case 'downPayment':
      return validateDownPayment(value, allInputs);
    case 'downPaymentPercentage':
      return validateDownPaymentPercentage(value, allInputs);
    case 'downPaymentSource':
      return validateDownPaymentSource(value);
    case 'pmiRequired':
      return validatePmiRequired(value);
    case 'pmiRate':
      return validatePmiRate(value, allInputs);
    case 'pmiType':
      return validatePmiType(value);
    case 'pmiCancellationMethod':
      return validatePmiCancellationMethod(value);
    case 'borrowerIncome':
      return validateBorrowerIncome(value);
    case 'borrowerCreditScore':
      return validateBorrowerCreditScore(value, allInputs);
    case 'borrowerDebtToIncomeRatio':
      return validateBorrowerDebtToIncomeRatio(value);
    case 'borrowerEmploymentType':
      return validateBorrowerEmploymentType(value);
    case 'borrowerTaxRate':
      return validateBorrowerTaxRate(value);
    case 'loanStartDate':
      return validateLoanStartDate(value);
    case 'paymentsMade':
      return validatePaymentsMade(value, allInputs);
    case 'monthsSinceLoanStart':
      return validateMonthsSinceLoanStart(value, allInputs);
    case 'currentPrincipalBalance':
      return validateCurrentPrincipalBalance(value, allInputs);
    case 'marketLocation':
      return validateMarketLocation(value);
    case 'marketCondition':
      return validateMarketCondition(value);
    case 'marketGrowthRate':
      return validateMarketGrowthRate(value);
    case 'propertyAppreciationRate':
      return validatePropertyAppreciationRate(value);
    case 'ltvThreshold':
      return validateLtvThreshold(value);
    case 'paymentHistory':
      return validatePaymentHistory(value);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value, allInputs);
    case 'inflationRate':
      return validateInflationRate(value);
    case 'discountRate':
      return validateDiscountRate(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    case 'includeCharts':
      return validateIncludeCharts(value);
    default:
      return { isValid: true };
  }
}

function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Loan amount cannot exceed $10 million' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, error: 'Loan amount cannot exceed property value' };
  }
  if (allInputs?.propertyValue && (value / allInputs.propertyValue) * 100 < 10) {
    return { isValid: false, error: 'Loan amount seems unusually low relative to property value' };
  }
  return { isValid: true };
}

function validateInterestRate(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Interest rate must be greater than 0' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Interest rate cannot exceed 20%' };
  }
  return { isValid: true };
}

function validateLoanTerm(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Loan term must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateLoanType(value: any): ValidationResult {
  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Valid loan type is required' };
  }
  return { isValid: true };
}

function validatePaymentType(value: any): ValidationResult {
  const validTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Valid payment type is required' };
  }
  return { isValid: true };
}

function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Property value cannot exceed $10 million' };
  }
  if (allInputs?.loanAmount && value < allInputs.loanAmount) {
    return { isValid: false, error: 'Property value cannot be less than loan amount' };
  }
  return { isValid: true };
}

function validatePropertyAddress(value: any): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Property address is required' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any): ValidationResult {
  const validTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Valid property type is required' };
  }
  return { isValid: true };
}

function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property size must be greater than 0' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Property size cannot exceed 100,000 sq ft' };
  }
  if (allInputs?.propertyType === 'single_family' && value > 10000) {
    return { isValid: false, error: 'Property size seems unusually large for single family home' };
  }
  if (allInputs?.propertyType === 'condo' && value > 5000) {
    return { isValid: false, error: 'Property size seems unusually large for condominium' };
  }
  return { isValid: true };
}

function validatePropertyAge(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Property age must be 0 or greater' };
  }
  if (value > 200) {
    return { isValid: false, error: 'Property age cannot exceed 200 years' };
  }
  return { isValid: true };
}

function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Down payment must be 0 or greater' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, error: 'Down payment cannot exceed property value' };
  }
  if (allInputs?.propertyValue && allInputs?.loanAmount) {
    const calculatedDownPayment = allInputs.propertyValue - allInputs.loanAmount;
    if (Math.abs(value - calculatedDownPayment) > 1000) {
      return { isValid: false, error: 'Down payment should equal property value minus loan amount' };
    }
  }
  return { isValid: true };
}

function validateDownPaymentPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Down payment percentage must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Down payment percentage cannot exceed 100%' };
  }
  if (allInputs?.downPayment && allInputs?.propertyValue) {
    const calculatedPercentage = (allInputs.downPayment / allInputs.propertyValue) * 100;
    if (Math.abs(value - calculatedPercentage) > 1) {
      return { isValid: false, error: 'Down payment percentage should match down payment amount' };
    }
  }
  return { isValid: true };
}

function validateDownPaymentSource(value: any): ValidationResult {
  const validSources = ['savings', 'investment_sale', 'gift', 'inheritance', 'other'];
  if (!value || !validSources.includes(value)) {
    return { isValid: false, error: 'Valid down payment source is required' };
  }
  return { isValid: true };
}

function validatePmiRequired(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'PMI required must be true or false' };
  }
  return { isValid: true };
}

function validatePmiRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'PMI rate must be 0 or greater' };
  }
  if (value > 5) {
    return { isValid: false, error: 'PMI rate cannot exceed 5%' };
  }
  if (allInputs?.loanType === 'conventional' && value > 1.5) {
    return { isValid: false, error: 'PMI rate seems unusually high for conventional loan' };
  }
  if (allInputs?.loanType === 'fha' && value > 1.75) {
    return { isValid: false, error: 'PMI rate seems unusually high for FHA loan' };
  }
  return { isValid: true };
}

function validatePmiType(value: any): ValidationResult {
  const validTypes = ['monthly', 'single_premium', 'split_premium', 'lender_paid'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Valid PMI type is required' };
  }
  return { isValid: true };
}

function validatePmiCancellationMethod(value: any): ValidationResult {
  const validMethods = ['automatic', 'request', 'refinance'];
  if (!value || !validMethods.includes(value)) {
    return { isValid: false, error: 'Valid PMI cancellation method is required' };
  }
  return { isValid: true };
}

function validateBorrowerIncome(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Borrower income must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Borrower income cannot exceed $10 million' };
  }
  return { isValid: true };
}

function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 300) {
    return { isValid: false, error: 'Credit score must be 300 or greater' };
  }
  if (value > 850) {
    return { isValid: false, error: 'Credit score cannot exceed 850' };
  }
  if (allInputs?.loanType === 'conventional' && value < 620) {
    return { isValid: false, error: 'Credit score seems low for conventional loan' };
  }
  if (allInputs?.loanType === 'fha' && value < 580) {
    return { isValid: false, error: 'Credit score seems low for FHA loan' };
  }
  return { isValid: true };
}

function validateBorrowerDebtToIncomeRatio(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Debt-to-income ratio must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Debt-to-income ratio cannot exceed 100%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Debt-to-income ratio seems unusually high' };
  }
  return { isValid: true };
}

function validateBorrowerEmploymentType(value: any): ValidationResult {
  const validTypes = ['employed', 'self_employed', 'retired', 'business_owner'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Valid employment type is required' };
  }
  return { isValid: true };
}

function validateBorrowerTaxRate(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Tax rate must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateLoanStartDate(value: any): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Loan start date is required' };
  }
  return { isValid: true };
}

function validatePaymentsMade(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Payments made must be 0 or greater' };
  }
  if (allInputs?.loanTerm && value > allInputs.loanTerm * 12) {
    return { isValid: false, error: 'Payments made cannot exceed total loan term' };
  }
  if (allInputs?.monthsSinceLoanStart && value > allInputs.monthsSinceLoanStart) {
    return { isValid: false, error: 'Payments made cannot exceed months since loan start' };
  }
  return { isValid: true };
}

function validateMonthsSinceLoanStart(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Months since loan start must be 0 or greater' };
  }
  if (allInputs?.loanTerm && value > allInputs.loanTerm * 12) {
    return { isValid: false, error: 'Months since loan start cannot exceed total loan term' };
  }
  return { isValid: true };
}

function validateCurrentPrincipalBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Current principal balance must be greater than 0' };
  }
  if (allInputs?.loanAmount && value > allInputs.loanAmount) {
    return { isValid: false, error: 'Current principal balance cannot exceed original loan amount' };
  }
  return { isValid: true };
}

function validateMarketLocation(value: any): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Market location is required' };
  }
  return { isValid: true };
}

function validateMarketCondition(value: any): ValidationResult {
  const validConditions = ['declining', 'stable', 'growing', 'hot'];
  if (!value || !validConditions.includes(value)) {
    return { isValid: false, error: 'Valid market condition is required' };
  }
  return { isValid: true };
}

function validateMarketGrowthRate(value: any): ValidationResult {
  if (!value || value < -50) {
    return { isValid: false, error: 'Market growth rate must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Market growth rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validatePropertyAppreciationRate(value: any): ValidationResult {
  if (!value || value < -50) {
    return { isValid: false, error: 'Property appreciation rate must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Property appreciation rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateLtvThreshold(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'LTV threshold must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, error: 'LTV threshold cannot exceed 100%' };
  }
  if (value < 70 || value > 95) {
    return { isValid: false, error: 'LTV threshold should typically be between 70% and 95%' };
  }
  return { isValid: true };
}

function validatePaymentHistory(value: any): ValidationResult {
  if (!value || !Array.isArray(value)) {
    return { isValid: false, error: 'Payment history must be an array' };
  }
  for (let i = 0; i < value.length; i++) {
    const payment = value[i];
    if (!payment.paymentNumber || payment.paymentNumber <= 0) {
      return { isValid: false, error: `Payment ${i + 1} number must be greater than 0` };
    }
    if (!payment.paymentDate || payment.paymentDate.trim().length === 0) {
      return { isValid: false, error: `Payment ${i + 1} date is required` };
    }
    if (!payment.paymentAmount || payment.paymentAmount <= 0) {
      return { isValid: false, error: `Payment ${i + 1} amount must be greater than 0` };
    }
    if (!payment.principal || payment.principal < 0) {
      return { isValid: false, error: `Payment ${i + 1} principal must be 0 or greater` };
    }
    if (!payment.interest || payment.interest < 0) {
      return { isValid: false, error: `Payment ${i + 1} interest must be 0 or greater` };
    }
    if (!payment.balance || payment.balance < 0) {
      return { isValid: false, error: `Payment ${i + 1} balance must be 0 or greater` };
    }
    if (typeof payment.onTime !== 'boolean') {
      return { isValid: false, error: `Payment ${i + 1} on time status must be true or false` };
    }
  }
  return { isValid: true };
}

function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0' };
  }
  if (value > 360) {
    return { isValid: false, error: 'Analysis period cannot exceed 360 months' };
  }
  if (allInputs?.loanTerm && value > allInputs.loanTerm * 12) {
    return { isValid: false, error: 'Analysis period should not exceed loan term' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any): ValidationResult {
  if (!value || value < -50) {
    return { isValid: false, error: 'Inflation rate must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Inflation rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateDiscountRate(value: any): ValidationResult {
  if (!value || value < -100) {
    return { isValid: false, error: 'Discount rate must be -100% or greater' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'Discount rate cannot exceed 1000%' };
  }
  return { isValid: true };
}

function validateCurrency(value: any): ValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!value || !validCurrencies.includes(value)) {
    return { isValid: false, error: 'Valid currency is required' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any): ValidationResult {
  const validFormats = ['percentage', 'decimal', 'currency'];
  if (!value || !validFormats.includes(value)) {
    return { isValid: false, error: 'Valid display format is required' };
  }
  return { isValid: true };
}

function validateIncludeCharts(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include charts must be true or false' };
  }
  return { isValid: true };
}