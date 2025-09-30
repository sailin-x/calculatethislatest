export interface health_insurance_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface health_insurance_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface health_insurance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface health_insurance_calculatorOutputs {
  result: number;
  analysis: health_insurance_calculatorAnalysis;
}
