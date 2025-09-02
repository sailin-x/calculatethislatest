import { MortgagePointsInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof MortgagePointsInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'loanAmount':
      return validateLoanAmount(value, allInputs);
    case 'baseInterestRate':
      return validateBaseInterestRate(value);
    case 'loanTerm':
      return validateLoanTerm(value);
    case 'loanType':
      return validateLoanType(value);
    case 'paymentType':
      return validatePaymentType(value);
    case 'discountPoints':
      return validateDiscountPoints(value, allInputs);
    case 'originationPoints':
      return validateOriginationPoints(value);
    case 'pointCost':
      return validatePointCost(value, allInputs);
    case 'pointValue':
      return validatePointValue(value);
    case 'rateOptions':
      return validateRateOptions(value);
    case 'propertyValue':
      return validatePropertyValue(value);
    case 'downPayment':
      return validateDownPayment(value, allInputs);
    case 'downPaymentPercentage':
      return validateDownPaymentPercentage(value);
    case 'propertyInsurance':
      return validatePropertyInsurance(value);
    case 'propertyTaxes':
      return validatePropertyTaxes(value);
    case 'hoaFees':
      return validateHoaFees(value);
    case 'floodInsurance':
      return validateFloodInsurance(value);
    case 'mortgageInsurance':
      return validateMortgageInsurance(value);
    case 'mortgageInsuranceRate':
      return validateMortgageInsuranceRate(value);
    case 'borrowerIncome':
      return validateBorrowerIncome(value);
    case 'borrowerCreditScore':
      return validateBorrowerCreditScore(value);
    case 'borrowerDebtToIncomeRatio':
      return validateBorrowerDebtToIncomeRatio(value);
    case 'borrowerEmploymentType':
      return validateBorrowerEmploymentType(value);
    case 'borrowerTaxRate':
      return validateBorrowerTaxRate(value);
    case 'marketLocation':
      return validateMarketLocation(value);
    case 'marketCondition':
      return validateMarketCondition(value);
    case 'marketGrowthRate':
      return validateMarketGrowthRate(value);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value);
    case 'inflationRate':
      return validateInflationRate(value);
    case 'propertyAppreciationRate':
      return validatePropertyAppreciationRate(value);
    case 'discountRate':
      return validateDiscountRate(value);
    case 'taxDeductionPeriod':
      return validateTaxDeductionPeriod(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    case 'includeCharts':
      return validateIncludeCharts(value);
    case 'propertyAddress':
      return validatePropertyAddress(value);
    case 'propertyType':
      return validatePropertyType(value);
    case 'propertySize':
      return validatePropertySize(value);
    case 'propertyAge':
      return validatePropertyAge(value);
    case 'downPaymentSource':
      return validateDownPaymentSource(value);
    default:
      return { isValid: true };
  }
}

function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Loan amount cannot exceed $10,000,000' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, error: 'Loan amount cannot exceed property value' };
  }
  return { isValid: true };
}

function validateBaseInterestRate(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Base interest rate must be greater than 0' };
  }
  if (value > 25) {
    return { isValid: false, error: 'Base interest rate cannot exceed 25%' };
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
  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid loan type' };
  }
  return { isValid: true };
}

function validatePaymentType(value: any): ValidationResult {
  const validTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid payment type' };
  }
  return { isValid: true };
}

function validateDiscountPoints(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Discount points cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Discount points cannot exceed 10' };
  }
  if (allInputs?.baseInterestRate && allInputs?.pointValue) {
    const effectiveRate = allInputs.baseInterestRate - (value * allInputs.pointValue);
    if (effectiveRate < 0) {
      return { isValid: false, error: 'Points cannot reduce rate below 0%' };
    }
  }
  return { isValid: true };
}

function validateOriginationPoints(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Origination points cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Origination points cannot exceed 10' };
  }
  return { isValid: true };
}

function validatePointCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Point cost cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Point cost cannot exceed $10,000' };
  }
  if (allInputs?.loanAmount && allInputs?.discountPoints && allInputs?.originationPoints) {
    const totalPointCost = (allInputs.discountPoints + allInputs.originationPoints) * value;
    if (totalPointCost > allInputs.loanAmount * 0.05) {
      return { isValid: false, error: 'Total point cost should not exceed 5% of loan amount' };
    }
  }
  return { isValid: true };
}

function validatePointValue(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Point value cannot be negative' };
  }
  if (value > 1) {
    return { isValid: false, error: 'Point value cannot exceed 1%' };
  }
  return { isValid: true };
}

function validateRateOptions(value: any): ValidationResult {
  if (!Array.isArray(value) || value.length === 0) {
    return { isValid: false, error: 'At least one rate option must be provided' };
  }
  
  for (let i = 0; i < value.length; i++) {
    const option = value[i];
    if (option.points < 0) {
      return { isValid: false, error: `Rate option ${i + 1}: Points cannot be negative` };
    }
    if (option.rate <= 0) {
      return { isValid: false, error: `Rate option ${i + 1}: Rate must be greater than 0` };
    }
    if (option.payment <= 0) {
      return { isValid: false, error: `Rate option ${i + 1}: Payment must be greater than 0` };
    }
  }
  
  // Check if options are in descending order of points
  for (let i = 1; i < value.length; i++) {
    if (value[i].points <= value[i - 1].points) {
      return { isValid: false, error: 'Rate options should be in descending order of points' };
    }
  }
  
  return { isValid: true };
}

