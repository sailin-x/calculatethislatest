import {
  DefinedContributionPlanInputs,
  DefinedContributionPlanOutputs,
  DefinedContributionPlanMetrics,
  DefinedContributionPlanAnalysis
} from './types';

// Helper function to calculate future value of contributions
function calculateFutureValue(
  principal: number,
  monthlyContribution: number,
  annualContribution: number,
  years: number,
  annualReturn: number,
  monthlyReturn: number
): number {
  let futureValue = principal * Math.pow(1 + annualReturn, years);

  // Monthly contributions
  if (monthlyContribution > 0) {
    const monthlyFV = monthlyContribution * ((Math.pow(1 + monthlyReturn, years * 12) - 1) / monthlyReturn);
    futureValue += monthlyFV;
  }

  // Annual contributions
  if (annualContribution > 0) {
    for (let i = 1; i <= years; i++) {
      futureValue += annualContribution * Math.pow(1 + annualReturn, years - i);
    }
  }

  return futureValue;
}

// Helper function to calculate employer match
function calculateEmployerMatch(
  employeeContribution: number,
  employerMatch: number,
  employerMatchLimit: number
): number {
  const matchAmount = Math.min(employeeContribution, employerMatchLimit) * employerMatch;
  return matchAmount;
}

// Helper function to calculate contribution limits
function getContributionLimit(planType: string, age: number): number {
  const baseLimits: { [key: string]: number } = {
    '401k': 23000,
    '403b': 23000,
    '457': 23000,
    'traditional_ira': 7000,
    'roth_ira': 7000,
    'sep_ira': 69000,
    'simple_ira': 16000
  };

  let limit = baseLimits[planType] || 23000;

  // Add catch-up contribution for age 50+
  if (age >= 50) {
    const catchUpLimits: { [key: string]: number } = {
      '401k': 7500,
      '403b': 7500,
      '457': 7500,
      'traditional_ira': 1000,
      'roth_ira': 1000,
      'sep_ira': 0,
      'simple_ira': 3500
    };
    limit += catchUpLimits[planType] || 0;
  }

  return limit;
}

// Helper function to calculate tax savings
function calculateTaxSavings(
  contributions: number,
  taxBracket: number,
  accountType: string
): number {
  if (accountType === 'roth') return 0;
  return contributions * taxBracket;
}

// Helper function to calculate retirement income
function calculateRetirementIncome(
  balance: number,
  withdrawalRate: number,
  lifeExpectancy: number,
  retirementAge: number
): number {
  const annualIncome = balance * withdrawalRate;
  return annualIncome;
}

// Helper function to assess plan success probability
function assessSuccessProbability(
  projectedBalance: number,
  targetBalance: number,
  volatility: number
): number {
  if (projectedBalance >= targetBalance) return 95;

  const shortfall = (targetBalance - projectedBalance) / targetBalance;
  return Math.max(10, 95 - (shortfall * 100));
}

