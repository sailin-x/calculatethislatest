export interface CompoundInterestInputs {
  // Principal Information
  principalAmount: number;
  regularContribution: number;
  contributionFrequency: 'monthly' | 'quarterly' | 'annually';

  // Time Information
  timePeriodYears: number;
  compoundingFrequency: 'daily' | 'monthly' | 'quarterly' | 'annually';

  // Interest Information
  nominalInterestRate: number; // Annual nominal rate
  effectiveInterestRate: number; // Calculated effective rate

  // Analysis Options
  includeRegularContributions: boolean;
  contributionTiming: 'beginning' | 'end'; // Beginning or end of period
  includeInflation: boolean;
  inflationRate: number;

  // Tax Considerations
  includeTaxes: boolean;
  taxRate: number;

  // Advanced Options
  calculateEffectiveRate: boolean;
  showAmortizationSchedule: boolean;
  includeInvestmentFees: boolean;
  investmentFees: number; // Annual fee percentage
}

export interface CompoundInterestMetrics {
  // Core Calculations
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  effectiveAnnualRate: number;

  // Contribution Analysis
  contributionImpact: number;
  contributionPercentage: number;

  // Time Value Analysis
  timeValueOfMoney: number;
  compoundEffect: number;

  // Inflation Impact
  inflationAdjustedValue: number;
  realReturn: number;
  purchasingPower: number;

  // Tax Impact
  afterTaxValue: number;
  taxPaid: number;
  taxEfficiency: number;

  // Comparative Analysis
  vsSimpleInterest: number;
  vsNoContributions: number;
  efficiencyRatio: number;

  // Risk Analysis
  volatilityImpact: number;
  breakEvenAnalysis: number;
}

export interface CompoundInterestAnalysis {
  // Investment Performance
  growthEfficiency: 'excellent' | 'good' | 'fair' | 'poor';
  contributionStrategy: 'optimal' | 'good' | 'fair' | 'suboptimal';
  timeHorizon: 'long_term' | 'medium_term' | 'short_term';

  // Recommendations
  recommendations: string[];
  optimizationTips: string[];
  riskConsiderations: string[];

  // Educational Insights
  compoundEffect: string;
  contributionImportance: string;
  timeValueEducation: string;

  // Comparative Analysis
  vsOtherInvestments: {
    vsSavingsAccount: string;
    vsStockMarket: string;
    vsRealEstate: string;
  };

  // Financial Planning
  savingsGoalProgress: number;
  timeToGoal: number;
  accelerationStrategies: string[];

  // Risk Assessment
  interestRateRisk: string;
  inflationRisk: string;
  contributionRisk: string;
}

export interface CompoundInterestOutputs {
  // Primary Results
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  effectiveAnnualRate: number;

  // Additional Metrics
  inflationAdjustedValue: number;
  afterTaxValue: number;

  // Analysis
  analysis: CompoundInterestAnalysis;
}