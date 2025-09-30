export interface lean_manufacturing_takt_time_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface lean_manufacturing_takt_time_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface lean_manufacturing_takt_time_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface lean_manufacturing_takt_time_calculatorOutputs {
  result: number;
  analysis: lean_manufacturing_takt_time_calculatorAnalysis;
}
