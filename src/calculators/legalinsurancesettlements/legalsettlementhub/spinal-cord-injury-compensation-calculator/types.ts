export interface spinal_cord_injury_compensation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface spinal_cord_injury_compensation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface spinal_cord_injury_compensation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface spinal_cord_injury_compensation_calculatorOutputs {
  result: number;
  analysis: spinal_cord_injury_compensation_calculatorAnalysis;
}
