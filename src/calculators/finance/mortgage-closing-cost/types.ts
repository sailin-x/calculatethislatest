export interface MortgageClosingCostInputs {
  // Loan Information
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'hard_money' | 'private';
  paymentType: 'principal_interest' | 'interest_only' | 'balloon' | 'arm';
  
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial';
  propertySize: number;
  propertyAge: number;
  
  // Closing Date Information
  closingDate: string;
  firstPaymentDate: string;
  propertyTaxYear: number;
  insuranceYear: number;
  
  // Origination Charges
  originationFee: number;
  applicationFee: number;
  underwritingFee: number;
  processingFee: number;
  creditReportFee: number;
  floodCertificationFee: number;
  taxServiceFee: number;
  otherOriginationFees: number;
  
  // Services Borrower Did Not Shop For
  appraisalFee: number;
  appraisalReviewFee: number;
  pestInspectionFee: number;
  otherInspectionFees: number;
  
  // Services Borrower Did Shop For
  titleInsuranceLenders: number;
  titleInsuranceOwners: number;
  titleSearchFee: number;
  titleExamFee: number;
  titleEndorsements: number;
  otherTitleFees: number;
  
  // Government Recording and Transfer Charges
  recordingFees: number;
  transferTaxes: number;
  cityTax: number;
  countyTax: number;
  stateTax: number;
  otherGovernmentFees: number;
  
  // Prepaids
  homeownersInsurancePremium: number;
  mortgageInsurancePremium: number;
  prepaidInterest: number;
  propertyTaxes: number;
  hoaFees: number;
  otherPrepaids: number;
  
  // Initial Escrow Payment
  homeownersInsuranceEscrow: number;
  mortgageInsuranceEscrow: number;
  propertyTaxEscrow: number;
  otherEscrow: number;
  
  // Other Costs
  surveyFee: number;
  attorneyFees: number;
  notaryFees: number;
  courierFees: number;
  wireTransferFees: number;
  otherFees: number;
  
  // Seller Credits
  sellerCredits: number;
  lenderCredits: number;
  otherCredits: number;
  
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

export interface MortgageClosingCostMetrics {
  // Cost Analysis
  totalClosingCosts: number;
  totalPrepaids: number;
  totalEscrow: number;
  totalCredits: number;
  netClosingCosts: number;
  
  // Cost Breakdown
  originationCosts: number;
  serviceCosts: number;
  governmentCosts: number;
  prepaidCosts: number;
  escrowCosts: number;
  otherCosts: number;
  
  // Cost Ratios
  closingCostToLoanRatio: number;
  closingCostToPropertyValueRatio: number;
  closingCostToIncomeRatio: number;
  
  // Monthly Impact
  monthlyPayment: number;
  monthlyPaymentWithClosingCosts: number;
  effectiveInterestRate: number;
  
  // Break-Even Analysis
  breakEvenPoint: number;
  breakEvenMonths: number;
  breakEvenYears: number;
  
  // Cost Comparison
  marketAverageClosingCosts: number;
  costComparison: number;
  costSavings: number;
  
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
    closingCosts: number;
    monthlyPayment: number;
  }>;
  
  // Cost Breakdown by Category
  costBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  
  // Timeline Analysis
  timelineAnalysis: Array<{
    date: string;
    event: string;
    cost: number;
    cumulativeCost: number;
  }>;
}

export interface MortgageClosingCostAnalysis {
  // Executive Summary
  closingCostRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  costRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Proceed' | 'Negotiate' | 'Reconsider' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  costFactors: string[];
  opportunities: string[];
  
  // Cost Analysis
  costSummary: string;
  breakdownAnalysis: string;
  comparisonAnalysis: string;
  
  // Impact Analysis
  impactSummary: string;
  monthlyImpact: string;
  longTermImpact: string;
  
  // Negotiation Analysis
  negotiationSummary: string;
  negotiableItems: string[];
  nonNegotiableItems: string[];
  
  // Market Analysis
  marketAnalysis: string;
  competitiveAnalysis: string;
  marketPosition: string;
  
  // Recommendations
  costReductionRecommendations: string[];
  negotiationStrategies: string[];
  optimizationSuggestions: string[];
  
  // Implementation
  implementationPlan: string;
  nextSteps: string[];
  timeline: string;
  
  // Monitoring
  monitoringPlan: string;
  keyMetrics: string[];
  reviewSchedule: string;
  
  // Cost Management
  costManagement: string;
  reductionStrategies: string[];
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

export interface MortgageClosingCostOutputs {
  // Core Metrics
  totalClosingCosts: number;
  totalPrepaids: number;
  totalEscrow: number;
  netClosingCosts: number;
  closingCostToLoanRatio: number;
  breakEvenMonths: number;
  monthlyPayment: number;
  effectiveInterestRate: number;
  
  // Analysis
  analysis: MortgageClosingCostAnalysis;
  
  // Additional Metrics
  totalCredits: number;
  originationCosts: number;
  serviceCosts: number;
  governmentCosts: number;
  prepaidCosts: number;
  escrowCosts: number;
  otherCosts: number;
  closingCostToPropertyValueRatio: number;
  closingCostToIncomeRatio: number;
  monthlyPaymentWithClosingCosts: number;
  breakEvenPoint: number;
  breakEvenYears: number;
  marketAverageClosingCosts: number;
  costComparison: number;
  costSavings: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  costBreakdown: any[];
  timelineAnalysis: any[];
}
