import { CalculatorInputs } from '../../../types/calculator';

export function validateTotalRooms(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Total rooms is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 1 || value > 10000) return { isValid: false, message: 'Must be between 1 and 10,000' };
  return { isValid: true };
}

export function validateRoomTypes(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !Array.isArray(value)) return { isValid: false, message: 'Room types must be an array' };
  if (value) {
    const validRoomTypes = ['standard', 'deluxe', 'suite', 'presidential-suite', 'accessible', 'connecting'];
    for (const roomType of value) {
      if (!validRoomTypes.includes(roomType)) {
        return { isValid: false, message: `Invalid room type: ${roomType}` };
      }
    }
  }
  return { isValid: true };
}

export function validateAverageRoomSize(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 100 || value > 2000) return { isValid: false, message: 'Must be between 100 and 2,000 square feet' };
  }
  return { isValid: true };
}

export function validateHotelType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['budget', 'midscale', 'upscale', 'luxury', 'boutique', 'resort', 'business', 'airport', 'extended-stay'].includes(value)) {
    return { isValid: false, message: 'Invalid hotel type' };
  }
  return { isValid: true };
}

export function validateStarRating(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['1', '2', '3', '4', '5'].includes(value)) {
    return { isValid: false, message: 'Invalid star rating' };
  }
  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['urban', 'suburban', 'airport', 'resort', 'highway', 'downtown', 'business-district'].includes(value)) {
    return { isValid: false, message: 'Invalid location type' };
  }
  return { isValid: true };
}

export function validateMarket(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['business', 'leisure', 'mixed', 'convention', 'airport', 'resort'].includes(value)) {
    return { isValid: false, message: 'Invalid market type' };
  }
  return { isValid: true };
}

export function validateSeasonality(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['low', 'moderate', 'high', 'extreme'].includes(value)) {
    return { isValid: false, message: 'Invalid seasonality factor' };
  }
  return { isValid: true };
}

export function validateCompetitionLevel(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['low', 'medium', 'high', 'very-high'].includes(value)) {
    return { isValid: false, message: 'Invalid competition level' };
  }
  return { isValid: true };
}

export function validateMarketDemand(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['weak', 'moderate', 'strong', 'very-strong'].includes(value)) {
    return { isValid: false, message: 'Invalid market demand' };
  }
  return { isValid: true };
}

export function validateOccupancyRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 100)) {
    return { isValid: false, message: 'Must be between 0 and 100' };
  }
  return { isValid: true };
}

export function validateBaseADR(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 20 || value > 2000)) {
    return { isValid: false, message: 'Must be between $20 and $2,000' };
  }
  return { isValid: true };
}

export function validateRevPAR(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 10 || value > 1500)) {
    return { isValid: false, message: 'Must be between $10 and $1,500' };
  }
  return { isValid: true };
}

export function validateConstructionCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 50000 || value > 1000000)) {
    return { isValid: false, message: 'Must be between $50,000 and $1,000,000 per room' };
  }
  return { isValid: true };
}

export function validateLandCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, message: 'Must be a non-negative number' };
  }
  if (value !== undefined && value > 100000000) {
    return { isValid: false, message: 'Must be $100,000,000 or less' };
  }
  return { isValid: true };
}

export function validateSoftCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0)) {
    return { isValid: false, message: 'Must be a non-negative number' };
  }
  if (value !== undefined && value > 50000000) {
    return { isValid: false, message: 'Must be $50,000,000 or less' };
  }
  return { isValid: true };
}

export function validateFurnitureCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 5000 || value > 200000)) {
    return { isValid: false, message: 'Must be between $5,000 and $200,000 per room' };
  }
  return { isValid: true };
}

export function validateOperatingExpenses(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 5000 || value > 100000)) {
    return { isValid: false, message: 'Must be between $5,000 and $100,000 per room' };
  }
  return { isValid: true };
}

export function validateLaborCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 10000 || value > 150000)) {
    return { isValid: false, message: 'Must be between $10,000 and $150,000 per room' };
  }
  return { isValid: true };
}

export function validateUtilityCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 1000 || value > 30000)) {
    return { isValid: false, message: 'Must be between $1,000 and $30,000 per room' };
  }
  return { isValid: true };
}

export function validateMaintenanceCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 1000 || value > 25000)) {
    return { isValid: false, message: 'Must be between $1,000 and $25,000 per room' };
  }
  return { isValid: true };
}

export function validateInsuranceCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 500 || value > 15000)) {
    return { isValid: false, message: 'Must be between $500 and $15,000 per room' };
  }
  return { isValid: true };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 500 || value > 20000)) {
    return { isValid: false, message: 'Must be between $500 and $20,000 per room' };
  }
  return { isValid: true };
}

