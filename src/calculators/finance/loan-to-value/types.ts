export interface LoanToValueInputs {
  // Loan Information
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'hard_money' | 'private';
  paymentType: 'principal_interest' | 'interest_only' | 'balloon' | 'arm';
  
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial' | 'land' | 'mixed_use';
  propertySize: number;
  propertyAge: number;
  propertyCondition: 'excellent' | 'good' | 'average' | 'poor' | 'needs_repair';
  
  // Valuation Information
  appraisalValue: number;
  marketValue: number;
  assessedValue: number;
  purchasePrice: number;
  comparableSales: Array<{
    address: string;
    salePrice: number;
    saleDate: string;
    condition: string;
    adjustments: number;
  }>;
  
  // Down Payment Information
  downPayment: number;
  downPaymentPercentage: number;
  downPaymentSource: 'savings' | 'investment_sale' | 'gift' | 'inheritance' | 'other';
  
  // Borrower Information
  borrowerIncome: number;
  borrowerCreditScore: number;
  borrowerDebtToIncomeRatio: number;
  borrowerEmploymentType: 'employed' | 'self_employed' | 'retired' | 'business_owner';
  borrowerAssets: number;
  borrowerLiquidity: number;
  
  // Insurance and Taxes
  propertyInsurance: number;
  propertyTaxes: number;
  hoaFees: number;
  floodInsurance: number;
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  daysOnMarket: number;
  
  // Risk Factors
  marketRisk: 'low' | 'medium' | 'high';
  propertyRisk: 'low' | 'medium' | 'high';
  borrowerRisk: 'low' | 'medium' | 'high';
  loanRisk: 'low' | 'medium' | 'high';
  
  // Loan Program Requirements
  maxLtvRatio: number;
  minDownPayment: number;
  pmiRequired: boolean;
  pmiRate: number;
  pmiThreshold: number;
  
  // Additional Collateral
  additionalCollateral: number;
  crossCollateralization: boolean;
  personalGuarantee: boolean;
  
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

export interface LoanToValueMetrics {
  // LTV Analysis
  loanToValueRatio: number;
  combinedLtvRatio: number;
  effectiveLtvRatio: number;
  equityPosition: number;
  equityPercentage: number;
  
  // Loan Analysis
  loanAmount: number;
  loanPercentage: number;
  monthlyPayment: number;
  totalPayments: number;
  totalInterestPaid: number;
  
  // Cost Analysis
  totalCost: number;
  costOfCredit: number;
  effectiveInterestRate: number;
  
  // Risk Metrics
  riskScore: number;
  probabilityOfDefault: number;
  lossGivenDefault: number;
  expectedLoss: number;
  
  // Insurance Analysis
  pmiRequired: boolean;
  pmiCost: number;
  pmiDuration: number;
  totalInsuranceCost: number;
  
  // Cash Flow Analysis
  monthlyCashFlow: number;
  annualCashFlow: number;
  breakEvenPoint: number;
  
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
    ltvRatio: number;
    risk: string;
  }>;
  
  // Valuation Analysis
  valuationBreakdown: Array<{
    method: string;
    value: number;
    weight: number;
  }>;
  
  // Market Analysis
  marketPosition: string;
  comparableAnalysis: Array<{
    metric: string;
    subject: number;
    comparable: number;
    difference: number;
  }>;
}

export interface LoanToValueAnalysis {
  // Executive Summary
  ltvRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Approve' | 'Conditional' | 'Reject' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // LTV Analysis
  ltvSummary: string;
  equityAnalysis: string;
  loanAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  marketRisk: string;
  propertyRisk: string;
  borrowerRisk: string;
  loanRisk: string;
  
  // Financial Analysis
  financialSummary: string;
  cashFlowAnalysis: string;
  costAnalysis: string;
  
  // Valuation Assessment
  valuationAssessment: string;
  marketAnalysis: string;
  comparableAnalysis: string;
  
  // Insurance Analysis
  insuranceAnalysis: string;
  pmiAnalysis: string;
  costAnalysis: string;
  
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

export interface LoanToValueOutputs {
  // Core Metrics
  loanToValueRatio: number;
  combinedLtvRatio: number;
  effectiveLtvRatio: number;
  equityPosition: number;
  equityPercentage: number;
  riskScore: number;
  pmiRequired: boolean;
  pmiCost: number;
  
  // Analysis
  analysis: LoanToValueAnalysis;
  
  // Additional Metrics
  loanAmount: number;
  loanPercentage: number;
  monthlyPayment: number;
  totalPayments: number;
  totalInterestPaid: number;
  totalCost: number;
  costOfCredit: number;
  effectiveInterestRate: number;
  probabilityOfDefault: number;
  lossGivenDefault: number;
  expectedLoss: number;
  pmiDuration: number;
  totalInsuranceCost: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  breakEvenPoint: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  valuationBreakdown: any[];
  marketPosition: string;
  comparableAnalysis: any[];
}
