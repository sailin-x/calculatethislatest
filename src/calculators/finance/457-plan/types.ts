export interface FourFiveSevenInputs {
  // Personal Information
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;

  // Current Account Information
  currentBalance: number;
  yearsOfService: number;

  // Contribution Information
  annualSalary: number;
  employeeContributionPercent: number; // percentage
  employerContributionPercent: number; // percentage
  catchUpContributions: boolean; // for age 50+

  // Investment Information
  expectedAnnualReturn: number; // percentage
  inflationRate: number; // percentage

  // Tax Information
  currentTaxRate: number; // percentage
  retirementTaxRate: number; // percentage

  // Plan Rules
  contributionLimit: number; // annual limit
  lifetimeLimit: number; // lifetime limit
  vestingSchedule: 'immediate' | 'graded' | 'cliff';

  // Analysis Parameters
  analysisPeriod: number; // years
  includeSocialSecurity: boolean;
  socialSecurityBenefit: number; // monthly at retirement
  otherRetirementIncome: number; // annual

  // Withdrawal Strategy
  withdrawalStrategy: 'fixed_amount' | 'percentage' | 'required_minimum';
  annualWithdrawalAmount: number;
  withdrawalPercentage: number; // percentage

  // Cost Information
  annualFees: number; // percentage
  administrativeFees: number;

  // Currency and Display
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface FourFiveSevenMetrics {
  // Contribution Analysis
  totalEmployeeContributions: number;
  totalEmployerContributions: number;
  totalContributions: number;
  averageAnnualContribution: number;

  // Growth Projections
  projectedBalance: number;
  totalGrowth: number;
  compoundAnnualGrowthRate: number;

  // Tax Benefits
  totalTaxSavings: number;
  taxDeferredGrowth: number;
  effectiveTaxRate: number;

  // Retirement Income
  monthlyRetirementIncome: number;
  annualRetirementIncome: number;
  replacementRatio: number; // percentage of pre-retirement income

  // Withdrawal Analysis
  safeWithdrawalRate: number; // percentage
  withdrawalPeriod: number; // years
  totalWithdrawals: number;

  // Risk Metrics
  volatilityRisk: number;
  longevityRisk: number;
  inflationRisk: number;

  // Scenario Analysis
  conservativeProjection: number;
  moderateProjection: number;
  aggressiveProjection: number;

  // Benchmarking
  planPerformance: number; // percentage vs. benchmarks
  contributionEfficiency: number;
}

export interface FourFiveSevenAnalysis {
  // Executive Summary
  retirementReadiness: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Increase Contributions' | 'Maintain Current' | 'Consider Alternatives' | 'Urgent Action Needed';

  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];

  // Contribution Analysis
  contributionSummary: string;
  employerMatchAnalysis: string;
  catchUpAnalysis: string;

  // Investment Performance
  performanceSummary: string;
  riskAdjustedReturns: string;
  diversificationAnalysis: string;

  // Tax Efficiency
  taxEfficiencySummary: string;
  taxSavingsAnalysis: string;
  retirementTaxAnalysis: string;

  // Retirement Security
  retirementSecuritySummary: string;
  incomeReplacementAnalysis: string;
  longevityRiskAnalysis: string;

  // Recommendations
  contributionRecommendations: string[];
  investmentRecommendations: string[];
  riskManagementRecommendations: string[];
  planningRecommendations: string[];

  // Action Items
  immediateActions: string[];
  shortTermGoals: string[];
  longTermStrategies: string[];

  // Performance Benchmarks
  performanceBenchmarks: Array<{
    metric: string;
    value: number;
    benchmark: number;
    industry: string;
  }>;

  // Decision Support
  decisionSummary: string;
  scenarioAnalysis: string[];
  sensitivityAnalysis: string[];
}

export interface FourFiveSevenOutputs {
  // Core Metrics
  projectedBalance: number;
  monthlyRetirementIncome: number;
  totalContributions: number;
  totalTaxSavings: number;

  // Analysis
  analysis: FourFiveSevenAnalysis;

  // Additional Metrics
  annualContributions: number;
  totalGrowth: number;
  safeWithdrawalRate: number;
  replacementRatio: number;
  conservativeProjection: number;
  moderateProjection: number;
  aggressiveProjection: number;
}