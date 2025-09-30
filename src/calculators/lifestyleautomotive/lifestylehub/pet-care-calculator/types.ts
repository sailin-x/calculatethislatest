export interface pet_care_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface pet_care_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface pet_care_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface pet_care_calculatorOutputs {
  result: number;
  analysis: pet_care_calculatorAnalysis;
}
