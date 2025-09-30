export interface retirement_abroad_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface retirement_abroad_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface retirement_abroad_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface retirement_abroad_calculatorOutputs {
  result: number;
  analysis: retirement_abroad_calculatorAnalysis;
}
