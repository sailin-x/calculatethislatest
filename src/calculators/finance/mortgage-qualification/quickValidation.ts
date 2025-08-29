import { MortgageQualificationInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof MortgageQualificationInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'borrowerIncome':
      return validateBorrowerIncome(value, allInputs);
    case 'coBorrowerIncome':
      return validateCoBorrowerIncome(value, allInputs);
    case 'borrowerCreditScore':
      return validateBorrowerCreditScore(value, allInputs);
    case 'coBorrowerCreditScore':
      return validateCoBorrowerCreditScore(value, allInputs);
    case 'borrowerEmploymentType':
      return validateBorrowerEmploymentType(value);
    case 'coBorrowerEmploymentType':
      return validateCoBorrowerEmploymentType(value);
    case 'borrowerEmploymentLength':
      return validateBorrowerEmploymentLength(value);
    case 'coBorrowerEmploymentLength':
      return validateCoBorrowerEmploymentLength(value);
    case 'baseSalary':
      return validateBaseSalary(value, allInputs);
    case 'overtimeIncome':
      return validateOvertimeIncome(value);
    case 'bonusIncome':
      return validateBonusIncome(value);
    case 'commissionIncome':
      return validateCommissionIncome(value);
    case 'rentalIncome':
      return validateRentalIncome(value);
    case 'investmentIncome':
      return validateInvestmentIncome(value);
    case 'otherIncome':
      return validateOtherIncome(value);
    case 'borrowerAssets':
      return validateBorrowerAssets(value);
    case 'coBorrowerAssets':
      return validateCoBorrowerAssets(value);
    case 'borrowerLiquidity':
      return validateBorrowerLiquidity(value, allInputs);
    case 'coBorrowerLiquidity':
      return validateCoBorrowerLiquidity(value, allInputs);
    case 'borrowerDebts':
      return validateBorrowerDebts(value, allInputs);
    case 'coBorrowerDebts':
      return validateCoBorrowerDebts(value, allInputs);
    case 'propertyValue':
      return validatePropertyValue(value, allInputs);
    case 'propertyAddress':
      return validatePropertyAddress(value);
    case 'propertyType':
      return validatePropertyType(value);
    case 'propertySize':
      return validatePropertySize(value);
    case 'propertyAge':
      return validatePropertyAge(value);
    case 'loanAmount':
      return validateLoanAmount(value, allInputs);
    case 'interestRate':
      return validateInterestRate(value);
    case 'loanTerm':
      return validateLoanTerm(value);
    case 'loanType':
      return validateLoanType(value, allInputs);
    case 'paymentType':
      return validatePaymentType(value);
    case 'downPayment':
      return validateDownPayment(value, allInputs);
    case 'downPaymentPercentage':
      return validateDownPaymentPercentage(value, allInputs);
    case 'downPaymentSource':
      return validateDownPaymentSource(value);
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
    case 'creditCardDebt':
      return validateCreditCardDebt(value);
    case 'autoLoanDebt':
      return validateAutoLoanDebt(value);
    case 'studentLoanDebt':
      return validateStudentLoanDebt(value);
    case 'personalLoanDebt':
      return validatePersonalLoanDebt(value);
    case 'otherDebt':
      return validateOtherDebt(value);
    case 'maxDebtToIncomeRatio':
      return validateMaxDebtToIncomeRatio(value);
    case 'maxHousingExpenseRatio':
      return validateMaxHousingExpenseRatio(value);
    case 'minCreditScore':
      return validateMinCreditScore(value);
    case 'minDownPayment':
      return validateMinDownPayment(value);
    case 'maxLoanAmount':
      return validateMaxLoanAmount(value);
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
    default:
      return { isValid: true };
  }
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

function validateCoBorrowerIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Co-borrower income cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Co-borrower income cannot exceed $10,000,000' };
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
  
  // Check loan type requirements
  if (allInputs?.loanType === 'jumbo' && value < 700) {
    return { isValid: false, error: 'Jumbo loans typically require credit scores of 700 or higher' };
  }
  if (allInputs?.loanType === 'fha' && value < 580) {
    return { isValid: false, error: 'FHA loans typically require credit scores of 580 or higher' };
  }
  
  return { isValid: true };
}

function validateCoBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Co-borrower credit score cannot be negative' };
  }
  if (value > 850) {
    return { isValid: false, error: 'Co-borrower credit score cannot exceed 850' };
  }
  return { isValid: true };
}

function validateBorrowerEmploymentType(value: any): ValidationResult {
  const validTypes = ['employed', 'self_employed', 'retired', 'business_owner', 'unemployed'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid borrower employment type' };
  }
  return { isValid: true };
}

function validateCoBorrowerEmploymentType(value: any): ValidationResult {
  const validTypes = ['employed', 'self_employed', 'retired', 'business_owner', 'unemployed'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid co-borrower employment type' };
  }
  return { isValid: true };
}

