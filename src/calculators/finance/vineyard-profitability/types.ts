export interface VineyardProfitabilityInputs {
  propertyValue: number;
  annualRevenue: number;
  operatingExpenses: number;
  laborCosts: number;
  equipmentCosts: number;
  irrigationCosts: number;
  pestControlCosts: number;
  harvestCosts: number;
  processingCosts: number;
  marketingCosts: number;
  propertyTaxes: number;
  insurance: number;
  maintenance: number;
  utilities: number;
  managementFees: number;
  vacancyRate: number;
  acquisitionCosts: number;
  financingCosts: number;
  holdingPeriod: number;
  appreciationRate: number;
  depreciationRate: number;
  taxRate: number;
  exitCosts: number;
}

export interface VineyardProfitabilityMetrics {
  grossProfitMargin: number;
  netOperatingIncome: number;
  capRate: number;
  cashOnCashReturn: number;
  totalReturn: number;
  internalRateOfReturn: number;
  netPresentValue: number;
  paybackPeriod: number;
  profitMargin: number;
  breakEvenYield: number;
  debtServiceCoverageRatio: number;
  loanToValueRatio: number;
  equityMultiple: number;
  annualizedReturn: number;
  totalProfit: number;
  totalInvestment: number;
}

export interface VineyardProfitabilityAnalysis {
  isProfitable: boolean;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendation: string;
  keyStrengths: string[];
  keyRisks: string[];
  marketComparison: {
    averageCapRate: number;
    averageProfitMargin: number;
    marketPosition: 'Above Market' | 'At Market' | 'Below Market';
  };
  sensitivityAnalysis: {
    revenueIncrease: number;
    expenseIncrease: number;
    yieldIncrease: number;
  };
}

export interface VineyardProfitabilityOutputs extends VineyardProfitabilityMetrics {
  analysis: VineyardProfitabilityAnalysis;
}
