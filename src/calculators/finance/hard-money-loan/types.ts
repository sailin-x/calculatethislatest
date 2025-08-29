export interface HardMoneyLoanInputs {
  // Loan Information
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  points: number;
  originationFee: number;
  processingFee: number;
  appraisalFee: number;
  titleInsuranceFee: number;
  escrowFee: number;
  recordingFee: number;
  otherFees: number;
  
  // Property Information
  propertyValue: number;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'land' | 'mixed_use';
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_renovation';
  propertyAddress: string;
  propertySize: number;
  propertyAge: number;
  
  // Borrower Information
  borrowerCreditScore: number;
  borrowerIncome: number;
  borrowerDebtToIncomeRatio: number;
  borrowerLiquidity: number;
  borrowerExperience: 'none' | 'beginner' | 'intermediate' | 'experienced' | 'expert';
  
  // Project Information
  projectType: 'fix_and_flip' | 'buy_and_hold' | 'construction' | 'land_development' | 'refinance';
  projectTimeline: number;
  renovationBudget: number;
  expectedARV: number;
  exitStrategy: 'sale' | 'refinance' | 'rental' | 'mixed';
  
  // Market Information
  marketCondition: 'hot' | 'stable' | 'declining' | 'recovering';
  marketGrowthRate: number;
  comparableSales: Array<{
    address: string;
    salePrice: number;
    saleDate: string;
    condition: string;
    size: number;
  }>;
  
  // Risk Factors
  marketRisk: 'low' | 'medium' | 'high';
  propertyRisk: 'low' | 'medium' | 'high';
  borrowerRisk: 'low' | 'medium' | 'high';
  projectRisk: 'low' | 'medium' | 'high';
  
  // Legal and Regulatory
  zoningCompliance: boolean;
  environmentalIssues: boolean;
  titleIssues: boolean;
  permitIssues: boolean;
  legalRestrictions: string[];
  
  // Analysis Parameters
  analysisPeriod: number;
  discountRate: number;
  inflationRate: number;
  taxRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface HardMoneyLoanMetrics {
  // Loan Analysis
  totalLoanCost: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  totalFees: number;
  effectiveInterestRate: number;
  annualPercentageRate: number;
  
  // Cash Flow Analysis
  monthlyCashFlow: number;
  totalCashFlow: number;
  cashOnCashReturn: number;
  breakEvenPoint: number;
  
  // Property Analysis
  loanToValueRatio: number;
  loanToCostRatio: number;
  afterRepairValue: number;
  equityPosition: number;
  
  // Return Analysis
  totalReturn: number;
  annualizedReturn: number;
  internalRateOfReturn: number;
  netPresentValue: number;
  
  // Risk Metrics
  riskScore: number;
  probabilityOfDefault: number;
  lossGivenDefault: number;
  expectedLoss: number;
  
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
    value: number;
    return: number;
  }>;
  
  // Project Timeline
  projectTimeline: Array<{
    phase: string;
    duration: number;
    cost: number;
    revenue: number;
    cashFlow: number;
  }>;
}

export interface HardMoneyLoanAnalysis {
  // Executive Summary
  loanRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Approve' | 'Conditional' | 'Reject' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Loan Analysis
  loanSummary: string;
  costAnalysis: string;
  paymentAnalysis: string;
  
  // Cash Flow Analysis
  cashFlowSummary: string;
  returnAnalysis: string;
  breakEvenAnalysis: string;
  
  // Property Analysis
  propertyAnalysis: string;
  valueAnalysis: string;
  equityAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  borrowerRisk: string;
  propertyRisk: string;
  marketRisk: string;
  
  // Project Assessment
  projectAssessment: string;
  timelineAnalysis: string;
  exitStrategyAnalysis: string;
  
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

export interface HardMoneyLoanOutputs {
  // Core Metrics
  totalLoanCost: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  effectiveInterestRate: number;
  loanToValueRatio: number;
  cashOnCashReturn: number;
  internalRateOfReturn: number;
  riskScore: number;
  
  // Analysis
  analysis: HardMoneyLoanAnalysis;
  
  // Additional Metrics
  totalFees: number;
  annualPercentageRate: number;
  monthlyCashFlow: number;
  totalCashFlow: number;
  breakEvenPoint: number;
  loanToCostRatio: number;
  afterRepairValue: number;
  equityPosition: number;
  totalReturn: number;
  annualizedReturn: number;
  netPresentValue: number;
  probabilityOfDefault: number;
  lossGivenDefault: number;
  expectedLoss: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  projectTimeline: any[];
}
