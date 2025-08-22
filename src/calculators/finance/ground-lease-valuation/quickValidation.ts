import { CalculatorInputs } from '../../../types/calculator';

export function validateLandValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Land value is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Land value must be a number' };
  if (value < 10000 || value > 100000000) return { isValid: false, message: 'Land value must be between $10,000 and $100,000,000' };
  return { isValid: true };
}

export function validateLeaseTerm(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Lease term is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Lease term must be a number' };
  if (value < 1 || value > 999) return { isValid: false, message: 'Lease term must be between 1 and 999 years' };
  return { isValid: true };
}

export function validateAnnualRent(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Annual rent is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Annual rent must be a number' };
  if (value < 1000 || value > 10000000) return { isValid: false, message: 'Annual rent must be between $1,000 and $10,000,000' };
  return { isValid: true };
}

export function validateRentEscalation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Rent escalation rate is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Rent escalation rate must be a number' };
  if (value < 0 || value > 20) return { isValid: false, message: 'Rent escalation rate must be between 0% and 20%' };
  return { isValid: true };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Discount rate is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Discount rate must be a number' };
  if (value < 1 || value > 25) return { isValid: false, message: 'Discount rate must be between 1% and 25%' };
  return { isValid: true };
}

export function validateLandAppreciation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Land appreciation rate is required' };
  if (typeof value !== 'number') return { isValid: false, message: 'Land appreciation rate must be a number' };
  if (value < -10 || value > 15) return { isValid: false, message: 'Land appreciation rate must be between -10% and 15%' };
  return { isValid: true };
}

export function validateReversionaryValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Reversionary value must be a number' };
  if (value && (value < 0 || value > 100000000)) return { isValid: false, message: 'Reversionary value must be between $0 and $100,000,000' };
  return { isValid: true };
}

export function validateLeaseType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Lease type is required' };
  const validTypes = ['net', 'gross', 'triple-net', 'percentage'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid lease type' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property type is required' };
  const validTypes = ['residential', 'commercial', 'industrial', 'mixed-use', 'agricultural'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid property type' };
  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Location is required' };
  const validLocations = ['urban', 'suburban', 'rural', 'coastal', 'mountain'];
  if (!validLocations.includes(value)) return { isValid: false, message: 'Invalid location' };
  return { isValid: true };
}

export function validateMarketType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Market type is required' };
  const validTypes = ['hot', 'stable', 'declining', 'emerging'];
  if (!validTypes.includes(value)) return { isValid: false, message: 'Invalid market type' };
  return { isValid: true };
}

export function validateTenantCredit(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validCredits = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'unknown'];
    if (!validCredits.includes(value)) return { isValid: false, message: 'Invalid tenant credit rating' };
  }
  return { isValid: true };
}

export function validatePaymentFrequency(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validFrequencies = ['monthly', 'quarterly', 'semi-annually', 'annually'];
    if (!validFrequencies.includes(value)) return { isValid: false, message: 'Invalid payment frequency' };
  }
  return { isValid: true };
}

export function validateMarketLiquidity(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const validLiquidity = ['high', 'medium', 'low'];
    if (!validLiquidity.includes(value)) return { isValid: false, message: 'Invalid market liquidity' };
  }
  return { isValid: true };
}

export function validateOperatingExpenses(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Operating expenses must be a number' };
  if (value && (value < 0 || value > 1000000)) return { isValid: false, message: 'Operating expenses must be between $0 and $1,000,000' };
  return { isValid: true };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Property taxes must be a number' };
  if (value && (value < 0 || value > 1000000)) return { isValid: false, message: 'Property taxes must be between $0 and $1,000,000' };
  return { isValid: true };
}

export function validateInsurance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Insurance costs must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Insurance costs must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateMaintenance(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Maintenance costs must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Maintenance costs must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateManagementFees(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Management fees must be a number' };
  if (value && (value < 0 || value > 100000)) return { isValid: false, message: 'Management fees must be between $0 and $100,000' };
  return { isValid: true };
}

export function validateVacancyRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Vacancy rate must be a number' };
  if (value && (value < 0 || value > 50)) return { isValid: false, message: 'Vacancy rate must be between 0% and 50%' };
  return { isValid: true };
}

export function validateCollectionLoss(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Collection loss rate must be a number' };
  if (value && (value < 0 || value > 20)) return { isValid: false, message: 'Collection loss rate must be between 0% and 20%' };
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Inflation rate must be a number' };
  if (value && (value < -5 || value > 15)) return { isValid: false, message: 'Inflation rate must be between -5% and 15%' };
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Tax rate must be a number' };
  if (value && (value < 0 || value > 50)) return { isValid: false, message: 'Tax rate must be between 0% and 50%' };
  return { isValid: true };
}

export function validateRiskScore(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && typeof value !== 'number') return { isValid: false, message: 'Risk score must be a number' };
  if (value && (value < 1 || value > 10)) return { isValid: false, message: 'Risk score must be between 1 and 10' };
  return { isValid: true };
}

