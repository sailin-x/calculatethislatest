import { GrossRentMultiplierInputs } from './types';

export function validatePropertyAddress(value: string, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'Property address is required';
  }
  if (value.trim().length < 5) {
    return 'Property address must be at least 5 characters long';
  }
  return null;
}

export function validatePropertyType(value: string, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value) {
    return 'Property type is required';
  }
  const validTypes = ['single_family', 'multi_family', 'commercial', 'industrial', 'retail', 'office', 'mixed_use'];
  if (!validTypes.includes(value)) {
    return 'Invalid property type';
  }
  return null;
}

export function validatePropertySize(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Property size must be greater than 0';
  }
  if (value > 1000000) {
    return 'Property size cannot exceed 1,000,000 sq ft';
  }
  return null;
}

export function validateLotSize(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Lot size must be greater than 0';
  }
  if (value > 1000000) {
    return 'Lot size cannot exceed 1,000,000 sq ft';
  }
  return null;
}

export function validateYearBuilt(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value < 1800 || value > 2030) {
    return 'Year built must be between 1800 and 2030';
  }
  return null;
}

export function validatePropertyCondition(value: string, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value) {
    return 'Property condition is required';
  }
  const validConditions = ['excellent', 'good', 'fair', 'poor', 'needs_work'];
  if (!validConditions.includes(value)) {
    return 'Invalid property condition';
  }
  return null;
}

export function validateBedrooms(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value < 0) {
    return 'Number of bedrooms must be 0 or greater';
  }
  if (value > 50) {
    return 'Number of bedrooms cannot exceed 50';
  }
  return null;
}

export function validateBathrooms(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value < 0) {
    return 'Number of bathrooms must be 0 or greater';
  }
  if (value > 50) {
    return 'Number of bathrooms cannot exceed 50';
  }
  return null;
}

export function validatePurchasePrice(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Purchase price must be greater than 0';
  }
  if (value > 100000000) {
    return 'Purchase price cannot exceed $100,000,000';
  }
  return null;
}

export function validateMarketValue(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Market value must be greater than 0';
  }
  if (value > 100000000) {
    return 'Market value cannot exceed $100,000,000';
  }
  return null;
}

export function validateAnnualGrossRent(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Annual gross rent must be greater than 0';
  }
  if (value > 10000000) {
    return 'Annual gross rent cannot exceed $10,000,000';
  }
  return null;
}

export function validateMonthlyGrossRent(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Monthly gross rent must be greater than 0';
  }
  if (value > 1000000) {
    return 'Monthly gross rent cannot exceed $1,000,000';
  }
  return null;
}

export function validateAnnualOperatingExpenses(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Annual operating expenses must be 0 or greater';
  }
  if (value > 5000000) {
    return 'Annual operating expenses cannot exceed $5,000,000';
  }
  return null;
}

export function validateMonthlyOperatingExpenses(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Monthly operating expenses must be 0 or greater';
  }
  if (value > 500000) {
    return 'Monthly operating expenses cannot exceed $500,000';
  }
  return null;
}

export function validateAnnualNetOperatingIncome(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Annual net operating income must be 0 or greater';
  }
  if (value > 10000000) {
    return 'Annual net operating income cannot exceed $10,000,000';
  }
  return null;
}

export function validateMonthlyNetOperatingIncome(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Monthly net operating income must be 0 or greater';
  }
  if (value > 1000000) {
    return 'Monthly net operating income cannot exceed $1,000,000';
  }
  return null;
}

export function validateNumberOfUnits(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Number of units must be greater than 0';
  }
  if (value > 1000) {
    return 'Number of units cannot exceed 1000';
  }
  return null;
}

export function validateVacancyRate(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Vacancy rate must be 0 or greater';
  }
  if (value > 100) {
    return 'Vacancy rate cannot exceed 100%';
  }
  return null;
}

export function validateCollectionLoss(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Collection loss must be 0 or greater';
  }
  if (value > 20) {
    return 'Collection loss cannot exceed 20%';
  }
  return null;
}

export function validateEffectiveGrossIncome(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Effective gross income must be greater than 0';
  }
  if (value > 10000000) {
    return 'Effective gross income cannot exceed $10,000,000';
  }
  return null;
}

export function validatePropertyTaxes(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Property taxes must be 0 or greater';
  }
  if (value > 1000000) {
    return 'Property taxes cannot exceed $1,000,000';
  }
  return null;
}

export function validateInsurance(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Insurance costs must be 0 or greater';
  }
  if (value > 100000) {
    return 'Insurance costs cannot exceed $100,000';
  }
  return null;
}

