export interface travel_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface travel_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface travel_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface travel_insurance_calculatorOutputs {
  result: number;
  analysis: travel_insurance_calculatorAnalysis;
}
