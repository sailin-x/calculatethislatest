import { RealEstateCrowdfundingInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof RealEstateCrowdfundingInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'investmentAmount':
      return validateInvestmentAmount(value, allInputs);
    case 'minimumInvestment':
      return validateMinimumInvestment(value, allInputs);
    case 'maximumInvestment':
      return validateMaximumInvestment(value, allInputs);
    case 'investmentType':
      return validateInvestmentType(value);
    case 'investmentTerm':
      return validateInvestmentTerm(value);
    case 'targetIRR':
      return validateTargetIRR(value);
    case 'targetCashOnCash':
      return validateTargetCashOnCash(value);
    case 'targetEquityMultiple':
      return validateTargetEquityMultiple(value);
    case 'propertyValue':
      return validatePropertyValue(value, allInputs);
    case 'propertyType':
      return validatePropertyType(value);
    case 'propertySize':
      return validatePropertySize(value, allInputs);
    case 'propertyLocation':
      return validatePropertyLocation(value);
    case 'propertyCondition':
      return validatePropertyCondition(value);
    case 'propertyAge':
      return validatePropertyAge(value);
    case 'occupancyRate':
      return validateOccupancyRate(value, allInputs);
    case 'capRate':
      return validateCapRate(value, allInputs);
    case 'purchasePrice':
      return validatePurchasePrice(value, allInputs);
    case 'downPayment':
      return validateDownPayment(value, allInputs);
    case 'loanAmount':
      return validateLoanAmount(value, allInputs);
    case 'interestRate':
      return validateInterestRate(value, allInputs);
    case 'loanTerm':
      return validateLoanTerm(value, allInputs);
    case 'monthlyRent':
      return validateMonthlyRent(value, allInputs);
    case 'annualRent':
      return validateAnnualRent(value, allInputs);
    case 'operatingExpenses':
      return validateOperatingExpenses(value, allInputs);
    case 'propertyManagementFee':
      return validatePropertyManagementFee(value);
    case 'vacancyRate':
      return validateVacancyRate(value);
    case 'maintenanceReserve':
      return validateMaintenanceReserve(value);
    case 'insuranceCost':
      return validateInsuranceCost(value);
    case 'propertyTaxRate':
      return validatePropertyTaxRate(value);
    case 'platformFee':
      return validatePlatformFee(value, allInputs);
    case 'platformFeeType':
      return validatePlatformFeeType(value);
    case 'minimumHoldPeriod':
      return validateMinimumHoldPeriod(value, allInputs);
    case 'liquidityOptions':
      return validateLiquidityOptions(value);
    case 'secondaryMarketFee':
      return validateSecondaryMarketFee(value, allInputs);
    case 'earlyExitPenalty':
      return validateEarlyExitPenalty(value, allInputs);
    case 'marketAppreciationRate':
      return validateMarketAppreciationRate(value);
    case 'inflationRate':
      return validateInflationRate(value);
    case 'localEconomicGrowth':
      return validateLocalEconomicGrowth(value);
    case 'interestRateEnvironment':
      return validateInterestRateEnvironment(value);
    case 'marketVolatility':
      return validateMarketVolatility(value);
    case 'propertyMarketRisk':
      return validatePropertyMarketRisk(value);
    case 'tenantCreditRisk':
      return validateTenantCreditRisk(value);
    case 'interestRateRisk':
      return validateInterestRateRisk(value);
    case 'liquidityRisk':
      return validateLiquidityRisk(value);
    case 'regulatoryRisk':
      return validateRegulatoryRisk(value);
    case 'sponsorTrackRecord':
      return validateSponsorTrackRecord(value);
    case 'taxBracket':
      return validateTaxBracket(value);
    case 'stateTaxRate':
      return validateStateTaxRate(value);
    case 'localTaxRate':
      return validateLocalTaxRate(value);
    case 'depreciationRecapture':
      return validateDepreciationRecapture(value);
    case 'section1031Eligible':
      return validateSection1031Eligible(value);
    case 'qualifiedBusinessIncome':
      return validateQualifiedBusinessIncome(value);
    case 'exitStrategy':
      return validateExitStrategy(value);
    case 'projectedExitValue':
      return validateProjectedExitValue(value, allInputs);
    case 'projectedExitYear':
      return validateProjectedExitYear(value, allInputs);
    case 'exitCosts':
      return validateExitCosts(value, allInputs);
    case 'leverageRatio':
      return validateLeverageRatio(value);
    case 'preferredReturn':
      return validatePreferredReturn(value);
    case 'promoteStructure':
      return validatePromoteStructure(value);
    case 'promotePercentage':
      return validatePromotePercentage(value);
    case 'waterfallStructure':
      return validateWaterfallStructure(value);
    case 'includeTaxes':
      return validateIncludeTaxes(value);
    case 'includeInflation':
      return validateIncludeInflation(value);
    case 'includeAppreciation':
      return validateIncludeAppreciation(value);
    case 'includeLiquidity':
      return validateIncludeLiquidity(value);
    case 'riskAdjustment':
      return validateRiskAdjustment(value);
    case 'scenarioAnalysis':
      return validateScenarioAnalysis(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    case 'includeCharts':
      return validateIncludeCharts(value);
    case 'includeComparisons':
      return validateIncludeComparisons(value);
    case 'includeTimeline':
      return validateIncludeTimeline(value);
    default:
      return { isValid: true };
  }
}

function validateInvestmentAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Investment amount must be a number' };
  }
  if (value <= 0) {
    return { isValid: false, error: 'Investment amount must be greater than 0' };
  }
  if (allInputs?.minimumInvestment && value < allInputs.minimumInvestment) {
    return { isValid: false, error: `Investment amount must be at least $${allInputs.minimumInvestment.toLocaleString()}` };
  }
  if (allInputs?.maximumInvestment && value > allInputs.maximumInvestment) {
    return { isValid: false, error: `Investment amount cannot exceed $${allInputs.maximumInvestment.toLocaleString()}` };
  }
  return { isValid: true };
}

function validateMinimumInvestment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Minimum investment must be a number' };
  }
  if (value <= 0) {
    return { isValid: false, error: 'Minimum investment must be greater than 0' };
  }
  if (allInputs?.maximumInvestment && value > allInputs.maximumInvestment) {
    return { isValid: false, error: 'Minimum investment cannot exceed maximum investment' };
  }
  return { isValid: true };
}

function validateMaximumInvestment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Maximum investment must be a number' };
  }
  if (value <= 0) {
    return { isValid: false, error: 'Maximum investment must be greater than 0' };
  }
  if (allInputs?.minimumInvestment && value < allInputs.minimumInvestment) {
    return { isValid: false, error: 'Maximum investment must be greater than minimum investment' };
  }
  return { isValid: true };
}

function validateInvestmentType(value: any): ValidationResult {
  const validTypes = ['equity', 'debt', 'hybrid', 'preferred_equity', 'mezzanine'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid investment type' };
  }
  return { isValid: true };
}

function validateInvestmentTerm(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Investment term must be a number' };
  }
  if (value <= 0) {
    return { isValid: false, error: 'Investment term must be greater than 0' };
  }
  if (value > 120) {
    return { isValid: false, error: 'Investment term cannot exceed 120 months (10 years)' };
  }
  return { isValid: true };
}

function validateTargetIRR(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Target IRR must be a number' };
  }
  if (value < 0 || value > 50) {
    return { isValid: false, error: 'Target IRR must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateTargetCashOnCash(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Target cash-on-cash return must be a number' };
  }
  if (value < 0 || value > 30) {
    return { isValid: false, error: 'Target cash-on-cash return must be between 0% and 30%' };
  }
  return { isValid: true };
}

