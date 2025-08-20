import { QuickValidationResult } from '../../../types/QuickValidationResult';
import { RealEstateTaxDeductionsInputs } from './formulas';

export function quickValidateAllInputs(inputs: RealEstateTaxDeductionsInputs): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  results.push(quickValidatePropertyType(inputs.propertyType));
  results.push(quickValidatePurchasePrice(inputs.purchasePrice));
  results.push(quickValidateLandValue(inputs.landValue));
  results.push(quickValidateImprovements(inputs.improvements));
  results.push(quickValidateAcquisitionDate(inputs.acquisitionDate));
  results.push(quickValidatePlacedInServiceDate(inputs.placedInServiceDate));
  results.push(quickValidateAnnualRentalIncome(inputs.annualRentalIncome));
  results.push(quickValidateOperatingExpenses(inputs.operatingExpenses));
  results.push(quickValidatePropertyTaxes(inputs.propertyTaxes));
  results.push(quickValidateInsurance(inputs.insurance));
  results.push(quickValidateMortgageInterest(inputs.mortgageInterest));
  results.push(quickValidateManagementFees(inputs.managementFees));
  results.push(quickValidateRepairs(inputs.repairs));
  results.push(quickValidateUtilities(inputs.utilities));
  results.push(quickValidateAdvertising(inputs.advertising));
  results.push(quickValidateLegalFees(inputs.legalFees));
  results.push(quickValidateTravelExpenses(inputs.travelExpenses));
  results.push(quickValidateOtherExpenses(inputs.otherExpenses));
  results.push(quickValidatePersonalUseDays(inputs.personalUseDays));
  results.push(quickValidateRentalDays(inputs.rentalDays));
  results.push(quickValidateTaxYear(inputs.taxYear));
  results.push(quickValidateFilingStatus(inputs.filingStatus));
  results.push(quickValidateAdjustedGrossIncome(inputs.adjustedGrossIncome));
  results.push(quickValidateOtherPassiveIncome(inputs.otherPassiveIncome));
  results.push(quickValidateMaterialParticipation(inputs.materialParticipation));
  results.push(quickValidateRealEstateProfessional(inputs.realEstateProfessional));

  return results;
}

function quickValidatePropertyType(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'propertyType', status: 'error', message: 'Property type is required' };
  }
  
  const validTypes = ['residential', 'commercial', 'mixed_use', 'vacation_rental', 'short_term_rental', 'land'];
  if (!validTypes.includes(value)) {
    return { field: 'propertyType', status: 'error', message: 'Invalid property type' };
  }
  
  return { field: 'propertyType', status: 'success', message: 'Valid property type' };
}

function quickValidatePurchasePrice(value: number): QuickValidationResult {
  if (!value || value <= 0) {
    return { field: 'purchasePrice', status: 'error', message: 'Purchase price must be greater than 0' };
  }
  
  if (value > 100000000) {
    return { field: 'purchasePrice', status: 'warning', message: 'Very high purchase price - verify accuracy' };
  }
  
  return { field: 'purchasePrice', status: 'success', message: 'Valid purchase price' };
}

function quickValidateLandValue(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'landValue', status: 'error', message: 'Land value is required' };
  }
  
  if (value < 0) {
    return { field: 'landValue', status: 'error', message: 'Land value cannot be negative' };
  }
  
  return { field: 'landValue', status: 'success', message: 'Valid land value' };
}

function quickValidateImprovements(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'improvements', status: 'error', message: 'Improvements is required' };
  }
  
  if (value < 0) {
    return { field: 'improvements', status: 'error', message: 'Improvements cannot be negative' };
  }
  
  return { field: 'improvements', status: 'success', message: 'Valid improvements' };
}

function quickValidateAcquisitionDate(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'acquisitionDate', status: 'error', message: 'Acquisition date is required' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { field: 'acquisitionDate', status: 'error', message: 'Invalid date format' };
  }
  
  if (date > new Date()) {
    return { field: 'acquisitionDate', status: 'warning', message: 'Acquisition date is in the future' };
  }
  
  return { field: 'acquisitionDate', status: 'success', message: 'Valid acquisition date' };
}

