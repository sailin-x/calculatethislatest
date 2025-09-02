import { CashFlowInputs } from './types';

export interface QuickValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(
  fieldName: keyof CashFlowInputs,
  value: any,
  allInputs: CashFlowInputs
): QuickValidationResult {
  switch (fieldName) {
    case 'propertyValue':
      return validatePropertyValue(value);
    case 'purchasePrice':
      return validatePurchasePrice(value, allInputs);
    case 'downPayment':
      return validateDownPayment(value, allInputs);
    case 'loanAmount':
      return validateLoanAmount(value, allInputs);
    case 'interestRate':
      return validateInterestRate(value);
    case 'loanTerm':
      return validateLoanTerm(value);
    case 'propertyType':
      return validatePropertyType(value);
    case 'propertyAge':
      return validatePropertyAge(value);
    case 'squareFootage':
      return validateSquareFootage(value);
    case 'bedrooms':
      return validateBedrooms(value);
    case 'bathrooms':
      return validateBathrooms(value);
    case 'monthlyRent':
      return validateMonthlyRent(value, allInputs);
    case 'otherIncome':
      return validateOtherIncome(value);
    case 'rentGrowthRate':
      return validateRentGrowthRate(value);
    case 'vacancyRate':
      return validateVacancyRate(value, allInputs);
    case 'propertyTaxes':
      return validatePropertyTaxes(value);
    case 'insurance':
      return validateInsurance(value);
    case 'maintenance':
      return validateMaintenance(value);
    case 'propertyManagement':
      return validatePropertyManagement(value);
    case 'utilities':
      return validateUtilities(value);
    case 'hoaFees':
      return validateHoaFees(value);
    case 'landscaping':
      return validateLandscaping(value);
    case 'pestControl':
      return validatePestControl(value);
    case 'advertising':
      return validateAdvertising(value);
    case 'legalFees':
      return validateLegalFees(value);
    case 'accountingFees':
      return validateAccountingFees(value);
    case 'otherExpenses':
      return validateOtherExpenses(value);
    case 'closingCosts':
      return validateClosingCosts(value);
    case 'points':
      return validatePoints(value);
    case 'escrowAccount':
      return validateEscrowAccount(value);
    case 'prepaidItems':
      return validatePrepaidItems(value);
    case 'marketRent':
      return validateMarketRent(value, allInputs);
    case 'marketVacancy':
      return validateMarketVacancy(value);
    case 'marketExpenses':
      return validateMarketExpenses(value);
    case 'marketCapRate':
      return validateMarketCapRate(value);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value);
    case 'inflationRate':
      return validateInflationRate(value);
    case 'appreciationRate':
      return validateAppreciationRate(value);
    case 'taxRate':
      return validateTaxRate(value);
    case 'depreciationPeriod':
      return validateDepreciationPeriod(value);
    case 'personalUsePercentage':
      return validatePersonalUsePercentage(value);
    case 'leaseTerm':
      return validateLeaseTerm(value);
    case 'rentEscalation':
      return validateRentEscalation(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    default:
      return { isValid: true };
  }
}

function validatePropertyValue(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Property value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: true, warning: 'Property value seems unusually high' };
  }
  return { isValid: true };
}

function validatePurchasePrice(value: number, inputs: CashFlowInputs): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Purchase price must be greater than 0' };
  }
  if (inputs.downPayment + inputs.loanAmount !== value) {
    return { isValid: false, error: 'Purchase price must equal down payment plus loan amount' };
  }
  return { isValid: true };
}

function validateDownPayment(value: number, inputs: CashFlowInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Down payment cannot be negative' };
  }
  if (value + inputs.loanAmount !== inputs.purchasePrice) {
    return { isValid: false, error: 'Down payment plus loan amount must equal purchase price' };
  }
  return { isValid: true };
}

function validateLoanAmount(value: number, inputs: CashFlowInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Loan amount cannot be negative' };
  }
  if (inputs.downPayment + value !== inputs.purchasePrice) {
    return { isValid: false, error: 'Down payment plus loan amount must equal purchase price' };
  }
  return { isValid: true };
}

function validateInterestRate(value: number): QuickValidationResult {
  if (value < 0 || value > 20) {
    return { isValid: false, error: 'Interest rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

function validateLoanTerm(value: number): QuickValidationResult {
  if (![15, 20, 30].includes(value)) {
    return { isValid: false, error: 'Loan term must be 15, 20, or 30 years' };
  }
  return { isValid: true };
}

function validatePropertyType(value: string): QuickValidationResult {
  const validTypes = ['residential', 'commercial', 'mixed-use', 'industrial'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid property type' };
  }
  return { isValid: true };
}

function validatePropertyAge(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property age cannot be negative' };
  }
  if (value > 100) {
    return { isValid: true, warning: 'Property age seems unusually high' };
  }
  return { isValid: true };
}

function validateSquareFootage(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Square footage must be greater than 0' };
  }
  if (value > 50000) {
    return { isValid: true, warning: 'Square footage seems unusually high' };
  }
  return { isValid: true };
}

function validateBedrooms(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Number of bedrooms cannot be negative' };
  }
  if (value > 20) {
    return { isValid: true, warning: 'Number of bedrooms seems unusually high' };
  }
  return { isValid: true };
}

