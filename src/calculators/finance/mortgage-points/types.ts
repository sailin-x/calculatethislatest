export interface MortgagePointsInputs {
  // Loan Information
  loanAmount: number;
  baseInterestRate: number;
  loanTerm: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'hard_money' | 'private';
  paymentType: 'principal_interest' | 'interest_only' | 'balloon' | 'arm';
  
  // Points Information
  discountPoints: number;
  originationPoints: number;
  pointCost: number;
  pointValue: number;
  
  // Rate Options
  rateOptions: Array<{
    points: number;
    rate: number;
    payment: number;
    totalInterest: number;
  }>;
  
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
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface MortgagePointsMetrics {
  // Points Analysis
  totalPoints: number;
  totalPointCost: number;
  pointValue: number;
  effectiveRate: number;
  
  // Payment Analysis
  monthlyPayment: number;
  monthlyPaymentSavings: number;
  annualPaymentSavings: number;
  totalPaymentSavings: number;
  
  // Interest Analysis
  totalInterestPaid: number;
  interestSavings: number;
  interestSavingsPercentage: number;
  
  // Cost Analysis
  totalCost: number;
  netSavings: number;
  breakEvenPoint: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  
  // Tax Analysis
  taxDeduction: number;
  afterTaxCost: number;
  afterTaxSavings: number;
  effectiveTaxRate: number;
  
  // ROI Analysis
  returnOnInvestment: number;
  paybackPeriod: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    scenario: string;
    points: number;
    rate: number;
    payment: number;
    totalInterest: number;
    totalCost: number;
    netSavings: number;
    breakEvenMonths: number;
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
    points: number;
    rate: number;
    savings: number;
  }>;
  
  // Amortization Comparison
  amortizationComparison: Array<{
    paymentNumber: number;
    date: string;
    noPointsPayment: number;
    withPointsPayment: number;
    savings: number;
    cumulativeSavings: number;
  }>;
  
  // Risk Metrics
  riskScore: number;
  probabilityOfBenefit: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
}

export interface MortgagePointsAnalysis {
  // Executive Summary
  pointsRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  valueRating: 'High Value' | 'Good Value' | 'Moderate Value' | 'Low Value' | 'No Value';
  recommendation: 'Buy Points' | 'Consider Points' | 'Don\'t Buy Points' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  valueFactors: string[];
  opportunities: string[];
  
  // Points Analysis
  pointsSummary: string;
  costAnalysis: string;
  savingsAnalysis: string;
  
  // Break-Even Analysis
  breakEvenSummary: string;
  timelineAnalysis: string;
  riskAnalysis: string;
  
  // Tax Analysis
  taxSummary: string;
  deductionAnalysis: string;
  afterTaxAnalysis: string;
  
  // ROI Analysis
  roiSummary: string;
  investmentAnalysis: string;
  returnAnalysis: string;
  
  // Comparison Analysis
  comparisonSummary: string;
  scenarioAnalysis: string;
  optionAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  marketRisk: string;
  timingRisk: string;
  refinanceRisk: string;
  
  // Market Analysis
  marketAnalysis: string;
  competitiveAnalysis: string;
  marketPosition: string;
  
  // Recommendations
  purchaseRecommendations: string[];
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

export interface MortgagePointsOutputs {
  // Core Metrics
  totalPoints: number;
  totalPointCost: number;
  effectiveRate: number;
  monthlyPaymentSavings: number;
  interestSavings: number;
  breakEvenMonths: number;
  returnOnInvestment: number;
  netPresentValue: number;
  
  // Analysis
  analysis: MortgagePointsAnalysis;
  
  // Additional Metrics
  pointValue: number;
  monthlyPayment: number;
  annualPaymentSavings: number;
  totalPaymentSavings: number;
  totalInterestPaid: number;
  interestSavingsPercentage: number;
  totalCost: number;
  netSavings: number;
  breakEvenPoint: number;
  breakEvenYears: number;
  taxDeduction: number;
  afterTaxCost: number;
  afterTaxSavings: number;
  effectiveTaxRate: number;
  paybackPeriod: number;
  internalRateOfReturn: number;
  comparisonAnalysis: any[];
  sensitivityMatrix: any[];
  scenarios: any[];
  amortizationComparison: any[];
  riskScore: number;
  probabilityOfBenefit: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
}
