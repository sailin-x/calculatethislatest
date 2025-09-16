import { ValidationResult } from '../../../types/calculator';

export function validateTotalGrossEstate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 10000) {
    return { isValid: false, errors: { totalGrossEstate: 'Total gross estate must be at least $10,000' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { totalGrossEstate: 'Total gross estate cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateProbateAssets(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { probateAssets: 'Probate assets cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { probateAssets: 'Probate assets cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNonProbateAssets(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { nonProbateAssets: 'Non-probate assets cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { nonProbateAssets: 'Non-probate assets cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateJointlyOwnedAssets(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { jointlyOwnedAssets: 'Jointly owned assets cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { jointlyOwnedAssets: 'Jointly owned assets cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLifeInsuranceProceeds(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { lifeInsuranceProceeds: 'Life insurance proceeds cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { lifeInsuranceProceeds: 'Life insurance proceeds cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRetirementAccounts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { retirementAccounts: 'Retirement accounts cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { retirementAccounts: 'Retirement accounts cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBusinessInterests(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { businessInterests: 'Business interests cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { businessInterests: 'Business interests cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRealEstateValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { realEstateValue: 'Real estate value cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { realEstateValue: 'Real estate value cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePersonalPropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { personalPropertyValue: 'Personal property value cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { personalPropertyValue: 'Personal property value cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInvestmentAccounts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { investmentAccounts: 'Investment accounts cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { investmentAccounts: 'Investment accounts cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCashAndEquivalents(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { cashAndEquivalents: 'Cash and equivalents cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { cashAndEquivalents: 'Cash and equivalents cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFuneralExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { funeralExpenses: 'Funeral expenses cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { funeralExpenses: 'Funeral expenses cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMedicalExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { medicalExpenses: 'Medical expenses cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { medicalExpenses: 'Medical expenses cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEstateTaxesPaid(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { estateTaxesPaid: 'Estate taxes paid cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { estateTaxesPaid: 'Estate taxes paid cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAdministrativeExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { administrativeExpenses: 'Administrative expenses cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { administrativeExpenses: 'Administrative expenses cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDebtsAndLiabilities(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { debtsAndLiabilities: 'Debts and liabilities cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { debtsAndLiabilities: 'Debts and liabilities cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCharitableBequests(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { charitableBequests: 'Charitable bequests cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { charitableBequests: 'Charitable bequests cannot exceed $1,000,000,000' } };
  }

  // Check against total estate value
  if (allInputs?.totalGrossEstate && value > allInputs.totalGrossEstate) {
    return { isValid: false, errors: { charitableBequests: 'Charitable bequests cannot exceed total estate value' } };
  }

  return { isValid: true, errors: {} };
}

export function validateMaritalDeduction(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { maritalDeduction: 'Marital deduction cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { maritalDeduction: 'Marital deduction cannot exceed $1,000,000,000' } };
  }

  // Check against total estate value
  if (allInputs?.totalGrossEstate && value > allInputs.totalGrossEstate) {
    return { isValid: false, errors: { maritalDeduction: 'Marital deduction cannot exceed total estate value' } };
  }

  return { isValid: true, errors: {} };
}

export function validateAnnualExclusionGifts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualExclusionGifts: 'Annual exclusion gifts cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { annualExclusionGifts: 'Annual exclusion gifts cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLifetimeExclusionUsed(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { lifetimeExclusionUsed: 'Lifetime exclusion used cannot be negative' } };
  }
  if (value > 13800000) {
    return { isValid: false, errors: { lifetimeExclusionUsed: 'Lifetime exclusion used cannot exceed $13,800,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSurvivingSpouse(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { survivingSpouse: 'Surviving spouse must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSurvivingChildren(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { survivingChildren: 'Surviving children cannot be negative' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { survivingChildren: 'Surviving children cannot exceed 20' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSurvivingGrandchildren(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { survivingGrandchildren: 'Surviving grandchildren cannot be negative' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { survivingGrandchildren: 'Surviving grandchildren cannot exceed 50' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCharitableOrganizations(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { charitableOrganizations: 'Charitable organizations cannot be negative' } };
  }
  if (value > 100) {
    return { isValid: false, errors: { charitableOrganizations: 'Charitable organizations cannot exceed 100' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFederalEstateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { federalEstateTaxRate: 'Federal estate tax rate cannot be negative' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { federalEstateTaxRate: 'Federal estate tax rate cannot exceed 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStateEstateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { stateEstateTaxRate: 'State estate tax rate cannot be negative' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { stateEstateTaxRate: 'State estate tax rate cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGenerationSkippingTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { generationSkippingTaxRate: 'Generation skipping tax rate cannot be negative' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { generationSkippingTaxRate: 'Generation skipping tax rate cannot exceed 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasStateEstateTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasStateEstateTax: 'Has state estate tax must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUsePortability(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { usePortability: 'Use portability must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUseUnifiedCredit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { useUnifiedCredit: 'Use unified credit must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUseQTIPTrust(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { useQTIPTrust: 'Use QTIP trust must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUseCreditShelterTrust(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { useCreditShelterTrust: 'Use credit shelter trust must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUseLifeInsuranceTrust(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { useLifeInsuranceTrust: 'Use life insurance trust must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateConsiderGiftingStrategy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { considerGiftingStrategy: 'Consider gifting strategy must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualGiftingAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualGiftingAmount: 'Annual gifting amount cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { annualGiftingAmount: 'Annual gifting amount cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMarketVolatility(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { marketVolatility: 'Market volatility cannot be negative' } };
  }
  if (value > 100) {
    return { isValid: false, errors: { marketVolatility: 'Market volatility cannot exceed 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLegislativeRisk(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { legislativeRisk: 'Legislative risk cannot be negative' } };
  }
  if (value > 100) {
    return { isValid: false, errors: { legislativeRisk: 'Legislative risk cannot exceed 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFamilyRisk(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { familyRisk: 'Family risk cannot be negative' } };
  }
  if (value > 100) {
    return { isValid: false, errors: { familyRisk: 'Family risk cannot exceed 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateValuationRisk(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { valuationRisk: 'Valuation risk cannot be negative' } };
  }
  if (value > 100) {
    return { isValid: false, errors: { valuationRisk: 'Valuation risk cannot exceed 100%' } };
  }
  return { isValid: true, errors: {} };
}