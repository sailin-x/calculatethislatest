export interface body_fat_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface body_fat_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface body_fat_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface body_fat_calculatorOutputs {
  result: number;
  analysis: body_fat_calculatorAnalysis;
}
