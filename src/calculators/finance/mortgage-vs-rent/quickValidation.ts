import { MortgageVsRentInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof MortgageVsRentInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'propertyValue':
      return validatePropertyValue(value, allInputs);
    case 'propertyAddress':
      return validatePropertyAddress(value, allInputs);
    case 'propertyType':
      return validatePropertyType(value, allInputs);
    case 'propertySize':
      return validatePropertySize(value, allInputs);
    case 'propertyAge':
      return validatePropertyAge(value, allInputs);
    case 'loanAmount':
      return validateLoanAmount(value, allInputs);
    case 'interestRate':
      return validateInterestRate(value, allInputs);
    case 'loanTerm':
      return validateLoanTerm(value, allInputs);
    case 'loanType':
      return validateLoanType(value, allInputs);
    case 'paymentType':
      return validatePaymentType(value, allInputs);
    case 'downPayment':
      return validateDownPayment(value, allInputs);
    case 'downPaymentPercentage':
      return validateDownPaymentPercentage(value, allInputs);
    case 'downPaymentSource':
      return validateDownPaymentSource(value, allInputs);
    case 'monthlyRent':
      return validateMonthlyRent(value, allInputs);
    case 'annualRent':
      return validateAnnualRent(value, allInputs);
    case 'rentIncreaseRate':
      return validateRentIncreaseRate(value, allInputs);
    case 'rentEscalationClause':
      return validateRentEscalationClause(value, allInputs);
    case 'rentEscalationRate':
      return validateRentEscalationRate(value, allInputs);
    case 'propertyInsurance':
      return validatePropertyInsurance(value, allInputs);
    case 'propertyTaxes':
      return validatePropertyTaxes(value, allInputs);
    case 'hoaFees':
      return validateHoaFees(value, allInputs);
    case 'floodInsurance':
      return validateFloodInsurance(value, allInputs);
    case 'mortgageInsurance':
      return validateMortgageInsurance(value, allInputs);
    case 'rentersInsurance':
      return validateRentersInsurance(value, allInputs);
    case 'maintenanceCosts':
      return validateMaintenanceCosts(value, allInputs);
    case 'utilityCosts':
      return validateUtilityCosts(value, allInputs);
    case 'rentIncludesUtilities':
      return validateRentIncludesUtilities(value, allInputs);
    case 'utilitiesIncluded':
      return validateUtilitiesIncluded(value, allInputs);
    case 'closingCosts':
      return validateClosingCosts(value, allInputs);
    case 'originationFee':
      return validateOriginationFee(value, allInputs);
    case 'appraisalFee':
      return validateAppraisalFee(value, allInputs);
    case 'titleInsuranceFee':
      return validateTitleInsuranceFee(value, allInputs);
    case 'recordingFee':
      return validateRecordingFee(value, allInputs);
    case 'attorneyFee':
      return validateAttorneyFee(value, allInputs);
    case 'otherFees':
      return validateOtherFees(value, allInputs);
    case 'marketLocation':
      return validateMarketLocation(value, allInputs);
    case 'marketCondition':
      return validateMarketCondition(value, allInputs);
    case 'marketGrowthRate':
      return validateMarketGrowthRate(value, allInputs);
    case 'propertyAppreciationRate':
      return validatePropertyAppreciationRate(value, allInputs);
    case 'rentGrowthRate':
      return validateRentGrowthRate(value, allInputs);
    case 'borrowerIncome':
      return validateBorrowerIncome(value, allInputs);
    case 'borrowerCreditScore':
      return validateBorrowerCreditScore(value, allInputs);
    case 'borrowerDebtToIncomeRatio':
      return validateBorrowerDebtToIncomeRatio(value, allInputs);
    case 'borrowerEmploymentType':
      return validateBorrowerEmploymentType(value, allInputs);
    case 'borrowerTaxRate':
      return validateBorrowerTaxRate(value, allInputs);
    case 'investmentReturnRate':
      return validateInvestmentReturnRate(value, allInputs);
    case 'inflationRate':
      return validateInflationRate(value, allInputs);
    case 'discountRate':
      return validateDiscountRate(value, allInputs);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value, allInputs);
    case 'expectedStayDuration':
      return validateExpectedStayDuration(value, allInputs);
    case 'flexibilityNeeded':
      return validateFlexibilityNeeded(value, allInputs);
    case 'maintenancePreference':
      return validateMaintenancePreference(value, allInputs);
    case 'locationStability':
      return validateLocationStability(value, allInputs);
    case 'currency':
      return validateCurrency(value, allInputs);
    case 'displayFormat':
      return validateDisplayFormat(value, allInputs);
    case 'includeCharts':
      return validateIncludeCharts(value, allInputs);
    default:
      return { isValid: true };
  }
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

