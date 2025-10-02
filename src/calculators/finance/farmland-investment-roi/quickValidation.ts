import { CalculatorInputs } from '../../types/calculator';

export function validateLandAcres(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Land size must be a number' };
  }
  if (numValue < 1) {
    return { isValid: false, message: 'Land size must be at least 1 acre' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Land size cannot exceed 100,000 acres' };
  }
  return { isValid: true };
}

export function validatePurchasePrice(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Purchase price must be a number' };
  }
  if (numValue < 10000) {
    return { isValid: false, message: 'Purchase price must be at least $10,000' };
  }
  if (numValue > 100000000) {
    return { isValid: false, message: 'Purchase price cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Down payment must be a number' };
  }
  if (numValue < 5000) {
    return { isValid: false, message: 'Down payment must be at least $5,000' };
  }
  if (numValue > 50000000) {
    return { isValid: false, message: 'Down payment cannot exceed $50,000,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Interest rate must be a number' };
  }
  if (numValue < 1) {
    return { isValid: false, message: 'Interest rate must be at least 1%' };
  }
  if (numValue > 20) {
    return { isValid: false, message: 'Interest rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Loan term must be a number' };
  }
  if (numValue < 5) {
    return { isValid: false, message: 'Loan term must be at least 5 years' };
  }
  if (numValue > 50) {
    return { isValid: false, message: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateAnnualCropRevenue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Annual crop revenue must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Annual crop revenue cannot be negative' };
  }
  if (numValue > 10000000) {
    return { isValid: false, message: 'Annual crop revenue cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateCropType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validCropTypes = ['corn', 'soybeans', 'wheat', 'cotton', 'rice', 'sorghum', 'barley', 'oats', 'sunflowers', 'canola', 'mixed', 'other'];
  if (!validCropTypes.includes(value)) {
    return { isValid: false, message: 'Invalid crop type' };
  }
  return { isValid: true };
}

export function validateYieldPerAcre(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Yield per acre must be a number' };
  }
  if (numValue < 1) {
    return { isValid: false, message: 'Yield per acre must be at least 1 bushel/acre' };
  }
  if (numValue > 1000) {
    return { isValid: false, message: 'Yield per acre cannot exceed 1,000 bushels/acre' };
  }
  return { isValid: true };
}

export function validateCropPrice(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Crop price must be a number' };
  }
  if (numValue < 0.1) {
    return { isValid: false, message: 'Crop price must be at least $0.10 per unit' };
  }
  if (numValue > 100) {
    return { isValid: false, message: 'Crop price cannot exceed $100 per unit' };
  }
  return { isValid: true };
}

export function validateOperatingCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Operating costs must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Operating costs cannot be negative' };
  }
  if (numValue > 5000000) {
    return { isValid: false, message: 'Operating costs cannot exceed $5,000,000' };
  }
  return { isValid: true };
}

export function validateLandTaxes(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Land taxes must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Land taxes cannot be negative' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Land taxes cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateInsuranceCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Insurance costs must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Insurance costs cannot be negative' };
  }
  if (numValue > 50000) {
    return { isValid: false, message: 'Insurance costs cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateMaintenanceCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Maintenance costs must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Maintenance costs cannot be negative' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Maintenance costs cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateLandAppreciation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Land appreciation must be a number' };
  }
  if (numValue < -10) {
    return { isValid: false, message: 'Land appreciation cannot be less than -10%' };
  }
  if (numValue > 20) {
    return { isValid: false, message: 'Land appreciation cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Inflation rate must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Inflation rate cannot be negative' };
  }
  if (numValue > 15) {
    return { isValid: false, message: 'Inflation rate cannot exceed 15%' };
  }
  return { isValid: true };
}

export function validateHoldingPeriod(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Holding period must be a number' };
  }
  if (numValue < 1) {
    return { isValid: false, message: 'Holding period must be at least 1 year' };
  }
  if (numValue > 50) {
    return { isValid: false, message: 'Holding period cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateSoilQuality(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validSoilQualities = ['excellent', 'good', 'average', 'poor', 'marginal'];
  if (!validSoilQualities.includes(value)) {
    return { isValid: false, message: 'Invalid soil quality rating' };
  }
  return { isValid: true };
}

export function validateIrrigationType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validIrrigationTypes = ['none', 'drip', 'sprinkler', 'flood', 'center-pivot', 'subsurface'];
  if (!validIrrigationTypes.includes(value)) {
    return { isValid: false, message: 'Invalid irrigation type' };
  }
  return { isValid: true };
}

