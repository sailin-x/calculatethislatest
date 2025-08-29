export interface LoanToCostInputs {
  // Loan Information
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanType: 'construction' | 'bridge' | 'permanent' | 'mezzanine' | 'hard_money';
  paymentType: 'interest_only' | 'principal_interest' | 'balloon' | 'construction_draw';
  
  // Project Information
  projectType: 'residential' | 'commercial' | 'industrial' | 'mixed_use' | 'land_development';
  projectSize: number;
  projectAddress: string;
  projectDescription: string;
  
  // Cost Information
  landCost: number;
  constructionCost: number;
  softCosts: number;
  contingencyCost: number;
  totalProjectCost: number;
  
  // Construction Costs Breakdown
  siteWorkCost: number;
  foundationCost: number;
  structuralCost: number;
  exteriorCost: number;
  interiorCost: number;
  mechanicalCost: number;
  electricalCost: number;
  plumbingCost: number;
  finishCost: number;
  
  // Soft Costs Breakdown
  architecturalFees: number;
  engineeringFees: number;
  permitFees: number;
  legalFees: number;
  insuranceCost: number;
  appraisalFees: number;
  surveyFees: number;
  environmentalFees: number;
  otherSoftCosts: number;
  
  // Timeline Information
  constructionStartDate: string;
  constructionEndDate: string;
  constructionDuration: number;
  drawSchedule: Array<{
    draw: number;
    percentage: number;
    amount: number;
    date: string;
  }>;
  
  // Borrower Information
  borrowerEquity: number;
  borrowerExperience: 'none' | 'limited' | 'moderate' | 'extensive';
  borrowerCreditScore: number;
  borrowerNetWorth: number;
  borrowerLiquidity: number;
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  comparableProjects: Array<{
    project: string;
    cost: number;
    completionDate: string;
    performance: string;
  }>;
  
  // Exit Strategy
  exitStrategy: 'sell' | 'refinance' | 'hold' | 'lease';
  expectedExitValue: number;
  expectedExitDate: string;
  exitTimeline: number;
  
  // Risk Factors
  constructionRisk: 'low' | 'medium' | 'high';
  marketRisk: 'low' | 'medium' | 'high';
  borrowerRisk: 'low' | 'medium' | 'high';
  projectRisk: 'low' | 'medium' | 'high';
  
  // Guarantees and Collateral
  personalGuarantee: boolean;
  completionGuarantee: boolean;
  additionalCollateral: number;
  crossCollateralization: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  constructionInflationRate: number;
  discountRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface LoanToCostMetrics {
  // LTC Analysis
  loanToCostRatio: number;
  equityContribution: number;
  equityPercentage: number;
  leverageRatio: number;
  
  // Cost Analysis
  costBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  costPerSquareFoot: number;
  costVariance: number;
  
  // Loan Analysis
  loanAmount: number;
  loanPercentage: number;
  interestExpense: number;
  totalLoanCost: number;
  
  // Cash Flow Analysis
  constructionCashFlow: Array<{
    period: number;
    drawAmount: number;
    interestExpense: number;
    totalCost: number;
    cumulativeCost: number;
  }>;
  monthlyInterestExpense: number;
  totalInterestExpense: number;
  
  // Risk Metrics
  riskScore: number;
  probabilityOfCompletion: number;
  probabilityOfDefault: number;
  expectedLoss: number;
  
  // Profitability Analysis
  expectedProfit: number;
  profitMargin: number;
  returnOnEquity: number;
  returnOnCost: number;
  
  // Sensitivity Analysis
  sensitivityMatrix: Array<{
    variable: string;
    values: number[];
    impacts: number[];
  }>;
  
  // Scenario Analysis
  scenarios: Array<{
    scenario: string;
    probability: number;
    ltcRatio: number;
    profit: number;
  }>;
  
  // Benchmark Analysis
  industryBenchmarks: Array<{
    metric: string;
    industry: string;
    average: number;
    range: string;
  }>;
}

export interface LoanToCostAnalysis {
  // Executive Summary
  ltcRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Approve' | 'Conditional' | 'Reject' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // LTC Analysis
  ltcSummary: string;
  costAnalysis: string;
  loanAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  constructionRisk: string;
  marketRisk: string;
  borrowerRisk: string;
  projectRisk: string;
  
  // Financial Analysis
  financialSummary: string;
  cashFlowAnalysis: string;
  profitabilityAnalysis: string;
  
  // Market Assessment
  marketAssessment: string;
  comparableAnalysis: string;
  marketPosition: string;
  
  // Recommendations
  approvalRecommendations: string[];
  riskMitigation: string[];
  optimizationSuggestions: string[];
  
  // Implementation
  implementationPlan: string;
  nextSteps: string[];
  timeline: string;
  
  // Monitoring
  monitoringPlan: string;
  keyMetrics: string[];
  reviewSchedule: string;
  
  // Risk Management
  riskManagement: string;
  mitigationStrategies: string[];
  contingencyPlans: string[];
  
  // Performance Benchmarks
  performanceBenchmarks: Array<{
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }>;
  
  // Decision Support
  decisionRecommendation: string;
  presentationPoints: string[];
  decisionFactors: string[];
}

export interface LoanToCostOutputs {
  // Core Metrics
  loanToCostRatio: number;
  equityContribution: number;
  equityPercentage: number;
  leverageRatio: number;
  riskScore: number;
  expectedProfit: number;
  profitMargin: number;
  
  // Analysis
  analysis: LoanToCostAnalysis;
  
  // Additional Metrics
  costBreakdown: any[];
  costPerSquareFoot: number;
  costVariance: number;
  loanAmount: number;
  loanPercentage: number;
  interestExpense: number;
  totalLoanCost: number;
  constructionCashFlow: any[];
  monthlyInterestExpense: number;
  totalInterestExpense: number;
  probabilityOfCompletion: number;
  probabilityOfDefault: number;
  expectedLoss: number;
  returnOnEquity: number;
  returnOnCost: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  industryBenchmarks: any[];
}
