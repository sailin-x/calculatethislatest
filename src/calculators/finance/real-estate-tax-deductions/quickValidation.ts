import { RealEstateTaxDeductionsInputs } from './types';

export interface QuickValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof RealEstateTaxDeductionsInputs, value: any, allInputs: RealEstateTaxDeductionsInputs): QuickValidationResult {
  switch (field) {
    case 'propertyType':
      return validatePropertyType(value);
    case 'propertyValue':
      return validatePropertyValue(value, allInputs);
    case 'acquisitionDate':
      return validateAcquisitionDate(value);
    case 'placedInServiceDate':
      return validatePlacedInServiceDate(value);
    case 'propertyUse':
      return validatePropertyUse(value);
    case 'personalUsePercentage':
      return validatePersonalUsePercentage(value);
    case 'rentalIncome':
      return validateRentalIncome(value, allInputs);
    case 'otherIncome':
      return validateOtherIncome(value);
    case 'totalIncome':
      return validateTotalIncome(value, allInputs);
    case 'filingStatus':
      return validateFilingStatus(value);
    case 'taxYear':
      return validateTaxYear(value);
    case 'mortgageInterest':
      return validateMortgageInterest(value, allInputs);
    case 'propertyTaxes':
      return validatePropertyTaxes(value, allInputs);
    case 'insurance':
      return validateInsurance(value);
    case 'utilities':
      return validateUtilities(value);
    case 'maintenance':
      return validateMaintenance(value);
    case 'repairs':
      return validateRepairs(value);
    case 'propertyManagement':
      return validatePropertyManagement(value);
    case 'advertising':
      return validateAdvertising(value);
    case 'legalFees':
      return validateLegalFees(value);
    case 'accountingFees':
      return validateAccountingFees(value);
    case 'travelExpenses':
      return validateTravelExpenses(value);
    case 'homeOfficeExpenses':
      return validateHomeOfficeExpenses(value);
    case 'otherExpenses':
      return validateOtherExpenses(value);
    case 'landValue':
      return validateLandValue(value, allInputs);
    case 'buildingValue':
      return validateBuildingValue(value, allInputs);
    case 'improvementsValue':
      return validateImprovementsValue(value, allInputs);
    case 'depreciationMethod':
      return validateDepreciationMethod(value);
    case 'recoveryPeriod':
      return validateRecoveryPeriod(value);
    case 'bonusDepreciationPercentage':
      return validateBonusDepreciationPercentage(value, allInputs);
    case 'section179Amount':
      return validateSection179Amount(value, allInputs);
    case 'stateTaxRate':
      return validateStateTaxRate(value);
    case 'localTaxRate':
      return validateLocalTaxRate(value);
    case 'stateDeductions':
      return validateStateDeductions(value);
    case 'localDeductions':
      return validateLocalDeductions(value);
    case 'casualtyLosses':
      return validateCasualtyLosses(value);
    case 'theftLosses':
      return validateTheftLosses(value);
    case 'casualtyGains':
      return validateCasualtyGains(value);
    case 'netOperatingLoss':
      return validateNetOperatingLoss(value);
    case 'energyEfficientImprovements':
      return validateEnergyEfficientImprovements(value);
    case 'renewableEnergyCredits':
      return validateRenewableEnergyCredits(value);
    case 'lowIncomeHousingCredits':
      return validateLowIncomeHousingCredits(value);
    case 'historicRehabilitationCredits':
      return validateHistoricRehabilitationCredits(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    default:
      return { isValid: true };
  }
}

function validatePropertyType(value: any): QuickValidationResult {
  const validTypes = ['residential', 'commercial', 'mixed-use', 'industrial', 'rental', 'vacation-home', 'investment'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid property type' };
  }
  return { isValid: true };
}

function validatePropertyValue(value: any, allInputs: RealEstateTaxDeductionsInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Property value must be greater than 0' };
  }

  // Cross-field validation with property components
  const totalComponents = allInputs.landValue + allInputs.buildingValue + allInputs.improvementsValue;
  if (totalComponents > numValue * 1.1) {
    return { isValid: false, error: 'Land + Building + Improvements cannot exceed property value by more than 10%' };
  }

  return { isValid: true };
}

