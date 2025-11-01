import { FourOhThreeBInputs, FourOhThreeBMetrics, FourOhThreeBAnalysis } from './types';

// Calculate annual employee contribution
export function calculateAnnualEmployeeContribution(
  currentSalary: number,
  employeeContributionPercent: number,
  expectedAnnualSalaryIncrease: number,
  years: number
): number {
  const futureSalary = currentSalary * Math.pow(1 + expectedAnnualSalaryIncrease / 100, years);
  return futureSalary * (employeeContributionPercent / 100);
}

// Calculate employer match contribution
export function calculateEmployerMatchContribution(
  employeeContribution: number,
  employerMatchPercent: number,
  employerMatchLimitPercent: number,
  currentSalary: number,
  expectedAnnualSalaryIncrease: number,
  years: number
): number {
  const futureSalary = currentSalary * Math.pow(1 + expectedAnnualSalaryIncrease / 100, years);
  const maxEmployerMatch = futureSalary * (employerMatchLimitPercent / 100);
  const calculatedMatch = employeeContribution * (employerMatchPercent / 100);
  return Math.min(calculatedMatch, maxEmployerMatch);
}

// Calculate catch-up contribution (for age 50+)
export function calculateCatchUpContribution(
  currentAge: number,
  years: number,
  catchUpContribution: number = 0
): number {
  const ageAtYear = currentAge + years;
  return ageAtYear >= 50 ? catchUpContribution : 0;
}

// Calculate projected balance with compound growth
export function calculateProjectedBalance(
  inputs: FourOhThreeBInputs
): number {
  const {
    currentAge,
    retirementAge,
    currentSalary,
    expectedAnnualSalaryIncrease,
    employeeContributionPercent,
    employerMatchPercent,
    employerMatchLimitPercent,
    catchUpContribution,
    currentBalance,
    expectedAnnualReturn,
    investmentFees,
    includeEmployerMatch,
    includeCatchUpContributions,
    includeInvestmentFees
  } = inputs;

  const yearsToRetirement = retirementAge - currentAge;
  let balance = currentBalance;
  let totalContributions = 0;

  for (let year = 0; year < yearsToRetirement; year++) {
    // Calculate contributions for this year
    const employeeContrib = calculateAnnualEmployeeContribution(
      currentSalary, employeeContributionPercent, expectedAnnualSalaryIncrease, year
    );

    let employerContrib = 0;
    if (includeEmployerMatch) {
      employerContrib = calculateEmployerMatchContribution(
        employeeContrib, employerMatchPercent, employerMatchLimitPercent,
        currentSalary, expectedAnnualSalaryIncrease, year
      );
    }

    let catchUpContrib = 0;
    if (includeCatchUpContributions && catchUpContribution) {
      catchUpContrib = calculateCatchUpContribution(currentAge, year, catchUpContribution);
    }

    const totalYearContribution = employeeContrib + employerContrib + catchUpContrib;
    totalContributions += totalYearContribution;

    // Apply investment growth and fees
    const grossGrowth = balance * (expectedAnnualReturn / 100);
    const fees = includeInvestmentFees ? balance * (investmentFees / 100) : 0;
    const netGrowth = grossGrowth - fees;

    balance += totalYearContribution + netGrowth;
  }

  return balance;
}

// Calculate tax deferral benefit
export function calculateTaxDeferralBenefit(
  totalContributions: number,
  currentTaxRate: number
): number {
  return totalContributions * (currentTaxRate / 100);
}

// Calculate annual retirement income (4% safe withdrawal rate)
export function calculateAnnualRetirementIncome(projectedBalance: number): number {
  return projectedBalance * 0.04; // 4% safe withdrawal rate
}

// Calculate replacement ratio
export function calculateReplacementRatio(
  annualRetirementIncome: number,
  finalSalary: number
): number {
  return (annualRetirementIncome / finalSalary) * 100;
}

// Calculate effective return after fees and taxes
export function calculateEffectiveReturn(
  expectedAnnualReturn: number,
  investmentFees: number,
  includeInvestmentFees: boolean
): number {
  return includeInvestmentFees ? expectedAnnualReturn - investmentFees : expectedAnnualReturn;
}

