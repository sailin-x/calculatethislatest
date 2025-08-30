import { OpportunityZoneInvestmentInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof OpportunityZoneInvestmentInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'investmentAmount':
      return validateInvestmentAmount(value, allInputs);
    case 'investmentDate':
      return validateInvestmentDate(value);
    case 'investmentType':
      return validateInvestmentType(value);
    case 'investmentStructure':
      return validateInvestmentStructure(value);
    case 'propertyValue':
      return validatePropertyValue(value, allInputs);
    case 'propertyType':
      return validatePropertyType(value);
    case 'propertySize':
      return validatePropertySize(value);
    case 'numberOfUnits':
      return validateNumberOfUnits(value);
    case 'opportunityZoneLocation':
      return validateOpportunityZoneLocation(value);
    case 'opportunityZoneTier':
      return validateOpportunityZoneTier(value);
    case 'originalGainAmount':
      return validateOriginalGainAmount(value);
    case 'originalGainType':
      return validateOriginalGainType(value);
    case 'investorTaxRate':
      return validateInvestorTaxRate(value);
    case 'stateTaxRate':
      return validateStateTaxRate(value);
    case 'localTaxRate':
      return validateLocalTaxRate(value);
    case 'investmentPeriod':
      return validateInvestmentPeriod(value);
    case 'deferralPeriod':
      return validateDeferralPeriod(value, allInputs);
    case 'exclusionPeriod':
      return validateExclusionPeriod(value, allInputs);
    case 'basisStepUpPeriod':
      return validateBasisStepUpPeriod(value, allInputs);
    case 'expectedAnnualReturn':
      return validateExpectedAnnualReturn(value);
    case 'expectedAppreciation':
      return validateExpectedAppreciation(value);
    case 'expectedCashFlow':
      return validateExpectedCashFlow(value);
    case 'expectedExitValue':
      return validateExpectedExitValue(value);
    case 'marketLocation':
      return validateMarketLocation(value);
    case 'marketCondition':
      return validateMarketCondition(value);
    case 'marketGrowthRate':
      return validateMarketGrowthRate(value);
    case 'marketRisk':
      return validateMarketRisk(value);
    case 'regulatoryRisk':
      return validateRegulatoryRisk(value);
    case 'liquidityRisk':
      return validateLiquidityRisk(value);
    case 'developmentRisk':
      return validateDevelopmentRisk(value);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value);
    case 'inflationRate':
      return validateInflationRate(value);
    case 'discountRate':
      return validateDiscountRate(value);
    case 'taxDeductionPeriod':
      return validateTaxDeductionPeriod(value, allInputs);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    case 'includeCharts':
      return validateIncludeCharts(value);
    case 'taxDeferral':
      return validateTaxDeferral(value);
    case 'taxExclusion':
      return validateTaxExclusion(value);
    case 'basisStepUp':
      return validateBasisStepUp(value);
    case 'deferralPercentage':
      return validateDeferralPercentage(value, allInputs);
    case 'exclusionPercentage':
      return validateExclusionPercentage(value, allInputs);
    case 'basisStepUpPercentage':
      return validateBasisStepUpPercentage(value, allInputs);
    default:
      return { isValid: true };
  }
}

function validateInvestmentAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Investment amount must be greater than 0' };
  }
  if (value > 1000000000) {
    return { isValid: false, error: 'Investment amount cannot exceed $1 billion' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue * 1.5) {
    return { isValid: false, error: 'Investment amount seems unusually high relative to property value' };
  }
  return { isValid: true };
}

function validateInvestmentDate(value: any): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Investment date is required' };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Invalid investment date format' };
  }
  return { isValid: true };
}

function validateInvestmentType(value: any): ValidationResult {
  const validTypes = ['real_estate', 'business', 'infrastructure', 'mixed_use', 'development'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Valid investment type is required' };
  }
  return { isValid: true };
}

function validateInvestmentStructure(value: any): ValidationResult {
  const validStructures = ['direct', 'fund', 'partnership', 'syndication'];
  if (!value || !validStructures.includes(value)) {
    return { isValid: false, error: 'Valid investment structure is required' };
  }
  return { isValid: true };
}