function validateAcquisitionDate(value: any): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Acquisition date is required' };
  }
  const acquisitionDate = new Date(value);
  const today = new Date();
  if (acquisitionDate > today) {
    return { isValid: false, error: 'Acquisition date cannot be in the future' };
  }
  return { isValid: true };
}

function validatePlacedInServiceDate(value: any): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Placed in service date is required' };
  }
  const placedInServiceDate = new Date(value);
  const today = new Date();
  if (placedInServiceDate > today) {
    return { isValid: false, error: 'Placed in service date cannot be in the future' };
  }
  return { isValid: true };
}

function validatePropertyUse(value: any): QuickValidationResult {
  const validUses = ['personal', 'rental', 'business', 'mixed'];
  if (!validUses.includes(value)) {
    return { isValid: false, error: 'Invalid property use' };
  }
  return { isValid: true };
}

function validatePersonalUsePercentage(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Personal use percentage must be between 0% and 100%' };
  }
  return { isValid: true };
}

function validateRentalIncome(value: any, allInputs: RealEstateTaxDeductionsInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Rental income cannot be negative' };
  }

  // Cross-field validation with property use
  if (numValue === 0 && allInputs.propertyUse === 'rental') {
    return { isValid: false, error: 'Rental income should be provided for rental properties' };
  }

  return { isValid: true };
}

function validateOtherIncome(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Other income cannot be negative' };
  }
  return { isValid: true };
}

function validateTotalIncome(value: any, allInputs: RealEstateTaxDeductionsInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Total income cannot be negative' };
  }

  // Cross-field validation with rental and other income
  const calculatedTotal = allInputs.rentalIncome + allInputs.otherIncome;
  if (Math.abs(calculatedTotal - numValue) > 1) {
    return { isValid: false, error: 'Total income should equal rental income + other income' };
  }

  return { isValid: true };
}

function validateFilingStatus(value: any): QuickValidationResult {
  const validStatuses = ['single', 'married-filing-jointly', 'married-filing-separately', 'head-of-household', 'qualifying-widow'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, error: 'Invalid filing status' };
  }
  return { isValid: true };
}

function validateTaxYear(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 2018 || numValue > 2030) {
    return { isValid: false, error: 'Tax year must be between 2018 and 2030' };
  }
  return { isValid: true };
}

function validateMortgageInterest(value: any, allInputs: RealEstateTaxDeductionsInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Mortgage interest cannot be negative' };
  }

  // Cross-field validation with property value
  if (numValue > 0 && allInputs.propertyValue === 0) {
    return { isValid: false, error: 'Property value should be provided when mortgage interest is claimed' };
  }

  return { isValid: true };
}

function validatePropertyTaxes(value: any, allInputs: RealEstateTaxDeductionsInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Property taxes cannot be negative' };
  }

  // Cross-field validation with property value
  if (numValue > 0 && allInputs.propertyValue === 0) {
    return { isValid: false, error: 'Property value should be provided when property taxes are claimed' };
  }

  return { isValid: true };
}

function validateInsurance(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Insurance cannot be negative' };
  }
  return { isValid: true };
}

function validateUtilities(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Utilities cannot be negative' };
  }
  return { isValid: true };
}

function validateMaintenance(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Maintenance cannot be negative' };
  }
  return { isValid: true };
}

function validateRepairs(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Repairs cannot be negative' };
  }
  return { isValid: true };
}

function validatePropertyManagement(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Property management cannot be negative' };
  }
  return { isValid: true };
}

function validateAdvertising(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Advertising cannot be negative' };
  }
  return { isValid: true };
}

function validateLegalFees(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Legal fees cannot be negative' };
  }
  return { isValid: true };
}

function validateAccountingFees(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Accounting fees cannot be negative' };
  }
  return { isValid: true };
}

function validateTravelExpenses(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Travel expenses cannot be negative' };
  }
  return { isValid: true };
}

function validateHomeOfficeExpenses(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Home office expenses cannot be negative' };
  }
  return { isValid: true };
}

function validateOtherExpenses(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Other expenses cannot be negative' };
  }
  return { isValid: true };
}

