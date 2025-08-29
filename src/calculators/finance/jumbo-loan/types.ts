export interface JumboLoanInputs {
  // Loan Information
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanType: 'fixed_rate' | 'adjustable_rate' | 'interest_only' | 'balloon';
  paymentType: 'principal_interest' | 'interest_only' | 'balloon';
  
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'condo' | 'townhouse' | 'multi_family' | 'luxury';
  propertySize: number;
  propertyAge: number;
  
  // Borrower Information
  borrowerIncome: number;
  borrowerCreditScore: number;
  borrowerDebtToIncomeRatio: number;
  borrowerEmploymentType: 'employed' | 'self_employed' | 'retired' | 'business_owner';
  borrowerEmploymentLength: number;
  borrowerAssets: number;
  borrowerLiquidity: number;
  
  // Down Payment Information
  downPayment: number;
  downPaymentPercentage: number;
  downPaymentSource: 'savings' | 'investment_sale' | 'gift' | 'inheritance' | 'other';
  
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
  
  // Jumbo Loan Specific
  jumboLimit: number;
  jumboThreshold: number;
  jumboPremium: number;
  jumboRequirements: Array<{
    requirement: string;
    met: boolean;
    details: string;
  }>;
  
  // Market Information
  marketLocation: string;
  marketCondition: 'hot' | 'stable' | 'declining' | 'recovering';
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
  loanRisk: 'low' | 'medium' | 'high';
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  propertyAppreciationRate: number;
  taxRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface JumboLoanMetrics {
  // Payment Analysis
  monthlyPayment: number;
  totalPayments: number;
  totalInterestPaid: number;
  effectiveInterestRate: number;
  
  // Cost Analysis
  totalFees: number;
  totalCost: number;
  costOfCredit: number;
  
  // Loan Analysis
  loanToValueRatio: number;
  paymentToIncomeRatio: number;
  debtToIncomeRatio: number;
  
  // Cash Flow Analysis
  monthlyCashFlow: number;
  annualCashFlow: number;
  breakEvenPoint: number;
  
  // Risk Metrics
  riskScore: number;
  probabilityOfDefault: number;
  lossGivenDefault: number;
  expectedLoss: number;
  
  // Jumbo Specific Metrics
  jumboPremium: number;
  jumboCost: number;
  conventionalComparison: number;
  
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
    payment: number;
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

export interface JumboLoanAnalysis {
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
  paymentAnalysis: string;
  costAnalysis: string;
  
  // Jumbo Analysis
  jumboSummary: string;
  jumboPremiumAnalysis: string;
  conventionalComparison: string;
  
  // Risk Assessment
  riskAssessment: string;
  borrowerRisk: string;
  propertyRisk: string;
  marketRisk: string;
  
  // Financial Analysis
  financialSummary: string;
  cashFlowAnalysis: string;
  affordabilityAnalysis: string;
  
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

export interface JumboLoanOutputs {
  // Core Metrics
  monthlyPayment: number;
  totalInterestPaid: number;
  effectiveInterestRate: number;
  totalFees: number;
  loanToValueRatio: number;
  riskScore: number;
  jumboPremium: number;
  
  // Analysis
  analysis: JumboLoanAnalysis;
  
  // Additional Metrics
  totalPayments: number;
  totalCost: number;
  costOfCredit: number;
  paymentToIncomeRatio: number;
  debtToIncomeRatio: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  breakEvenPoint: number;
  probabilityOfDefault: number;
  lossGivenDefault: number;
  expectedLoss: number;
  jumboCost: number;
  conventionalComparison: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  paymentSchedule: any[];
}