// Generate 403(b) analysis
export function generateFourOhThreeBAnalysis(
  inputs: FourOhThreeBInputs,
  metrics: FourOhThreeBMetrics
): FourOhThreeBAnalysis {
  const { currentAge, retirementAge, employeeContributionPercent } = inputs;
  const { replacementRatio, effectiveReturn, totalContributions } = metrics;

  // Determine contribution efficiency
  let contributionEfficiency: 'excellent' | 'good' | 'fair' | 'poor' = 'poor';
  if (employeeContributionPercent >= 15) contributionEfficiency = 'excellent';
  else if (employeeContributionPercent >= 10) contributionEfficiency = 'good';
  else if (employeeContributionPercent >= 5) contributionEfficiency = 'fair';

  // Determine tax efficiency
  let taxEfficiency: 'high' | 'moderate' | 'low' = 'low';
  if (inputs.currentTaxRate > inputs.retirementTaxRate) taxEfficiency = 'high';
  else if (inputs.currentTaxRate === inputs.retirementTaxRate) taxEfficiency = 'moderate';

  // Determine retirement readiness
  let retirementReadiness: 'on_track' | 'behind' | 'at_risk' = 'at_risk';
  if (replacementRatio >= 80) retirementReadiness = 'on_track';
  else if (replacementRatio >= 60) retirementReadiness = 'behind';

  // Generate recommendations
  const recommendations = [];
  if (contributionEfficiency === 'poor') {
    recommendations.push('Consider increasing contribution percentage to improve retirement readiness');
  }
  if (retirementReadiness === 'at_risk') {
    recommendations.push('Consider delaying retirement or reducing retirement lifestyle expectations');
  }
  if (inputs.includeEmployerMatch && inputs.employerMatchPercent > 0) {
    recommendations.push('Maximize employer match to get free money for retirement');
  }

  // Contribution optimization
  const contributionOptimization = [
    'Maximize employer match contributions',
    'Consider catch-up contributions after age 50',
    'Increase contributions annually with salary increases',
    'Review and optimize investment fees'
  ];

  // Investment strategy
  const investmentStrategy = [
    'Diversify across asset classes',
    'Consider target-date funds for simplicity',
    'Regularly rebalance portfolio',
    'Monitor expense ratios and fees'
  ];

  // Risk factors
  const riskFactors = [];
  if (effectiveReturn < 5) {
    riskFactors.push('Low expected returns may impact retirement goals');
  }
  if (retirementAge - currentAge < 20) {
    riskFactors.push('Short savings horizon increases risk');
  }

  // Market volatility impact
  const marketVolatilityImpact = effectiveReturn > 7 ?
    'Moderate impact - diversified portfolio recommended' :
    'High impact - consider conservative investment approach';

  // Longevity risk
  const longevityRisk = 'Plan for retirement lasting 30+ years; consider longevity insurance';

  // Contribution limits (2024 limits)
  const contributionLimits = {
    annualLimit: 23000, // 2024 limit
    catchUpLimit: 7500,  // Age 50+ catch-up
    totalLimit: 69000   // Total limit with employer contributions
  };

  // Vesting schedule (varies by plan)
  const vestingSchedule = 'Varies by employer plan - check your specific vesting schedule';

  // Withdrawal penalties
  const withdrawalPenalties = [
    '10% early withdrawal penalty before age 59½',
    'Required minimum distributions after age 73',
    'Possible plan-specific penalties'
  ];

  // Comparison with other plans
  const vsOtherRetirementPlans = {
    vs401k: 'Similar to 401(k) but for non-profit employees',
    vsIRA: 'Higher contribution limits than Traditional IRA',
    vsRoth: 'Tax-deferred vs. tax-free growth'
  };

  return {
    contributionEfficiency,
    taxEfficiency,
    retirementReadiness,
    recommendations,
    contributionOptimization,
    investmentStrategy,
    riskFactors,
    marketVolatilityImpact,
    longevityRisk,
    contributionLimits,
    vestingSchedule,
    withdrawalPenalties,
    vsOtherRetirementPlans
  };
}