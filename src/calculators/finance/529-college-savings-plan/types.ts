export interface FiveTwoNineInputs {
  // Personal Information
  currentAge: number;
  childAge: number;
  collegeStartAge: number;
  yearsUntilCollege: number;

  // Account Information
  currentBalance: number;
  monthlyContribution: number;
  annualContribution: number;
  contributionFrequency: 'monthly' | 'quarterly' | 'annually';

  // Investment Information
  expectedAnnualReturn: number; // percentage
  inflationRate: number; // percentage
  investmentStrategy: 'conservative' | 'moderate' | 'aggressive';

  // College Cost Information
  currentAnnualCost: number;
  costIncreaseRate: number; // percentage
  yearsOfCollege: number;
  collegeType: 'public_in_state' | 'public_out_state' | 'private';

  // Tax Information
  stateTaxRate: number; // percentage
  federalTaxRate: number; // percentage
  taxAdvantaged: boolean;

  // Financial Aid Information
  expectedAidPercentage: number; // percentage
  scholarshipAmount: number;
  workStudyAmount: number;

  // Analysis Parameters
  analysisPeriod: number; // years
  includeStateTaxBenefits: boolean;
  includeFederalTaxBenefits: boolean;

  // Cost Information
  accountFees: number; // annual
  managementFees: number; // percentage

  // Currency and Display
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface FiveTwoNineMetrics {
  // Contribution Analysis
  totalContributions: number;
  totalTaxSavings: number;
  netContributions: number;
  averageAnnualContribution: number;

  // Growth Projections
  projectedBalance: number;
  totalGrowth: number;
  compoundAnnualGrowthRate: number;

  // College Cost Analysis
  futureCollegeCost: number;
  totalCollegeCosts: number;
  fundingGap: number;
  fundingRatio: number; // percentage

  // Tax Benefits
  stateTaxSavings: number;
  federalTaxSavings: number;
  totalTaxBenefits: number;

  // Financial Aid Analysis
  expectedFinancialAid: number;
  netCollegeCost: number;
  outOfPocketCost: number;

  // Scenario Analysis
  conservativeProjection: number;
  moderateProjection: number;
  aggressiveProjection: number;

  // Risk Metrics
  inflationRisk: number;
  marketRisk: number;
  fundingRisk: number;

  // Performance Benchmarks
  planPerformance: number; // percentage vs. benchmarks
  costEfficiency: number;
}

export interface FiveTwoNineAnalysis {
  // Executive Summary
  collegeReadiness: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Increase Contributions' | 'Maintain Current' | 'Consider Alternatives' | 'Urgent Action Needed';

  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];

  // Contribution Analysis
  contributionSummary: string;
  savingsEfficiency: string;
  taxBenefitAnalysis: string;

  // College Cost Analysis
  costProjectionSummary: string;
  affordabilityAnalysis: string;
  fundingGapAnalysis: string;

  // Investment Performance
  performanceSummary: string;
  riskAdjustedReturns: string;
  marketTimingAnalysis: string;

  // Financial Aid Analysis
  aidOptimizationSummary: string;
  scholarshipStrategy: string;
  workStudyAnalysis: string;

  // Tax Efficiency
  taxEfficiencySummary: string;
  stateBenefitAnalysis: string;
  federalBenefitAnalysis: string;

  // Recommendations
  contributionRecommendations: string[];
  investmentRecommendations: string[];
  planningRecommendations: string[];
  taxOptimizationRecommendations: string[];

  // Action Items
  immediateActions: string[];
  shortTermGoals: string[];
  longTermStrategies: string[];

  // Performance Benchmarks
  performanceBenchmarks: Array<{
    metric: string;
    value: number;
    benchmark: number;
    category: string;
  }>;

  // Decision Support
  decisionSummary: string;
  scenarioAnalysis: string[];
  sensitivityAnalysis: string[];
}

export interface FiveTwoNineOutputs {
  // Core Metrics
  projectedBalance: number;
  futureCollegeCost: number;
  fundingGap: number;
  totalTaxSavings: number;

  // Analysis
  analysis: FiveTwoNineAnalysis;

  // Additional Metrics
  totalContributions: number;
  totalGrowth: number;
  fundingRatio: number;
  conservativeProjection: number;
  moderateProjection: number;
  aggressiveProjection: number;
}