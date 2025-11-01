export interface TaxLossHarvestingInputs {
  currentPortfolioValue: number;
  realizedGains: number;
  realizedLosses: number;
  shortTermGains: number;
  shortTermLosses: number;
  longTermGains: number;
  longTermLosses: number;
  taxRate: number;
  washSalePeriod: number;
  replacementInvestment: string;
  harvestFrequency: 'annual' | 'quarterly' | 'monthly';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentHorizon: number;
  expectedReturn: number;
  volatility: number;
  transactionCosts: number;
  minimumHarvestAmount: number;
}

export interface TaxLossHarvestingOutputs {
  netTaxSavings: number;
  harvestableLosses: number;
  optimalHarvestAmount: number;
  taxEfficiency: number;
  portfolioRebalancingCost: number;
  expectedAnnualSavings: number;
  breakEvenPeriod: number;
  riskAdjustedReturn: number;
  harvestSchedule: string[];
  recommendedActions: string[];
}

export interface TaxLossHarvestingMetrics {
  result: number;
}

export interface TaxLossHarvestingAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}