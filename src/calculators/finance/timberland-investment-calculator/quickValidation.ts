import { ValidationResult } from '../../../types/calculator';

export function validateAcreage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { acreage: 'Acreage must be greater than 0' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { acreage: 'Acreage cannot exceed 100,000 acres' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTimberType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { timberType: 'Timber type is required' } };
  }
  const validTypes = ['hardwood', 'softwood', 'mixed'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { timberType: 'Invalid timber type selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAgeOfTimber(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { ageOfTimber: 'Age of timber cannot be negative' } };
  }
  if (value > 100) {
    return { isValid: false, errors: { ageOfTimber: 'Age of timber cannot exceed 100 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTimberVolumePerAcre(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { timberVolumePerAcre: 'Timber volume per acre cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { timberVolumePerAcre: 'Timber volume per acre cannot exceed 10,000 units' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLandCostPerAcre(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { landCostPerAcre: 'Land cost per acre cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { landCostPerAcre: 'Land cost per acre cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTimberValuePerAcre(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { timberValuePerAcre: 'Timber value per acre cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { timberValuePerAcre: 'Timber value per acre cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTotalAcquisitionCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { totalAcquisitionCost: 'Total acquisition cost cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { totalAcquisitionCost: 'Total acquisition cost cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFinancingAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { financingAmount: 'Financing amount cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { financingAmount: 'Financing amount cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { loanTerm: 'Loan term must be between 0 and 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualManagementCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualManagementCost: 'Annual management cost cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { annualManagementCost: 'Annual management cost cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualInsuranceCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualInsuranceCost: 'Annual insurance cost cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { annualInsuranceCost: 'Annual insurance cost cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualPropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualPropertyTaxes: 'Annual property taxes cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { annualPropertyTaxes: 'Annual property taxes cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualMaintenanceCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualMaintenanceCost: 'Annual maintenance cost cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { annualMaintenanceCost: 'Annual maintenance cost cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHarvestingCostPerAcre(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { harvestingCostPerAcre: 'Harvesting cost per acre cannot be negative' } };
  }
  if (value > 1000) {
    return { isValid: false, errors: { harvestingCostPerAcre: 'Harvesting cost per acre cannot exceed $1,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTimberPricePerUnit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { timberPricePerUnit: 'Timber price per unit must be greater than $0' } };
  }
  if (value > 1000) {
    return { isValid: false, errors: { timberPricePerUnit: 'Timber price per unit cannot exceed $1,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { annualAppreciationRate: 'Annual appreciation rate must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHarvestCycleYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { harvestCycleYears: 'Harvest cycle years must be greater than 0' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { harvestCycleYears: 'Harvest cycle years cannot exceed 50' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedHarvestVolume(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { expectedHarvestVolume: 'Expected harvest volume cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { expectedHarvestVolume: 'Expected harvest volume cannot exceed 1,000,000 units' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period must be at least 1 year' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { discountRate: 'Discount rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -5 || value > 10) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between -5% and 10%' } };
  }
  return { isValid: true, errors: {} };
}