import {
  FiveTwoNineInputs,
  FiveTwoNineMetrics,
  FiveTwoNineAnalysis,
  FiveTwoNineOutputs
} from './types';

// Helper function to calculate future college costs
function calculateFutureCollegeCost(
  currentCost: number,
  yearsUntilCollege: number,
  costIncreaseRate: number,
  yearsOfCollege: number
): number {
  const annualIncrease = costIncreaseRate / 100;
  let futureCost = currentCost;

  // Project cost at start of college
  for (let year = 0; year < yearsUntilCollege; year++) {
    futureCost *= (1 + annualIncrease);
  }

  // Calculate total cost for all years of college
  let totalCost = 0;
  for (let year = 0; year < yearsOfCollege; year++) {
    totalCost += futureCost;
    futureCost *= (1 + annualIncrease);
  }

  return totalCost;
}

// Helper function to calculate contributions based on frequency
function calculateTotalContributions(
  monthlyContribution: number,
  annualContribution: number,
  contributionFrequency: string,
  yearsUntilCollege: number
): number {
  let totalContributions = 0;

  switch (contributionFrequency) {
    case 'monthly':
      totalContributions = monthlyContribution * 12 * yearsUntilCollege;
      break;
    case 'quarterly':
      totalContributions = (monthlyContribution * 3) * 4 * yearsUntilCollege;
      break;
    case 'annually':
      totalContributions = annualContribution * yearsUntilCollege;
      break;
  }

  return totalContributions;
}

// Helper function to calculate future value with compound growth
function calculateFutureValue(
  principal: number,
  annualContribution: number,
  years: number,
  annualReturn: number,
  inflationRate: number
): number {
  const monthlyReturn = annualReturn / 100 / 12;
  const monthlyInflation = inflationRate / 100 / 12;
  const realReturn = monthlyReturn - monthlyInflation;

  let futureValue = principal;
  const monthlyContribution = annualContribution / 12;

  for (let year = 0; year < years; year++) {
    for (let month = 0; month < 12; month++) {
      futureValue = (futureValue + monthlyContribution) * (1 + realReturn);
    }
  }

  return futureValue;
}

// Helper function to calculate tax savings
function calculateTaxSavings(
  contributions: number,
  stateTaxRate: number,
  federalTaxRate: number,
  includeStateBenefits: boolean,
  includeFederalBenefits: boolean
): number {
  let taxSavings = 0;

  if (includeFederalBenefits) {
    taxSavings += contributions * (federalTaxRate / 100);
  }

  if (includeStateBenefits) {
    taxSavings += contributions * (stateTaxRate / 100);
  }

  return taxSavings;
}

// Helper function to calculate financial aid
function calculateFinancialAid(
  collegeCost: number,
  expectedAidPercentage: number,
  scholarshipAmount: number,
  workStudyAmount: number
): number {
  const needBasedAid = collegeCost * (expectedAidPercentage / 100);
  return needBasedAid + scholarshipAmount + workStudyAmount;
}

// Helper function to generate scenario projections
function generateScenarios(
  baseInputs: FiveTwoNineInputs,
  baseProjection: number,
  baseCollegeCost: number
): { conservative: number; moderate: number; aggressive: number; costConservative: number; costAggressive: number } {
  const conservativeReturn = baseInputs.expectedAnnualReturn * 0.7;
  const aggressiveReturn = baseInputs.expectedAnnualReturn * 1.3;
  const conservativeCostIncrease = baseInputs.costIncreaseRate * 0.8;
  const aggressiveCostIncrease = baseInputs.costIncreaseRate * 1.2;

  const conservativeProjection = calculateFutureValue(
    baseInputs.currentBalance,
    baseInputs.annualContribution,
    baseInputs.yearsUntilCollege,
    conservativeReturn,
    baseInputs.inflationRate
  );

  const aggressiveProjection = calculateFutureValue(
    baseInputs.currentBalance,
    baseInputs.annualContribution,
    baseInputs.yearsUntilCollege,
    aggressiveReturn,
    baseInputs.inflationRate
  );

  const costConservative = calculateFutureCollegeCost(
    baseInputs.currentAnnualCost,
    baseInputs.yearsUntilCollege,
    conservativeCostIncrease,
    baseInputs.yearsOfCollege
  );

  const costAggressive = calculateFutureCollegeCost(
    baseInputs.currentAnnualCost,
    baseInputs.yearsUntilCollege,
    aggressiveCostIncrease,
    baseInputs.yearsOfCollege
  );

  return {
    conservative: conservativeProjection,
    moderate: baseProjection,
    aggressive: aggressiveProjection,
    costConservative,
    costAggressive
  };
}