export function validateClimateZone(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validClimateZones = ['arid', 'semi-arid', 'temperate', 'humid', 'tropical', 'mediterranean'];
  if (!validClimateZones.includes(value)) {
    return { isValid: false, message: 'Invalid climate zone' };
  }
  return { isValid: true };
}

export function validateMarketAccess(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validMarketAccess = ['excellent', 'good', 'average', 'poor', 'remote'];
  if (!validMarketAccess.includes(value)) {
    return { isValid: false, message: 'Invalid market access rating' };
  }
  return { isValid: true };
}

export function validateGovernmentSubsidies(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Government subsidies must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Government subsidies cannot be negative' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Government subsidies cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateConservationPrograms(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const validConservationPrograms = ['none', 'crop-insurance', 'conservation-reserve', 'wetlands-reserve', 'environmental-quality-incentives'];
  if (!validConservationPrograms.includes(value)) {
    return { isValid: false, message: 'Invalid conservation program' };
  }
  return { isValid: true };
}

export function validateOrganicCertification(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const validOrganicCertifications = ['none', 'certified-organic', 'transitioning', 'conventional'];
  if (!validOrganicCertifications.includes(value)) {
    return { isValid: false, message: 'Invalid organic certification status' };
  }
  return { isValid: true };
}

export function validateEnergyCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Energy costs must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Energy costs cannot be negative' };
  }
  if (numValue > 50000) {
    return { isValid: false, message: 'Energy costs cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateLaborCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Labor costs must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Labor costs cannot be negative' };
  }
  if (numValue > 200000) {
    return { isValid: false, message: 'Labor costs cannot exceed $200,000' };
  }
  return { isValid: true };
}

export function validateEquipmentCosts(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Equipment costs must be a number' };
  }
  if (numValue < 0) {
    return { isValid: false, message: 'Equipment costs cannot be negative' };
  }
  if (numValue > 100000) {
    return { isValid: false, message: 'Equipment costs cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateWaterRights(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const validWaterRights = ['owned', 'leased', 'shared', 'none', 'restricted'];
  if (!validWaterRights.includes(value)) {
    return { isValid: false, message: 'Invalid water rights status' };
  }
  return { isValid: true };
}

export function validateMineralRights(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const validMineralRights = ['owned', 'leased', 'shared', 'none', 'sold'];
  if (!validMineralRights.includes(value)) {
    return { isValid: false, message: 'Invalid mineral rights status' };
  }
  return { isValid: true };
}

export function validateZoningRestrictions(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === '' || value === null || value === undefined) {
    return { isValid: true }; // Optional field
  }
  const validZoningRestrictions = ['none', 'agricultural-only', 'mixed-use', 'development-restricted', 'conservation-easement'];
  if (!validZoningRestrictions.includes(value)) {
    return { isValid: false, message: 'Invalid zoning restrictions' };
  }
  return { isValid: true };
}

export function validateAllFarmlandInvestmentInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields validation
  if (!inputs.landAcres) errors.push('Land size is required');
  if (!inputs.purchasePrice) errors.push('Purchase price is required');
  if (!inputs.downPayment) errors.push('Down payment is required');
  if (!inputs.interestRate) errors.push('Interest rate is required');
  if (!inputs.loanTerm) errors.push('Loan term is required');
  if (!inputs.annualCropRevenue) errors.push('Annual crop revenue is required');
  if (!inputs.cropType) errors.push('Crop type is required');
  if (!inputs.yieldPerAcre) errors.push('Yield per acre is required');
  if (!inputs.cropPrice) errors.push('Crop price is required');
  if (!inputs.operatingCosts) errors.push('Operating costs is required');
  if (!inputs.landTaxes) errors.push('Land taxes is required');
  if (!inputs.insuranceCosts) errors.push('Insurance costs is required');
  if (!inputs.maintenanceCosts) errors.push('Maintenance costs is required');
  if (!inputs.landAppreciation) errors.push('Land appreciation is required');
  if (!inputs.inflationRate) errors.push('Inflation rate is required');
  if (!inputs.holdingPeriod) errors.push('Holding period is required');
  if (!inputs.soilQuality) errors.push('Soil quality is required');
  if (!inputs.irrigationType) errors.push('Irrigation type is required');
  if (!inputs.climateZone) errors.push('Climate zone is required');
  if (!inputs.marketAccess) errors.push('Market access is required');

  // Individual field validation
  if (inputs.landAcres) {
    const result = validateLandAcres(inputs.landAcres);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.purchasePrice) {
    const result = validatePurchasePrice(inputs.purchasePrice);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.downPayment) {
    const result = validateDownPayment(inputs.downPayment);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.interestRate) {
    const result = validateInterestRate(inputs.interestRate);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.loanTerm) {
    const result = validateLoanTerm(inputs.loanTerm);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.annualCropRevenue) {
    const result = validateAnnualCropRevenue(inputs.annualCropRevenue);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.cropType) {
    const result = validateCropType(inputs.cropType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.yieldPerAcre) {
    const result = validateYieldPerAcre(inputs.yieldPerAcre);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.cropPrice) {
    const result = validateCropPrice(inputs.cropPrice);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.operatingCosts) {
    const result = validateOperatingCosts(inputs.operatingCosts);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.landTaxes) {
    const result = validateLandTaxes(inputs.landTaxes);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.insuranceCosts) {
    const result = validateInsuranceCosts(inputs.insuranceCosts);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.maintenanceCosts) {
    const result = validateMaintenanceCosts(inputs.maintenanceCosts);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.landAppreciation) {
    const result = validateLandAppreciation(inputs.landAppreciation);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.inflationRate) {
    const result = validateInflationRate(inputs.inflationRate);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.holdingPeriod) {
    const result = validateHoldingPeriod(inputs.holdingPeriod);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.soilQuality) {
    const result = validateSoilQuality(inputs.soilQuality);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.irrigationType) {
    const result = validateIrrigationType(inputs.irrigationType);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.climateZone) {
    const result = validateClimateZone(inputs.climateZone);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.marketAccess) {
    const result = validateMarketAccess(inputs.marketAccess);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.governmentSubsidies) {
    const result = validateGovernmentSubsidies(inputs.governmentSubsidies);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.conservationPrograms) {
    const result = validateConservationPrograms(inputs.conservationPrograms);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.organicCertification) {
    const result = validateOrganicCertification(inputs.organicCertification);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.energyCosts) {
    const result = validateEnergyCosts(inputs.energyCosts);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.laborCosts) {
    const result = validateLaborCosts(inputs.laborCosts);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.equipmentCosts) {
    const result = validateEquipmentCosts(inputs.equipmentCosts);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.waterRights) {
    const result = validateWaterRights(inputs.waterRights);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.mineralRights) {
    const result = validateMineralRights(inputs.mineralRights);
    if (!result.isValid) errors.push(result.message!);
  }

  if (inputs.zoningRestrictions) {
    const result = validateZoningRestrictions(inputs.zoningRestrictions);
    if (!result.isValid) errors.push(result.message!);
  }

  // Logical consistency checks
  if (inputs.purchasePrice && inputs.downPayment) {
    const purchasePrice = Number(inputs.purchasePrice);
    const downPayment = Number(inputs.downPayment);
    if (downPayment > purchasePrice) {
      errors.push('Down payment cannot exceed purchase price');
    }
  }

  if (inputs.annualCropRevenue && inputs.landAcres && inputs.yieldPerAcre && inputs.cropPrice) {
    const annualCropRevenue = Number(inputs.annualCropRevenue);
    const landAcres = Number(inputs.landAcres);
    const yieldPerAcre = Number(inputs.yieldPerAcre);
    const cropPrice = Number(inputs.cropPrice);
    const expectedRevenue = landAcres * yieldPerAcre * cropPrice;
    if (Math.abs(annualCropRevenue - expectedRevenue) > expectedRevenue * 0.5) {
      errors.push('Annual crop revenue seems inconsistent with yield and price');
    }
  }

  if (inputs.operatingCosts && inputs.annualCropRevenue) {
    const operatingCosts = Number(inputs.operatingCosts);
    const annualCropRevenue = Number(inputs.annualCropRevenue);
    const costRatio = operatingCosts / annualCropRevenue;
    if (costRatio > 0.9) {
      errors.push('Operating costs are very high relative to revenue');
    }
  }

  if (inputs.holdingPeriod && inputs.loanTerm) {
    const holdingPeriod = Number(inputs.holdingPeriod);
    const loanTerm = Number(inputs.loanTerm);
    if (holdingPeriod > loanTerm) {
      errors.push('Holding period cannot exceed loan term');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
