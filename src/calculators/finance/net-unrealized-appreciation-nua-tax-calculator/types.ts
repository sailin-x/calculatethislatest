export interface NUAInputs {
  currentSharePrice: number;
  originalPurchasePrice: number;
  numberOfShares: number;
  yearsHeld: number;
  taxBracket: number;
  stateTaxRate: number;
  expectedGrowthRate: number;
  yearsToSale: number;
  lumpSumDistribution: boolean;
  includeStateTax: boolean;
  employerStock: boolean;
}

export interface NUAResults {
  netUnrealizedAppreciation: number;
  capitalGainsTax: number;
  ordinaryIncomeTax: number;
  totalTaxLiability: number;
  afterTaxValue: number;
  taxSavingsVsOrdinary: number;
  breakEvenSharePrice: number;
  optimalHoldingPeriod: number;
}

export interface NUAMetrics {
  nuaEfficiency: number;
  taxOptimizationScore: number;
  holdingStrategy: 'sell-now' | 'hold-longer' | 'lump-sum';
  riskAssessment: 'low' | 'medium' | 'high';
}