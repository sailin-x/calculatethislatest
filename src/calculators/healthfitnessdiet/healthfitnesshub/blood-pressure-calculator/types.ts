export interface blood_pressure_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface blood_pressure_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface blood_pressure_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface blood_pressure_calculatorOutputs {
  result: number;
  analysis: blood_pressure_calculatorAnalysis;
}
