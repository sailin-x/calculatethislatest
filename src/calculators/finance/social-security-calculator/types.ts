/**
 * Social Security Calculator Types
 * Comprehensive Social Security benefit calculations with retirement age optimization
 */

export interface SocialSecurityCalculatorInputs {
  // Personal Information
  birthYear: number;
  currentAge: number;
  plannedRetirementAge: number;
  gender: 'male' | 'female';
  
  // Earnings History
  earningsHistory: Array<{
    year: number;
    earnings: number;
    inflationAdjusted: number;
  }>;
  
  // Current Earnings
  currentAnnualEarnings: number;
  expectedEarningsGrowth: number;
  yearsToRetirement: number;
  
  // Work History
  yearsWorked: number;
  yearsOfCoverage: number;
  averageIndexedMonthlyEarnings: number;
  
  // Family Information
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  spouseBirthYear?: number;
  spouseEarnings?: number;
  childrenUnder18?: number;
  disabledChildren?: number;
  
  // Benefit Options
  benefitType: 'retirement' | 'spousal' | 'survivor' | 'disability';
  includeSpousalBenefits: boolean;
  includeSurvivorBenefits: boolean;
  
  // Advanced Options
  includeInflation: boolean;
  inflationRate: number;
  includeTaxes: boolean;
  taxRate: number;
  
  // Optimization
  optimizeRetirementAge: boolean;
  targetMonthlyIncome: number;
  
  // Monte Carlo Parameters
  monteCarloSamples: number;
  confidenceLevel: number;
}

export interface SocialSecurityCalculatorResults {
  // Basic Calculations
  basicCalculation: {
    primaryInsuranceAmount: number;
    fullRetirementAge: number;
    fullRetirementBenefit: number;
    earlyRetirementBenefit: number;
    delayedRetirementBenefit: number;
    reductionFactor: number;
    increaseFactor: number;
  };
  
  // Age-Based Benefits
  ageBasedBenefits: {
    age62: number;
    age65: number;
    age66: number;
    age67: number;
    age70: number;
    optimalAge: number;
    optimalBenefit: number;
  };
  
  // Earnings Analysis
  earningsAnalysis: {
    totalLifetimeEarnings: number;
    averageIndexedMonthlyEarnings: number;
    bendPoints: {
      firstBendPoint: number;
      secondBendPoint: number;
      firstBendPointBenefit: number;
      secondBendPointBenefit: number;
      remainingBenefit: number;
    };
    yearsOfCoverage: number;
    quartersOfCoverage: number;
  };
  
  // Spousal Benefits
  spousalBenefits?: {
    spousalBenefit: number;
    spousalBenefitAt62: number;
    spousalBenefitAt67: number;
    spousalBenefitAt70: number;
    combinedBenefits: number;
    survivorBenefit: number;
  };
  
  // Family Benefits
  familyBenefits?: {
    totalFamilyBenefits: number;
    childrenBenefits: number;
    disabledChildrenBenefits: number;
    familyMaximum: number;
    reductionFactor: number;
  };
  
  // Tax Analysis
  taxAnalysis?: {
    taxablePortion: number;
    taxFreePortion: number;
    afterTaxBenefit: number;
    marginalTaxRate: number;
    effectiveTaxRate: number;
  };
  
  // Inflation Analysis
  inflationAnalysis?: {
    inflationAdjustedBenefit: number;
    purchasingPower: number;
    realValue: number;
    colaProjection: number;
  };
  
  // Optimization Results
  optimizationResults?: {
    optimalRetirementAge: number;
    optimalMonthlyBenefit: number;
    optimalAnnualBenefit: number;
    totalLifetimeBenefits: number;
    breakevenAge: number;
    recommendations: string[];
  };
  
  // Comparison Analysis
  comparison: {
    vsPrivateAnnuity: number;
    vs401kWithdrawal: number;
    vsPension: number;
    replacementRatio: number;
    adequacyScore: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    probabilityOfSolvency: number;
    worstCaseScenario: number;
    bestCaseScenario: number;
    medianScenario: number;
    fundingShortfall: number;
  };
  
  // Summary
  summary: {
    monthlyBenefit: number;
    annualBenefit: number;
    lifetimeBenefits: number;
    benefitAdequacy: number;
    keyRecommendations: string[];
  };
  
  // Monte Carlo Results
  monteCarloResults?: {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
  };
}
