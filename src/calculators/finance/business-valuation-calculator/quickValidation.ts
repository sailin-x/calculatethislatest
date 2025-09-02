import { BusinessValuationCalculatorInputs } from './types';

export interface QuickValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(
  fieldName: string,
  value: any,
  allInputs: BusinessValuationCalculatorInputs
): QuickValidationResult {
  // Handle nested field paths
  const fieldPath = fieldName.split('.');
  
  // Basic business info validation
  if (fieldPath[0] === 'businessInfo' && fieldPath[1] === 'basicInfo') {
    return validateBasicInfoField(fieldPath[2], value);
  }
  
  // Ownership info validation
  if (fieldPath[0] === 'businessInfo' && fieldPath[1] === 'ownershipInfo') {
    return validateOwnershipField(fieldPath[2], value);
  }
  
  // Market info validation
  if (fieldPath[0] === 'businessInfo' && fieldPath[1] === 'marketInfo') {
    if (fieldPath[2] === 'customerBase') {
      return validateCustomerBaseField(fieldPath[3], value);
    }
    return validateMarketField(fieldPath[2], value);
  }
  
  // Financial info validation
  if (fieldPath[0] === 'financialInfo') {
    if (fieldPath[1] === 'normalizationAdjustments') {
      return validateNormalizationField(fieldPath[2], value);
    }
    if (fieldPath[1] === 'workingCapitalAnalysis') {
      if (fieldPath[2] === 'currentAssets') {
        return validateCurrentAssetField(fieldPath[3], value);
      }
      if (fieldPath[2] === 'currentLiabilities') {
        return validateCurrentLiabilityField(fieldPath[3], value);
      }
    }
    if (fieldPath[1] === 'capitalStructure') {
      if (fieldPath[2] === 'debt') {
        return validateDebtField(fieldPath[3], value);
      }
      if (fieldPath[2] === 'equity') {
        return validateEquityField(fieldPath[3], value);
      }
    }
  }
  
  // Asset analysis validation
  if (fieldPath[0] === 'assetAnalysis') {
    if (fieldPath[1] === 'tangibleAssets') {
      if (fieldPath[2] === 'inventory') {
        return validateInventoryField(fieldPath[3], value);
      }
    }
  }
  
  // Valuation methods validation
  if (fieldPath[0] === 'valuationMethods') {
    if (fieldPath[1] === 'incomeApproach') {
      if (fieldPath[2] === 'discountedCashFlow') {
        return validateDCFField(fieldPath[3], value);
      }
      if (fieldPath[2] === 'capitalizationOfEarnings') {
        return validateCapEarningsField(fieldPath[3], value);
      }
    }
    if (fieldPath[1] === 'marketApproach') {
      if (fieldPath[2] === 'multiples') {
        return validateMultipleField(fieldPath[3], value);
      }
    }
    if (fieldPath[1] === 'assetApproach') {
      return validateAssetApproachField(fieldPath[2], value);
    }
  }
  
  // Risk analysis validation
  if (fieldPath[0] === 'riskAnalysis') {
    return validateRiskField(fieldPath[1], value);
  }
  
  // Discount rates validation
  if (fieldPath[0] === 'discountRates') {
    return validateDiscountRateField(fieldPath[1], value);
  }
  
  // Valuation planning validation
  if (fieldPath[0] === 'valuationPlanning') {
    return validateValuationPlanningField(fieldPath[1], value);
  }
  
  return { isValid: true };
}

function validateBasicInfoField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'businessName':
      return validateBusinessName(value);
    case 'businessType':
      return validateBusinessType(value);
    case 'industry':
      return validateIndustry(value);
    case 'yearEstablished':
      return validateYearEstablished(value);
    case 'yearsInOperation':
      return validateYearsInOperation(value);
    case 'businessDescription':
      return validateBusinessDescription(value);
    default:
      return { isValid: true };
  }
}

function validateOwnershipField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'totalOwnership':
      return validateTotalOwnership(value);
    case 'minorityDiscount':
      return validateMinorityDiscount(value);
    case 'controlPremium':
      return validateControlPremium(value);
    case 'marketabilityDiscount':
      return validateMarketabilityDiscount(value);
    default:
      return { isValid: true };
  }
}