function validateBathrooms(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Number of bathrooms cannot be negative' };
  }
  if (value > 20) {
    return { isValid: true, warning: 'Number of bathrooms seems unusually high' };
  }
  return { isValid: true };
}

function validateMonthlyRent(value: number, inputs: CashFlowInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Monthly rent cannot be negative' };
  }
  if (value > inputs.marketRent * 2) {
    return { isValid: true, warning: 'Monthly rent seems unusually high compared to market rent' };
  }
  return { isValid: true };
}

function validateOtherIncome(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other income cannot be negative' };
  }
  return { isValid: true };
}

function validateRentGrowthRate(value: number): QuickValidationResult {
  if (value < -10 || value > 20) {
    return { isValid: false, error: 'Rent growth rate must be between -10% and 20%' };
  }
  return { isValid: true };
}

function validateVacancyRate(value: number, inputs: CashFlowInputs): QuickValidationResult {
  if (value < 0 || value > 50) {
    return { isValid: false, error: 'Vacancy rate must be between 0% and 50%' };
  }
  if (value > inputs.marketVacancy * 2) {
    return { isValid: true, warning: 'Vacancy rate seems unusually high compared to market vacancy' };
  }
  return { isValid: true };
}

function validatePropertyTaxes(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property taxes cannot be negative' };
  }
  return { isValid: true };
}

function validateInsurance(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Insurance cannot be negative' };
  }
  return { isValid: true };
}

function validateMaintenance(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Maintenance cannot be negative' };
  }
  return { isValid: true };
}

function validatePropertyManagement(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property management cannot be negative' };
  }
  return { isValid: true };
}

function validateUtilities(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Utilities cannot be negative' };
  }
  return { isValid: true };
}

function validateHoaFees(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'HOA fees cannot be negative' };
  }
  return { isValid: true };
}

function validateLandscaping(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Landscaping cannot be negative' };
  }
  return { isValid: true };
}

function validatePestControl(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Pest control cannot be negative' };
  }
  return { isValid: true };
}

function validateAdvertising(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Advertising cannot be negative' };
  }
  return { isValid: true };
}

function validateLegalFees(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Legal fees cannot be negative' };
  }
  return { isValid: true };
}

function validateAccountingFees(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Accounting fees cannot be negative' };
  }
  return { isValid: true };
}

function validateOtherExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other expenses cannot be negative' };
  }
  return { isValid: true };
}

function validateClosingCosts(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Closing costs cannot be negative' };
  }
  return { isValid: true };
}

function validatePoints(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Points cannot be negative' };
  }
  return { isValid: true };
}

function validateEscrowAccount(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Escrow account cannot be negative' };
  }
  return { isValid: true };
}

function validatePrepaidItems(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Prepaid items cannot be negative' };
  }
  return { isValid: true };
}

function validateMarketRent(value: number, inputs: CashFlowInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Market rent cannot be negative' };
  }
  if (inputs.monthlyRent > value * 2) {
    return { isValid: true, warning: 'Monthly rent seems unusually high compared to market rent' };
  }
  return { isValid: true };
}

function validateMarketVacancy(value: number): QuickValidationResult {
  if (value < 0 || value > 50) {
    return { isValid: false, error: 'Market vacancy must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateMarketExpenses(value: number): QuickValidationResult {
  if (value < 0 || value > 100) {
    return { isValid: false, error: 'Market expenses must be between 0% and 100%' };
  }
  return { isValid: true };
}

function validateMarketCapRate(value: number): QuickValidationResult {
  if (value < 0 || value > 20) {
    return { isValid: false, error: 'Market cap rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

function validateAnalysisPeriod(value: number): QuickValidationResult {
  if (value < 1 || value > 30) {
    return { isValid: false, error: 'Analysis period must be between 1 and 30 years' };
  }
  return { isValid: true };
}

function validateInflationRate(value: number): QuickValidationResult {
  if (value < -5 || value > 15) {
    return { isValid: false, error: 'Inflation rate must be between -5% and 15%' };
  }
  return { isValid: true };
}

function validateAppreciationRate(value: number): QuickValidationResult {
  if (value < -10 || value > 20) {
    return { isValid: false, error: 'Appreciation rate must be between -10% and 20%' };
  }
  return { isValid: true };
}

function validateTaxRate(value: number): QuickValidationResult {
  if (value < 0 || value > 50) {
    return { isValid: false, error: 'Tax rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateDepreciationPeriod(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Depreciation period must be greater than 0' };
  }
  return { isValid: true };
}

function validatePersonalUsePercentage(value: number): QuickValidationResult {
  if (value < 0 || value > 100) {
    return { isValid: false, error: 'Personal use percentage must be between 0% and 100%' };
  }
  return { isValid: true };
}

function validateLeaseTerm(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Lease term cannot be negative' };
  }
  return { isValid: true };
}

function validateRentEscalation(value: number): QuickValidationResult {
  if (value < 0 || value > 20) {
    return { isValid: false, error: 'Rent escalation must be between 0% and 20%' };
  }
  return { isValid: true };
}

function validateCurrency(value: string): QuickValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return { isValid: false, error: 'Invalid currency' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: string): QuickValidationResult {
  const validFormats = ['currency', 'percentage', 'decimal'];
  if (!validFormats.includes(value)) {
    return { isValid: false, error: 'Invalid display format' };
  }
  return { isValid: true };
}