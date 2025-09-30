export interface defi_yield_optimization_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface defi_yield_optimization_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface defi_yield_optimization_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface defi_yield_optimization_calculatorOutputs {
  result: number;
  analysis: defi_yield_optimization_calculatorAnalysis;
}
