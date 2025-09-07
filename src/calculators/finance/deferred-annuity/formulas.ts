import {
  DeferredAnnuityInputs,
  DeferredAnnuityOutputs,
  DeferredAnnuityMetrics,
  DeferredAnnuityAnalysis
} from './types';

// Helper function to calculate compound growth
function calculateCompoundGrowth(principal: number, rate: number, time: number): number {
  return principal * Math.pow(1 + rate, time);
}

// Helper function to calculate future value of annuity
function calculateFutureValueAnnuity(payment: number, rate: number, periods: number): number {
  if (rate === 0) return payment * periods;
  return payment * ((Math.pow(1 + rate, periods) - 1) / rate);
}

// Helper function to calculate annuity payout
function calculateAnnuityPayout(accountValue: number, interestRate: number, lifeExpectancy: number, payoutType: string): number {
  const monthlyRate = interestRate / 12;

  switch (payoutType) {
    case 'lifetime':
      // Simplified lifetime annuity calculation
      return accountValue * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -lifeExpectancy * 12)));

    case 'period_certain':
      // 10-year certain period
      return accountValue / (10 * 12);

    case 'joint_survivor':
      // Simplified joint survivor calculation
      return accountValue * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -lifeExpectancy * 12))) * 0.9;

    case 'lump_sum':
      return accountValue;

    default:
      return accountValue / (lifeExpectancy * 12);
  }
}

// Helper function to calculate tax implications
function calculateTaxImplications(growth: number, taxBracket: number, accountType: string): {
  taxDeferred: number;
  taxSavings: number;
  afterTaxAmount: number;
} {
  let taxDeferred = 0;
  let taxSavings = 0;
  let afterTaxAmount = growth;

  switch (accountType) {
    case 'traditional':
      taxDeferred = growth;
      taxSavings = growth * taxBracket;
      afterTaxAmount = growth * (1 - taxBracket);
      break;

    case 'roth':
      taxDeferred = growth;
      taxSavings = growth * taxBracket; // Tax-free growth
      afterTaxAmount = growth;
      break;

    case 'non_qualified':
      taxDeferred = 0;
      taxSavings = 0;
      afterTaxAmount = growth;
      break;
  }

  return { taxDeferred, taxSavings, afterTaxAmount };
}

// Helper function to assess annuity suitability
function assessAnnuitySuitability(contributionAmount: number, riskTolerance: string, timeHorizon: number): string {
  if (contributionAmount > 10000 && timeHorizon > 20 && riskTolerance === 'conservative') {
    return 'Excellent';
  }
  if (contributionAmount > 5000 && timeHorizon > 15) {
    return 'Good';
  }
  if (contributionAmount > 2000 && timeHorizon > 10) {
    return 'Fair';
  }
  if (contributionAmount < 2000 || timeHorizon < 10) {
    return 'Poor';
  }
  return 'Very Poor';
}

