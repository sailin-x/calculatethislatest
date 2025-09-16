export interface FixedIndexAnnuityInputs {
  // Initial Investment
  initialInvestment: number;
  monthlyContribution: number;
  contributionPeriod: number; // years

  // Index and Growth
  indexType: 's-p-500' | 'dow-jones' | 'nasdaq' | 'custom';
  participationRate: number; // percentage
  capRate: number; // percentage, optional
  floorRate: number; // percentage, optional
  spreadRate: number; // percentage deducted from index return

  // Time Horizon
  annuityPeriod: number; // years
  currentAge: number;
  withdrawalAge: number;

  // Fees and Costs
  annualFee: number; // percentage
  surrenderCharges: number[]; // array of surrender charge percentages by year
  riderFees: number; // additional annual fees

  // Payout Options
  payoutType: 'lifetime' | 'period-certain' | 'joint-life' | 'single-life';
  payoutPeriod: number; // years for period-certain
  payoutPercentage: number; // percentage of account value

  // Tax Considerations
  taxBracket: number; // percentage
  stateTaxRate: number; // percentage
  taxDeferred: boolean;

  // Market Assumptions
  inflationRate: number; // percentage
  marketVolatility: number; // percentage
  conservativeReturn: number; // percentage
  aggressiveReturn: number; // percentage

  // Personal Information
  gender: 'male' | 'female';
  jointLifeExpectancy: number; // years
}

export interface FixedIndexAnnuityResults {
  // Account Value Projections
  projectedValueAtWithdrawal: number;
  projectedValueAfterFees: number;
  projectedValueAfterTaxes: number;
  projectedValueAfterInflation: number;

  // Annual Projections
  annualProjections: Array<{
    year: number;
    contributions: number;
    indexReturn: number;
    creditedInterest: number;
    fees: number;
    accountValue: number;
  }>;

  // Payout Analysis
  monthlyPayout: number;
  annualPayout: number;
  totalPayouts: number;
  payoutPeriodYears: number;

  // Risk Analysis
  bestCaseValue: number;
  worstCaseValue: number;
  averageCaseValue: number;
  riskAdjustedValue: number;

  // Fee Analysis
  totalFeesPaid: number;
  feeImpactPercentage: number;
  netReturnAfterFees: number;

  // Tax Analysis
  taxLiability: number;
  afterTaxIncome: number;
  taxEfficiency: number;

  // Comparison Analysis
  vsTraditionalSavings: number;
  vsStocks: number;
  vsBonds: number;
  vsOtherAnnuities: number;

  // Surrender Analysis
  surrenderValues: Array<{
    year: number;
    surrenderCharge: number;
    availableValue: number;
  }>;

  // Recommendations
  recommendedStrategy: string;
  riskLevel: 'low' | 'medium' | 'high';
  suitabilityScore: number;
  alternativeOptions: string[];
}