function validateMarketField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'marketSize':
      return validateMarketSize(value);
    case 'marketGrowth':
      return validateMarketGrowth(value);
    case 'marketShare':
      return validateMarketShare(value);
    default:
      return { isValid: true };
  }
}

function validateCustomerBaseField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'totalCustomers':
      return validateTotalCustomers(value);
    case 'repeatCustomers':
      return validateRepeatCustomers(value);
    case 'customerRetention':
      return validateCustomerRetention(value);
    case 'averageCustomerValue':
      return validateAverageCustomerValue(value);
    case 'customerConcentration':
      return validateCustomerConcentration(value);
    default:
      return { isValid: true };
  }
}

function validateNormalizationField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'adjustment':
      return validateOwnerCompensationAdjustment(value);
    default:
      return { isValid: true };
  }
}

function validateCurrentAssetField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'cash':
      return validateCash(value);
    case 'accountsReceivable':
      return validateAccountsReceivable(value);
    case 'inventory':
      return validateInventory(value);
    case 'prepaidExpenses':
      return validatePrepaidExpenses(value);
    default:
      return { isValid: true };
  }
}

function validateCurrentLiabilityField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'accountsPayable':
      return validateAccountsPayable(value);
    case 'accruedExpenses':
      return validateAccruedExpenses(value);
    case 'shortTermDebt':
      return validateShortTermDebt(value);
    default:
      return { isValid: true };
  }
}

function validateDebtField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'shortTermDebt':
      return validateShortTermDebt(value);
    case 'longTermDebt':
      return validateLongTermDebt(value);
    case 'interestRate':
      return validateInterestRate(value);
    default:
      return { isValid: true };
  }
}

function validateEquityField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'commonStock':
      return validateCommonStock(value);
    case 'preferredStock':
      return validatePreferredStock(value);
    case 'retainedEarnings':
      return validateRetainedEarnings(value);
    default:
      return { isValid: true };
  }
}

function validateInventoryField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'bookValue':
      return validateInventoryBookValue(value);
    case 'fairMarketValue':
      return validateInventoryFairMarketValue(value);
    case 'turnoverRate':
      return validateInventoryTurnoverRate(value);
    case 'obsolescence':
      return validateInventoryObsolescence(value);
    default:
      return { isValid: true };
  }
}

function validateDCFField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'projectionPeriod':
      return validateProjectionPeriod(value);
    case 'terminalGrowthRate':
      return validateTerminalGrowthRate(value);
    case 'discountRate':
      return validateDiscountRate(value);
    default:
      return { isValid: true };
  }
}

function validateCapEarningsField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'normalizedEarnings':
      return validateNormalizedEarnings(value);
    case 'capitalizationRate':
      return validateCapitalizationRate(value);
    default:
      return { isValid: true };
  }
}

function validateMultipleField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'priceToEarnings':
      return validatePriceToEarnings(value);
    case 'priceToBook':
      return validatePriceToBook(value);
    case 'priceToSales':
      return validatePriceToSales(value);
    case 'evToEbitda':
      return validateEvToEbitda(value);
    case 'evToEbit':
      return validateEvToEbit(value);
    default:
      return { isValid: true };
  }
}

function validateAssetApproachField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'adjustedBookValue':
      return validateAdjustedBookValue(value);
    case 'liquidationValue':
      return validateLiquidationValue(value);
    case 'replacementCost':
      return validateReplacementCost(value);
    default:
      return { isValid: true };
  }
}

function validateRiskField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'businessRisk':
      return validateBusinessRisk(value);
    case 'financialRisk':
      return validateFinancialRisk(value);
    case 'marketRisk':
      return validateMarketRisk(value);
    case 'regulatoryRisk':
      return validateRegulatoryRisk(value);
    case 'operationalRisk':
      return validateOperationalRisk(value);
    case 'totalRisk':
      return validateTotalRisk(value);
    default:
      return { isValid: true };
  }
}

