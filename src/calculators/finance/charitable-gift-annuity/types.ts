export interface CharitableGiftAnnuityInputs {
  // Personal Information
  donorAge: number;
  annuityAge: number; // Age when annuity payments begin
  lifeExpectancy: number;
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household';

  // Gift Information
  giftAmount: number;
  giftType: 'cash' | 'securities' | 'real_estate' | 'other_appreciated_property';
  fairMarketValue: number;
  costBasis: number; // For appreciated assets
  giftDate: string;

  // Annuity Information
  annuityRate: number; // Percentage rate for annuity payments
  paymentFrequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
  annuityType: 'immediate' | 'deferred';
  deferralPeriod: number; // Years to defer if deferred annuity

  // Tax Information
  marginalTaxRate: number; // Federal marginal tax rate
  stateTaxRate: number; // State income tax rate
  capitalGainsTaxRate: number; // Capital gains tax rate
  includeStateTaxes: boolean;

  // Financial Information
  expectedReturn: number; // Expected investment return if not donating
  inflationRate: number; // Expected inflation rate
  discountRate: number; // Rate for present value calculations

  // Charitable Organization
  charityType: 'public_charity' | 'private_foundation' | 'university' | 'hospital' | 'church';
  charityLocation: string;

  // Analysis Parameters
  analysisPeriod: number; // Years for analysis
  survivorBenefit: boolean; // Whether survivor benefits are included
  survivorAge: number; // Age of survivor if applicable

  // Currency
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface CharitableGiftAnnuityMetrics {
  // Tax Benefits
  taxDeduction: number;
  capitalGainsTaxSavings: number;
  totalTaxBenefit: number;
  afterTaxCost: number;

  // Annuity Payments
  annualPayment: number;
  totalPayments: number;
  presentValueOfPayments: number;

  // Financial Analysis
  netPresentValue: number;
  internalRateOfReturn: number;
  breakevenPeriod: number;

  // Comparison Analysis
  alternativeInvestmentValue: number;
  charityImpact: number;
  personalBenefitRatio: number;

  // Risk Analysis
  longevityRisk: number;
  inflationRisk: number;
  charityRisk: number;
}

export interface CharitableGiftAnnuityAnalysis {
  // Executive Summary
  strategyViability: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Not Recommended';
  taxEfficiency: 'High' | 'Moderate' | 'Low';
  recommendation: 'Proceed' | 'Delay' | 'Alternative Strategy' | 'Not Advisable';

  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];

  // Tax Analysis
  taxDeductionSummary: string;
  capitalGainsAnalysis: string;
  taxEfficiencyAnalysis: string;

  // Financial Analysis
  annuityPaymentSummary: string;
  presentValueAnalysis: string;
  comparisonAnalysis: string;

  // Risk Assessment
  riskAssessment: string;
  longevityRiskAnalysis: string;
  inflationRiskAnalysis: string;

  // Implementation
  implementationSteps: string[];
  timingConsiderations: string;
  legalConsiderations: string[];

  // Recommendations
  contributionRecommendations: string[];
  annuityRecommendations: string[];
  taxPlanningRecommendations: string[];

  // Performance Benchmarks
  performanceBenchmarks: Array<{
    metric: string;
    value: number;
    benchmark: number;
    category: string;
  }>;

  // Decision Support
  decisionSummary: string;
  scenarioAnalysis: string[];
  sensitivityAnalysis: string[];
}

export interface CharitableGiftAnnuityOutputs {
  // Core Metrics
  taxDeduction: number;
  annualPayment: number;
  netPresentValue: number;
  breakevenPeriod: number;

  // Analysis
  analysis: CharitableGiftAnnuityAnalysis;

  // Additional Metrics
  totalPayments: number;
  capitalGainsTaxSavings: number;
  internalRateOfReturn: number;
  alternativeInvestmentValue: number;
}