import { CalculatorInputs } from '../../types/calculator';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: false, message: 'Property value is required' };
  if (typeof value !== 'number' || value <= 0) return { isValid: false, message: 'Must be a positive number' };
  if (value < 50000 || value > 10000000) return { isValid: false, message: 'Must be between $50,000 and $10,000,000' };
  return { isValid: true };
}

export function validateReplacementCost(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 50000 || value > 15000000)) return { isValid: false, message: 'Must be between $50,000 and $15,000,000' };
  return { isValid: true };
}

export function validateAnnualRent(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 500000) return { isValid: false, message: 'Must be $500,000 or less' };
  return { isValid: true };
}

export function validateYearBuilt(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 1800 || value > 2024)) return { isValid: false, message: 'Must be between 1800 and 2024' };
  return { isValid: true };
}

export function validateSquareFootage(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 500 || value > 50000)) return { isValid: false, message: 'Must be between 500 and 50,000 sqft' };
  return { isValid: true };
}

export function validateNumberOfUnits(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 1 || value > 100)) return { isValid: false, message: 'Must be between 1 and 100' };
  return { isValid: true };
}

export function validateLiabilityLimit(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 100000 || value > 5000000)) return { isValid: false, message: 'Must be between $100,000 and $5,000,000' };
  return { isValid: true };
}

export function validateMedicalPayments(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 1000 || value > 100000)) return { isValid: false, message: 'Must be between $1,000 and $100,000' };
  return { isValid: true };
}

export function validateLossOfRent(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 100000) return { isValid: false, message: 'Must be $100,000 or less' };
  return { isValid: true };
}

export function validatePersonalProperty(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 100000) return { isValid: false, message: 'Must be $100,000 or less' };
  return { isValid: true };
}

export function validateDeductible(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 250 || value > 10000)) return { isValid: false, message: 'Must be between $250 and $10,000' };
  return { isValid: true };
}

export function validateOccupancyRate(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 100) return { isValid: false, message: 'Must be 100% or less' };
  return { isValid: true };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value <= 0)) return { isValid: false, message: 'Must be a positive number' };
  if (value && (value < 300 || value > 850)) return { isValid: false, message: 'Must be between 300 and 850' };
  return { isValid: true };
}

export function validateLoyaltyDiscount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (typeof value !== 'number' || value < 0)) return { isValid: false, message: 'Must be a non-negative number' };
  if (value && value > 50) return { isValid: false, message: 'Must be 50 or less' };
  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Single Family', 'Multi-Family', 'Condo', 'Townhouse', 'Apartment Building', 'Commercial'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateConstructionType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Frame', 'Brick', 'Masonry', 'Steel', 'Concrete', 'Mixed'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Urban', 'Suburban', 'Rural', 'Coastal', 'Mountain', 'Desert'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateState(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  if (value && !validStates.includes(value)) return { isValid: false, message: `Must be one of: ${validStates.join(', ')}` };
  return { isValid: true };
}

