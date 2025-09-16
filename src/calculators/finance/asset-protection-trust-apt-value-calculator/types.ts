export interface APTValueInputs {
  // Trust Assets
  trustAssets: number;
  annualContributions: number;
  contributionYears: number;

  // Trust Terms
  trustDuration: number;
  distributionFrequency: 'annual' | 'semi-annual' | 'quarterly' | 'monthly';
  trusteeFees: number;

  // Investment Parameters
  expectedReturn: number;
  inflationRate: number;
  taxRate: number;

  // Beneficiary Information
  numberOfBeneficiaries: number;
  beneficiaryAges: number[];
  lifeExpectancy: number;

  // Legal and Setup Costs
  setupCosts: number;
  annualLegalFees: number;
  stateOfFormation: string;

  // Analysis Options
  includeInflation: boolean;
  discountRate: number;
  analysisPeriod: number;
}

export interface APTValueResults {
  // Trust Value Analysis
  currentTrustValue: number;
  projectedTrustValue: number;
  totalContributions: number;
  totalFees: number;

  // Beneficiary Analysis
  perBeneficiaryValue: number;
  annualDistribution: number;
  totalDistributions: number;

  // Tax Analysis
  taxSavings: number;
  afterTaxValue: number;
  effectiveTaxRate: number;

  // Risk Analysis
  assetProtectionLevel: string;
  creditorProtectionScore: number;
  spendthriftProtection: boolean;

  // Cost Analysis
  totalSetupCosts: number;
  annualOperatingCosts: number;
  breakEvenPeriod: number;

  // Performance Metrics
  internalRateOfReturn: number;
  netPresentValue: number;
  benefitCostRatio: number;

  // Recommendations
  recommendation: string;
  riskAssessment: string;
  nextSteps: string[];
}