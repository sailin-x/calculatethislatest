export interface MortgageRateLockInputs {
  // Loan Information
  loanAmount: number;
  lockedRate: number;
  currentMarketRate: number;
  loanTerm: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'hard_money' | 'private';
  paymentType: 'principal_interest' | 'interest_only' | 'balloon' | 'arm';
  
  // Rate Lock Information
  lockDate: string;
  lockExpirationDate: string;
  lockDuration: number;
  lockType: 'free' | 'paid' | 'float_down' | 'extended';
  lockFee: number;
  lockFeeType: 'percentage' | 'fixed' | 'none';
  
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial';
  propertySize: number;
  propertyAge: number;
  
  // Closing Information
  estimatedClosingDate: string;
  actualClosingDate: string;
  closingDelay: number;
  extensionFee: number;
  extensionFeeType: 'percentage' | 'fixed' | 'daily';
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'volatile';
  marketVolatility: number;
  rateTrend: 'falling' | 'stable' | 'rising' | 'volatile';
  
  // Rate Forecast
  rateForecast: Array<{
    date: string;
    predictedRate: number;
    confidence: number;
  }>;
  
  // Borrower Information
  borrowerIncome: number;
  borrowerCreditScore: number;
  borrowerDebtToIncomeRatio: number;
  borrowerEmploymentType: 'employed' | 'self_employed' | 'retired' | 'business_owner';
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  propertyAppreciationRate: number;
  discountRate: number;
  
  // Risk Tolerance
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  maxRateIncrease: number;
  minRateDecrease: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface MortgageRateLockMetrics {
  // Rate Analysis
  rateDifference: number;
  rateSavings: number;
  rateRisk: number;
  effectiveRate: number;
  
  // Payment Analysis
  lockedPayment: number;
  currentPayment: number;
  paymentDifference: number;
  paymentSavings: number;
  
  // Cost Analysis
  totalInterestPaid: number;
  interestSavings: number;
  lockCost: number;
  netSavings: number;
  
  // Time Analysis
  lockRemainingDays: number;
  lockExpirationRisk: number;
  extensionCost: number;
  breakEvenPoint: number;
  
  // Risk Analysis
  riskScore: number;
  probabilityOfExpiration: number;
  probabilityOfRateIncrease: number;
  probabilityOfRateDecrease: number;
  
  // Value Analysis
  lockValue: number;
  lockValuePerDay: number;
  lockValuePerMonth: number;
  lockValuePerYear: number;
  
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
  
  // Timeline Analysis
  timelineAnalysis: Array<{
    date: string;
    event: string;
    rate: number;
    payment: number;
    cost: number;
  }>;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    option: string;
    rate: number;
    payment: number;
    totalCost: number;
    risk: string;
  }>;
  
  // Break-Even Analysis
  breakEvenAnalysis: Array<{
    days: number;
    rateIncrease: number;
    breakEvenRate: number;
    savings: number;
  }>;
}

export interface MortgageRateLockAnalysis {
  // Executive Summary
  lockRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  valueRating: 'High Value' | 'Good Value' | 'Moderate Value' | 'Low Value' | 'No Value';
  recommendation: 'Maintain Lock' | 'Consider Extension' | 'Let Expire' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Lock Analysis
  lockSummary: string;
  rateAnalysis: string;
  valueAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  expirationRisk: string;
  rateRisk: string;
  marketRisk: string;
  
  // Cost Analysis
  costSummary: string;
  savingsAnalysis: string;
  breakEvenAnalysis: string;
  
  // Market Analysis
  marketAnalysis: string;
  rateTrendAnalysis: string;
  volatilityAnalysis: string;
  
  // Timeline Analysis
  timelineSummary: string;
  expirationAnalysis: string;
  extensionAnalysis: string;
  
  // Recommendations
  lockRecommendations: string[];
  extensionRecommendations: string[];
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

export interface MortgageRateLockOutputs {
  // Core Metrics
  rateDifference: number;
  rateSavings: number;
  paymentDifference: number;
  paymentSavings: number;
  lockValue: number;
  riskScore: number;
  lockRemainingDays: number;
  breakEvenPoint: number;
  
  // Analysis
  analysis: MortgageRateLockAnalysis;
  
  // Additional Metrics
  rateRisk: number;
  effectiveRate: number;
  lockedPayment: number;
  currentPayment: number;
  totalInterestPaid: number;
  interestSavings: number;
  lockCost: number;
  netSavings: number;
  lockExpirationRisk: number;
  extensionCost: number;
  probabilityOfExpiration: number;
  probabilityOfRateIncrease: number;
  probabilityOfRateDecrease: number;
  lockValuePerDay: number;
  lockValuePerMonth: number;
  lockValuePerYear: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  timelineAnalysis: any[];
  comparisonAnalysis: any[];
  breakEvenAnalysis: any[];
}
