import { ValidationResult } from './validation';

export function validateInvestmentAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Investment amount is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Investment amount must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Investment amount must be greater than 0'], warnings: [] };
  }

  if (numValue < 10000) {
    return { isValid: true, errors: [], warnings: ['Investment amount is very low for Opportunity Zone investment'] };
  }

  if (numValue > 100000000) {
    return { isValid: true, errors: [], warnings: ['Investment amount is very high, consider diversification'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateInvestmentDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Investment date is required'], warnings: [] };
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: ['Investment date must be a valid date'], warnings: [] };
  }

  const today = new Date();
  if (date > today) {
    return { isValid: true, errors: [], warnings: ['Investment date is in the future'] };
  }

  // Check if investment is within 180 days of original gain
  if (allInputs?.originalGainDate) {
    const gainDate = new Date(allInputs.originalGainDate);
    const daysDifference = (date.getTime() - gainDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysDifference > 180) {
      return { isValid: false, errors: ['Investment must be made within 180 days of original gain recognition'], warnings: [] };
    }
    
    if (daysDifference < 0) {
      return { isValid: false, errors: ['Investment date cannot be before original gain date'], warnings: [] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateInvestmentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Investment type is required'], warnings: [] };
  }

  const validTypes = ['real_estate', 'business', 'infrastructure', 'mixed_use', 'development'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: ['Investment type must be one of: real_estate, business, infrastructure, mixed_use, development'], warnings: [] };
  }

  if (value === 'development') {
    return { isValid: true, errors: [], warnings: ['Development investments carry higher risk and longer timelines'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateInvestmentStructure(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Investment structure is required'], warnings: [] };
  }

  const validStructures = ['direct', 'fund', 'partnership', 'syndication'];
  if (!validStructures.includes(value)) {
    return { isValid: false, errors: ['Investment structure must be one of: direct, fund, partnership, syndication'], warnings: [] };
  }

  if (value === 'direct') {
    return { isValid: true, errors: [], warnings: ['Direct investments require more active management'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property value must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Property value must be greater than 0'], warnings: [] };
  }

  // Check if investment amount exceeds property value
  if (allInputs?.investmentAmount && numValue < allInputs.investmentAmount) {
    return { isValid: true, errors: [], warnings: ['Investment amount exceeds property value'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property address is required'], warnings: [] };
  }

  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, errors: ['Property address must be a non-empty string'], warnings: [] };
  }

  if (value.trim().length < 10) {
    return { isValid: true, errors: [], warnings: ['Property address seems incomplete'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property type is required'], warnings: [] };
  }

  const validTypes = ['office', 'retail', 'industrial', 'multifamily', 'hotel', 'mixed_use', 'land', 'other'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: ['Property type must be one of: office, retail, industrial, multifamily, hotel, mixed_use, land, other'], warnings: [] };
  }

  if (value === 'land') {
    return { isValid: true, errors: [], warnings: ['Land investments may have longer development timelines'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property size is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property size must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Property size must be greater than 0'], warnings: [] };
  }

  if (numValue < 1000) {
    return { isValid: true, errors: [], warnings: ['Property size is very small'] };
  }

  if (numValue > 1000000) {
    return { isValid: true, errors: [], warnings: ['Property size is very large'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property age is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property age must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Property age cannot be negative'], warnings: [] };
  }

  if (numValue > 100) {
    return { isValid: true, errors: [], warnings: ['Property age is very high, may require significant maintenance'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateNumberOfUnits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Number of units is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Number of units must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Number of units cannot be negative'], warnings: [] };
  }

  if (numValue === 0 && allInputs?.propertyType !== 'land') {
    return { isValid: true, errors: [], warnings: ['Zero units may not be appropriate for this property type'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateOpportunityZoneLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Opportunity Zone location is required'], warnings: [] };
  }

  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, errors: ['Opportunity Zone location must be a non-empty string'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateOpportunityZoneTier(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Opportunity Zone tier is required'], warnings: [] };
  }

  const validTiers = ['tier_1', 'tier_2', 'tier_3'];
  if (!validTiers.includes(value)) {
    return { isValid: false, errors: ['Opportunity Zone tier must be one of: tier_1, tier_2, tier_3'], warnings: [] };
  }

  if (value === 'tier_1') {
    return { isValid: true, errors: [], warnings: ['Tier 1 zones offer maximum tax benefits'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateOriginalGainAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Original gain amount is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Original gain amount must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Original gain amount must be greater than 0'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateOriginalGainDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Original gain date is required'], warnings: [] };
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: ['Original gain date must be a valid date'], warnings: [] };
  }

  const today = new Date();
  if (date > today) {
    return { isValid: false, errors: ['Original gain date cannot be in the future'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateInvestorTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Investor tax rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Investor tax rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['Investor tax rate must be between 0 and 1'], warnings: [] };
  }

  if (numValue > 0.5) {
    return { isValid: true, errors: [], warnings: ['High tax rate increases tax benefit value'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['State tax rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['State tax rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['State tax rate must be between 0 and 1'], warnings: [] };
  }

  // Check total tax rate
  if (allInputs?.investorTaxRate && allInputs?.localTaxRate) {
    const totalRate = numValue + allInputs.investorTaxRate + allInputs.localTaxRate;
    if (totalRate > 1) {
      return { isValid: false, errors: ['Total tax rate (federal + state + local) cannot exceed 100%'], warnings: [] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateLocalTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Local tax rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Local tax rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['Local tax rate must be between 0 and 1'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateInvestmentPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Investment period is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Investment period must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Investment period must be greater than 0'], warnings: [] };
  }

  if (numValue < 5) {
    return { isValid: true, errors: [], warnings: ['Investment period less than 5 years may not qualify for basis step-up benefits'] };
  }

  if (numValue < 10) {
    return { isValid: true, errors: [], warnings: ['Investment period less than 10 years may not qualify for full tax exclusion benefits'] };
  }

  if (numValue > 30) {
    return { isValid: true, errors: [], warnings: ['Very long investment period may impact liquidity'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Expected annual return is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Expected annual return must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Expected annual return cannot be negative'], warnings: [] };
  }

  if (numValue > 0.5) {
    return { isValid: true, errors: [], warnings: ['Expected annual return is very high, may be unrealistic'] };
  }

  if (numValue < 0.05) {
    return { isValid: true, errors: [], warnings: ['Expected annual return is very low'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateExpectedAppreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Expected appreciation is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Expected appreciation must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Expected appreciation cannot be negative'], warnings: [] };
  }

  if (numValue > 0.3) {
    return { isValid: true, errors: [], warnings: ['Expected appreciation is very high, may be unrealistic'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateExpectedExitValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Expected exit value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Expected exit value must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Expected exit value must be greater than 0'], warnings: [] };
  }

  if (allInputs?.investmentAmount && numValue < allInputs.investmentAmount) {
    return { isValid: true, errors: [], warnings: ['Expected exit value is less than investment amount'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Market growth rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Market growth rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Market growth rate cannot be negative'], warnings: [] };
  }

  if (numValue > 0.5) {
    return { isValid: true, errors: [], warnings: ['Market growth rate is very high, may be unrealistic'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Discount rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Discount rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Discount rate cannot be negative'], warnings: [] };
  }

  if (numValue > 0.3) {
    return { isValid: true, errors: [], warnings: ['Discount rate is very high'] };
  }

  if (numValue < 0.05) {
    return { isValid: true, errors: [], warnings: ['Discount rate is very low'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}