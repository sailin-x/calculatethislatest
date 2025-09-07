export interface CoverdellESAInputs {
  // Account Information
  currentBalance: number;
  annualContribution: number;
  contributionFrequency: 'monthly' | 'quarterly' | 'annually';
  accountAge: number;

  // Beneficiary Information
  beneficiaryAge: number;
  relationshipToOwner: 'parent' | 'grandparent' | 'other';

  // Investment Information
  expectedReturnRate: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';

  // Tax Information
  taxBracket: number;
  stateTaxRate: number;

  // Education Planning
  yearsUntilEducation: number;
  expectedEducationCost: number;
  educationDuration: number;

  // Contribution Limits
  useSpouseAccount: boolean;
  numberOfBeneficiaries: number;

  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  includeStateTaxBenefits: boolean;

  // Currency
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface CoverdellESAMetrics {
  // Contribution Analysis
  totalContributions: number;
  remainingContributionRoom: number;
  maxAnnualContribution: number;
  contributionLimitUtilization: number;

  // Growth Projections
  projectedBalance: number;
  totalGrowth: number;
  taxFreeGrowth: number;

  // Tax Benefits
  taxSavings: number;
  stateTaxBenefits: number;
  totalTaxAdvantages: number;

  // Education Funding
  educationFundingPotential: number;
  fundingGap: number;
  withdrawalSchedule: Array<{
    year: number;
    amount: number;
    remainingBalance: number;
  }>;

  // Risk Analysis
  conservativeProjection: number;
  optimisticProjection: number;
  probabilityOfSuccess: number;
}

export interface CoverdellESAAnalysis {
  // Executive Summary
  accountHealth: 'Excellent' | 'Good' | 'Fair' | 'Concerning' | 'Critical';
  recommendation: string;
  keyInsights: string[];

  // Contribution Strategy
  optimalContributionStrategy: string;
  contributionOptimization: string[];
  beneficiaryPlanning: string;

  // Tax Optimization
  taxStrategy: string;
  stateBenefits: string;
  taxDiversification: string;

  // Risk Assessment
  riskAssessment: string;
  diversificationRecommendations: string[];
  contingencyPlans: string[];

  // Education Planning
  educationFundingStrategy: string;
  withdrawalOptimization: string;
  alternativeFunding: string[];

  // Action Plan
  immediateActions: string[];
  longTermStrategy: string;
  monitoringPlan: string;

  // Educational Resources
  recommendedResources: string[];
  nextSteps: string[];
}

export interface CoverdellESAOutputs {
  // Core Results
  metrics: CoverdellESAMetrics;
  analysis: CoverdellESAAnalysis;

  // Summary
  projectedBalance: number;
  totalTaxSavings: number;
  educationFundingPotential: number;
  recommendedAnnualContribution: number;
}