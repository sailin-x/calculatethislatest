export interface directors_officers_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface directors_officers_calculatorResults {
  result: number;
  analysis?: string;
}

export interface directors_officers_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface directors_officers_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
