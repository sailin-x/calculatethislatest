import { RentersInsuranceInputs, RentersInsuranceResults } from './types';

/**
 * Calculate renters insurance costs and coverage analysis
 */
export function calculateRentersInsurance(inputs: RentersInsuranceInputs): RentersInsuranceResults {
  const {
    monthlyRent,
    annualRentIncrease,
    coverageYears,
    personalPropertyValue,
    liabilityCoverage,
    deductibleAmount,
    insurancePremium,
    inflationRate,
    discountRate,
    replacementCostCoverage,
    additionalLivingExpenses,
    aleCoverageDays,
    aleDailyRate
  } = inputs;

  // Calculate total rent paid over coverage period
  let totalRentPaid = 0;
  let currentRent = monthlyRent;
  let totalRentIncrease = 0;

  for (let year = 0; year < coverageYears; year++) {
    totalRentPaid += currentRent * 12;
    const rentIncrease = currentRent * (annualRentIncrease / 100);
    totalRentIncrease += rentIncrease * 12;
    currentRent += rentIncrease;
  }

  // Calculate insurance costs with inflation adjustment
  let totalInsuranceCost = 0;
  let currentPremium = insurancePremium;

  for (let year = 0; year < coverageYears; year++) {
    totalInsuranceCost += currentPremium;
    currentPremium *= (1 + inflationRate / 100);
  }

  // Calculate net present value of insurance costs
  let netPresentValue = 0;
  currentPremium = insurancePremium;

  for (let year = 0; year < coverageYears; year++) {
    netPresentValue += currentPremium / Math.pow(1 + discountRate / 100, year);
    currentPremium *= (1 + inflationRate / 100);
  }

  // Calculate coverage metrics
  const totalLiabilityCoverage = liabilityCoverage;
  const totalPersonalPropertyCoverage = personalPropertyValue;
  const aleCoverageAmount = additionalLivingExpenses ? aleCoverageDays * aleDailyRate : 0;

  // Calculate cost efficiency metrics
  const averageAnnualPremium = totalInsuranceCost / coverageYears;
  const monthlyInsuranceCost = averageAnnualPremium / 12;
  const annualInsuranceCost = averageAnnualPremium;

  // Calculate insurance cost as percentage of rent
  const insuranceCostPercentage = (averageAnnualPremium / (monthlyRent * 12)) * 100;

  // Calculate cost per thousand dollars of coverage
  const totalCoverage = personalPropertyValue + liabilityCoverage + aleCoverageAmount;
  const costPerThousandCoverage = totalCoverage > 0 ? (averageAnnualPremium / totalCoverage) * 1000 : 0;

  // Calculate break-even point (when insurance saves money vs. risk)
  // This is a simplified calculation - in reality, break-even depends on actual claims
  const estimatedAnnualLossWithoutInsurance = (personalPropertyValue * 0.02) + (liabilityCoverage * 0.001);
  const breakEvenPoint = estimatedAnnualLossWithoutInsurance > 0 ?
    averageAnnualPremium / estimatedAnnualLossWithoutInsurance : 0;

  // Calculate return on insurance investment
  const returnOnInsurance = estimatedAnnualLossWithoutInsurance > 0 ?
    ((estimatedAnnualLossWithoutInsurance - averageAnnualPremium) / averageAnnualPremium) * 100 : 0;

  return {
    totalInsuranceCost,
    averageAnnualPremium,
    totalRentPaid,
    totalRentIncrease,
    netPresentValue,
    insuranceCostPercentage,
    monthlyInsuranceCost,
    annualInsuranceCost,
    totalLiabilityCoverage,
    totalPersonalPropertyCoverage,
    aleCoverageAmount,
    costPerThousandCoverage,
    breakEvenPoint,
    returnOnInsurance
  };
}

/**
 * Validate renters insurance inputs
 */
export function validateRentersInsuranceInputs(inputs: RentersInsuranceInputs): string[] {
  const errors: string[] = [];

  if (inputs.monthlyRent <= 0) {
    errors.push('Monthly rent must be greater than 0');
  }

  if (inputs.annualRentIncrease < -10 || inputs.annualRentIncrease > 20) {
    errors.push('Annual rent increase must be between -10% and 20%');
  }

  if (inputs.coverageYears < 1 || inputs.coverageYears > 50) {
    errors.push('Coverage years must be between 1 and 50');
  }

  if (inputs.personalPropertyValue < 0) {
    errors.push('Personal property value cannot be negative');
  }

  if (inputs.liabilityCoverage < 0) {
    errors.push('Liability coverage cannot be negative');
  }

  if (inputs.deductibleAmount < 0) {
    errors.push('Deductible amount cannot be negative');
  }

  if (inputs.insurancePremium <= 0) {
    errors.push('Insurance premium must be greater than 0');
  }

  if (inputs.inflationRate < -5 || inputs.inflationRate > 15) {
    errors.push('Inflation rate must be between -5% and 15%');
  }

  if (inputs.discountRate < 0 || inputs.discountRate > 20) {
    errors.push('Discount rate must be between 0% and 20%');
  }

  if (inputs.additionalLivingExpenses) {
    if (inputs.aleCoverageDays < 0 || inputs.aleCoverageDays > 365) {
      errors.push('ALE coverage days must be between 0 and 365');
    }

    if (inputs.aleDailyRate < 0) {
      errors.push('ALE daily rate cannot be negative');
    }
  }

  return errors;
}