export interface DefinedContributionPlanInputs {
  // Personal Information
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  gender: 'male' | 'female';

  // Account Information
  currentAccountBalance: number;
  monthlyContribution: number;
  annualContribution: number;
  employerMatch: number;
  employerMatchLimit: number;

  // Investment Information
  expectedReturnRate: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentType: 'target_date' | 'balanced' | 'aggressive_growth' | 'conservative';

  // Plan Information
  planType: '401k' | '403b' | '457' | 'traditional_ira' | 'roth_ira' | 'sep_ira' | 'simple_ira';
  contributionLimit: number;
  catchUpContribution: number;
  vestingSchedule: 'immediate' | 'graded' | 'cliff';

  // Tax Information
  taxBracket: number;
  stateTaxRate: number;
  accountType: 'traditional' | 'roth' | 'non_deductible';

  // Time Information
  yearsToRetirement: number;
  analysisPeriod: number;

  // Fees and Expenses
  annualFees: number;
  expenseRatio: number;
  transactionFees: number;

  // Inflation and Assumptions
  inflationRate: number;
  salaryIncreaseRate: number;

  // Social Security
  includeSocialSecurity: boolean;
  socialSecurityBenefit: number;
  socialSecurityStartAge: number;

  // Withdrawal Strategy
  withdrawalRate: number;
  withdrawalStartAge: number;
  requiredMinimumDistribution: boolean;

  // Currency
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface DefinedContributionPlanMetrics {
  // Account Growth
  projectedBalance: number;
  totalContributions: number;
  totalEmployerContributions: number;
  totalInvestmentGrowth: number;

  // Retirement Income
  monthlyRetirementIncome: number;
  annualRetirementIncome: number;
  replacementRatio: number;

  // Risk Analysis
  volatilityRisk: number;
  longevityRisk: number;
  inflationRisk: number;

  // Tax Analysis
  taxSavings: number;
  afterTaxValue: number;
  effectiveTaxRate: number;

  // Fee Impact
  totalFees: number;
  feeImpact: number;

  // Benchmarking
  vsTarget: number;
  successProbability: number;
}

export interface DefinedContributionPlanAnalysis {
  // Executive Summary
  planRating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';
  recommendation: string;
  keyInsights: string[];

  // Growth Analysis
  contributionAnalysis: string;
  investmentAnalysis: string;
  growthProjection: string;

  // Retirement Readiness
  retirementReadiness: string;
  incomeSufficiency: string;
  riskAssessment: string;

  // Tax Optimization
  taxStrategy: string;
  accountTypeRecommendation: string;

  // Fee Analysis
  feeImpact: string;
  costOptimization: string;

  // Withdrawal Strategy
  withdrawalPlan: string;
  rmdStrategy: string;

  // Comparison Analysis
  vsDefinedBenefit: string;
  vsOtherStrategies: string;

  // Action Plan
  immediateActions: string[];
  longTermStrategy: string;
  monitoringPlan: string;

  // Educational Resources
  recommendedResources: string[];
  nextSteps: string[];
}

export interface DefinedContributionPlanOutputs {
  // Core Results
  metrics: DefinedContributionPlanMetrics;
  analysis: DefinedContributionPlanAnalysis;

  // Summary
  projectedRetirementBalance: number;
  monthlyRetirementIncome: number;
  annualRetirementIncome: number;
  totalValue: number;
}