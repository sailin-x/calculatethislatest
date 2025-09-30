export interface capital_structure_optimization_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface capital_structure_optimization_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface capital_structure_optimization_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface capital_structure_optimization_calculatorOutputs {
  result: number;
  analysis: capital_structure_optimization_calculatorAnalysis;
}
