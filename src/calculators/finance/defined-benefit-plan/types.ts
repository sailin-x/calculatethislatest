export interface DefinedBenefitPlanInputs {
  // Personal Information
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  gender: 'male' | 'female';

  // Employment Information
  currentSalary: number;
  yearsOfService: number;
  expectedSalaryIncrease: number;
  finalAverageSalary: number;

  // Plan Information
  planType: 'traditional' | 'cash_balance' | 'hybrid';
  benefitFormula: 'final_average' | 'career_average' | 'flat_benefit';
  vestingSchedule: 'immediate' | 'graded' | 'cliff';

  // Benefit Calculation
  benefitMultiplier: number;
  yearsOfServiceRequired: number;
  minimumRetirementAge: number;
  earlyRetirementReduction: number;

  // Financial Information
  currentAccountBalance: number;
  employerContribution: number;
  employeeContribution: number;
  expectedReturnRate: number;

  // Cost of Living Adjustments
  colaRate: number;
  colaStartAge: number;

  // Spouse/Beneficiary Information
  spouseAge: number;
  survivorBenefitPercentage: number;

  // Tax Information
  taxBracket: number;
  stateTaxRate: number;

  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  discountRate: number;

  // Currency
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface DefinedBenefitPlanMetrics {
  // Benefit Calculations
  monthlyBenefit: number;
  annualBenefit: number;
  lumpSumEquivalent: number;
  presentValue: number;

  // Vesting Information
  vestingPercentage: number;
  yearsUntilVested: number;

  // Cost Analysis
  totalEmployerContributions: number;
  totalEmployeeContributions: number;
  totalContributions: number;

  // Growth Projections
  projectedBenefit: number;
  colaAdjustedBenefit: number;

  // Risk Analysis
  fundingRatio: number;
  planHealth: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

  // Comparison Metrics
  vsDefinedContribution: number;
  replacementRatio: number;
  benefitSecurity: number;
}

export interface DefinedBenefitPlanAnalysis {
  // Executive Summary
  planRating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';
  recommendation: string;
  keyInsights: string[];

  // Benefit Analysis
  benefitCalculation: string;
  vestingAnalysis: string;
  retirementReadiness: string;

  // Financial Health
  planStability: string;
  fundingStatus: string;
  employerCommitment: string;

  // Risk Assessment
  longevityRisk: string;
  inflationRisk: string;
  investmentRisk: string;

  // Tax Optimization
  taxStrategy: string;
  withdrawalOptimization: string;

  // Comparison Analysis
  vsOtherRetirementOptions: string;
  costBenefitAnalysis: string;

  // Action Plan
  immediateActions: string[];
  longTermStrategy: string;
  monitoringPlan: string;

  // Educational Resources
  recommendedResources: string[];
  nextSteps: string[];
}

export interface DefinedBenefitPlanOutputs {
  // Core Results
  metrics: DefinedBenefitPlanMetrics;
  analysis: DefinedBenefitPlanAnalysis;

  // Summary
  monthlyRetirementIncome: number;
  annualRetirementIncome: number;
  totalValue: number;
  netBenefit: number;
}