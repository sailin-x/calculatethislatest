export interface TraditionalIRAInputs {
  // Account Information
  currentBalance: number;
  annualContribution: number;
  contributionFrequency: 'annual' | 'monthly' | 'quarterly';

  // Personal Information
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;

  // Investment Information
  expectedAnnualReturn: number;
  investmentFees: number;
  includeInvestmentFees: boolean;

  // Tax Information
  currentTaxRate: number; // Marginal tax rate for contributions
  retirementTaxRate: number; // Expected tax rate at withdrawal
  includeTaxes: boolean;

  // Contribution Limits
  contributionLimit: number; // Annual contribution limit
  catchUpContribution: number; // Additional for age 50+
  includeCatchUpContributions: boolean;

  // Analysis Options
  analysisPeriod: 'annual' | 'monthly';
  includeInflation: boolean;
  inflationRate: number;
  discountRate: number; // For present value calculations

  // Roth Conversion Analysis
  considerRothConversion: boolean;
  rothConversionAmount: number;
  rothConversionTaxRate: number;

  // Required Minimum Distributions
  calculateRMD: boolean;
  rmdStartAge: number; // Usually 73 for most people

  // Employer Plan Interaction
  hasEmployerPlan: boolean;
  employerMatch: number;
  deductibleContributions: boolean;
}

export interface TraditionalIRAMetrics {
  // Contribution Calculations
  totalContributions: number;
  taxDeduction: number;
  netContributionCost: number;

  // Growth Calculations
  projectedBalance: number;
  investmentGrowth: number;
  totalFees: number;

  // Withdrawal Analysis
  annualRMD: number;
  lifetimeWithdrawals: number;
  presentValueOfWithdrawals: number;

  // Tax Analysis
  lifetimeTaxesPaid: number;
  effectiveTaxRate: number;
  taxEfficiency: number;

  // Roth Conversion Analysis
  conversionTaxCost: number;
  rothConversionBenefit: number;
  conversionBreakevenYears: number;

  // Comparative Analysis
  vsTaxableAccount: number;
  vsRothIRA: number;
  efficiencyRatio: number;

  // Risk Analysis
  longevityRisk: number;
  marketRisk: number;
  inflationRisk: number;
}

export interface TraditionalIRAAnalysis {
  // Account Performance
  contributionEfficiency: 'excellent' | 'good' | 'fair' | 'poor';
  taxEfficiency: 'high' | 'moderate' | 'low';
  retirementReadiness: 'on_track' | 'behind' | 'at_risk';

  // Recommendations
  recommendations: string[];
  contributionStrategy: string[];
  withdrawalStrategy: string[];
  taxOptimization: string[];

  // Risk Assessment
  riskFactors: string[];
  marketVolatilityImpact: string;
  longevityRisk: string;
  sequenceOfReturnsRisk: string;

  // Regulatory Compliance
  contributionLimits: {
    annualLimit: number;
    catchUpLimit: number;
    totalLimit: number;
  };
  rmdRequirements: string[];
  penaltyRules: string[];

  // Strategy Comparisons
  vsOtherRetirementAccounts: {
    vsRothIRA: string;
    vs401k: string;
    vsTaxableBrokerage: string;
  };

  // Financial Planning
  retirementIncomeGap: number;
  savingsAcceleration: string;
  taxDiversification: string;

  // Optimization Opportunities
  contributionOptimization: string[];
  investmentOptimization: string[];
  withdrawalOptimization: string[];
}

export interface TraditionalIRAOutputs {
  // Core Results
  projectedBalance: number;
  totalContributions: number;
  annualRMD: number;
  lifetimeTaxesPaid: number;

  // Tax Benefits
  taxDeduction: number;
  netContributionCost: number;
  effectiveTaxRate: number;

  // Performance
  investmentGrowth: number;
  presentValueOfWithdrawals: number;

  // Analysis
  analysis: TraditionalIRAAnalysis;
}