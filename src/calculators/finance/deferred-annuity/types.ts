export interface DeferredAnnuityInputs {
  // Account Information
  initialInvestment: number;
  monthlyContribution: number;
  annualContribution: number;
  currentAccountValue: number;

  // Time Information
  currentAge: number;
  retirementAge: number;
  annuityStartAge: number;
  lifeExpectancy: number;

  // Investment Information
  expectedReturnRate: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentType: 'fixed' | 'variable' | 'indexed';

  // Annuity Information
  annuityType: 'fixed' | 'variable' | 'immediate' | 'deferred';
  payoutType: 'lifetime' | 'period_certain' | 'joint_survivor' | 'lump_sum';
  payoutFrequency: 'monthly' | 'quarterly' | 'annually';

  // Tax Information
  taxBracket: number;
  accountType: 'traditional' | 'roth' | 'non_qualified';
  stateTaxRate: number;

  // Fees and Expenses
  annualFees: number;
  expenseRatio: number;
  surrenderCharges: number;

  // Inflation and Assumptions
  inflationRate: number;
  annuityGrowthRate: number;

  // Analysis Parameters
  analysisPeriod: number;
  includeSocialSecurity: boolean;
  socialSecurityBenefit: number;

  // Currency
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface DeferredAnnuityMetrics {
  // Accumulation Phase
  totalContributions: number;
  investmentGrowth: number;
  projectedAccountValue: number;
  yearsToRetirement: number;

  // Distribution Phase
  monthlyAnnuityPayment: number;
  annualAnnuityPayment: number;
  totalAnnuityPayments: number;
  annuityDuration: number;

  // Tax Analysis
  taxDeferredGrowth: number;
  taxSavings: number;
  afterTaxIncome: number;

  // Risk Analysis
  conservativeProjection: number;
  optimisticProjection: number;
  probabilityOfSuccess: number;

  // Comparison Metrics
  vsTraditionalSavings: number;
  vsInvestments: number;
  breakEvenAnalysis: number;
}

export interface DeferredAnnuityAnalysis {
  // Executive Summary
  annuityRating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';
  recommendation: string;
  keyInsights: string[];

  // Accumulation Strategy
  contributionStrategy: string;
  investmentRecommendations: string[];
  riskManagement: string;

  // Distribution Planning
  payoutOptimization: string;
  taxStrategy: string;
  withdrawalStrategy: string;

  // Risk Assessment
  riskAssessment: string;
  volatilityAnalysis: string;
  contingencyPlans: string[];

  // Comparison Analysis
  vsOtherOptions: string;
  costBenefitAnalysis: string;
  alternativeRecommendations: string[];

  // Action Plan
  immediateActions: string[];
  longTermStrategy: string;
  monitoringPlan: string;

  // Educational Resources
  recommendedResources: string[];
  nextSteps: string[];
}

export interface DeferredAnnuityOutputs {
  // Core Results
  metrics: DeferredAnnuityMetrics;
  analysis: DeferredAnnuityAnalysis;

  // Summary
  projectedValue: number;
  monthlyIncome: number;
  totalTaxSavings: number;
  netBenefit: number;
}