// Main calculation function
export function calculateDefinedContributionPlan(inputs: DefinedContributionPlanInputs): DefinedContributionPlanOutputs {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentAccountBalance,
    monthlyContribution,
    annualContribution,
    employerMatch,
    employerMatchLimit,
    expectedReturnRate,
    taxBracket,
    accountType,
    yearsToRetirement,
    withdrawalRate,
    annualFees,
    expenseRatio,
    inflationRate,
    includeSocialSecurity,
    socialSecurityBenefit
  } = inputs;

  // Calculate employer match
  const annualEmployeeContribution = monthlyContribution * 12 + annualContribution;
  const employerMatchAmount = calculateEmployerMatch(annualEmployeeContribution, employerMatch, employerMatchLimit);
  const totalAnnualContribution = annualEmployeeContribution + employerMatchAmount;

  // Calculate future value
  const monthlyReturn = expectedReturnRate / 12;
  const projectedBalance = calculateFutureValue(
    currentAccountBalance,
    monthlyContribution,
    annualContribution + employerMatchAmount,
    yearsToRetirement,
    expectedReturnRate,
    monthlyReturn
  );

  // Calculate total contributions
  const totalEmployeeContributions = annualEmployeeContribution * yearsToRetirement;
  const totalEmployerContributions = employerMatchAmount * yearsToRetirement;
  const totalContributions = totalEmployeeContributions + totalEmployerContributions;

  // Calculate investment growth
  const totalInvestmentGrowth = projectedBalance - currentAccountBalance - totalContributions;

  // Calculate retirement income
  const annualRetirementIncome = calculateRetirementIncome(
    projectedBalance,
    withdrawalRate,
    lifeExpectancy,
    retirementAge
  );
  const monthlyRetirementIncome = annualRetirementIncome / 12;

  // Calculate replacement ratio
  const currentAnnualIncome = 75000; // This would come from user input
  const replacementRatio = (annualRetirementIncome / currentAnnualIncome) * 100;

  // Calculate tax savings
  const taxSavings = calculateTaxSavings(totalEmployeeContributions, taxBracket, accountType);

  // Calculate fee impact
  const totalFees = (annualFees + (projectedBalance * expenseRatio)) * yearsToRetirement;
  const feeImpact = totalFees / projectedBalance;

  // Calculate success probability
  const targetBalance = 1000000; // This would be calculated based on goals
  const successProbability = assessSuccessProbability(projectedBalance, targetBalance, 0.15);

  // Calculate risk metrics
  const volatilityRisk = expectedReturnRate > 0.08 ? 'high' : expectedReturnRate > 0.05 ? 'moderate' : 'low';
  const longevityRisk = lifeExpectancy > 90 ? 'high' : 'moderate';
  const inflationRisk = inflationRate > 0.03 ? 'high' : 'moderate';

  // Create metrics object
  const metrics: DefinedContributionPlanMetrics = {
    projectedBalance,
    totalContributions,
    totalEmployerContributions,
    totalInvestmentGrowth,
    monthlyRetirementIncome,
    annualRetirementIncome,
    replacementRatio,
    volatilityRisk: expectedReturnRate,
    longevityRisk: lifeExpectancy - retirementAge,
    inflationRisk: inflationRate,
    taxSavings,
    afterTaxValue: projectedBalance - (projectedBalance * taxBracket),
    effectiveTaxRate: taxBracket,
    totalFees,
    feeImpact,
    vsTarget: (projectedBalance / targetBalance) * 100,
    successProbability
  };

  // Assess overall plan rating
  const planRating = projectedBalance >= targetBalance && successProbability >= 80
    ? 'Excellent'
    : projectedBalance >= targetBalance * 0.8 && successProbability >= 60
    ? 'Good'
    : projectedBalance >= targetBalance * 0.6
    ? 'Fair'
    : 'Poor';

  // Create analysis object
  const analysis: DefinedContributionPlanAnalysis = {
    planRating: planRating as any,
    recommendation: planRating === 'Excellent' || planRating === 'Good'
      ? 'Your retirement plan is on track for a comfortable retirement'
      : 'Consider increasing contributions or adjusting investment strategy',
    keyInsights: [
      `Projected balance: $${Math.round(projectedBalance).toLocaleString()}`,
      `Annual retirement income: $${Math.round(annualRetirementIncome).toLocaleString()}`,
      `Success probability: ${Math.round(successProbability)}%`,
      `Replacement ratio: ${Math.round(replacementRatio)}%`
    ],

    contributionAnalysis: `Total contributions: $${Math.round(totalContributions).toLocaleString()} (${Math.round(totalEmployerContributions / totalContributions * 100)}% from employer)`,
    investmentAnalysis: `Investment growth: $${Math.round(totalInvestmentGrowth).toLocaleString()} at ${expectedReturnRate * 100}% annual return`,
    growthProjection: `Balance will grow from $${Math.round(currentAccountBalance).toLocaleString()} to $${Math.round(projectedBalance).toLocaleString()} in ${yearsToRetirement} years`,

    retirementReadiness: replacementRatio >= 70
      ? 'Strong retirement income replacement'
      : 'Consider increasing contributions or delaying retirement',
    incomeSufficiency: annualRetirementIncome >= 40000
      ? 'Projected income should support comfortable retirement'
      : 'May need additional income sources',
    riskAssessment: `Volatility: ${volatilityRisk}, Longevity: ${longevityRisk}, Inflation: ${inflationRisk}`,

    taxStrategy: accountType === 'roth'
      ? 'Tax-free withdrawals in retirement'
      : `Tax-deferred growth with ${taxBracket * 100}% tax bracket`,
    accountTypeRecommendation: accountType === 'roth' && taxBracket > 0.25
      ? 'Roth may be advantageous given high tax bracket'
      : 'Traditional provides immediate tax benefits',

    feeImpact: `Total fees: $${Math.round(totalFees).toLocaleString()} (${Math.round(feeImpact * 100)}% of portfolio)`,
    costOptimization: expenseRatio > 0.01
      ? 'Consider low-cost index funds'
      : 'Expense ratio is reasonable',

    withdrawalPlan: `4% withdrawal rate provides $${Math.round(annualRetirementIncome).toLocaleString()} annually`,
    rmdStrategy: retirementAge >= 73
      ? 'Required minimum distributions will apply'
      : 'No RMD requirements during accumulation phase',

    vsDefinedBenefit: `Defined contribution vs pension: $${Math.round(annualRetirementIncome - 30000).toLocaleString()} difference`,
    vsOtherStrategies: 'Compare with Social Security and other retirement accounts',

    immediateActions: [
      'Maximize employer match contributions',
      'Review and optimize investment allocations',
      'Consider catch-up contributions if age 50+',
      'Review expense ratios and fees'
    ],

    longTermStrategy: `Continue contributing $${Math.round(totalAnnualContribution).toLocaleString()} annually for ${yearsToRetirement} years`,
    monitoringPlan: 'Review account quarterly and rebalance annually',

    recommendedResources: [
      'IRS Publication 590 (Individual Retirement Arrangements)',
      'Target-date fund prospectuses',
      'Financial advisor consultation',
      'Investment company educational materials'
    ],

    nextSteps: [
      'Set up automatic contributions',
      'Review beneficiary designations',
      'Consider professional financial advice',
      'Monitor investment performance regularly'
    ]
  };

  return {
    metrics,
    analysis,
    projectedRetirementBalance: projectedBalance,
    monthlyRetirementIncome,
    annualRetirementIncome,
    totalValue: projectedBalance
  };
}

