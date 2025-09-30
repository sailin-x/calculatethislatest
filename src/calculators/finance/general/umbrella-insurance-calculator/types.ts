export interface umbrella_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface umbrella_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface umbrella_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface umbrella_insurance_calculatorOutputs {
  result: number;
  analysis: umbrella_insurance_calculatorAnalysis;
}
