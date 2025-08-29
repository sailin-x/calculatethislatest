export interface PMICancellationInputs {
  // Loan Information
  originalLoanAmount: number;
  currentLoanBalance: number;
  interestRate: number;
  loanTerm: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  paymentType: 'principal_interest' | 'interest_only' | 'balloon' | 'arm';
  
  // Property Information
  originalPropertyValue: number;
  currentPropertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial';
  propertySize: number;
  propertyAge: number;
  
  // PMI Information
  pmiRate: number;
  pmiMonthlyPayment: number;
  pmiStartDate: string;
  pmiCancellationDate: string;
  pmiCancellationMethod: 'automatic' | 'request' | 'refinance' | 'appraisal';
  
  // Loan History
  loanStartDate: string;
  originalDownPayment: number;
  originalDownPaymentPercentage: number;
  paymentsMade: number;
  monthsSinceLoanStart: number;
  
  // Appraisal Information
  appraisalValue: number;
  appraisalDate: string;
  appraisalCost: number;
  appraisalRequired: boolean;
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  comparableSales: Array<{
    address: string;
    salePrice: number;
    saleDate: string;
    condition: string;
  }>;
  
  // Borrower Information
  borrowerIncome: number;
  borrowerCreditScore: number;
  borrowerDebtToIncomeRatio: number;
  borrowerEmploymentType: 'employed' | 'self_employed' | 'retired' | 'business_owner';
  
  // Cancellation Requirements
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
  propertyAppreciationRate: number;
  discountRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface PMICancellationMetrics {
  // PMI Analysis
  currentLtvRatio: number;
  requiredLtvRatio: number;
  ltvGap: number;
  pmiEligibility: boolean;
  
  // Cost Analysis
  totalPMIPaid: number;
  remainingPMICost: number;
  pmiSavings: number;
  monthlyPMISavings: number;
  annualPMISavings: number;
  
  // Timeline Analysis
  automaticCancellationDate: string;
  requestCancellationDate: string;
  monthsToAutomaticCancellation: number;
  monthsToRequestCancellation: number;
  
  // Payment Analysis
  monthlyPayment: number;
  monthlyPaymentWithoutPMI: number;
  paymentReduction: number;
  totalPaymentSavings: number;
  
  // Equity Analysis
  currentEquity: number;
  equityPercentage: number;
  equityGrowth: number;
  equityRequired: number;
  
  // Break-Even Analysis
  breakEvenPoint: number;
  breakEvenMonths: number;
  breakEvenCost: number;
  netSavings: number;
  
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
    cancellationDate: string;
    savings: number;
    cost: number;
  }>;
  
  // Timeline Analysis
  timelineAnalysis: Array<{
    month: number;
    date: string;
    ltvRatio: number;
    pmiPayment: number;
    cumulativePMI: number;
    eligibility: boolean;
  }>;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    option: string;
    cancellationDate: string;
    totalCost: number;
    totalSavings: number;
    netBenefit: number;
  }>;
  
  // Risk Analysis
  riskScore: number;
  probabilityOfCancellation: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
  
  // Market Analysis
  marketAnalysis: Array<{
    factor: string;
    impact: number;
    risk: string;
    opportunity: string;
  }>;
}

export interface PMICancellationAnalysis {
  // Executive Summary
  cancellationRating: 'Eligible Now' | 'Eligible Soon' | 'Not Yet Eligible' | 'Requires Action' | 'Not Eligible';
  savingsRating: 'High Savings' | 'Good Savings' | 'Moderate Savings' | 'Low Savings' | 'No Savings';
  recommendation: 'Cancel Now' | 'Request Cancellation' | 'Wait' | 'Refinance' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  eligibilityFactors: string[];
  opportunities: string[];
  
  // Cancellation Analysis
  cancellationSummary: string;
  eligibilityAnalysis: string;
  timelineAnalysis: string;
  
  // Cost Analysis
  costSummary: string;
  savingsAnalysis: string;
  breakEvenAnalysis: string;
  
  // Equity Analysis
  equitySummary: string;
  equityGrowthAnalysis: string;
  ltvAnalysis: string;
  
  // Payment Analysis
  paymentSummary: string;
  reductionAnalysis: string;
  cashFlowAnalysis: string;
  
  // Market Analysis
  marketSummary: string;
  appreciationAnalysis: string;
  comparableAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  marketRisk: string;
  appraisalRisk: string;
  timingRisk: string;
  
  // Recommendations
  cancellationRecommendations: string[];
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

export interface PMICancellationOutputs {
  // Core Metrics
  pmiEligibility: boolean;
  currentLtvRatio: number;
  monthlyPMISavings: number;
  totalPMISavings: number;
  breakEvenMonths: number;
  automaticCancellationDate: string;
  requestCancellationDate: string;
  riskScore: number;
  
  // Analysis
  analysis: PMICancellationAnalysis;
  
  // Additional Metrics
  requiredLtvRatio: number;
  ltvGap: number;
  totalPMIPaid: number;
  remainingPMICost: number;
  monthsToAutomaticCancellation: number;
  monthsToRequestCancellation: number;
  monthlyPayment: number;
  monthlyPaymentWithoutPMI: number;
  paymentReduction: number;
  totalPaymentSavings: number;
  currentEquity: number;
  equityPercentage: number;
  equityGrowth: number;
  equityRequired: number;
  breakEvenPoint: number;
  breakEvenCost: number;
  netSavings: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  timelineAnalysis: any[];
  comparisonAnalysis: any[];
  probabilityOfCancellation: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
  marketAnalysis: any[];
}