function validatePropertyValue(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property value must be greater than 0' };
  }
  if (value > 50000000) {
    return { isValid: false, error: 'Property value cannot exceed $50,000,000' };
  }
  return { isValid: true };
}

function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Down payment cannot be negative' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, error: 'Down payment cannot exceed property value' };
  }
  if (allInputs?.propertyValue && allInputs?.downPaymentPercentage) {
    const calculatedDownPayment = allInputs.propertyValue * (allInputs.downPaymentPercentage / 100);
    if (Math.abs(value - calculatedDownPayment) > 1000) {
      return { isValid: false, error: 'Down payment should be consistent with down payment percentage' };
    }
  }
  return { isValid: true };
}

function validateDownPaymentPercentage(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Down payment percentage cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Down payment percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

function validatePropertyInsurance(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property insurance cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Property insurance cannot exceed $50,000 annually' };
  }
  return { isValid: true };
}

function validatePropertyTaxes(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property taxes cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Property taxes cannot exceed $100,000 annually' };
  }
  return { isValid: true };
}

function validateHoaFees(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'HOA fees cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, error: 'HOA fees cannot exceed $5,000 monthly' };
  }
  return { isValid: true };
}

function validateFloodInsurance(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Flood insurance cannot be negative' };
  }
  if (value > 20000) {
    return { isValid: false, error: 'Flood insurance cannot exceed $20,000 annually' };
  }
  return { isValid: true };
}

function validateMortgageInsurance(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Mortgage insurance cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Mortgage insurance cannot exceed $10,000 annually' };
  }
  return { isValid: true };
}

function validateMortgageInsuranceRate(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Mortgage insurance rate cannot be negative' };
  }
  if (value > 5) {
    return { isValid: false, error: 'Mortgage insurance rate cannot exceed 5%' };
  }
  return { isValid: true };
}

function validateBorrowerIncome(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Borrower income must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Borrower income cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

function validateBorrowerCreditScore(value: any): ValidationResult {
  if (!value || value < 300) {
    return { isValid: false, error: 'Credit score must be at least 300' };
  }
  if (value > 850) {
    return { isValid: false, error: 'Credit score cannot exceed 850' };
  }
  return { isValid: true };
}

function validateBorrowerDebtToIncomeRatio(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Debt-to-income ratio cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Debt-to-income ratio cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateBorrowerEmploymentType(value: any): ValidationResult {
  const validTypes = ['employed', 'self_employed', 'retired', 'business_owner'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid employment type' };
  }
  return { isValid: true };
}

function validateBorrowerTaxRate(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateMarketLocation(value: any): ValidationResult {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'Market location must be a non-empty string' };
  }
  return { isValid: true };
}

function validateMarketCondition(value: any): ValidationResult {
  const validConditions = ['declining', 'stable', 'growing', 'hot'];
  if (!validConditions.includes(value)) {
    return { isValid: false, error: 'Invalid market condition' };
  }
  return { isValid: true };
}

function validateMarketGrowthRate(value: any): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Market growth rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Market growth rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateAnalysisPeriod(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Analysis period cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any): ValidationResult {
  if (value < -10) {
    return { isValid: false, error: 'Inflation rate cannot be less than -10%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Inflation rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validatePropertyAppreciationRate(value: any): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Property appreciation rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Property appreciation rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateDiscountRate(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Discount rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Discount rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateTaxDeductionPeriod(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Tax deduction period must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Tax deduction period cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateCurrency(value: any): ValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return { isValid: false, error: 'Invalid currency' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any): ValidationResult {
  const validFormats = ['percentage', 'decimal', 'currency'];
  if (!validFormats.includes(value)) {
    return { isValid: false, error: 'Invalid display format' };
  }
  return { isValid: true };
}

function validateIncludeCharts(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include charts must be a boolean' };
  }
  return { isValid: true };
}

function validatePropertyAddress(value: any): ValidationResult {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'Property address must be a non-empty string' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any): ValidationResult {
  const validTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid property type' };
  }
  return { isValid: true };
}

function validatePropertySize(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property size cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Property size cannot exceed 100,000 sq ft' };
  }
  return { isValid: true };
}

function validatePropertyAge(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property age cannot be negative' };
  }
  if (value > 200) {
    return { isValid: false, error: 'Property age cannot exceed 200 years' };
  }
  return { isValid: true };
}

function validateDownPaymentSource(value: any): ValidationResult {
  const validSources = ['savings', 'investment_sale', 'gift', 'inheritance', 'other'];
  if (!validSources.includes(value)) {
    return { isValid: false, error: 'Invalid down payment source' };
  }
  return { isValid: true };
}