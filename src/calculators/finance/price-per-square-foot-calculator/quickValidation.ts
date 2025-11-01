import { PricePerSquareFootInputs } from './types';

export function validatePropertyPrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property price must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Property price cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateTotalSquareFootage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Total square footage must be greater than 0' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Total square footage cannot exceed 100,000 sq ft' };
  }
  return { isValid: true };
}

export function validateLivingAreaSquareFootage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && value <= 0) {
    return { isValid: false, message: 'Living area square footage must be greater than 0' };
  }
  if (value && allInputs?.totalSquareFootage && value > allInputs.totalSquareFootage) {
    return { isValid: false, message: 'Living area cannot exceed total square footage' };
  }
  return { isValid: true };
}

export function validateLotSizeSquareFootage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && value <= 0) {
    return { isValid: false, message: 'Lot size square footage must be greater than 0' };
  }
  return { isValid: true };
}

export function validateZipCode(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: 'Zip code is required' };
  }
  if (!/^\d{5}(-\d{4})?$/.test(value)) {
    return { isValid: false, message: 'Zip code must be in valid format (12345 or 12345-6789)' };
  }
  return { isValid: true };
}

export function validateCity(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: 'City is required' };
  }
  return { isValid: true };
}

export function validateState(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: 'State is required' };
  }
  return { isValid: true };
}

export function validateBedrooms(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Number of bedrooms cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Number of bedrooms cannot exceed 20' };
  }
  return { isValid: true };
}

export function validateBathrooms(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Number of bathrooms cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Number of bathrooms cannot exceed 20' };
  }
  return { isValid: true };
}

export function validateGarageSpaces(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Number of garage spaces cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Number of garage spaces cannot exceed 10' };
  }
  return { isValid: true };
}

export function validateYearBuilt(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1800) {
    return { isValid: false, message: 'Year built must be 1800 or later' };
  }
  const currentYear = new Date().getFullYear();
  if (value > currentYear + 1) {
    return { isValid: false, message: 'Year built cannot be in the future' };
  }
  return { isValid: true };
}

export function validateLotSizeAcres(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && value < 0) {
    return { isValid: false, message: 'Lot size in acres cannot be negative' };
  }
  if (value && value > 1000) {
    return { isValid: false, message: 'Lot size in acres cannot exceed 1,000' };
  }
  return { isValid: true };
}

export function validateAveragePricePerSqFt(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Average price per sq ft cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Average price per sq ft cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateMedianPricePerSqFt(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Median price per sq ft cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Median price per sq ft cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validatePricePerSqFtRangeLow(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Price per sq ft range low cannot be negative' };
  }
  return { isValid: true };
}

export function validatePricePerSqFtRangeHigh(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Price per sq ft range high cannot be negative' };
  }
  if (allInputs?.pricePerSqFtRangeLow && value < allInputs.pricePerSqFtRangeLow) {
    return { isValid: false, message: 'Price per sq ft range high cannot be lower than range low' };
  }
  return { isValid: true };
}

export function validateDaysOnMarket(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Days on market cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Days on market cannot exceed 10,000' };
  }
  return { isValid: true };
}

export function validateComparableSalesCount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Comparable sales count cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Comparable sales count cannot exceed 1,000' };
  }
  return { isValid: true };
}

export function validateAnnualPropertyTaxes(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Annual property taxes cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Annual property taxes cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateHomeownersInsurance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Homeowners insurance cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Homeowners insurance cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateHoaFees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'HOA fees cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'HOA fees cannot exceed $10,000 per month' };
  }
  return { isValid: true };
}