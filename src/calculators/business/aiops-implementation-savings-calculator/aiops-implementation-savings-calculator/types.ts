export interface AiopsImplementationSavings-calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface AiopsImplementationSavings-calculatorResults {
  result: number;
  analysis?: string;
}

export interface AiopsImplementationSavings-calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface AiopsImplementationSavings-calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