export function validateManagementFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 10)) {
    return { isValid: false, message: 'Must be between 0 and 10%' };
  }
  return { isValid: true };
}

export function validateFranchiseFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 15)) {
    return { isValid: false, message: 'Must be between 0 and 15%' };
  }
  return { isValid: true };
}

export function validateFinancingRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 20)) {
    return { isValid: false, message: 'Must be between 0 and 20%' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 5 || value > 40)) {
    return { isValid: false, message: 'Must be between 5 and 40 years' };
  }
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, message: 'Must be between 0 and 50%' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < 0 || value > 50)) {
    return { isValid: false, message: 'Must be between 0 and 50%' };
  }
  return { isValid: true };
}

export function validateDepreciationPeriod(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 15 || value > 50)) {
    return { isValid: false, message: 'Must be between 15 and 50 years' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -10 || value > 20)) {
    return { isValid: false, message: 'Must be between -10 and 20%' };
  }
  return { isValid: true };
}

export function validateRevenueGrowth(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -20 || value > 30)) {
    return { isValid: false, message: 'Must be between -20 and 30%' };
  }
  return { isValid: true };
}

export function validateExpenseGrowth(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value < -10 || value > 20)) {
    return { isValid: false, message: 'Must be between -10 and 20%' };
  }
  return { isValid: true };
}

export function validateExitYear(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 3 || value > 30)) {
    return { isValid: false, message: 'Must be between 3 and 30 years' };
  }
  return { isValid: true };
}

export function validateExitCapRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined && (typeof value !== 'number' || value <= 0)) {
    return { isValid: false, message: 'Must be a positive number' };
  }
  if (value !== undefined && (value < 3 || value > 15)) {
    return { isValid: false, message: 'Must be between 3 and 15%' };
  }
  return { isValid: true };
}

export function validateAdditionalRevenue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !Array.isArray(value)) {
    return { isValid: false, message: 'Additional revenue sources must be an array' };
  }
  if (value) {
    const validSources = ['restaurant', 'bar', 'spa', 'fitness-center', 'conference-rooms', 'parking', 'shuttle-service', 'gift-shop', 'laundry-service', 'room-service'];
    for (const source of value) {
      if (!validSources.includes(source)) {
        return { isValid: false, message: `Invalid additional revenue source: ${source}` };
      }
    }
  }
  return { isValid: true };
}

export function validateAmenities(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !Array.isArray(value)) {
    return { isValid: false, message: 'Amenities must be an array' };
  }
  if (value) {
    const validAmenities = ['pool', 'gym', 'spa', 'restaurant', 'bar', 'concierge', 'valet-parking', 'free-wifi', 'business-center', 'meeting-rooms', 'event-space', 'shuttle-service', 'room-service', 'laundry-service', 'gift-shop'];
    for (const amenity of value) {
      if (!validAmenities.includes(amenity)) {
        return { isValid: false, message: `Invalid amenity: ${amenity}` };
      }
    }
  }
  return { isValid: true };
}

export function validateAllHotelFeasibilityInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const totalRoomsResult = validateTotalRooms(inputs.totalRooms);
  if (!totalRoomsResult.isValid) errors.push(totalRoomsResult.message!);

  const roomTypesResult = validateRoomTypes(inputs.roomTypes);
  if (!roomTypesResult.isValid) errors.push(roomTypesResult.message!);

  const averageRoomSizeResult = validateAverageRoomSize(inputs.averageRoomSize);
  if (!averageRoomSizeResult.isValid) errors.push(averageRoomSizeResult.message!);

  const hotelTypeResult = validateHotelType(inputs.hotelType);
  if (!hotelTypeResult.isValid) errors.push(hotelTypeResult.message!);

  const starRatingResult = validateStarRating(inputs.starRating);
  if (!starRatingResult.isValid) errors.push(starRatingResult.message!);

  const locationResult = validateLocation(inputs.location);
  if (!locationResult.isValid) errors.push(locationResult.message!);

  const marketResult = validateMarket(inputs.market);
  if (!marketResult.isValid) errors.push(marketResult.message!);

  const seasonalityResult = validateSeasonality(inputs.seasonality);
  if (!seasonalityResult.isValid) errors.push(seasonalityResult.message!);

  const competitionLevelResult = validateCompetitionLevel(inputs.competitionLevel);
  if (!competitionLevelResult.isValid) errors.push(competitionLevelResult.message!);

  const marketDemandResult = validateMarketDemand(inputs.marketDemand);
  if (!marketDemandResult.isValid) errors.push(marketDemandResult.message!);

  const occupancyRateResult = validateOccupancyRate(inputs.occupancyRate);
  if (!occupancyRateResult.isValid) errors.push(occupancyRateResult.message!);

  const baseADRResult = validateBaseADR(inputs.baseADR);
  if (!baseADRResult.isValid) errors.push(baseADRResult.message!);

  const revPARResult = validateRevPAR(inputs.revPAR);
  if (!revPARResult.isValid) errors.push(revPARResult.message!);

  const constructionCostResult = validateConstructionCost(inputs.constructionCost);
  if (!constructionCostResult.isValid) errors.push(constructionCostResult.message!);

  const landCostResult = validateLandCost(inputs.landCost);
  if (!landCostResult.isValid) errors.push(landCostResult.message!);

  const softCostsResult = validateSoftCosts(inputs.softCosts);
  if (!softCostsResult.isValid) errors.push(softCostsResult.message!);

  const furnitureCostResult = validateFurnitureCost(inputs.furnitureCost);
  if (!furnitureCostResult.isValid) errors.push(furnitureCostResult.message!);

  const operatingExpensesResult = validateOperatingExpenses(inputs.operatingExpenses);
  if (!operatingExpensesResult.isValid) errors.push(operatingExpensesResult.message!);

  const laborCostsResult = validateLaborCosts(inputs.laborCosts);
  if (!laborCostsResult.isValid) errors.push(laborCostsResult.message!);

  const utilityCostsResult = validateUtilityCosts(inputs.utilityCosts);
  if (!utilityCostsResult.isValid) errors.push(utilityCostsResult.message!);

  const maintenanceCostsResult = validateMaintenanceCosts(inputs.maintenanceCosts);
  if (!maintenanceCostsResult.isValid) errors.push(maintenanceCostsResult.message!);

  const insuranceCostsResult = validateInsuranceCosts(inputs.insuranceCosts);
  if (!insuranceCostsResult.isValid) errors.push(insuranceCostsResult.message!);

  const propertyTaxesResult = validatePropertyTaxes(inputs.propertyTaxes);
  if (!propertyTaxesResult.isValid) errors.push(propertyTaxesResult.message!);

  const managementFeesResult = validateManagementFees(inputs.managementFees);
  if (!managementFeesResult.isValid) errors.push(managementFeesResult.message!);

  const franchiseFeesResult = validateFranchiseFees(inputs.franchiseFees);
  if (!franchiseFeesResult.isValid) errors.push(franchiseFeesResult.message!);

  const financingRateResult = validateFinancingRate(inputs.financingRate);
  if (!financingRateResult.isValid) errors.push(financingRateResult.message!);

  const loanTermResult = validateLoanTerm(inputs.loanTerm);
  if (!loanTermResult.isValid) errors.push(loanTermResult.message!);

  const downPaymentResult = validateDownPayment(inputs.downPayment);
  if (!downPaymentResult.isValid) errors.push(downPaymentResult.message!);

  const taxRateResult = validateTaxRate(inputs.taxRate);
  if (!taxRateResult.isValid) errors.push(taxRateResult.message!);

  const depreciationPeriodResult = validateDepreciationPeriod(inputs.depreciationPeriod);
  if (!depreciationPeriodResult.isValid) errors.push(depreciationPeriodResult.message!);

  const inflationRateResult = validateInflationRate(inputs.inflationRate);
  if (!inflationRateResult.isValid) errors.push(inflationRateResult.message!);

  const revenueGrowthResult = validateRevenueGrowth(inputs.revenueGrowth);
  if (!revenueGrowthResult.isValid) errors.push(revenueGrowthResult.message!);

  const expenseGrowthResult = validateExpenseGrowth(inputs.expenseGrowth);
  if (!expenseGrowthResult.isValid) errors.push(expenseGrowthResult.message!);

  const exitYearResult = validateExitYear(inputs.exitYear);
  if (!exitYearResult.isValid) errors.push(exitYearResult.message!);

  const exitCapRateResult = validateExitCapRate(inputs.exitCapRate);
  if (!exitCapRateResult.isValid) errors.push(exitCapRateResult.message!);

  const additionalRevenueResult = validateAdditionalRevenue(inputs.additionalRevenue);
  if (!additionalRevenueResult.isValid) errors.push(additionalRevenueResult.message!);

  const amenitiesResult = validateAmenities(inputs.amenities);
  if (!amenitiesResult.isValid) errors.push(amenitiesResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}
