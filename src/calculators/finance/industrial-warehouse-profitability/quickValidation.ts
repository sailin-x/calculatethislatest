import { CalculatorInputs } from '../../types/calculator';

export function validateTotalSquareFootage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Total square footage is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 1000 || value > 1000000) return { isValid: false, message: 'Must be between 1,000 and 1,000,000 sqft' };
  return { isValid: true };
}

export function validateWarehouseType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validTypes = ['distribution-center', 'fulfillment-center', 'cold-storage', 'bulk-storage', 'cross-dock', 'flex-space', 'manufacturing', 'logistics-hub'];
    if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid warehouse type' };
  }
  return { isValid: true };
}

export function validateClearHeight(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 12 || value > 100) return { isValid: false, message: 'Must be between 12 and 100 feet' };
  }
  return { isValid: true };
}

export function validateLoadingDocks(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 100) return { isValid: false, message: 'Must be 100 or less' };
  }
  return { isValid: true };
}

export function validateParkingSpaces(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 1000) return { isValid: false, message: 'Must be 1,000 or less' };
  }
  return { isValid: true };
}

export function validateOfficeSpace(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50000) return { isValid: false, message: 'Must be 50,000 sqft or less' };
  }
  return { isValid: true };
}

export function validateLandArea(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 1 || value > 1000) return { isValid: false, message: 'Must be between 1 and 1,000 acres' };
  }
  return { isValid: true };
}

export function validateLocationType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validTypes = ['urban', 'suburban', 'rural', 'airport-proximity', 'port-proximity', 'highway-access', 'rail-access'];
    if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid location type' };
  }
  return { isValid: true };
}

export function validateMarketType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validTypes = ['primary', 'secondary', 'tertiary', 'emerging', 'mature', 'declining'];
    if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid market type' };
  }
  return { isValid: true };
}

export function validateCompetitionLevel(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validLevels = ['low', 'medium', 'high', 'very-high'];
    if (!validLevels.includes(value)) return { isValid: false, message: 'Invalid competition level' };
  }
  return { isValid: true };
}

export function validateDemandGrowth(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validGrowths = ['declining', 'stable', 'growing', 'rapid-growth'];
    if (!validGrowths.includes(value)) return { isValid: false, message: 'Invalid demand growth' };
  }
  return { isValid: true };
}

export function validateVacancyRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 100) return { isValid: false, message: 'Must be 100% or less' };
  }
  return { isValid: true };
}

export function validateRentalRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 1 || value > 50) return { isValid: false, message: 'Must be between $1 and $50 per sqft/year' };
  }
  return { isValid: true };
}

export function validateRentalEscalation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 20) return { isValid: false, message: 'Must be 20% or less' };
  }
  return { isValid: true };
}

export function validateLandCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 100000000) return { isValid: false, message: 'Must be $100,000,000 or less' };
  }
  return { isValid: true };
}

export function validateLandCostPerAcre(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 5000000) return { isValid: false, message: 'Must be $5,000,000 or less' };
  }
  return { isValid: true };
}

export function validateConstructionCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 20 || value > 300) return { isValid: false, message: 'Must be between $20 and $300 per sqft' };
  }
  return { isValid: true };
}

export function validateSoftCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50000000) return { isValid: false, message: 'Must be $50,000,000 or less' };
  }
  return { isValid: true };
}

export function validateSoftCostPercentage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50) return { isValid: false, message: 'Must be 50% or less' };
  }
  return { isValid: true };
}

export function validateSiteWork(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 20000000) return { isValid: false, message: 'Must be $20,000,000 or less' };
  }
  return { isValid: true };
}

export function validateUtilityConnectionCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 5000000) return { isValid: false, message: 'Must be $5,000,000 or less' };
  }
  return { isValid: true };
}

export function validatePermits(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 2000000) return { isValid: false, message: 'Must be $2,000,000 or less' };
  }
  return { isValid: true };
}

export function validateFinancingCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10000000) return { isValid: false, message: 'Must be $10,000,000 or less' };
  }
  return { isValid: true };
}

export function validateContingency(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50) return { isValid: false, message: 'Must be 50% or less' };
  }
  return { isValid: true };
}

export function validateOperatingExpenses(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 10) return { isValid: false, message: 'Must be $10/sqft/year or less' };
  }
  return { isValid: true };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 5) return { isValid: false, message: 'Must be $5/sqft/year or less' };
  }
  return { isValid: true };
}

export function validateInsurance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 2) return { isValid: false, message: 'Must be $2/sqft/year or less' };
  }
  return { isValid: true };
}

export function validateMaintenance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 3) return { isValid: false, message: 'Must be $3/sqft/year or less' };
  }
  return { isValid: true };
}

export function validateAnnualUtilities(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 1) return { isValid: false, message: 'Must be $1/sqft/year or less' };
  }
  return { isValid: true };
}

export function validateManagementFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 15) return { isValid: false, message: 'Must be 15% or less' };
  }
  return { isValid: true };
}

