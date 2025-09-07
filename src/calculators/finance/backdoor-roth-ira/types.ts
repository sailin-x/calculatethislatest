export interface BackdoorRothIRAInputs {
  // Personal Information
  currentAge: number;
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household';
  modifiedAGILimit: number; // Current year MAGI limit for Roth IRA contributions

  // Account Information
  traditionalIRABalance: number;
  rothIRABalance: number;
  annualContribution: number;
  conversionAmount: number;

  // Tax Information
  marginalTaxRate: number; // percentage
  capitalGainsTaxRate: number; // percentage
  stateTaxRate: number; // percentage

  // Investment Information
  expectedReturn: number; // percentage
  inflationRate: number; // percentage

  // Conversion Strategy
  conversionFrequency: 'annual' | 'semi_annual' | 'quarterly' | 'monthly';
  recharacterizationStrategy: boolean; // Whether to use recharacterization
  fiveYearRule: boolean; // Whether 5-year rule applies

  // Analysis Parameters
  analysisPeriod: number; // years
  includeStateTaxes: boolean;
  includeRequiredMinimumDistributions: boolean;

  // Cost Information
  conversionFees: number; // per conversion
  accountFees: number; // annual

  // Currency
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface BackdoorRothIRAMetrics {
  // Conversion Analysis
  totalConverted: number;
  totalTaxesPaid: number;
  netBenefit: number;
  taxEfficiency: number; // percentage

  // Growth Projections
  traditionalIRAFutureValue: number;
  rothIRAFutureValue: number;
  totalFutureValue: number;
  growthDifference: number;

  // Tax Savings
  federalTaxSavings: number;
  stateTaxSavings: number;
  totalTaxSavings: number;

  // Required Minimum Distributions
  rmdAmount: number;
  rmdTaxImpact: number;

  // Strategy Effectiveness
  breakevenPeriod: number; // years
  internalRateOfReturn: number; // percentage
  netPresentValue: number;

  // Risk Analysis
  marketRisk: number;
  taxRisk: number;
  strategyRisk: number;
}

export interface BackdoorRothIRAAnalysis {
  // Executive Summary
  strategyViability: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Not Recommended';
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Proceed' | 'Delay' | 'Alternative Strategy' | 'Not Advisable';

  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];

  // Conversion Analysis
  conversionSummary: string;
  taxImpactSummary: string;
  growthComparison: string;

  // Strategy Analysis
  strategyEffectiveness: string;
  timingConsiderations: string;
  alternativeOptions: string[];

  // Tax Efficiency
  taxEfficiencyAnalysis: string;
  deductionImpact: string;
  futureTaxImplications: string;

  // Risk Assessment
  riskAssessment: string;
  marketRiskAnalysis: string;
  taxRiskAnalysis: string;

  // Implementation
  implementationSteps: string[];
  timingStrategy: string;
  monitoringPlan: string;

  // Recommendations
  contributionRecommendations: string[];
  conversionRecommendations: string[];
  taxPlanningRecommendations: string[];

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

export interface BackdoorRothIRAOutputs {
  // Core Metrics
  totalConverted: number;
  totalTaxesPaid: number;
  netBenefit: number;
  breakevenPeriod: number;

  // Analysis
  analysis: BackdoorRothIRAAnalysis;

  // Additional Metrics
  traditionalIRAFutureValue: number;
  rothIRAFutureValue: number;
  totalTaxSavings: number;
  internalRateOfReturn: number;
}