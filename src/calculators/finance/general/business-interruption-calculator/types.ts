export interface business_interruption_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface business_interruption_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface business_interruption_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface business_interruption_calculatorOutputs {
  result: number;
  analysis: business_interruption_calculatorAnalysis;
}
