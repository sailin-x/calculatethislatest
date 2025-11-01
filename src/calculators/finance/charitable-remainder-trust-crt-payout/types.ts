export interface CharitableRemainderTrustInputs {
  // Trust Setup
  initialContribution: number;
  trustType: 'charitable_remainder_annuity_trust' | 'charitable_remainder_unitrust';
  payoutRate: number; // Annual payout percentage (5-50% for CRTs)

  // Beneficiary Information
  beneficiaryAge: number;
  lifeExpectancy: number; // In years
  numberOfBeneficiaries: number;

  // Investment Information
  expectedAnnualReturn: number;
  investmentFees: number;

  // Tax Information
  currentTaxRate: number; // Current capital gains tax rate
  ordinaryIncomeTaxRate: number; // Ordinary income tax rate
  charitableDeductionRate: number; // Tax rate for charitable deduction

  // Trust Terms
  trustDuration: number; // Years until remainder goes to charity
  remainderBeneficiary: string; // Charity or organization

  // Financial Planning
  includeInflation: boolean;
  inflationRate: number;
  includeInvestmentFees: boolean;

  // Analysis Options
  analysisPeriod: 'annual' | 'monthly';
  includeTaxAnalysis: boolean;
  includeCashFlowAnalysis: boolean;
}

export interface CharitableRemainderTrustMetrics {
  // Trust Value Calculations
  initialTaxDeduction: number;
  annualPayout: number;
  totalPayouts: number;
  remainderValue: number;
  trustValueGrowth: number;

  // Tax Benefits
  taxSavings: number;
  effectiveTaxRate: number;
  netCostToDonor: number;

  // Cash Flow Analysis
  annualCashFlow: number;
  totalCashFlow: number;
  cashFlowEfficiency: number;

  // Investment Performance
  trustGrowth: number;
  investmentReturns: number;
  feesPaid: number;

  // Comparative Analysis
  vsDirectDonation: number;
  vsRetainingAssets: number;
  efficiencyRatio: number;
}

export interface CharitableRemainderTrustAnalysis {
  // Trust Performance
  trustEfficiency: 'excellent' | 'good' | 'fair' | 'poor';
  taxEfficiency: 'high' | 'moderate' | 'low';
  cashFlowEfficiency: 'high' | 'moderate' | 'low';

  // Recommendations
  recommendations: string[];
  trustOptimization: string[];
  taxStrategy: string[];

  // Risk Analysis
  riskFactors: string[];
  marketRisk: string;
  longevityRisk: string;

  // Compliance & Legal
  legalRequirements: string[];
  taxCompliance: string[];
  reportingRequirements: string[];

  // Beneficiary Impact
  beneficiaryBenefits: string[];
  charitableImpact: string[];
  estatePlanningBenefits: string[];

  // Alternative Comparisons
  vsOtherStrategies: {
    strategy: string;
    comparison: string;
    advantages: string[];
    disadvantages: string[];
  }[];
}

export interface CharitableRemainderTrustOutputs {
  // Core Results
  annualPayout: number;
  totalPayouts: number;
  remainderValue: number;
  taxSavings: number;

  // Trust Performance
  trustGrowth: number;
  effectiveTaxRate: number;
  netCostToDonor: number;

  // Cash Flow
  annualCashFlow: number;
  totalCashFlow: number;

  // Analysis
  analysis: CharitableRemainderTrustAnalysis;
}