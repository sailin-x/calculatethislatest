export interface MortgageVsRentInputs {
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'apartment';
  propertySize: number;
  propertyAge: number;
  
  // Mortgage Information
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'hard_money' | 'private';
  paymentType: 'principal_interest' | 'interest_only' | 'balloon' | 'arm';
  
  // Down Payment Information
  downPayment: number;
  downPaymentPercentage: number;
  downPaymentSource: 'savings' | 'investment_sale' | 'gift' | 'inheritance' | 'other';
  
  // Rent Information
  monthlyRent: number;
  annualRent: number;
  rentIncreaseRate: number;
  rentEscalationClause: boolean;
  rentEscalationRate: number;
  
  // Insurance and Taxes
  propertyInsurance: number;
  propertyTaxes: number;
  hoaFees: number;
  floodInsurance: number;
  mortgageInsurance: number;
  rentersInsurance: number;
  
  // Maintenance and Utilities
  maintenanceCosts: number;
  utilityCosts: number;
  rentIncludesUtilities: boolean;
  utilitiesIncluded: string[];
  
  // Closing Costs and Fees
  closingCosts: number;
  originationFee: number;
  appraisalFee: number;
  titleInsuranceFee: number;
  recordingFee: number;
  attorneyFee: number;
  otherFees: number;
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  propertyAppreciationRate: number;
  rentGrowthRate: number;
  
  // Borrower Information
  borrowerIncome: number;
  borrowerCreditScore: number;
  borrowerDebtToIncomeRatio: number;
  borrowerEmploymentType: 'employed' | 'self_employed' | 'retired' | 'business_owner';
  borrowerTaxRate: number;
  
  // Investment Assumptions
  investmentReturnRate: number;
  inflationRate: number;
  discountRate: number;
  analysisPeriod: number;
  
  // Lifestyle Factors
  expectedStayDuration: number;
  flexibilityNeeded: boolean;
  maintenancePreference: 'low' | 'medium' | 'high';
  locationStability: 'stable' | 'moderate' | 'unstable';
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface MortgageVsRentMetrics {
  // Cost Analysis
  monthlyMortgagePayment: number;
  monthlyRentPayment: number;
  monthlyCostDifference: number;
  annualCostDifference: number;
  
  // Total Cost Analysis
  totalMortgageCost: number;
  totalRentCost: number;
  totalCostDifference: number;
  costSavings: number;
  
  // Break-Even Analysis
  breakEvenPoint: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  breakEvenPropertyValue: number;
  
  // Equity Analysis
  equityBuildUp: number;
  equityPercentage: number;
  totalEquity: number;
  equityGrowth: number;
  
  // Investment Analysis
  opportunityCost: number;
  investmentGrowth: number;
  totalInvestmentValue: number;
  netInvestmentBenefit: number;
  
  // Tax Analysis
  mortgageTaxDeduction: number;
  rentTaxDeduction: number;
  taxBenefit: number;
  afterTaxCost: number;
  
  // Cash Flow Analysis
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  cashFlowImprovement: number;
  
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
    mortgageCost: number;
    rentCost: number;
    savings: number;
  }>;
  
  // Timeline Analysis
  timelineAnalysis: Array<{
    year: number;
    mortgageCost: number;
    rentCost: number;
    equity: number;
    investment: number;
    netBenefit: number;
  }>;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    metric: string;
    mortgage: number;
    rent: number;
    difference: number;
    advantage: string;
  }>;
  
  // Risk Analysis
  riskScore: number;
  probabilityOfBenefit: number;
  worstCaseScenario: number;
  bestCaseScenario: number;
  
  // Market Analysis
  marketAnalysis: Array<{
    factor: string;
    mortgageImpact: number;
    rentImpact: number;
    netImpact: number;
  }>;
}

export interface MortgageVsRentAnalysis {
  // Executive Summary
  recommendation: 'Buy' | 'Rent' | 'Consider Buying' | 'Consider Renting' | 'Requires Review';
  valueRating: 'High Value' | 'Good Value' | 'Moderate Value' | 'Low Value' | 'No Value';
  confidenceRating: 'High' | 'Medium' | 'Low';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  valueFactors: string[];
  opportunities: string[];
  
  // Cost Analysis
  costSummary: string;
  paymentAnalysis: string;
  totalCostAnalysis: string;
  
  // Break-Even Analysis
  breakEvenSummary: string;
  timelineAnalysis: string;
  riskAnalysis: string;
  
  // Equity Analysis
  equitySummary: string;
  equityGrowthAnalysis: string;
  investmentAnalysis: string;
  
  // Tax Analysis
  taxSummary: string;
  deductionAnalysis: string;
  benefitAnalysis: string;
  
  // Cash Flow Analysis
  cashFlowSummary: string;
  savingsAnalysis: string;
  improvementAnalysis: string;
  
  // Market Analysis
  marketSummary: string;
  appreciationAnalysis: string;
  rentAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  marketRisk: string;
  financialRisk: string;
  lifestyleRisk: string;
  
  // Recommendations
  buyRecommendations: string[];
  rentRecommendations: string[];
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

export interface MortgageVsRentOutputs {
  // Core Metrics
  recommendation: string;
  monthlyCostDifference: number;
  breakEvenMonths: number;
  totalCostDifference: number;
  equityBuildUp: number;
  opportunityCost: number;
  riskScore: number;
  probabilityOfBenefit: number;
  
  // Analysis
  analysis: MortgageVsRentAnalysis;
  
  // Additional Metrics
  monthlyMortgagePayment: number;
  monthlyRentPayment: number;
  annualCostDifference: number;
  costSavings: number;
  totalMortgageCost: number;
  totalRentCost: number;
  breakEvenPoint: number;
  breakEvenYears: number;
  breakEvenPropertyValue: number;
  equityPercentage: number;
  totalEquity: number;
  equityGrowth: number;
  investmentGrowth: number;
  totalInvestmentValue: number;
  netInvestmentBenefit: number;
  mortgageTaxDeduction: number;
  rentTaxDeduction: number;
  taxBenefit: number;
  afterTaxCost: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  cashFlowImprovement: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  timelineAnalysis: any[];
  comparisonAnalysis: any[];
  worstCaseScenario: number;
  bestCaseScenario: number;
  marketAnalysis: any[];
}