export function validateRiskZone(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Low', 'Medium', 'High', 'Very High'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateCoverageLevel(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Basic', 'Standard', 'Comprehensive', 'Premium'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateTenantType(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Residential', 'Student', 'Section 8', 'Corporate', 'Short-term', 'Vacant'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateClaimsHistory(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['None', '1-2 Claims', '3-5 Claims', '5+ Claims'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateInsuranceScore(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Excellent', 'Good', 'Fair', 'Poor'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateMultiPolicyDiscount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['None', 'Auto', 'Umbrella', 'Life', 'Multiple'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validatePaymentMethod(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validatePaperlessDiscount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Yes', 'No'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateAutoPayDiscount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Yes', 'No'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateNewCustomerDiscount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['Yes', 'No'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateBundlingDiscount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['None', 'Auto', 'Umbrella', 'Life', 'Multiple'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateSafetyDiscount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['None', 'Basic', 'Advanced', 'Premium'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateClaimsFreeDiscount(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['None', '1-3 Years', '3-5 Years', '5+ Years'];
  if (value && !validTypes.includes(value)) return { isValid: false, message: `Must be one of: ${validTypes.join(', ')}` };
  return { isValid: true };
}

export function validateSecurityFeatures(value: any, allInputs?: Record<string, any>, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validFeatures = ['Alarm System', 'Security Cameras', 'Deadbolts', 'Fire Sprinklers', 'Smoke Detectors', 'Carbon Monoxide Detectors', 'Gated Community', 'Doorman', 'None'];
  if (Array.isArray(value)) {
    for (const feature of value) {
      if (!validFeatures.includes(feature)) {
        return { isValid: false, message: `Must be one of: ${validFeatures.join(', ')}` };
      }
    }
  }
  return { isValid: true };
}

export function validateAllLandlordInsuranceInputs(inputs: Partial<CalculatorInputs>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const propertyValueResult = validatePropertyValue(inputs.propertyValue);
  if (!propertyValueResult.isValid) errors.push(propertyValueResult.message!);

  const replacementCostResult = validateReplacementCost(inputs.replacementCost);
  if (!replacementCostResult.isValid) errors.push(replacementCostResult.message!);

  const annualRentResult = validateAnnualRent(inputs.annualRent);
  if (!annualRentResult.isValid) errors.push(annualRentResult.message!);

  const yearBuiltResult = validateYearBuilt(inputs.yearBuilt);
  if (!yearBuiltResult.isValid) errors.push(yearBuiltResult.message!);

  const squareFootageResult = validateSquareFootage(inputs.squareFootage);
  if (!squareFootageResult.isValid) errors.push(squareFootageResult.message!);

  const numberOfUnitsResult = validateNumberOfUnits(inputs.numberOfUnits);
  if (!numberOfUnitsResult.isValid) errors.push(numberOfUnitsResult.message!);

  const liabilityLimitResult = validateLiabilityLimit(inputs.liabilityLimit);
  if (!liabilityLimitResult.isValid) errors.push(liabilityLimitResult.message!);

  const medicalPaymentsResult = validateMedicalPayments(inputs.medicalPayments);
  if (!medicalPaymentsResult.isValid) errors.push(medicalPaymentsResult.message!);

  const lossOfRentResult = validateLossOfRent(inputs.lossOfRent);
  if (!lossOfRentResult.isValid) errors.push(lossOfRentResult.message!);

  const personalPropertyResult = validatePersonalProperty(inputs.personalProperty);
  if (!personalPropertyResult.isValid) errors.push(personalPropertyResult.message!);

  const deductibleResult = validateDeductible(inputs.deductible);
  if (!deductibleResult.isValid) errors.push(deductibleResult.message!);

  const occupancyRateResult = validateOccupancyRate(inputs.occupancyRate);
  if (!occupancyRateResult.isValid) errors.push(occupancyRateResult.message!);

  const creditScoreResult = validateCreditScore(inputs.creditScore);
  if (!creditScoreResult.isValid) errors.push(creditScoreResult.message!);

  const loyaltyDiscountResult = validateLoyaltyDiscount(inputs.loyaltyDiscount);
  if (!loyaltyDiscountResult.isValid) errors.push(loyaltyDiscountResult.message!);

  const propertyTypeResult = validatePropertyType(inputs.propertyType);
  if (!propertyTypeResult.isValid) errors.push(propertyTypeResult.message!);

  const constructionTypeResult = validateConstructionType(inputs.constructionType);
  if (!constructionTypeResult.isValid) errors.push(constructionTypeResult.message!);

  const locationResult = validateLocation(inputs.location);
  if (!locationResult.isValid) errors.push(locationResult.message!);

  const stateResult = validateState(inputs.state);
  if (!stateResult.isValid) errors.push(stateResult.message!);

  const riskZoneResult = validateRiskZone(inputs.riskZone);
  if (!riskZoneResult.isValid) errors.push(riskZoneResult.message!);

  const coverageLevelResult = validateCoverageLevel(inputs.coverageLevel);
  if (!coverageLevelResult.isValid) errors.push(coverageLevelResult.message!);

  const tenantTypeResult = validateTenantType(inputs.tenantType);
  if (!tenantTypeResult.isValid) errors.push(tenantTypeResult.message!);

  const claimsHistoryResult = validateClaimsHistory(inputs.claimsHistory);
  if (!claimsHistoryResult.isValid) errors.push(claimsHistoryResult.message!);

  const insuranceScoreResult = validateInsuranceScore(inputs.insuranceScore);
  if (!insuranceScoreResult.isValid) errors.push(insuranceScoreResult.message!);

  const multiPolicyDiscountResult = validateMultiPolicyDiscount(inputs.multiPolicyDiscount);
  if (!multiPolicyDiscountResult.isValid) errors.push(multiPolicyDiscountResult.message!);

  const paymentMethodResult = validatePaymentMethod(inputs.paymentMethod);
  if (!paymentMethodResult.isValid) errors.push(paymentMethodResult.message!);

  const paperlessDiscountResult = validatePaperlessDiscount(inputs.paperlessDiscount);
  if (!paperlessDiscountResult.isValid) errors.push(paperlessDiscountResult.message!);

  const autoPayDiscountResult = validateAutoPayDiscount(inputs.autoPayDiscount);
  if (!autoPayDiscountResult.isValid) errors.push(autoPayDiscountResult.message!);

  const newCustomerDiscountResult = validateNewCustomerDiscount(inputs.newCustomerDiscount);
  if (!newCustomerDiscountResult.isValid) errors.push(newCustomerDiscountResult.message!);

  const bundlingDiscountResult = validateBundlingDiscount(inputs.bundlingDiscount);
  if (!bundlingDiscountResult.isValid) errors.push(bundlingDiscountResult.message!);

  const safetyDiscountResult = validateSafetyDiscount(inputs.safetyDiscount);
  if (!safetyDiscountResult.isValid) errors.push(safetyDiscountResult.message!);

  const claimsFreeDiscountResult = validateClaimsFreeDiscount(inputs.claimsFreeDiscount);
  if (!claimsFreeDiscountResult.isValid) errors.push(claimsFreeDiscountResult.message!);

  const securityFeaturesResult = validateSecurityFeatures(inputs.securityFeatures);
  if (!securityFeaturesResult.isValid) errors.push(securityFeaturesResult.message!);

  return {
    isValid: errors.length === 0,
    errors
  };
}
