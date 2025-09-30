export interface tile_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface tile_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface tile_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface tile_calculatorOutputs {
  result: number;
  analysis: tile_calculatorAnalysis;
}