function validateBorrowerEmploymentLength(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Borrower employment length cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Borrower employment length cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateCoBorrowerEmploymentLength(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Co-borrower employment length cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Co-borrower employment length cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateBaseSalary(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Base salary cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Base salary cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

function validateOvertimeIncome(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Overtime income cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Overtime income cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateBonusIncome(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Bonus income cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Bonus income cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateCommissionIncome(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Commission income cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Commission income cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateRentalIncome(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Rental income cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Rental income cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateInvestmentIncome(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Investment income cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Investment income cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateOtherIncome(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other income cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Other income cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateBorrowerAssets(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Borrower assets cannot be negative' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Borrower assets cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

function validateCoBorrowerAssets(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Co-borrower assets cannot be negative' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Co-borrower assets cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

function validateBorrowerLiquidity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Borrower liquidity cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Borrower liquidity cannot exceed $10,000,000' };
  }
  
  // Check if liquidity exceeds total assets
  if (allInputs?.borrowerAssets && value > allInputs.borrowerAssets) {
    return { isValid: false, error: 'Liquidity cannot exceed total assets' };
  }
  
  return { isValid: true };
}

function validateCoBorrowerLiquidity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Co-borrower liquidity cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Co-borrower liquidity cannot exceed $10,000,000' };
  }
  
  // Check if liquidity exceeds total assets
  if (allInputs?.coBorrowerAssets && value > allInputs.coBorrowerAssets) {
    return { isValid: false, error: 'Liquidity cannot exceed total assets' };
  }
  
  return { isValid: true };
}

function validateBorrowerDebts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Borrower debts cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Borrower debts cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

function validateCoBorrowerDebts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Co-borrower debts cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Co-borrower debts cannot exceed $10,000,000' };
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
  
  // Check if loan amount exceeds property value
  if (allInputs?.loanAmount && allInputs.loanAmount > value) {
    return { isValid: false, error: 'Loan amount cannot exceed property value' };
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

function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Loan amount cannot exceed $10,000,000' };
  }
  
  // Check if loan amount exceeds property value
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, error: 'Loan amount cannot exceed property value' };
  }
  
  // Check LTV ratio
  if (allInputs?.propertyValue) {
    const ltvRatio = (value / allInputs.propertyValue) * 100;
    if (ltvRatio > 100) {
      return { isValid: false, error: 'Loan-to-Value ratio cannot exceed 100%' };
    }
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

function validateLoanType(value: any, allInputs?: Record<string, any>): ValidationResult {
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

function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Down payment cannot be negative' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, error: 'Down payment cannot exceed property value' };
  }
  
  // Check consistency with down payment percentage
  if (allInputs?.propertyValue && allInputs?.downPaymentPercentage) {
    const calculatedDownPayment = allInputs.propertyValue * (allInputs.downPaymentPercentage / 100);
    if (Math.abs(value - calculatedDownPayment) > 1000) {
      return { isValid: false, error: 'Down payment should be consistent with down payment percentage' };
    }
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
  
  // Check consistency with down payment amount
  if (allInputs?.propertyValue && allInputs?.downPayment) {
    const calculatedDownPayment = allInputs.propertyValue * (value / 100);
    if (Math.abs(allInputs.downPayment - calculatedDownPayment) > 1000) {
      return { isValid: false, error: 'Down payment percentage should be consistent with down payment amount' };
    }
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

function validateCreditCardDebt(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Credit card debt cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Credit card debt cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateAutoLoanDebt(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Auto loan debt cannot be negative' };
  }
  if (value > 200000) {
    return { isValid: false, error: 'Auto loan debt cannot exceed $200,000' };
  }
  return { isValid: true };
}

function validateStudentLoanDebt(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Student loan debt cannot be negative' };
  }
  if (value > 500000) {
    return { isValid: false, error: 'Student loan debt cannot exceed $500,000' };
  }
  return { isValid: true };
}

function validatePersonalLoanDebt(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Personal loan debt cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Personal loan debt cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateOtherDebt(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other debt cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Other debt cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateMaxDebtToIncomeRatio(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Maximum debt-to-income ratio must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Maximum debt-to-income ratio cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateMaxHousingExpenseRatio(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Maximum housing expense ratio must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Maximum housing expense ratio cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateMinCreditScore(value: any): ValidationResult {
  if (value < 300) {
    return { isValid: false, error: 'Minimum credit score must be at least 300' };
  }
  if (value > 850) {
    return { isValid: false, error: 'Minimum credit score cannot exceed 850' };
  }
  return { isValid: true };
}

function validateMinDownPayment(value: any): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Minimum down payment cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Minimum down payment cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateMaxLoanAmount(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Maximum loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Maximum loan amount cannot exceed $10,000,000' };
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