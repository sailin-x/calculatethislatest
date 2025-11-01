import { TraditionalIRAInputs, TraditionalIRAMetrics, TraditionalIRAAnalysis } from './types';

// Calculate annual contributions with frequency adjustment
export function calculateAnnualContributions(
  annualContribution: number,
  contributionFrequency: string,
  currentAge: number,
  retirementAge: number,
  includeCatchUpContributions: boolean,
  catchUpContribution: number
): number {
  const frequencyMultipliers = {
    'annual': 1,
    'quarterly': 4,
    'monthly': 12
  };

  let totalAnnual = annualContribution * frequencyMultipliers[contributionFrequency as keyof typeof frequencyMultipliers];

  // Add catch-up contributions if applicable
  if (includeCatchUpContributions && currentAge >= 50) {
    totalAnnual += catchUpContribution;
  }

  return totalAnnual;
}

// Calculate total contributions over time
export function calculateTotalContributions(
  annualContributions: number,
  currentAge: number,
  retirementAge: number
): number {
  const years = retirementAge - currentAge;
  return annualContributions * years;
}

// Calculate tax deduction from contributions
export function calculateTaxDeduction(
  totalContributions: number,
  currentTaxRate: number,
  deductibleContributions: boolean
): number {
  if (!deductibleContributions) return 0;
  return totalContributions * (currentTaxRate / 100);
}

// Calculate net contribution cost (after tax deduction)
export function calculateNetContributionCost(
  totalContributions: number,
  taxDeduction: number
): number {
  return totalContributions - taxDeduction;
}

// Calculate projected balance with compound growth
export function calculateProjectedBalance(
  inputs: TraditionalIRAInputs
): number {
  const {
    currentBalance,
    currentAge,
    retirementAge,
    annualContribution,
    contributionFrequency,
    expectedAnnualReturn,
    investmentFees,
    includeInvestmentFees,
    includeCatchUpContributions,
    catchUpContribution
  } = inputs;

  const years = retirementAge - currentAge;
  let balance = currentBalance;

  for (let year = 0; year < years; year++) {
    // Add contributions for this year
    const annualContrib = calculateAnnualContributions(
      annualContribution,
      contributionFrequency,
      currentAge + year,
      retirementAge,
      includeCatchUpContributions,
      catchUpContribution
    );
    balance += annualContrib;

    // Apply investment growth and fees
    const grossGrowth = balance * (expectedAnnualReturn / 100);
    const fees = includeInvestmentFees ? balance * (investmentFees / 100) : 0;
    const netGrowth = grossGrowth - fees;
    balance += netGrowth;
  }

  return balance;
}

// Calculate Required Minimum Distribution (RMD)
export function calculateAnnualRMD(
  projectedBalance: number,
  currentAge: number,
  lifeExpectancy: number,
  rmdStartAge: number
): number {
  if (currentAge < rmdStartAge) return 0;

  // Use life expectancy method for RMD calculation
  // Simplified - actual RMD uses IRS life expectancy tables
  const divisor = Math.max(1, lifeExpectancy - (currentAge - rmdStartAge));

  return projectedBalance / divisor;
}

// Calculate lifetime withdrawals
export function calculateLifetimeWithdrawals(
  annualRMD: number,
  lifeExpectancy: number,
  retirementAge: number,
  includeInflation: boolean,
  inflationRate: number
): number {
  let totalWithdrawals = 0;
  let currentWithdrawal = annualRMD;

  const withdrawalYears = lifeExpectancy - retirementAge;

  for (let year = 0; year < withdrawalYears; year++) {
    totalWithdrawals += currentWithdrawal;

    if (includeInflation) {
      currentWithdrawal *= (1 + inflationRate / 100);
    }
  }

  return totalWithdrawals;
}

// Calculate present value of withdrawals
export function calculatePresentValueOfWithdrawals(
  annualRMD: number,
  lifeExpectancy: number,
  retirementAge: number,
  discountRate: number,
  includeInflation: boolean,
  inflationRate: number
): number {
  let presentValue = 0;
  let currentWithdrawal = annualRMD;

  const withdrawalYears = lifeExpectancy - retirementAge;

  for (let year = 0; year < withdrawalYears; year++) {
    presentValue += currentWithdrawal / Math.pow(1 + discountRate / 100, year + 1);

    if (includeInflation) {
      currentWithdrawal *= (1 + inflationRate / 100);
    }
  }

  return presentValue;
}