function validateDiscountRateField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'costOfEquity':
      return validateCostOfEquity(value);
    case 'costOfDebt':
      return validateCostOfDebt(value);
    case 'weightedAverageCostOfCapital':
      return validateWACC(value);
    case 'riskFreeRate':
      return validateRiskFreeRate(value);
    case 'marketRiskPremium':
      return validateMarketRiskPremium(value);
    case 'beta':
      return validateBeta(value);
    case 'sizeRiskPremium':
      return validateSizeRiskPremium(value);
    case 'companySpecificRisk':
      return validateCompanySpecificRisk(value);
    default:
      return { isValid: true };
  }
}

function validateValuationPlanningField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'purpose':
      return validatePurpose(value);
    case 'standardOfValue':
      return validateStandardOfValue(value);
    case 'premiseOfValue':
      return validatePremiseOfValue(value);
    case 'reportType':
      return validateReportType(value);
    case 'effectiveDate':
      return validateEffectiveDate(value);
    default:
      return { isValid: true };
  }
}

// Basic Info Validation Functions
function validateBusinessName(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Business name is required' };
  }
  
  if (value.trim().length === 0) {
    return { isValid: false, error: 'Business name cannot be empty' };
  }
  
  if (value.length > 100) {
    return { isValid: false, error: 'Business name cannot exceed 100 characters' };
  }
  
  return { isValid: true };
}

function validateBusinessType(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Business type is required' };
  }
  
  const validTypes = ['sole_proprietorship', 'partnership', 'corporation', 's_corporation', 'llc', 'other'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid business type' };
  }
  
  return { isValid: true };
}

function validateIndustry(value: string): QuickValidationResult {
  if (value && value.length > 200) {
    return { isValid: false, error: 'Industry description cannot exceed 200 characters' };
  }
  
  return { isValid: true };
}

function validateYearEstablished(value: number): QuickValidationResult {
  if (value < 1800) {
    return { isValid: false, error: 'Year established cannot be before 1800' };
  }
  
  if (value > new Date().getFullYear()) {
    return { isValid: false, error: 'Year established cannot be in the future' };
  }
  
  return { isValid: true };
}

function validateYearsInOperation(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Years in operation cannot be negative' };
  }
  
  if (value > 200) {
    return { isValid: true, warning: 'Years in operation seems unusually high' };
  }
  
  return { isValid: true };
}

function validateBusinessDescription(value: string): QuickValidationResult {
  if (value && value.length > 1000) {
    return { isValid: false, error: 'Business description cannot exceed 1000 characters' };
  }
  
  return { isValid: true };
}

// Ownership Validation Functions
function validateTotalOwnership(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Total ownership cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Total ownership cannot exceed 100%' };
  }
  
  if (value !== 100) {
    return { isValid: true, warning: 'Total ownership should typically equal 100%' };
  }
  
  return { isValid: true };
}

function validateMinorityDiscount(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Minority discount cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Minority discount cannot exceed 100%' };
  }
  
  if (value > 50) {
    return { isValid: true, warning: 'Minority discount seems unusually high' };
  }
  
  return { isValid: true };
}

function validateControlPremium(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Control premium cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Control premium cannot exceed 100%' };
  }
  
  if (value > 50) {
    return { isValid: true, warning: 'Control premium seems unusually high' };
  }
  
  return { isValid: true };
}

function validateMarketabilityDiscount(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Marketability discount cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Marketability discount cannot exceed 100%' };
  }
  
  if (value > 50) {
    return { isValid: true, warning: 'Marketability discount seems unusually high' };
  }
  
  return { isValid: true };
}

// Market Validation Functions
function validateMarketSize(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Market size cannot be negative' };
  }
  
  return { isValid: true };
}

function validateMarketGrowth(value: number): QuickValidationResult {
  if (value < -1) {
    return { isValid: false, error: 'Market growth cannot be less than -100%' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Market growth cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateMarketShare(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Market share cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Market share cannot exceed 100%' };
  }
  
  return { isValid: true };
}

// Customer Base Validation Functions
function validateTotalCustomers(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Total customers cannot be negative' };
  }
  
  return { isValid: true };
}

function validateRepeatCustomers(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Repeat customers cannot be negative' };
  }
  
  return { isValid: true };
}

function validateCustomerRetention(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Customer retention cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Customer retention cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateAverageCustomerValue(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Average customer value cannot be negative' };
  }
  
  return { isValid: true };
}