function validateTargetEquityMultiple(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Target equity multiple must be a number' };
  }
  if (value < 1 || value > 5) {
    return { isValid: false, error: 'Target equity multiple must be between 1.0x and 5.0x' };
  }
  return { isValid: true };
}

function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Property value must be a number' };
  }
  if (value <= 0) {
    return { isValid: false, error: 'Property value must be greater than 0' };
  }
  if (allInputs?.purchasePrice && Math.abs(value - allInputs.purchasePrice) > 1000) {
    return { isValid: false, error: 'Property value should equal purchase price for consistency' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any): ValidationResult {
  const validTypes = ['residential', 'commercial', 'industrial', 'retail', 'office', 'multifamily', 'hotel', 'land', 'mixed_use'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid property type' };
  }
  return { isValid: true };
}

function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Property size must be a number' };
  }
  if (value <= 0) {
    return { isValid: false, error: 'Property size must be greater than 0' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Property size cannot exceed 1,000,000 square feet' };
  }
  
  // Property type specific validations
  if (allInputs?.propertyType === 'land' && value < 1000) {
    return { isValid: false, error: 'Land properties should typically be at least 1,000 square feet' };
  }
  if (allInputs?.propertyType === 'multifamily' && value < 5000) {
    return { isValid: false, error: 'Multifamily properties should typically be at least 5,000 square feet' };
  }
  if (allInputs?.propertyType === 'hotel' && value < 10000) {
    return { isValid: false, error: 'Hotel properties should typically be at least 10,000 square feet' };
  }
  
  return { isValid: true };
}

function validatePropertyLocation(value: any): ValidationResult {
  if (value && typeof value === 'string' && value.length > 100) {
    return { isValid: false, error: 'Property location cannot exceed 100 characters' };
  }
  return { isValid: true };
}

function validatePropertyCondition(value: any): ValidationResult {
  const validConditions = ['excellent', 'good', 'fair', 'poor', 'needs_repair'];
  if (value && !validConditions.includes(value)) {
    return { isValid: false, error: 'Invalid property condition' };
  }
  return { isValid: true };
}

function validatePropertyAge(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Property age must be a number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Property age cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Property age cannot exceed 100 years' };
  }
  return { isValid: true };
}

function validateOccupancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Occupancy rate must be a number' };
  }
  if (value < 0 || value > 100) {
    return { isValid: false, error: 'Occupancy rate must be between 0% and 100%' };
  }
  if (allInputs?.propertyType === 'land' && value > 0) {
    return { isValid: false, error: 'Land properties should have 0% occupancy rate' };
  }
  return { isValid: true };
}

function validateCapRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Cap rate must be a number' };
  }
  if (value < 0 || value > 20) {
    return { isValid: false, error: 'Cap rate must be between 0% and 20%' };
  }
  if (allInputs?.propertyType === 'land' && value > 0) {
    return { isValid: false, error: 'Land properties should have 0% cap rate (no income)' };
  }
  return { isValid: true };
}

function validatePurchasePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Purchase price must be a number' };
  }
  if (value <= 0) {
    return { isValid: false, error: 'Purchase price must be greater than 0' };
  }
  if (allInputs?.propertyValue && Math.abs(value - allInputs.propertyValue) > 1000) {
    return { isValid: false, error: 'Purchase price should equal property value for consistency' };
  }
  return { isValid: true };
}

function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Down payment must be a number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Down payment cannot be negative' };
  }
  if (allInputs?.purchasePrice && value > allInputs.purchasePrice) {
    return { isValid: false, error: 'Down payment cannot exceed purchase price' };
  }
  return { isValid: true };
}

function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Loan amount must be a number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Loan amount cannot be negative' };
  }
  if (allInputs?.purchasePrice && value > allInputs.purchasePrice) {
    return { isValid: false, error: 'Loan amount cannot exceed purchase price' };
  }
  if (allInputs?.downPayment && allInputs?.purchasePrice && 
      Math.abs(value + allInputs.downPayment - allInputs.purchasePrice) > 1000) {
    return { isValid: false, error: 'Down payment + loan amount must equal purchase price' };
  }
  return { isValid: true };
}

