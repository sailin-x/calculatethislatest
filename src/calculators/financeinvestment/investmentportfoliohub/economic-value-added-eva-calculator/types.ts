export interface economic_value_added_eva_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface economic_value_added_eva_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface economic_value_added_eva_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface economic_value_added_eva_calculatorOutputs {
  result: number;
  analysis: economic_value_added_eva_calculatorAnalysis;
}
