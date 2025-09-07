export interface CharitableRemainderTrustInputs {
  // Personal Information
  donorAge: number;
  lifeExpectancy: number;
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household';

  // Trust Information
  trustType: 'charitable_remainder_annuity_trust' | 'charitable_remainder_unitrust';
  trustValue: number;
  payoutRate: number; // Percentage for annuity trust, or percentage for unitrust
  trustTerm: number; // Years until remainder goes to charity
  remainderBeneficiary: string;

  // Asset Information
  assetType: 'cash' | 'securities' | 'real_estate' | 'business_interests' | 'other_appreciated_property';
  fairMarketValue: number;
  costBasis: number;
  unrealizedGains: number;

  // Tax Information
  marginalTaxRate: number; // Federal marginal tax rate
  stateTaxRate: number; // State income tax rate
  capitalGainsTaxRate: number; // Capital gains tax rate
  includeStateTaxes: boolean;

  // Financial Information
  expectedReturn: number; // Expected investment return inside trust
  inflationRate: number; // Expected inflation rate
  discountRate: number; // Rate for present value calculations

  // Trust Administration
  trusteeFees: number; // Annual trustee fees as percentage
  administrativeCosts: number; // Annual administrative costs
  taxPreparationFees: number; // Annual tax preparation fees

  // Analysis Parameters
  analysisPeriod: number; // Years for analysis
  survivorBenefit: boolean; // Whether survivor benefits are included
  survivorAge: number; // Age of survivor if applicable

  // Currency
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface CharitableRemainderTrustMetrics {
  // Tax Benefits
  taxDeduction: number;
  capitalGainsTaxSavings: number;
  totalTaxBenefit: number;
  afterTaxCost: number;

  // Trust Income
  annualPayout: number;
  totalPayouts: number;
  presentValueOfPayouts: number;

  // Trust Remainder
  remainderValue: number;
  charityBenefit: number;

  // Financial Analysis
  netPresentValue: number;
  internalRateOfReturn: number;
  breakevenPeriod: number;

  // Comparison Analysis
  alternativeInvestmentValue: number;
  trustEfficiency: number;
  personalBenefitRatio: number;

  // Risk Analysis
  longevityRisk: number;
  marketRisk: number;
  administrativeRisk: number;
}

export interface CharitableRemainderTrustAnalysis {
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
  payoutSummary: string;
  presentValueAnalysis: string;
  comparisonAnalysis: string;

  // Trust Analysis
  remainderAnalysis: string;
  charityImpactAnalysis: string;

  // Risk Assessment
  riskAssessment: string;
  longevityRiskAnalysis: string;
  marketRiskAnalysis: string;

  // Implementation
  implementationSteps: string[];
  timingConsiderations: string;
  legalConsiderations: string[];

  // Recommendations
  contributionRecommendations: string[];
  trustRecommendations: string[];
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

export interface CharitableRemainderTrustOutputs {
  // Core Metrics
  taxDeduction: number;
  annualPayout: number;
  netPresentValue: number;
  breakevenPeriod: number;

  // Analysis
  analysis: CharitableRemainderTrustAnalysis;

  // Additional Metrics
  totalPayouts: number;
  capitalGainsTaxSavings: number;
  internalRateOfReturn: number;
  alternativeInvestmentValue: number;
  remainderValue: number;
  charityBenefit: number;
}