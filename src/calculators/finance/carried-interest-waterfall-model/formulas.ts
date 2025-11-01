import { CarriedInterestWaterfallModelInputs, CarriedInterestWaterfallModelOutputs } from './types';

// Calculate management fees paid over the investment period
export function calculateManagementFees(
  totalCapital: number,
  managementFee: number,
  investmentPeriod: number
): number {
  return totalCapital * managementFee * investmentPeriod;
}

// Calculate preferred return amount
export function calculatePreferredReturn(
  totalCapital: number,
  preferredReturn: number,
  investmentPeriod: number
): number {
  return totalCapital * preferredReturn * investmentPeriod;
}

// Calculate carried interest using waterfall distribution
export function calculateCarriedInterestWaterfall(
  inputs: CarriedInterestWaterfallModelInputs
): CarriedInterestWaterfallModelOutputs['waterfallTiers'] {
  const totalReturn = inputs.totalReturn;
  const totalCapital = inputs.totalCapital;
  const hurdleRate = inputs.hurdleRate;
  const carriedInterest = inputs.carriedInterest;
  const catchUpPercentage = inputs.catchUpPercentage;

  // Tier 1: Return of capital
  const tier1 = Math.min(totalReturn, totalCapital);

  // Tier 2: Preferred return (hurdle rate)
  const hurdleAmount = totalCapital * hurdleRate * inputs.investmentPeriod;
  const tier2 = Math.min(Math.max(0, totalReturn - totalCapital), hurdleAmount);

  // Tier 3: Catch-up (GP gets catchUpPercentage of profits until they reach carried interest share)
  const profitsAfterHurdle = Math.max(0, totalReturn - totalCapital - hurdleAmount);
  const carriedInterestShare = carriedInterest * (totalReturn - totalCapital);
  const catchUpAmount = Math.min(profitsAfterHurdle, carriedInterestShare / (1 - catchUpPercentage) * catchUpPercentage);
  const tier3 = catchUpAmount;

  // Tier 4: Remaining profits split according to carried interest
  const remainingProfits = Math.max(0, profitsAfterHurdle - catchUpAmount);
  const tier4 = remainingProfits * carriedInterest;

  return {
    tier1,
    tier2,
    tier3,
    tier4
  };
}

// Calculate IRR using approximation method
export function calculateIRR(
  totalCapital: number,
  totalReturn: number,
  investmentPeriod: number
): number {
  if (totalReturn <= totalCapital) return 0;

  // Simple IRR approximation: (total return / capital)^(1/period) - 1
  return Math.pow(totalReturn / totalCapital, 1 / investmentPeriod) - 1;
}

// Calculate multiple of invested capital
export function calculateMultipleOfInvestedCapital(
  totalReturn: number,
  totalCapital: number
): number {
  return totalReturn / totalCapital;
}

// Calculate GP profit share
export function calculateGpProfitShare(
  totalReturn: number,
  totalCapital: number,
  carriedInterest: number
): number {
  const profits = Math.max(0, totalReturn - totalCapital);
  return profits * carriedInterest;
}

// Calculate LP profit share
export function calculateLpProfitShare(
  totalReturn: number,
  totalCapital: number,
  carriedInterest: number
): number {
  const profits = Math.max(0, totalReturn - totalCapital);
  return profits * (1 - carriedInterest);
}

// Calculate clawback amount if applicable
export function calculateClawbackAmount(
  gpDistributions: number,
  lpDistributions: number,
  carriedInterestEarned: number,
  clawbackProvision: boolean
): number {
  if (!clawbackProvision) return 0;

  // Simplified clawback: if GP received more than entitled share
  const entitledGpShare = carriedInterestEarned;
  return Math.max(0, gpDistributions - entitledGpShare);
}

// Main calculation function
export function calculateCarriedInterestWaterfallModel(
  inputs: CarriedInterestWaterfallModelInputs
): CarriedInterestWaterfallModelOutputs {
  const managementFeesPaid = calculateManagementFees(
    inputs.totalCapital,
    inputs.managementFee,
    inputs.investmentPeriod
  );

  const preferredReturnPaid = calculatePreferredReturn(
    inputs.totalCapital,
    inputs.preferredReturn,
    inputs.investmentPeriod
  );

  const waterfallTiers = calculateCarriedInterestWaterfall(inputs);

  const carriedInterestEarned = waterfallTiers.tier3 + waterfallTiers.tier4;

  const gpProfitShare = calculateGpProfitShare(
    inputs.totalReturn,
    inputs.totalCapital,
    inputs.carriedInterest
  );

  const lpProfitShare = calculateLpProfitShare(
    inputs.totalReturn,
    inputs.totalCapital,
    inputs.carriedInterest
  );

  const totalDistributions = {
    lp: inputs.totalCapital + lpProfitShare,
    gp: carriedInterestEarned
  };

  const irr = calculateIRR(inputs.totalCapital, inputs.totalReturn, inputs.investmentPeriod);
  const multipleOfInvestedCapital = calculateMultipleOfInvestedCapital(inputs.totalReturn, inputs.totalCapital);

  const netToGp = carriedInterestEarned - managementFeesPaid;

  const clawbackAmount = calculateClawbackAmount(
    totalDistributions.gp,
    totalDistributions.lp,
    carriedInterestEarned,
    inputs.clawbackProvision
  );

  return {
    managementFeesPaid,
    preferredReturnPaid,
    carriedInterestEarned,
    totalDistributions,
    waterfallTiers,
    irr,
    multipleOfInvestedCapital,
    gpProfitShare,
    lpProfitShare,
    netToGp,
    clawbackAmount
  };
}