import { MegaBackdoorRothInputs, MegaBackdoorRothResults, MegaBackdoorRothMetrics } from './types';

export function calculateMegaBackdoorRoth(inputs: MegaBackdoorRothInputs): MegaBackdoorRothResults {
  const {
    currentAge,
    annualSalary,
    employerMatch,
    current401kBalance,
    currentRothBalance,
    expectedReturn,
    yearsToRetirement,
    taxBracket,
    stateTaxRate,
    inflationRate,
    includeAfterTaxContributions,
    includeEmployerMatch,
    recharacterizationStrategy
  } = inputs;

  // Calculate maximum annual contribution
  const maxAnnualContribution = calculateMaxContribution(annualSalary, currentAge);

  // Calculate after-tax contribution amount
  const afterTaxContribution = includeAfterTaxContributions
    ? Math.min(maxAnnualContribution, annualSalary * 0.5) // Assume up to 50% of salary
    : 0;

  // Calculate Roth conversion amount
  const rothConversionAmount = afterTaxContribution;

  // Calculate tax savings
  const taxSavings = calculateTaxSavings(rothConversionAmount, taxBracket, stateTaxRate);

  // Calculate future values
  const futureRothValue = calculateFutureValue(
    currentRothBalance + rothConversionAmount,
    expectedReturn,
    yearsToRetirement
  );

  const futureTraditionalValue = calculateFutureValue(
    current401kBalance,
    expectedReturn,
    yearsToRetirement
  );

  // Calculate net benefit
  const netBenefit = futureRothValue - futureTraditionalValue;

  // Calculate break-even years
  const breakEvenYears = calculateBreakEvenYears(
    afterTaxContribution,
    taxSavings,
    expectedReturn
  );

  // Calculate effective tax rate
  const effectiveTaxRate = rothConversionAmount > 0
    ? (taxSavings / rothConversionAmount) * 100
    : 0;

  // Calculate retirement income
  const retirementIncome = calculateRetirementIncome(futureRothValue, yearsToRetirement);

  return {
    maxAnnualContribution,
    afterTaxContribution,
    rothConversionAmount,
    taxSavings,
    futureRothValue,
    futureTraditionalValue,
    netBenefit,
    breakEvenYears,
    effectiveTaxRate,
    retirementIncome
  };
}

function calculateMaxContribution(annualSalary: number, age: number): number {
  // 2024 limits: $23,000 base + $7,500 catch-up if 50+
  const baseLimit = 23000;
  const catchUp = age >= 50 ? 7500 : 0;
  return baseLimit + catchUp;
}

function calculateTaxSavings(amount: number, federalRate: number, stateRate: number): number {
  const totalTaxRate = federalRate + stateRate;
  return amount * (totalTaxRate / 100);
}

function calculateFutureValue(currentBalance: number, expectedReturn: number, years: number): number {
  const rate = expectedReturn / 100;
  return currentBalance * Math.pow(1 + rate, years);
}

function calculateBreakEvenYears(contribution: number, taxSavings: number, expectedReturn: number): number {
  if (contribution <= 0) return 0;

  // Simplified break-even calculation
  const netCost = contribution - taxSavings;
  if (netCost <= 0) return 0;

  // Assume tax savings grow at expected return
  const futureTaxSavings = taxSavings * Math.pow(1 + expectedReturn / 100, 10); // 10 years
  return futureTaxSavings >= netCost ? 10 : Math.ceil(netCost / (taxSavings * expectedReturn / 100));
}

function calculateRetirementIncome(futureValue: number, yearsToRetirement: number): number {
  if (yearsToRetirement <= 0) return 0;

  // Assume 4% safe withdrawal rate
  return futureValue * 0.04;
}

export function calculateMegaBackdoorRothMetrics(
  inputs: MegaBackdoorRothInputs,
  results: MegaBackdoorRothResults
): MegaBackdoorRothMetrics {
  const { annualSalary } = inputs;
  const { taxSavings, netBenefit, afterTaxContribution } = results;

  // Calculate contribution efficiency
  const contributionEfficiency = annualSalary > 0
    ? (afterTaxContribution / annualSalary) * 100
    : 0;

  // Calculate tax optimization score
  const taxOptimizationScore = afterTaxContribution > 0
    ? (taxSavings / afterTaxContribution) * 100
    : 0;

  // Determine retirement readiness
  const readinessRatio = results.futureRothValue / (annualSalary * 25); // 25x salary rule
  let retirementReadiness: 'low' | 'medium' | 'high' = 'low';
  if (readinessRatio >= 1.5) retirementReadiness = 'high';
  else if (readinessRatio >= 1.0) retirementReadiness = 'medium';

  // Determine strategy viability
  let strategyViability: 'low' | 'medium' | 'high' = 'low';
  if (taxOptimizationScore > 30) strategyViability = 'high';
  else if (taxOptimizationScore > 15) strategyViability = 'medium';

  return {
    contributionEfficiency,
    taxOptimizationScore,
    retirementReadiness,
    strategyViability
  };
}

export function validateMegaBackdoorRothInputs(inputs: MegaBackdoorRothInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentAge < 0 || inputs.currentAge > 120) {
    errors.push('Current age must be between 0 and 120');
  }

  if (inputs.annualSalary <= 0) {
    errors.push('Annual salary must be greater than $0');
  }

  if (inputs.expectedReturn < -20 || inputs.expectedReturn > 50) {
    errors.push('Expected return must be between -20% and 50%');
  }

  if (inputs.yearsToRetirement < 0 || inputs.yearsToRetirement > 100) {
    errors.push('Years to retirement must be between 0 and 100');
  }

  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 20) {
    errors.push('State tax rate must be between 0% and 20%');
  }

  if (inputs.currentAge + inputs.yearsToRetirement > 120) {
    errors.push('Age at retirement cannot exceed 120 years');
  }

  return errors;
}