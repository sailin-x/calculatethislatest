import { CalculatorInputs } from '../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateFarmlandInvestmentInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: string[] = [];

  const requiredFields = [
    'landAcres', 'purchasePrice', 'downPayment', 'interestRate', 'loanTerm',
    'annualCropRevenue', 'cropType', 'yieldPerAcre', 'cropPrice', 'operatingCosts',
    'landTaxes', 'insuranceCosts', 'maintenanceCosts', 'landAppreciation',
    'inflationRate', 'holdingPeriod', 'soilQuality', 'irrigationType',
    'climateZone', 'marketAccess'
  ];

  requiredFields.forEach(field => {
    if (!(field in inputs) || inputs[field] === undefined || inputs[field] === null) {
      errors.push(`${field} is required`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Validate land acres
  const landAcres = Number(inputs.landAcres);
  if (isNaN(landAcres) || landAcres < 1 || landAcres > 100000) {
    errors.push('Land size must be between 1 and 100,000 acres');
  }

  // Validate purchase price
  const purchasePrice = Number(inputs.purchasePrice);
  if (isNaN(purchasePrice) || purchasePrice < 10000 || purchasePrice > 100000000) {
    errors.push('Purchase price must be between $10,000 and $100,000,000');
  }

  // Validate down payment
  const downPayment = Number(inputs.downPayment);
  if (isNaN(downPayment) || downPayment < 5000 || downPayment > 50000000) {
    errors.push('Down payment must be between $5,000 and $50,000,000');
  }

  // Validate interest rate
  const interestRate = Number(inputs.interestRate);
  if (isNaN(interestRate) || interestRate < 1 || interestRate > 20) {
    errors.push('Interest rate must be between 1% and 20%');
  }

  // Validate loan term
  const loanTerm = Number(inputs.loanTerm);
  if (isNaN(loanTerm) || loanTerm < 5 || loanTerm > 50) {
    errors.push('Loan term must be between 5 and 50 years');
  }

  // Validate annual crop revenue
  const annualCropRevenue = Number(inputs.annualCropRevenue);
  if (isNaN(annualCropRevenue) || annualCropRevenue < 0 || annualCropRevenue > 10000000) {
    errors.push('Annual crop revenue must be between $0 and $10,000,000');
  }

  // Validate crop type
  const validCropTypes = ['corn', 'soybeans', 'wheat', 'cotton', 'rice', 'sorghum', 'barley', 'oats', 'sunflowers', 'canola', 'mixed', 'other'];
  if (!validCropTypes.includes(inputs.cropType)) {
    errors.push('Invalid crop type');
  }

  // Validate yield per acre
  const yieldPerAcre = Number(inputs.yieldPerAcre);
  if (isNaN(yieldPerAcre) || yieldPerAcre < 1 || yieldPerAcre > 1000) {
    errors.push('Yield per acre must be between 1 and 1,000 bushels/acre');
  }

  // Validate crop price
  const cropPrice = Number(inputs.cropPrice);
  if (isNaN(cropPrice) || cropPrice < 0.1 || cropPrice > 100) {
    errors.push('Crop price must be between $0.10 and $100 per unit');
  }

  // Validate operating costs
  const operatingCosts = Number(inputs.operatingCosts);
  if (isNaN(operatingCosts) || operatingCosts < 0 || operatingCosts > 5000000) {
    errors.push('Operating costs must be between $0 and $5,000,000');
  }

  // Validate land taxes
  const landTaxes = Number(inputs.landTaxes);
  if (isNaN(landTaxes) || landTaxes < 0 || landTaxes > 100000) {
    errors.push('Land taxes must be between $0 and $100,000');
  }

  // Validate insurance costs
  const insuranceCosts = Number(inputs.insuranceCosts);
  if (isNaN(insuranceCosts) || insuranceCosts < 0 || insuranceCosts > 50000) {
    errors.push('Insurance costs must be between $0 and $50,000');
  }

  // Validate maintenance costs
  const maintenanceCosts = Number(inputs.maintenanceCosts);
  if (isNaN(maintenanceCosts) || maintenanceCosts < 0 || maintenanceCosts > 100000) {
    errors.push('Maintenance costs must be between $0 and $100,000');
  }

  // Validate land appreciation
  const landAppreciation = Number(inputs.landAppreciation);
  if (isNaN(landAppreciation) || landAppreciation < -10 || landAppreciation > 20) {
    errors.push('Land appreciation must be between -10% and 20%');
  }

  // Validate inflation rate
  const inflationRate = Number(inputs.inflationRate);
  if (isNaN(inflationRate) || inflationRate < 0 || inflationRate > 15) {
    errors.push('Inflation rate must be between 0% and 15%');
  }

  // Validate holding period
  const holdingPeriod = Number(inputs.holdingPeriod);
  if (isNaN(holdingPeriod) || holdingPeriod < 1 || holdingPeriod > 50) {
    errors.push('Holding period must be between 1 and 50 years');
  }

  // Validate soil quality
  const validSoilQualities = ['excellent', 'good', 'average', 'poor', 'marginal'];
  if (!validSoilQualities.includes(inputs.soilQuality)) {
    errors.push('Invalid soil quality rating');
  }

  // Validate irrigation type
  const validIrrigationTypes = ['none', 'drip', 'sprinkler', 'flood', 'center-pivot', 'subsurface'];
  if (!validIrrigationTypes.includes(inputs.irrigationType)) {
    errors.push('Invalid irrigation type');
  }

  // Validate climate zone
  const validClimateZones = ['arid', 'semi-arid', 'temperate', 'humid', 'tropical', 'mediterranean'];
  if (!validClimateZones.includes(inputs.climateZone)) {
    errors.push('Invalid climate zone');
  }

  // Validate market access
  const validMarketAccess = ['excellent', 'good', 'average', 'poor', 'remote'];
  if (!validMarketAccess.includes(inputs.marketAccess)) {
    errors.push('Invalid market access rating');
  }

  // Validate optional fields if provided
  if (inputs.governmentSubsidies !== undefined && inputs.governmentSubsidies !== null) {
    const governmentSubsidies = Number(inputs.governmentSubsidies);
    if (isNaN(governmentSubsidies) || governmentSubsidies < 0 || governmentSubsidies > 100000) {
      errors.push('Government subsidies must be between $0 and $100,000');
    }
  }

  if (inputs.conservationPrograms) {
    const validConservationPrograms = ['none', 'crop-insurance', 'conservation-reserve', 'wetlands-reserve', 'environmental-quality-incentives'];
    if (!validConservationPrograms.includes(inputs.conservationPrograms)) {
      errors.push('Invalid conservation program');
    }
  }

  if (inputs.organicCertification) {
    const validOrganicCertifications = ['none', 'certified-organic', 'transitioning', 'conventional'];
    if (!validOrganicCertifications.includes(inputs.organicCertification)) {
      errors.push('Invalid organic certification status');
    }
  }

  if (inputs.energyCosts !== undefined && inputs.energyCosts !== null) {
    const energyCosts = Number(inputs.energyCosts);
    if (isNaN(energyCosts) || energyCosts < 0 || energyCosts > 50000) {
      errors.push('Energy costs must be between $0 and $50,000');
    }
  }

  if (inputs.laborCosts !== undefined && inputs.laborCosts !== null) {
    const laborCosts = Number(inputs.laborCosts);
    if (isNaN(laborCosts) || laborCosts < 0 || laborCosts > 200000) {
      errors.push('Labor costs must be between $0 and $200,000');
    }
  }

  if (inputs.equipmentCosts !== undefined && inputs.equipmentCosts !== null) {
    const equipmentCosts = Number(inputs.equipmentCosts);
    if (isNaN(equipmentCosts) || equipmentCosts < 0 || equipmentCosts > 100000) {
      errors.push('Equipment costs must be between $0 and $100,000');
    }
  }

  if (inputs.waterRights) {
    const validWaterRights = ['owned', 'leased', 'shared', 'none', 'restricted'];
    if (!validWaterRights.includes(inputs.waterRights)) {
      errors.push('Invalid water rights status');
    }
  }

  if (inputs.mineralRights) {
    const validMineralRights = ['owned', 'leased', 'shared', 'none', 'sold'];
    if (!validMineralRights.includes(inputs.mineralRights)) {
      errors.push('Invalid mineral rights status');
    }
  }

  if (inputs.zoningRestrictions) {
    const validZoningRestrictions = ['none', 'agricultural-only', 'mixed-use', 'development-restricted', 'conservation-easement'];
    if (!validZoningRestrictions.includes(inputs.zoningRestrictions)) {
      errors.push('Invalid zoning restrictions');
    }
  }

  // Logical consistency checks
  if (purchasePrice && downPayment) {
    if (downPayment > purchasePrice) {
      errors.push('Down payment cannot exceed purchase price');
    }
    if (downPayment < purchasePrice * 0.1) {
      errors.push('Down payment is very low relative to purchase price - verify accuracy');
    }
  }

  if (annualCropRevenue && landAcres && yieldPerAcre && cropPrice) {
    const expectedRevenue = landAcres * yieldPerAcre * cropPrice;
    if (Math.abs(annualCropRevenue - expectedRevenue) > expectedRevenue * 0.5) {
      errors.push('Annual crop revenue seems inconsistent with yield and price - verify accuracy');
    }
  }

  if (operatingCosts && annualCropRevenue) {
    const costRatio = operatingCosts / annualCropRevenue;
    if (costRatio > 0.9) {
      errors.push('Operating costs are very high relative to revenue - verify accuracy');
    }
    if (costRatio < 0.1) {
      errors.push('Operating costs are very low relative to revenue - verify accuracy');
    }
  }

  if (landTaxes && purchasePrice) {
    const taxRate = (landTaxes / purchasePrice) * 100;
    if (taxRate > 5) {
      errors.push('Property tax rate seems unusually high - verify accuracy');
    }
    if (taxRate < 0.1) {
      errors.push('Property tax rate seems unusually low - verify accuracy');
    }
  }

  if (holdingPeriod && loanTerm) {
    if (holdingPeriod > loanTerm) {
      errors.push('Holding period cannot exceed loan term');
    }
  }

  if (landAppreciation && inflationRate) {
    if (landAppreciation < inflationRate - 5) {
      errors.push('Land appreciation is very low relative to inflation - verify accuracy');
    }
    if (landAppreciation > inflationRate + 10) {
      errors.push('Land appreciation is very high relative to inflation - verify accuracy');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function quickValidateFarmlandInvestmentInput(field: string, value: any): string | null {
  switch (field) {
    case 'landAcres':
      const landAcres = Number(value);
      if (isNaN(landAcres)) return 'Land size must be a number';
      if (landAcres < 1) return 'Land size must be at least 1 acre';
      if (landAcres > 100000) return 'Land size cannot exceed 100,000 acres';
      break;

    case 'purchasePrice':
      const purchasePrice = Number(value);
      if (isNaN(purchasePrice)) return 'Purchase price must be a number';
      if (purchasePrice < 10000) return 'Purchase price must be at least $10,000';
      if (purchasePrice > 100000000) return 'Purchase price cannot exceed $100,000,000';
      break;

    case 'downPayment':
      const downPayment = Number(value);
      if (isNaN(downPayment)) return 'Down payment must be a number';
      if (downPayment < 5000) return 'Down payment must be at least $5,000';
      if (downPayment > 50000000) return 'Down payment cannot exceed $50,000,000';
      break;

    case 'interestRate':
      const interestRate = Number(value);
      if (isNaN(interestRate)) return 'Interest rate must be a number';
      if (interestRate < 1) return 'Interest rate must be at least 1%';
      if (interestRate > 20) return 'Interest rate cannot exceed 20%';
      break;

    case 'loanTerm':
      const loanTerm = Number(value);
      if (isNaN(loanTerm)) return 'Loan term must be a number';
      if (loanTerm < 5) return 'Loan term must be at least 5 years';
      if (loanTerm > 50) return 'Loan term cannot exceed 50 years';
      break;

    case 'annualCropRevenue':
      const annualCropRevenue = Number(value);
      if (isNaN(annualCropRevenue)) return 'Annual crop revenue must be a number';
      if (annualCropRevenue < 0) return 'Annual crop revenue cannot be negative';
      if (annualCropRevenue > 10000000) return 'Annual crop revenue cannot exceed $10,000,000';
      break;

    case 'yieldPerAcre':
      const yieldPerAcre = Number(value);
      if (isNaN(yieldPerAcre)) return 'Yield per acre must be a number';
      if (yieldPerAcre < 1) return 'Yield per acre must be at least 1 bushel/acre';
      if (yieldPerAcre > 1000) return 'Yield per acre cannot exceed 1,000 bushels/acre';
      break;

    case 'cropPrice':
      const cropPrice = Number(value);
      if (isNaN(cropPrice)) return 'Crop price must be a number';
      if (cropPrice < 0.1) return 'Crop price must be at least $0.10 per unit';
      if (cropPrice > 100) return 'Crop price cannot exceed $100 per unit';
      break;

    case 'operatingCosts':
      const operatingCosts = Number(value);
      if (isNaN(operatingCosts)) return 'Operating costs must be a number';
      if (operatingCosts < 0) return 'Operating costs cannot be negative';
      if (operatingCosts > 5000000) return 'Operating costs cannot exceed $5,000,000';
      break;

    case 'landTaxes':
      const landTaxes = Number(value);
      if (isNaN(landTaxes)) return 'Land taxes must be a number';
      if (landTaxes < 0) return 'Land taxes cannot be negative';
      if (landTaxes > 100000) return 'Land taxes cannot exceed $100,000';
      break;

    case 'insuranceCosts':
      const insuranceCosts = Number(value);
      if (isNaN(insuranceCosts)) return 'Insurance costs must be a number';
      if (insuranceCosts < 0) return 'Insurance costs cannot be negative';
      if (insuranceCosts > 50000) return 'Insurance costs cannot exceed $50,000';
      break;

    case 'maintenanceCosts':
      const maintenanceCosts = Number(value);
      if (isNaN(maintenanceCosts)) return 'Maintenance costs must be a number';
      if (maintenanceCosts < 0) return 'Maintenance costs cannot be negative';
      if (maintenanceCosts > 100000) return 'Maintenance costs cannot exceed $100,000';
      break;

    case 'landAppreciation':
      const landAppreciation = Number(value);
      if (isNaN(landAppreciation)) return 'Land appreciation must be a number';
      if (landAppreciation < -10) return 'Land appreciation cannot be less than -10%';
      if (landAppreciation > 20) return 'Land appreciation cannot exceed 20%';
      break;

    case 'inflationRate':
      const inflationRate = Number(value);
      if (isNaN(inflationRate)) return 'Inflation rate must be a number';
      if (inflationRate < 0) return 'Inflation rate cannot be negative';
      if (inflationRate > 15) return 'Inflation rate cannot exceed 15%';
      break;

    case 'holdingPeriod':
      const holdingPeriod = Number(value);
      if (isNaN(holdingPeriod)) return 'Holding period must be a number';
      if (holdingPeriod < 1) return 'Holding period must be at least 1 year';
      if (holdingPeriod > 50) return 'Holding period cannot exceed 50 years';
      break;
  }

  return null;
}
