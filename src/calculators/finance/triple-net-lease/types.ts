export interface TripleNetLeaseROIInputs {
  propertyValue: number;
  annualRent: number;
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

export interface TripleNetLeaseROIMetrics {
  grossRentMultiplier: number;
  netOperatingIncome: number;
  capRate: number;
  cashOnCashReturn: number;
  totalReturn: number;
  internalRateOfReturn: number;
  netPresentValue: number;
  paybackPeriod: number;
  profitMargin: number;
  breakEvenOccupancy: number;
  debtServiceCoverageRatio: number;
  loanToValueRatio: number;
  equityMultiple: number;
  annualizedReturn: number;
  totalProfit: number;
  totalInvestment: number;
}

export interface TripleNetLeaseROIAnalysis {
  isProfitable: boolean;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendation: string;
  keyStrengths: string[];
  keyRisks: string[];
  marketComparison: {
    averageCapRate: number;
    averageGRM: number;
    marketPosition: 'Above Market' | 'At Market' | 'Below Market';
  };
  sensitivityAnalysis: {
    rentIncrease: number;
    expenseIncrease: number;
    vacancyIncrease: number;
  };
}

export interface TripleNetLeaseROIOutputs extends TripleNetLeaseROIMetrics {
  analysis: TripleNetLeaseROIAnalysis;
}
