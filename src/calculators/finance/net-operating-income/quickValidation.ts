import { NetOperatingIncomeInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof NetOperatingIncomeInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'propertyValue': return validatePropertyValue(value, allInputs);
    case 'propertySize': return validatePropertySize(value, allInputs);
    case 'propertyAge': return validatePropertyAge(value, allInputs);
    case 'propertyType': return validatePropertyType(value, allInputs);
    case 'propertyClass': return validatePropertyClass(value, allInputs);
    case 'propertyCondition': return validatePropertyCondition(value, allInputs);
    case 'grossRentalIncome': return validateGrossRentalIncome(value, allInputs);
    case 'otherIncome': return validateOtherIncome(value, allInputs);
    case 'vacancyRate': return validateVacancyRate(value, allInputs);
    case 'creditLossRate': return validateCreditLossRate(value, allInputs);
    case 'lateFeeIncome': return validateLateFeeIncome(value, allInputs);
    case 'parkingIncome': return validateParkingIncome(value, allInputs);
    case 'storageIncome': return validateStorageIncome(value, allInputs);
    case 'laundryIncome': return validateLaundryIncome(value, allInputs);
    case 'vendingIncome': return validateVendingIncome(value, allInputs);
    case 'advertisingIncome': return validateAdvertisingIncome(value, allInputs);
    case 'utilityReimbursement': return validateUtilityReimbursement(value, allInputs);
    case 'petFees': return validatePetFees(value, allInputs);
    case 'applicationFees': return validateApplicationFees(value, allInputs);
    case 'leaseTerminationFees': return validateLeaseTerminationFees(value, allInputs);
    case 'otherMiscellaneousIncome': return validateOtherMiscellaneousIncome(value, allInputs);
    case 'propertyManagementFees': return validatePropertyManagementFees(value, allInputs);
    case 'propertyTaxes': return validatePropertyTaxes(value, allInputs);
    case 'propertyInsurance': return validatePropertyInsurance(value, allInputs);
    case 'utilities': return validateUtilities(value, allInputs);
    case 'maintenanceAndRepairs': return validateMaintenanceAndRepairs(value, allInputs);
    case 'landscaping': return validateLandscaping(value, allInputs);
    case 'janitorial': return validateJanitorial(value, allInputs);
    case 'security': return validateSecurity(value, allInputs);
    case 'pestControl': return validatePestControl(value, allInputs);
    case 'trashRemoval': return validateTrashRemoval(value, allInputs);
    case 'snowRemoval': return validateSnowRemoval(value, allInputs);
    case 'advertising': return validateAdvertising(value, allInputs);
    case 'legalFees': return validateLegalFees(value, allInputs);
    case 'accountingFees': return validateAccountingFees(value, allInputs);
    case 'professionalServices': return validateProfessionalServices(value, allInputs);
    case 'licensesAndPermits': return validateLicensesAndPermits(value, allInputs);
    case 'supplies': return validateSupplies(value, allInputs);
    case 'equipmentRental': return validateEquipmentRental(value, allInputs);
    case 'contractServices': return validateContractServices(value, allInputs);
    case 'otherOperatingExpenses': return validateOtherOperatingExpenses(value, allInputs);
    case 'roofReplacement': return validateRoofReplacement(value, allInputs);
    case 'hvacReplacement': return validateHvacReplacement(value, allInputs);
    case 'plumbingReplacement': return validatePlumbingReplacement(value, allInputs);
    case 'electricalReplacement': return validateElectricalReplacement(value, allInputs);
    case 'flooringReplacement': return validateFlooringReplacement(value, allInputs);
    case 'painting': return validatePainting(value, allInputs);
    case 'applianceReplacement': return validateApplianceReplacement(value, allInputs);
    case 'structuralRepairs': return validateStructuralRepairs(value, allInputs);
    case 'otherCapitalExpenditures': return validateOtherCapitalExpenditures(value, allInputs);
    case 'marketLocation': return validateMarketLocation(value, allInputs);
    case 'marketCondition': return validateMarketCondition(value, allInputs);
    case 'marketGrowthRate': return validateMarketGrowthRate(value, allInputs);
    case 'comparableNOI': return validateComparableNOI(value, allInputs);
    case 'comparableCapRate': return validateComparableCapRate(value, allInputs);
    case 'analysisPeriod': return validateAnalysisPeriod(value, allInputs);
    case 'inflationRate': return validateInflationRate(value, allInputs);
    case 'expenseGrowthRate': return validateExpenseGrowthRate(value, allInputs);
    case 'incomeGrowthRate': return validateIncomeGrowthRate(value, allInputs);
    case 'vacancyTrend': return validateVacancyTrend(value, allInputs);
    case 'currency': return validateCurrency(value, allInputs);
    case 'displayFormat': return validateDisplayFormat(value, allInputs);
    case 'includeCharts': return validateIncludeCharts(value, allInputs);
    default: return { isValid: true };
  }
}

