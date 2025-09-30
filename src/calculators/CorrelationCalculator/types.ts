export interface CorrelationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface CorrelationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface CorrelationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface CorrelationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