function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property value must be greater than 0' };
  }
  if (value > 1000000000) {
    return { isValid: false, error: 'Property value cannot exceed $1 billion' };
  }
  if (allInputs?.investmentAmount && allInputs.investmentAmount > value * 1.5) {
    return { isValid: false, error: 'Investment amount seems unusually high relative to property value' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any): ValidationResult {
  const validTypes = ['office', 'retail', 'industrial', 'multifamily', 'hotel', 'mixed_use', 'land', 'other'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Valid property type is required' };
  }
  return { isValid: true };
}

function validatePropertySize(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property size must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Property size cannot exceed 10 million sq ft' };
  }
  return { isValid: true };
}

function validateNumberOfUnits(value: any): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, error: 'Number of units must be 0 or greater' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Number of units cannot exceed 10,000' };
  }
  return { isValid: true };
}

function validateOpportunityZoneLocation(value: any): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Opportunity zone location is required' };
  }
  return { isValid: true };
}

function validateOpportunityZoneTier(value: any): ValidationResult {
  const validTiers = ['tier_1', 'tier_2', 'tier_3'];
  if (!value || !validTiers.includes(value)) {
    return { isValid: false, error: 'Valid opportunity zone tier is required' };
  }
  return { isValid: true };
}

function validateOriginalGainAmount(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Original gain amount must be greater than 0' };
  }
  if (value > 1000000000) {
    return { isValid: false, error: 'Original gain amount cannot exceed $1 billion' };
  }
  return { isValid: true };
}

function validateOriginalGainType(value: any): ValidationResult {
  const validTypes = ['capital_gain', 'ordinary_income', 'mixed'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Valid gain type is required' };
  }
  return { isValid: true };
}

function validateInvestorTaxRate(value: any): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, error: 'Investor tax rate must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Investor tax rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateStateTaxRate(value: any): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, error: 'State tax rate must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'State tax rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateLocalTaxRate(value: any): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, error: 'Local tax rate must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Local tax rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateInvestmentPeriod(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Investment period must be greater than 0' };
  }
  if (value > 30) {
    return { isValid: false, error: 'Investment period cannot exceed 30 years' };
  }
  return { isValid: true };
}

function validateDeferralPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, error: 'Deferral period must be 0 or greater' };
  }
  if (allInputs?.investmentPeriod && value > allInputs.investmentPeriod) {
    return { isValid: false, error: 'Deferral period cannot exceed investment period' };
  }
  return { isValid: true };
}

function validateExclusionPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, error: 'Exclusion period must be 0 or greater' };
  }
  if (allInputs?.investmentPeriod && value > allInputs.investmentPeriod) {
    return { isValid: false, error: 'Exclusion period cannot exceed investment period' };
  }
  if (allInputs?.deferralPeriod && value < allInputs.deferralPeriod) {
    return { isValid: false, error: 'Exclusion period should typically be longer than deferral period' };
  }
  return { isValid: true };
}

function validateBasisStepUpPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, error: 'Basis step-up period must be 0 or greater' };
  }
  if (allInputs?.investmentPeriod && value > allInputs.investmentPeriod) {
    return { isValid: false, error: 'Basis step-up period cannot exceed investment period' };
  }
  if (allInputs?.exclusionPeriod && value < allInputs.exclusionPeriod) {
    return { isValid: false, error: 'Basis step-up period should typically be longer than exclusion period' };
  }
  return { isValid: true };
}

function validateExpectedAnnualReturn(value: any): ValidationResult {
  if (value === undefined || value === null || value < -100) {
    return { isValid: false, error: 'Expected annual return must be -100% or greater' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'Expected annual return cannot exceed 1000%' };
  }
  return { isValid: true };
}

function validateExpectedAppreciation(value: any): ValidationResult {
  if (value === undefined || value === null || value < -100) {
    return { isValid: false, error: 'Expected appreciation must be -100% or greater' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'Expected appreciation cannot exceed 1000%' };
  }
  return { isValid: true };
}

function validateExpectedCashFlow(value: any): ValidationResult {
  if (value === undefined || value === null || value < -100) {
    return { isValid: false, error: 'Expected cash flow must be -100% or greater' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'Expected cash flow cannot exceed 1000%' };
  }
  return { isValid: true };
}

