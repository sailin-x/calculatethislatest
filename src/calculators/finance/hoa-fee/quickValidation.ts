import { CalculatorInputs } from '../../types/calculator';

export function validateMonthlyHOAFee(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Monthly HOA fee is required' };
  if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
  if (value > 5000) return { isValid: false, message: 'Must be $5,000 or less' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['condo', 'townhouse', 'single-family', 'co-op', 'pud'].includes(value)) {
    return { isValid: false, message: 'Invalid property type' };
  }
  return { isValid: true };
}

export function validateSquareFootage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 100 || value > 10000) return { isValid: false, message: 'Must be between 100 and 10,000 square feet' };
  }
  return { isValid: true };
}

export function validateBedrooms(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10) return { isValid: false, message: 'Must be 10 or less' };
  }
  return { isValid: true };
}

export function validateBathrooms(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10) return { isValid: false, message: 'Must be 10 or less' };
  }
  return { isValid: true };
}

export function validateParkingSpaces(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10) return { isValid: false, message: 'Must be 10 or less' };
  }
  return { isValid: true };
}

export function validateAmenities(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !Array.isArray(value)) return { isValid: false, message: 'Amenities must be an array' };
  if (value) {
    const validAmenities = ['pool', 'gym', 'spa', 'tennis-court', 'basketball-court', 'playground', 'clubhouse', 'concierge', 'security', 'elevator', 'parking-garage', 'storage-unit', 'rooftop-deck', 'garden', 'bbq-area', 'dog-park', 'bike-storage', 'package-reception', 'valet-parking', 'shuttle-service'];
    for (const amenity of value) {
      if (!validAmenities.includes(amenity)) {
        return { isValid: false, message: `Invalid amenity: ${amenity}` };
      }
    }
  }
  return { isValid: true };
}

export function validateUtilitiesIncluded(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !Array.isArray(value)) return { isValid: false, message: 'Utilities included must be an array' };
  if (value) {
    const validUtilities = ['water', 'sewer', 'trash', 'electricity', 'gas', 'internet', 'cable', 'heat', 'ac', 'none'];
    for (const utility of value) {
      if (!validUtilities.includes(utility)) {
        return { isValid: false, message: `Invalid utility: ${utility}` };
      }
    }
  }
  return { isValid: true };
}

export function validateMaintenanceIncluded(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !Array.isArray(value)) return { isValid: false, message: 'Maintenance included must be an array' };
  if (value) {
    const validMaintenance = ['exterior-painting', 'roof-repairs', 'landscaping', 'snow-removal', 'pest-control', 'window-cleaning', 'gutter-cleaning', 'exterior-lighting', 'sidewalk-repairs', 'none'];
    for (const maintenance of value) {
      if (!validMaintenance.includes(maintenance)) {
        return { isValid: false, message: `Invalid maintenance service: ${maintenance}` };
      }
    }
  }
  return { isValid: true };
}

export function validateInsuranceIncluded(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !Array.isArray(value)) return { isValid: false, message: 'Insurance included must be an array' };
  if (value) {
    const validInsurance = ['building-insurance', 'liability-insurance', 'flood-insurance', 'earthquake-insurance', 'none'];
    for (const insurance of value) {
      if (!validInsurance.includes(insurance)) {
        return { isValid: false, message: `Invalid insurance type: ${insurance}` };
      }
    }
  }
  return { isValid: true };
}

export function validateReserveFund(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 1000) return { isValid: false, message: 'Must be $1,000 or less per month' };
  }
  return { isValid: true };
}

export function validateSpecialAssessment(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 5000) return { isValid: false, message: 'Must be $5,000 or less per month' };
  }
  return { isValid: true };
}

export function validatePetFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 500) return { isValid: false, message: 'Must be $500 or less per month' };
  }
  return { isValid: true };
}

export function validateRentalRestrictions(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['none', 'minimum-lease', 'rental-cap', 'OwnerOccupancyRequired', 'no-rentals'].includes(value)) {
    return { isValid: false, message: 'Invalid rental restrictions' };
  }
  return { isValid: true };
}

export function validateRentalCap(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0 || value > 100) return { isValid: false, message: 'Must be between 0 and 100%' };
  }
  return { isValid: true };
}

export function validateMinimumLease(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 1 || value > 60) return { isValid: false, message: 'Must be between 1 and 60 months' };
  }
  return { isValid: true };
}

export function validateHOAAge(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 100) return { isValid: false, message: 'Must be 100 years or less' };
  }
  return { isValid: true };
}

export function validateTotalUnits(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value > 10000) return { isValid: false, message: 'Must be 10,000 or less' };
  }
  return { isValid: true };
}

