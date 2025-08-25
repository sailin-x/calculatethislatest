/**
 * Annuity Calculator Types
 * Comprehensive annuity calculations including immediate, deferred, fixed, and variable annuities
 */

export interface AnnuityCalculatorInputs {
  // Annuity Type
  annuityType: 'immediate' | 'deferred' | 'fixed' | 'variable';
  paymentType: 'single-premium' | 'flexible-premium';
  
  // Basic Parameters
  principal: number;
  annualRate: number;
  term: number;
  paymentFrequency: number; // 1=annual, 12=monthly, 4=quarterly
  
  // Payment Options
  paymentAmount?: number;
  paymentMode: 'receive' | 'pay';
  
  // Deferred Annuity Parameters
  deferralPeriod?: number;
  accumulationRate?: number;
  
  // Variable Annuity Parameters
  expectedReturn?: number;
  volatility?: number;
  
  // Tax Considerations
  taxRate: number;
  includeTaxes: boolean;
  
  // Inflation
  inflationRate: number;
  includeInflation: boolean;
  
  // Advanced Options
  includeDeathBenefit: boolean;
  deathBenefitAmount?: number;
  includeSurrenderCharges: boolean;
  surrenderChargeSchedule?: number[];
  
  // Monte Carlo Parameters
  monteCarloSamples: number;
  confidenceLevel: number;
}

export interface AnnuityCalculatorResults {
  // Basic Calculations
  basicCalculation: {
    presentValue: number;
    futureValue: number;
    totalPayments: number;
    totalInterest: number;
    effectiveRate: number;
  };
  
  // Payment Analysis
  paymentAnalysis: {
    periodicPayment: number;
    totalPayments: number;
    interestEarned: number;
    principalReturned: number;
    paymentSchedule: Array<{
      period: number;
      payment: number;
      interest: number;
      principal: number;
      balance: number;
    }>;
  };
  
  // Deferred Annuity Results
  deferredResults?: {
    accumulationValue: number;
    payoutValue: number;
    totalAccumulation: number;
    totalPayout: number;
    effectiveRate: number;
  };
  
  // Variable Annuity Results
  variableResults?: {
    expectedValue: number;
    worstCase: number;
    bestCase: number;
    probabilityOfLoss: number;
    volatilityImpact: number;
  };
  
  // Tax Analysis
  taxAnalysis?: {
    afterTaxValue: number;
    taxPaid: number;
    effectiveAfterTaxRate: number;
    taxDeferredGrowth: number;
  };
  
  // Inflation Analysis
  inflationAnalysis?: {
    realValue: number;
    purchasingPower: number;
    inflationAdjustedRate: number;
    realReturn: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    probabilityOfSuccess: number;
    worstCaseScenario: number;
    bestCaseScenario: number;
    medianScenario: number;
    valueAtRisk: number;
  };
  
  // Comparison Analysis
  comparison: {
    vsLumpSum: number;
    vsBondInvestment: number;
    vsStockInvestment: number;
    breakevenPeriod: number;
  };
  
  // Summary
  summary: {
    totalValue: number;
    totalCost: number;
    netBenefit: number;
    annualizedReturn: number;
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