// Validation function
export function validateDefinedContributionPlanInputs(inputs: DefinedContributionPlanInputs): string[] {
  const errors: string[] = [];

  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 80) {
    errors.push('Current age must be between 18 and 80');
  }

  if (!inputs.retirementAge || inputs.retirementAge <= inputs.currentAge || inputs.retirementAge > 100) {
    errors.push('Retirement age must be greater than current age and less than 100');
  }

  if (!inputs.expectedReturnRate || inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.2) {
    errors.push('Expected return rate must be between -10% and 20%');
  }

  if (inputs.monthlyContribution !== undefined && inputs.monthlyContribution < 0) {
    errors.push('Monthly contribution cannot be negative');
  }

  if (inputs.annualContribution !== undefined && inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (inputs.employerMatch !== undefined && (inputs.employerMatch < 0 || inputs.employerMatch > 1)) {
    errors.push('Employer match must be between 0% and 100%');
  }

  if (inputs.taxBracket !== undefined && (inputs.taxBracket < 0 || inputs.taxBracket > 0.5)) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (!inputs.yearsToRetirement || inputs.yearsToRetirement < 1 || inputs.yearsToRetirement > 50) {
    errors.push('Years to retirement must be between 1 and 50');
  }

  if (inputs.withdrawalRate !== undefined && (inputs.withdrawalRate < 0.02 || inputs.withdrawalRate > 0.1)) {
    errors.push('Withdrawal rate must be between 2% and 10%');
  }

  return errors;
}