export function validateOccupancyRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0 || value > 100) return { isValid: false, message: 'Must be between 0 and 100%' };
  }
  return { isValid: true };
}

export function validateAnnualBudget(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10000000) return { isValid: false, message: 'Must be $10,000,000 or less' };
  }
  return { isValid: true };
}

export function validateReserveFundBalance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10000000) return { isValid: false, message: 'Must be $10,000,000 or less' };
  }
  return { isValid: true };
}

export function validateDebtObligations(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10000000) return { isValid: false, message: 'Must be $10,000,000 or less' };
  }
  return { isValid: true };
}

export function validatePendingLitigation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['none', 'minor', 'moderate', 'major'].includes(value)) {
    return { isValid: false, message: 'Invalid pending litigation status' };
  }
  return { isValid: true };
}

export function validateManagementCompany(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['self-managed', 'professional-management', 'hybrid'].includes(value)) {
    return { isValid: false, message: 'Invalid management company type' };
  }
  return { isValid: true };
}

export function validateManagementFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10000) return { isValid: false, message: 'Must be $10,000 or less per month' };
  }
  return { isValid: true };
}

export function validateLegalFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 5000) return { isValid: false, message: 'Must be $5,000 or less per month' };
  }
  return { isValid: true };
}

export function validateAccountingFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 3000) return { isValid: false, message: 'Must be $3,000 or less per month' };
  }
  return { isValid: true };
}

export function validateInsuranceFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 20000) return { isValid: false, message: 'Must be $20,000 or less per month' };
  }
  return { isValid: true };
}

export function validateUtilityCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 100000) return { isValid: false, message: 'Must be $100,000 or less per month' };
  }
  return { isValid: true };
}

export function validateMaintenanceCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 100000) return { isValid: false, message: 'Must be $100,000 or less per month' };
  }
  return { isValid: true };
}

export function validateLandscapingCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50000) return { isValid: false, message: 'Must be $50,000 or less per month' };
  }
  return { isValid: true };
}

export function validateSecurityCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50000) return { isValid: false, message: 'Must be $50,000 or less per month' };
  }
  return { isValid: true };
}

export function validatePoolMaintenance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 20000) return { isValid: false, message: 'Must be $20,000 or less per month' };
  }
  return { isValid: true };
}

export function validateElevatorMaintenance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 30000) return { isValid: false, message: 'Must be $30,000 or less per month' };
  }
  return { isValid: true };
}

export function validateParkingMaintenance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 15000) return { isValid: false, message: 'Must be $15,000 or less per month' };
  }
  return { isValid: true };
}

export function validateCommonAreaUtilities(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 20000) return { isValid: false, message: 'Must be $20,000 or less per month' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0 || value > 20) return { isValid: false, message: 'Must be between 0 and 20%' };
  }
  return { isValid: true };
}

export function validateFeeIncreaseHistory(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['none', 'minimal', 'moderate', 'frequent', 'aggressive'].includes(value)) {
    return { isValid: false, message: 'Invalid fee increase history' };
  }
  return { isValid: true };
}

export function validateLastFeeIncrease(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 20) return { isValid: false, message: 'Must be 20 years or less' };
  }
  return { isValid: true };
}

export function validateProjectedIncrease(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0 || value > 50) return { isValid: false, message: 'Must be between 0 and 50%' };
  }
  return { isValid: true };
}

export function validateMarketComparison(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['below-market', 'market-rate', 'above-market', 'premium'].includes(value)) {
    return { isValid: false, message: 'Invalid market comparison' };
  }
  return { isValid: true };
}

export function validateCompetitionLevel(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['low', 'medium', 'high', 'very-high'].includes(value)) {
    return { isValid: false, message: 'Invalid competition level' };
  }
  return { isValid: true };
}

export function validateLocationQuality(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['poor', 'fair', 'good', 'excellent', 'premium'].includes(value)) {
    return { isValid: false, message: 'Invalid location quality' };
  }
  return { isValid: true };
}

export function validateSchoolDistrict(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['poor', 'fair', 'good', 'excellent'].includes(value)) {
    return { isValid: false, message: 'Invalid school district quality' };
  }
  return { isValid: true };
}

export function validateCrimeRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['high', 'medium', 'low', 'very-low'].includes(value)) {
    return { isValid: false, message: 'Invalid crime rate' };
  }
  return { isValid: true };
}

export function validatePublicTransportation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['none', 'limited', 'good', 'excellent'].includes(value)) {
    return { isValid: false, message: 'Invalid public transportation access' };
  }
  return { isValid: true };
}

export function validateShoppingAccess(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['none', 'limited', 'good', 'excellent'].includes(value)) {
    return { isValid: false, message: 'Invalid shopping access' };
  }
  return { isValid: true };
}

