export interface DividendDiscountModelInputs {
  currentDividend: number;
  expectedGrowthRate: number;
  discountRate: number;
  numberOfYears?: number; // Optional for multi-stage models
}

export interface DividendDiscountModelMetrics {
  intrinsicValue: number;
  dividendYield: number;
  growthRate: number;
  discountRate: number;
  terminalValue?: number;
}

export interface DividendDiscountModelAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
  modelAssumptions: string[];
}

export interface DividendDiscountModelOutputs {
  intrinsicValue: number;
  dividendYield: number;
  growthRate: number;
  discountRate: number;
  analysis: DividendDiscountModelAnalysis;
  terminalValue?: number;
}