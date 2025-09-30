export interface pet_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface pet_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface pet_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface pet_insurance_calculatorOutputs {
  result: number;
  analysis: pet_insurance_calculatorAnalysis;
}
