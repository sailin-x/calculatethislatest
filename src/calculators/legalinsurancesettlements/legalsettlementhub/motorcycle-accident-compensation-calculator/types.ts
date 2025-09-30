export interface motorcycle_accident_compensation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface motorcycle_accident_compensation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface motorcycle_accident_compensation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface motorcycle_accident_compensation_calculatorOutputs {
  result: number;
  analysis: motorcycle_accident_compensation_calculatorAnalysis;
}
