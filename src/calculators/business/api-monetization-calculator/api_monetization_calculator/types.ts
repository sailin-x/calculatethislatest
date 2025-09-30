export interface api_monetization_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface api_monetization_calculatorResults {
  result: number;
  analysis?: string;
}

export interface api_monetization_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface api_monetization_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
