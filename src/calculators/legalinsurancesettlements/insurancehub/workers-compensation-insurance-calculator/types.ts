export interface workers_compensation_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface workers_compensation_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface workers_compensation_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface workers_compensation_insurance_calculatorOutputs {
  result: number;
  analysis: workers_compensation_insurance_calculatorAnalysis;
}
