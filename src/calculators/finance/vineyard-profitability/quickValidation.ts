import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateAcreage(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value === undefined || value === null || value === '') {
    errors.acreage = 'Acreage is required';
  } else {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.acreage = 'Acreage must be a valid number';
    } else if (numValue <= 0) {
      errors.acreage = 'Acreage must be greater than 0';
    } else if (numValue > 10000) {
      errors.acreage = 'Acreage cannot exceed 10,000 acres';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateVineType(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  const validTypes = ['standard', 'premium', 'organic'];
  
  if (!value) {
    errors.vineType = 'Vine type is required';
  } else if (!validTypes.includes(value.toLowerCase())) {
    errors.vineType = 'Please select a valid vine type (Standard, Premium, or Organic)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validatePlantingCosts(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value === undefined || value === null || value === '') {
    errors.plantingCosts = 'Planting costs are required';
  } else {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.plantingCosts = 'Planting costs must be a valid number';
    } else if (numValue <= 0) {
      errors.plantingCosts = 'Planting costs must be greater than 0';
    } else if (numValue > 100000) {
      errors.plantingCosts = 'Planting costs per acre cannot exceed $100,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateAnnualOperatingCosts(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value === undefined || value === null || value === '') {
    errors.annualOperatingCosts = 'Annual operating costs are required';
  } else {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.annualOperatingCosts = 'Annual operating costs must be a valid number';
    } else if (numValue <= 0) {
      errors.annualOperatingCosts = 'Annual operating costs must be greater than 0';
    } else if (numValue > 20000) {
      errors.annualOperatingCosts = 'Annual operating costs per acre cannot exceed $20,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateYieldPerAcre(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value === undefined || value === null || value === '') {
    errors.yieldPerAcre = 'Yield per acre is required';
  } else {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.yieldPerAcre = 'Yield per acre must be a valid number';
    } else if (numValue <= 0) {
      errors.yieldPerAcre = 'Yield per acre must be greater than 0';
    } else if (numValue > 15) {
      errors.yieldPerAcre = 'Yield per acre cannot exceed 15 tons';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validatePricePerTon(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value === undefined || value === null || value === '') {
    errors.pricePerTon = 'Price per ton is required';
  } else {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.pricePerTon = 'Price per ton must be a valid number';
    } else if (numValue <= 0) {
      errors.pricePerTon = 'Price per ton must be greater than 0';
    } else if (numValue > 10000) {
      errors.pricePerTon = 'Price per ton cannot exceed $10,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateEstablishmentPeriod(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value === undefined || value === null || value === '') {
    errors.establishmentPeriod = 'Establishment period is required';
  } else {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.establishmentPeriod = 'Establishment period must be a valid number';
    } else if (numValue <= 0) {
      errors.establishmentPeriod = 'Establishment period must be greater than 0';
    } else if (numValue > 10) {
      errors.establishmentPeriod = 'Establishment period cannot exceed 10 years';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateProductionLifespan(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value === undefined || value === null || value === '') {
    errors.productionLifespan = 'Production lifespan is required';
  } else {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.productionLifespan = 'Production lifespan must be a valid number';
    } else if (numValue <= 0) {
      errors.productionLifespan = 'Production lifespan must be greater than 0';
    } else if (numValue > 50) {
      errors.productionLifespan = 'Production lifespan cannot exceed 50 years';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateDiscountRate(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value === undefined || value === null || value === '') {
    errors.discountRate = 'Discount rate is required';
  } else {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.discountRate = 'Discount rate must be a valid number';
    } else if (numValue < 0) {
      errors.discountRate = 'Discount rate cannot be negative';
    } else if (numValue > 30) {
      errors.discountRate = 'Discount rate cannot exceed 30%';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateLaborCosts(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value !== undefined && value !== null && value !== '') {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.laborCosts = 'Labor costs must be a valid number';
    } else if (numValue < 0) {
      errors.laborCosts = 'Labor costs cannot be negative';
    } else if (numValue > 500000) {
      errors.laborCosts = 'Labor costs cannot exceed $500,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateEquipmentCosts(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value !== undefined && value !== null && value !== '') {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.equipmentCosts = 'Equipment costs must be a valid number';
    } else if (numValue < 0) {
      errors.equipmentCosts = 'Equipment costs cannot be negative';
    } else if (numValue > 1000000) {
      errors.equipmentCosts = 'Equipment costs cannot exceed $1,000,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateIrrigationCosts(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value !== undefined && value !== null && value !== '') {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.irrigationCosts = 'Irrigation costs must be a valid number';
    } else if (numValue < 0) {
      errors.irrigationCosts = 'Irrigation costs cannot be negative';
    } else if (numValue > 500000) {
      errors.irrigationCosts = 'Irrigation costs cannot exceed $500,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validatePestControlCosts(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value !== undefined && value !== null && value !== '') {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.pestControlCosts = 'Pest control costs must be a valid number';
    } else if (numValue < 0) {
      errors.pestControlCosts = 'Pest control costs cannot be negative';
    } else if (numValue > 100000) {
      errors.pestControlCosts = 'Pest control costs cannot exceed $100,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateHarvestingCosts(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value !== undefined && value !== null && value !== '') {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.harvestingCosts = 'Harvesting costs must be a valid number';
    } else if (numValue < 0) {
      errors.harvestingCosts = 'Harvesting costs cannot be negative';
    } else if (numValue > 200000) {
      errors.harvestingCosts = 'Harvesting costs cannot exceed $200,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateMarketingCosts(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value !== undefined && value !== null && value !== '') {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.marketingCosts = 'Marketing costs must be a valid number';
    } else if (numValue < 0) {
      errors.marketingCosts = 'Marketing costs cannot be negative';
    } else if (numValue > 100000) {
      errors.marketingCosts = 'Marketing costs cannot exceed $100,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateInsuranceCosts(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value !== undefined && value !== null && value !== '') {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.insuranceCosts = 'Insurance costs must be a valid number';
    } else if (numValue < 0) {
      errors.insuranceCosts = 'Insurance costs cannot be negative';
    } else if (numValue > 50000) {
      errors.insuranceCosts = 'Insurance costs cannot exceed $50,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateTaxRate(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value === undefined || value === null || value === '') {
    errors.taxRate = 'Tax rate is required';
  } else {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.taxRate = 'Tax rate must be a valid number';
    } else if (numValue < 0) {
      errors.taxRate = 'Tax rate cannot be negative';
    } else if (numValue > 50) {
      errors.taxRate = 'Tax rate cannot exceed 50%';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateLandValue(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value !== undefined && value !== null && value !== '') {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.landValue = 'Land value must be a valid number';
    } else if (numValue < 0) {
      errors.landValue = 'Land value cannot be negative';
    } else if (numValue > 50000000) {
      errors.landValue = 'Land value cannot exceed $50,000,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateReplantingCosts(value: any, allInputs?: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (value !== undefined && value !== null && value !== '') {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      errors.replantingCosts = 'Replanting costs must be a valid number';
    } else if (numValue < 0) {
      errors.replantingCosts = 'Replanting costs cannot be negative';
    } else if (numValue > 1000000) {
      errors.replantingCosts = 'Replanting costs cannot exceed $1,000,000';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateAllVineyardProfitabilityInputs(inputs: CalculatorInputs): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Validate all individual fields
  const validations = [
    validateAcreage(inputs.acreage, inputs),
    validateVineType(inputs.vineType, inputs),
    validatePlantingCosts(inputs.plantingCosts, inputs),
    validateAnnualOperatingCosts(inputs.annualOperatingCosts, inputs),
    validateYieldPerAcre(inputs.yieldPerAcre, inputs),
    validatePricePerTon(inputs.pricePerTon, inputs),
    validateEstablishmentPeriod(inputs.establishmentPeriod, inputs),
    validateProductionLifespan(inputs.productionLifespan, inputs),
    validateDiscountRate(inputs.discountRate, inputs),
    validateLaborCosts(inputs.laborCosts, inputs),
    validateEquipmentCosts(inputs.equipmentCosts, inputs),
    validateIrrigationCosts(inputs.irrigationCosts, inputs),
    validatePestControlCosts(inputs.pestControlCosts, inputs),
    validateHarvestingCosts(inputs.harvestingCosts, inputs),
    validateMarketingCosts(inputs.marketingCosts, inputs),
    validateInsuranceCosts(inputs.insuranceCosts, inputs),
    validateTaxRate(inputs.taxRate, inputs),
    validateLandValue(inputs.landValue, inputs),
    validateReplantingCosts(inputs.replantingCosts, inputs)
  ];
  
  // Collect all errors
  validations.forEach(validation => {
    Object.assign(errors, validation.errors);
  });
  
  // Cross-field validations
  if (inputs.acreage && inputs.plantingCosts && inputs.yieldPerAcre && inputs.pricePerTon) {
    const revenuePerAcre = (inputs.yieldPerAcre as number) * (inputs.pricePerTon as number);
    const plantingCostRatio = (inputs.plantingCosts as number) / revenuePerAcre;
    
    if (plantingCostRatio > 10) {
      errors.plantingCosts = 'Planting costs are extremely high relative to expected annual revenue';
    }
  }
  
  if (inputs.establishmentPeriod && inputs.productionLifespan) {
    const totalPeriod = (inputs.establishmentPeriod as number) + (inputs.productionLifespan as number);
    if (totalPeriod > 60) {
      errors.productionLifespan = 'Total project period cannot exceed 60 years';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
