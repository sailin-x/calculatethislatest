export interface EbitdaCalculatorInputs {
  revenue: number;
  operatingExpenses: number;
  depreciation: number;
  amortization: number;
  interestExpense?: number;
  taxRate?: number;
}

export interface EbitdaCalculatorMetrics {
  ebitda: number;
  ebitdaMargin: number;
  adjustedEbitda: number;
  ebitdaToRevenue: number;
  ebitdaGrowth: number;
}

export interface EbitdaCalculatorAnalysis {
  profitability: 'excellent' | 'good' | 'fair' | 'poor';
  efficiency: 'high' | 'medium' | 'low';
  recommendations: string[];
  industryComparison: string;
}

export interface EbitdaCalculatorOutputs {
  ebitda: number;
  ebitdaMargin: number;
  adjustedEbitda: number;
  ebitdaToRevenue: number;
  analysis: EbitdaCalculatorAnalysis;
}
