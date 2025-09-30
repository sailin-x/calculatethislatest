export interface amino_acid_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface amino_acid_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface amino_acid_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface amino_acid_calculatorOutputs {
  result: number;
  analysis: amino_acid_calculatorAnalysis;
}
