export interface PrivateMortgageInsuranceInputs {
  // Loan Information
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  paymentType: 'principal_interest' | 'interest_only' | 'balloon' | 'arm';
  
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
  
  // PMI Information
  pmiRequired: boolean;
  pmiRate: number;
  pmiType: 'monthly' | 'single_premium' | 'split_premium' | 'lender_paid';
  pmiCancellationMethod: 'automatic' | 'request' | 'refinance';
  
  // Borrower Information
  borrowerIncome: number;
  borrowerCreditScore: number;
  borrowerDebtToIncomeRatio: number;
  borrowerEmploymentType: 'employed' | 'self_employed' | 'retired' | 'business_owner';
  borrowerTaxRate: number;
  
  // Loan History
  loanStartDate: string;
  paymentsMade: number;
  monthsSinceLoanStart: number;
  currentPrincipalBalance: number;
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  propertyAppreciationRate: number;
  
  // PMI Requirements
  ltvThreshold: number;
  paymentHistory: Array<{
    paymentNumber: number;
    paymentDate: string;
    paymentAmount: number;
    principal: number;
    interest: number;
    balance: number;
    onTime: boolean;
  }>;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  discountRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface PrivateMortgageInsuranceMetrics {
  // PMI Analysis
  pmiMonthlyPayment: number;
  pmiAnnualCost: number;
  pmiTotalCost: number;
  pmiRate: number;
  pmiRequired: boolean;
  
  // Loan Analysis
  loanToValueRatio: number;
  currentLtvRatio: number;
  ltvGap: number;
  equityPosition: number;
  equityPercentage: number;
  
  // Payment Analysis
  monthlyPayment: number;
  monthlyPaymentWithoutPMI: number;
  paymentIncrease: number;
  paymentIncreasePercentage: number;
  
  // Cost Analysis
  totalPMICost: number;
  pmiSavings: number;
  effectiveInterestRate: number;
  totalLoanCost: number;
  
  // Cancellation Analysis
  automaticCancellationDate: string;
  requestCancellationDate: string;
  monthsToAutomaticCancellation: number;
  monthsToRequestCancellation: number;
  cancellationEligibility: boolean;
  
  // Break-Even Analysis
  breakEvenPoint: number;
  breakEvenMonths: number;
  breakEvenCost: number;
  netSavings: number;
  
  // Timeline Analysis
  timelineAnalysis: Array<{
    month: number;
    date: string;
    ltvRatio: number;
    pmiPayment: number;
    cumulativePMI: number;
    eligibility: boolean;
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
    pmiCost: number;
    cancellationDate: string;
    savings: number;
  }>;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    option: string;
    pmiCost: number;
    totalCost: number;
    cancellationDate: string;
    savings: number;
  }>;
  
  // Risk Analysis
  riskScore: number;
  probabilityOfCancellation: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
  
  // Tax Analysis
  taxDeduction: number;
  afterTaxCost: number;
  taxBenefit: number;
  
  // Market Analysis
  marketAnalysis: Array<{
    factor: string;
    impact: number;
    risk: string;
    opportunity: string;
  }>;
}

export interface PrivateMortgageInsuranceAnalysis {
  // Executive Summary
  pmiRating: 'Required' | 'Not Required' | 'Eligible for Cancellation' | 'Consider Refinance' | 'Requires Review';
  costRating: 'High Cost' | 'Moderate Cost' | 'Low Cost' | 'No Cost';
  recommendation: 'Keep PMI' | 'Cancel PMI' | 'Refinance' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  costFactors: string[];
  opportunities: string[];
  
  // PMI Analysis
  pmiSummary: string;
  costAnalysis: string;
  requirementAnalysis: string;
  
  // Cancellation Analysis
  cancellationSummary: string;
  eligibilityAnalysis: string;
  timelineAnalysis: string;
  
  // Cost Analysis
  costSummary: string;
  savingsAnalysis: string;
  breakEvenAnalysis: string;
  
  // Payment Analysis
  paymentSummary: string;
  impactAnalysis: string;
  cashFlowAnalysis: string;
  
  // Equity Analysis
  equitySummary: string;
  equityGrowthAnalysis: string;
  ltvAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  cancellationRisk: string;
  marketRisk: string;
  timingRisk: string;
  
  // Market Analysis
  marketAnalysis: string;
  appreciationAnalysis: string;
  competitiveAnalysis: string;
  
  // Tax Analysis
  taxSummary: string;
  deductionAnalysis: string;
  benefitAnalysis: string;
  
  // Recommendations
  pmiRecommendations: string[];
  cancellationRecommendations: string[];
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

export interface PrivateMortgageInsuranceOutputs {
  // Core Metrics
  pmiRequired: boolean;
  pmiMonthlyPayment: number;
  pmiAnnualCost: number;
  loanToValueRatio: number;
  cancellationEligibility: boolean;
  breakEvenMonths: number;
  riskScore: number;
  totalPMICost: number;
  
  // Analysis
  analysis: PrivateMortgageInsuranceAnalysis;
  
  // Additional Metrics
  pmiRate: number;
  pmiTotalCost: number;
  currentLtvRatio: number;
  ltvGap: number;
  equityPosition: number;
  equityPercentage: number;
  monthlyPayment: number;
  monthlyPaymentWithoutPMI: number;
  paymentIncrease: number;
  paymentIncreasePercentage: number;
  pmiSavings: number;
  effectiveInterestRate: number;
  totalLoanCost: number;
  automaticCancellationDate: string;
  requestCancellationDate: string;
  monthsToAutomaticCancellation: number;
  monthsToRequestCancellation: number;
  breakEvenPoint: number;
  breakEvenCost: number;
  netSavings: number;
  timelineAnalysis: any[];
  sensitivityMatrix: any[];
  scenarios: any[];
  comparisonAnalysis: any[];
  probabilityOfCancellation: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
  taxDeduction: number;
  afterTaxCost: number;
  taxBenefit: number;
  marketAnalysis: any[];
}
