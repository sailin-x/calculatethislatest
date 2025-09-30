export interface cholesterol_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cholesterol_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cholesterol_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cholesterol_calculatorOutputs {
  result: number;
  analysis: cholesterol_calculatorAnalysis;
}