function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'Property address must be a non-empty string' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'apartment'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid property type' };
  }
  return { isValid: true };
}

function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property size cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Property size cannot exceed 100,000 sq ft' };
  }
  return { isValid: true };
}

function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property age cannot be negative' };
  }
  if (value > 200) {
    return { isValid: false, error: 'Property age cannot exceed 200 years' };
  }
  return { isValid: true };
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
  if (allInputs?.downPayment && allInputs?.propertyValue && value + allInputs.downPayment > allInputs.propertyValue) {
    return { isValid: false, error: 'Loan amount plus down payment cannot exceed property value' };
  }
  return { isValid: true };
}

function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Interest rate must be greater than 0' };
  }
  if (value > 25) {
    return { isValid: false, error: 'Interest rate cannot exceed 25%' };
  }
  return { isValid: true };
}

function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Loan term must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateLoanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid loan type' };
  }
  return { isValid: true };
}

function validatePaymentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid payment type' };
  }
  return { isValid: true };
}

function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Down payment cannot be negative' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, error: 'Down payment cannot exceed property value' };
  }
  if (allInputs?.loanAmount && allInputs?.propertyValue && value + allInputs.loanAmount > allInputs.propertyValue) {
    return { isValid: false, error: 'Down payment plus loan amount cannot exceed property value' };
  }
  return { isValid: true };
}

function validateDownPaymentPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Down payment percentage cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Down payment percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateDownPaymentSource(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validSources = ['savings', 'investment_sale', 'gift', 'inheritance', 'other'];
  if (!validSources.includes(value)) {
    return { isValid: false, error: 'Invalid down payment source' };
  }
  return { isValid: true };
}

function validateMonthlyRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Monthly rent must be greater than 0' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Monthly rent cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateAnnualRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Annual rent must be greater than 0' };
  }
  if (value > 600000) {
    return { isValid: false, error: 'Annual rent cannot exceed $600,000' };
  }
  if (allInputs?.monthlyRent && Math.abs(value - allInputs.monthlyRent * 12) > 1) {
    return { isValid: false, error: 'Annual rent should equal monthly rent times 12' };
  }
  return { isValid: true };
}

function validateRentIncreaseRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Rent increase rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Rent increase rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateRentEscalationClause(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Rent escalation clause must be a boolean' };
  }
  return { isValid: true };
}

function validateRentEscalationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Rent escalation rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Rent escalation rate cannot exceed 50%' };
  }
  if (allInputs?.rentEscalationClause && value === 0) {
    return { isValid: false, error: 'Rent escalation rate must be specified when escalation clause is enabled' };
  }
  return { isValid: true };
}

function validatePropertyInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property insurance cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Property insurance cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property taxes cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Property taxes cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateHoaFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'HOA fees cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'HOA fees cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateFloodInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Flood insurance cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Flood insurance cannot exceed $10,000' };
  }
  return { isValid: true };
}

function validateMortgageInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Mortgage insurance cannot be negative' };
  }
  if (value > 20000) {
    return { isValid: false, error: 'Mortgage insurance cannot exceed $20,000' };
  }
  return { isValid: true };
}

function validateRentersInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Renters insurance cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, error: 'Renters insurance cannot exceed $5,000' };
  }
  return { isValid: true };
}

function validateMaintenanceCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Maintenance costs cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Maintenance costs cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateUtilityCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Utility costs cannot be negative' };
  }
  if (value > 20000) {
    return { isValid: false, error: 'Utility costs cannot exceed $20,000' };
  }
  if (allInputs?.rentIncludesUtilities && value > 0) {
    return { isValid: false, error: 'Utility costs should be 0 when rent includes utilities' };
  }
  return { isValid: true };
}

function validateRentIncludesUtilities(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Rent includes utilities must be a boolean' };
  }
  return { isValid: true };
}

function validateUtilitiesIncluded(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Utilities included must be an array' };
  }
  return { isValid: true };
}

function validateClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Closing costs cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Closing costs cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateOriginationFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Origination fee cannot be negative' };
  }
  if (value > 20000) {
    return { isValid: false, error: 'Origination fee cannot exceed $20,000' };
  }
  return { isValid: true };
}

function validateAppraisalFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Appraisal fee cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, error: 'Appraisal fee cannot exceed $5,000' };
  }
  return { isValid: true };
}

function validateTitleInsuranceFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Title insurance fee cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Title insurance fee cannot exceed $10,000' };
  }
  return { isValid: true };
}

function validateRecordingFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Recording fee cannot be negative' };
  }
  if (value > 2000) {
    return { isValid: false, error: 'Recording fee cannot exceed $2,000' };
  }
  return { isValid: true };
}

function validateAttorneyFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Attorney fee cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: false, error: 'Attorney fee cannot exceed $5,000' };
  }
  return { isValid: true };
}

function validateOtherFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other fees cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Other fees cannot exceed $10,000' };
  }
  return { isValid: true };
}

function validateMarketLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'Market location must be a non-empty string' };
  }
  return { isValid: true };
}

function validateMarketCondition(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validConditions = ['declining', 'stable', 'growing', 'hot'];
  if (!validConditions.includes(value)) {
    return { isValid: false, error: 'Invalid market condition' };
  }
  return { isValid: true };
}

function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Market growth rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Market growth rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Property appreciation rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Property appreciation rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateRentGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Rent growth rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Rent growth rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateBorrowerIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Borrower income must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Borrower income cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 300) {
    return { isValid: false, error: 'Borrower credit score must be at least 300' };
  }
  if (value > 850) {
    return { isValid: false, error: 'Borrower credit score cannot exceed 850' };
  }
  return { isValid: true };
}

function validateBorrowerDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Debt-to-income ratio cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Debt-to-income ratio cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateBorrowerEmploymentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['employed', 'self_employed', 'retired', 'business_owner'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid employment type' };
  }
  return { isValid: true };
}

function validateBorrowerTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateInvestmentReturnRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Investment return rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Investment return rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -10) {
    return { isValid: false, error: 'Inflation rate cannot be less than -10%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Inflation rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Discount rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Discount rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Analysis period cannot exceed 50 years' };
  }
  if (allInputs?.expectedStayDuration && value < allInputs.expectedStayDuration) {
    return { isValid: false, error: 'Analysis period should be at least as long as expected stay duration' };
  }
  return { isValid: true };
}

function validateExpectedStayDuration(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Expected stay duration must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Expected stay duration cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateFlexibilityNeeded(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Flexibility needed must be a boolean' };
  }
  return { isValid: true };
}

function validateMaintenancePreference(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validPreferences = ['low', 'medium', 'high'];
  if (!validPreferences.includes(value)) {
    return { isValid: false, error: 'Invalid maintenance preference' };
  }
  return { isValid: true };
}

function validateLocationStability(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validStabilities = ['stable', 'moderate', 'unstable'];
  if (!validStabilities.includes(value)) {
    return { isValid: false, error: 'Invalid location stability' };
  }
  return { isValid: true };
}

function validateCurrency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return { isValid: false, error: 'Invalid currency' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validFormats = ['percentage', 'decimal', 'currency'];
  if (!validFormats.includes(value)) {
    return { isValid: false, error: 'Invalid display format' };
  }
  return { isValid: true };
}

function validateIncludeCharts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include charts must be a boolean' };
  }
  return { isValid: true };
}