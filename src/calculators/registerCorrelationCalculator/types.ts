export interface registerCorrelationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerCorrelationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerCorrelationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerCorrelationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
