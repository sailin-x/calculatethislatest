export interface drywall_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface drywall_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface drywall_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface drywall_calculatorOutputs {
  result: number;
  analysis: drywall_calculatorAnalysis;
}
