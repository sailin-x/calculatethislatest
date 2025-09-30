export interface enterprise_value_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface enterprise_value_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface enterprise_value_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface enterprise_value_calculatorOutputs {
  result: number;
  analysis: enterprise_value_calculatorAnalysis;
}
