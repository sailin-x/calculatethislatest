export interface HomeAffordabilityInputs {
  // Borrower Information
  annualIncome: number;
  monthlyIncome: number;
  creditScore: number;
  employmentType: 'employed' | 'self_employed' | 'retired' | 'unemployed';
  employmentLength: number;
  
  // Financial Information
  downPayment: number;
  downPaymentPercentage: number;
  monthlyDebtPayments: number;
  annualDebtPayments: number;
  debtToIncomeRatio: number;
  frontEndRatio: number;
  backEndRatio: number;
  
  // Assets and Savings
  liquidAssets: number;
  retirementSavings: number;
  otherAssets: number;
  totalAssets: number;
  
  // Market Information
  interestRate: number;
  loanTerm: number;
  propertyTaxRate: number;
  homeownersInsuranceRate: number;
  pmiRate: number;
  hoaFees: number;
  
  // Location Information
  propertyLocation: string;
  marketCondition: 'hot' | 'stable' | 'buyer_market' | 'declining';
  medianHomePrice: number;
  averageDaysOnMarket: number;
  
  // Loan Information
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  maxLTV: number;
  maxDTI: number;
  maxFrontEndRatio: number;
  
  // Additional Costs
  closingCosts: number;
  movingCosts: number;
  emergencyFund: number;
  maintenanceReserve: number;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  incomeGrowthRate: number;
  propertyAppreciationRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface HomeAffordabilityMetrics {
  // Affordability Analysis
  maxHomePrice: number;
  maxLoanAmount: number;
  maxMonthlyPayment: number;
  maxDownPayment: number;
  
  // Payment Analysis
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  
  // Cost Analysis
  totalCostOfOwnership: number;
  annualCostOfOwnership: number;
  costPerSquareFoot: number;
  
  // Financial Ratios
  actualDTI: number;
  actualFrontEndRatio: number;
  actualBackEndRatio: number;
  housingExpenseRatio: number;
  
  // Cash Flow Analysis
  monthlyCashFlow: number;
  annualCashFlow: number;
  emergencyFundMonths: number;
  savingsRate: number;
  
  // Risk Metrics
  affordabilityScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'very_high';
  stressTestResult: number;
  
  // Market Analysis
  priceToIncomeRatio: number;
  rentToPriceRatio: number;
  marketAffordabilityIndex: number;
  
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
    maxPrice: number;
    monthlyPayment: number;
  }>;
  
  // Affordability Timeline
  affordabilityTimeline: Array<{
    year: number;
    maxPrice: number;
    monthlyPayment: number;
    affordabilityScore: number;
  }>;
}

export interface HomeAffordabilityAnalysis {
  // Executive Summary
  affordabilityRating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Buy Now' | 'Wait and Save' | 'Consider Renting' | 'Adjust Expectations' | 'Seek Assistance';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Affordability Analysis
  affordabilitySummary: string;
  priceAnalysis: string;
  paymentAnalysis: string;
  
  // Financial Analysis
  financialSummary: string;
  debtAnalysis: string;
  cashFlowAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  stressTestAnalysis: string;
  marketRiskAnalysis: string;
  
  // Market Assessment
  marketAssessment: string;
  locationAnalysis: string;
  timingAnalysis: string;
  
  // Recommendations
  actionRecommendations: string[];
  financialRecommendations: string[];
  marketRecommendations: string[];
  
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

export interface HomeAffordabilityOutputs {
  // Core Metrics
  maxHomePrice: number;
  maxLoanAmount: number;
  totalMonthlyPayment: number;
  affordabilityScore: number;
  riskLevel: string;
  
  // Analysis
  analysis: HomeAffordabilityAnalysis;
  
  // Additional Metrics
  maxMonthlyPayment: number;
  maxDownPayment: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalCostOfOwnership: number;
  annualCostOfOwnership: number;
  costPerSquareFoot: number;
  actualDTI: number;
  actualFrontEndRatio: number;
  actualBackEndRatio: number;
  housingExpenseRatio: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  emergencyFundMonths: number;
  savingsRate: number;
  stressTestResult: number;
  priceToIncomeRatio: number;
  rentToPriceRatio: number;
  marketAffordabilityIndex: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  affordabilityTimeline: any[];
}