export function validateLeaseStartDate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) return { isValid: false, message: 'Lease start date must be in YYYY-MM-DD format' };
    const date = new Date(value);
    if (isNaN(date.getTime())) return { isValid: false, message: 'Invalid lease start date' };
  }
  return { isValid: true };
}

export function validateAllGroundLeaseInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const landValueResult = validateLandValue(inputs.landValue);
  if (!landValueResult.isValid) errors.push(landValueResult.message!);

  const leaseTermResult = validateLeaseTerm(inputs.leaseTerm);
  if (!leaseTermResult.isValid) errors.push(leaseTermResult.message!);

  const annualRentResult = validateAnnualRent(inputs.annualRent);
  if (!annualRentResult.isValid) errors.push(annualRentResult.message!);

  const rentEscalationResult = validateRentEscalation(inputs.rentEscalation);
  if (!rentEscalationResult.isValid) errors.push(rentEscalationResult.message!);

  const discountRateResult = validateDiscountRate(inputs.discountRate);
  if (!discountRateResult.isValid) errors.push(discountRateResult.message!);

  const landAppreciationResult = validateLandAppreciation(inputs.landAppreciation);
  if (!landAppreciationResult.isValid) errors.push(landAppreciationResult.message!);

  const reversionaryValueResult = validateReversionaryValue(inputs.reversionaryValue);
  if (!reversionaryValueResult.isValid) errors.push(reversionaryValueResult.message!);

  const leaseTypeResult = validateLeaseType(inputs.leaseType);
  if (!leaseTypeResult.isValid) errors.push(leaseTypeResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const locationResult = validateLocation(inputs.location);
  if (!locationResult.isValid) errors.push(locationResult.message!);

  const marketTypeResult = validateMarketType(inputs.marketType);
  if (!marketTypeResult.isValid) errors.push(marketTypeResult.message!);

  const tenantCreditResult = validateTenantCredit(inputs.tenantCredit);
  if (!tenantCreditResult.isValid) errors.push(tenantCreditResult.message!);

  const paymentFrequencyResult = validatePaymentFrequency(inputs.paymentFrequency);
  if (!paymentFrequencyResult.isValid) errors.push(paymentFrequencyResult.message!);

  const marketLiquidityResult = validateMarketLiquidity(inputs.marketLiquidity);
  if (!marketLiquidityResult.isValid) errors.push(marketLiquidityResult.message!);

  const operatingExpensesResult = validateOperatingExpenses(inputs.operatingExpenses);
  if (!operatingExpensesResult.isValid) errors.push(operatingExpensesResult.message!);

  const propertyTaxesResult = validatePropertyTaxes(inputs.propertyTaxes);
  if (!propertyTaxesResult.isValid) errors.push(propertyTaxesResult.message!);

  const insuranceResult = validateInsurance(inputs.insurance);
  if (!insuranceResult.isValid) errors.push(insuranceResult.message!);

  const maintenanceResult = validateMaintenance(inputs.maintenance);
  if (!maintenanceResult.isValid) errors.push(maintenanceResult.message!);

  const managementFeesResult = validateManagementFees(inputs.managementFees);
  if (!managementFeesResult.isValid) errors.push(managementFeesResult.message!);

  const vacancyRateResult = validateVacancyRate(inputs.vacancyRate);
  if (!vacancyRateResult.isValid) errors.push(vacancyRateResult.message!);

  const collectionLossResult = validateCollectionLoss(inputs.collectionLoss);
  if (!collectionLossResult.isValid) errors.push(collectionLossResult.message!);

  const inflationRateResult = validateInflationRate(inputs.inflationRate);
  if (!inflationRateResult.isValid) errors.push(inflationRateResult.message!);

  const taxRateResult = validateTaxRate(inputs.taxRate);
  if (!taxRateResult.isValid) errors.push(taxRateResult.message!);

  const riskScoreResult = validateRiskScore(inputs.riskScore);
  if (!riskScoreResult.isValid) errors.push(riskScoreResult.message!);

  const leaseStartDateResult = validateLeaseStartDate(inputs.leaseStartDate);
  if (!leaseStartDateResult.isValid) errors.push(leaseStartDateResult.message!);

  // Logical validation
  if (inputs.annualRent && inputs.landValue && inputs.annualRent > inputs.landValue) {
    errors.push('Annual rent cannot exceed land value');
  }
  if (inputs.reversionaryValue && inputs.landValue && inputs.reversionaryValue < inputs.landValue * 0.1) {
    errors.push('Reversionary value seems too low relative to land value');
  }
  if (inputs.reversionaryValue && inputs.landValue && inputs.reversionaryValue > inputs.landValue * 10) {
    errors.push('Reversionary value seems too high relative to land value');
  }
  if (inputs.discountRate && inputs.rentEscalation && inputs.discountRate <= inputs.rentEscalation) {
    errors.push('Discount rate should be higher than rent escalation rate for valid calculations');
  }
  if (inputs.landAppreciation && inputs.rentEscalation && inputs.landAppreciation > inputs.rentEscalation * 2) {
    errors.push('Land appreciation rate seems unusually high relative to rent escalation');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