function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property value must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Property value cannot exceed $100,000,000' };
  }
  if (allInputs?.grossRentalIncome && value > 0) {
    const incomeToValueRatio = allInputs.grossRentalIncome / value;
    if (incomeToValueRatio > 0.5) {
      return { isValid: false, error: 'Gross rental income seems unusually high relative to property value' };
    }
  }
  return { isValid: true };
}

function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property size must be greater than 0' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Property size cannot exceed 1,000,000 sq ft' };
  }
  return { isValid: true };
}

function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property age cannot be negative' };
  }
  if (value > 200) {
    return { isValid: false, error: 'Property age cannot exceed 200 years' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['residential', 'commercial', 'industrial', 'retail', 'office', 'multifamily', 'hotel', 'warehouse', 'land', 'other'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid property type' };
  }
  return { isValid: true };
}

function validatePropertyClass(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validClasses = ['class_a', 'class_b', 'class_c', 'class_d'];
  if (!validClasses.includes(value)) {
    return { isValid: false, error: 'Invalid property class' };
  }
  return { isValid: true };
}

function validatePropertyCondition(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validConditions = ['excellent', 'good', 'fair', 'poor'];
  if (!validConditions.includes(value)) {
    return { isValid: false, error: 'Invalid property condition' };
  }
  return { isValid: true };
}

function validateGrossRentalIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Gross rental income must be greater than or equal to 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Gross rental income cannot exceed $10,000,000' };
  }
  if (allInputs?.propertyValue && value > 0) {
    const incomeToValueRatio = value / allInputs.propertyValue;
    if (incomeToValueRatio > 0.5) {
      return { isValid: false, error: 'Gross rental income seems unusually high relative to property value' };
    }
  }
  return { isValid: true };
}

function validateOtherIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other income cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Other income cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateVacancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 100) {
    return { isValid: false, error: 'Vacancy rate must be between 0% and 100%' };
  }
  if (allInputs?.creditLossRate && value + allInputs.creditLossRate > 50) {
    return { isValid: false, error: 'Combined vacancy and credit loss rates cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateCreditLossRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 100) {
    return { isValid: false, error: 'Credit loss rate must be between 0% and 100%' };
  }
  if (allInputs?.vacancyRate && value + allInputs.vacancyRate > 50) {
    return { isValid: false, error: 'Combined vacancy and credit loss rates cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateLateFeeIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Late fee income cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Late fee income cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateParkingIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Parking income cannot be negative' };
  }
  if (value > 500000) {
    return { isValid: false, error: 'Parking income cannot exceed $500,000' };
  }
  return { isValid: true };
}

function validateStorageIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Storage income cannot be negative' };
  }
  if (value > 200000) {
    return { isValid: false, error: 'Storage income cannot exceed $200,000' };
  }
  return { isValid: true };
}

function validateLaundryIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Laundry income cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Laundry income cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateVendingIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Vending income cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Vending income cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateAdvertisingIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Advertising income cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Advertising income cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateUtilityReimbursement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Utility reimbursement cannot be negative' };
  }
  if (value > 500000) {
    return { isValid: false, error: 'Utility reimbursement cannot exceed $500,000' };
  }
  return { isValid: true };
}

function validatePetFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Pet fees cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Pet fees cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateApplicationFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Application fees cannot be negative' };
  }
  if (value > 25000) {
    return { isValid: false, error: 'Application fees cannot exceed $25,000' };
  }
  return { isValid: true };
}

function validateLeaseTerminationFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Lease termination fees cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Lease termination fees cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateOtherMiscellaneousIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other miscellaneous income cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Other miscellaneous income cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validatePropertyManagementFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property management fees cannot be negative' };
  }
  if (value > 500000) {
    return { isValid: false, error: 'Property management fees cannot exceed $500,000' };
  }
  return { isValid: true };
}

function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property taxes cannot be negative' };
  }
  if (value > 2000000) {
    return { isValid: false, error: 'Property taxes cannot exceed $2,000,000' };
  }
  return { isValid: true };
}

function validatePropertyInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property insurance cannot be negative' };
  }
  if (value > 500000) {
    return { isValid: false, error: 'Property insurance cannot exceed $500,000' };
  }
  return { isValid: true };
}

function validateUtilities(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Utilities cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Utilities cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateMaintenanceAndRepairs(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Maintenance and repairs cannot be negative' };
  }
  if (value > 500000) {
    return { isValid: false, error: 'Maintenance and repairs cannot exceed $500,000' };
  }
  return { isValid: true };
}

