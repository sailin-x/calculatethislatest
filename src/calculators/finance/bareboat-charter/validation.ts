import { ValidationResult } from '../../../types/calculator';

/**
 * Validate bareboat charter calculator inputs
 */
export function validateBareboatCharterInputs(inputs: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validation
  const requiredFields = [
    'vesselValue', 'charterDuration', 'bareboatRate', 'timeCharterRate',
    'operatingCosts', 'insuranceCosts', 'maintenanceReserve', 'utilizationRate',
    'fuelPrice', 'fuelConsumption', 'crewCosts', 'portCharges'
  ];

  for (const field of requiredFields) {
    if (inputs[field] === undefined || inputs[field] === null || inputs[field] === '') {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Vessel value validation
  if (inputs.vesselValue < 100000) {
    errors.push('Vessel value must be at least $100,000');
  } else if (inputs.vesselValue > 1000000000) {
    errors.push('Vessel value cannot exceed $1 billion');
  }

  // Charter duration validation
  if (inputs.charterDuration < 1) {
    errors.push('Charter duration must be at least 1 month');
  } else if (inputs.charterDuration > 120) {
    errors.push('Charter duration cannot exceed 120 months (10 years)');
  }

  // Charter rates validation
  if (inputs.bareboatRate < 1000) {
    errors.push('Bareboat charter rate must be at least $1,000 per day');
  } else if (inputs.bareboatRate > 100000) {
    errors.push('Bareboat charter rate cannot exceed $100,000 per day');
  }

  if (inputs.timeCharterRate < 1000) {
    errors.push('Time charter rate must be at least $1,000 per day');
  } else if (inputs.timeCharterRate > 100000) {
    errors.push('Time charter rate cannot exceed $100,000 per day');
  }

  // Operating costs validation
  if (inputs.operatingCosts < 100) {
    errors.push('Operating costs must be at least $100 per day');
  } else if (inputs.operatingCosts > 50000) {
    errors.push('Operating costs cannot exceed $50,000 per day');
  }

  // Insurance costs validation
  if (inputs.insuranceCosts < 50) {
    errors.push('Insurance costs must be at least $50 per day');
  } else if (inputs.insuranceCosts > 10000) {
    errors.push('Insurance costs cannot exceed $10,000 per day');
  }

  // Maintenance reserve validation
  if (inputs.maintenanceReserve < 0) {
    errors.push('Maintenance reserve cannot be negative');
  } else if (inputs.maintenanceReserve > 20000) {
    errors.push('Maintenance reserve cannot exceed $20,000 per day');
  }

  // Utilization rate validation
  if (inputs.utilizationRate < 50) {
    errors.push('Utilization rate must be at least 50%');
  } else if (inputs.utilizationRate > 100) {
    errors.push('Utilization rate cannot exceed 100%');
  }

  // Fuel price validation
  if (inputs.fuelPrice < 100) {
    errors.push('Fuel price must be at least $100 per ton');
  } else if (inputs.fuelPrice > 2000) {
    errors.push('Fuel price cannot exceed $2,000 per ton');
  }

  // Fuel consumption validation
  if (inputs.fuelConsumption < 1) {
    errors.push('Fuel consumption must be at least 1 ton per day');
  } else if (inputs.fuelConsumption > 100) {
    errors.push('Fuel consumption cannot exceed 100 tons per day');
  }

  // Crew costs validation
  if (inputs.crewCosts < 500) {
    errors.push('Crew costs must be at least $500 per day');
  } else if (inputs.crewCosts > 15000) {
    errors.push('Crew costs cannot exceed $15,000 per day');
  }

  // Port charges validation
  if (inputs.portCharges < 0) {
    errors.push('Port charges cannot be negative');
  } else if (inputs.portCharges > 10000) {
    errors.push('Port charges cannot exceed $10,000 per day');
  }

  // Cross-field validation
  if (inputs.timeCharterRate <= inputs.bareboatRate) {
    warnings.push('Time charter rate should typically be higher than bareboat rate due to additional operational responsibilities');
  }

  // Business rule validation
  const totalDailyCosts = inputs.operatingCosts + inputs.insuranceCosts + inputs.maintenanceReserve;
  if (totalDailyCosts >= inputs.bareboatRate) {
    errors.push('Total daily costs cannot exceed or equal bareboat charter rate');
  }

  const timeCharterDailyCosts = (inputs.fuelPrice * inputs.fuelConsumption) + inputs.crewCosts + inputs.portCharges;
  if (timeCharterDailyCosts >= inputs.timeCharterRate) {
    errors.push('Total daily costs for time charter cannot exceed or equal time charter rate');
  }

  // Vessel efficiency validation
  const fuelCostPerDay = inputs.fuelPrice * inputs.fuelConsumption;
  const fuelCostPercentage = (fuelCostPerDay / inputs.timeCharterRate) * 100;
  
  if (fuelCostPercentage > 50) {
    warnings.push('Fuel costs represent more than 50% of time charter rate - consider fuel efficiency');
  }

  // Charter duration vs utilization validation
  if (inputs.charterDuration < 6 && inputs.utilizationRate < 80) {
    warnings.push('Short-term charters with low utilization may have higher operational risks');
  }

  // Market rate validation (industry standards)
  const vesselValuePerDay = inputs.vesselValue / (inputs.charterDuration * 30.44);
  const bareboatRateRatio = inputs.bareboatRate / vesselValuePerDay;
  
  if (bareboatRateRatio < 0.001) {
    warnings.push('Bareboat rate appears very low relative to vessel value');
  } else if (bareboatRateRatio > 0.01) {
    warnings.push('Bareboat rate appears very high relative to vessel value');
  }

  // Insurance cost validation
  const insuranceToVesselRatio = (inputs.insuranceCosts * 365) / inputs.vesselValue;
  if (insuranceToVesselRatio < 0.001) {
    warnings.push('Insurance costs appear very low relative to vessel value');
  } else if (insuranceToVesselRatio > 0.05) {
    warnings.push('Insurance costs appear very high relative to vessel value');
  }

  // Crew cost validation
  if (inputs.crewCosts < inputs.operatingCosts * 0.3) {
    warnings.push('Crew costs appear low relative to total operating costs');
  } else if (inputs.crewCosts > inputs.operatingCosts * 0.8) {
    warnings.push('Crew costs appear high relative to total operating costs');
  }

  // Port charges validation
  if (inputs.portCharges > inputs.crewCosts * 0.5) {
    warnings.push('Port charges appear high relative to crew costs');
  }

  // Utilization rate business rules
  if (inputs.utilizationRate < 70) {
    warnings.push('Low utilization rate may indicate operational inefficiencies');
  }

  if (inputs.utilizationRate > 95) {
    warnings.push('Very high utilization rate may not be sustainable long-term');
  }

  // Charter duration business rules
  if (inputs.charterDuration < 3) {
    warnings.push('Very short charter duration may have higher transaction costs');
  }

  if (inputs.charterDuration > 60) {
    warnings.push('Very long charter duration may have market risk exposure');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate charter rate competitiveness
 */
export function validateCharterRates(
  bareboatRate: number,
  timeCharterRate: number,
  vesselValue: number,
  charterDuration: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Rate relationship validation
  if (timeCharterRate <= bareboatRate) {
    errors.push('Time charter rate should be higher than bareboat rate');
  }

  // Rate to vessel value ratio
  const vesselValuePerDay = vesselValue / (charterDuration * 30.44);
  const bareboatRatio = bareboatRate / vesselValuePerDay;
  const timeCharterRatio = timeCharterRate / vesselValuePerDay;

  if (bareboatRatio < 0.0005) {
    warnings.push('Bareboat rate may be too low for vessel value');
  } else if (bareboatRatio > 0.02) {
    warnings.push('Bareboat rate may be too high for vessel value');
  }

  if (timeCharterRatio < 0.001) {
    warnings.push('Time charter rate may be too low for vessel value');
  } else if (timeCharterRatio > 0.03) {
    warnings.push('Time charter rate may be too high for vessel value');
  }

  // Rate spread validation
  const rateSpread = timeCharterRate - bareboatRate;
  const spreadPercentage = (rateSpread / bareboatRate) * 100;

  if (spreadPercentage < 10) {
    warnings.push('Rate spread between time charter and bareboat appears narrow');
  } else if (spreadPercentage > 100) {
    warnings.push('Rate spread between time charter and bareboat appears very wide');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate fuel efficiency parameters
 */
export function validateFuelEfficiency(
  fuelConsumption: number,
  fuelPrice: number,
  vesselValue: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Fuel consumption validation
  if (fuelConsumption < 1) {
    errors.push('Fuel consumption must be at least 1 ton per day');
  } else if (fuelConsumption > 100) {
    errors.push('Fuel consumption cannot exceed 100 tons per day');
  }

  // Fuel price validation
  if (fuelPrice < 100) {
    errors.push('Fuel price must be at least $100 per ton');
  } else if (fuelPrice > 2000) {
    errors.push('Fuel price cannot exceed $2,000 per ton');
  }

  // Fuel efficiency ratio
  const dailyFuelCost = fuelConsumption * fuelPrice;
  const vesselValuePerDay = vesselValue / 365;
  const fuelToVesselRatio = dailyFuelCost / vesselValuePerDay;

  if (fuelToVesselRatio > 0.1) {
    warnings.push('Daily fuel costs appear high relative to vessel value');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate operational parameters
 */
export function validateOperationalParameters(
  operatingCosts: number,
  crewCosts: number,
  portCharges: number,
  utilizationRate: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Cost structure validation
  const totalDailyCosts = operatingCosts + crewCosts + portCharges;
  
  if (crewCosts > operatingCosts * 0.8) {
    warnings.push('Crew costs represent a very high percentage of operating costs');
  }

  if (portCharges > crewCosts * 0.5) {
    warnings.push('Port charges appear high relative to crew costs');
  }

  // Utilization impact validation
  if (utilizationRate < 70) {
    warnings.push('Low utilization rate may significantly impact profitability');
  }

  if (utilizationRate > 95) {
    warnings.push('Very high utilization rate may not be sustainable');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