export function validateFinancingRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 20) return { isValid: false, message: 'Must be 20% or less' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 5 || value > 50) return { isValid: false, message: 'Must be between 5 and 50 years' };
  }
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 100) return { isValid: false, message: 'Must be 100% or less' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 50) return { isValid: false, message: 'Must be 50% or less' };
  }
  return { isValid: true };
}

export function validateDepreciationPeriod(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 5 || value > 50) return { isValid: false, message: 'Must be between 5 and 50 years' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 20) return { isValid: false, message: 'Must be 20% or less' };
  }
  return { isValid: true };
}

export function validateExitYear(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 1 || value > 50) return { isValid: false, message: 'Must be between 1 and 50 years' };
  }
  return { isValid: true };
}

export function validateExitCapRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value > 20) return { isValid: false, message: 'Must be 20% or less' };
  }
  return { isValid: true };
}

export function validateMarketRentGrowth(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < -10) return { isValid: false, message: 'Must be -10% or greater' };
    if (value > 20) return { isValid: false, message: 'Must be 20% or less' };
  }
  return { isValid: true };
}

export function validateExpenseGrowth(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < -5) return { isValid: false, message: 'Must be -5% or greater' };
    if (value > 15) return { isValid: false, message: 'Must be 15% or less' };
  }
  return { isValid: true };
}

export function validateConstructionTime(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
    if (value < 3 || value > 36) return { isValid: false, message: 'Must be between 3 and 36 months' };
  }
  return { isValid: true };
}

export function validateStabilizationTime(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value !== undefined) {
    if (typeof value !== 'number' || value < 0) return { isValid: false, message: 'Must be a non-negative number' };
    if (value > 24) return { isValid: false, message: 'Must be 24 months or less' };
  }
  return { isValid: true };
}

export function validateEnergyEfficiency(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validEfficiencies = ['basic', 'standard', 'efficient', 'green', 'leed-certified'];
    if (!validEfficiencies.includes(value)) return { isValid: false, message: 'Invalid energy efficiency' };
  }
  return { isValid: true };
}

export function validateAccessibility(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validAccessibilities = ['excellent', 'good', 'fair', 'poor'];
    if (!validAccessibilities.includes(value)) return { isValid: false, message: 'Invalid accessibility' };
  }
  return { isValid: true };
}

export function validateInfrastructure(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validInfrastructures = ['excellent', 'good', 'fair', 'poor'];
    if (!validInfrastructures.includes(value)) return { isValid: false, message: 'Invalid infrastructure' };
  }
  return { isValid: true };
}

export function validateWorkforceAvailability(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validAvailabilities = ['excellent', 'good', 'fair', 'poor'];
    if (!validAvailabilities.includes(value)) return { isValid: false, message: 'Invalid workforce availability' };
  }
  return { isValid: true };
}

export function validateRegulatoryEnvironment(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validEnvironments = ['business-friendly', 'moderate', 'restrictive', 'very-restrictive'];
    if (!validEnvironments.includes(value)) return { isValid: false, message: 'Invalid regulatory environment' };
  }
  return { isValid: true };
}

