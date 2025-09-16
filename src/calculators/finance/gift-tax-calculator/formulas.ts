import { GiftTaxInputs, GiftTaxResults, GiftTaxMetrics } from './types';

export function calculateGiftTax(inputs: GiftTaxInputs): GiftTaxResults {
  const {
    giftAmount,
    annualExclusionAmount,
    lifetimeExclusionUsed,
    lifetimeExclusionLimit,
    giftTaxRate,
    numberOfRecipients,
    maritalStatus,
    includeSpousalPortion,
    inflationAdjustment,
    planningHorizon,
    expectedGrowthRate
  } = inputs;

  // Calculate total annual exclusions available
  const totalAnnualExclusions = annualExclusionAmount * numberOfRecipients;

  // Calculate spousal portion if applicable
  const spousalPortion = maritalStatus === 'married' && includeSpousalPortion
    ? Math.min(giftAmount * 0.5, lifetimeExclusionLimit - lifetimeExclusionUsed)
    : 0;

  // Calculate taxable gift amount
  const adjustedGiftAmount = giftAmount - spousalPortion;
  const amountAfterAnnualExclusions = Math.max(0, adjustedGiftAmount - totalAnnualExclusions);
  const remainingLifetimeExclusion = Math.max(0, lifetimeExclusionLimit - lifetimeExclusionUsed);
  const taxableGiftAmount = Math.max(0, amountAfterAnnualExclusions - remainingLifetimeExclusion);

  // Calculate gift tax liability
  const giftTaxLiability = taxableGiftAmount * (giftTaxRate / 100);

  // Calculate effective tax rate
  const effectiveTaxRate = giftAmount > 0 ? (giftTaxLiability / giftAmount) * 100 : 0;

  // Calculate net gift amount after tax
  const netGiftAmount = giftAmount - giftTaxLiability;

  // Calculate projected future value
  const projectedFutureValue = netGiftAmount * Math.pow(1 + expectedGrowthRate / 100, planningHorizon);

  // Calculate tax savings from exclusions
  const taxSavingsFromExclusions = (giftAmount - taxableGiftAmount) * (giftTaxRate / 100);

  // Calculate break-even gift amount
  const breakEvenGiftAmount = totalAnnualExclusions + remainingLifetimeExclusion + spousalPortion;

  // Determine optimal gift strategy
  let optimalGiftStrategy = 'Standard annual exclusion gifts';
  if (giftAmount > totalAnnualExclusions + remainingLifetimeExclusion) {
    optimalGiftStrategy = 'Utilize lifetime exclusion for large gifts';
  } else if (maritalStatus === 'married' && !includeSpousalPortion) {
    optimalGiftStrategy = 'Consider spousal gifts to double annual exclusions';
  } else if (planningHorizon > 10) {
    optimalGiftStrategy = 'Consider trust structures for long-term planning';
  }

  return {
    taxableGiftAmount,
    giftTaxLiability,
    effectiveTaxRate,
    remainingLifetimeExclusion,
    totalAnnualExclusions,
    netGiftAmount,
    projectedFutureValue,
    taxSavingsFromExclusions,
    breakEvenGiftAmount,
    optimalGiftStrategy
  };
}

export function calculateGiftTaxMetrics(
  inputs: GiftTaxInputs,
  results: GiftTaxResults
): GiftTaxMetrics {
  const { giftAmount, lifetimeExclusionLimit, lifetimeExclusionUsed } = inputs;
  const { giftTaxLiability, taxSavingsFromExclusions } = results;

  // Calculate tax efficiency score (0-100, higher is better)
  const taxEfficiencyScore = Math.max(0, Math.min(100,
    100 - (giftTaxLiability / Math.max(giftAmount, 1)) * 100
  ));

  // Calculate exclusion utilization rate
  const exclusionUtilizationRate = lifetimeExclusionLimit > 0
    ? (lifetimeExclusionUsed / lifetimeExclusionLimit) * 100
    : 0;

  // Calculate projected tax savings over time
  const projectedTaxSavings = taxSavingsFromExclusions;

  // Assess risk level
  let riskAssessment: 'low' | 'medium' | 'high' = 'low';
  if (exclusionUtilizationRate > 80) {
    riskAssessment = 'high';
  } else if (exclusionUtilizationRate > 50) {
    riskAssessment = 'medium';
  }

  return {
    taxEfficiencyScore,
    exclusionUtilizationRate,
    projectedTaxSavings,
    riskAssessment
  };
}

export function validateGiftTaxInputs(inputs: GiftTaxInputs): string[] {
  const errors: string[] = [];

  if (inputs.giftAmount <= 0) {
    errors.push('Gift amount must be greater than $0');
  }

  if (inputs.annualExclusionAmount < 0) {
    errors.push('Annual exclusion amount cannot be negative');
  }

  if (inputs.lifetimeExclusionUsed < 0) {
    errors.push('Lifetime exclusion used cannot be negative');
  }

  if (inputs.lifetimeExclusionLimit <= 0) {
    errors.push('Lifetime exclusion limit must be greater than $0');
  }

  if (inputs.giftTaxRate < 0 || inputs.giftTaxRate > 100) {
    errors.push('Gift tax rate must be between 0% and 100%');
  }

  if (inputs.numberOfRecipients <= 0) {
    errors.push('Number of recipients must be at least 1');
  }

  if (inputs.planningHorizon < 0) {
    errors.push('Planning horizon cannot be negative');
  }

  if (inputs.expectedGrowthRate < -20 || inputs.expectedGrowthRate > 50) {
    errors.push('Expected growth rate must be between -20% and 50%');
  }

  return errors;
}