function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Interest rate must be a number' };
  }
  if (value < 0 || value > 20) {
    return { isValid: false, error: 'Interest rate must be between 0% and 20%' };
  }
  if (allInputs?.loanAmount && allInputs.loanAmount > 0 && value === 0) {
    return { isValid: false, error: 'Interest rate must be greater than 0 when loan amount is specified' };
  }
  return { isValid: true };
}

function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Loan term must be a number' };
  }
  if (value <= 0) {
    return { isValid: false, error: 'Loan term must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Loan term cannot exceed 50 years' };
  }
  if (allInputs?.loanAmount && allInputs.loanAmount > 0 && value === 0) {
    return { isValid: false, error: 'Loan term must be greater than 0 when loan amount is specified' };
  }
  return { isValid: true };
}

function validateMonthlyRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Monthly rent must be a number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Monthly rent cannot be negative' };
  }
  if (allInputs?.annualRent && Math.abs(value * 12 - allInputs.annualRent) > 100) {
    return { isValid: false, error: 'Annual rent should equal monthly rent × 12' };
  }
  return { isValid: true };
}

function validateAnnualRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Annual rent must be a number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Annual rent cannot be negative' };
  }
  if (allInputs?.monthlyRent && Math.abs(allInputs.monthlyRent * 12 - value) > 100) {
    return { isValid: false, error: 'Annual rent should equal monthly rent × 12' };
  }
  return { isValid: true };
}

function validateOperatingExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Operating expenses must be a number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Operating expenses cannot be negative' };
  }
  if (allInputs?.annualRent && value > allInputs.annualRent) {
    return { isValid: false, error: 'Operating expenses cannot exceed annual rent' };
  }
  return { isValid: true };
}

function validatePropertyManagementFee(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Property management fee must be a number' };
  }
  if (value < 0 || value > 20) {
    return { isValid: false, error: 'Property management fee must be between 0% and 20%' };
  }
  return { isValid: true };
}

function validateVacancyRate(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Vacancy rate must be a number' };
  }
  if (value < 0 || value > 50) {
    return { isValid: false, error: 'Vacancy rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateMaintenanceReserve(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Maintenance reserve must be a number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Maintenance reserve cannot be negative' };
  }
  return { isValid: true };
}

function validateInsuranceCost(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Insurance cost must be a number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Insurance cost cannot be negative' };
  }
  return { isValid: true };
}

function validatePropertyTaxRate(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Property tax rate must be a number' };
  }
  if (value < 0 || value > 10) {
    return { isValid: false, error: 'Property tax rate must be between 0% and 10%' };
  }
  return { isValid: true };
}

function validatePlatformFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Platform fee must be a number' };
  }
  if (value < 0 || value > 10) {
    return { isValid: false, error: 'Platform fee must be between 0% and 10%' };
  }
  if (allInputs?.platformFeeType === 'flat' && allInputs?.investmentAmount && value > allInputs.investmentAmount) {
    return { isValid: false, error: 'Flat platform fee cannot exceed investment amount' };
  }
  return { isValid: true };
}

function validatePlatformFeeType(value: any): ValidationResult {
  const validTypes = ['percentage', 'flat', 'tiered'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid platform fee type' };
  }
  return { isValid: true };
}

function validateMinimumHoldPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Minimum hold period must be a number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Minimum hold period cannot be negative' };
  }
  if (allInputs?.investmentTerm && value > allInputs.investmentTerm) {
    return { isValid: false, error: 'Minimum hold period cannot exceed investment term' };
  }
  return { isValid: true };
}

function validateLiquidityOptions(value: any): ValidationResult {
  const validOptions = ['none', 'secondary_market', 'buyback_program', 'periodic_redemption'];
  if (!validOptions.includes(value)) {
    return { isValid: false, error: 'Invalid liquidity options' };
  }
  return { isValid: true };
}

function validateSecondaryMarketFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Secondary market fee must be a number' };
  }
  if (value < 0 || value > 10) {
    return { isValid: false, error: 'Secondary market fee must be between 0% and 10%' };
  }
  if (allInputs?.liquidityOptions === 'none' && value > 0) {
    return { isValid: false, error: 'Secondary market fee should be 0 when no liquidity options are available' };
  }
  return { isValid: true };
}

function validateEarlyExitPenalty(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Early exit penalty must be a number' };
  }
  if (value < 0 || value > 20) {
    return { isValid: false, error: 'Early exit penalty must be between 0% and 20%' };
  }
  if (allInputs?.liquidityOptions === 'none' && value > 0) {
    return { isValid: false, error: 'Early exit penalty should be 0 when no liquidity options are available' };
  }
  return { isValid: true };
}

function validateMarketAppreciationRate(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Market appreciation rate must be a number' };
  }
  if (value < -10 || value > 20) {
    return { isValid: false, error: 'Market appreciation rate must be between -10% and 20%' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Inflation rate must be a number' };
  }
  if (value < -5 || value > 15) {
    return { isValid: false, error: 'Inflation rate must be between -5% and 15%' };
  }
  return { isValid: true };
}

function validateLocalEconomicGrowth(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Local economic growth must be a number' };
  }
  if (value < -10 || value > 15) {
    return { isValid: false, error: 'Local economic growth must be between -10% and 15%' };
  }
  return { isValid: true };
}

function validateInterestRateEnvironment(value: any): ValidationResult {
  const validEnvironments = ['low', 'moderate', 'high', 'rising', 'falling'];
  if (!validEnvironments.includes(value)) {
    return { isValid: false, error: 'Invalid interest rate environment' };
  }
  return { isValid: true };
}

function validateMarketVolatility(value: any): ValidationResult {
  const validVolatilities = ['low', 'medium', 'high'];
  if (!validVolatilities.includes(value)) {
    return { isValid: false, error: 'Invalid market volatility' };
  }
  return { isValid: true };
}

function validatePropertyMarketRisk(value: any): ValidationResult {
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return { isValid: false, error: 'Invalid property market risk' };
  }
  return { isValid: true };
}

function validateTenantCreditRisk(value: any): ValidationResult {
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return { isValid: false, error: 'Invalid tenant credit risk' };
  }
  return { isValid: true };
}

function validateInterestRateRisk(value: any): ValidationResult {
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return { isValid: false, error: 'Invalid interest rate risk' };
  }
  return { isValid: true };
}

function validateLiquidityRisk(value: any): ValidationResult {
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return { isValid: false, error: 'Invalid liquidity risk' };
  }
  return { isValid: true };
}

function validateRegulatoryRisk(value: any): ValidationResult {
  const validRisks = ['low', 'medium', 'high'];
  if (!validRisks.includes(value)) {
    return { isValid: false, error: 'Invalid regulatory risk' };
  }
  return { isValid: true };
}

function validateSponsorTrackRecord(value: any): ValidationResult {
  const validRecords = ['excellent', 'good', 'fair', 'poor'];
  if (!validRecords.includes(value)) {
    return { isValid: false, error: 'Invalid sponsor track record' };
  }
  return { isValid: true };
}

function validateTaxBracket(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Tax bracket must be a number' };
  }
  if (value < 0 || value > 50) {
    return { isValid: false, error: 'Tax bracket must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateStateTaxRate(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'State tax rate must be a number' };
  }
  if (value < 0 || value > 15) {
    return { isValid: false, error: 'State tax rate must be between 0% and 15%' };
  }
  return { isValid: true };
}

function validateLocalTaxRate(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Local tax rate must be a number' };
  }
  if (value < 0 || value > 10) {
    return { isValid: false, error: 'Local tax rate must be between 0% and 10%' };
  }
  return { isValid: true };
}

