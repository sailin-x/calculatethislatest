export interface net_present_value_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface net_present_value_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface net_present_value_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface net_present_value_calculatorOutputs {
  result: number;
  analysis: net_present_value_calculatorAnalysis;
}
