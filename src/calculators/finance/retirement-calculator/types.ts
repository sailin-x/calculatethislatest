/**
 * Retirement Calculator Types
 * Comprehensive retirement planning with multiple income sources, inflation, and tax considerations
 */

export interface RetirementCalculatorInputs {
  // Personal Information
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentIncome: number;
  expectedIncomeGrowth: number;
  
  // Current Savings
  currentSavings: number;
  current401k: number;
  currentIRA: number;
  otherInvestments: number;
  
  // Contribution Information
  monthly401kContribution: number;
  monthlyIRAContribution: number;
  otherMonthlyContributions: number;
  employerMatch: number;
  
  // Investment Assumptions
  expectedReturn: number;
  inflationRate: number;
  taxRate: number;
  
  // Retirement Income Sources
  socialSecurityMonthly: number;
  pensionMonthly: number;
  otherIncomeMonthly: number;
  
  // Retirement Expenses
  desiredRetirementIncome: number;
  retirementIncomeReplacement: number;
  healthcareCosts: number;
  longTermCareCosts: number;
  
  // Advanced Options
  includeInflation: boolean;
  includeTaxes: boolean;
  includeHealthcare: boolean;
  includeLongTermCare: boolean;
  includeSocialSecurity: boolean;
  
  // Monte Carlo Parameters
  monteCarloSamples: number;
  confidenceLevel: number;
}

export interface RetirementCalculatorResults {
  // Basic Calculations
  basicCalculation: {
    totalSavingsAtRetirement: number;
    monthlyRetirementIncome: number;
    annualRetirementIncome: number;
    retirementIncomeGap: number;
    yearsOfRetirement: number;
  };
  
  // Detailed Analysis
  detailedAnalysis: {
    projectedSavings: {
      personalSavings: number;
      employer401k: number;
      employerMatch: number;
      totalProjected: number;
    };
    retirementIncome: {
      fromSavings: number;
      fromSocialSecurity: number;
      fromPension: number;
      fromOtherSources: number;
      totalMonthly: number;
      totalAnnual: number;
    };
    retirementExpenses: {
      basicLiving: number;
      healthcare: number;
      longTermCare: number;
      totalMonthly: number;
      totalAnnual: number;
    };
  };
  
  // Risk Analysis
  riskAnalysis: {
    probabilityOfSuccess: number;
    worstCaseScenario: number;
    bestCaseScenario: number;
    medianScenario: number;
    yearsOfSavings: number;
    shortfallAmount: number;
  };
  
  // Recommendations
  recommendations: {
    requiredMonthlySavings: number;
    requiredAnnualSavings: number;
    savingsRate: number;
    catchUpContributions: number;
    retirementAgeAdjustment: number;
    incomeReplacementNeeded: number;
  };
  
  // Schedule
  savingsSchedule: Array<{
    age: number;
    year: number;
    beginningBalance: number;
    contributions: number;
    investmentReturns: number;
    endingBalance: number;
    projectedRetirementIncome: number;
  }>;
  
  // Summary
  summary: {
    totalContributions: number;
    totalInvestmentReturns: number;
    finalPortfolioValue: number;
    monthlyRetirementIncome: number;
    retirementReadinessScore: number;
    keyRecommendations: string[];
  };
  
  // Monte Carlo Results
  monteCarloResults?: {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    probabilityOfSuccess: number;
    expectedValue: number;
  };
}
