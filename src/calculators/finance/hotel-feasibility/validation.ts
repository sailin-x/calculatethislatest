import { HotelFeasibilityInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateHotelFeasibilityInputs(inputs: HotelFeasibilityInputs): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Property validation
  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length < 10) {
    errors.push('Property address is required and must be at least 10 characters');
  }

  if (!inputs.totalRooms || inputs.totalRooms < 1) {
    errors.push('Total rooms must be at least 1');
  }
  if (inputs.totalRooms > 1000) {
    errors.push('Total rooms cannot exceed 1000');
  }

  if (!inputs.totalSquareFootage || inputs.totalSquareFootage < 1000) {
    errors.push('Total square footage must be at least 1,000 sq ft');
  }

  if (inputs.buildingAge < 0) {
    errors.push('Building age cannot be negative');
  }
  if (inputs.buildingAge > 200) {
    errors.push('Building age cannot exceed 200 years');
  }

  // Financial validation
  if (!inputs.acquisitionCost || inputs.acquisitionCost < 100000) {
    errors.push('Acquisition cost must be at least $100,000');
  }

  if (inputs.renovationCost < 0) {
    errors.push('Renovation cost cannot be negative');
  }

  if (inputs.furnitureFixturesEquipment < 0) {
    errors.push('Furniture, fixtures, and equipment cost cannot be negative');
  }

  if (inputs.workingCapital < 0) {
    errors.push('Working capital cannot be negative');
  }

  // Financing validation
  if (inputs.loanAmount < 0) {
    errors.push('Loan amount cannot be negative');
  }
  if (inputs.loanAmount > inputs.acquisitionCost) {
    errors.push('Loan amount cannot exceed acquisition cost');
  }

  if (inputs.interestRate < 0 || inputs.interestRate > 0.5) {
    errors.push('Interest rate must be between 0% and 50%');
  }

  if (inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (inputs.downPayment < 0) {
    errors.push('Down payment cannot be negative');
  }

  // Revenue validation
  if (inputs.roomRevenue < 0) {
    errors.push('Room revenue cannot be negative');
  }

  if (inputs.foodBeverageRevenue < 0) {
    errors.push('Food and beverage revenue cannot be negative');
  }

  if (inputs.meetingSpaceRevenue < 0) {
    errors.push('Meeting space revenue cannot be negative');
  }

  if (inputs.otherRevenue < 0) {
    errors.push('Other revenue cannot be negative');
  }

  // Occupancy validation
  if (inputs.projectedOccupancy < 0 || inputs.projectedOccupancy > 100) {
    errors.push('Projected occupancy must be between 0% and 100%');
  }

  if (inputs.averageMarketOccupancy < 0 || inputs.averageMarketOccupancy > 100) {
    errors.push('Average market occupancy must be between 0% and 100%');
  }

  // ADR validation
  if (inputs.projectedADR.standard < 0) {
    errors.push('Standard room ADR cannot be negative');
  }
  if (inputs.projectedADR.deluxe < 0) {
    errors.push('Deluxe room ADR cannot be negative');
  }
  if (inputs.projectedADR.suite < 0) {
    errors.push('Suite ADR cannot be negative');
  }
  if (inputs.projectedADR.presidential < 0) {
    errors.push('Presidential room ADR cannot be negative');
  }

  if (inputs.averageMarketADR < 0) {
    errors.push('Average market ADR cannot be negative');
  }

  // Length of stay validation
  if (inputs.averageLengthOfStay < 1) {
    errors.push('Average length of stay must be at least 1 day');
  }
  if (inputs.averageLengthOfStay > 365) {
    errors.push('Average length of stay cannot exceed 365 days');
  }

  // Warnings
  if (inputs.buildingAge > 30) {
    warnings.push('Building age is over 30 years - consider renovation needs');
  }

  if (inputs.competitionLevel === 'very_high') {
    warnings.push('Very high competition level may impact profitability');
  }

  if (inputs.marketDemand === 'low') {
    warnings.push('Low market demand may affect occupancy rates');
  }

  if (inputs.seasonality === 'extreme') {
    warnings.push('Extreme seasonality may create cash flow challenges');
  }

  if (inputs.projectedOccupancy < 50) {
    warnings.push('Projected occupancy below 50% may indicate market challenges');
  }

  if (inputs.projectedOccupancy > inputs.averageMarketOccupancy + 20) {
    warnings.push('Projected occupancy significantly above market average');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