// Calculate lifetime taxes on withdrawals
export function calculateLifetimeTaxesPaid(
  lifetimeWithdrawals: number,
  retirementTaxRate: number,
  includeTaxes: boolean
): number {
  if (!includeTaxes) return 0;
  return lifetimeWithdrawals * (retirementTaxRate / 100);
}

// Calculate effective tax rate
export function calculateEffectiveTaxRate(
  totalContributions: number,
  lifetimeWithdrawals: number,
  lifetimeTaxesPaid: number
): number {
  if (lifetimeWithdrawals === 0) return 0;
  return (lifetimeTaxesPaid / lifetimeWithdrawals) * 100;
}

// Calculate Roth conversion analysis
export function calculateRothConversionAnalysis(
  rothConversionAmount: number,
  rothConversionTaxRate: number,
  expectedAnnualReturn: number,
  yearsToRetirement: number
): { taxCost: number; futureValue: number; breakevenYears: number } {
  const taxCost = rothConversionAmount * (rothConversionTaxRate / 100);

  // Calculate future value if kept in Traditional IRA
  const traditionalFutureValue = rothConversionAmount * Math.pow(1 + expectedAnnualReturn / 100, yearsToRetirement);

  // Roth IRA grows tax-free
  const rothFutureValue = (rothConversionAmount - taxCost) * Math.pow(1 + expectedAnnualReturn / 100, yearsToRetirement);

  // Breakeven analysis
  const breakevenYears = taxCost > 0 ?
    Math.log(rothFutureValue / traditionalFutureValue) / Math.log(1 + expectedAnnualReturn / 100) : 0;

  return {
    taxCost,
    futureValue: rothFutureValue,
    breakevenYears
  };
}

// Calculate efficiency ratio
export function calculateEfficiencyRatio(
  presentValueOfWithdrawals: number,
  netContributionCost: number
): number {
  if (netContributionCost === 0) return 0;
  return presentValueOfWithdrawals / netContributionCost;
}