// Main calculation function
export function calculateDeferredAnnuity(inputs: DeferredAnnuityInputs): DeferredAnnuityOutputs {
  const {
    initialInvestment,
    monthlyContribution,
    annualContribution,
    currentAccountValue,
    currentAge,
    retirementAge,
    annuityStartAge,
    lifeExpectancy,
    expectedReturnRate,
    annuityType,
    payoutType,
    taxBracket,
    accountType,
    annualFees,
    expenseRatio,
    inflationRate,
    analysisPeriod
  } = inputs;

  // Calculate accumulation phase
  const yearsToRetirement = retirementAge - currentAge;
  const yearsToAnnuity = annuityStartAge - currentAge;
  const accumulationYears = Math.max(0, yearsToRetirement);

  // Calculate total contributions
  const totalMonthlyContributions = monthlyContribution * 12 * accumulationYears;
  const totalAnnualContributions = annualContribution * accumulationYears;
  const totalContributions = initialInvestment + currentAccountValue + totalMonthlyContributions + totalAnnualContributions;

  // Calculate investment growth (net of fees)
  const netReturnRate = expectedReturnRate - expenseRatio - (annualFees / (initialInvestment + currentAccountValue + totalContributions));

  const initialGrowth = calculateCompoundGrowth(initialInvestment, netReturnRate, accumulationYears);
  const currentGrowth = calculateCompoundGrowth(currentAccountValue, netReturnRate, accumulationYears);

  const monthlyFutureValue = calculateFutureValueAnnuity(
    monthlyContribution,
    netReturnRate / 12,
    accumulationYears * 12
  );

  const annualFutureValue = calculateFutureValueAnnuity(
    annualContribution,
    netReturnRate,
    accumulationYears
  );

  const projectedAccountValue = initialGrowth + currentGrowth + monthlyFutureValue + annualFutureValue;
  const investmentGrowth = projectedAccountValue - totalContributions;

  // Calculate annuity payments
  const annuityAccountValue = calculateCompoundGrowth(
    projectedAccountValue,
    netReturnRate,
    Math.max(0, annuityStartAge - retirementAge)
  );

  const monthlyAnnuityPayment = calculateAnnuityPayout(
    annuityAccountValue,
    expectedReturnRate,
    lifeExpectancy - annuityStartAge,
    payoutType
  );

  const annualAnnuityPayment = monthlyAnnuityPayment * 12;
  const annuityDuration = lifeExpectancy - annuityStartAge;

  // Calculate tax implications
  const taxAnalysis = calculateTaxImplications(investmentGrowth, taxBracket, accountType);

  // Calculate risk projections
  const conservativeReturn = netReturnRate * 0.8;
  const optimisticReturn = netReturnRate * 1.2;

  const conservativeProjection = calculateCompoundGrowth(
    totalContributions,
    conservativeReturn,
    accumulationYears
  );

  const optimisticProjection = calculateCompoundGrowth(
    totalContributions,
    optimisticReturn,
    accumulationYears
  );

  // Calculate probability of success (simplified)
  const requiredIncome = 30000; // Assumed annual income need
  const probabilityOfSuccess = Math.min(100, Math.max(0, (annualAnnuityPayment / requiredIncome) * 100));

  // Create metrics object
  const metrics: DeferredAnnuityMetrics = {
    totalContributions,
    investmentGrowth,
    projectedAccountValue,
    yearsToRetirement: accumulationYears,
    monthlyAnnuityPayment,
    annualAnnuityPayment,
    totalAnnuityPayments: annualAnnuityPayment * annuityDuration,
    annuityDuration,
    taxDeferredGrowth: taxAnalysis.taxDeferred,
    taxSavings: taxAnalysis.taxSavings,
    afterTaxIncome: taxAnalysis.afterTaxAmount,
    conservativeProjection,
    optimisticProjection,
    probabilityOfSuccess,
    vsTraditionalSavings: projectedAccountValue * 0.8, // Simplified comparison
    vsInvestments: projectedAccountValue * 1.1, // Simplified comparison
    breakEvenAnalysis: totalContributions / annualAnnuityPayment
  };

  // Assess annuity suitability
  const annuityRating = assessAnnuitySuitability(
    monthlyContribution + annualContribution / 12,
    inputs.riskTolerance,
    accumulationYears
  );

  // Create analysis object
  const analysis: DeferredAnnuityAnalysis = {
    annuityRating: annuityRating as any,
    recommendation: probabilityOfSuccess > 80
      ? 'Deferred annuity appears suitable for your retirement planning'
      : 'Consider alternative retirement strategies or increased contributions',
    keyInsights: [
      `Projected account value: $${Math.round(projectedAccountValue).toLocaleString()}`,
      `Monthly annuity payment: $${Math.round(monthlyAnnuityPayment).toLocaleString()}`,
      `Tax savings: $${Math.round(taxAnalysis.taxSavings).toLocaleString()}`,
      `Break-even period: ${Math.round(metrics.breakEvenAnalysis)} years`
    ],

    contributionStrategy: monthlyContribution > 0
      ? 'Continue systematic monthly contributions'
      : 'Establish regular contribution schedule for optimal growth',

    investmentRecommendations: [
      'Diversify across fixed and variable annuity options',
      'Consider inflation-adjusted annuities for long-term protection',
      'Review annuity fees and expense ratios annually',
      'Monitor interest rate environment for optimal timing'
    ],

    riskManagement: inputs.riskTolerance === 'conservative'
      ? 'Focus on guaranteed minimum withdrawal benefits'
      : 'Balance growth potential with longevity risk protection',

    payoutOptimization: payoutType === 'lifetime'
      ? 'Lifetime payments provide maximum longevity protection'
      : 'Period certain options offer flexibility but less protection',

    taxStrategy: accountType === 'traditional'
      ? 'Tax-deferred growth maximizes retirement income'
      : 'Roth options provide tax-free withdrawals',

    withdrawalStrategy: `Systematic withdrawals over ${annuityDuration} years`,

    riskAssessment: probabilityOfSuccess > 80
      ? 'Low risk of outliving retirement savings'
      : probabilityOfSuccess > 60
      ? 'Moderate risk - consider additional savings'
      : 'High risk - significant adjustments needed',

    volatilityAnalysis: inputs.investmentType === 'variable'
      ? 'Variable annuities offer growth potential but with market risk'
      : 'Fixed annuities provide stability but limited upside',

    contingencyPlans: [
      'Maintain emergency fund outside annuity',
      'Consider long-term care insurance',
      'Plan for potential market downturns',
      'Review beneficiary designations'
    ],

    vsOtherOptions: `Annuity vs Traditional Savings: ${Math.round((projectedAccountValue / metrics.vsTraditionalSavings - 1) * 100)}% advantage`,

    costBenefitAnalysis: `Net benefit: $${Math.round(metrics.afterTaxIncome - totalContributions).toLocaleString()}`,

    alternativeRecommendations: [
      'Consider 401(k) or IRA options for additional retirement savings',
      'Evaluate Social Security optimization strategies',
      'Review pension or defined benefit plan options',
      'Consider part-time work or delayed retirement'
    ],

    immediateActions: [
      'Review current annuity contract terms and fees',
      'Assess contribution amounts and frequency',
      'Evaluate payout options and timing',
      'Consult financial advisor for personalized advice'
    ],

    longTermStrategy: `Accumulate for ${accumulationYears} years, then annuitize for ${annuityDuration} years of income`,

    monitoringPlan: 'Review annuity performance and market conditions annually',

    recommendedResources: [
      'FINRA Annuity Consumer Guide',
      'IRS Publication 939 (Annuities)',
      'State insurance department annuity guides',
      'Certified financial planner consultation'
    ],

    nextSteps: [
      'Compare annuity quotes from multiple providers',
      'Review surrender charges and fees',
      'Evaluate guaranteed benefits and riders',
      'Create comprehensive retirement income plan'
    ]
  };

  return {
    metrics,
    analysis,
    projectedValue: projectedAccountValue,
    monthlyIncome: monthlyAnnuityPayment,
    totalTaxSavings: taxAnalysis.taxSavings,
    netBenefit: taxAnalysis.afterTaxAmount - totalContributions
  };
}

