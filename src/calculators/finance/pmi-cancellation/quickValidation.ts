import { PMICancellationInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof PMICancellationInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'originalLoanAmount':
      return validateOriginalLoanAmount(value, allInputs);
    case 'currentLoanBalance':
      return validateCurrentLoanBalance(value, allInputs);
    case 'interestRate':
      return validateInterestRate(value);
    case 'loanTerm':
      return validateLoanTerm(value);
    case 'loanType':
      return validateLoanType(value);
    case 'paymentType':
      return validatePaymentType(value);
    case 'originalPropertyValue':
      return validateOriginalPropertyValue(value, allInputs);
    case 'currentPropertyValue':
      return validateCurrentPropertyValue(value, allInputs);
    case 'propertyType':
      return validatePropertyType(value);
    case 'propertySize':
      return validatePropertySize(value);
    case 'propertyAge':
      return validatePropertyAge(value);
    case 'pmiRate':
      return validatePMIRate(value, allInputs);
    case 'pmiMonthlyPayment':
      return validatePMIMonthlyPayment(value, allInputs);
    case 'pmiStartDate':
      return validatePMIStartDate(value, allInputs);
    case 'pmiCancellationMethod':
      return validatePMICancellationMethod(value);
    case 'loanStartDate':
      return validateLoanStartDate(value, allInputs);
    case 'originalDownPayment':
      return validateOriginalDownPayment(value, allInputs);
    case 'originalDownPaymentPercentage':
      return validateOriginalDownPaymentPercentage(value, allInputs);
    case 'paymentsMade':
      return validatePaymentsMade(value, allInputs);
    case 'monthsSinceLoanStart':
      return validateMonthsSinceLoanStart(value, allInputs);
    case 'appraisalValue':
      return validateAppraisalValue(value, allInputs);
    case 'appraisalCost':
      return validateAppraisalCost(value);
    case 'appraisalRequired':
      return validateAppraisalRequired(value);
    case 'marketLocation':
      return validateMarketLocation(value);
    case 'marketCondition':
      return validateMarketCondition(value);
    case 'marketGrowthRate':
      return validateMarketGrowthRate(value);
    case 'comparableSales':
      return validateComparableSales(value);
    case 'borrowerIncome':
      return validateBorrowerIncome(value);
    case 'borrowerCreditScore':
      return validateBorrowerCreditScore(value);
    case 'borrowerDebtToIncomeRatio':
      return validateBorrowerDebtToIncomeRatio(value);
    case 'borrowerEmploymentType':
      return validateBorrowerEmploymentType(value);
    case 'ltvThreshold':
      return validateLTVThreshold(value);
    case 'paymentHistory':
      return validatePaymentHistory(value, allInputs);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value);
    case 'inflationRate':
      return validateInflationRate(value);
    case 'propertyAppreciationRate':
      return validatePropertyAppreciationRate(value);
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

function validateOriginalLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Original loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Original loan amount cannot exceed $10 million' };
  }
  return { isValid: true };
}

function validateCurrentLoanBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Current loan balance must be greater than 0' };
  }
  if (allInputs?.originalLoanAmount && value > allInputs.originalLoanAmount) {
    return { isValid: false, error: 'Current loan balance cannot exceed original loan amount' };
  }
  if (allInputs?.originalLoanAmount && value > allInputs.originalLoanAmount * 1.1) {
    return { isValid: false, error: 'Current loan balance seems unusually high relative to original loan amount' };
  }
  return { isValid: true };
}

function validateInterestRate(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Interest rate must be 0 or greater' };
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

function validateOriginalPropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Original property value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Original property value cannot exceed $10 million' };
  }
  return { isValid: true };
}

function validateCurrentPropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Current property value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Current property value cannot exceed $10 million' };
  }
  if (allInputs?.originalPropertyValue) {
    if (value < allInputs.originalPropertyValue * 0.5) {
      return { isValid: false, error: 'Current property value seems unusually low relative to original property value' };
    }
    if (value > allInputs.originalPropertyValue * 3) {
      return { isValid: false, error: 'Current property value seems unusually high relative to original property value' };
    }
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

function validatePropertySize(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property size must be greater than 0' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Property size cannot exceed 100,000 sq ft' };
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

function validatePMIRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'PMI rate must be 0 or greater' };
  }
  if (value > 5) {
    return { isValid: false, error: 'PMI rate cannot exceed 5%' };
  }
  if (allInputs?.loanType === 'conventional' && value > 1.5) {
    return { isValid: false, error: 'PMI rate seems unusually high for conventional loans' };
  }
  return { isValid: true };
}

function validatePMIMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'PMI monthly payment must be 0 or greater' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'PMI monthly payment cannot exceed $1,000' };
  }
  if (allInputs?.originalLoanAmount && allInputs?.pmiRate) {
    const expectedPMIPayment = (allInputs.originalLoanAmount * allInputs.pmiRate / 100) / 12;
    if (Math.abs(expectedPMIPayment - value) > expectedPMIPayment * 0.5) {
      return { isValid: false, error: 'PMI monthly payment seems inconsistent with PMI rate and loan amount' };
    }
  }
  return { isValid: true };
}

function validatePMIStartDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'PMI start date is required' };
  }
  if (allInputs?.loanStartDate && new Date(value) < new Date(allInputs.loanStartDate)) {
    return { isValid: false, error: 'PMI start date cannot be before loan start date' };
  }
  return { isValid: true };
}

function validatePMICancellationMethod(value: any): ValidationResult {
  const validMethods = ['automatic', 'request', 'refinance', 'appraisal'];
  if (!value || !validMethods.includes(value)) {
    return { isValid: false, error: 'Valid cancellation method is required' };
  }
  return { isValid: true };
}

function validateLoanStartDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Loan start date is required' };
  }
  if (allInputs?.pmiStartDate && new Date(value) > new Date(allInputs.pmiStartDate)) {
    return { isValid: false, error: 'Loan start date cannot be after PMI start date' };
  }
  return { isValid: true };
}

function validateOriginalDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Original down payment must be 0 or greater' };
  }
  if (allInputs?.originalPropertyValue && value > allInputs.originalPropertyValue) {
    return { isValid: false, error: 'Original down payment cannot exceed original property value' };
  }
  return { isValid: true };
}

function validateOriginalDownPaymentPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Original down payment percentage must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Original down payment percentage cannot exceed 100%' };
  }
  if (allInputs?.originalDownPayment && allInputs?.originalPropertyValue) {
    const calculatedPercentage = (allInputs.originalDownPayment / allInputs.originalPropertyValue) * 100;
    if (Math.abs(calculatedPercentage - value) > 5) {
      return { isValid: false, error: 'Down payment percentage does not match down payment amount' };
    }
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
  if (allInputs?.monthsSinceLoanStart && Math.abs(value - allInputs.monthsSinceLoanStart) > 2) {
    return { isValid: false, error: 'Payments made should closely match months since loan start' };
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

function validateAppraisalValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Appraisal value must be 0 or greater' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Appraisal value cannot exceed $10 million' };
  }
  return { isValid: true };
}

function validateAppraisalCost(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Appraisal cost must be 0 or greater' };
  }
  if (value > 2000) {
    return { isValid: false, error: 'Appraisal cost cannot exceed $2,000' };
  }
  return { isValid: true };
}

function validateAppraisalRequired(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Appraisal required must be true or false' };
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

function validateComparableSales(value: any): ValidationResult {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return { isValid: false, error: 'At least one comparable sale is required' };
  }
  for (let i = 0; i < value.length; i++) {
    const sale = value[i];
    if (!sale.address || sale.address.trim().length === 0) {
      return { isValid: false, error: `Sale ${i + 1} address is required` };
    }
    if (!sale.salePrice || sale.salePrice <= 0) {
      return { isValid: false, error: `Sale ${i + 1} price must be greater than 0` };
    }
    if (!sale.saleDate) {
      return { isValid: false, error: `Sale ${i + 1} date is required` };
    }
    if (!sale.condition || sale.condition.trim().length === 0) {
      return { isValid: false, error: `Sale ${i + 1} condition is required` };
    }
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

function validateBorrowerCreditScore(value: any): ValidationResult {
  if (!value || value < 300) {
    return { isValid: false, error: 'Credit score must be 300 or greater' };
  }
  if (value > 850) {
    return { isValid: false, error: 'Credit score cannot exceed 850' };
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
  return { isValid: true };
}

function validateBorrowerEmploymentType(value: any): ValidationResult {
  const validTypes = ['employed', 'self_employed', 'retired', 'business_owner'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Valid employment type is required' };
  }
  return { isValid: true };
}

function validateLTVThreshold(value: any): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'LTV threshold must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'LTV threshold cannot exceed 100%' };
  }
  return { isValid: true };
}

function validatePaymentHistory(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return { isValid: false, error: 'Payment history is required' };
  }
  for (let i = 0; i < value.length; i++) {
    const payment = value[i];
    if (!payment.paymentNumber || payment.paymentNumber <= 0) {
      return { isValid: false, error: `Payment ${i + 1} number must be greater than 0` };
    }
    if (!payment.paymentDate) {
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
      return { isValid: false, error: `Payment ${i + 1} on-time status must be true or false` };
    }
  }
  return { isValid: true };
}

function validateAnalysisPeriod(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0' };
  }
  if (value > 120) {
    return { isValid: false, error: 'Analysis period cannot exceed 120 months' };
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

function validatePropertyAppreciationRate(value: any): ValidationResult {
  if (!value || value < -50) {
    return { isValid: false, error: 'Property appreciation rate must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Property appreciation rate cannot exceed 100%' };
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