export function validateUtilities(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Utility costs must be 0 or greater';
  }
  if (value > 100000) {
    return 'Utility costs cannot exceed $100,000';
  }
  return null;
}

export function validateMaintenance(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Maintenance costs must be 0 or greater';
  }
  if (value > 100000) {
    return 'Maintenance costs cannot exceed $100,000';
  }
  return null;
}

export function validatePropertyManagement(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Property management fees must be 0 or greater';
  }
  if (value > 100000) {
    return 'Property management fees cannot exceed $100,000';
  }
  return null;
}

export function validateRepairs(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Repair costs must be 0 or greater';
  }
  if (value > 100000) {
    return 'Repair costs cannot exceed $100,000';
  }
  return null;
}

export function validateLandscaping(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Landscaping costs must be 0 or greater';
  }
  if (value > 50000) {
    return 'Landscaping costs cannot exceed $50,000';
  }
  return null;
}

export function validatePestControl(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Pest control costs must be 0 or greater';
  }
  if (value > 20000) {
    return 'Pest control costs cannot exceed $20,000';
  }
  return null;
}

export function validateOtherExpenses(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Other expenses must be 0 or greater';
  }
  if (value > 100000) {
    return 'Other expenses cannot exceed $100,000';
  }
  return null;
}

export function validateMarketGRM(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Market GRM must be greater than 0';
  }
  if (value > 50) {
    return 'Market GRM cannot exceed 50';
  }
  return null;
}

export function validateMarketCapRate(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Market cap rate must be greater than 0';
  }
  if (value > 20) {
    return 'Market cap rate cannot exceed 20%';
  }
  return null;
}

export function validateMarketRent(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Market rent must be greater than 0';
  }
  if (value > 1000) {
    return 'Market rent cannot exceed $1,000 per sq ft/year';
  }
  return null;
}

export function validateCity(value: string, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'City is required';
  }
  return null;
}

export function validateState(value: string, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'State is required';
  }
  return null;
}

export function validateZipCode(value: string, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'ZIP code is required';
  }
  return null;
}

export function validateNeighborhood(value: string, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value.trim().length === 0) {
    return 'Neighborhood is required';
  }
  return null;
}

export function validateMarketType(value: string, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value) {
    return 'Market type is required';
  }
  const validTypes = ['hot', 'stable', 'declining', 'emerging'];
  if (!validTypes.includes(value)) {
    return 'Invalid market type';
  }
  return null;
}

export function validateMarketTrend(value: string, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value) {
    return 'Market trend is required';
  }
  const validTrends = ['appreciating', 'stable', 'declining'];
  if (!validTrends.includes(value)) {
    return 'Invalid market trend';
  }
  return null;
}

export function validateParkingSpaces(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined || value < 0) {
    return 'Parking spaces must be 0 or greater';
  }
  if (value > 1000) {
    return 'Parking spaces cannot exceed 1000';
  }
  return null;
}

export function validateAnalysisPeriod(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Analysis period must be greater than 0';
  }
  if (value > 30) {
    return 'Analysis period cannot exceed 30 years';
  }
  return null;
}

export function validateRentGrowthRate(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined) {
    return 'Rent growth rate is required';
  }
  if (value < -10 || value > 20) {
    return 'Rent growth rate must be between -10% and 20%';
  }
  return null;
}

export function validateExpenseGrowthRate(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined) {
    return 'Expense growth rate is required';
  }
  if (value < -5 || value > 15) {
    return 'Expense growth rate must be between -5% and 15%';
  }
  return null;
}

export function validateAppreciationRate(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (value === undefined) {
    return 'Appreciation rate is required';
  }
  if (value < -10 || value > 20) {
    return 'Appreciation rate must be between -10% and 20%';
  }
  return null;
}

export function validateDiscountRate(value: number, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value || value <= 0) {
    return 'Discount rate must be greater than 0';
  }
  if (value > 30) {
    return 'Discount rate cannot exceed 30%';
  }
  return null;
}

export function validateCurrency(value: string, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value) {
    return 'Currency is required';
  }
  const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return 'Invalid currency';
  }
  return null;
}

export function validateDisplayFormat(value: string, allInputs: GrossRentMultiplierInputs): string | null {
  if (!value) {
    return 'Display format is required';
  }
  const validFormats = ['percentage', 'decimal', 'basis-points'];
  if (!validFormats.includes(value)) {
    return 'Invalid display format';
  }
  return null;
}