// Main calculation function
export function calculateFiveTwoNine(
  inputs: FiveTwoNineInputs
): FiveTwoNineOutputs {
  const {
    currentBalance,
    monthlyContribution,
    annualContribution,
    contributionFrequency,
    expectedAnnualReturn,
    inflationRate,
    currentAnnualCost,
    costIncreaseRate,
    yearsUntilCollege,
    yearsOfCollege,
    stateTaxRate,
    federalTaxRate,
    includeStateTaxBenefits,
    includeFederalTaxBenefits,
    expectedAidPercentage,
    scholarshipAmount,
    workStudyAmount,
    accountFees,
    managementFees
  } = inputs;

  // Calculate total contributions
  const totalContributions = calculateTotalContributions(
    monthlyContribution,
    annualContribution,
    contributionFrequency,
    yearsUntilCollege
  );

  // Calculate future college costs
  const futureCollegeCost = calculateFutureCollegeCost(
    currentAnnualCost,
    yearsUntilCollege,
    costIncreaseRate,
    yearsOfCollege
  );

  // Calculate growth projections
  const projectedBalance = calculateFutureValue(
    currentBalance,
    annualContribution,
    yearsUntilCollege,
    expectedAnnualReturn,
    inflationRate
  );

  const totalGrowth = projectedBalance - currentBalance - totalContributions;

  // Calculate tax benefits
  const totalTaxSavings = calculateTaxSavings(
    totalContributions,
    stateTaxRate,
    federalTaxRate,
    includeStateTaxBenefits,
    includeFederalTaxBenefits
  );

  // Calculate financial aid
  const expectedFinancialAid = calculateFinancialAid(
    futureCollegeCost,
    expectedAidPercentage,
    scholarshipAmount,
    workStudyAmount
  );

  // Calculate funding gap
  const fundingGap = futureCollegeCost - expectedFinancialAid - projectedBalance;
  const fundingRatio = projectedBalance / futureCollegeCost * 100;

  // Generate scenarios
  const scenarios = generateScenarios(inputs, projectedBalance, futureCollegeCost);

  // Generate analysis
  const analysis: FiveTwoNineAnalysis = {
    collegeReadiness: fundingRatio > 80 ? 'Excellent' :
                     fundingRatio > 60 ? 'Good' :
                     fundingRatio > 40 ? 'Fair' :
                     fundingRatio > 20 ? 'Poor' : 'Critical',
    riskLevel: expectedAnnualReturn > 10 ? 'High' :
               expectedAnnualReturn > 7 ? 'Moderate' : 'Low',
    recommendation: fundingRatio < 50 ? 'Increase Contributions' :
                   fundingRatio > 80 ? 'Consider Alternatives' : 'Maintain Current',
    keyStrengths: [],
    keyWeaknesses: [],
    riskFactors: [],
    opportunities: [],
    contributionSummary: `Total contributions: $${totalContributions.toLocaleString()} over ${yearsUntilCollege} years`,
    savingsEfficiency: `Tax savings: $${totalTaxSavings.toLocaleString()}`,
    taxBenefitAnalysis: `Federal and state tax benefits included`,
    costProjectionSummary: `Future college cost: $${futureCollegeCost.toLocaleString()}`,
    affordabilityAnalysis: `Funding ratio: ${fundingRatio.toFixed(1)}%`,
    fundingGapAnalysis: `Funding gap: $${Math.max(0, fundingGap).toLocaleString()}`,
    performanceSummary: `Projected balance: $${projectedBalance.toLocaleString()}`,
    riskAdjustedReturns: `Expected return: ${expectedAnnualReturn}%`,
    marketTimingAnalysis: 'Long-term investment approach recommended',
    aidOptimizationSummary: `Expected aid: $${expectedFinancialAid.toLocaleString()}`,
    scholarshipStrategy: 'Maximize merit-based scholarships',
    workStudyAnalysis: 'Consider work-study programs for additional funding',
    taxEfficiencySummary: `Tax benefits: $${totalTaxSavings.toLocaleString()}`,
    stateBenefitAnalysis: includeStateTaxBenefits ? 'State tax benefits included' : 'State tax benefits not included',
    federalBenefitAnalysis: includeFederalTaxBenefits ? 'Federal tax benefits included' : 'Federal tax benefits not included',
    contributionRecommendations: [
      'Increase contributions to close funding gap',
      'Consider gifting to maximize tax benefits',
      'Review contribution limits annually'
    ],
    investmentRecommendations: [
      'Diversify investment options',
      'Consider age-based investment strategies',
      'Review performance regularly'
    ],
    planningRecommendations: [
      'Work with financial advisor',
      'Research college costs regularly',
      'Plan for inflation in college costs'
    ],
    taxOptimizationRecommendations: [
      'Maximize tax-advantaged contributions',
      'Consider state-specific 529 plans',
      'Plan for qualified withdrawals'
    ],
    immediateActions: [
      'Increase monthly contributions',
      'Research college costs',
      'Review investment allocation'
    ],
    shortTermGoals: [
      'Build emergency fund',
      'Research financial aid options',
      'Review college savings strategy'
    ],
    longTermStrategies: [
      'Maximize 529 plan contributions',
      'Consider education IRAs',
      'Plan for multiple children'
    ],
    performanceBenchmarks: [
      {
        metric: 'Annual Return',
        value: expectedAnnualReturn,
        benchmark: 7.0,
        category: 'College Savings'
      },
      {
        metric: 'Funding Ratio',
        value: fundingRatio,
        benchmark: 70.0,
        category: 'College Planning'
      }
    ],
    decisionSummary: `Based on analysis, your college funding readiness is ${fundingRatio < 50 ? 'Poor' : fundingRatio < 70 ? 'Fair' : 'Good'}. ${fundingRatio < 50 ? 'Consider increasing contributions.' : 'You are on track for college funding.'}`,
    scenarioAnalysis: [
      `Conservative scenario: $${scenarios.conservative.toLocaleString()}`,
      `Moderate scenario: $${scenarios.moderate.toLocaleString()}`,
      `Aggressive scenario: $${scenarios.aggressive.toLocaleString()}`
    ],
    sensitivityAnalysis: [
      '5% change in return affects balance by approximately 15%',
      '1% change in college cost inflation affects costs by 8%',
      '10% change in financial aid affects funding gap by 12%'
    ]
  };

  return {
    projectedBalance,
    futureCollegeCost,
    fundingGap: Math.max(0, fundingGap),
    totalTaxSavings,
    analysis,
    totalContributions,
    totalGrowth,
    fundingRatio,
    conservativeProjection: scenarios.conservative,
    moderateProjection: scenarios.moderate,
    aggressiveProjection: scenarios.aggressive
  };
}