function quickValidatePlacedInServiceDate(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'placedInServiceDate', status: 'error', message: 'Placed in service date is required' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { field: 'placedInServiceDate', status: 'error', message: 'Invalid date format' };
  }
  
  return { field: 'placedInServiceDate', status: 'success', message: 'Valid placed in service date' };
}

function quickValidateAnnualRentalIncome(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'annualRentalIncome', status: 'error', message: 'Annual rental income is required' };
  }
  
  if (value < 0) {
    return { field: 'annualRentalIncome', status: 'error', message: 'Annual rental income cannot be negative' };
  }
  
  return { field: 'annualRentalIncome', status: 'success', message: 'Valid annual rental income' };
}

function quickValidateOperatingExpenses(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'operatingExpenses', status: 'error', message: 'Operating expenses is required' };
  }
  
  if (value < 0) {
    return { field: 'operatingExpenses', status: 'error', message: 'Operating expenses cannot be negative' };
  }
  
  return { field: 'operatingExpenses', status: 'success', message: 'Valid operating expenses' };
}

function quickValidatePropertyTaxes(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'propertyTaxes', status: 'error', message: 'Property taxes is required' };
  }
  
  if (value < 0) {
    return { field: 'propertyTaxes', status: 'error', message: 'Property taxes cannot be negative' };
  }
  
  return { field: 'propertyTaxes', status: 'success', message: 'Valid property taxes' };
}

function quickValidateInsurance(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'insurance', status: 'error', message: 'Insurance is required' };
  }
  
  if (value < 0) {
    return { field: 'insurance', status: 'error', message: 'Insurance cannot be negative' };
  }
  
  return { field: 'insurance', status: 'success', message: 'Valid insurance' };
}

function quickValidateMortgageInterest(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'mortgageInterest', status: 'error', message: 'Mortgage interest is required' };
  }
  
  if (value < 0) {
    return { field: 'mortgageInterest', status: 'error', message: 'Mortgage interest cannot be negative' };
  }
  
  return { field: 'mortgageInterest', status: 'success', message: 'Valid mortgage interest' };
}

function quickValidateManagementFees(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'managementFees', status: 'error', message: 'Management fees is required' };
  }
  
  if (value < 0) {
    return { field: 'managementFees', status: 'error', message: 'Management fees cannot be negative' };
  }
  
  return { field: 'managementFees', status: 'success', message: 'Valid management fees' };
}

function quickValidateRepairs(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'repairs', status: 'error', message: 'Repairs is required' };
  }
  
  if (value < 0) {
    return { field: 'repairs', status: 'error', message: 'Repairs cannot be negative' };
  }
  
  return { field: 'repairs', status: 'success', message: 'Valid repairs' };
}

function quickValidateUtilities(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'utilities', status: 'error', message: 'Utilities is required' };
  }
  
  if (value < 0) {
    return { field: 'utilities', status: 'error', message: 'Utilities cannot be negative' };
  }
  
  return { field: 'utilities', status: 'success', message: 'Valid utilities' };
}

function quickValidateAdvertising(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'advertising', status: 'error', message: 'Advertising is required' };
  }
  
  if (value < 0) {
    return { field: 'advertising', status: 'error', message: 'Advertising cannot be negative' };
  }
  
  return { field: 'advertising', status: 'success', message: 'Valid advertising' };
}

function quickValidateLegalFees(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'legalFees', status: 'error', message: 'Legal fees is required' };
  }
  
  if (value < 0) {
    return { field: 'legalFees', status: 'error', message: 'Legal fees cannot be negative' };
  }
  
  return { field: 'legalFees', status: 'success', message: 'Valid legal fees' };
}

