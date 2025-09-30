export interface alkalinity_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface alkalinity_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface alkalinity_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface alkalinity_calculatorOutputs {
  result: number;
  analysis: alkalinity_calculatorAnalysis;
}
