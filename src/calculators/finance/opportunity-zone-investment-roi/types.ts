export interface OpportunityZoneInputs {
  // Investment Details
  initialInvestment: number;
  investmentDate: string; // Date of investment
  holdingPeriodYears: number;

  // Tax Benefits
  capitalGainsTaxRate: number; // Current capital gains tax rate (e.g., 20%)
  ordinaryIncomeTaxRate: number; // Ordinary income tax rate for comparison

  // Investment Appreciation
  expectedAnnualAppreciation: number; // Expected annual growth rate
  expectedAnnualIncome: number; // Expected annual cash flow

  // Tax Deferral Details
  capitalGainAmount: number; // Amount of capital gain being deferred
  deferralPeriodYears: number; // Years until tax payment (typically 5-7 years)

  // Step-Up Valuation
  stepUpPercentage: number; // Tax basis step-up at 5 years (10%) and 7 years (5%)

  // Exit Strategy
  exitYear: number; // Year of sale/exit
  exitMultiple: number; // Exit valuation multiple

  // Financing
  leveragePercentage: number; // Percentage of investment financed
  interestRate: number; // Financing interest rate

  // Analysis Options
  includeTaxDeferral: boolean;
  includeStepUp: boolean;
  includeExclusion: boolean;
  riskAdjustedDiscountRate: number;
}

export interface OpportunityZoneMetrics {
  // Tax Benefits
  deferredTaxSavings: number;
  stepUpTaxSavings: number;
  exclusionTaxSavings: number;
  totalTaxSavings: number;

  // Investment Returns
  projectedValue: number;
  totalCashFlow: number;
  leveragedReturn: number;
  irr: number;
  npv: number;

  // Tax Efficiency
  effectiveTaxRate: number;
  afterTaxIrr: number;
  taxSavingsPercentage: number;

  // Risk Analysis
  riskAdjustedReturn: number;
  breakEvenAnalysis: number;
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    impact: number;
  }[];
}

export interface OpportunityZoneAnalysis {
  // Investment Quality
  investmentRating: 'excellent' | 'good' | 'fair' | 'poor';
  riskLevel: 'low' | 'moderate' | 'high';

  // Tax Strategy Effectiveness
  taxEfficiency: 'high' | 'moderate' | 'low';
  deferralEffectiveness: number;
  exclusionEffectiveness: number;

  // Recommendations
  recommendations: string[];
  optimalHoldingPeriod: number;
  taxStrategyOptimization: string[];

  // Compliance Considerations
  complianceRequirements: string[];
  deadlineReminders: string[];

  // Market Analysis
  zoneDesignation: string;
  marketTrends: string[];
  economicIndicators: {
    indicator: string;
    value: number;
    trend: 'positive' | 'neutral' | 'negative';
  }[];
}

export interface OpportunityZoneOutputs {
  // Core Results
  totalTaxSavings: number;
  projectedValue: number;
  afterTaxIrr: number;
  effectiveTaxRate: number;

  // Tax Benefits Breakdown
  deferredTaxSavings: number;
  stepUpTaxSavings: number;
  exclusionTaxSavings: number;

  // Investment Performance
  totalCashFlow: number;
  leveragedReturn: number;
  npv: number;

  // Analysis
  analysis: OpportunityZoneAnalysis;
}