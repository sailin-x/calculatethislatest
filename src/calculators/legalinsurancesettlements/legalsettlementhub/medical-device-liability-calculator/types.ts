export interface medical_device_liability_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface medical_device_liability_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface medical_device_liability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface medical_device_liability_calculatorOutputs {
  result: number;
  analysis: medical_device_liability_calculatorAnalysis;
}