function validateDepreciationRecapture(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Depreciation recapture must be true or false' };
  }
  return { isValid: true };
}

function validateSection1031Eligible(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Section 1031 eligible must be true or false' };
  }
  return { isValid: true };
}

function validateQualifiedBusinessIncome(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Qualified business income must be true or false' };
  }
  return { isValid: true };
}

function validateExitStrategy(value: any): ValidationResult {
  const validStrategies = ['sale', 'refinance', 'ipo', 'merger', 'hold'];
  if (!validStrategies.includes(value)) {
    return { isValid: false, error: 'Invalid exit strategy' };
  }
  return { isValid: true };
}

function validateProjectedExitValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Projected exit value must be a number' };
  }
  if (value <= 0) {
    return { isValid: false, error: 'Projected exit value must be greater than 0' };
  }
  if (allInputs?.propertyValue) {
    if (value < allInputs.propertyValue * 0.5) {
      return { isValid: false, error: 'Projected exit value seems too low relative to property value' };
    }
    if (value > allInputs.propertyValue * 3) {
      return { isValid: false, error: 'Projected exit value seems too high relative to property value' };
    }
  }
  return { isValid: true };
}

function validateProjectedExitYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Projected exit year must be a number' };
  }
  if (value < 1) {
    return { isValid: false, error: 'Projected exit year must be at least 1' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Projected exit year cannot exceed 20 years' };
  }
  if (allInputs?.investmentTerm && value > allInputs.investmentTerm / 12) {
    return { isValid: false, error: 'Projected exit year cannot exceed investment term' };
  }
  return { isValid: true };
}

function validateExitCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Exit costs must be a number' };
  }
  if (value < 0) {
    return { isValid: false, error: 'Exit costs cannot be negative' };
  }
  if (allInputs?.projectedExitValue && value > allInputs.projectedExitValue * 0.1) {
    return { isValid: false, error: 'Exit costs seem too high relative to exit value' };
  }
  return { isValid: true };
}

function validateLeverageRatio(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Leverage ratio must be a number' };
  }
  if (value < 0 || value > 95) {
    return { isValid: false, error: 'Leverage ratio must be between 0% and 95%' };
  }
  return { isValid: true };
}

function validatePreferredReturn(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Preferred return must be a number' };
  }
  if (value < 0 || value > 20) {
    return { isValid: false, error: 'Preferred return must be between 0% and 20%' };
  }
  return { isValid: true };
}

function validatePromoteStructure(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Promote structure must be true or false' };
  }
  return { isValid: true };
}

function validatePromotePercentage(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Promote percentage must be a number' };
  }
  if (value < 0 || value > 50) {
    return { isValid: false, error: 'Promote percentage must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateWaterfallStructure(value: any): ValidationResult {
  const validStructures = ['simple', 'complex', 'custom'];
  if (!validStructures.includes(value)) {
    return { isValid: false, error: 'Invalid waterfall structure' };
  }
  return { isValid: true };
}

function validateIncludeTaxes(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include taxes must be true or false' };
  }
  return { isValid: true };
}

function validateIncludeInflation(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include inflation must be true or false' };
  }
  return { isValid: true };
}

function validateIncludeAppreciation(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include appreciation must be true or false' };
  }
  return { isValid: true };
}

function validateIncludeLiquidity(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include liquidity must be true or false' };
  }
  return { isValid: true };
}

function validateRiskAdjustment(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Risk adjustment must be true or false' };
  }
  return { isValid: true };
}

function validateScenarioAnalysis(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Scenario analysis must be true or false' };
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
    return { isValid: false, error: 'Include charts must be true or false' };
  }
  return { isValid: true };
}

function validateIncludeComparisons(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include comparisons must be true or false' };
  }
  return { isValid: true };
}

function validateIncludeTimeline(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include timeline must be true or false' };
  }
  return { isValid: true };
}