function validateLandscaping(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Landscaping cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Landscaping cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateJanitorial(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Janitorial cannot be negative' };
  }
  if (value > 200000) {
    return { isValid: false, error: 'Janitorial cannot exceed $200,000' };
  }
  return { isValid: true };
}

function validateSecurity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Security cannot be negative' };
  }
  if (value > 150000) {
    return { isValid: false, error: 'Security cannot exceed $150,000' };
  }
  return { isValid: true };
}

function validatePestControl(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Pest control cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Pest control cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateTrashRemoval(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Trash removal cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Trash removal cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateSnowRemoval(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Snow removal cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Snow removal cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateAdvertising(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Advertising cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Advertising cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateLegalFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Legal fees cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Legal fees cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateAccountingFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Accounting fees cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Accounting fees cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateProfessionalServices(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Professional services cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Professional services cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateLicensesAndPermits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Licenses and permits cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Licenses and permits cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateSupplies(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Supplies cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Supplies cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateEquipmentRental(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Equipment rental cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Equipment rental cannot exceed $50,000' };
  }
  return { isValid: true };
}

function validateContractServices(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Contract services cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Contract services cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateOtherOperatingExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other operating expenses cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Other operating expenses cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateRoofReplacement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Roof replacement cannot be negative' };
  }
  if (value > 500000) {
    return { isValid: false, error: 'Roof replacement cannot exceed $500,000' };
  }
  return { isValid: true };
}

function validateHvacReplacement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'HVAC replacement cannot be negative' };
  }
  if (value > 300000) {
    return { isValid: false, error: 'HVAC replacement cannot exceed $300,000' };
  }
  return { isValid: true };
}

function validatePlumbingReplacement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Plumbing replacement cannot be negative' };
  }
  if (value > 200000) {
    return { isValid: false, error: 'Plumbing replacement cannot exceed $200,000' };
  }
  return { isValid: true };
}

function validateElectricalReplacement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Electrical replacement cannot be negative' };
  }
  if (value > 150000) {
    return { isValid: false, error: 'Electrical replacement cannot exceed $150,000' };
  }
  return { isValid: true };
}

function validateFlooringReplacement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Flooring replacement cannot be negative' };
  }
  if (value > 200000) {
    return { isValid: false, error: 'Flooring replacement cannot exceed $200,000' };
  }
  return { isValid: true };
}

function validatePainting(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Painting cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Painting cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateApplianceReplacement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Appliance replacement cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Appliance replacement cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateStructuralRepairs(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Structural repairs cannot be negative' };
  }
  if (value > 500000) {
    return { isValid: false, error: 'Structural repairs cannot exceed $500,000' };
  }
  return { isValid: true };
}

function validateOtherCapitalExpenditures(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other capital expenditures cannot be negative' };
  }
  if (value > 200000) {
    return { isValid: false, error: 'Other capital expenditures cannot exceed $200,000' };
  }
  return { isValid: true };
}

function validateMarketLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validLocations = ['urban', 'suburban', 'rural'];
  if (!validLocations.includes(value)) {
    return { isValid: false, error: 'Invalid market location' };
  }
  return { isValid: true };
}

function validateMarketCondition(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validConditions = ['growing', 'stable', 'declining'];
  if (!validConditions.includes(value)) {
    return { isValid: false, error: 'Invalid market condition' };
  }
  return { isValid: true };
}

function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -20 || value > 50) {
    return { isValid: false, error: 'Market growth rate must be between -20% and 50%' };
  }
  return { isValid: true };
}

function validateComparableNOI(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Comparable NOI cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Comparable NOI cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

function validateComparableCapRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0 || value > 50) {
    return { isValid: false, error: 'Comparable cap rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 1 || value > 50) {
    return { isValid: false, error: 'Analysis period must be between 1 and 50 years' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -10 || value > 30) {
    return { isValid: false, error: 'Inflation rate must be between -10% and 30%' };
  }
  return { isValid: true };
}

function validateExpenseGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -10 || value > 30) {
    return { isValid: false, error: 'Expense growth rate must be between -10% and 30%' };
  }
  return { isValid: true };
}

function validateIncomeGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -10 || value > 30) {
    return { isValid: false, error: 'Income growth rate must be between -10% and 30%' };
  }
  return { isValid: true };
}

function validateVacancyTrend(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -20 || value > 20) {
    return { isValid: false, error: 'Vacancy trend must be between -20% and 20%' };
  }
  return { isValid: true };
}

function validateCurrency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return { isValid: false, error: 'Invalid currency' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validFormats = ['currency', 'percentage', 'number'];
  if (!validFormats.includes(value)) {
    return { isValid: false, error: 'Invalid display format' };
  }
  return { isValid: true };
}

function validateIncludeCharts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include charts must be a boolean value' };
  }
  return { isValid: true };
}