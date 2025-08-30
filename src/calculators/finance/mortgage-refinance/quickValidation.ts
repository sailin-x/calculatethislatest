import { MortgageRefinanceInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof MortgageRefinanceInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'currentLoanAmount':
      return validateCurrentLoanAmount(value, allInputs);
    case 'currentInterestRate':
      return validateCurrentInterestRate(value, allInputs);
    case 'currentLoanTerm':
      return validateCurrentLoanTerm(value, allInputs);
    case 'currentLoanType':
      return validateCurrentLoanType(value, allInputs);
    case 'currentPaymentType':
      return validateCurrentPaymentType(value, allInputs);
    case 'currentMonthlyPayment':
      return validateCurrentMonthlyPayment(value, allInputs);
    case 'currentRemainingTerm':
      return validateCurrentRemainingTerm(value, allInputs);
    case 'currentPrincipalBalance':
      return validateCurrentPrincipalBalance(value, allInputs);
    case 'newLoanAmount':
      return validateNewLoanAmount(value, allInputs);
    case 'newInterestRate':
      return validateNewInterestRate(value, allInputs);
    case 'newLoanTerm':
      return validateNewLoanTerm(value, allInputs);
    case 'newLoanType':
      return validateNewLoanType(value, allInputs);
    case 'newPaymentType':
      return validateNewPaymentType(value, allInputs);
    case 'refinanceType':
      return validateRefinanceType(value, allInputs);
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
    case 'creditReportFee':
      return validateCreditReportFee(value, allInputs);
    case 'floodCertificationFee':
      return validateFloodCertificationFee(value, allInputs);
    case 'taxServiceFee':
      return validateTaxServiceFee(value, allInputs);
    case 'otherFees':
      return validateOtherFees(value, allInputs);
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
    case 'marketLocation':
      return validateMarketLocation(value, allInputs);
    case 'marketCondition':
      return validateMarketCondition(value, allInputs);
    case 'marketGrowthRate':
      return validateMarketGrowthRate(value, allInputs);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value, allInputs);
    case 'inflationRate':
      return validateInflationRate(value, allInputs);
    case 'propertyAppreciationRate':
      return validatePropertyAppreciationRate(value, allInputs);
    case 'discountRate':
      return validateDiscountRate(value, allInputs);
    case 'taxDeductionPeriod':
      return validateTaxDeductionPeriod(value, allInputs);
    case 'refinanceGoal':
      return validateRefinanceGoal(value, allInputs);
    case 'targetMonthlySavings':
      return validateTargetMonthlySavings(value, allInputs);
    case 'targetRate':
      return validateTargetRate(value, allInputs);
    case 'cashOutAmount':
      return validateCashOutAmount(value, allInputs);
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

function validateCurrentLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Current loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Current loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

function validateCurrentInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Current interest rate must be greater than 0' };
  }
  if (value > 25) {
    return { isValid: false, error: 'Current interest rate cannot exceed 25%' };
  }
  return { isValid: true };
}

function validateCurrentLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Current loan term must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Current loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateCurrentLoanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid current loan type' };
  }
  return { isValid: true };
}

function validateCurrentPaymentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid current payment type' };
  }
  return { isValid: true };
}

function validateCurrentMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Current monthly payment must be greater than 0' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Current monthly payment cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateCurrentRemainingTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Current remaining term must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Current remaining term cannot exceed 50 years' };
  }
  if (allInputs?.currentLoanTerm && value > allInputs.currentLoanTerm) {
    return { isValid: false, error: 'Remaining term cannot exceed original loan term' };
  }
  return { isValid: true };
}

function validateCurrentPrincipalBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Current principal balance must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Current principal balance cannot exceed $10,000,000' };
  }
  if (allInputs?.currentLoanAmount && value > allInputs.currentLoanAmount) {
    return { isValid: false, error: 'Current principal balance cannot exceed current loan amount' };
  }
  return { isValid: true };
}

function validateNewLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'New loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'New loan amount cannot exceed $10,000,000' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, error: 'New loan amount cannot exceed property value' };
  }
  if (allInputs?.refinanceType === 'cash_out' && allInputs?.currentPrincipalBalance && value <= allInputs.currentPrincipalBalance) {
    return { isValid: false, error: 'Cash-out refinance requires new loan amount to exceed current principal balance' };
  }
  if (allInputs?.refinanceType === 'cash_in' && allInputs?.currentPrincipalBalance && value >= allInputs.currentPrincipalBalance) {
    return { isValid: false, error: 'Cash-in refinance requires new loan amount to be less than current principal balance' };
  }
  if (allInputs?.refinanceType === 'rate_term' && allInputs?.currentPrincipalBalance) {
    const difference = Math.abs(value - allInputs.currentPrincipalBalance);
    const threshold = allInputs.currentPrincipalBalance * 0.1;
    if (difference > threshold) {
      return { isValid: false, error: 'Rate and term refinance should have similar loan amounts' };
    }
  }
  return { isValid: true };
}

function validateNewInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'New interest rate must be greater than 0' };
  }
  if (value > 25) {
    return { isValid: false, error: 'New interest rate cannot exceed 25%' };
  }
  return { isValid: true };
}

function validateNewLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'New loan term must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'New loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateNewLoanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid new loan type' };
  }
  return { isValid: true };
}

function validateNewPaymentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid new payment type' };
  }
  return { isValid: true };
}

function validateRefinanceType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['rate_term', 'cash_out', 'cash_in', 'streamline', 'fha_to_conventional'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid refinance type' };
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

function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'Property address must be a non-empty string' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'];
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

function validateCreditReportFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Credit report fee cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'Credit report fee cannot exceed $1,000' };
  }
  return { isValid: true };
}

function validateFloodCertificationFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Flood certification fee cannot be negative' };
  }
  if (value > 500) {
    return { isValid: false, error: 'Flood certification fee cannot exceed $500' };
  }
  return { isValid: true };
}

function validateTaxServiceFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Tax service fee cannot be negative' };
  }
  if (value > 2000) {
    return { isValid: false, error: 'Tax service fee cannot exceed $2,000' };
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

function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Analysis period cannot exceed 50 years' };
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

function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Property appreciation rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Property appreciation rate cannot exceed 50%' };
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

function validateTaxDeductionPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Tax deduction period must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Tax deduction period cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateRefinanceGoal(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validGoals = ['lower_payment', 'lower_rate', 'cash_out', 'shorter_term', 'remove_pmi', 'consolidate_debt'];
  if (!validGoals.includes(value)) {
    return { isValid: false, error: 'Invalid refinance goal' };
  }
  return { isValid: true };
}

function validateTargetMonthlySavings(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Target monthly savings cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Target monthly savings cannot exceed $10,000' };
  }
  return { isValid: true };
}

function validateTargetRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Target rate must be greater than 0' };
  }
  if (value > 25) {
    return { isValid: false, error: 'Target rate cannot exceed 25%' };
  }
  return { isValid: true };
}

function validateCashOutAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Cash out amount cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Cash out amount cannot exceed $1,000,000' };
  }
  if (allInputs?.newLoanAmount && value > allInputs.newLoanAmount) {
    return { isValid: false, error: 'Cash out amount cannot exceed new loan amount' };
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