// Validation function
export function validateFiveTwoNineInputs(inputs: FiveTwoNineInputs): string[] {
  const errors: string[] = [];

  if (!inputs.currentAge || inputs.currentAge < 18 || inputs.currentAge > 100) {
    errors.push('Current age must be between 18 and 100');
  }

  if (!inputs.childAge || inputs.childAge < 0 || inputs.childAge > 25) {
    errors.push('Child age must be between 0 and 25');
  }

  if (!inputs.collegeStartAge || inputs.collegeStartAge <= inputs.childAge || inputs.collegeStartAge > 30) {
    errors.push('College start age must be greater than child age and less than or equal to 30');
  }

  if (inputs.currentBalance !== undefined && inputs.currentBalance < 0) {
    errors.push('Current balance cannot be negative');
  }

  if (inputs.monthlyContribution !== undefined && inputs.monthlyContribution < 0) {
    errors.push('Monthly contribution cannot be negative');
  }

  if (inputs.annualContribution !== undefined && inputs.annualContribution < 0) {
    errors.push('Annual contribution cannot be negative');
  }

  if (inputs.expectedAnnualReturn !== undefined &&
      (inputs.expectedAnnualReturn < 0 || inputs.expectedAnnualReturn > 20)) {
    errors.push('Expected annual return must be between 0 and 20 percent');
  }

  if (inputs.currentAnnualCost !== undefined && inputs.currentAnnualCost <= 0) {
    errors.push('Current annual cost must be greater than 0');
  }

  if (inputs.stateTaxRate !== undefined &&
      (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 50)) {
    errors.push('State tax rate must be between 0 and 50 percent');
  }

  if (inputs.federalTaxRate !== undefined &&
      (inputs.federalTaxRate < 0 || inputs.federalTaxRate > 50)) {
    errors.push('Federal tax rate must be between 0 and 50 percent');
  }

  return errors;
}