export function validateAllIndustrialWarehouseProfitabilityInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const totalSquareFootageResult = validateTotalSquareFootage(inputs.totalSquareFootage);
  if (!totalSquareFootageResult.isValid) errors.push(totalSquareFootageResult.message!);

  const warehouseTypeResult = validateWarehouseType(inputs.warehouseType);
  if (!warehouseTypeResult.isValid) errors.push(warehouseTypeResult.message!);

  const clearHeightResult = validateClearHeight(inputs.clearHeight);
  if (!clearHeightResult.isValid) errors.push(clearHeightResult.message!);

  const loadingDocksResult = validateLoadingDocks(inputs.loadingDocks);
  if (!loadingDocksResult.isValid) errors.push(loadingDocksResult.message!);

  const parkingSpacesResult = validateParkingSpaces(inputs.parkingSpaces);
  if (!parkingSpacesResult.isValid) errors.push(parkingSpacesResult.message!);

  const officeSpaceResult = validateOfficeSpace(inputs.officeSpace);
  if (!officeSpaceResult.isValid) errors.push(officeSpaceResult.message!);

  const landAreaResult = validateLandArea(inputs.landArea);
  if (!landAreaResult.isValid) errors.push(landAreaResult.message!);

  const locationTypeResult = validateLocationType(inputs.locationType);
  if (!locationTypeResult.isValid) errors.push(locationTypeResult.message!);

  const marketTypeResult = validateMarketType(inputs.marketType);
  if (!marketTypeResult.isValid) errors.push(marketTypeResult.message!);

  const competitionLevelResult = validateCompetitionLevel(inputs.competitionLevel);
  if (!competitionLevelResult.isValid) errors.push(competitionLevelResult.message!);

  const demandGrowthResult = validateDemandGrowth(inputs.demandGrowth);
  if (!demandGrowthResult.isValid) errors.push(demandGrowthResult.message!);

  const vacancyRateResult = validateVacancyRate(inputs.vacancyRate);
  if (!vacancyRateResult.isValid) errors.push(vacancyRateResult.message!);

  const rentalRateResult = validateRentalRate(inputs.rentalRate);
  if (!rentalRateResult.isValid) errors.push(rentalRateResult.message!);

  const rentalEscalationResult = validateRentalEscalation(inputs.rentalEscalation);
  if (!rentalEscalationResult.isValid) errors.push(rentalEscalationResult.message!);

  const landCostResult = validateLandCost(inputs.landCost);
  if (!landCostResult.isValid) errors.push(landCostResult.message!);

  const landCostPerAcreResult = validateLandCostPerAcre(inputs.landCostPerAcre);
  if (!landCostPerAcreResult.isValid) errors.push(landCostPerAcreResult.message!);

  const constructionCostResult = validateConstructionCost(inputs.constructionCost);
  if (!constructionCostResult.isValid) errors.push(constructionCostResult.message!);

  const softCostsResult = validateSoftCosts(inputs.softCosts);
  if (!softCostsResult.isValid) errors.push(softCostsResult.message!);

  const softCostPercentageResult = validateSoftCostPercentage(inputs.softCostPercentage);
  if (!softCostPercentageResult.isValid) errors.push(softCostPercentageResult.message!);

  const siteWorkResult = validateSiteWork(inputs.siteWork);
  if (!siteWorkResult.isValid) errors.push(siteWorkResult.message!);

  const utilityConnectionCostsResult = validateUtilityConnectionCosts(inputs.utilityConnectionCosts);
  if (!utilityConnectionCostsResult.isValid) errors.push(utilityConnectionCostsResult.message!);

  const permitsResult = validatePermits(inputs.permits);
  if (!permitsResult.isValid) errors.push(permitsResult.message!);

  const financingCostsResult = validateFinancingCosts(inputs.financingCosts);
  if (!financingCostsResult.isValid) errors.push(financingCostsResult.message!);

  const contingencyResult = validateContingency(inputs.contingency);
  if (!contingencyResult.isValid) errors.push(contingencyResult.message!);

  const operatingExpensesResult = validateOperatingExpenses(inputs.operatingExpenses);
  if (!operatingExpensesResult.isValid) errors.push(operatingExpensesResult.message!);

  const propertyTaxesResult = validatePropertyTaxes(inputs.propertyTaxes);
  if (!propertyTaxesResult.isValid) errors.push(propertyTaxesResult.message!);

  const insuranceResult = validateInsurance(inputs.insurance);
  if (!insuranceResult.isValid) errors.push(insuranceResult.message!);

  const maintenanceResult = validateMaintenance(inputs.maintenance);
  if (!maintenanceResult.isValid) errors.push(maintenanceResult.message!);

  const annualUtilitiesResult = validateAnnualUtilities(inputs.annualUtilities);
  if (!annualUtilitiesResult.isValid) errors.push(annualUtilitiesResult.message!);

  const managementFeesResult = validateManagementFees(inputs.managementFees);
  if (!managementFeesResult.isValid) errors.push(managementFeesResult.message!);

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

  const exitYearResult = validateExitYear(inputs.exitYear);
  if (!exitYearResult.isValid) errors.push(exitYearResult.message!);

  const exitCapRateResult = validateExitCapRate(inputs.exitCapRate);
  if (!exitCapRateResult.isValid) errors.push(exitCapRateResult.message!);

  const marketRentGrowthResult = validateMarketRentGrowth(inputs.marketRentGrowth);
  if (!marketRentGrowthResult.isValid) errors.push(marketRentGrowthResult.message!);

  const expenseGrowthResult = validateExpenseGrowth(inputs.expenseGrowth);
  if (!expenseGrowthResult.isValid) errors.push(expenseGrowthResult.message!);

  const constructionTimeResult = validateConstructionTime(inputs.constructionTime);
  if (!constructionTimeResult.isValid) errors.push(constructionTimeResult.message!);

  const stabilizationTimeResult = validateStabilizationTime(inputs.stabilizationTime);
  if (!stabilizationTimeResult.isValid) errors.push(stabilizationTimeResult.message!);

  const energyEfficiencyResult = validateEnergyEfficiency(inputs.energyEfficiency);
  if (!energyEfficiencyResult.isValid) errors.push(energyEfficiencyResult.message!);

  const accessibilityResult = validateAccessibility(inputs.accessibility);
  if (!accessibilityResult.isValid) errors.push(accessibilityResult.message!);

  const infrastructureResult = validateInfrastructure(inputs.infrastructure);
  if (!infrastructureResult.isValid) errors.push(infrastructureResult.message!);

  const workforceAvailabilityResult = validateWorkforceAvailability(inputs.workforceAvailability);
  if (!workforceAvailabilityResult.isValid) errors.push(workforceAvailabilityResult.message!);

  const regulatoryEnvironmentResult = validateRegulatoryEnvironment(inputs.regulatoryEnvironment);
  if (!regulatoryEnvironmentResult.isValid) errors.push(regulatoryEnvironmentResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}
