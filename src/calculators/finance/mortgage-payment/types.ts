export interface MortgagePaymentInputs {
  // Loan Information
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'hard_money' | 'private';
  paymentType: 'principal_interest' | 'interest_only' | 'balloon' | 'arm';
  
  // ARM Information (if applicable)
  armType: '3_1' | '5_1' | '7_1' | '10_1' | 'custom';
  initialFixedPeriod: number;
  adjustmentPeriod: number;
  margin: number;
  indexRate: number;
  lifetimeCap: number;
  periodicCap: number;
  floorRate: number;
  
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial';
  propertySize: number;
  propertyAge: number;
  
  // Down Payment Information
  downPayment: number;
  downPaymentPercentage: number;
  downPaymentSource: 'savings' | 'investment_sale' | 'gift' | 'inheritance' | 'other';
  
  // Insurance and Taxes
  propertyInsurance: number;
  propertyTaxes: number;
  hoaFees: number;
  floodInsurance: number;
  mortgageInsurance: number;
  mortgageInsuranceRate: number;
  
  // Payment Information
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly' | 'quarterly' | 'annually';
  firstPaymentDate: string;
  paymentDay: number;
  
  // Points and Credits
  discountPoints: number;
  originationPoints: number;
  lenderCredits: number;
  sellerCredits: number;
  
  // Borrower Information
  borrowerIncome: number;
  borrowerCreditScore: number;
  borrowerDebtToIncomeRatio: number;
  borrowerEmploymentType: 'employed' | 'self_employed' | 'retired' | 'business_owner';
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  
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

export interface MortgagePaymentMetrics {
  // Payment Analysis
  monthlyPayment: number;
  principalPayment: number;
  interestPayment: number;
  totalPayment: number;
  
  // Cost Analysis
  totalPayments: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  effectiveInterestRate: number;
  
  // Amortization Analysis
  amortizationSchedule: Array<{
    paymentNumber: number;
    paymentDate: string;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
    equity: number;
  }>;
  
  // ARM Analysis (if applicable)
  armSchedule: Array<{
    period: number;
    startDate: string;
    endDate: string;
    rate: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
  
  // Break-Even Analysis
  breakEvenPoint: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  
  // Equity Analysis
  equityPosition: number;
  equityPercentage: number;
  loanToValueRatio: number;
  
  // Cash Flow Analysis
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  
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
    totalInterest: number;
  }>;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    metric: string;
    current: number;
    alternative: number;
    difference: number;
  }>;
  
  // Risk Metrics
  riskScore: number;
  probabilityOfDefault: number;
  paymentShockRisk: number;
  interestRateRisk: number;
}

export interface MortgagePaymentAnalysis {
  // Executive Summary
  paymentRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  affordabilityRating: 'Very Affordable' | 'Affordable' | 'Moderate' | 'Expensive' | 'Very Expensive';
  recommendation: 'Proceed' | 'Consider' | 'Reconsider' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Payment Analysis
  paymentSummary: string;
  affordabilityAnalysis: string;
  cashFlowAnalysis: string;
  
  // Cost Analysis
  costSummary: string;
  interestAnalysis: string;
  totalCostAnalysis: string;
  
  // ARM Analysis (if applicable)
  armSummary: string;
  rateRiskAnalysis: string;
  paymentShockAnalysis: string;
  
  // Equity Analysis
  equitySummary: string;
  equityGrowthAnalysis: string;
  ltvAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  paymentRisk: string;
  interestRateRisk: string;
  marketRisk: string;
  
  // Market Analysis
  marketAnalysis: string;
  competitiveAnalysis: string;
  marketPosition: string;
  
  // Recommendations
  paymentRecommendations: string[];
  optimizationSuggestions: string[];
  riskMitigation: string[];
  
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

export interface MortgagePaymentOutputs {
  // Core Metrics
  monthlyPayment: number;
  principalPayment: number;
  interestPayment: number;
  totalPayment: number;
  totalPayments: number;
  totalInterestPaid: number;
  effectiveInterestRate: number;
  breakEvenMonths: number;
  
  // Analysis
  analysis: MortgagePaymentAnalysis;
  
  // Additional Metrics
  totalPrincipalPaid: number;
  amortizationSchedule: any[];
  armSchedule: any[];
  breakEvenPoint: number;
  breakEvenYears: number;
  equityPosition: number;
  equityPercentage: number;
  loanToValueRatio: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  comparisonAnalysis: any[];
  riskScore: number;
  probabilityOfDefault: number;
  paymentShockRisk: number;
  interestRateRisk: number;
}