// Validation function
export function validateDeferredAnnuityInputs(inputs: DeferredAnnuityInputs): string[] {
  const errors: string[] = [];

  if (!inputs.initialInvestment || inputs.initialInvestment < 0) {
    errors.push('Initial investment must be 0 or greater');
  }

  if (inputs.monthlyContribution !== undefined && inputs.monthlyContribution < 0) {
    errors.push('Monthly contribution cannot be negative');
  }

  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 80) {
    errors.push('Current age must be between 18 and 80');
  }

  if (!inputs.retirementAge || inputs.retirementAge <= inputs.currentAge || inputs.retirementAge > 100) {
    errors.push('Retirement age must be greater than current age and less than 100');
  }

  if (!inputs.annuityStartAge || inputs.annuityStartAge < inputs.retirementAge || inputs.annuityStartAge > 100) {
    errors.push('Annuity start age must be at or after retirement age');
  }

  if (!inputs.expectedReturnRate || inputs.expectedReturnRate < -0.1 || inputs.expectedReturnRate > 0.2) {
    errors.push('Expected return rate must be between -10% and 20%');
  }

  if (!inputs.lifeExpectancy || inputs.lifeExpectancy <= inputs.annuityStartAge || inputs.lifeExpectancy > 120) {
    errors.push('Life expectancy must be greater than annuity start age');
  }

  if (inputs.taxBracket !== undefined && (inputs.taxBracket < 0 || inputs.taxBracket > 0.5)) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (!inputs.analysisPeriod || inputs.analysisPeriod < 1 || inputs.analysisPeriod > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  return errors;
}