export interface saasMetricsCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface saasMetricsCalculatorResults {
  result: number;
  analysis?: string;
}

export interface saasMetricsCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface saasMetricsCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