// Generate Traditional IRA analysis
export function generateTraditionalIRAAnalysis(
  inputs: TraditionalIRAInputs,
  metrics: TraditionalIRAMetrics
): TraditionalIRAAnalysis {
  const { currentAge, retirementAge, expectedAnnualReturn, annualContribution } = inputs;
  const { efficiencyRatio, effectiveTaxRate, totalContributions } = metrics;

  // Determine contribution efficiency
  const contributionRate = (annualContribution / 23000) * 100; // 2024 limit
  let contributionEfficiency: 'excellent' | 'good' | 'fair' | 'poor' = 'poor';
  if (contributionRate >= 15) contributionEfficiency = 'excellent';
  else if (contributionRate >= 10) contributionEfficiency = 'good';
  else if (contributionRate >= 5) contributionEfficiency = 'fair';

  // Determine tax efficiency
  let taxEfficiency: 'high' | 'moderate' | 'low' = 'low';
  if (effectiveTaxRate < 15) taxEfficiency = 'high';
  else if (effectiveTaxRate < 25) taxEfficiency = 'moderate';

  // Determine retirement readiness
  const yearsToRetirement = retirementAge - currentAge;
  let retirementReadiness: 'on_track' | 'behind' | 'at_risk' = 'at_risk';
  if (efficiencyRatio > 2.0) retirementReadiness = 'on_track';
  else if (efficiencyRatio > 1.5) retirementReadiness = 'behind';

  // Generate recommendations
  const recommendations = [];
  if (contributionEfficiency === 'poor') {
    recommendations.push('Consider increasing annual contributions to maximize retirement savings');
  }
  if (retirementReadiness === 'at_risk') {
    recommendations.push('Review retirement goals and consider additional savings strategies');
  }
  if (inputs.currentAge >= 50 && !inputs.includeCatchUpContributions) {
    recommendations.push('Consider catch-up contributions to accelerate retirement savings');
  }

  // Contribution strategy
  const contributionStrategy = [
    'Maximize annual contribution limits',
    'Utilize catch-up contributions after age 50',
    'Consider annual increases with salary growth',
    'Balance with other retirement accounts'
  ];

  // Withdrawal strategy
  const withdrawalStrategy = [
    'Start RMDs at appropriate age (usually 73)',
    'Consider Qualified Charitable Distributions',
    'Plan for tax-efficient withdrawal sequencing',
    'Balance with other income sources'
  ];

  // Tax optimization
  const taxOptimization = [
    'Consider Roth conversions in low-income years',
    'Utilize Qualified Charitable Distributions',
    'Plan withdrawals to minimize tax brackets',
    'Consider state tax implications'
  ];

  // Risk factors
  const riskFactors = [];
  if (expectedAnnualReturn < 5) {
    riskFactors.push('Conservative return assumptions may understate retirement needs');
  }
  if (yearsToRetirement < 20) {
    riskFactors.push('Limited time horizon increases savings urgency');
  }
  if (inputs.retirementTaxRate > inputs.currentTaxRate) {
    riskFactors.push('Higher retirement tax rates reduce benefits');
  }

  // Market volatility impact
  const marketVolatilityImpact = expectedAnnualReturn > 7 ?
    'Moderate impact - diversified portfolio recommended' :
    'Conservative approach suitable for stability';

  // Longevity risk
  const longevityRisk = 'RMDs provide lifetime income but may deplete principal with long life expectancy';

  // Sequence of returns risk
  const sequenceOfReturnsRisk = 'Early retirement withdrawals face market timing risk';

  // Contribution limits (2024 limits)
  const contributionLimits = {
    annualLimit: 23000, // 2024 limit
    catchUpLimit: 1000,  // Age 50+ catch-up
    totalLimit: 24000   // Total with catch-up
  };

  // RMD requirements
  const rmdRequirements = [
    'Must start by April 1 following year of turning 73',
    'Based on life expectancy tables',
    'Penalty of 25% for missed RMDs (reduced to 10% if corrected)',
    'Spouse beneficiary can delay RMDs'
  ];

  // Penalty rules
  const penaltyRules = [
    '10% penalty for early withdrawals before age 59½',
    'Exceptions for qualified education, first home, medical expenses',
    'No penalty for Qualified Charitable Distributions',
    'Penalty-free withdrawals after age 59½'
  ];

  // Strategy comparisons
  const vsOtherRetirementAccounts = {
    vsRothIRA: 'Tax-deferred vs. tax-free growth - Roth better for high retirement tax rates',
    vs401k: 'Similar tax treatment but IRA offers more investment flexibility',
    vsTaxableBrokerage: 'Tax advantages vs. no contribution limits or early withdrawal penalties'
  };

  // Financial planning
  const targetRetirementIncome = totalContributions * 0.04; // 4% safe withdrawal
  const retirementIncomeGap = Math.max(0, targetRetirementIncome - metrics.presentValueOfWithdrawals);

  const savingsAcceleration = inputs.includeCatchUpContributions ?
    'Catch-up contributions can accelerate retirement readiness' :
    'Consider catch-up contributions for faster progress';

  const taxDiversification = 'Traditional IRA provides tax-deferred growth complementing taxable and Roth accounts';

  // Optimization opportunities
  const contributionOptimization = [
    'Maximize employer match before IRA contributions',
    'Consider backdoor Roth IRA conversions',
    'Utilize spousal IRA contributions',
    'Annual contribution increases'
  ];

  const investmentOptimization = [
    'Diversify across asset classes',
    'Consider target-date funds',
    'Minimize investment fees',
    'Regular portfolio rebalancing'
  ];

  const withdrawalOptimization = [
    'Delay RMDs if still working',
    'Consider Qualified Charitable Distributions',
    'Plan withdrawals in low-income years',
    'Coordinate with other retirement accounts'
  ];

  return {
    contributionEfficiency,
    taxEfficiency,
    retirementReadiness,
    recommendations,
    contributionStrategy,
    withdrawalStrategy,
    taxOptimization,
    riskFactors,
    marketVolatilityImpact,
    longevityRisk,
    sequenceOfReturnsRisk,
    contributionLimits,
    rmdRequirements,
    penaltyRules,
    vsOtherRetirementAccounts,
    retirementIncomeGap,
    savingsAcceleration,
    taxDiversification,
    contributionOptimization,
    investmentOptimization,
    withdrawalOptimization
  };
}