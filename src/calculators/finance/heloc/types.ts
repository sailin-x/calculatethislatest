export interface HELOCInputs {
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'condo' | 'townhouse' | 'multi_family' | 'commercial';
  propertyAge: number;
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor';
  
  // Current Mortgage Information
  currentMortgageBalance: number;
  currentMortgageRate: number;
  currentMortgagePayment: number;
  mortgageType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  
  // HELOC Information
  helocAmount: number;
  helocRate: number;
  helocRateType: 'variable' | 'fixed' | 'introductory';
  drawPeriod: number;
  repaymentPeriod: number;
  minimumPayment: number;
  minimumPaymentType: 'interest_only' | 'principal_interest' | 'percentage';
  
  // Borrower Information
  borrowerCreditScore: number;
  borrowerIncome: number;
  borrowerDebtToIncomeRatio: number;
  borrowerEmploymentType: 'employed' | 'self_employed' | 'retired' | 'unemployed';
  borrowerEmploymentLength: number;
  
  // Fees and Costs
  originationFee: number;
  appraisalFee: number;
  titleInsuranceFee: number;
  recordingFee: number;
  annualFee: number;
  inactivityFee: number;
  earlyClosureFee: number;
  otherFees: number;
  
  // Usage Information
  intendedUse: 'home_improvement' | 'debt_consolidation' | 'education' | 'emergency_fund' | 'investment' | 'other';
  drawAmount: number;
  drawFrequency: 'monthly' | 'quarterly' | 'annually' | 'as_needed';
  repaymentStrategy: 'interest_only' | 'principal_interest' | 'balloon' | 'custom';
  
  // Market Information
  marketCondition: 'appreciating' | 'stable' | 'declining';
  marketGrowthRate: number;
  comparableSales: Array<{
    address: string;
    salePrice: number;
    saleDate: string;
    condition: string;
  }>;
  
  // Risk Factors
  marketRisk: 'low' | 'medium' | 'high';
  propertyRisk: 'low' | 'medium' | 'high';
  borrowerRisk: 'low' | 'medium' | 'high';
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  taxRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface HELOCMetrics {
  // Equity Analysis
  totalEquity: number;
  availableEquity: number;
  combinedLTV: number;
  helocLTV: number;
  
  // Payment Analysis
  monthlyPayment: number;
  totalPayments: number;
  totalInterestPaid: number;
  effectiveInterestRate: number;
  
  // Cost Analysis
  totalFees: number;
  totalCost: number;
  costOfCredit: number;
  
  // Cash Flow Analysis
  monthlyCashFlow: number;
  totalCashFlow: number;
  breakEvenPoint: number;
  
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
    cost: number;
  }>;
  
  // Payment Schedule
  paymentSchedule: Array<{
    period: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export interface HELOCAnalysis {
  // Executive Summary
  helocRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Approve' | 'Conditional' | 'Reject' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // HELOC Analysis
  helocSummary: string;
  equityAnalysis: string;
  paymentAnalysis: string;
  
  // Cost Analysis
  costSummary: string;
  feeAnalysis: string;
  comparisonAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  borrowerRisk: string;
  propertyRisk: string;
  marketRisk: string;
  
  // Usage Assessment
  usageAssessment: string;
  drawAnalysis: string;
  repaymentAnalysis: string;
  
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

export interface HELOCOutputs {
  // Core Metrics
  totalEquity: number;
  availableEquity: number;
  combinedLTV: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  effectiveInterestRate: number;
  totalFees: number;
  riskScore: number;
  
  // Analysis
  analysis: HELOCAnalysis;
  
  // Additional Metrics
  helocLTV: number;
  totalPayments: number;
  totalCost: number;
  costOfCredit: number;
  monthlyCashFlow: number;
  totalCashFlow: number;
  breakEvenPoint: number;
  probabilityOfDefault: number;
  lossGivenDefault: number;
  expectedLoss: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  paymentSchedule: any[];
}
