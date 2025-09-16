export interface ExecutiveDeferredCompensationInputs {
  // Executive Information
  currentAge: number;
  retirementAge: number;
  currentSalary: number;
  expectedSalaryGrowth: number;

  // Deferred Compensation Details
  annualDeferralAmount: number;
  deferralPercentage: number;
  vestingPeriod: number;
  cliffVesting: boolean;

  // Investment and Growth
  expectedReturn: number;
  companyMatch: number;
  companyMatchLimit: number;

  // Tax Information
  currentTaxRate: number;
  deferredTaxRate: number;
  capitalGainsTaxRate: number;

  // Plan Features
  employerContribution: number;
  vestingSchedule: 'graded' | 'cliff' | 'immediate';
  distributionOptions: 'lump-sum' | 'annuity' | 'installments';

  // Risk Factors
  companyRisk: 'low' | 'medium' | 'high';
  marketRisk: 'conservative' | 'moderate' | 'aggressive';

  // Time Horizon
  analysisYears: number;
  inflationRate: number;
}

export interface ExecutiveDeferredCompensationResults {
  // Current Value Analysis
  currentAccountBalance: number;
  vestedBalance: number;
  unvestedBalance: number;

  // Future Value Projections
  projectedValueAtRetirement: number;
  projectedValueAfterTaxes: number;
  projectedValueAfterInflation: number;

  // Cash Flow Analysis
  annualDeferralSavings: number;
  taxDeferredGrowth: number;
  totalTaxSavings: number;

  // Risk Assessment
  riskAdjustedValue: number;
  worstCaseScenario: number;
  bestCaseScenario: number;

  // Comparison Analysis
  traditionalSavingsComparison: number;
  netAdvantage: number;
  breakEvenYears: number;

  // Distribution Analysis
  lumpSumValue: number;
  annuityValue: number;
  installmentValue: number;

  // Tax Analysis
  deferredTaxLiability: number;
  capitalGainsTax: number;
  totalTaxEfficiency: number;

  // Recommendations
  recommendedDeferralAmount: number;
  optimalVestingStrategy: string;
  riskMitigationStrategies: string[];
}