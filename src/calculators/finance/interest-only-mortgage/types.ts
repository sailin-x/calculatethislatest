export interface InterestOnlyMortgageInputs {
  // Loan Information
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  interestOnlyPeriod: number;
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';
  
  // Property Information
  propertyValue: number;
  propertyType: 'single_family' | 'condo' | 'townhouse' | 'multi_family' | 'commercial';
  propertyAddress: string;
  
  // Borrower Information
  borrowerIncome: number;
  borrowerCreditScore: number;
  borrowerDebtToIncomeRatio: number;
  
  // Additional Costs
  propertyTaxes: number;
  homeownersInsurance: number;
  privateMortgageInsurance: number;
  hoaFees: number;
  
  // Balloon Payment
  balloonPayment: number;
  balloonPaymentDate: string;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  propertyAppreciationRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface InterestOnlyMortgageMetrics {
  // Payment Analysis
  interestOnlyPayment: number;
  principalAndInterestPayment: number;
  totalMonthlyPayment: number;
  balloonPaymentAmount: number;
  
  // Interest Analysis
  totalInterestPaid: number;
  interestPaidDuringIO: number;
  interestPaidAfterIO: number;
  effectiveInterestRate: number;
  
  // Principal Analysis
  principalBalance: number;
  principalPaid: number;
  remainingBalance: number;
  
  // Cost Analysis
  totalCost: number;
  costOfCredit: number;
  totalPayments: number;
  
  // Risk Metrics
  riskScore: number;
  paymentShock: number;
  refinanceRisk: number;
  
  // Comparison Metrics
  traditionalPayment: number;
  savingsDuringIO: number;
  additionalCostAfterIO: number;
  
  // Amortization Schedule
  amortizationSchedule: Array<{
    paymentNumber: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
    period: 'interest_only' | 'principal_interest';
  }>;
  
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
    totalCost: number;
  }>;
}

export interface InterestOnlyMortgageAnalysis {
  // Executive Summary
  loanRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Proceed' | 'Consider' | 'Avoid' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Payment Analysis
  paymentSummary: string;
  interestAnalysis: string;
  principalAnalysis: string;
  
  // Cost Analysis
  costSummary: string;
  comparisonAnalysis: string;
  savingsAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  paymentShockRisk: string;
  refinanceRisk: string;
  marketRisk: string;
  
  // Balloon Payment Analysis
  balloonAnalysis: string;
  refinanceAnalysis: string;
  exitStrategy: string;
  
  // Recommendations
  loanRecommendations: string[];
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

export interface InterestOnlyMortgageOutputs {
  // Core Metrics
  interestOnlyPayment: number;
  principalAndInterestPayment: number;
  totalMonthlyPayment: number;
  balloonPaymentAmount: number;
  totalInterestPaid: number;
  riskScore: number;
  paymentShock: number;
  traditionalPayment: number;
  
  // Analysis
  analysis: InterestOnlyMortgageAnalysis;
  
  // Additional Metrics
  effectiveInterestRate: number;
  principalBalance: number;
  principalPaid: number;
  remainingBalance: number;
  totalCost: number;
  costOfCredit: number;
  totalPayments: number;
  interestPaidDuringIO: number;
  interestPaidAfterIO: number;
  savingsDuringIO: number;
  additionalCostAfterIO: number;
  refinanceRisk: number;
  amortizationSchedule: any[];
  sensitivityMatrix: any[];
  scenarios: any[];
}
