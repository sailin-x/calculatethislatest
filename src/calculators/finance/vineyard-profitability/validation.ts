import { CalculatorInputs } from '../../../types/calculator';

export interface VineyardProfitabilityValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

export function validateVineyardProfitabilityInputs(inputs: CalculatorInputs): VineyardProfitabilityValidationResult {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};

  // Validate acreage
  if (!inputs.acreage || (inputs.acreage as number) <= 0) {
    errors.acreage = 'Acreage must be greater than 0';
  } else if ((inputs.acreage as number) > 1000) {
    warnings.acreage = 'Large vineyard operations may require specialized management';
  } else if ((inputs.acreage as number) < 5) {
    warnings.acreage = 'Small vineyards may face economies of scale challenges';
  }

  // Validate vine type
  const validVineTypes = ['standard', 'premium', 'organic'];
  if (!inputs.vineType || !validVineTypes.includes((inputs.vineType as string).toLowerCase())) {
    errors.vineType = 'Please select a valid vine type';
  }

  // Validate planting costs
  if (!inputs.plantingCosts || (inputs.plantingCosts as number) <= 0) {
    errors.plantingCosts = 'Planting costs must be greater than 0';
  } else if ((inputs.plantingCosts as number) < 5000) {
    warnings.plantingCosts = 'Planting costs seem low - ensure all establishment costs are included';
  } else if ((inputs.plantingCosts as number) > 50000) {
    warnings.plantingCosts = 'High planting costs - verify estimates with local contractors';
  }

  // Validate annual operating costs
  if (!inputs.annualOperatingCosts || (inputs.annualOperatingCosts as number) <= 0) {
    errors.annualOperatingCosts = 'Annual operating costs must be greater than 0';
  } else if ((inputs.annualOperatingCosts as number) < 1000) {
    warnings.annualOperatingCosts = 'Operating costs seem low - ensure all expenses are included';
  }

  // Validate yield per acre
  if (!inputs.yieldPerAcre || (inputs.yieldPerAcre as number) <= 0) {
    errors.yieldPerAcre = 'Yield per acre must be greater than 0';
  } else if ((inputs.yieldPerAcre as number) < 2) {
    warnings.yieldPerAcre = 'Low yield may indicate poor soil conditions or management issues';
  } else if ((inputs.yieldPerAcre as number) > 10) {
    warnings.yieldPerAcre = 'High yield projections should be verified with local conditions';
  }

  // Validate price per ton
  if (!inputs.pricePerTon || (inputs.pricePerTon as number) <= 0) {
    errors.pricePerTon = 'Price per ton must be greater than 0';
  } else if ((inputs.pricePerTon as number) < 500) {
    warnings.pricePerTon = 'Low pricing may indicate commodity-grade grapes';
  } else if ((inputs.pricePerTon as number) > 5000) {
    warnings.pricePerTon = 'Premium pricing requires established market relationships';
  }

  // Validate establishment period
  if (!inputs.establishmentPeriod || (inputs.establishmentPeriod as number) <= 0) {
    errors.establishmentPeriod = 'Establishment period must be greater than 0';
  } else if ((inputs.establishmentPeriod as number) < 3) {
    warnings.establishmentPeriod = 'Short establishment period may not allow for proper vine maturation';
  } else if ((inputs.establishmentPeriod as number) > 6) {
    warnings.establishmentPeriod = 'Extended establishment period increases financial risk';
  }

  // Validate production lifespan
  if (!inputs.productionLifespan || (inputs.productionLifespan as number) <= 0) {
    errors.productionLifespan = 'Production lifespan must be greater than 0';
  } else if ((inputs.productionLifespan as number) < 15) {
    warnings.productionLifespan = 'Short production period may not justify establishment costs';
  } else if ((inputs.productionLifespan as number) > 40) {
    warnings.productionLifespan = 'Very long production periods increase uncertainty';
  }

  // Validate discount rate
  if (inputs.discountRate === undefined || inputs.discountRate === null) {
    errors.discountRate = 'Discount rate is required';
  } else if ((inputs.discountRate as number) < 0) {
    errors.discountRate = 'Discount rate cannot be negative';
  } else if ((inputs.discountRate as number) > 30) {
    errors.discountRate = 'Discount rate seems unreasonably high';
  } else if ((inputs.discountRate as number) < 3) {
    warnings.discountRate = 'Low discount rate may not reflect agricultural investment risks';
  }

  // Validate labor costs
  if (!inputs.laborCosts || (inputs.laborCosts as number) < 0) {
    errors.laborCosts = 'Labor costs cannot be negative';
  } else if ((inputs.laborCosts as number) === 0) {
    warnings.laborCosts = 'Zero labor costs may be unrealistic for commercial operations';
  }

  // Validate equipment costs
  if (!inputs.equipmentCosts || (inputs.equipmentCosts as number) < 0) {
    errors.equipmentCosts = 'Equipment costs cannot be negative';
  }

  // Validate irrigation costs
  if (!inputs.irrigationCosts || (inputs.irrigationCosts as number) < 0) {
    errors.irrigationCosts = 'Irrigation costs cannot be negative';
  } else if ((inputs.irrigationCosts as number) === 0) {
    warnings.irrigationCosts = 'Most vineyards require irrigation systems';
  }

  // Validate pest control costs
  if (!inputs.pestControlCosts || (inputs.pestControlCosts as number) < 0) {
    errors.pestControlCosts = 'Pest control costs cannot be negative';
  }

  // Validate harvesting costs
  if (!inputs.harvestingCosts || (inputs.harvestingCosts as number) < 0) {
    errors.harvestingCosts = 'Harvesting costs cannot be negative';
  } else if ((inputs.harvestingCosts as number) === 0) {
    warnings.harvestingCosts = 'Harvesting typically requires significant labor or equipment costs';
  }

  // Validate marketing costs
  if (!inputs.marketingCosts || (inputs.marketingCosts as number) < 0) {
    errors.marketingCosts = 'Marketing costs cannot be negative';
  }

  // Validate insurance costs
  if (!inputs.insuranceCosts || (inputs.insuranceCosts as number) < 0) {
    errors.insuranceCosts = 'Insurance costs cannot be negative';
  } else if ((inputs.insuranceCosts as number) === 0) {
    warnings.insuranceCosts = 'Agricultural insurance is typically recommended';
  }

  // Validate tax rate
  if (inputs.taxRate === undefined || inputs.taxRate === null) {
    errors.taxRate = 'Tax rate is required';
  } else if ((inputs.taxRate as number) < 0) {
    errors.taxRate = 'Tax rate cannot be negative';
  } else if ((inputs.taxRate as number) > 50) {
    errors.taxRate = 'Tax rate seems unreasonably high';
  }

  // Validate land value
  if (!inputs.landValue || (inputs.landValue as number) < 0) {
    errors.landValue = 'Land value cannot be negative';
  } else if ((inputs.landValue as number) === 0) {
    warnings.landValue = 'Land value should reflect market value for accurate NPV calculation';
  }

  // Validate replanting costs
  if (!inputs.replantingCosts || (inputs.replantingCosts as number) < 0) {
    errors.replantingCosts = 'Replanting costs cannot be negative';
  }

  // Cross-field validations
  if (inputs.acreage && inputs.plantingCosts && inputs.yieldPerAcre && inputs.pricePerTon) {
    const revenuePerAcre = (inputs.yieldPerAcre as number) * (inputs.pricePerTon as number);
    const plantingCostRatio = (inputs.plantingCosts as number) / revenuePerAcre;
    
    if (plantingCostRatio > 5) {
      warnings.plantingCosts = 'Planting costs are very high relative to expected annual revenue';
    }
  }

  if (inputs.annualOperatingCosts && inputs.acreage && inputs.yieldPerAcre && inputs.pricePerTon) {
    const totalOperatingCosts = (inputs.annualOperatingCosts as number) * (inputs.acreage as number) +
                               (inputs.laborCosts as number || 0) +
                               (inputs.pestControlCosts as number || 0) +
                               (inputs.harvestingCosts as number || 0) +
                               (inputs.marketingCosts as number || 0) +
                               (inputs.insuranceCosts as number || 0);
    
    const totalRevenue = (inputs.acreage as number) * (inputs.yieldPerAcre as number) * (inputs.pricePerTon as number);
    
    if (totalOperatingCosts >= totalRevenue) {
      errors.annualOperatingCosts = 'Total operating costs exceed projected revenue';
    } else if (totalOperatingCosts > totalRevenue * 0.8) {
      warnings.annualOperatingCosts = 'Operating costs are very high relative to revenue (>80%)';
    }
  }

  if (inputs.establishmentPeriod && inputs.productionLifespan) {
    const totalPeriod = (inputs.establishmentPeriod as number) + (inputs.productionLifespan as number);
    if (totalPeriod > 50) {
      warnings.productionLifespan = 'Total project period exceeds 50 years - consider shorter analysis period';
    }
  }

  // Validate vine type specific considerations
  if (inputs.vineType === 'premium' && inputs.pricePerTon && (inputs.pricePerTon as number) < 1500) {
    warnings.pricePerTon = 'Premium varieties typically command higher prices';
  }

  if (inputs.vineType === 'organic' && inputs.pestControlCosts && (inputs.pestControlCosts as number) === 0) {
    warnings.pestControlCosts = 'Organic operations typically have pest control costs for approved treatments';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings
  };
}
