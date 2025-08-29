export interface HomeEquityLoanInputs {
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
  
  // Home Equity Loan Information
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  paymentType: 'fixed' | 'variable' | 'interest_only' | 'balloon';
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';
  
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
  attorneyFee: number;
  creditReportFee: number;
  floodCertificationFee: number;
  taxServiceFee: number;
  otherFees: number;
  
  // Loan Purpose
  loanPurpose: 'home_improvement' | 'debt_consolidation' | 'education' | 'medical' | 'business' | 'investment' | 'other';
  purposeDescription: string;
  
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

export interface HomeEquityLoanMetrics {
  // Equity Analysis
  totalEquity: number;
  availableEquity: number;
  combinedLTV: number;
  homeEquityLTV: number;
  
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

export interface HomeEquityLoanAnalysis {
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
  
  // Purpose Assessment
  purposeAssessment: string;
  benefitAnalysis: string;
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

export interface HomeEquityLoanOutputs {
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
  analysis: HomeEquityLoanAnalysis;
  
  // Additional Metrics
  homeEquityLTV: number;
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
