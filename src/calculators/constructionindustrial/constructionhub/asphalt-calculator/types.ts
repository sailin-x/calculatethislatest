export interface asphalt_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface asphalt_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface asphalt_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface asphalt_calculatorOutputs {
  result: number;
  analysis: asphalt_calculatorAnalysis;
}
