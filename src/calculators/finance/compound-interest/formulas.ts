import { CompoundInterestInputs, CompoundInterestMetrics, CompoundInterestAnalysis } from './types';

// Calculate effective annual interest rate
export function calculateEffectiveAnnualRate(
  nominalRate: number,
  compoundingFrequency: string
): number {
  const frequencyMap = {
    'daily': 365,
    'monthly': 12,
    'quarterly': 4,
    'annually': 1
  };

  const n = frequencyMap[compoundingFrequency as keyof typeof frequencyMap];
  return Math.pow(1 + nominalRate / 100 / n, n) - 1;
}

// Calculate future value with compound interest
export function calculateFutureValue(
  principal: number,
  nominalRate: number,
  timeYears: number,
  compoundingFrequency: string,
  regularContribution: number = 0,
  contributionFrequency: string = 'monthly',
  contributionTiming: string = 'end',
  includeInvestmentFees: boolean = false,
  investmentFees: number = 0
): number {
  const effectiveRate = calculateEffectiveAnnualRate(nominalRate, compoundingFrequency);
  let futureValue = principal * Math.pow(1 + effectiveRate, timeYears);

  // Add regular contributions
  if (regularContribution > 0) {
    const contributionFrequencyMap = {
      'monthly': 12,
      'quarterly': 4,
      'annually': 1
    };

    const contribPerYear = regularContribution * contributionFrequencyMap[contributionFrequency as keyof typeof contributionFrequencyMap];
    const periodsPerYear = contributionFrequencyMap[compoundingFrequency as keyof typeof contributionFrequencyMap] || 12;

    // Future value of annuity
    const ratePerPeriod = effectiveRate / periodsPerYear;
    const totalPeriods = timeYears * periodsPerYear;
    const contributionsPerPeriod = contribPerYear / periodsPerYear;

    if (contributionTiming === 'end') {
      // Ordinary annuity
      const annuityFV = contributionsPerPeriod * (Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod;
      futureValue += annuityFV;
    } else {
      // Annuity due
      const annuityFV = contributionsPerPeriod * (Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod * (1 + ratePerPeriod);
      futureValue += annuityFV;
    }
  }

  // Apply investment fees
  if (includeInvestmentFees && investmentFees > 0) {
    const annualFeeRate = investmentFees / 100;
    // Simplified fee calculation - reduce final value by average annual fees
    const averageBalance = (principal + futureValue) / 2;
    const totalFees = averageBalance * annualFeeRate * timeYears;
    futureValue -= totalFees;
  }

  return futureValue;
}

// Calculate total contributions
export function calculateTotalContributions(
  regularContribution: number,
  contributionFrequency: string,
  timeYears: number
): number {
  if (regularContribution <= 0) return 0;

  const frequencyMap = {
    'monthly': 12,
    'quarterly': 4,
    'annually': 1
  };

  const contributionsPerYear = regularContribution * frequencyMap[contributionFrequency as keyof typeof frequencyMap];
  return contributionsPerYear * timeYears;
}

// Calculate total interest earned
export function calculateTotalInterest(
  futureValue: number,
  principal: number,
  totalContributions: number
): number {
  return futureValue - principal - totalContributions;
}

// Calculate inflation-adjusted value
export function calculateInflationAdjustedValue(
  futureValue: number,
  inflationRate: number,
  timeYears: number
): number {
  const inflationFactor = Math.pow(1 + inflationRate / 100, timeYears);
  return futureValue / inflationFactor;
}

// Calculate after-tax value
export function calculateAfterTaxValue(
  futureValue: number,
  taxRate: number,
  includeTaxes: boolean
): number {
  if (!includeTaxes) return futureValue;
  return futureValue * (1 - taxRate / 100);
}

// Calculate contribution impact
export function calculateContributionImpact(
  futureValueWithContributions: number,
  futureValueWithoutContributions: number,
  totalContributions: number
): number {
  if (totalContributions === 0) return 0;
  return (futureValueWithContributions - futureValueWithoutContributions) / totalContributions;
}

// Calculate time value of money
export function calculateTimeValueOfMoney(
  futureValue: number,
  principal: number,
  timeYears: number
): number {
  if (timeYears === 0) return 0;
  return (futureValue / principal - 1) / timeYears * 100;
}

// Calculate compound effect (difference vs simple interest)
export function calculateCompoundEffect(
  principal: number,
  nominalRate: number,
  timeYears: number,
  compoundingFrequency: string
): number {
  const simpleInterest = principal * (1 + nominalRate / 100 * timeYears);
  const compoundValue = calculateFutureValue(principal, nominalRate, timeYears, compoundingFrequency);
  return compoundValue - simpleInterest;
}

// Calculate purchasing power
export function calculatePurchasingPower(
  futureValue: number,
  inflationRate: number,
  timeYears: number
): number {
  const inflationAdjusted = calculateInflationAdjustedValue(futureValue, inflationRate, timeYears);
  return (inflationAdjusted / futureValue) * 100;
}

// Calculate real return
export function calculateRealReturn(
  nominalRate: number,
  inflationRate: number
): number {
  return ((1 + nominalRate / 100) / (1 + inflationRate / 100) - 1) * 100;
}

// Calculate efficiency ratio
export function calculateEfficiencyRatio(
  futureValue: number,
  totalContributions: number,
  principal: number
): number {
  const totalInvested = principal + totalContributions;
  if (totalInvested === 0) return 0;
  return futureValue / totalInvested;
}

// Calculate break-even analysis
export function calculateBreakEvenAnalysis(
  principal: number,
  regularContribution: number,
  targetAmount: number,
  nominalRate: number,
  compoundingFrequency: string
): number {
  // Simplified calculation - estimate years to reach target
  if (targetAmount <= principal) return 0;

  let balance = principal;
  let years = 0;
  const monthlyRate = calculateEffectiveAnnualRate(nominalRate, compoundingFrequency) / 12;
  const monthlyContribution = regularContribution;

  while (balance < targetAmount && years < 100) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
    years += 1/12; // Monthly increments
  }

  return years;
}

// Generate compound interest analysis
export function generateCompoundInterestAnalysis(
  inputs: CompoundInterestInputs,
  metrics: CompoundInterestMetrics
): CompoundInterestAnalysis {
  const { nominalInterestRate, timePeriodYears, regularContribution } = inputs;
  const { efficiencyRatio, contributionImpact, futureValue } = metrics;

  // Determine growth efficiency
  let growthEfficiency: 'excellent' | 'good' | 'fair' | 'poor' = 'poor';
  if (efficiencyRatio > 2.0) growthEfficiency = 'excellent';
  else if (efficiencyRatio > 1.5) growthEfficiency = 'good';
  else if (efficiencyRatio > 1.2) growthEfficiency = 'fair';

  // Determine contribution strategy
  let contributionStrategy: 'optimal' | 'good' | 'fair' | 'suboptimal' = 'suboptimal';
  if (contributionImpact > 1.5) contributionStrategy = 'optimal';
  else if (contributionImpact > 1.0) contributionStrategy = 'good';
  else if (contributionImpact > 0.5) contributionStrategy = 'fair';

  // Determine time horizon
  let timeHorizon: 'long_term' | 'medium_term' | 'short_term' = 'short_term';
  if (timePeriodYears >= 10) timeHorizon = 'long_term';
  else if (timePeriodYears >= 5) timeHorizon = 'medium_term';

  // Generate recommendations
  const recommendations = [];
  if (growthEfficiency === 'poor') {
    recommendations.push('Consider higher interest rates or longer time horizons for better growth');
  }
  if (contributionStrategy === 'suboptimal') {
    recommendations.push('Increase regular contributions to maximize compound growth effect');
  }
  if (timeHorizon === 'short_term') {
    recommendations.push('Longer time horizons significantly enhance compound growth');
  }

  // Optimization tips
  const optimizationTips = [
    'Start early to maximize compound growth',
    'Increase contributions annually',
    'Choose higher compounding frequency when possible',
    'Minimize investment fees',
    'Consider tax-advantaged accounts'
  ];

  // Risk considerations
  const riskConsiderations = [
    'Interest rate changes can affect returns',
    'Inflation may reduce purchasing power',
    'Market volatility impacts investment returns',
    'Contribution consistency is crucial'
  ];

  // Educational insights
  const compoundEffect = 'Compound interest allows earnings to generate earnings, creating exponential growth over time';

  const contributionImportance = regularContribution > 0 ?
    'Regular contributions significantly enhance long-term growth through dollar-cost averaging' :
    'Adding regular contributions can dramatically increase future value';

  const timeValueEducation = 'The power of compound interest grows exponentially with time - starting early is crucial';

  // Comparative analysis
  const vsOtherInvestments = {
    vsSavingsAccount: nominalInterestRate > 1 ?
      'Potentially better than typical savings account rates' :
      'May not outperform high-yield savings accounts',
    vsStockMarket: 'Compound interest provides steady growth vs. market volatility',
    vsRealEstate: 'Lower risk than real estate but potentially lower returns'
  };

  // Financial planning
  const savingsGoalProgress = futureValue > 0 ? (futureValue / (futureValue * 1.5)) * 100 : 0; // Simplified
  const timeToGoal = timePeriodYears; // Current time period
  const accelerationStrategies = [
    'Increase monthly contributions',
    'Find higher interest rates',
    'Reduce investment fees',
    'Start additional savings accounts'
  ];

  // Risk assessment
  const interestRateRisk = nominalInterestRate < 3 ?
    'Low interest rates limit growth potential' :
    'Current rates provide reasonable growth opportunity';

  const inflationRisk = inputs.includeInflation && inputs.inflationRate > 3 ?
    'High inflation may erode purchasing power' :
    'Inflation risk is manageable with current rates';

  const contributionRisk = regularContribution === 0 ?
    'No regular contributions increase dependency on principal growth' :
    'Regular contributions provide stable growth foundation';

  return {
    growthEfficiency,
    contributionStrategy,
    timeHorizon,
    recommendations,
    optimizationTips,
    riskConsiderations,
    compoundEffect,
    contributionImportance,
    timeValueEducation,
    vsOtherInvestments,
    savingsGoalProgress,
    timeToGoal,
    accelerationStrategies,
    interestRateRisk,
    inflationRisk,
    contributionRisk
  };
}