export interface api-monetization-calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface api-monetization-calculatorResults {
  result: number;
  analysis?: string;
}

export interface api-monetization-calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface api-monetization-calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
