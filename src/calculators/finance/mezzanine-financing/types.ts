export interface MezzanineFinancingInputs {
  // Project Information
  projectName: string;
  projectType: 'residential' | 'commercial' | 'industrial' | 'mixed_use' | 'land_development';
  projectSize: number;
  projectAddress: string;
  projectDescription: string;
  
  // Capital Structure
  totalProjectCost: number;
  seniorLoanAmount: number;
  mezzanineLoanAmount: number;
  equityContribution: number;
  otherFinancing: number;
  
  // Senior Loan Information
  seniorLoanRate: number;
  seniorLoanTerm: number;
  seniorLoanType: 'construction' | 'permanent' | 'bridge' | 'mini_perm';
  seniorLoanPaymentType: 'interest_only' | 'principal_interest' | 'balloon';
  
  // Mezzanine Loan Information
  mezzanineLoanRate: number;
  mezzanineLoanTerm: number;
  mezzanineLoanType: 'interest_only' | 'principal_interest' | 'balloon' | 'convertible';
  mezzanineLoanPaymentType: 'monthly' | 'quarterly' | 'annually' | 'accrued';
  
  // Mezzanine Features
  conversionOption: boolean;
  conversionPrice: number;
  conversionRatio: number;
  prepaymentPenalty: boolean;
  prepaymentPenaltyRate: number;
  prepaymentPenaltyPeriod: number;
  
  // Project Timeline
  constructionStartDate: string;
  constructionEndDate: string;
  stabilizationDate: string;
  exitDate: string;
  constructionDuration: number;
  stabilizationPeriod: number;
  holdPeriod: number;
  
  // Revenue Projections
  projectedRevenue: Array<{
    year: number;
    revenue: number;
    expenses: number;
    noi: number;
  }>;
  
  // Exit Strategy
  exitStrategy: 'sell' | 'refinance' | 'ipo' | 'merger';
  expectedExitValue: number;
  exitMultiple: number;
  exitCapRate: number;
  
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
    revenue: number;
    noi: number;
    capRate: number;
  }>;
  
  // Risk Factors
  constructionRisk: 'low' | 'medium' | 'high';
  marketRisk: 'low' | 'medium' | 'high';
  borrowerRisk: 'low' | 'medium' | 'high';
  mezzanineRisk: 'low' | 'medium' | 'high';
  
  // Covenants and Requirements
  debtServiceCoverageRatio: number;
  loanToValueRatio: number;
  loanToCostRatio: number;
  minimumEquity: number;
  
  // Fees and Costs
  originationFee: number;
  structuringFee: number;
  legalFees: number;
  appraisalFees: number;
  otherFees: number;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  propertyAppreciationRate: number;
  discountRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface MezzanineFinancingMetrics {
  // Capital Structure Analysis
  totalLeverage: number;
  mezzanineLeverage: number;
  equityPercentage: number;
  debtToEquityRatio: number;
  
  // Cost Analysis
  totalCostOfCapital: number;
  weightedAverageCostOfCapital: number;
  mezzanineCost: number;
  seniorCost: number;
  
  // Cash Flow Analysis
  mezzanineCashFlow: Array<{
    period: number;
    payment: number;
    interest: number;
    principal: number;
    balance: number;
  }>;
  totalCashFlow: Array<{
    period: number;
    revenue: number;
    expenses: number;
    noi: number;
    seniorPayment: number;
    mezzaninePayment: number;
    netCashFlow: number;
  }>;
  
  // Risk Metrics
  riskScore: number;
  probabilityOfDefault: number;
  lossGivenDefault: number;
  expectedLoss: number;
  
  // Return Analysis
  mezzanineReturn: number;
  equityReturn: number;
  totalReturn: number;
  irr: number;
  
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
    mezzanineReturn: number;
    equityReturn: number;
    totalReturn: number;
  }>;
  
  // Break-Even Analysis
  breakEvenPoint: number;
  breakEvenRevenue: number;
  breakEvenOccupancy: number;
  
  // Coverage Analysis
  debtServiceCoverage: number;
  interestCoverage: number;
  cashFlowCoverage: number;
}

export interface MezzanineFinancingAnalysis {
  // Executive Summary
  mezzanineRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Approve' | 'Conditional' | 'Reject' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Mezzanine Analysis
  mezzanineSummary: string;
  capitalStructureAnalysis: string;
  costAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  constructionRisk: string;
  marketRisk: string;
  borrowerRisk: string;
  mezzanineRisk: string;
  
  // Financial Analysis
  financialSummary: string;
  cashFlowAnalysis: string;
  returnAnalysis: string;
  
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

export interface MezzanineFinancingOutputs {
  // Core Metrics
  totalLeverage: number;
  mezzanineLeverage: number;
  equityPercentage: number;
  debtToEquityRatio: number;
  riskScore: number;
  mezzanineReturn: number;
  equityReturn: number;
  totalReturn: number;
  
  // Analysis
  analysis: MezzanineFinancingAnalysis;
  
  // Additional Metrics
  totalCostOfCapital: number;
  weightedAverageCostOfCapital: number;
  mezzanineCost: number;
  seniorCost: number;
  mezzanineCashFlow: any[];
  totalCashFlow: any[];
  probabilityOfDefault: number;
  lossGivenDefault: number;
  expectedLoss: number;
  irr: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  breakEvenPoint: number;
  breakEvenRevenue: number;
  breakEvenOccupancy: number;
  debtServiceCoverage: number;
  interestCoverage: number;
  cashFlowCoverage: number;
}
