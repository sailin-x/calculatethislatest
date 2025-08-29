export interface MortgageRefinanceInputs {
  // Current Loan Information
  currentLoanAmount: number;
  currentInterestRate: number;
  currentLoanTerm: number;
  currentLoanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'hard_money' | 'private';
  currentPaymentType: 'principal_interest' | 'interest_only' | 'balloon' | 'arm';
  currentMonthlyPayment: number;
  currentRemainingTerm: number;
  currentPrincipalBalance: number;
  
  // New Loan Information
  newLoanAmount: number;
  newInterestRate: number;
  newLoanTerm: number;
  newLoanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'hard_money' | 'private';
  newPaymentType: 'principal_interest' | 'interest_only' | 'balloon' | 'arm';
  refinanceType: 'rate_term' | 'cash_out' | 'cash_in' | 'streamline' | 'fha_to_conventional';
  
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial';
  propertySize: number;
  propertyAge: number;
  
  // Refinance Costs
  closingCosts: number;
  originationFee: number;
  appraisalFee: number;
  titleInsuranceFee: number;
  recordingFee: number;
  attorneyFee: number;
  creditReportFee: number;
  floodCertificationFee: number;
  taxServiceFee: number;
  otherFees: number;
  
  // Borrower Information
  borrowerIncome: number;
  borrowerCreditScore: number;
  borrowerDebtToIncomeRatio: number;
  borrowerEmploymentType: 'employed' | 'self_employed' | 'retired' | 'business_owner';
  borrowerTaxRate: number;
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  propertyAppreciationRate: number;
  discountRate: number;
  taxDeductionPeriod: number;
  
  // Refinance Goals
  refinanceGoal: 'lower_payment' | 'lower_rate' | 'cash_out' | 'shorter_term' | 'remove_pmi' | 'consolidate_debt';
  targetMonthlySavings: number;
  targetRate: number;
  cashOutAmount: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface MortgageRefinanceMetrics {
  // Payment Analysis
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlyPaymentDifference: number;
  monthlyPaymentSavings: number;
  annualPaymentSavings: number;
  
  // Interest Analysis
  currentTotalInterest: number;
  newTotalInterest: number;
  interestSavings: number;
  interestSavingsPercentage: number;
  
  // Cost Analysis
  totalRefinanceCost: number;
  breakEvenPoint: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  netSavings: number;
  
  // Cash Flow Analysis
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  cashFlowImprovement: number;
  
  // Equity Analysis
  currentEquity: number;
  newEquity: number;
  equityChange: number;
  loanToValueRatio: number;
  
  // Tax Analysis
  taxDeduction: number;
  afterTaxSavings: number;
  effectiveTaxRate: number;
  taxBenefit: number;
  
  // ROI Analysis
  returnOnInvestment: number;
  paybackPeriod: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  
  // Amortization Comparison
  amortizationComparison: Array<{
    paymentNumber: number;
    date: string;
    currentPayment: number;
    newPayment: number;
    savings: number;
    cumulativeSavings: number;
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
    rate: number;
    payment: number;
    savings: number;
  }>;
  
  // Risk Analysis
  riskScore: number;
  probabilityOfBenefit: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    option: string;
    rate: number;
    payment: number;
    totalCost: number;
    savings: number;
    breakEven: number;
  }>;
}

export interface MortgageRefinanceAnalysis {
  // Executive Summary
  refinanceRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  valueRating: 'High Value' | 'Good Value' | 'Moderate Value' | 'Low Value' | 'No Value';
  recommendation: 'Proceed' | 'Consider' | 'Don\'t Refinance' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  valueFactors: string[];
  opportunities: string[];
  
  // Refinance Analysis
  refinanceSummary: string;
  paymentAnalysis: string;
  costAnalysis: string;
  
  // Break-Even Analysis
  breakEvenSummary: string;
  timelineAnalysis: string;
  riskAnalysis: string;
  
  // Cash Flow Analysis
  cashFlowSummary: string;
  savingsAnalysis: string;
  improvementAnalysis: string;
  
  // Tax Analysis
  taxSummary: string;
  deductionAnalysis: string;
  benefitAnalysis: string;
  
  // ROI Analysis
  roiSummary: string;
  investmentAnalysis: string;
  returnAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  marketRisk: string;
  rateRisk: string;
  timingRisk: string;
  
  // Market Analysis
  marketAnalysis: string;
  competitiveAnalysis: string;
  marketPosition: string;
  
  // Recommendations
  refinanceRecommendations: string[];
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

export interface MortgageRefinanceOutputs {
  // Core Metrics
  monthlyPaymentSavings: number;
  interestSavings: number;
  breakEvenMonths: number;
  netSavings: number;
  returnOnInvestment: number;
  riskScore: number;
  newMonthlyPayment: number;
  totalRefinanceCost: number;
  
  // Analysis
  analysis: MortgageRefinanceAnalysis;
  
  // Additional Metrics
  currentMonthlyPayment: number;
  monthlyPaymentDifference: number;
  annualPaymentSavings: number;
  currentTotalInterest: number;
  newTotalInterest: number;
  interestSavingsPercentage: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  cashFlowImprovement: number;
  currentEquity: number;
  newEquity: number;
  equityChange: number;
  loanToValueRatio: number;
  taxDeduction: number;
  afterTaxSavings: number;
  effectiveTaxRate: number;
  taxBenefit: number;
  paybackPeriod: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  amortizationComparison: any[];
  sensitivityMatrix: any[];
  scenarios: any[];
  probabilityOfBenefit: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
  comparisonAnalysis: any[];
}
