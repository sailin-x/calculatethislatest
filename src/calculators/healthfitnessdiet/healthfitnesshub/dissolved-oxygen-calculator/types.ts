export interface dissolved_oxygen_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dissolved_oxygen_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dissolved_oxygen_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dissolved_oxygen_calculatorOutputs {
  result: number;
  analysis: dissolved_oxygen_calculatorAnalysis;
}
