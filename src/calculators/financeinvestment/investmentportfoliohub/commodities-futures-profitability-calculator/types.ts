export interface commodities_futures_profitability_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface commodities_futures_profitability_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface commodities_futures_profitability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface commodities_futures_profitability_calculatorOutputs {
  result: number;
  analysis: commodities_futures_profitability_calculatorAnalysis;
}
