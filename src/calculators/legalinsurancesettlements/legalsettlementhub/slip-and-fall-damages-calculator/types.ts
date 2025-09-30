export interface slip_and_fall_damages_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface slip_and_fall_damages_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface slip_and_fall_damages_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface slip_and_fall_damages_calculatorOutputs {
  result: number;
  analysis: slip_and_fall_damages_calculatorAnalysis;
}
