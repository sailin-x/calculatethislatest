export interface attribution-models-calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface attribution-models-calculatorResults {
  result: number;
  analysis?: string;
}

export interface attribution-models-calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface attribution-models-calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
