import { IRAInputs, RAResults, IRAMetrics } from './types';

export function calculateIRA(inputs: IRAInputs): RAResults {
  const {
    currentBalance,
    annualContribution,
    expectedReturn,
    yearsToRetirement,
    currentAge,
    iraType,
    taxBracket,
    inflationRate,
    includeRequiredMinimumDistributions,
    spousalIRA,
    catchUpContributions
  } = inputs;

  // Calculate adjusted contribution limits
  const maxContribution = getMaxContribution(iraType, currentAge, catchUpContributions, spousalIRA);
  const adjustedContribution = Math.min(annualContribution, maxContribution);

  // Calculate future value with compound growth
  const futureValue = calculateFutureValue(currentBalance, adjustedContribution, expectedReturn, yearsToRetirement);
  const totalContributions = currentBalance + (adjustedContribution * yearsToRetirement);
  const totalEarnings = futureValue - totalContributions;

  // Calculate tax implications
  const taxSavings = calculateTaxSavings(iraType, adjustedContribution, taxBracket, yearsToRetirement);
  const netValue = futureValue - (iraType === 'traditional' ? calculateFutureTaxLiability(futureValue, taxBracket) : 0);

  // Calculate required minimum distribution
  const requiredMinimumDistribution = includeRequiredMinimumDistributions
    ? calculateRMD(futureValue, currentAge + yearsToRetirement)
    : 0;

  // Calculate effective return
  const effectiveReturn = calculateEffectiveReturn(futureValue, totalContributions, yearsToRetirement);

  // Calculate break-even age
  const breakEvenAge = currentAge + yearsToRetirement;

  // Calculate retirement income
  const retirementIncome = calculateRetirementIncome(netValue, requiredMinimumDistribution);

  return {
    futureValue,
    totalContributions,
    totalEarnings,
    taxSavings,
    netValue,
    requiredMinimumDistribution,
    effectiveReturn,
    breakEvenAge,
    retirementIncome
  };
}

function getMaxContribution(iraType: string, age: number, catchUp: boolean, spousal: boolean): number {
  const baseLimits = {
    traditional: 7000,
    roth: 7000,
    sep: 69000,
    simple: 16000
  };

  let limit = baseLimits[iraType as keyof typeof baseLimits] || 7000;

  if (catchUp && age >= 50) {
    limit += 1000;
  }

  if (spousal) {
    limit *= 2;
  }

  return limit;
}

function calculateFutureValue(currentBalance: number, annualContribution: number, expectedReturn: number, years: number): number {
  const rate = expectedReturn / 100;
  let futureValue = currentBalance * Math.pow(1 + rate, years);

  for (let i = 1; i <= years; i++) {
    futureValue += annualContribution * Math.pow(1 + rate, years - i);
  }

  return futureValue;
}

function calculateTaxSavings(iraType: string, contribution: number, taxBracket: number, years: number): number {
  if (iraType === 'roth') {
    return 0; // Roth IRAs don't provide immediate tax deductions
  }

  // For traditional IRAs, calculate tax savings on contributions
  return contribution * (taxBracket / 100);
}

function calculateFutureTaxLiability(futureValue: number, taxBracket: number): number {
  // Simplified tax calculation for traditional IRA withdrawals
  return futureValue * (taxBracket / 100);
}

function calculateRMD(balance: number, age: number): number {
  if (age < 72) return 0;

  // Simplified RMD calculation
  const divisor = Math.max(1, 27.4 - (age - 72) * 0.4);
  return balance / divisor;
}

function calculateEffectiveReturn(futureValue: number, totalContributions: number, years: number): number {
  if (totalContributions <= 0 || years <= 0) return 0;

  const ratio = futureValue / totalContributions;
  const effectiveReturn = Math.pow(ratio, 1 / years) - 1;
  return effectiveReturn * 100;
}

function calculateRetirementIncome(netValue: number, rmd: number): number {
  // Estimate annual retirement income
  return Math.max(rmd, netValue * 0.04); // 4% safe withdrawal rate
}

export function calculateIRAMetrics(inputs: IRAInputs, results: RAResults): IRAMetrics {
  const { annualContribution, yearsToRetirement } = inputs;
  const { futureValue, totalContributions, taxSavings } = results;

  // Calculate contribution efficiency
  const contributionEfficiency = (results.totalEarnings / totalContributions) * 100;

  // Calculate tax advantage ratio
  const taxAdvantageRatio = totalContributions > 0 ? (taxSavings / totalContributions) * 100 : 0;

  // Calculate risk-adjusted return
  const riskAdjustedReturn = results.effectiveReturn / yearsToRetirement;

  // Determine retirement readiness
  const readinessScore = (futureValue / (annualContribution * yearsToRetirement * 25)) * 100;
  let retirementReadiness: 'low' | 'medium' | 'high' = 'low';
  if (readinessScore >= 75) retirementReadiness = 'high';
  else if (readinessScore >= 50) retirementReadiness = 'medium';

  return {
    contributionEfficiency,
    taxAdvantageRatio,
    riskAdjustedReturn,
    retirementReadiness
  };
}

export function validateIRAInputs(inputs: IRAInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentBalance < 0) {
    errors.push('Current balance cannot be negative');
  }

  if (inputs.annualContribution <= 0) {
    errors.push('Annual contribution must be greater than $0');
  }

  if (inputs.expectedReturn < -20 || inputs.expectedReturn > 50) {
    errors.push('Expected return must be between -20% and 50%');
  }

  if (inputs.yearsToRetirement < 0 || inputs.yearsToRetirement > 100) {
    errors.push('Years to retirement must be between 0 and 100');
  }

  if (inputs.currentAge < 0 || inputs.currentAge > 120) {
    errors.push('Current age must be between 0 and 120');
  }

  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.inflationRate < -10 || inputs.inflationRate > 20) {
    errors.push('Inflation rate must be between -10% and 20%');
  }

  return errors;
}