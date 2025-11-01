export interface incurred_but_not_reported_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface incurred_but_not_reported_calculatorResults {
  result: number;
  analysis?: string;
}

export interface incurred_but_not_reported_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface incurred_but_not_reported_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
