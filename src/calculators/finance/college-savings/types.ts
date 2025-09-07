export interface CollegeSavingsInputs {
  // Child Information
  childAge: number;
  childName: string;
  yearsUntilCollege: number;

  // Savings Information
  currentSavings: number;
  monthlyContribution: number;
  annualContribution: number;
  oneTimeContributions: number;

  // Investment Information
  expectedReturnRate: number;
  inflationRate: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';

  // College Cost Information
  expectedCollegeCost: number;
  yearsInCollege: number;
  costIncreaseRate: number;

  // Tax Information
  taxBracket: number;
  stateTaxRate: number;
  use529Plan: boolean;
  useCoverdellESA: boolean;

  // Financial Aid Information
  expectedFinancialAid: number;
  expectedScholarships: number;

  // Analysis Parameters
  analysisPeriod: number;
  includeStateTaxBenefits: boolean;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface CollegeSavingsMetrics {
  // Savings Projections
  totalSavingsAtCollege: number;
  monthlySavingsNeeded: number;
  annualSavingsNeeded: number;
  totalContributions: number;
  totalInvestmentGrowth: number;

  // Cost Projections
  projectedCollegeCost: number;
  inflationAdjustedCost: number;
  netCostAfterAid: number;

  // Gap Analysis
  savingsGap: number;
  fundingShortfall: number;
  additionalMonthlyNeeded: number;

  // Tax Benefits
  taxSavings: number;
  stateTaxBenefits: number;
  totalTaxAdvantages: number;

  // Risk Analysis
  conservativeProjection: number;
  optimisticProjection: number;
  probabilityOfSuccess: number;

  // Timeline
  savingsMilestones: Array<{
    year: number;
    cumulativeSavings: number;
    targetAmount: number;
  }>;
}

export interface CollegeSavingsAnalysis {
  // Executive Summary
  savingsReadiness: 'Excellent' | 'Good' | 'Fair' | 'Concerning' | 'Critical';
  recommendation: string;
  keyInsights: string[];

  // Savings Strategy
  optimalContributionStrategy: string;
  investmentRecommendations: string[];
  taxOptimization: string;

  // Risk Assessment
  riskAssessment: string;
  contingencyPlans: string[];
  sensitivityAnalysis: string;

  // Action Plan
  immediateActions: string[];
  longTermStrategy: string;
  monitoringPlan: string;

  // Educational Resources
  recommendedResources: string[];
  nextSteps: string[];
}

export interface CollegeSavingsOutputs {
  // Core Results
  metrics: CollegeSavingsMetrics;
  analysis: CollegeSavingsAnalysis;

  // Summary
  totalProjectedSavings: number;
  projectedShortfall: number;
  recommendedMonthlyContribution: number;
  yearsToGoal: number;
}