function validateLandValue(value: any, allInputs: RealEstateTaxDeductionsInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Land value cannot be negative' };
  }

  // Cross-field validation with property value
  const totalComponents = numValue + allInputs.buildingValue + allInputs.improvementsValue;
  if (totalComponents > allInputs.propertyValue * 1.1) {
    return { isValid: false, error: 'Land + Building + Improvements cannot exceed property value by more than 10%' };
  }

  return { isValid: true };
}

function validateBuildingValue(value: any, allInputs: RealEstateTaxDeductionsInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Building value cannot be negative' };
  }

  // Cross-field validation with property value
  const totalComponents = allInputs.landValue + numValue + allInputs.improvementsValue;
  if (totalComponents > allInputs.propertyValue * 1.1) {
    return { isValid: false, error: 'Land + Building + Improvements cannot exceed property value by more than 10%' };
  }

  return { isValid: true };
}

function validateImprovementsValue(value: any, allInputs: RealEstateTaxDeductionsInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Improvements value cannot be negative' };
  }

  // Cross-field validation with property value
  const totalComponents = allInputs.landValue + allInputs.buildingValue + numValue;
  if (totalComponents > allInputs.propertyValue * 1.1) {
    return { isValid: false, error: 'Land + Building + Improvements cannot exceed property value by more than 10%' };
  }

  return { isValid: true };
}

function validateDepreciationMethod(value: any): QuickValidationResult {
  const validMethods = ['straight-line', 'declining-balance', 'sum-of-years-digits'];
  if (!validMethods.includes(value)) {
    return { isValid: false, error: 'Invalid depreciation method' };
  }
  return { isValid: true };
}

function validateRecoveryPeriod(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 50) {
    return { isValid: false, error: 'Recovery period must be between 1 and 50 years' };
  }
  return { isValid: true };
}

function validateBonusDepreciationPercentage(value: any, allInputs: RealEstateTaxDeductionsInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Bonus depreciation percentage must be between 0% and 100%' };
  }

  // Cross-field validation with bonus depreciation eligibility
  if (allInputs.bonusDepreciationEligible && numValue === 0) {
    return { isValid: false, error: 'Bonus depreciation percentage should be provided when eligible' };
  }

  return { isValid: true };
}

function validateSection179Amount(value: any, allInputs: RealEstateTaxDeductionsInputs): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Section 179 amount cannot be negative' };
  }

  // Cross-field validation with Section 179 eligibility
  if (allInputs.section179Eligible && numValue === 0) {
    return { isValid: false, error: 'Section 179 amount should be provided when eligible' };
  }

  return { isValid: true };
}

function validateStateTaxRate(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 15) {
    return { isValid: false, error: 'State tax rate must be between 0% and 15%' };
  }
  return { isValid: true };
}

function validateLocalTaxRate(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 10) {
    return { isValid: false, error: 'Local tax rate must be between 0% and 10%' };
  }
  return { isValid: true };
}

function validateStateDeductions(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'State deductions cannot be negative' };
  }
  return { isValid: true };
}

function validateLocalDeductions(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Local deductions cannot be negative' };
  }
  return { isValid: true };
}

function validateCasualtyLosses(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Casualty losses cannot be negative' };
  }
  return { isValid: true };
}

function validateTheftLosses(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Theft losses cannot be negative' };
  }
  return { isValid: true };
}

function validateCasualtyGains(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Casualty gains cannot be negative' };
  }
  return { isValid: true };
}

function validateNetOperatingLoss(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Net operating loss cannot be negative' };
  }
  return { isValid: true };
}

function validateEnergyEfficientImprovements(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Energy efficient improvements cannot be negative' };
  }
  return { isValid: true };
}

function validateRenewableEnergyCredits(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Renewable energy credits cannot be negative' };
  }
  return { isValid: true };
}

function validateLowIncomeHousingCredits(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Low income housing credits cannot be negative' };
  }
  return { isValid: true };
}

function validateHistoricRehabilitationCredits(value: any): QuickValidationResult {
  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Historic rehabilitation credits cannot be negative' };
  }
  return { isValid: true };
}

function validateCurrency(value: any): QuickValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return { isValid: false, error: 'Invalid currency' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any): QuickValidationResult {
  const validFormats = ['currency', 'percentage', 'decimal'];
  if (!validFormats.includes(value)) {
    return { isValid: false, error: 'Invalid display format' };
  }
  return { isValid: true };
}