function validateCustomerConcentration(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Customer concentration cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Customer concentration cannot exceed 100%' };
  }
  
  return { isValid: true };
}

// Financial Validation Functions
function validateOwnerCompensationAdjustment(value: number): QuickValidationResult {
  if (value < -10000000) {
    return { isValid: false, error: 'Owner compensation adjustment cannot be less than -$10 million' };
  }
  
  if (value > 10000000) {
    return { isValid: false, error: 'Owner compensation adjustment cannot exceed $10 million' };
  }
  
  return { isValid: true };
}

function validateCash(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Cash cannot be negative' };
  }
  
  return { isValid: true };
}

function validateAccountsReceivable(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Accounts receivable cannot be negative' };
  }
  
  return { isValid: true };
}

function validateInventory(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Inventory cannot be negative' };
  }
  
  return { isValid: true };
}

function validatePrepaidExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Prepaid expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateAccountsPayable(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Accounts payable cannot be negative' };
  }
  
  return { isValid: true };
}

function validateAccruedExpenses(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Accrued expenses cannot be negative' };
  }
  
  return { isValid: true };
}

function validateShortTermDebt(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Short-term debt cannot be negative' };
  }
  
  return { isValid: true };
}

function validateLongTermDebt(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Long-term debt cannot be negative' };
  }
  
  return { isValid: true };
}

function validateInterestRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Interest rate cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Interest rate cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateCommonStock(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Common stock cannot be negative' };
  }
  
  return { isValid: true };
}

function validatePreferredStock(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Preferred stock cannot be negative' };
  }
  
  return { isValid: true };
}

function validateRetainedEarnings(value: number): QuickValidationResult {
  if (value < -1000000000) {
    return { isValid: false, error: 'Retained earnings cannot be less than -$1 billion' };
  }
  
  return { isValid: true };
}

// Asset Validation Functions
function validateInventoryBookValue(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Inventory book value cannot be negative' };
  }
  
  return { isValid: true };
}

function validateInventoryFairMarketValue(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Inventory fair market value cannot be negative' };
  }
  
  return { isValid: true };
}

function validateInventoryTurnoverRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Inventory turnover rate cannot be negative' };
  }
  
  return { isValid: true };
}

function validateInventoryObsolescence(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Inventory obsolescence cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Inventory obsolescence cannot exceed 100%' };
  }
  
  return { isValid: true };
}

// Valuation Methods Validation Functions
function validateProjectionPeriod(value: number): QuickValidationResult {
  if (value < 1) {
    return { isValid: false, error: 'Projection period must be at least 1 year' };
  }
  
  if (value > 20) {
    return { isValid: false, error: 'Projection period cannot exceed 20 years' };
  }
  
  return { isValid: true };
}

function validateTerminalGrowthRate(value: number): QuickValidationResult {
  if (value < -0.1) {
    return { isValid: false, error: 'Terminal growth rate cannot be less than -10%' };
  }
  
  if (value > 0.1) {
    return { isValid: false, error: 'Terminal growth rate cannot exceed 10%' };
  }
  
  return { isValid: true };
}

function validateDiscountRate(value: number): QuickValidationResult {
  if (value < 0.05) {
    return { isValid: false, error: 'Discount rate must be at least 5%' };
  }
  
  if (value > 0.5) {
    return { isValid: false, error: 'Discount rate cannot exceed 50%' };
  }
  
  return { isValid: true };
}

function validateNormalizedEarnings(value: number): QuickValidationResult {
  if (value < -1000000000) {
    return { isValid: false, error: 'Normalized earnings cannot be less than -$1 billion' };
  }
  
  return { isValid: true };
}

function validateCapitalizationRate(value: number): QuickValidationResult {
  if (value < 0.05) {
    return { isValid: false, error: 'Capitalization rate must be at least 5%' };
  }
  
  if (value > 0.5) {
    return { isValid: false, error: 'Capitalization rate cannot exceed 50%' };
  }
  
  return { isValid: true };
}

function validatePriceToEarnings(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Price to earnings ratio cannot be negative' };
  }
  
  return { isValid: true };
}

function validatePriceToBook(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Price to book ratio cannot be negative' };
  }
  
  return { isValid: true };
}

