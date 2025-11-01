import { CDInterestInputs, CDInterestOutputs } from './types';

// Calculate compound interest based on compounding frequency
export function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number,
  compoundingFrequency: number
): number {
  const compoundRate = rate / compoundingFrequency;
  const compoundPeriods = time * compoundingFrequency;
  return principal * Math.pow(1 + compoundRate, compoundPeriods) - principal;
}

// Calculate effective annual rate
export function calculateEffectiveAnnualRate(
  nominalRate: number,
  compoundingFrequency: number
): number {
  return Math.pow(1 + nominalRate / compoundingFrequency, compoundingFrequency) - 1;
}

// Calculate Annual Percentage Yield (APY)
export function calculateAPY(nominalRate: number, compoundingFrequency: number): number {
  return calculateEffectiveAnnualRate(nominalRate, compoundingFrequency);
}

// Calculate monthly interest payment
export function calculateMonthlyInterest(
  principal: number,
  annualRate: number,
  compoundingFrequency: number
): number {
  const monthlyRate = annualRate / 12;
  const periodsPerMonth = compoundingFrequency / 12;
  return principal * (Math.pow(1 + monthlyRate / periodsPerMonth, periodsPerMonth) - 1);
}

// Calculate inflation-adjusted return
export function calculateInflationAdjustedReturn(
  nominalReturn: number,
  inflationRate: number,
  time: number
): number {
  const inflationFactor = Math.pow(1 + inflationRate, time);
  return (nominalReturn / inflationFactor);
}

// Calculate break-even months for CD vs alternative investment
export function calculateBreakEvenMonths(
  cdRate: number,
  comparisonRate: number,
  principal: number
): number {
  if (cdRate <= comparisonRate) return Infinity;

  const monthlyCdRate = cdRate / 12;
  const monthlyComparisonRate = comparisonRate / 12;

  // Simple approximation: when cumulative interest equals the difference
  const monthlyDifference = monthlyCdRate - monthlyComparisonRate;
  return Math.ceil(principal / (principal * monthlyDifference));
}

// Calculate early withdrawal penalty
export function calculateEarlyWithdrawalPenalty(
  principal: number,
  interestEarned: number,
  penaltyRate: number
): number {
  return Math.min(interestEarned, principal * penaltyRate);
}

// Get compounding frequency number
export function getCompoundingFrequency(frequency: string): number {
  switch (frequency) {
    case 'daily': return 365;
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'annually': return 1;
    default: return 12;
  }
}

// Main CD interest calculation function
export function calculateCDInterest(inputs: CDInterestInputs): CDInterestOutputs {
  const compoundingFreq = getCompoundingFrequency(inputs.compoundingFrequency);
  const timeInYears = inputs.termInMonths / 12;

  // Calculate total interest
  const totalInterestEarned = calculateCompoundInterest(
    inputs.principalAmount,
    inputs.annualInterestRate,
    timeInYears,
    compoundingFreq
  );

  const finalAmount = inputs.principalAmount + totalInterestEarned;

  // Calculate effective rates
  const effectiveAnnualRate = calculateEffectiveAnnualRate(inputs.annualInterestRate, compoundingFreq);
  const annualPercentageYield = calculateAPY(inputs.annualInterestRate, compoundingFreq);

  // Calculate after-tax amounts
  const afterTaxInterest = totalInterestEarned * (1 - inputs.taxRate);
  const afterTaxFinalAmount = inputs.principalAmount + afterTaxInterest;

  // Calculate monthly interest (approximate)
  const monthlyInterest = calculateMonthlyInterest(
    inputs.principalAmount,
    inputs.annualInterestRate,
    compoundingFreq
  );

  // Calculate break-even analysis
  const breakEvenMonths = inputs.comparisonRate ?
    calculateBreakEvenMonths(inputs.annualInterestRate, inputs.comparisonRate, inputs.principalAmount) :
    0;

  // Calculate inflation-adjusted return
  const inflationAdjustedReturn = calculateInflationAdjustedReturn(
    totalInterestEarned,
    inputs.inflationRate,
    timeInYears
  );

  // Comparison analysis
  const vsComparisonRate = inputs.comparisonRate ?
    (inputs.annualInterestRate - inputs.comparisonRate) * inputs.principalAmount * timeInYears :
    0;
  const opportunityCost = inputs.comparisonRate ?
    Math.max(0, vsComparisonRate) :
    0;

  // Penalty analysis
  const earlyWithdrawalAmount = calculateEarlyWithdrawalPenalty(
    inputs.principalAmount,
    totalInterestEarned,
    inputs.earlyWithdrawalPenalty
  );
  const penaltyPercentage = earlyWithdrawalAmount / totalInterestEarned;

  return {
    totalInterestEarned,
    finalAmount,
    effectiveAnnualRate,
    afterTaxInterest,
    afterTaxFinalAmount,
    monthlyInterest,
    annualPercentageYield,
    breakEvenMonths,
    inflationAdjustedReturn,
    comparisonAnalysis: {
      vsComparisonRate,
      opportunityCost
    },
    penaltyAnalysis: {
      earlyWithdrawalAmount,
      penaltyPercentage
    }
  };
}