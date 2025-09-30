export interface kurtosis_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface kurtosis_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface kurtosis_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface kurtosis_calculatorOutputs {
  result: number;
  analysis: kurtosis_calculatorAnalysis;
}