function validateExpectedExitValue(value: any): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Expected exit value must be greater than 0' };
  }
  if (value > 1000000000) {
    return { isValid: false, error: 'Expected exit value cannot exceed $1 billion' };
  }
  return { isValid: true };
}

function validateMarketLocation(value: any): ValidationResult {
  const validLocations = ['urban', 'suburban', 'rural'];
  if (!value || !validLocations.includes(value)) {
    return { isValid: false, error: 'Valid market location is required' };
  }
  return { isValid: true };
}

function validateMarketCondition(value: any): ValidationResult {
  const validConditions = ['declining', 'stable', 'growing'];
  if (!value || !validConditions.includes(value)) {
    return { isValid: false, error: 'Valid market condition is required' };
  }
  return { isValid: true };
}

function validateMarketGrowthRate(value: any): ValidationResult {
  if (value === undefined || value === null || value < -50) {
    return { isValid: false, error: 'Market growth rate must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Market growth rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateMarketRisk(value: any): ValidationResult {
  const validRisks = ['low', 'medium', 'high'];
  if (!value || !validRisks.includes(value)) {
    return { isValid: false, error: 'Valid market risk level is required' };
  }
  return { isValid: true };
}

function validateRegulatoryRisk(value: any): ValidationResult {
  const validRisks = ['low', 'medium', 'high'];
  if (!value || !validRisks.includes(value)) {
    return { isValid: false, error: 'Valid regulatory risk level is required' };
  }
  return { isValid: true };
}

function validateLiquidityRisk(value: any): ValidationResult {
  const validRisks = ['low', 'medium', 'high'];
  if (!value || !validRisks.includes(value)) {
    return { isValid: false, error: 'Valid liquidity risk level is required' };
  }
  return { isValid: true };
}

function validateDevelopmentRisk(value: any): ValidationResult {
  const validRisks = ['low', 'medium', 'high'];
  if (!value || !validRisks.includes(value)) {
    return { isValid: false, error: 'Valid development risk level is required' };
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
  if (value === undefined || value === null || value < -50) {
    return { isValid: false, error: 'Inflation rate must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Inflation rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateDiscountRate(value: any): ValidationResult {
  if (value === undefined || value === null || value < -100) {
    return { isValid: false, error: 'Discount rate must be -100% or greater' };
  }
  if (value > 1000) {
    return { isValid: false, error: 'Discount rate cannot exceed 1000%' };
  }
  return { isValid: true };
}

function validateTaxDeductionPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, error: 'Tax deduction period must be 0 or greater' };
  }
  if (allInputs?.investmentPeriod && value > allInputs.investmentPeriod) {
    return { isValid: false, error: 'Tax deduction period cannot exceed investment period' };
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

function validateTaxDeferral(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Tax deferral must be true or false' };
  }
  return { isValid: true };
}

function validateTaxExclusion(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Tax exclusion must be true or false' };
  }
  return { isValid: true };
}

function validateBasisStepUp(value: any): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Basis step-up must be true or false' };
  }
  return { isValid: true };
}

function validateDeferralPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, error: 'Deferral percentage must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Deferral percentage cannot exceed 100%' };
  }
  if (allInputs?.taxDeferral && value === 0) {
    return { isValid: false, error: 'Deferral percentage must be greater than 0 if tax deferral is enabled' };
  }
  return { isValid: true };
}

function validateExclusionPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, error: 'Exclusion percentage must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Exclusion percentage cannot exceed 100%' };
  }
  if (allInputs?.taxExclusion && value === 0) {
    return { isValid: false, error: 'Exclusion percentage must be greater than 0 if tax exclusion is enabled' };
  }
  return { isValid: true };
}

function validateBasisStepUpPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value < 0) {
    return { isValid: false, error: 'Basis step-up percentage must be 0 or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Basis step-up percentage cannot exceed 100%' };
  }
  if (allInputs?.basisStepUp && value === 0) {
    return { isValid: false, error: 'Basis step-up percentage must be greater than 0 if basis step-up is enabled' };
  }
  return { isValid: true };
}