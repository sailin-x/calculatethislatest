import { NetOperatingIncomeInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateNetOperatingIncomeInputs(inputs: NetOperatingIncomeInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Property Information Validation
  if (!inputs.propertyName || inputs.propertyName.trim().length === 0) {
    errors.push('Property name is required');
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.push('Property address is required');
  }

  if (!inputs.propertyType || !['office', 'retail', 'industrial', 'multifamily', 'hotel', 'mixed_use', 'land', 'other'].includes(inputs.propertyType)) {
    errors.push('Invalid property type');
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.push('Property size must be greater than 0');
  }

  if (inputs.propertyAge < 0) {
    errors.push('Property age cannot be negative');
  }

  if (!inputs.numberOfUnits || inputs.numberOfUnits <= 0) {
    errors.push('Number of units must be greater than 0');
  }

  if (inputs.occupancyRate < 0 || inputs.occupancyRate > 100) {
    errors.push('Occupancy rate must be between 0% and 100%');
  }

  // Revenue Information Validation
  if (inputs.grossRentalIncome < 0) {
    errors.push('Gross rental income cannot be negative');
  }

  if (inputs.otherIncome < 0) {
    errors.push('Other income cannot be negative');
  }

  if (inputs.parkingIncome < 0) {
    errors.push('Parking income cannot be negative');
  }

  if (inputs.laundryIncome < 0) {
    errors.push('Laundry income cannot be negative');
  }

  if (inputs.storageIncome < 0) {
    errors.push('Storage income cannot be negative');
  }

  if (inputs.amenityIncome < 0) {
    errors.push('Amenity income cannot be negative');
  }

  if (inputs.lateFees < 0) {
    errors.push('Late fees cannot be negative');
  }

  if (inputs.applicationFees < 0) {
    errors.push('Application fees cannot be negative');
  }

  if (inputs.petFees < 0) {
    errors.push('Pet fees cannot be negative');
  }

  if (inputs.otherFees < 0) {
    errors.push('Other fees cannot be negative');
  }

  // Operating Expenses Validation
  if (inputs.propertyManagementFee < 0) {
    errors.push('Property management fee cannot be negative');
  }

  if (inputs.propertyManagementRate < 0 || inputs.propertyManagementRate > 20) {
    errors.push('Property management rate must be between 0% and 20%');
  }

  if (inputs.propertyTaxes < 0) {
    errors.push('Property taxes cannot be negative');
  }

  if (inputs.propertyInsurance < 0) {
    errors.push('Property insurance cannot be negative');
  }

  if (inputs.utilities < 0) {
    errors.push('Utilities cannot be negative');
  }

  if (inputs.maintenance < 0) {
    errors.push('Maintenance costs cannot be negative');
  }

  if (inputs.repairs < 0) {
    errors.push('Repair costs cannot be negative');
  }

  if (inputs.landscaping < 0) {
    errors.push('Landscaping costs cannot be negative');
  }

  if (inputs.janitorial < 0) {
    errors.push('Janitorial costs cannot be negative');
  }

  if (inputs.security < 0) {
    errors.push('Security costs cannot be negative');
  }

  if (inputs.advertising < 0) {
    errors.push('Advertising costs cannot be negative');
  }

  if (inputs.legalFees < 0) {
    errors.push('Legal fees cannot be negative');
  }

  if (inputs.accountingFees < 0) {
    errors.push('Accounting fees cannot be negative');
  }

  if (inputs.otherExpenses < 0) {
    errors.push('Other expenses cannot be negative');
  }

  // Vacancy and Collection Loss Validation
  if (inputs.vacancyRate < 0 || inputs.vacancyRate > 100) {
    errors.push('Vacancy rate must be between 0% and 100%');
  }

  if (inputs.collectionLossRate < 0 || inputs.collectionLossRate > 100) {
    errors.push('Collection loss rate must be between 0% and 100%');
  }

  if (inputs.badDebtExpense < 0) {
    errors.push('Bad debt expense cannot be negative');
  }

  // Market Information Validation
  if (!inputs.marketLocation || inputs.marketLocation.trim().length === 0) {
    errors.push('Market location is required');
  }

  if (!inputs.marketCondition || !['declining', 'stable', 'growing', 'hot'].includes(inputs.marketCondition)) {
    errors.push('Invalid market condition');
  }

  if (inputs.marketGrowthRate < -20 || inputs.marketGrowthRate > 50) {
    errors.push('Market growth rate must be between -20% and 50%');
  }

  // Property Value Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 30) {
    errors.push('Analysis period must be between 1 and 30 years');
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 30) {
    errors.push('Discount rate must be between 0% and 30%');
  }

  // Cross-field validation
  const totalGrossIncome = inputs.grossRentalIncome + inputs.otherIncome + inputs.parkingIncome + 
                          inputs.laundryIncome + inputs.storageIncome + inputs.amenityIncome + 
                          inputs.lateFees + inputs.applicationFees + inputs.petFees + inputs.otherFees;

  if (totalGrossIncome <= 0) {
    warnings.push('Total gross income is zero or negative');
  }

  if (inputs.occupancyRate < 80) {
    warnings.push('Low occupancy rate may indicate market or management issues');
  }

  if (inputs.vacancyRate > 15) {
    warnings.push('High vacancy rate may indicate market or property issues');
  }

  if (inputs.collectionLossRate > 5) {
    warnings.push('High collection loss rate may indicate tenant screening issues');
  }

  const totalOperatingExpenses = (inputs.propertyManagementRate > 0 ? inputs.grossRentalIncome * (inputs.propertyManagementRate / 100) : inputs.propertyManagementFee) +
                                inputs.propertyTaxes + inputs.propertyInsurance + inputs.utilities + inputs.maintenance +
                                inputs.repairs + inputs.landscaping + inputs.janitorial + inputs.security +
                                inputs.advertising + inputs.legalFees + inputs.accountingFees + inputs.otherExpenses +
                                inputs.badDebtExpense;

  if (totalOperatingExpenses > totalGrossIncome) {
    warnings.push('Operating expenses exceed gross income');
  }

  const expenseRatio = totalGrossIncome > 0 ? (totalOperatingExpenses / totalGrossIncome) * 100 : 0;
  if (expenseRatio > 80) {
    warnings.push('High expense ratio may indicate inefficiencies');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function validateRequiredFields(inputs: Partial<NetOperatingIncomeInputs>): string[] {
  const requiredFields = [
    'propertyName',
    'propertyAddress',
    'propertyType',
    'propertySize',
    'numberOfUnits',
    'occupancyRate',
    'grossRentalIncome',
    'propertyTaxes',
    'propertyInsurance',
    'marketLocation',
    'marketCondition',
    'propertyValue',
    'analysisPeriod',
    'discountRate'
  ];

  const missingFields: string[] = [];
  
  requiredFields.forEach(field => {
    if (inputs[field as keyof NetOperatingIncomeInputs] === undefined || 
        inputs[field as keyof NetOperatingIncomeInputs] === null ||
        inputs[field as keyof NetOperatingIncomeInputs] === '') {
      missingFields.push(field);
    }
  });

  return missingFields;
}

export function validateBusinessRules(inputs: NetOperatingIncomeInputs): string[] {
  const warnings: string[] = [];

  // Business rule validations
  if (inputs.propertyType === 'multifamily' && inputs.numberOfUnits < 5) {
    warnings.push('Multifamily property with less than 5 units may not be typical');
  }

  if (inputs.propertyType === 'office' && inputs.numberOfUnits > 1) {
    warnings.push('Office properties typically have fewer, larger units');
  }

  if (inputs.propertyManagementRate > 0 && inputs.propertyManagementFee > 0) {
    warnings.push('Both property management rate and fee are specified - rate will be used');
  }

  if (inputs.occupancyRate > 100) {
    warnings.push('Occupancy rate cannot exceed 100%');
  }

  if (inputs.vacancyRate + inputs.occupancyRate > 100) {
    warnings.push('Vacancy rate and occupancy rate sum exceeds 100%');
  }

  if (inputs.marketCondition === 'hot' && inputs.occupancyRate < 90) {
    warnings.push('Hot market with low occupancy may indicate property-specific issues');
  }

  if (inputs.marketCondition === 'declining' && inputs.occupancyRate > 95) {
    warnings.push('Declining market with very high occupancy may be unsustainable');
  }

  const totalGrossIncome = inputs.grossRentalIncome + inputs.otherIncome + inputs.parkingIncome + 
                          inputs.laundryIncome + inputs.storageIncome + inputs.amenityIncome + 
                          inputs.lateFees + inputs.applicationFees + inputs.petFees + inputs.otherFees;

  if (inputs.grossRentalIncome < totalGrossIncome * 0.8) {
    warnings.push('Non-rental income is unusually high relative to rental income');
  }

  return warnings;
}