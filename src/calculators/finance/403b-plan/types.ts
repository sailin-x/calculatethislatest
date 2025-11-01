export interface FourOhThreeBInputs {
  // Employee Information
  currentAge: number;
  retirementAge: number;
  currentSalary: number;
  expectedAnnualSalaryIncrease: number;

  // Contribution Information
  employeeContributionPercent: number; // Employee contribution as % of salary
  employerMatchPercent: number; // Employer match as % of employee contribution
  employerMatchLimitPercent: number; // Maximum employer match as % of salary
  catchUpContribution?: number; // Additional catch-up contribution for age 50+

  // Investment Information
  currentBalance: number;
  expectedAnnualReturn: number;
  investmentFees: number; // Annual fee percentage

  // Tax Information
  currentTaxRate: number; // Current marginal tax rate
  retirementTaxRate: number; // Expected tax rate in retirement

  // Analysis Options
  includeEmployerMatch: boolean;
  includeCatchUpContributions: boolean;
  includeInvestmentFees: boolean;
  analysisPeriod: 'annual' | 'monthly';
}

export interface FourOhThreeBMetrics {
  // Contribution Calculations
  annualEmployeeContribution: number;
  annualEmployerContribution: number;
  totalAnnualContribution: number;
  totalContributions: number;

  // Growth Calculations
  projectedBalance: number;
  investmentGrowth: number;
  totalFeesPaid: number;

  // Tax Benefits
  taxDeferralBenefit: number;
  employerMatchTaxBenefit: number;
  totalTaxBenefits: number;

  // Retirement Income
  annualRetirementIncome: number;
  monthlyRetirementIncome: number;
  replacementRatio: number; // Retirement income as % of final salary

  // Analysis
  effectiveReturn: number;
  netContributionRate: number;
  breakEvenAnalysis: number;
}

export interface FourOhThreeBAnalysis {
  // Plan Performance
  contributionEfficiency: 'excellent' | 'good' | 'fair' | 'poor';
  taxEfficiency: 'high' | 'moderate' | 'low';
  retirementReadiness: 'on_track' | 'behind' | 'at_risk';

  // Recommendations
  recommendations: string[];
  contributionOptimization: string[];
  investmentStrategy: string[];

  // Risk Analysis
  riskFactors: string[];
  marketVolatilityImpact: string;
  longevityRisk: string;

  // Compliance & Rules
  contributionLimits: {
    annualLimit: number;
    catchUpLimit: number;
    totalLimit: number;
  };
  vestingSchedule: string;
  withdrawalPenalties: string[];

  // Comparison Analysis
  vsOtherRetirementPlans: {
    vs401k: string;
    vsIRA: string;
    vsRoth: string;
  };
}

export interface FourOhThreeBOutputs {
  // Core Results
  projectedBalance: number;
  totalContributions: number;
  annualRetirementIncome: number;
  totalTaxBenefits: number;

  // Contribution Breakdown
  annualEmployeeContribution: number;
  annualEmployerContribution: number;
  totalAnnualContribution: number;

  // Performance Metrics
  effectiveReturn: number;
  replacementRatio: number;

  // Analysis
  analysis: FourOhThreeBAnalysis;
}