import { MortgagePaymentInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof MortgagePaymentInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
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
    case 'downPayment':
      return validateDownPayment(value, allInputs);
    case 'downPaymentPercentage':
      return validateDownPaymentPercentage(value);
    case 'propertyInsurance':
      return validatePropertyInsurance(value);
    case 'propertyTaxes':
      return validatePropertyTaxes(value);
    case 'hoaFees':
      return validateHOAFees(value);
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
    case 'paymentFrequency':
      return validatePaymentFrequency(value);
    case 'firstPaymentDate':
      return validateFirstPaymentDate(value);
    case 'paymentDay':
      return validatePaymentDay(value);
    case 'discountPoints':
      return validateDiscountPoints(value);
    case 'originationPoints':
      return validateOriginationPoints(value);
    case 'lenderCredits':
      return validateLenderCredits(value, allInputs);
    case 'sellerCredits':
      return validateSellerCredits(value, allInputs);
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
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    case 'includeCharts':
      return validateIncludeCharts(value);
    // ARM-specific fields
    case 'armType':
      return validateARMType(value);
    case 'initialFixedPeriod':
      return validateInitialFixedPeriod(value);
    case 'adjustmentPeriod':
      return validateAdjustmentPeriod(value);
    case 'margin':
      return validateMargin(value);
    case 'indexRate':
      return validateIndexRate(value);
    case 'lifetimeCap':
      return validateLifetimeCap(value, allInputs);
    case 'periodicCap':
      return validatePeriodicCap(value, allInputs);
    case 'floorRate':
      return validateFloorRate(value, allInputs);
    // Property-specific fields
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

function validateInterestRate(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Interest rate must be greater than 0' };
  }
  if (value > 25) {
    return { isValid: false, error: 'Interest rate cannot exceed 25%' };
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

function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
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

function validateHOAFees(value: any): ValidationResult {
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

function validatePaymentFrequency(value: any): ValidationResult {
  const validFrequencies = ['monthly', 'biweekly', 'weekly', 'quarterly', 'annually'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, error: 'Invalid payment frequency' };
  }
  return { isValid: true };
}

function validateFirstPaymentDate(value: any): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'First payment date is required' };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }
  return { isValid: true };
}

function validatePaymentDay(value: any): ValidationResult {
  if (value < 1) {
    return { isValid: false, error: 'Payment day must be at least 1' };
  }
  if (value > 31) {
    return { isValid: false, error: 'Payment day cannot exceed 31' };
  }
  return { isValid: true };
}

function validateDiscountPoints(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Discount points cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Discount points cannot exceed 10' };
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

function validateLenderCredits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Lender credits cannot be negative' };
  }
  if (allInputs?.loanAmount && value > allInputs.loanAmount * 0.1) {
    return { isValid: false, error: 'Lender credits cannot exceed 10% of loan amount' };
  }
  return { isValid: true };
}

function validateSellerCredits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Seller credits cannot be negative' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue * 0.1) {
    return { isValid: false, error: 'Seller credits cannot exceed 10% of property value' };
  }
  return { isValid: true };
}

function validateMarketLocation(value: any): ValidationResult {
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Market location must be a string' };
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
  if (value <= 0) {
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

// ARM-specific validation functions
function validateARMType(value: any): ValidationResult {
  const validTypes = ['3_1', '5_1', '7_1', '10_1', 'custom'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid ARM type' };
  }
  return { isValid: true };
}

function validateInitialFixedPeriod(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Initial fixed period must be greater than 0' };
  }
  if (value > 30) {
    return { isValid: false, error: 'Initial fixed period cannot exceed 30 years' };
  }
  return { isValid: true };
}

function validateAdjustmentPeriod(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Adjustment period must be greater than 0' };
  }
  if (value > 12) {
    return { isValid: false, error: 'Adjustment period cannot exceed 12 months' };
  }
  return { isValid: true };
}

function validateMargin(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Margin cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Margin cannot exceed 10%' };
  }
  return { isValid: true };
}

function validateIndexRate(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Index rate cannot be negative' };
  }
  if (value > 25) {
    return { isValid: false, error: 'Index rate cannot exceed 25%' };
  }
  return { isValid: true };
}

function validateLifetimeCap(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Lifetime cap cannot be negative' };
  }
  if (value > 15) {
    return { isValid: false, error: 'Lifetime cap cannot exceed 15%' };
  }
  if (allInputs?.interestRate && value < allInputs.interestRate) {
    return { isValid: false, error: 'Lifetime cap should be higher than initial interest rate' };
  }
  return { isValid: true };
}

function validatePeriodicCap(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Periodic cap cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Periodic cap cannot exceed 10%' };
  }
  if (allInputs?.lifetimeCap && value >= allInputs.lifetimeCap) {
    return { isValid: false, error: 'Periodic cap should be less than lifetime cap' };
  }
  return { isValid: true };
}

function validateFloorRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Floor rate cannot be negative' };
  }
  if (value > 15) {
    return { isValid: false, error: 'Floor rate cannot exceed 15%' };
  }
  if (allInputs?.interestRate && value >= allInputs.interestRate) {
    return { isValid: false, error: 'Floor rate should be less than initial interest rate' };
  }
  return { isValid: true };
}

// Property-specific validation functions
function validatePropertyAddress(value: any): ValidationResult {
  if (typeof value !== 'string') {
    return { isValid: false, error: 'Property address must be a string' };
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