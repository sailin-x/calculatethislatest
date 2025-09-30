export interface pmi_cancellationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface pmi_cancellationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface pmi_cancellationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface pmi_cancellationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