function validatePriceToSales(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Price to sales ratio cannot be negative' };
  }
  
  return { isValid: true };
}

function validateEvToEbitda(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'EV to EBITDA ratio cannot be negative' };
  }
  
  return { isValid: true };
}

function validateEvToEbit(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'EV to EBIT ratio cannot be negative' };
  }
  
  return { isValid: true };
}

function validateAdjustedBookValue(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Adjusted book value cannot be negative' };
  }
  
  return { isValid: true };
}

function validateLiquidationValue(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Liquidation value cannot be negative' };
  }
  
  return { isValid: true };
}

function validateReplacementCost(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Replacement cost cannot be negative' };
  }
  
  return { isValid: true };
}

// Risk Validation Functions
function validateBusinessRisk(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Business risk cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Business risk cannot exceed 1' };
  }
  
  return { isValid: true };
}

function validateFinancialRisk(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Financial risk cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Financial risk cannot exceed 1' };
  }
  
  return { isValid: true };
}

function validateMarketRisk(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Market risk cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Market risk cannot exceed 1' };
  }
  
  return { isValid: true };
}

function validateRegulatoryRisk(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Regulatory risk cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Regulatory risk cannot exceed 1' };
  }
  
  return { isValid: true };
}

function validateOperationalRisk(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Operational risk cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Operational risk cannot exceed 1' };
  }
  
  return { isValid: true };
}

function validateTotalRisk(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Total risk cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Total risk cannot exceed 1' };
  }
  
  return { isValid: true };
}

// Discount Rate Validation Functions
function validateCostOfEquity(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Cost of equity cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Cost of equity cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateCostOfDebt(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Cost of debt cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Cost of debt cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateWACC(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'WACC cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'WACC cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateRiskFreeRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Risk-free rate cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Risk-free rate cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateMarketRiskPremium(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Market risk premium cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Market risk premium cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateBeta(value: number): QuickValidationResult {
  if (value < -5) {
    return { isValid: false, error: 'Beta cannot be less than -5' };
  }
  
  if (value > 5) {
    return { isValid: false, error: 'Beta cannot exceed 5' };
  }
  
  return { isValid: true };
}

function validateSizeRiskPremium(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Size risk premium cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Size risk premium cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateCompanySpecificRisk(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Company-specific risk cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Company-specific risk cannot exceed 100%' };
  }
  
  return { isValid: true };
}

// Valuation Planning Validation Functions
function validatePurpose(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Valuation purpose is required' };
  }
  
  const validPurposes = ['sale', 'purchase', 'estate_planning', 'divorce', 'partnership_dissolution', 'financing', 'insurance', 'tax', 'litigation', 'other'];
  if (!validPurposes.includes(value)) {
    return { isValid: false, error: 'Invalid valuation purpose' };
  }
  
  return { isValid: true };
}

function validateStandardOfValue(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Standard of value is required' };
  }
  
  const validStandards = ['fair_market_value', 'fair_value', 'investment_value', 'liquidation_value'];
  if (!validStandards.includes(value)) {
    return { isValid: false, error: 'Invalid standard of value' };
  }
  
  return { isValid: true };
}

function validatePremiseOfValue(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Premise of value is required' };
  }
  
  const validPremises = ['going_concern', 'liquidation', 'orderly_liquidation', 'forced_liquidation'];
  if (!validPremises.includes(value)) {
    return { isValid: false, error: 'Invalid premise of value' };
  }
  
  return { isValid: true };
}

function validateReportType(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Report type is required' };
  }
  
  const validReportTypes = ['detailed', 'summary', 'calculation', 'oral'];
  if (!validReportTypes.includes(value)) {
    return { isValid: false, error: 'Invalid report type' };
  }
  
  return { isValid: true };
}

function validateEffectiveDate(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Effective date is required' };
  }
  
  const effectiveDate = new Date(value);
  if (isNaN(effectiveDate.getTime())) {
    return { isValid: false, error: 'Invalid effective date format' };
  }
  
  const currentDate = new Date();
  if (effectiveDate > currentDate) {
    return { isValid: false, error: 'Effective date cannot be in the future' };
  }
  
  return { isValid: true };
}