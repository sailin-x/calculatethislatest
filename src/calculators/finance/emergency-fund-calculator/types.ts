export interface EmergencyFundCalculatorInputs {
  // Personal Information
  monthlyIncome: number;
  monthlyExpenses: number;
  dependents: number;
  employmentType: 'salaried' | 'self_employed' | 'contractor' | 'unemployed' | 'retired';

  // Financial Information
  currentSavings: number;
  currentEmergencyFund: number;
  monthlyDebtPayments: number;
  creditScore: number;

  // Risk Factors
  jobStability: 'very_stable' | 'stable' | 'moderate' | 'unstable' | 'very_unstable';
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  locationRisk: 'low' | 'moderate' | 'high' | 'very_high';
  industryRisk: 'low' | 'moderate' | 'high' | 'very_high';

  // Lifestyle Factors
  housingType: 'owned' | 'rented' | 'mortgaged' | 'family_home';
  transportationType: 'owned' | 'leased' | 'public' | 'multiple_vehicles';
  insuranceCoverage: 'comprehensive' | 'basic' | 'minimal' | 'none';

  // Emergency Scenarios
  includeJobLoss: boolean;
  includeMedicalEmergency: boolean;
  includeHomeRepair: boolean;
  includeCarRepair: boolean;
  includeFamilyEmergency: boolean;

  // Time Factors
  timeToFindNewJob: number; // months
  desiredCoveragePeriod: number; // months
  inflationRate: number;

  // Investment Factors
  emergencyFundInvestmentType: 'savings_account' | 'money_market' | 'cd' | 'high_yield_savings';
  expectedReturnRate: number;
  liquidityNeeds: 'immediate' | 'short_term' | 'flexible';

  // Geographic Factors
  costOfLivingIndex: number;
  stateOfResidence: string;
  localUnemploymentRate: number;

  // Analysis Parameters
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  analysisPeriod: number; // months
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface EmergencyFundMetrics {
  // Basic Calculations
  recommendedEmergencyFund: number;
  currentEmergencyFundRatio: number;
  shortfallAmount: number;
  monthlySavingsNeeded: number;

  // Coverage Analysis
  coverageMonths: number;
  coverageScore: number; // 0-100
  riskAdjustedCoverage: number;

  // Expense Breakdown
  essentialExpenses: number;
  discretionaryExpenses: number;
  debtServiceRatio: number;

  // Income Analysis
  incomeStabilityScore: number;
  replacementIncomeRatio: number;
  unemploymentBenefitAmount: number;

  // Risk Assessment
  overallRiskScore: number;
  jobLossRisk: number;
  healthRisk: number;
  financialRisk: number;

  // Investment Analysis
  emergencyFundGrowth: number;
  opportunityCost: number;
  liquidityScore: number;

  // Scenario Analysis
  bestCaseCoverage: number;
  worstCaseCoverage: number;
  averageCaseCoverage: number;

  // Benchmarking
  industryAverage: number;
  locationAverage: number;
  incomeLevelAverage: number;
}

export interface EmergencyFundAnalysis {
  // Executive Summary
  emergencyFundRating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  recommendation: string;
  priorityLevel: 'High' | 'Medium' | 'Low';

  // Coverage Assessment
  coverageAssessment: string;
  riskAssessment: string;
  adequacyAssessment: string;

  // Financial Health
  savingsRate: string;
  debtLoad: string;
  incomeStability: string;

  // Risk Factors
  jobLossImpact: string;
  healthImpact: string;
  locationImpact: string;

  // Recommendations
  immediateActions: string[];
  savingsStrategy: string;
  investmentStrategy: string;

  // Long-term Planning
  longTermGoals: string;
  wealthBuilding: string;
  retirementPlanning: string;

  // Emergency Scenarios
  scenarioAnalysis: Array<{
    scenario: string;
    probability: number;
    impact: number;
    coverage: number;
  }>;

  // Benchmark Comparison
  benchmarkComparison: string;
  peerComparison: string;
  industryComparison: string;

  // Action Plan
  actionPlan: string[];
  timeline: string;
  monitoringPlan: string;

  // Educational Resources
  recommendedResources: string[];
  nextSteps: string[];
}

export interface EmergencyFundCalculatorOutputs {
  // Core Results
  metrics: EmergencyFundMetrics;
  analysis: EmergencyFundAnalysis;

  // Summary
  recommendedAmount: number;
  currentAmount: number;
  monthlySavingsTarget: number;
  timeToGoal: number; // months

  // Risk Assessment
  overallRiskLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  coverageStatus: 'Over-funded' | 'Adequately Funded' | 'Under-funded' | 'Severely Under-funded';
}