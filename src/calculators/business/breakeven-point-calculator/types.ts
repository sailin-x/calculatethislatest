export interface BreakevenPointCalculatorInputs {
  fixedCosts: number;
  variableCostPerUnit: number;
  sellingPricePerUnit: number;
  targetProfit?: number;
}

export interface BreakevenPointCalculatorOutputs {
  breakevenUnits: number;
  breakevenRevenue: number;
  contributionMargin: number;
  contributionMarginRatio: number;
  profitVolume: number;
  safetyMargin: number;
  analysis: {
    profitability: string;
    riskLevel: string;
    recommendations: string[];
  };
}