function quickValidateTravelExpenses(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'travelExpenses', status: 'error', message: 'Travel expenses is required' };
  }
  
  if (value < 0) {
    return { field: 'travelExpenses', status: 'error', message: 'Travel expenses cannot be negative' };
  }
  
  return { field: 'travelExpenses', status: 'success', message: 'Valid travel expenses' };
}

function quickValidateOtherExpenses(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'otherExpenses', status: 'error', message: 'Other expenses is required' };
  }
  
  if (value < 0) {
    return { field: 'otherExpenses', status: 'error', message: 'Other expenses cannot be negative' };
  }
  
  return { field: 'otherExpenses', status: 'success', message: 'Valid other expenses' };
}

function quickValidatePersonalUseDays(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'personalUseDays', status: 'error', message: 'Personal use days is required' };
  }
  
  if (value < 0 || value > 365) {
    return { field: 'personalUseDays', status: 'error', message: 'Personal use days must be between 0 and 365' };
  }
  
  return { field: 'personalUseDays', status: 'success', message: 'Valid personal use days' };
}

function quickValidateRentalDays(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'rentalDays', status: 'error', message: 'Rental days is required' };
  }
  
  if (value < 0 || value > 365) {
    return { field: 'rentalDays', status: 'error', message: 'Rental days must be between 0 and 365' };
  }
  
  return { field: 'rentalDays', status: 'success', message: 'Valid rental days' };
}

function quickValidateTaxYear(value: number): QuickValidationResult {
  if (!value) {
    return { field: 'taxYear', status: 'error', message: 'Tax year is required' };
  }
  
  if (value < 2020 || value > 2030) {
    return { field: 'taxYear', status: 'error', message: 'Tax year must be between 2020 and 2030' };
  }
  
  return { field: 'taxYear', status: 'success', message: 'Valid tax year' };
}

function quickValidateFilingStatus(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'filingStatus', status: 'error', message: 'Filing status is required' };
  }
  
  const validStatuses = ['single', 'married_joint', 'married_separate', 'head_of_household', 'qualifying_widow'];
  if (!validStatuses.includes(value)) {
    return { field: 'filingStatus', status: 'error', message: 'Invalid filing status' };
  }
  
  return { field: 'filingStatus', status: 'success', message: 'Valid filing status' };
}

function quickValidateAdjustedGrossIncome(value: number): QuickValidationResult {
  if (!value) {
    return { field: 'adjustedGrossIncome', status: 'error', message: 'Adjusted gross income is required' };
  }
  
  if (value < 0) {
    return { field: 'adjustedGrossIncome', status: 'error', message: 'Adjusted gross income cannot be negative' };
  }
  
  return { field: 'adjustedGrossIncome', status: 'success', message: 'Valid adjusted gross income' };
}

function quickValidateOtherPassiveIncome(value: number): QuickValidationResult {
  if (value === undefined || value === null) {
    return { field: 'otherPassiveIncome', status: 'error', message: 'Other passive income is required' };
  }
  
  if (value < -1000000 || value > 1000000) {
    return { field: 'otherPassiveIncome', status: 'warning', message: 'Other passive income seems unusually high or low' };
  }
  
  return { field: 'otherPassiveIncome', status: 'success', message: 'Valid other passive income' };
}

function quickValidateMaterialParticipation(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'materialParticipation', status: 'error', message: 'Material participation is required' };
  }
  
  const validValues = ['yes', 'no'];
  if (!validValues.includes(value)) {
    return { field: 'materialParticipation', status: 'error', message: 'Invalid material participation value' };
  }
  
  return { field: 'materialParticipation', status: 'success', message: 'Valid material participation' };
}

function quickValidateRealEstateProfessional(value: string): QuickValidationResult {
  if (!value) {
    return { field: 'realEstateProfessional', status: 'error', message: 'Real estate professional status is required' };
  }
  
  const validValues = ['yes', 'no'];
  if (!validValues.includes(value)) {
    return { field: 'realEstateProfessional', status: 'error', message: 'Invalid real estate professional value' };
  }
  
  return { field: 'realEstateProfessional', status: 'success', message: 'Valid real estate professional status' };
}