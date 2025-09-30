export interface IRAInputs {
  // Account Information
  currentBalance: number;
  annualContribution: number;
  iraType: 'traditional' | 'roth' | 'sep' | 'simple';

  // Investment Parameters
  expectedReturnRate: number; // Annual percentage
  compoundFrequency: 'monthly' | 'quarterly' | 'annually';

  // Time Horizon
  currentAge: number;
  retirementAge: number;
  yearsToContribute: number;

  // Tax Information (for Traditional IRA)
  currentTaxRate?: number;
  expectedRetirementTaxRate?: number;

  // Roth IRA specific
  currentIncome?: number;
  contributionLimit?: number;

  // Analysis Options
  includeRequiredMinimumDistributions: boolean;
  inflationRate?: number;
}

export interface RAResults {
  // Growth Projections
  totalContributions: number;
  totalInterest: number;
  projectedBalance: number;

  // Retirement Income
  annualRetirementIncome: number;
  monthlyRetirementIncome: number;

  // Tax Analysis
  taxSavings: number;
  afterTaxValue: number;

  // Distribution Analysis
  requiredMinimumDistribution: number;
  yearsOfDistributions: number;

  // Projections
  yearlyProjections: Array<{
    age: number;
    year: number;
    contributions: number;
    interest: number;
    balance: number;
    withdrawals: number;
  }>;

  // Financial Metrics
  effectiveGrowthRate: number;
  savingsRate: number;
  retirementReadiness: 'excellent' | 'good' | 'fair' | 'poor';

  // Recommendations
  recommendedAdjustments: {
    increaseContribution: number;
    adjustReturnAssumption: number;
    delayRetirement: number;
    strategySuggestions: string[];
  };

  // Error handling
  errors: string[];

  // Comprehensive report
  report: string;
}