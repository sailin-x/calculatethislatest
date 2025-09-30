export interface return_on_assets_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface return_on_assets_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface return_on_assets_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface return_on_assets_calculatorOutputs {
  result: number;
  analysis: return_on_assets_calculatorAnalysis;
}