export function validateEntertainmentAccess(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['none', 'limited', 'good', 'excellent'].includes(value)) {
    return { isValid: false, message: 'Invalid entertainment access' };
  }
  return { isValid: true };
}

export function validateMedicalAccess(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['none', 'limited', 'good', 'excellent'].includes(value)) {
    return { isValid: false, message: 'Invalid medical access' };
  }
  return { isValid: true };
}

export function validateEmploymentAccess(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && !['none', 'limited', 'good', 'excellent'].includes(value)) {
    return { isValid: false, message: 'Invalid employment access' };
  }
  return { isValid: true };
}

export function validateAllHOAFeeInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const monthlyHOAFeeResult = validateMonthlyHOAFee(inputs.monthlyHOAFee);
  if (!monthlyHOAFeeResult.isValid) errors.push(monthlyHOAFeeResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const squareFootageResult = validateSquareFootage(inputs.squareFootage);
  if (!squareFootageResult.isValid) errors.push(squareFootageResult.message!);

  const bedroomsResult = validateBedrooms(inputs.bedrooms);
  if (!bedroomsResult.isValid) errors.push(bedroomsResult.message!);

  const bathroomsResult = validateBathrooms(inputs.bathrooms);
  if (!bathroomsResult.isValid) errors.push(bathroomsResult.message!);

  const parkingSpacesResult = validateParkingSpaces(inputs.parkingSpaces);
  if (!parkingSpacesResult.isValid) errors.push(parkingSpacesResult.message!);

  const amenitiesResult = validateAmenities(inputs.amenities);
  if (!amenitiesResult.isValid) errors.push(amenitiesResult.message!);

  const utilitiesIncludedResult = validateUtilitiesIncluded(inputs.utilitiesIncluded);
  if (!utilitiesIncludedResult.isValid) errors.push(utilitiesIncludedResult.message!);

  const maintenanceIncludedResult = validateMaintenanceIncluded(inputs.maintenanceIncluded);
  if (!maintenanceIncludedResult.isValid) errors.push(maintenanceIncludedResult.message!);

  const insuranceIncludedResult = validateInsuranceIncluded(inputs.insuranceIncluded);
  if (!insuranceIncludedResult.isValid) errors.push(insuranceIncludedResult.message!);

  const reserveFundResult = validateReserveFund(inputs.reserveFund);
  if (!reserveFundResult.isValid) errors.push(reserveFundResult.message!);

  const specialAssessmentResult = validateSpecialAssessment(inputs.specialAssessment);
  if (!specialAssessmentResult.isValid) errors.push(specialAssessmentResult.message!);

  const petFeesResult = validatePetFees(inputs.petFees);
  if (!petFeesResult.isValid) errors.push(petFeesResult.message!);

  const rentalRestrictionsResult = validateRentalRestrictions(inputs.rentalRestrictions);
  if (!rentalRestrictionsResult.isValid) errors.push(rentalRestrictionsResult.message!);

  const rentalCapResult = validateRentalCap(inputs.rentalCap);
  if (!rentalCapResult.isValid) errors.push(rentalCapResult.message!);

  const minimumLeaseResult = validateMinimumLease(inputs.minimumLease);
  if (!minimumLeaseResult.isValid) errors.push(minimumLeaseResult.message!);

  const hoaAgeResult = validateHOAAge(inputs.hoaAge);
  if (!hoaAgeResult.isValid) errors.push(hoaAgeResult.message!);

  const totalUnitsResult = validateTotalUnits(inputs.totalUnits);
  if (!totalUnitsResult.isValid) errors.push(totalUnitsResult.message!);

  const occupancyRateResult = validateOccupancyRate(inputs.occupancyRate);
  if (!occupancyRateResult.isValid) errors.push(occupancyRateResult.message!);

  const annualBudgetResult = validateAnnualBudget(inputs.annualBudget);
  if (!annualBudgetResult.isValid) errors.push(annualBudgetResult.message!);

  const reserveFundBalanceResult = validateReserveFundBalance(inputs.reserveFundBalance);
  if (!reserveFundBalanceResult.isValid) errors.push(reserveFundBalanceResult.message!);

  const debtObligationsResult = validateDebtObligations(inputs.debtObligations);
  if (!debtObligationsResult.isValid) errors.push(debtObligationsResult.message!);

  const pendingLitigationResult = validatePendingLitigation(inputs.pendingLitigation);
  if (!pendingLitigationResult.isValid) errors.push(pendingLitigationResult.message!);

  const managementCompanyResult = validateManagementCompany(inputs.managementCompany);
  if (!managementCompanyResult.isValid) errors.push(managementCompanyResult.message!);

  const managementFeesResult = validateManagementFees(inputs.managementFees);
  if (!managementFeesResult.isValid) errors.push(managementFeesResult.message!);

  const legalFeesResult = validateLegalFees(inputs.legalFees);
  if (!legalFeesResult.isValid) errors.push(legalFeesResult.message!);

  const accountingFeesResult = validateAccountingFees(inputs.accountingFees);
  if (!accountingFeesResult.isValid) errors.push(accountingFeesResult.message!);

  const insuranceFeesResult = validateInsuranceFees(inputs.insuranceFees);
  if (!insuranceFeesResult.isValid) errors.push(insuranceFeesResult.message!);

  const utilityCostsResult = validateUtilityCosts(inputs.utilityCosts);
  if (!utilityCostsResult.isValid) errors.push(utilityCostsResult.message!);

  const maintenanceCostsResult = validateMaintenanceCosts(inputs.maintenanceCosts);
  if (!maintenanceCostsResult.isValid) errors.push(maintenanceCostsResult.message!);

  const landscapingCostsResult = validateLandscapingCosts(inputs.landscapingCosts);
  if (!landscapingCostsResult.isValid) errors.push(landscapingCostsResult.message!);

  const securityCostsResult = validateSecurityCosts(inputs.securityCosts);
  if (!securityCostsResult.isValid) errors.push(securityCostsResult.message!);

  const poolMaintenanceResult = validatePoolMaintenance(inputs.poolMaintenance);
  if (!poolMaintenanceResult.isValid) errors.push(poolMaintenanceResult.message!);

  const elevatorMaintenanceResult = validateElevatorMaintenance(inputs.elevatorMaintenance);
  if (!elevatorMaintenanceResult.isValid) errors.push(elevatorMaintenanceResult.message!);

  const parkingMaintenanceResult = validateParkingMaintenance(inputs.parkingMaintenance);
  if (!parkingMaintenanceResult.isValid) errors.push(parkingMaintenanceResult.message!);

  const commonAreaUtilitiesResult = validateCommonAreaUtilities(inputs.commonAreaUtilities);
  if (!commonAreaUtilitiesResult.isValid) errors.push(commonAreaUtilitiesResult.message!);

  const inflationRateResult = validateInflationRate(inputs.inflationRate);
  if (!inflationRateResult.isValid) errors.push(inflationRateResult.message!);

  const feeIncreaseHistoryResult = validateFeeIncreaseHistory(inputs.feeIncreaseHistory);
  if (!feeIncreaseHistoryResult.isValid) errors.push(feeIncreaseHistoryResult.message!);

  const lastFeeIncreaseResult = validateLastFeeIncrease(inputs.lastFeeIncrease);
  if (!lastFeeIncreaseResult.isValid) errors.push(lastFeeIncreaseResult.message!);

  const projectedIncreaseResult = validateProjectedIncrease(inputs.projectedIncrease);
  if (!projectedIncreaseResult.isValid) errors.push(projectedIncreaseResult.message!);

  const marketComparisonResult = validateMarketComparison(inputs.marketComparison);
  if (!marketComparisonResult.isValid) errors.push(marketComparisonResult.message!);

  const competitionLevelResult = validateCompetitionLevel(inputs.competitionLevel);
  if (!competitionLevelResult.isValid) errors.push(competitionLevelResult.message!);

  const locationQualityResult = validateLocationQuality(inputs.locationQuality);
  if (!locationQualityResult.isValid) errors.push(locationQualityResult.message!);

  const schoolDistrictResult = validateSchoolDistrict(inputs.schoolDistrict);
  if (!schoolDistrictResult.isValid) errors.push(schoolDistrictResult.message!);

  const crimeRateResult = validateCrimeRate(inputs.crimeRate);
  if (!crimeRateResult.isValid) errors.push(crimeRateResult.message!);

  const publicTransportationResult = validatePublicTransportation(inputs.publicTransportation);
  if (!publicTransportationResult.isValid) errors.push(publicTransportationResult.message!);

  const shoppingAccessResult = validateShoppingAccess(inputs.shoppingAccess);
  if (!shoppingAccessResult.isValid) errors.push(shoppingAccessResult.message!);

  const entertainmentAccessResult = validateEntertainmentAccess(inputs.entertainmentAccess);
  if (!entertainmentAccessResult.isValid) errors.push(entertainmentAccessResult.message!);

  const medicalAccessResult = validateMedicalAccess(inputs.medicalAccess);
  if (!medicalAccessResult.isValid) errors.push(medicalAccessResult.message!);

  const employmentAccessResult = validateEmploymentAccess(inputs.employmentAccess);
  if (!employmentAccessResult.isValid) errors.push(employmentAccessResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}
